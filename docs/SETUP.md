# T&Co Dental — setup guide

Everything the website needs to go live, in order. Most steps are one-time. Budget about 1–2 hours.

| # | What | Needed for | Required? |
|---|------|-----------|-----------|
| 1 | Google Cloud service account | Calendar + emergency-phone sheet | **Yes** |
| 2 | Google Calendar sharing | Online booking | **Yes** |
| 3 | Emergency-phone Google Sheet | Header/footer emergency number | **Yes** |
| 4 | Apps Script trigger | Instant phone updates (otherwise ≤ 1 min) | Optional |
| 5 | Resend (email) | Confirmations, reminders, contact form | **Yes** (for email) |
| 6 | Google Places API | Live Google rating + reviews | Recommended |
| 7 | Vercel deployment + domain | Hosting | **Yes** |
| 8 | Search Console + Business Profile | SEO | **Yes** |
| 9 | Replace placeholder content | Launch | **Yes** |

All secrets live in environment variables on the server (see `.env.example`). Nothing secret is ever sent to the browser.

---

## 0. Run it locally

```bash
npm install
cp .env.example .env.local   # then fill in what you have
npm run dev                  # http://localhost:3000
```

Without Google credentials, local development uses an **in-memory demo calendar** (you'll see a "Демо режим" badge) and logs emails to the terminal instead of sending them, so you can try the whole booking flow immediately.

> **Windows note:** npm scripts fail when the project path contains `&` (e.g. `Desktop\T&Co\…`), because `cmd.exe` treats `&` as a command separator. Rename the folder (e.g. `TandCo`), or run Next.js directly: `node node_modules/next/dist/bin/next dev`. This only affects local Windows development, not Vercel.

---

## 1. Google Cloud service account

The website talks to Google Calendar and Google Sheets as a "robot" Google account (a service account). The robot only sees what you explicitly share with it.

1. Open <https://console.cloud.google.com/> with the clinic's Google account and **create a project**, e.g. `tandco-website`.
2. **APIs & Services → Library** → enable:
   - **Google Calendar API**
   - **Google Sheets API**
   - **Places API (New)**, if you want Google reviews (step 6)
3. **IAM & Admin → Service Accounts → Create service account**
   - Name: `tandco-website`. Skip the optional role and user-access steps.
4. Open the new service account → **Keys → Add key → Create new key → JSON**. A `.json` file downloads.
5. From that file, copy into your environment variables:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY` (paste the whole value, including `-----BEGIN…` and the `\n` sequences, inside double quotes)

Keep the JSON file somewhere safe (a password manager). Never commit it to git.

---

## 2. Google Calendar (online booking)

Both doctors use **one calendar**. We recommend a dedicated calendar inside the clinic's Google account, e.g. **"T&Co Dental — Часове"** (Google Calendar → *Other calendars* → **+** → *Create new calendar*). Both doctors can add it on their phones.

1. Google Calendar → ⚙ **Settings** → pick that calendar on the left.
2. **Share with specific people or groups → Add people** → paste the service-account email → permission **"Make changes to events"** → Send.
3. On the same page, under **Integrate calendar**, copy the **Calendar ID** → `GOOGLE_CALENDAR_ID`.

**How bookings appear**

- Title: `Иван Петров · Зъбобол или чувствителност · д-р Бояджиев`
- Colour per doctor: **Peacock / blue = д-р Бояджиев**, **Tangerine / orange = д-р Таирюмер**. Change these in `src/content/doctors.ts` (`calendarColorId`: 1 Lavender, 2 Sage, 3 Grape, 4 Flamingo, 5 Banana, 6 Tangerine, 7 Peacock, 8 Graphite, 9 Blueberry, 10 Basil, 11 Tomato).
- Description: phone, email, reason, NZOK preference and the patient's note.

**How the calendar controls availability** (one chair, so one patient per hour)

| Staff action in Google Calendar | Effect on the website |
|---|---|
| Any timed event (phone booking, break, meeting…) | That hour is greyed out for **both** doctors |
| Timed event in a doctor's colour titled "Отсъства", "Отпуск", "Почивка" or "Болничен" | Blocks **only that doctor** |
| All-day event in a doctor's colour | That doctor is off that day |
| All-day event in any other colour (e.g. "Затворено") | No online booking that day |
| Event marked **Free** ("Show as: Free") | Doesn't block anything, useful for notes |
| Delete or move an online booking | The old slot frees up automatically |

Bulgarian public holidays (including Orthodox Easter and the moved day off when a holiday falls on a weekend) are blocked automatically. Extra days off announced by the government → add an all-day event.

**Booking rules** (in `src/lib/booking/config.ts`): 60-minute slots, Mon–Fri 09:00–18:00 per doctor (`schedule` in `src/content/doctors.ts`), same-day bookings at least 2 hours ahead, up to 60 days ahead, one online booking per phone number per day (a patient can still book a different day online; a second same-day slot needs a phone call).

Two people can't book the same slot: the calendar event ID is derived from the slot, so Google rejects the second insert.

---

## 3. Emergency-phone Google Sheet

The emergency number(s) shown in the header, footer, mobile bar and everywhere else come from this sheet. Staff change them there, with no deployment needed.

1. Create a Google Sheet, e.g. **"T&Co — спешни телефони"**.
2. Set up the first tab like this:

   | | A | B | C |
   |---|---|---|---|
   | **1** | Етикет | Телефон | Активен |
   | **2** | Дежурен 1 | 0888 000 247 | ☑ |
   | **3** | Дежурен 2 | 0899 000 247 | ☐ |

   - Column A is only for staff (never shown on the site).
   - **Column B:** select the column → *Format → Number → Plain text* **before** typing numbers, otherwise Sheets drops the leading 0 or treats `+359…` as a formula. Any of `0888 123 456`, `+359 888 123 456` or `00359888123456` works.
   - **Column C:** select C2:C3 → *Insert → Checkbox*.
3. **Share** → add the service-account email as **Viewer** (untick "Notify").
4. Copy the sheet ID from the URL (`https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`) → `GOOGLE_SHEET_ID`.
5. If the data isn't on the first tab, set `GOOGLE_SHEET_RANGE`, e.g. `'Спешни телефони'!A2:C20`.

**Behaviour**

- Every ticked row is shown. Tick two numbers and both appear.
- Changes appear on the whole site **within about 60 seconds** (or instantly with step 4).
- If nothing is ticked, or Google is unreachable, the site shows `EMERGENCY_PHONE_FALLBACK`, so it never shows an empty number.

---

## 4. Instant updates (optional)

1. In the sheet: **Extensions → Apps Script**. Paste the contents of `docs/apps-script/instant-update.gs` → Save.
2. ⚙ **Project Settings → Script properties → Add**:
   - `SITE_URL` = `https://tandcodental.com`
   - `REVALIDATE_SECRET` = the same long random value as the `REVALIDATE_SECRET` environment variable in Vercel
3. ⏰ **Triggers → Add Trigger** → function `onPhonesEdited` · *From spreadsheet* · *On edit* → Save → allow access.
4. Run `testConnection` once from the editor. The log should show `HTTP 200`.

---

## 5. Email (Resend)

Used for the patient confirmation (with a calendar file), the reminder the day before, the clinic's "new booking" email, and the contact form.

1. Create an account at <https://resend.com> (the free plan is plenty for a clinic).
2. **Domains → Add domain** → `tandcodental.com` → add the DNS records Resend shows (SPF/DKIM) at your domain registrar → wait until the domain shows **Verified**.
3. **API Keys → Create** (sending access) → `RESEND_API_KEY`.
4. `EMAIL_FROM="T&Co Dental <booking@tandcodental.com>"`. The mailbox doesn't need to exist; replies go to `contact@tandcodental.com`.
5. `CLINIC_NOTIFY_EMAIL=contact@tandcodental.com` is where new-booking and contact-form emails arrive.

**Reminders:** `vercel.json` runs `/api/cron/reminders` daily at 15:00 UTC (18:00 in summer, 17:00 in winter). It emails everyone booked for tomorrow who left an email, once. Set `CRON_SECRET` in Vercel so only Vercel can trigger it.

---

## 6. Google rating & reviews (Places API)

1. Make sure the clinic has a **Google Business Profile** (step 8). Find its **Place ID** with Google's [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id) → `GOOGLE_PLACE_ID`.
2. Google Cloud → **APIs & Services → Credentials → Create credentials → API key**. Under **API restrictions** allow only **Places API (New)** → `GOOGLE_PLACES_API_KEY`. The key is only used on the server.
3. Google requires a billing account on the project. The site fetches the rating about 4 times a day per language (~240 calls/month). At the time of writing that's inside Google's free monthly allowance, but check current Maps pricing and set a budget alert.

The site shows the average rating, the total count (both update automatically every 6 hours) and a marquee of the latest 4–5★ reviews Google returns (Google returns up to 5). Without the key, a "reviews on Google" card is shown instead. Placeholder reviews only ever appear in local development.

---

## 7. Deploy on Vercel

1. Push the project to a GitHub repository.
2. <https://vercel.com> → **Add New → Project** → import the repository (framework: Next.js, detected automatically).
3. **Settings → Environment Variables:** add everything from `.env.example` for the **Production** environment. For Preview deployments you can set `BOOKING_DEMO_MODE=true` instead of Google credentials. Never set it on Production.
4. Deploy.
5. **Settings → Domains:** add `tandcodental.com` and `www.tandcodental.com` (redirect www → apex). Follow the DNS instructions.
6. Check: `https://tandcodental.com/robots.txt`, `/sitemap.xml`, and make a test booking. Delete the test event from the calendar afterwards.

Region is set to Frankfurt (`fra1`), close to Bulgaria. Preview deployments automatically send `Disallow: /` in robots.txt.

---

## 8. SEO launch

**Google Search Console** (<https://search.google.com/search-console>)

1. Add a **Domain property** for `tandcodental.com` and verify via DNS. Alternatively use the HTML-tag method and put the token in `GOOGLE_SITE_VERIFICATION`.
2. **Sitemaps** → submit `https://tandcodental.com/sitemap.xml`.
3. Use **URL Inspection** on the home page and a couple of service pages → *Request indexing*.
4. Optional: repeat in Bing Webmaster Tools (it can import from Search Console).

**Google Business Profile.** This is the single most important thing for "зъболекар Пловдив" searches.

- Name exactly **T&Co Dental**; address **ул. „Даме Груев“ 34, Пловдив**, identical to the website.
- Primary category **Dentist (Зъболекар)**. Add **Emergency dental service** if it's offered in the category list.
- Website `https://tandcodental.com`; booking link `https://tandcodental.com/zapazi-chas`.
- Regular hours Mon–Fri 9:00–18:00. Describe the 24/7 emergency service in the description and posts.
- Upload real photos (entrance, treatment room, team) and ask happy patients for reviews. The site has a "Оставете отзив" button once the Place ID is set.
- Keep name/address/phone identical on Facebook, Instagram and directories.

**Structured data** is already on the pages: Dentist + EmergencyService (24/7), opening hours, address, geo, sameAs, services, breadcrumbs, FAQ, doctors. Test any page at <https://search.google.com/test/rich-results>.

---

## 9. Replace placeholder content before launch

| What | Where |
|---|---|
| Doctors' phone numbers, emails, bios, focus areas | `src/content/doctors.ts` |
| д-р Бояджиев's photo (square, ≥ 800 px) | put in `public/images/`, set `photo` in `doctors.ts` |
| Fallback emergency number | `EMERGENCY_PHONE_FALLBACK` |
| Postal code | `src/content/clinic.ts` → `postalCode` |
| Exact map pin (drop a pin on the entrance in Google Maps, copy the coordinates) | `src/content/clinic.ts` → `geo` |
| Company name, UIC (ЕИК), registered address, and a legal review | `src/content/privacy.ts` |
| Entrance directions ("under the sign Зъболекарски кабинети Южен") | `messages/bg.json` / `en.json` → `contact.entranceText` |
| Logo | original artwork in `src/assets/brand/` (mark, wordmark, light wordmark); favicons/app icons regenerate with `npm run generate:assets` |

Texts shared across pages live in `messages/bg.json` and `messages/en.json`. Service pages live in `src/content/services/*.ts` (Bulgarian and English side by side). After editing, redeploy (push to GitHub).

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Booking says "Онлайн записването временно не е достъпно" | Check `GOOGLE_*` variables, that the calendar is shared with **Make changes to events**, and the Vercel function logs |
| Emergency number shows the fallback | Sheet not shared with the service account, wrong `GOOGLE_SHEET_ID`/range, or no box ticked |
| Phone shows without the leading 0 | Column B isn't *Plain text* (the site handles this, but fix the column anyway) |
| No emails | Resend domain not verified, or `RESEND_API_KEY` missing; check Resend → Logs |
| Reviews section shows only a Google card | `GOOGLE_PLACES_API_KEY` / `GOOGLE_PLACE_ID` missing, or billing not enabled |
| `private key` / `invalid_grant` errors | `GOOGLE_PRIVATE_KEY` must keep its `\n` sequences and be wrapped in double quotes |
