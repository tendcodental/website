# T&Co Dental — tandcodental.com

Website for **T&Co Dental**, a dental clinic and 24/7 emergency dental service in Plovdiv (ул. „Даме Груев“ 34).
Bulgarian first (`/`), English under `/en`.

- **Setup & deployment:** [`docs/SETUP.md`](docs/SETUP.md) covers Google Calendar, the emergency-phone Google Sheet, email, reviews, Vercel and SEO.
- **Guide for clinic staff (BG):** [`docs/STAFF-GUIDE.bg.md`](docs/STAFF-GUIDE.bg.md)

## Stack

Next.js 16 (App Router, static pages + ISR) · React 19 · Tailwind CSS 4 · shadcn/ui (Radix) · next-intl · MapLibre + OpenFreeMap · Google Calendar / Sheets / Places APIs (server-side service account) · Resend · Vercel.

## Features

- **Online booking** (home-page section, `/zapazi-chas`, and a modal on every other page): choose a doctor or "first available", a day and a 1-hour slot, and the reason. The booking is written straight into the shared Google Calendar with a per-doctor colour. Staff-created events, absences and public holidays grey out slots automatically. Concurrent bookings of the same slot are impossible (deterministic event IDs). Email confirmation with a calendar file, plus a reminder the day before.
- **Emergency number from Google Sheets:** tick a checkbox and the number shows everywhere within a minute (or instantly via Apps Script). No deployment needed.
- **Google reviews:** average rating, count and a review marquee, refreshed automatically.
- **SEO:** per-page titles/descriptions, canonical + hreflang (bg/en/x-default), Bulgarian transliterated URLs, sitemap with alternates, robots, manifest, generated Open Graph images, JSON-LD (Dentist + 24/7 EmergencyService, services, breadcrumbs, FAQ, doctors), semantic HTML with one H1 per page.
- **Performance:** static HTML, self-hosted fonts, AVIF/WebP images, CSS-only scroll animations, and the map and booking code loaded only when needed.

## Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Without credentials, booking runs against an in-memory **demo calendar** and emails are logged to the console.

| Command | |
|---|---|
| `npm run dev` / `build` / `start` | Next.js (copies the MapLibre worker to `public/vendor` first) |
| `npm run lint` / `typecheck` | ESLint / TypeScript |
| `npm run generate:assets` | Regenerate favicons, app icons and the marble texture from the vector logo |

> On Windows, npm scripts break if the folder path contains `&` (e.g. `T&Co`). Rename the folder or run `node node_modules/next/dist/bin/next dev`.

## Where things live

| Content | File |
|---|---|
| Clinic facts (address, email, socials, coordinates) | `src/content/clinic.ts` |
| Doctors (names, contacts, photos, calendar colours, working hours) | `src/content/doctors.ts` |
| Services (all pages, BG + EN) | `src/content/services/*.ts` |
| Booking reasons / general FAQ / privacy policy | `src/content/booking.ts`, `faq.ts`, `privacy.ts` |
| UI texts | `messages/bg.json`, `messages/en.json` |
| Booking rules (slot length, lead time, window…) | `src/lib/booking/config.ts` |
| Brand colours & fonts | `src/app/globals.css`, `src/app/[locale]/layout.tsx` |
