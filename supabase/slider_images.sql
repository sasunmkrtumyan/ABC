-- Homepage partner sliders.
-- Standalone extract of the slider_images parts of schema.sql.
-- Run this in Supabase Dashboard -> SQL Editor. Safe to run more than once.

create extension if not exists pgcrypto;

create table if not exists public.slider_images (
  id uuid primary key default gen_random_uuid(),
  slider text not null check (slider in ('top', 'bottom')),
  image_url text not null,
  alt text not null default '',
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists slider_images_slider_position_idx
on public.slider_images (slider, position);

-- updated_at trigger helper (already present if schema.sql has been run).
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_slider_images_updated_at on public.slider_images;
create trigger set_slider_images_updated_at
before update on public.slider_images
for each row
execute function public.set_updated_at();

-- Admin allow-list for write access (already present if schema.sql has been run).
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table public.slider_images enable row level security;

drop policy if exists "Public read slider images" on public.slider_images;
create policy "Public read slider images"
on public.slider_images
for select
using (true);

drop policy if exists "Admins insert slider images" on public.slider_images;
create policy "Admins insert slider images"
on public.slider_images
for insert
with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins update slider images" on public.slider_images;
create policy "Admins update slider images"
on public.slider_images
for update
using (exists (select 1 from public.admins where user_id = auth.uid()))
with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins delete slider images" on public.slider_images;
create policy "Admins delete slider images"
on public.slider_images
for delete
using (exists (select 1 from public.admins where user_id = auth.uid()));

-- Make PostgREST pick the new table up immediately.
notify pgrst, 'reload schema';
