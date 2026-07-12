# Adriatic Paddle Co. — Montenegro Kayak Tours website

A custom marketing + booking website for kayak tours in **Budva** and the **Bay of Kotor**, Montenegro.
Built with **Next.js 16 (App Router) + TypeScript + Tailwind v4**, with a request-to-book flow, an
owner admin dashboard, transactional email, an interactive launch map and a live water-conditions widget.

> Branding, prices, photos and copy are **placeholders** (marked `‹CONFIRM›` in the code). See
> [`PLAN.md`](PLAN.md) for the full spec and the list of details to replace.

## Features

- **Marketing site** — dynamic hero, two tour pages, rentals, about, gallery, FAQ/knowledge base.
- **Request-to-book flow** — customer submits a booking (no payment); owner is emailed; owner clicks
  **Accept** and the customer receives an automated confirmation. Pay on the day.
- **Admin dashboard** (`/admin`) — password-protected; list, accept and decline bookings; per-slot
  capacity is enforced.
- **Live conditions widget** — real water temp / wind / wave status from Open-Meteo (free, no key).
- **Interactive launch map** — Leaflet + OpenStreetMap pins for parking, meeting point, restrooms and
  the launch dock, with directions links.
- **Emails** via Resend (falls back to console logging in dev so nothing is required to test).
- Liability waiver at booking, WhatsApp button, reviews, SEO (sitemap/robots/metadata).

## Getting started

Requires **Node.js 18+** (this project was built and tested on Node 22).

```bash
npm install
npx prisma generate      # generate the DB client
npx prisma db push       # create the local SQLite database (prisma/dev.db)
npm run dev              # http://localhost:3000
```

Open http://localhost:3000. The admin dashboard is at http://localhost:3000/admin
(default password `paddle-admin` — see `.env`).

### Environment

Copy `.env.example` to `.env` and adjust. Key variables:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | `file:./dev.db` for local SQLite; a Postgres URL in production |
| `ADMIN_PASSWORD` | Password for the `/admin` dashboard |
| `OWNER_EMAIL` | Where new-booking notifications are sent |
| `RESEND_API_KEY` | Resend key. **Leave blank in dev** to log emails to the console |
| `EMAIL_FROM` | Verified sender once you add Resend |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Digits only, incl. country code (e.g. `38267…`) |

## How the booking flow works

1. Customer submits the form → `POST /api/bookings` creates a `pending` booking, emails the owner
   (notification) and the customer (acknowledgement).
2. Owner opens `/admin`, reviews, and clicks **Accept** → `POST /api/bookings/[id]/accept` sets the
   booking to `confirmed` and emails the customer their confirmation. **Decline** works similarly.
3. Capacity per time slot is enforced when a booking is created.

Tours, prices, time slots, capacity, map pins and FAQ content live in `src/lib/` — edit those files
(no component changes needed).

## Deploying to Vercel

1. Push the repo to GitHub and import it into Vercel.
2. Create a free Postgres database (Neon or Supabase) and set `DATABASE_URL` to it.
3. In `prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "postgresql"`.
4. Run `npx prisma migrate deploy` (or `npx prisma db push`) against the Postgres DB.
5. Add a [Resend](https://resend.com) account, verify your domain, and set `RESEND_API_KEY` + `EMAIL_FROM`.
6. Set `ADMIN_PASSWORD`, `OWNER_EMAIL`, `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_WHATSAPP_NUMBER` in
   Vercel's environment variables, then deploy.

## Project structure

```
src/
  app/            # routes (pages + /api route handlers) and middleware
  components/     # UI + interactive components (Hero, BookingForm, LaunchMap, ConditionsWidget, …)
  lib/            # data & logic: site config, tours, reviews, faq, db, email, auth, conditions
prisma/           # schema + local SQLite dev.db
```

## Replacing placeholders

Start with `src/lib/site.ts` (business name, contact, WhatsApp), `src/lib/tours.ts` (prices, slots,
itineraries, **map pin coordinates**), `src/lib/images.ts` (swap Unsplash URLs for your own photos in
`/public`), `src/lib/reviews.ts` and `src/lib/faq.ts`. Full checklist in `PLAN.md`.
