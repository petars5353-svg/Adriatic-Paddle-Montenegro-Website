# Montenegro Kayak Tours — Website Plan & Baseline Build Prompt

## Context

The user runs (or is launching) a kayak business on the Montenegrin coast offering **guided tours in Budva and the Bay of Kotor, plus kayak/SUP rentals**. They need a marketing website that also handles bookings end-to-end. The critical business requirement is a **request-to-book flow**: a customer submits a booking, the owner is emailed, the owner reviews and clicks **Accept**, and only then does the customer receive an automated confirmation email. No online payment — customers pay in person on the day.

This document is both the **design spec** and a **detailed baseline prompt** that can later be handed to a code-generation step. Fields marked `‹CONFIRM›` are placeholders the user will replace with real values (name, prices, photos, exact meeting points); they do not block starting the build.

### Decisions already made (via brainstorming)
| Area | Decision |
|---|---|
| Build approach | Custom-coded, **Next.js (App Router) + Tailwind CSS**, deployed to **Vercel** |
| Booking model | **Request-to-book, pay on the day** (no online payment/Stripe) |
| Bookings storage | **Database** (hosted Postgres, free tier) via Prisma |
| Approval flow | **Password-protected admin dashboard** with Accept/Decline buttons |
| Emails | Owner notified on new request; customer confirmed on Accept. Sent via **Resend** (free tier) |
| Languages | **English only** (structured so translations can be added later) |
| Design mood | **Serene Adriatic Coastal** (calm, premium, turquoise/sandstone) |
| Availability | **Fixed daily time slots with per-slot capacity** |
| Map & live data | **Free & keyless**: Leaflet + OpenStreetMap (map), Open-Meteo Marine/Weather API (live conditions) |
| Brand assets | **Nothing finalized** — placeholder name, typographic wordmark, stock/placeholder imagery |

### External accounts required (all have free tiers)
1. **Vercel** — hosting + serverless API routes.
2. **Neon** or **Supabase** — hosted Postgres for bookings (serverless-friendly; SQLite won't persist on Vercel).
3. **Resend** — transactional email (start on their onboarding domain; verify the real domain later).
4. Open-Meteo and OpenStreetMap need **no account or key**.

---

## Site Architecture

### Pages / routes
- `/` — Home: dynamic hero, brand intro, two tour cards, rental teaser, **Live Conditions widget**, reviews, gallery teaser, FAQ teaser, WhatsApp float, footer.
- `/tours/budva-coastal-caves` — Budva tour detail + **Launch Map** + inline booking CTA.
- `/tours/kotor-bay-cliff-jumping` — Kotor tour detail + **Launch Map** + inline booking CTA.
- `/rentals` — kayak/SUP rental info, rates, equipment, booking CTA.
- `/about` — About Us / the story, guides, safety credentials, eco stance.
- `/gallery` — photos & short write-ups from **past tours** (the "previous tours" requirement).
- `/book` — booking flow (accepts `?tour=` and `?date=` prefills); also reachable as a modal from tour pages.
- `/faq` — knowledge base: what to bring, what's included, fitness level, weather & **cancellation policy**, safety.
- `/admin` — protected dashboard: booking list, per-slot capacity, Accept/Decline.
- `/privacy`, `/terms` — legal boilerplate; liability waiver text also lives in the booking flow.

### Shared components
- Sticky translucent header with logo wordmark + nav + "Book now" button.
- Footer: contact, social, WhatsApp, quick links, copyright.
- Floating WhatsApp button (all pages).
- Reusable `TourCard`, `Section`, `Gallery`, `ReviewCarousel`, `FAQAccordion`, `LaunchMap`, `ConditionsWidget`, `BookingForm`.

---

## Signature / "dynamic" features

### 1. Dynamic hero (home)
Full-bleed coastal video or image slideshow with subtle parallax and a gentle animated wave/SVG divider. Rotating headline tagline, prominent "Book a tour" and "Check live conditions" CTAs. Respects `prefers-reduced-motion`.

### 2. Live Launch Map & Conditions Tracker
- **Launch Map** (`LaunchMap`, Leaflet + OSM tiles): pins for **parking, meeting point, restroom facilities, and the launch dock**, with a short label/popup each and a "Get directions" link (opens Google/Apple Maps). One map instance per tour location (Budva, Kotor) plus a combined view.
- **Live Conditions Widget** (`ConditionsWidget`): calls internal `GET /api/conditions?location=budva|kotor`, which proxies **Open-Meteo Marine + Forecast** APIs and returns **water temperature, wind speed, and a colour-coded status banner** (Green = good to paddle / Amber = caution / Red = not recommended) based on simple wind/wave thresholds `‹CONFIRM thresholds›`. Cached ~15 min. Graceful fallback text if the API is unreachable.

### 3. Reviews / testimonials
`ReviewCarousel` with quote, name, star rating, source label. Seeded with placeholder reviews `‹CONFIRM›`, structured so real reviews can be dropped in.

---

## Tours & Rentals content (representative baseline — editable later)

> The two GetYourGuide reference pages block automated fetching, so these itineraries are **representative** of the tour types and are meant to be refined by the user.

### Tour A — Budva: Coastal Caves Paddle (~3 hours)
- **Route:** Meet at `‹CONFIRM Budva launch point›` → safety briefing & paddle basics → paddle the coastline to **sea caves and hidden coves** near Mogren/Sveti Nikola ("Hawaii") island → swim/snorkel stop inside a cave → explore the island shoreline → return.
- **Includes:** kayak or SUP, life jacket, dry bag, guide, drinking water, snorkel `‹CONFIRM›`.
- **Bring:** swimwear, towel, sunscreen, water shoes.
- **Price:** `‹CONFIRM ~€40–50 pp›`. **Group:** min 1 / max `‹CONFIRM›`. **Min age:** `‹CONFIRM›`.
- **Slots:** e.g. 09:00 & 14:00 daily, season ~May–Oct `‹CONFIRM›`.

### Tour B — Kotor: Bay Kayak & Cliff Jumping (~3–4 hours)
- **Route:** Meet at `‹CONFIRM Kotor/Muo launch point›` → briefing → paddle the fjord-like bay past Muo/Prčanj with views of Kotor old town and mountains → **cliff-jumping spot** with graded jump heights (optional) and swim/snorkel stops → return.
- **Includes:** kayak, life jacket, guide, water, snorkel `‹CONFIRM›`.
- **Bring:** swimwear, towel, sunscreen, water shoes.
- **Price:** `‹CONFIRM ~€45–55 pp›`. **Group / age:** `‹CONFIRM›`.
- **Slots:** e.g. 10:00 & 16:00 daily `‹CONFIRM›`.

### Rentals
Single/double sit-on-top kayaks and SUPs. **Rates:** hourly `‹CONFIRM ~€10–15/hr›`, daily `‹CONFIRM ~€35–45/day›`. Includes life jacket + basic gear. Same request-to-book flow (choose date, duration, quantity).

---

## Booking & approval flow

### Customer booking (request-to-book)
1. Customer opens `/book` (or tour-page modal), picks **tour/rental → date → time slot** (form shows spots remaining), enters party size (adults/children), name, email, phone, notes.
2. **Liability waiver** must be accepted via required checkbox linking to the full waiver text.
3. Submit → `POST /api/bookings` creates a booking with `status = pending`.
4. Two emails fire: **owner** gets a "New booking request" email (with Accept/Decline deep links to the dashboard); **customer** gets an optional "We've received your request — pending confirmation" acknowledgement.

### Owner approval (admin dashboard)
- `/admin` is password-protected (env-var credential; simple auth middleware).
- Lists bookings (filter by status/date), shows per-slot capacity, and **Accept / Decline** buttons.
- **Accept** → `status = confirmed` → sends the **automated confirmation email** to the customer (tour, date, time, meeting point, what to bring, contact).
- **Decline** → `status = declined` → optional polite decline email.

### Data model (Prisma)
- `Booking`: `id, type (budva-caves | kotor-cliff | rental), date, timeSlot, adults, children, name, email, phone, notes, waiverAccepted, status (pending|confirmed|declined), createdAt`.
- `SlotConfig` (or config file): per tour → available times + capacity.

### API routes (Next.js App Router, `app/api/...`)
- `POST /api/bookings` — validate, enforce capacity, persist, send owner + acknowledgement emails.
- `POST /api/bookings/[id]/accept` — admin-only; confirm + send confirmation email.
- `POST /api/bookings/[id]/decline` — admin-only; decline + optional email.
- `GET /api/conditions?location=` — proxy/cached Open-Meteo Marine + Forecast → `{ waterTemp, windSpeed, status }`.

---

## Design system — "Serene Adriatic Coastal"

- **Palette (baseline, tune later):** deep Adriatic teal `#0F7C8A`, turquoise `#4FBFCB`, warm sandstone `#E4D3B4`, off-white `#F7FBFB`, deep navy ink `#0B2E3A`, coral/sunset CTA accent `#F0795C`. Colour-coded conditions: green/amber/red.
- **Typography:** elegant display serif (e.g. **Fraunces** or **Cormorant**) for headings; clean sans (e.g. **Inter**/**Manrope**) for body. Via `next/font` (Google Fonts).
- **Feel:** airy whitespace, large photography, soft rounded cards, gentle wave-shaped section dividers, subtle scroll/parallax and fade-in animations (Framer Motion or CSS), full `prefers-reduced-motion` support.
- **Responsive & accessible:** mobile-first, WCAG AA contrast, keyboard-navigable forms/map, alt text.

---

## Tech stack & non-functional
- **Framework:** Next.js (App Router, TypeScript) + Tailwind CSS.
- **DB/ORM:** Postgres (Neon/Supabase free tier) + Prisma.
- **Email:** Resend (React Email templates).
- **Map/data:** react-leaflet + OSM tiles; Open-Meteo APIs (no keys).
- **Validation:** Zod on API inputs; honeypot/basic rate-limit on the booking endpoint (anti-spam).
- **SEO:** per-page metadata, Open Graph images, `sitemap.xml`, `robots.txt`, JSON-LD `TouristTrip`/`LocalBusiness` schema; local-SEO copy (Budva, Kotor Bay).
- **Analytics:** Vercel Analytics or Plausible `‹CONFIRM›`.
- **Config:** all secrets in env vars (`DATABASE_URL`, `RESEND_API_KEY`, `ADMIN_PASSWORD`, `OWNER_EMAIL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, etc.).
- **Content:** tour/rental/FAQ/review copy in typed data/MDX files so the owner can edit without touching components.

---

## Suggested build order
1. Scaffold Next.js + Tailwind + fonts + design tokens; header/footer/layout.
2. Static marketing pages: Home (hero), Tours ×2, Rentals, About, Gallery, FAQ.
3. `LaunchMap` + `ConditionsWidget` + `/api/conditions`.
4. Prisma schema + DB; `BookingForm` + `POST /api/bookings` + capacity logic.
5. Resend email templates + owner/acknowledgement emails.
6. `/admin` dashboard + accept/decline routes + confirmation email.
7. Reviews, WhatsApp float, waiver, legal pages, SEO/schema, analytics.
8. Polish: animations, responsive/a11y pass, placeholder-content swap points.

---

## Details to confirm before/at build (non-blocking placeholders)
Business name & wordmark • logo • real tour photos • exact meeting points/coordinates for the map pins (parking, meeting, restroom, dock) in Budva & Kotor • final prices (tours + rental hourly/daily) • season dates & daily time slots • per-slot capacity • min age / group limits • what's included/excluded per tour • cancellation & weather policy wording • owner notification email address • WhatsApp number • domain name • real reviews • conditions status thresholds (wind/wave cut-offs).

---

## Verification (when built)
- **Booking happy path:** submit a booking on a staging deploy → confirm owner notification email arrives and booking shows `pending` in `/admin`.
- **Approval path:** click **Accept** in `/admin` → confirm the customer receives the confirmation email and status flips to `confirmed`; test **Decline** likewise.
- **Capacity:** book a slot to its limit → verify it shows "full"/blocks further bookings.
- **Waiver:** verify submit is blocked until the waiver checkbox is ticked.
- **Live features:** load a tour page → `ConditionsWidget` shows live water temp/wind + correct status colour; `LaunchMap` renders all four pin types with working directions links; verify graceful fallback when the conditions API is stubbed to fail.
- **Admin auth:** confirm `/admin` and the accept/decline routes reject unauthenticated access.
- **Cross-cutting:** mobile + desktop responsive check, keyboard/a11y pass, Lighthouse SEO/perf spot-check, `prefers-reduced-motion` honored.
