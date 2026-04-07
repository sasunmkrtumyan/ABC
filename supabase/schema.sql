-- Supabase SQL setup for this project.
-- Run in Supabase Dashboard -> SQL Editor.

-- UUID generation
create extension if not exists pgcrypto;

-- Core tables
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name jsonb not null,
  description jsonb not null,
  email text not null,
  location text not null default '',
  phones text[] not null default '{}'::text[],
  links text[] not null default '{}'::text[],
  tags text[] not null default '{}'::text[],
  logo_url text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.partners
add column if not exists links text[] not null default '{}'::text[];

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title jsonb not null,
  description jsonb not null,
  event_at timestamptz not null,
  mode text not null check (mode in ('online', 'offline')),
  place text not null default '',
  image_url text not null default '',
  contact_email text not null default '',
  contact_phone text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Admin allow-list for write access.
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

-- updated_at trigger helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_partners_updated_at on public.partners;
create trigger set_partners_updated_at
before update on public.partners
for each row
execute function public.set_updated_at();

drop trigger if exists set_events_updated_at on public.events;
create trigger set_events_updated_at
before update on public.events
for each row
execute function public.set_updated_at();

-- RLS
alter table public.partners enable row level security;
alter table public.tags enable row level security;
alter table public.events enable row level security;
alter table public.admins enable row level security;

-- Public read
drop policy if exists "Public read partners" on public.partners;
create policy "Public read partners"
on public.partners
for select
using (true);

drop policy if exists "Public read tags" on public.tags;
create policy "Public read tags"
on public.tags
for select
using (true);

drop policy if exists "Public read events" on public.events;
create policy "Public read events"
on public.events
for select
using (true);

-- Admin gate check (via allow-list table)
drop policy if exists "Admins insert partners" on public.partners;
create policy "Admins insert partners"
on public.partners
for insert
with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins update partners" on public.partners;
create policy "Admins update partners"
on public.partners
for update
using (exists (select 1 from public.admins where user_id = auth.uid()))
with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins delete partners" on public.partners;
create policy "Admins delete partners"
on public.partners
for delete
using (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins insert tags" on public.tags;
create policy "Admins insert tags"
on public.tags
for insert
with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins update tags" on public.tags;
create policy "Admins update tags"
on public.tags
for update
using (exists (select 1 from public.admins where user_id = auth.uid()))
with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins delete tags" on public.tags;
create policy "Admins delete tags"
on public.tags
for delete
using (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins insert events" on public.events;
create policy "Admins insert events"
on public.events
for insert
with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins update events" on public.events;
create policy "Admins update events"
on public.events
for update
using (exists (select 1 from public.admins where user_id = auth.uid()))
with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins delete events" on public.events;
create policy "Admins delete events"
on public.events
for delete
using (exists (select 1 from public.admins where user_id = auth.uid()));

-- Admins table: allow a logged-in user to read their own row (lets RLS checks work)
drop policy if exists "Admin can read own row" on public.admins;
create policy "Admin can read own row"
on public.admins
for select
using (auth.uid() = user_id);

-- Storage bucket + policies
-- Create bucket + policies.
--
-- IMPORTANT:
-- Some Supabase projects restrict changing `storage.objects` via SQL unless you run
-- the query as the `postgres`/owner role. If you see:
--   ERROR: 42501: must be owner of table objects
-- then do one of these:
-- - In SQL Editor, switch the run role to `postgres` (top toolbar / "Run as"), then re-run, OR
-- - Create the bucket and policies from the Dashboard UI (Storage -> Policies).

-- Bucket creation (safe to run; if it fails due to permissions, create it in the Storage UI)
insert into storage.buckets (id, name, public)
values ('partner-logos', 'partner-logos', true)
on conflict (id) do nothing;

-- Storage policies
-- If the statements below fail with owner/permission errors, create them in Dashboard UI instead.
do $$
begin
  begin
    alter table storage.objects enable row level security;
  exception
    when insufficient_privilege then
      raise notice 'Skipping: cannot alter storage.objects RLS (insufficient_privilege). Configure in Dashboard UI or run as postgres.';
  end;

  begin
    drop policy if exists "Public read partner-logos" on storage.objects;
    create policy "Public read partner-logos"
    on storage.objects
    for select
    using (bucket_id = 'partner-logos');
  exception
    when insufficient_privilege then
      raise notice 'Skipping: cannot create storage select policy (insufficient_privilege). Configure in Dashboard UI or run as postgres.';
  end;

  begin
    drop policy if exists "Admins insert partner-logos" on storage.objects;
    create policy "Admins insert partner-logos"
    on storage.objects
    for insert
    with check (
      bucket_id = 'partner-logos'
      and exists (select 1 from public.admins where user_id = auth.uid())
    );
  exception
    when insufficient_privilege then
      raise notice 'Skipping: cannot create storage insert policy (insufficient_privilege). Configure in Dashboard UI or run as postgres.';
  end;

  begin
    drop policy if exists "Admins update partner-logos" on storage.objects;
    create policy "Admins update partner-logos"
    on storage.objects
    for update
    using (
      bucket_id = 'partner-logos'
      and exists (select 1 from public.admins where user_id = auth.uid())
    )
    with check (
      bucket_id = 'partner-logos'
      and exists (select 1 from public.admins where user_id = auth.uid())
    );
  exception
    when insufficient_privilege then
      raise notice 'Skipping: cannot create storage update policy (insufficient_privilege). Configure in Dashboard UI or run as postgres.';
  end;

  begin
    drop policy if exists "Admins delete partner-logos" on storage.objects;
    create policy "Admins delete partner-logos"
    on storage.objects
    for delete
    using (
      bucket_id = 'partner-logos'
      and exists (select 1 from public.admins where user_id = auth.uid())
    );
  exception
    when insufficient_privilege then
      raise notice 'Skipping: cannot create storage delete policy (insufficient_privilege). Configure in Dashboard UI or run as postgres.';
  end;
end $$;

