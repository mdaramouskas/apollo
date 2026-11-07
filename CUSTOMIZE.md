# CUSTOMIZE — checklist for a new client

Work top to bottom. Search the repo for `TODO-CLIENT` to find every spot; the
list below is the same thing in order. Run `npm run check:template` at the end —
it fails on leftovers from the template's source project, not on your client's data.

## 1. `site.config.ts` (first, always)
- [ ] `plan` — basic / start / plus / pro, as sold.
- [ ] `brand.*` — name, legalName, tagline (every locale), domain, email, phones
      (primary first), whatsapp/viber (digits only), address (every locale), postcode,
      mapPin (lat/lng from Google Maps → right-click → copy coordinates), mapsUrl,
      social URLs, vatNumber, licenseNumber (ΜΗΤΕ if accommodation), schemaType,
      openingHours (schema.org format, e.g. `"Mo-Sa 10:00-22:00"`).
- [ ] `locales` — default language (what crawlers index) and supported list.
- [ ] `theme` — `"default"` or `"warm"` (or a new preset, §6).
- [ ] `features` — remove the `"CNT-11": false` line once real reviews are in; turn on add-ons sold.
- [ ] `integrations` — email / analytics / newsletter providers.
- [ ] `media` — paths to the real images (§3).
- [ ] `cta` — contact section or external booking URL (BKG-13).
- [ ] `sections` — order and presence of home sections (max 6 on Basic per price list).

## 2. Copy — `src/i18n/en.ts` and `src/i18n/el.ts`
- [ ] `hero`, `about` (body + 4 stats + image alts), `services.items` (icon key from
      `src/components/Services.tsx`), `faq.items`, `location.body` + `pois` (real
      distances), `contact.body`, `comingSoon`, `menuPage.intro`.
- [ ] `reviews.items` — **real, attributed** quotes only. The section shows a warning
      while any name contains "sample"/"ενδεικτικ".
- [ ] Keep both files the same shape — TypeScript (`satisfies Dict`) will tell you.

## 3. Images — `public/images/`
- [ ] Replace `placeholder-hero.svg` (≥1920×1080 jpg/webp), `placeholder-about-1/2.svg`
      (3:4), `placeholder-gallery-01..08.svg` (4:3), `placeholder-og.svg` (1200×630 jpg/png),
      `placeholder-menu-*.svg`, `placeholder-insta-*.svg`, `placeholder-coming-soon.svg`.
      Either keep the names or point `site.media.*` / content files to the new ones.
- [ ] `src/app/icon.svg` — favicon. Optionally add `apple-icon.png`.
- [ ] Video hero (UI-05): put `public/videos/hero.mp4` (≤6 MB, muted, 10–20 s) and set `media.heroVideo`.
- [ ] Delete `scripts/generate-placeholders.mjs` and the `placeholders` npm script if you like.

## 4. Content files — `src/content/`
- [ ] `legal/privacy.ts`, `legal/terms.ts` — review with the client, set `updated`.
      Placeholders `{email}`, `{legalName}`, `{address}` are filled from site.config.
- [ ] `pages/*.ts` — one file per extra page (CNT-02 ≤5, CNT-03 ≤10). Copy
      `our-story.ts`, change `slug`, register in `pages/index.ts`. Delete the demo page.
- [ ] `menu.ts` (CNT-15) — categories, items, prices, optional `pdf` (`/public/menu.pdf`).
- [ ] `promo.ts` (CNT-13) — text, link, countdown date.
- [ ] `instagram.json` (CNT-12) — 6 posts: image path, permalink, alt.

## 5. Environment — `.env.example` → Vercel
- [ ] `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `EMAIL_FROM`, `CONTACT_TO`.
- [ ] Analytics / newsletter / Upstash / coming-soon as sold.
- [ ] Never commit `.env*`.

## 6. Theme (optional)
Edit the `@theme` block in `src/app/globals.css` for the default preset, or add
`:root[data-theme="<name>"] { … }` overriding the color/font/radius variables and
add `<name>` to `ThemeKey` in `src/config/types.ts`. New font: `npm i
@fontsource-variable/<font>`, import it in `src/app/layout.tsx`, set the variable.

## 7. Adding a language (I18-02)
1. `cp src/i18n/en.ts src/i18n/de.ts`, translate, end the file with `satisfies Dict`
   (import `Dict` from `./index` like `el.ts` does).
2. In `src/i18n/index.ts`: import it, add it to `dictionaries`, `LANG_LABELS`, `LANG_NAMES`.
3. Add `"de"` to `locales.supported` in `site.config.ts` and fill the new key in every
   `Localized` object (`site.config.ts`, `src/content/**`) — TypeScript lists them all.

## 8. Before go-live
- [ ] `npm run build && npx tsc --noEmit && npm run check:template`
- [ ] Send a test message through the form on the preview URL; confirm the email arrives.
- [ ] Check the cookie banner → analytics only after "Accept".
- [ ] Submit `/sitemap.xml` in Search Console; set the verification token.
- [ ] Rename the repo / `package.json#name`; replace this file's title with the client name.
