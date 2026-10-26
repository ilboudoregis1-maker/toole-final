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

