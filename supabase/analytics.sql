create table if not exists public.portfolio_analytics_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  event_type text not null check (event_type in ('page_view', 'click')),
  path text not null check (char_length(path) between 1 and 160),
  target text check (target is null or char_length(target) <= 120),
  visitor_hash text,
  ip_hash text not null
);

create index if not exists portfolio_analytics_events_created_at_idx on public.portfolio_analytics_events (created_at);
create index if not exists portfolio_analytics_events_event_type_idx on public.portfolio_analytics_events (event_type);

alter table public.portfolio_analytics_events enable row level security;
revoke all on public.portfolio_analytics_events from anon, authenticated;
