# Setup guide

Everything here uses free plans. You need three free accounts: GitHub (you have it), Supabase and Vercel.

## 1. Create the database and login service (Supabase)

1. Go to <https://supabase.com>, sign in with GitHub, and click **New project**.
   - Name: `happy-budget`
   - Region: **Southeast Asia (Singapore)**, the closest to Vietnam.
   - Choose a strong database password and keep it somewhere safe.
2. When the project is ready, open **SQL Editor → New query**, paste the whole content of
   [`supabase/migrations/20261124000000_profiles.sql`](../supabase/migrations/20261124000000_profiles.sql) and click **Run**.
   Run every later file in `supabase/migrations/` the same way, in name order.
3. Open **Project Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   The anon key is safe to put in the browser: the database privacy rules (Row Level Security) protect the data.
   Never share the `service_role` key.
4. Open **Authentication → URL Configuration**:
   - **Site URL**: your Vercel address (for example `https://happy-budget.vercel.app`), or `http://localhost:3000` while testing.
   - **Redirect URLs**: add `https://<your-vercel-address>/auth/callback` and `http://localhost:3000/auth/callback`.

> Free plan note: Supabase pauses a free project after 7 days without any activity.
> Opening the app once a week is enough; from step 3 of the plan, the scheduled price check keeps it awake.

## 2. Put the app online (Vercel)

1. Go to <https://vercel.com>, sign in with GitHub, click **Add New → Project** and import `happy_budget`.
2. Under **Environment Variables**, add the three values:
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `NEXT_PUBLIC_SITE_URL` (your Vercel address).
3. Click **Deploy**. Every new change merged to `main` is published automatically.

## 3. Run it on your own computer (optional)

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # open http://localhost:3000
```

## Useful commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the app locally with live reload |
| `npm run check` | Lint + type check + tests (run before every commit) |
| `npm run build` | Production build, same as Vercel runs |
