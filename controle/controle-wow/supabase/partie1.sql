-- ============================================================
-- TÕÕLé CONTRÔLE : couche sécurité & supervision (Supabase)
-- À coller UNE FOIS dans Supabase > SQL Editor > Run.
-- Idempotent : on peut le relancer sans casser.
-- Prérequis : la fonction public.is_admin() existe déjà (c'est le cas).
-- ============================================================

-- ---------- 1. Garde : admin + 2FA (aal2) si un facteur TOTP est activé ----------
create or replace function public.ctl_guard() returns void
language plpgsql security definer set search_path = public, auth as $fn$
begin
  if not coalesce(public.is_admin(), false) then
    raise exception 'Accès refusé' using errcode = '42501';
  end if;
  if exists (select 1 from auth.mfa_factors f
             where f.user_id = auth.uid() and f.status = 'verified' and f.factor_type = 'totp')
     and coalesce(auth.jwt() ->> 'aal', 'aal1') <> 'aal2' then
    raise exception '2FA requise : saisis ton code' using errcode = '42501';
  end if;
end $fn$;

-- ---------- 2. Rôles d'administration ----------
create table if not exists public.ctl_admin_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role    text not null check (role in ('super','support','lecteur')),
  cree_le timestamptz not null default now()
);
alter table public.ctl_admin_roles enable row level security;   -- aucune policy = aucun accès direct

create or replace function public.ctl_my_role() returns text
language sql security definer set search_path = public, auth stable as $fn$
  select case when not coalesce(public.is_admin(), false) then null
              else coalesce((select role from public.ctl_admin_roles where user_id = auth.uid()), 'super') end
$fn$;

-- ---------- 3. Journal d'audit inviolable (chaîne de hachage) ----------
create table if not exists public.ctl_audit (
  id         bigserial primary key,
  at         timestamptz not null default now(),
  actor      uuid,
  actor_mail text,
  action     text not null,
  target     text,
  detail     jsonb not null default '{}'::jsonb,
  prev_hash  text,
  hash       text not null
);
alter table public.ctl_audit enable row level security;          -- aucune policy = lecture/écriture directes impossibles

create or replace function public.ctl_audit_immutable() returns trigger
language plpgsql as $fn$
begin
  raise exception 'Le journal d''audit est en écriture seule';
end $fn$;

drop trigger if exists ctl_audit_no_change on public.ctl_audit;
create trigger ctl_audit_no_change before update or delete on public.ctl_audit
  for each row execute function public.ctl_audit_immutable();
drop trigger if exists ctl_audit_no_truncate on public.ctl_audit;
create trigger ctl_audit_no_truncate before truncate on public.ctl_audit
  for each statement execute function public.ctl_audit_immutable();

create or replace function public.ctl_log(p_action text, p_target text default null, p_detail jsonb default '{}'::jsonb)
returns void language plpgsql security definer set search_path = public, auth as $fn$
declare v_prev text; v_id bigint; v_at timestamptz := now(); v_mail text; v_hash text;
begin
  perform public.ctl_guard();
  lock table public.ctl_audit in share row exclusive mode;
  select hash into v_prev from public.ctl_audit order by id desc limit 1;
  select email into v_mail from auth.users where id = auth.uid();
  v_id := nextval('public.ctl_audit_id_seq');
  v_hash := encode(sha256(convert_to(
      coalesce(v_prev,'') || '|' || v_id || '|' || v_at::text || '|' || coalesce(auth.uid()::text,'') || '|' ||
      p_action || '|' || coalesce(p_target,'') || '|' || coalesce(p_detail::text,''), 'utf8')), 'hex');
  insert into public.ctl_audit(id, at, actor, actor_mail, action, target, detail, prev_hash, hash)
  values (v_id, v_at, auth.uid(), v_mail, p_action, p_target, coalesce(p_detail,'{}'::jsonb), v_prev, v_hash);
end $fn$;

create or replace function public.ctl_audit_list(lim int default 200)
returns table(id bigint, at timestamptz, actor_mail text, action text, target text, detail jsonb, hash text)
language plpgsql security definer set search_path = public, auth as $fn$
begin
  perform public.ctl_guard();
  return query select a.id, a.at, a.actor_mail, a.action, a.target, a.detail, a.hash
               from public.ctl_audit a order by a.id desc limit least(greatest(lim,1),1000);
end $fn$;

-- Vérifie que la chaîne n'a jamais été modifiée (même par un accès direct à la base)
create or replace function public.ctl_audit_verify()
returns table(ok boolean, lignes bigint, premiere_rupture bigint)
language plpgsql security definer set search_path = public, auth as $fn$
declare r record; prev text := null; n bigint := 0; bad bigint := null; h text;
begin
  perform public.ctl_guard();
  for r in select * from public.ctl_audit order by id loop
    n := n + 1;
    h := encode(sha256(convert_to(
        coalesce(prev,'') || '|' || r.id || '|' || r.at::text || '|' || coalesce(r.actor::text,'') || '|' ||
        r.action || '|' || coalesce(r.target,'') || '|' || coalesce(r.detail::text,''), 'utf8')), 'hex');
    if h <> r.hash or r.prev_hash is distinct from prev then bad := r.id; exit; end if;
    prev := r.hash;
  end loop;
  return query select bad is null, n, bad;
end $fn$;

