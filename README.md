# tpl-corporate

Reusable Next.js template for price-list type **T1 — Corporate & presentation site**
(«Εταιρική παρουσίαση»). A one-page home (hero, about, services, gallery, reviews,
FAQ, map, contact form) plus optional inner pages, a restaurant/beach-bar **menu
page**, legal pages, two languages, cookie consent and consent-gated analytics.
**DB-free**: the only server code is the contact form and the newsletter stub.
New client = clone → fill `site.config.ts` → swap images/copy → set env → deploy.
Start/Basic/Plus/Pro are **feature flags in one codebase**, not branches.

Derived from a working villa site (Next 16.2, App Router, TS strict, Tailwind v4,
Framer Motion) with the booking engine removed — see §8.

## 2. Plans & modules

Flag names in code are the price-list ids (`isOn("UI-05")`). `kind` = flag (code
path switch), service (agency work, nothing to toggle) or planned (in the price
list, not in this template). ✓ = included at that plan; add-ons are off at every
plan until enabled in `site.features`.

| Module ID | Name | Basic | Start | Plus | Pro | Add-on | Flag/kind | Env vars |
|---|---|:-:|:-:|:-:|:-:|:-:|---|---|
| UI-01 | Design system & theme | ✓ | ✓ | ✓ | ✓ | | service (`site.theme`) | |
| UI-02 | Responsive layout | ✓ | ✓ | ✓ | ✓ | | service | |
| UI-03 | Header, navbar & footer | ✓ | ✓ | ✓ | ✓ | | service | |
| UI-04 | Custom design from scratch | | | | ✓ | | service | |
| UI-05 | Video hero | | | ✓ | ✓ | | flag | |
| UI-06 | Scroll animations | | ✓ | ✓ | ✓ | | flag | |
| UI-07 | Gallery + lightbox | | ✓ | ✓ | ✓ | | flag | |
| UI-08 | Carousels / sliders | | | ✓ | ✓ | | **planned** | |
| UI-09 | Sticky CTA | | | ✓ | ✓ | | flag | |
| UI-12 | FAQ accordion | | ✓ | ✓ | ✓ | | flag | |
| UI-13 | Flipbook | | | | | ✓ | **planned** | |
| UI-14 | UX helpers (skip link, focus, reduced motion) | ✓ | ✓ | ✓ | ✓ | | service | |
| UI-15 | Coming-soon gate | | | | | ✓ | flag | `COMING_SOON`, `COMING_SOON_BYPASS` |
| UI-16 | Intro video splash | | | | | ✓ | **planned** | |
| UI-17 | Accessibility (WCAG basic) | | | | ✓ | | service | |
| CNT-01 | One-page home (≤6 sections) | ✓ | ✓ | ✓ | ✓ | | service (`site.sections`) | |
| CNT-02 | Multi-page (≤5 pages) | | ✓ | ✓ | ✓ | | flag | |
| CNT-03 | Multi-page (≤10 pages) | | | ✓ | ✓ | | flag | |
| CNT-04 | Extra page (each) | | | | | ✓ | service | |
| CNT-05 | Contact page with form | ✓ | ✓ | ✓ | ✓ | | flag | (see EML-01) |
| CNT-06 | Map & POIs | ✓ | ✓ | ✓ | ✓ | | flag | |
| CNT-07 | Legal pages | ✓ | ✓ | ✓ | ✓ | | flag | |
| CNT-08 | Legal pages with admin editor | | | | ✓ | | **planned** (needs DB) | |
| CNT-09 | Copywriting | ✓ | ✓ | ✓ | ✓ | | service | |
| CNT-11 | Reviews section | | ✓ | ✓ | ✓ | | flag (shipped **off** — sample data) | |
| CNT-12 | Instagram / social feed | | | ✓ | ✓ | | flag (static JSON stub) | |
| CNT-13 | Promo bar / countdown | | | | | ✓ | flag | |
| CNT-15 | Restaurant menu page | | | ✓ | ✓ | | flag | |
| CNT-16 | Menu from DB with admin | | | | ✓ | | **planned** (needs DB) | |
| CNT-17 | Blog with admin | | | | ✓ | | **planned** (needs DB) | |
| BKG-13 | Link to external booking engine | | | | | ✓ | flag | |
| INT-05 | GTM + GA4 with consent | | ✓ | ✓ | ✓ | | flag | `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_GA4_ID` |
| INT-06 | Search Console & Business Profile | ✓ | ✓ | ✓ | ✓ | | service | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` |
| INT-08 | Newsletter integration | | | ✓ | ✓ | | flag | `RESEND_SEGMENT_ID` or `BREVO_API_KEY`, `BREVO_LIST_ID` |
| INT-09 | WhatsApp / Viber button | | | ✓ | ✓ | | flag | |
| ADM-01 / ADM-12 / ADM-16 | Admin panel, settings, 2FA | | | | ✓ | | **planned** (no admin here) | |
| ADM-17 | Data import | | | | | ✓ | service | |
| EML-01 | Transactional email | ✓ | ✓ | ✓ | ✓ | | flag | `RESEND_API_KEY`, `EMAIL_FROM`, `CONTACT_TO` |
| SEO-01 | Technical SEO base | ✓ | ✓ | ✓ | ✓ | | service | `NEXT_PUBLIC_SITE_URL` |
| SEO-02 | JSON-LD | | | ✓ | ✓ | | flag | |
| SEO-03 | Performance | ✓ | ✓ | ✓ | ✓ | | service | |
| SEO-04 | Cookie consent | | ✓ | ✓ | ✓ | | flag | |
| SEO-05 | 301 redirects | | | | | ✓ | service (`next.config.ts`) | |
| SEO-07 | QR card / print | | | | | ✓ | service | |
| I18-01 | Bilingual (en + el) | ✓ | ✓ | ✓ | ✓ | | service | |
| I18-02 | Extra language | | | | | ✓ | service (see CUSTOMIZE.md) | |
| SEC-01 | Basic security | ✓ | ✓ | ✓ | ✓ | | service (headers, validation, honeypot) | |
| SEC-02 | Rate limiting & anti-spam | | ✓ | ✓ | ✓ | | flag | optional `UPSTASH_REDIS_REST_URL`, `_TOKEN` |
| SEC-04 | CSP enforced | | | | ✓ | | flag | |
| ANL-01 | Cookieless analytics | | | | | ✓ | **planned** | |
| INF-01/04/05/06/07/08 | Setup, monitoring, tests, docs, photos, go-live | varies | | | | | service | |

**Basic** = one-page home, contact form, map, legal pages, 2 languages, SEO base,
email infra, security headers — nothing else. Flip `plan` in `site.config.ts`; add
or remove single modules under `features`.

## 3. Quick start

```bash
git clone <this repo> my-client && cd my-client
npm install
cp .env.example .env.local      # optional — everything works empty
npm run dev                      # http://localhost:3000, demo mode
```

Demo mode (empty env): the contact form validates and returns success while the
message is **logged on the server** and the UI shows a "demo mode" note; no
analytics; newsletter logs only. Fonts are self-hosted from npm, so **no network
is needed at build time**.

Checks before delivery:

```bash
npm run build
npx tsc --noEmit
npm run check:template           # fails on leftover client strings / secrets
```

## 4. Customize

Follow [`CUSTOMIZE.md`](CUSTOMIZE.md) top to bottom. In short:

- `site.config.ts` — brand, contact, address, map pin, plan, theme, flags, media paths, sections.
- `src/i18n/en.ts`, `src/i18n/el.ts` — every piece of copy (hero, about, services, FAQ, POIs, reviews, forms).
- `src/content/` — legal pages, extra pages, menu, promo, Instagram JSON.
- `public/images/` — replace the `placeholder-*.svg` files (keep names or update `site.config.ts`).

**Themes** — `site.theme` selects a preset: `"default"` (neutral, Inter, rounded
corners, thin line ornament) or `"warm"` (terracotta/boho: Commissioner + EB
Garamond, arch-shaped images, squiggle). Presets are CSS variable blocks in
`src/app/globals.css` (`:root[data-theme="…"]`); add one by copying the warm block
and adding the key to `ThemeKey` in `src/config/types.ts`. Token names
(`cream/sand/stone/ink/deep/bronze`) are semantic and reused by all components.

**Locales** — client-side context (`src/lib/i18n.tsx`), dictionaries in
`src/i18n/*.ts`, default + supported list in `site.config.ts`. Adding a language is
one new dictionary file plus registering it (CUSTOMIZE.md §7). Limitation: the
non-default language is applied after hydration, so crawlers index the default
language only — if per-language SEO matters, migrate to URL-based i18n.

## 5. Integrations

### Resend (EML-01, INT-08)
1. Create an account, verify the client's sending domain (DNS records Resend shows).
2. `RESEND_API_KEY=re_…`, `EMAIL_FROM="Client <no-reply@client.gr>"`, `CONTACT_TO=client@…`.
3. Newsletter: set `integrations.newsletter: "resend"` and optionally `RESEND_SEGMENT_ID`.
Without a key the sender logs to the console and reports `demo: true`.

### Brevo newsletter (INT-08)
`integrations.newsletter: "brevo"`, `BREVO_API_KEY`, `BREVO_LIST_ID` (numeric). Uses the
`/v3/contacts` endpoint with `updateEnabled`.

### Google Tag Manager / GA4 (INT-05 + SEO-04)
`integrations.analytics: "gtm" | "ga4"` and the matching `NEXT_PUBLIC_GTM_ID` /
`NEXT_PUBLIC_GA4_ID`. Scripts are injected **only after** the visitor accepts the
cookie banner (stored in `localStorage["cookie-consent"]`). If SEO-04 is off, consent
is assumed — confirm that is acceptable for the client first.

### Upstash (SEC-02, optional)
`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` → shared limiter across
serverless instances (5 requests / 10 min per IP on `/api/contact` and
`/api/newsletter`). Without them an in-memory limiter per instance is used.

### Google Maps (CNT-06)
Keyless `maps.google.com/maps?q=…&output=embed` iframe from `brand.mapPin`; the
"Open in Google Maps" button uses `brand.mapsUrl` or a search link to the pin.

### External booking engine (BKG-13)
`features["BKG-13"]: true`, `cta.target: "external"`, `cta.externalBookingUrl`. The hero,
navbar and sticky CTA then open that URL in a new tab.

### Coming-soon gate (UI-15)
`features["UI-15"]: true`, then in Vercel `COMING_SOON=1` and a random
`COMING_SOON_BYPASS`. Every page rewrites to `/coming-soon`; opening any URL with
`?preview=<bypass>` sets a 30-day cookie that lets the client review the real site.
Remove `COMING_SOON` to launch.

## 6. Deploy

- Vercel: import the GitHub repo, set env vars from `.env.example`, deploy by
  **pushing to `main`**. Build command `next build`, Node as in `package.json` engines (none pinned; Node 20/22 works).
- **Never `vercel deploy` from a working directory that contains `.env`** — the
  CLI uploads the directory. `.vercelignore` excludes `.env*` as a safety net.
- No cron jobs and no database in this template (`vercel.json` not needed).
- After the first deploy: set `NEXT_PUBLIC_SITE_URL`, submit `/sitemap.xml` in
  Search Console, add the verification token.

## 7. Security notes

Applied vs. the source project (findings for the source repo, Critical/High):
- **Contact form actually sends** (Resend) with a visible demo fallback instead of silently
  dropping requests (source: booking requests were lost in demo mode; no emails at all).
- **Security headers** in `next.config.ts` (HSTS, nosniff, X-Frame-Options DENY,
  Referrer-Policy, Permissions-Policy, no `x-powered-by`); optional enforced **CSP** (SEC-04).
- **Rate limiting + honeypot** on both POST endpoints (source had none).
- **Server-side validation** with max lengths for every field, phone regex, consent required.
- **HTML escaping** of user input in the notification email.
- JSON-LD output escapes `<` to prevent script break-out.
- Lightbox: focus moves to the close button and returns to the opener; `aria-modal`.
- Reduced-motion respected in hero/navbar/reveal (source only in Reveal).

Skipped (not applicable after removing the booking engine): webhook idempotency,
date holds, Stripe metadata length. Skipped (go-live/content): env setup, Beds24
verification, displaying licence number (now shown automatically when set).

Review before go-live: CSP allow-list if you add third-party embeds; cookie text
vs. the analytics actually used; legal copy with the client; `openingHours` format.

## 8. Removed from the source project, and why

- **Booking engine**: Beds24 client, availability API, custom calendar, Stripe
  Checkout + webhook, Supabase cache/audit tables, `supabase/schema.sql`, country
  dial-code list, booking copy and env vars. T1 sites do not take bookings; the
  stay-booking template owns that code. BKG-13 (external link) covers the common ask.
- **All client data and media**: names, address, coordinates, phones, licence
  number, 49 photos, hero video, Search Console token, POIs, house rules, fake
  placeholder reviews (replaced with clearly labelled samples, section off by default).
- `scripts/import-photos.mjs` (hard-coded Windows path to the client's photo folder)
  → replaced by `scripts/generate-placeholders.mjs`.
- Client-specific `AGENTS.md`; replaced by a short template `CLAUDE.md`.
- Google Fonts fetched at build (`next/font/google`) → `@fontsource-variable/*` from npm,
  so builds work offline and are reproducible.
