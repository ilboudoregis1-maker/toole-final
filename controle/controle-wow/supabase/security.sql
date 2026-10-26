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

-- ---------- 4. Sessions & détection d'anomalies (données réelles auth.sessions) ----------
create or replace function public.ctl_sessions(lim int default 100)
returns table(email text, cree_le timestamptz, maj_le timestamptz, ip text, appareil text, aal text)
language plpgsql security definer set search_path = public, auth as $fn$
begin
  perform public.ctl_guard();
  return query select u.email::text, s.created_at, coalesce(s.refreshed_at, s.updated_at), host(s.ip),
                      left(coalesce(s.user_agent,''), 80), s.aal::text
               from auth.sessions s join auth.users u on u.id = s.user_id
               order by coalesce(s.refreshed_at, s.updated_at) desc nulls last
               limit least(greatest(lim,1),500);
end $fn$;

create or replace function public.ctl_anomalies()
returns table(niveau text, type text, sujet text, detail text, quand timestamptz)
language plpgsql security definer set search_path = public, auth as $fn$
begin
  perform public.ctl_guard();
  return query
  -- une même IP sur plusieurs comptes en 24 h
  select 'haut', 'IP partagée', host(s.ip), count(distinct s.user_id) || ' comptes depuis la même IP (24 h)', max(s.created_at)
    from auth.sessions s where s.created_at > now() - interval '24 hours' and s.ip is not null
    group by s.ip having count(distinct s.user_id) >= 4
  union all
  -- un compte connecté depuis beaucoup d'IP en 7 jours
  select 'moyen', 'Multi-IP', u.email::text, count(distinct s.ip) || ' IP différentes (7 j)', max(s.created_at)
    from auth.sessions s join auth.users u on u.id = s.user_id
    where s.created_at > now() - interval '7 days' and s.ip is not null
    group by u.email having count(distinct s.ip) >= 4
  union all
  -- pic de créations de comptes
  select 'moyen', 'Pic d''inscriptions', 'dernière heure', count(*) || ' nouveaux comptes en 1 h', max(created_at)
    from auth.users where created_at > now() - interval '1 hour'
    having count(*) >= 15
  union all
  -- administrateur sans 2FA
  select 'haut', 'Admin sans 2FA', u.email::text, 'Active la 2FA dans Contrôle > Sécurité', u.created_at
    from auth.users u
    where u.id in (select user_id from public.ctl_admin_roles)
      and not exists (select 1 from auth.mfa_factors f where f.user_id = u.id and f.status = 'verified')
  order by 1, 5 desc;
end $fn$;

-- ---------- 5. Séries réelles pour les graphiques ----------
create or replace function public.ctl_series(jours int default 14)
returns table(jour date, inscriptions bigint, sessions bigint)
language plpgsql security definer set search_path = public, auth as $fn$
begin
  perform public.ctl_guard();
  return query
  select d::date,
         (select count(*) from auth.users u where u.created_at::date = d::date),
         (select count(*) from auth.sessions s where s.created_at::date = d::date)
  from generate_series(current_date - (least(greatest(jours,1),90) - 1), current_date, interval '1 day') d
  order by 1;
end $fn$;

-- ---------- 6. Supervision technique ----------
create or replace function public.ctl_tech()
returns table(base_mo numeric, connexions int, connexions_max int, tables_sans_rls int, sessions_actives bigint, comptes bigint)
language plpgsql security definer set search_path = public, auth as $fn$
begin
  perform public.ctl_guard();
  return query select
    round(pg_database_size(current_database())/1048576.0, 1),
    (select count(*)::int from pg_stat_activity where datname = current_database()),
    current_setting('max_connections')::int,
    (select count(*)::int from pg_class c join pg_namespace n on n.oid = c.relnamespace
       where n.nspname = 'public' and c.relkind = 'r' and not c.relrowsecurity),
    (select count(*) from auth.sessions where coalesce(not_after, now() + interval '1 day') > now()),
    (select count(*) from auth.users);
end $fn$;

-- Rapport RLS : quelles tables publiques sont réellement protégées ?
create or replace function public.ctl_rls_report()
returns table(tbl text, rls boolean, nb_policies int)
language plpgsql security definer set search_path = public, auth as $fn$
begin
  perform public.ctl_guard();
  return query select c.relname::text, c.relrowsecurity,
                      (select count(*)::int from pg_policies p where p.schemaname = 'public' and p.tablename = c.relname)
               from pg_class c join pg_namespace n on n.oid = c.relnamespace
               where n.nspname = 'public' and c.relkind = 'r'
               order by c.relrowsecurity, c.relname;
end $fn$;

-- ---------- 7. Droits : jamais pour anon ----------
do $fn$
declare f text;
begin
  foreach f in array array[
    'ctl_guard()','ctl_my_role()','ctl_log(text,text,jsonb)','ctl_audit_list(int)','ctl_audit_verify()',
    'ctl_sessions(int)','ctl_anomalies()','ctl_series(int)','ctl_tech()','ctl_rls_report()'] loop
    execute format('revoke all on function public.%s from public, anon', f);
    execute format('grant execute on function public.%s to authenticated', f);
  end loop;
end $fn$;
revoke all on table public.ctl_audit, public.ctl_admin_roles from anon, authenticated;

-- ---------- 8. Donner un rôle à un admin (exemple, à adapter) ----------
-- insert into public.ctl_admin_roles(user_id, role)
--   select id, 'super' from auth.users where email = 'TON_EMAIL' on conflict (user_id) do update set role = excluded.role;
