# Supabase Setup

1. In Supabase Dashboard:
   - Authentication: enable Email/Password.
   - Storage: create a public bucket named `partner-logos`.

2. SQL:
   - Open SQL Editor and run `supabase/schema.sql`.

3. Create admin user:
   - In Auth -> Users, create an email/password user (the email should match `NEXT_PUBLIC_ADMIN_EMAIL`).
   - Copy the user's UUID and insert it into `public.admins`:
     - `insert into public.admins (user_id) values ('<USER_UUID>');`

4. App env:
   - Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.
   - Optional (seeding only): set `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.

