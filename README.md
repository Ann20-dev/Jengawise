# JengaWise

AI-powered real estate intelligence for developers, banks, investors, and urban planners.

## Stack

- Next.js
- TypeScript
- TailwindCSS
- Supabase and PostgreSQL
- Mapbox
- OpenAI
- Vercel

## Local Setup

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_MAPBOX_TOKEN=
OPENAI_API_KEY=
```

Without environment variables, the app still runs with seeded demo intelligence. Adding Supabase enables live auth/data, Mapbox enables real map tiles, and OpenAI enables generated market insight refreshes.

## Product Areas

- Authentication screen
- Property database with search, status filters, and risk sorting
- Construction pipeline tracking
- AI market insights endpoint with deterministic fallback
- Demand prediction dashboard
- Interactive maps with Mapbox support and offline fallback
- Analytics dashboard
- Report generation workspace
- Admin panel

## Database

The initial PostgreSQL schema is in `supabase/schema.sql`.
