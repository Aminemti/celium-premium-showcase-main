-- Run this once in the Supabase SQL Editor.
-- It stores the collection the admin page can change, and lets every visitor read it.
-- Only a signed-in admin can write. Photographs uploaded from the admin page go in the bucket below.

create table if not exists public.collection (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.collection enable row level security;

grant select on public.collection to anon, authenticated;
grant insert, update on public.collection to authenticated;

drop policy if exists "Anyone can read the collection" on public.collection;
create policy "Anyone can read the collection"
  on public.collection
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Signed-in admin can insert the collection" on public.collection;
create policy "Signed-in admin can insert the collection"
  on public.collection
  for insert
  to authenticated
  with check (true);

drop policy if exists "Signed-in admin can update the collection" on public.collection;
create policy "Signed-in admin can update the collection"
  on public.collection
  for update
  to authenticated
  using (true)
  with check (true);

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'collection'
  ) then
    alter publication supabase_realtime add table public.collection;
  end if;
end $$;

insert into storage.buckets (id, name, public)
values ('collection-images', 'collection-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Anyone can view collection photographs" on storage.objects;
create policy "Anyone can view collection photographs"
  on storage.objects
  for select
  to public
  using (bucket_id = 'collection-images');

drop policy if exists "Signed-in admin can upload collection photographs" on storage.objects;
create policy "Signed-in admin can upload collection photographs"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'collection-images');

drop policy if exists "Signed-in admin can replace collection photographs" on storage.objects;
create policy "Signed-in admin can replace collection photographs"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'collection-images');

drop policy if exists "Signed-in admin can remove collection photographs" on storage.objects;
create policy "Signed-in admin can remove collection photographs"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'collection-images');
