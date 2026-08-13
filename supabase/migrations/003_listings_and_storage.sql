-- 003_listings_and_storage.sql
-- Real marketplace listings, photos, saved listings, and interests.

alter table public.listings
  add column if not exists type text,
  add column if not exists rooms integer,
  add column if not exists bathroom_type text,
  add column if not exists has_water boolean not null default false,
  add column if not exists has_electric boolean not null default false,
  add column if not exists subcity text,
  add column if not exists location_text text;

update public.listings
set
  type = coalesce(type, case when coalesce(bedrooms, 0) = 0 then 'shop' else 'house' end),
  rooms = coalesce(rooms, bedrooms),
  bathroom_type = coalesce(bathroom_type, bathrooms::text),
  location_text = coalesce(location_text, location),
  subcity = coalesce(subcity, location);

do $$
begin
  if exists (
    select 1
    from pg_constraint
    where conname = 'listings_status_check'
    and conrelid = 'public.listings'::regclass
  ) then
    alter table public.listings drop constraint listings_status_check;
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'listings_status_real_data_check'
    and conrelid = 'public.listings'::regclass
  ) then
    alter table public.listings
      add constraint listings_status_real_data_check
      check (status in ('available', 'pending', 'rented_out'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'listings_type_check'
    and conrelid = 'public.listings'::regclass
  ) then
    alter table public.listings
      add constraint listings_type_check
      check (type is null or type in ('house', 'apartment', 'shop'));
  end if;
end $$;

create table if not exists public.interests (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.profiles(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  landlord_id uuid not null references public.profiles(id) on delete cascade,
  staff_id uuid references public.profiles(id) on delete set null,
  status text not null default 'waiting_for_call'
    check (status in ('waiting_for_call', 'visit_scheduled', 'linked', 'not_selected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, listing_id)
);

create table if not exists public.listing_photos (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  landlord_id uuid not null references public.profiles(id) on delete cascade,
  storage_path text not null unique,
  public_url text not null,
  is_cover boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.saved_listings (
  tenant_id uuid not null references public.profiles(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (tenant_id, listing_id)
);

create index if not exists listings_status_created_at_idx on public.listings (status, created_at desc);
create index if not exists listings_landlord_id_idx on public.listings (landlord_id);
create index if not exists listings_filter_idx on public.listings (type, subcity, rooms, price);
create index if not exists interests_tenant_id_created_at_idx on public.interests (tenant_id, created_at desc);
create index if not exists interests_staff_id_status_idx on public.interests (staff_id, status);
create index if not exists interests_listing_id_idx on public.interests (listing_id);
create index if not exists listing_photos_listing_id_sort_idx on public.listing_photos (listing_id, sort_order);
create index if not exists saved_listings_listing_id_idx on public.saved_listings (listing_id);

alter table public.interests enable row level security;
alter table public.listing_photos enable row level security;
alter table public.saved_listings enable row level security;

create policy "Interests visible to related users" on public.interests
  for select
  to authenticated
  using (
    (select auth.uid()) = tenant_id
    or (select auth.uid()) = landlord_id
    or (select auth.uid()) = staff_id
    or exists (
      select 1 from public.profiles p
      where p.id = (select auth.uid()) and p.role = 'staff'
    )
  );

create policy "Tenants can create own interests" on public.interests
  for insert
  to authenticated
  with check ((select auth.uid()) = tenant_id);

create policy "Staff can update assigned interests" on public.interests
  for update
  to authenticated
  using (
    (select auth.uid()) = staff_id
    or exists (
      select 1 from public.profiles p
      where p.id = (select auth.uid()) and p.role = 'staff'
    )
  )
  with check (
    (select auth.uid()) = staff_id
    or exists (
      select 1 from public.profiles p
      where p.id = (select auth.uid()) and p.role = 'staff'
    )
  );

create policy "Listing photos readable by everyone" on public.listing_photos
  for select
  using (true);

create policy "Landlords manage own listing photos" on public.listing_photos
  for all
  to authenticated
  using ((select auth.uid()) = landlord_id)
  with check ((select auth.uid()) = landlord_id);

create policy "Tenants manage own saved listings" on public.saved_listings
  for all
  to authenticated
  using ((select auth.uid()) = tenant_id)
  with check ((select auth.uid()) = tenant_id);

insert into storage.buckets (id, name, public)
values ('listing-photos', 'listing-photos', true)
on conflict (id) do update set public = excluded.public;

create policy "Listing photos public read" on storage.objects
  for select
  using (bucket_id = 'listing-photos');

create policy "Landlords upload listing photos under own folder" on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'listing-photos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Landlords update own listing photos" on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'listing-photos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id = 'listing-photos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Landlords delete own listing photos" on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'listing-photos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

grant usage on schema public to anon, authenticated;
grant select on public.listings, public.listing_photos to anon, authenticated;
grant select, insert, update on public.interests, public.saved_listings to authenticated;
grant insert, update, delete on public.listings, public.listing_photos to authenticated;
