-- Create Gifts Table
create table gifts (
  id uuid default gen_random_uuid() primary key,
  access_token text not null,
  from_name text not null,
  to_name text not null,
  message text not null,
  template text not null,
  show_on_wall boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  paid boolean default false,
  paid_plan text check (paid_plan in ('pro', 'deluxe')),
  stripe_session_id text,
  pdf_url text,
  metadata jsonb
);

-- Create Wall Events Table (for quick reads)
create table wall_events (
  id uuid default gen_random_uuid() primary key,
  gift_id uuid references gifts(id),
  display_from text not null,
  display_to text not null,
  template text not null,
  created_at timestamp with time zone not null
);

-- Enable RLS
alter table gifts enable row level security;
alter table wall_events enable row level security;

-- Policies
create policy "Enable insert for everyone" on gifts for insert with check (true);
create policy "Enable read access for everyone on wall" on wall_events for select using (true);
-- Gifts are private by default, but we might need public read for the receiver view if they have the ID/Token
-- For MVP, we can allow reading public metadata if needed, but the main read should be secure.
-- Simple policy: Allow select by ID. 
create policy "Enable select for everyone" on gifts for select using (true);

-- Indexing
create index idx_wall_events_created_at on wall_events(created_at desc);
create index idx_gifts_access_token on gifts(access_token);
