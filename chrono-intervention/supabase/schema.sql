-- ============================================================
-- Chrono Intervention — Supabase schema
-- Run this in the Supabase SQL Editor (one-shot setup)
-- ============================================================

-- ── Tables ───────────────────────────────────────────────────

create table if not exists play_events (
  id          uuid primary key default gen_random_uuid(),
  scenario_id text    not null,
  difficulty  text    not null,
  won         boolean not null,
  stars       integer not null check (stars between 1 and 5),
  played_at   timestamptz not null default now()
);

create table if not exists rating_events (
  id          uuid primary key default gen_random_uuid(),
  scenario_id text    not null,
  rating      integer not null check (rating between 1 and 5),
  rated_at    timestamptz not null default now()
);

-- ── Indexes ──────────────────────────────────────────────────

create index if not exists play_events_scenario_id_idx  on play_events  (scenario_id);
create index if not exists rating_events_scenario_id_idx on rating_events (scenario_id);

-- ── Aggregated view (used by the app on load) ────────────────

create or replace view scenario_stats as
select
  p.scenario_id,
  count(p.id)::int                                                         as plays,
  round(100.0 * sum(case when p.won then 1 else 0 end) / count(*), 0)::int as success_rate,
  round(avg(p.stars::numeric), 1)                                          as avg_stars,
  (
    select round(avg(r.rating::numeric), 1)
    from   rating_events r
    where  r.scenario_id = p.scenario_id
  ) as avg_rating,
  (
    select count(r.id)::int
    from   rating_events r
    where  r.scenario_id = p.scenario_id
  ) as rating_count
from play_events p
group by p.scenario_id;

-- ── Row Level Security ───────────────────────────────────────
-- Anyone (incl. anonymous) can insert events and read stats.
-- Nobody can update or delete rows.

alter table play_events   enable row level security;
alter table rating_events enable row level security;

-- Insert: open to all (anonymous usage, no account required)
create policy "Anyone can insert play events"
  on play_events for insert
  to anon, authenticated
  with check (true);

create policy "Anyone can insert rating events"
  on rating_events for insert
  to anon, authenticated
  with check (true);

-- Select: open to all (needed to read the view)
create policy "Anyone can read play events"
  on play_events for select
  to anon, authenticated
  using (true);

create policy "Anyone can read rating events"
  on rating_events for select
  to anon, authenticated
  using (true);
