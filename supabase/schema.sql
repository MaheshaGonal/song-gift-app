-- Run this once in Supabase: Project → SQL Editor → New query → paste → Run

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  occasion text not null,
  package text not null check (package in ('song', 'song_video')),
  price_inr integer not null,
  names text not null,
  story text not null,
  contact text not null,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed')),
  razorpay_order_id text,
  razorpay_payment_id text,
  delivery_status text not null default 'not_started' check (delivery_status in ('not_started', 'in_progress', 'delivered')),
  delivery_url text
);

-- Row Level Security: the browser (anon key) may INSERT a new order
-- (someone submitting the form) but may not read, list, or edit any
-- order — including their own. All reading/updating happens through
-- your admin API routes, which use the service role key and bypass
-- this policy entirely.
alter table orders enable row level security;

create policy "Anyone can submit an order"
  on orders for insert
  to anon
  with check (true);

-- No select/update/delete policy for anon = those are blocked by default.
