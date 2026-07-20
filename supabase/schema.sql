create extension if not exists "pgcrypto";

create type property_status as enum ('stabilized', 'leasing', 'planned', 'under_construction');
create type pipeline_stage as enum ('land_banked', 'permitted', 'financing', 'construction', 'handover');
create type risk_level as enum ('low', 'medium', 'high');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  organization text,
  role text not null default 'analyst',
  created_at timestamptz not null default now()
);

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  developer text not null,
  zone text not null,
  neighborhood text,
  longitude numeric(10, 7) not null,
  latitude numeric(10, 7) not null,
  status property_status not null,
  units integer not null check (units > 0),
  typology text not null,
  median_rent integer,
  price_per_sqm integer,
  occupancy numeric(5, 2),
  absorption_rate numeric(5, 2),
  risk_score integer check (risk_score between 0 and 100),
  last_updated date not null default current_date,
  created_at timestamptz not null default now()
);

create table public.construction_projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  developer text not null,
  zone text not null,
  stage pipeline_stage not null,
  units integer not null check (units > 0),
  completion numeric(5, 2) not null default 0 check (completion between 0 and 100),
  start_date date,
  expected_delivery date,
  financier text,
  risk risk_level not null default 'medium',
  longitude numeric(10, 7) not null,
  latitude numeric(10, 7) not null,
  created_at timestamptz not null default now()
);

create table public.demand_forecasts (
  id uuid primary key default gen_random_uuid(),
  zone text not null,
  current_supply integer not null default 0,
  annual_demand integer not null default 0,
  projected_shortfall integer not null default 0,
  affordability_index numeric(5, 2),
  confidence numeric(5, 2),
  segment text,
  forecast_month date not null
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  audience text not null,
  sections jsonb not null default '[]'::jsonb,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.construction_projects enable row level security;
alter table public.demand_forecasts enable row level security;
alter table public.reports enable row level security;

create policy "Profiles are visible to signed-in users"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Market data is visible to signed-in users"
  on public.properties for select
  to authenticated
  using (true);

create policy "Pipeline data is visible to signed-in users"
  on public.construction_projects for select
  to authenticated
  using (true);

create policy "Demand forecasts are visible to signed-in users"
  on public.demand_forecasts for select
  to authenticated
  using (true);

create policy "Users can manage their own reports"
  on public.reports for all
  to authenticated
  using (created_by = auth.uid())
  with check (created_by = auth.uid());
