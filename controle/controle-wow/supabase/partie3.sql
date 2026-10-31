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

