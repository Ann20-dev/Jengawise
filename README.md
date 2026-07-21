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

## Map boundary data

`public/data/nairobi-sub-counties.geojson` contains the 17 Nairobi sub-county boundaries extracted from the [HDX Kenya Subnational Administrative Boundaries dataset](https://data.humdata.org/dataset/cod-ab-ken), downloaded on July 21, 2026. It is used only to display boundaries and summarize this project's seeded property and pipeline points; it is not a source of property-market data.
