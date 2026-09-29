# SEO & AI visibility

Target searches: **„денонощен зъболекар в Пловдив“**, **„спешен зъболекар в Пловдив“**, **„зъболекар в Пловдив“**. We also want ChatGPT, Claude, Perplexity and Gemini to recommend the clinic.

The website side is done in code (see "What the site already does"). For local searches, most of the ranking comes from **Google Maps (the Business Profile)**, **reviews** and **mentions on other websites**. That work is in the checklist below.

## What the site already does

- Keyword-targeted titles, H1s, descriptions and FAQs on the home page, the emergency page and every service page.
- `schema.org` JSON-LD: `Dentist` with a 24/7 `EmergencyService` department, areas served, a Google Maps link (from `GOOGLE_PLACE_ID`), `FAQPage`, `BreadcrumbList`, `Service`, and `Article` on guides.
- Patient guides at `/saveti` (`/en/guides`), in `src/content/guides.ts`. These are answer-first articles that search engines and LLMs quote.
- `/llms.txt` and `/llms-full.txt` give AI assistants a Markdown summary and the full text of the site. They're generated from the content files, so they're always current, including the live emergency number.
- `robots.txt` explicitly allows search and AI crawlers: Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot and others.
- A sitemap with hreflang (bg/en).
- IndexNow: `npm run indexnow` after a production deploy pings Bing, which feeds ChatGPT Search and Copilot.

## After every deploy that changes content

1. Bump `CONTENT_UPDATED` in `src/content/clinic.ts`, and `updated` on any guide you edited.
2. `npm run indexnow` (or `node scripts/indexnow.mjs /saveti/<slug>` for specific pages).
3. Google Search Console → URL Inspection → "Request indexing" for the pages you changed.

## One-time setup

- [ ] **Google Search Console**: verify the domain (`GOOGLE_SITE_VERIFICATION` env var) and submit `https://tandcodental.com/sitemap.xml`.
- [ ] **Bing Webmaster Tools**: import the site from Search Console and submit the sitemap. This matters for ChatGPT and Copilot.
- [ ] Set `GOOGLE_PLACE_ID` in production. The structured data then links the Google Maps listing.
- [ ] Fill in the postal code in `src/content/clinic.ts` (`postalCode`, currently empty).
- [ ] Check `geo` coordinates in `src/content/clinic.ts`: drop a pin on the entrance in Google Maps.
- [ ] For each guide, ask a dentist to review it. With their consent, set `reviewer: "boyadzhiev"` or `"tairyumer"` in `src/content/guides.ts`. A named reviewer strengthens medical content (E-E-A-T).

## Google Business Profile (the most important thing for „зъболекар в Пловдив“)

- [ ] Primary category: **Зъболекар** (Dentist). Secondary: **Спешна стоматологична помощ** (Emergency dental service) and **Стоматологична клиника** (Dental clinic).
- [ ] Hours: Mon–Fri 9:00–20:00 **and** add "More hours" → "Emergency hours" → Open 24 hours. Use "Open 24 hours" as the main hours only if the phone really is answered around the clock.
- [ ] The name, address and phone must match the website exactly: **T&Co Dental, ул. „Даме Груев“ 34, Пловдив**. Don't add keywords to the business name; Google suspends listings for that.
- [ ] Website link → `https://tandcodental.com`. Appointment link → `https://tandcodental.com/zapazi-chas`.
- [ ] Add all services, with short descriptions that use the words patients search for (спешен, денонощен, НЗОК, рентген).
- [ ] Photos: entrance (so people can find it at night), interior, team, equipment. Add new ones every month.
- [ ] Post a Google update every week or two, e.g. a guide from the site, or a reminder that the clinic works on holidays.
- [ ] Add your own Q&A: „Работите ли през нощта?“, „Работите ли с НЗОК?“, „Приемате ли деца?“.

## Reviews (the strongest local ranking factor you can influence)

- [ ] Ask every satisfied patient for a Google review. Use a QR code at the reception desk and a link in the booking confirmation email.
- [ ] Reply to every review, positive and negative, within a few days.
- [ ] Never buy or script reviews. It's fine for patients to mention in their own words that they came in at night or at the weekend, since that helps with „денонощен“ searches naturally.

## Other listings (consistent name, address and phone everywhere)

- [ ] Bing Places for Business. ChatGPT and Copilot draw on Bing data.
- [ ] Apple Business Connect, for Apple Maps and Siri.
- [ ] Bulgarian directories: superdoc.bg, zabolekari.bg / dentist directories, puls.bg, Zlatnite stranici (goldenpages.bg), bgdoctors, and the Plovdiv city guides.
- [ ] Facebook and Instagram: same name, address and phone, a link to the website, and hours including emergency hours.
- [ ] Optional: a Wikidata item for the clinic, with address, website and coordinates. LLMs use Wikidata as a trusted source.

## Mentions on other websites (what makes LLMs recommend the clinic)

LLMs recommend businesses that other trusted sites talk about.

- [ ] Local news and Plovdiv portals, e.g. articles like „Къде има денонощен зъболекар в Пловдив“, or holiday lists of places on duty („дежурни кабинети по празниците“).
- [ ] Answer questions in Plovdiv Facebook groups and on BG forums, openly as the clinic, when someone asks for an emergency dentist.
- [ ] Partnerships: hotels, hostels and expat groups in Plovdiv. The English site helps here, with searches like "emergency dentist Plovdiv".

## Monthly check

- Search Console → Performance: impressions and position for the three target phrases.
- Ask ChatGPT, Perplexity, Gemini and Claude: „Кой е денонощен зъболекар в Пловдив?“ and "emergency dentist in Plovdiv". Write down whether T&Co Dental is mentioned and which sources they cite, then get listed on those sources.
