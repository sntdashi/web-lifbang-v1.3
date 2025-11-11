# project-litbang (Vercel + Supabase ready)

This is the frontend-only project configured to use Supabase directly from the browser (Supabase JS). It includes:
- Auth (email/password + Google OAuth)
- Admin dashboard (protected route) with CRUD for publications and gallery (uses Supabase tables)
- Maroon/purple theme + parallax grid background + Framer Motion for animations
- Ready for deployment to Vercel (no backend required)

## Supabase setup (quick)
1. Create a project at https://supabase.com
2. Create tables (SQL editor) — example SQL:
```sql
create extension if not exists pgcrypto;
create table publications (
  id uuid primary key default gen_random_uuid(),
  title text,
  authors text,
  excerpt text,
  date timestamp with time zone default now()
);
create table gallery (
  id uuid primary key default gen_random_uuid(),
  url text,
  caption text,
  created_at timestamp with time zone default now()
);
```
3. In Supabase → Authentication → Settings → Add Google provider and set OAuth credentials (for Google login) OR enable email/password.
4. In Supabase → API get Project URL and anon key.

## Vercel deployment
1. Push this repo to Git (GitHub/GitLab) or upload the project folder to Vercel import.
2. In Vercel project settings → Environment Variables, add:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon public key
3. Deploy (Vercel will run `npm run build` automatically).

## Local dev
1. Copy `.env.example` to `.env.local` and fill in values
2. `npm install`
3. `npm run dev` (open http://localhost:5173)

Notes:
- Admin route checks for a user session; you should control admin access by creating roles or checking user emails in your Supabase policies.
- This project uses direct Supabase client in the browser — secure server-only operations (like deleting sensitive files) should be done via a server with service_role key if needed.
# web-lifbang-v1.3
