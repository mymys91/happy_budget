# HappyBudget

A friendly budget app: plan each month, log real income and expenses, see where you overspent,
save toward goals and follow your investments. Available in Vietnamese and English.
Every user's data is private.

## Tech (all free and open source)

| Part | Tool |
| --- | --- |
| Web app | [Next.js](https://nextjs.org) (App Router, TypeScript) |
| Login + database | [Supabase](https://supabase.com) (Postgres with Row Level Security) |
| Hosting | [Vercel](https://vercel.com) free plan |
| Design | [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)-style components, [Lucide](https://lucide.dev) icons, [Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) font |
| Languages | [next-intl](https://next-intl.dev) |

Setup steps: [docs/SETUP.md](docs/SETUP.md).

## Project map

```
messages/              Translations: vi.json and en.json must have the same keys (a test checks this)
supabase/migrations/   Database tables and privacy rules, run in name order
src/
  app/                 Pages (each folder = one URL)
    (auth)/            Login, sign-up and their server actions
    auth/callback/     Landing page for the email confirmation link
    dashboard/         Signed-in home
  components/          Shared UI; components/ui holds the basic building blocks
  i18n/                Language settings (language is stored in a cookie, not the URL)
  lib/supabase/        Supabase clients for browser, server and middleware
  middleware.ts        Refreshes the login session and protects private pages
```

## Rules the code follows

- **Privacy lives in the database.** Every table has Row Level Security so a user can only read and write their own rows.
- **No hard-coded text in pages.** All words come from `messages/*.json`, and keys are type-checked.
- **One place for colors.** The theme is defined as CSS variables in `src/app/globals.css`.
- **Before committing:** `npm run check`.
