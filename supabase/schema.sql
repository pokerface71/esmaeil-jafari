-- ============================================================
-- Blog schema for the portfolio (run in Supabase SQL Editor)
-- Idempotent-ish: uses IF NOT EXISTS and OR REPLACE where possible.
-- ============================================================

-- ------------------------------------------------------------
-- 1. Tables
-- ------------------------------------------------------------

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  cover_image_url text,
  tags text[] not null default '{}',
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- One row per language: en | fa | ar | tr
create table if not exists public.post_translations (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  language text not null check (language in ('en', 'fa', 'ar', 'tr')),
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (post_id, language)
);

create index if not exists idx_posts_published_at
  on public.posts (published_at desc);
create index if not exists idx_posts_published
  on public.posts (published) where published;
create index if not exists idx_post_translations_post
  on public.post_translations (post_id);

-- ------------------------------------------------------------
-- 2. updated_at triggers
-- ------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_posts_updated_at on public.posts;
create trigger trg_posts_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

drop trigger if exists trg_post_translations_updated_at on public.post_translations;
create trigger trg_post_translations_updated_at
  before update on public.post_translations
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- 3. Row Level Security
--    - Anyone (anon key) can READ published posts.
--    - Only authenticated users (your admin login) can write.
-- ------------------------------------------------------------

alter table public.posts enable row level security;
alter table public.post_translations enable row level security;

-- Public read of published posts only
drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
  on public.posts
  for select
  using (published = true);

-- Translations readable when their parent post is published
drop policy if exists "Public can read translations of published posts"
  on public.post_translations;
create policy "Public can read translations of published posts"
  on public.post_translations
  for select
  using (
    exists (
      select 1 from public.posts p
      where p.id = post_id and p.published = true
    )
  );

-- Authenticated admin: full write access
drop policy if exists "Admins can insert posts" on public.posts;
create policy "Admins can insert posts"
  on public.posts for insert to authenticated with check (true);

drop policy if exists "Admins can update posts" on public.posts;
create policy "Admins can update posts"
  on public.posts for update to authenticated using (true) with check (true);

drop policy if exists "Admins can delete posts" on public.posts;
create policy "Admins can delete posts"
  on public.posts for delete to authenticated using (true);

-- Admins may also read UNPUBLISHED drafts (the public policy above only
-- exposes published rows, so admins need an explicit read policy too).
drop policy if exists "Admins can read all posts" on public.posts;
create policy "Admins can read all posts"
  on public.posts for select to authenticated using (true);

drop policy if exists "Admins can manage translations" on public.post_translations;
create policy "Admins can manage translations"
  on public.post_translations
  for all to authenticated using (true) with check (true);

-- ------------------------------------------------------------
-- 4. IMPORTANT — only YOUR account may authenticate:
--    disable public signups so nobody can register into your project.
--    Run manually in Dashboard → Authentication → Sign In / Providers,
--    or with SQL via the network-restriction approach below is NOT possible;
--    simply turn OFF "Allow new users to sign up" in the dashboard.
-- ------------------------------------------------------------

-- ------------------------------------------------------------
-- 5. (Optional) Seed one sample post — delete after testing.
-- ------------------------------------------------------------

-- insert into public.posts (slug, tags, published, published_at)
-- values ('hello-world', array['nextjs', 'react'], true, now())
-- on conflict (slug) do nothing;
--
-- insert into public.post_translations (post_id, language, title, excerpt, content)
-- select id, 'en', 'Hello World', 'My first post', '# Hello\n\nWorld!'
-- from public.posts where slug = 'hello-world'
-- on conflict (post_id, language) do nothing;
