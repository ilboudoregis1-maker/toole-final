-- 1) Lire nom + photo des gens avec qui tu as échangé (même non enregistrés)
create or replace function public.peer_profiles(ids uuid[])
returns jsonb language sql security definer set search_path = public stable as $$
  select coalesce(jsonb_agg(jsonb_build_object('id',p.id,'pseudo',p.pseudo,'avatar_v',p.avatar_v)),'[]'::jsonb)
  from public.profiles p
  where p.id = any(ids) and (
    p.id = auth.uid()
    or exists (select 1 from public.messages m
               where (m.sender = p.id and m.receiver = auth.uid())
                  or (m.sender = auth.uid() and m.receiver = p.id))
  );
$$;
revoke all on function public.peer_profiles(uuid[]) from public;
grant execute on function public.peer_profiles(uuid[]) to authenticated;

-- 2) Répondre à un inconnu = conversation acceptée dans les deux sens (sauf blocage)
create or replace function public.tg_auto_accept_reply()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.receiver is not null
     and exists (select 1 from public.messages m where m.sender = new.receiver and m.receiver = new.sender)
     and not exists (select 1 from public.blocks b
                     where (b.blocker = new.receiver and b.blocked = new.sender)
                        or (b.blocker = new.sender and b.blocked = new.receiver)) then
    insert into public.chat_accepts (owner, peer)
    select x.o, x.p
    from (values (new.receiver, new.sender), (new.sender, new.receiver)) as x(o, p)
    where not exists (select 1 from public.chat_accepts c where c.owner = x.o and c.peer = x.p);
  end if;
  return new;
end $$;

drop trigger if exists "000_auto_accept_reply" on public.messages;
create trigger "000_auto_accept_reply" before insert on public.messages
for each row execute function public.tg_auto_accept_reply();

-- 3) Débloquer les conversations déjà reçues : accepter côté toi les inconnus qui t'ont écrit
insert into public.chat_accepts (owner, peer)
select distinct m.receiver, m.sender from public.messages m
where not exists (select 1 from public.chat_accepts c where c.owner = m.receiver and c.peer = m.sender)
  and not exists (select 1 from public.blocks b where b.blocker = m.receiver and b.blocked = m.sender);
