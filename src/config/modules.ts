/**
 * MODULES registry — mirrors the agency price list for type T1
 * (Corporate & presentation site). One entry per module id.
 *
 * kind:
 *   "flag"    — changes a code path; `isOn(id)` gates UI / routes / env.
 *   "service" — a service the agency performs; nothing to switch in code.
 *   "planned" — in the price list, NOT implemented in this template yet.
 *
 * tier: the lowest plan that includes the module ("addon" = off at every
 * plan unless enabled in site.config `features`).
 */
export type Tier = "basic" | "start" | "plus" | "pro" | "addon";
export type ModuleKind = "flag" | "service" | "planned";

export interface ModuleDef {
  name: string;
  tier: Tier;
  kind: ModuleKind;
  description: string;
  /** Env vars required only when the module is on. */
  envVars?: string[];
}

export const MODULES = {
  // ── Design & UI ────────────────────────────────────────────────────────
  "UI-01": { name: "Design system & theme", tier: "basic", kind: "service", description: "Theme presets in globals.css, selected via site.theme." },
  "UI-02": { name: "Responsive layout", tier: "basic", kind: "service", description: "All sections are mobile-first." },
  "UI-03": { name: "Header, navbar & footer", tier: "basic", kind: "service", description: "Navbar + Footer components." },
  "UI-04": { name: "Custom design from scratch", tier: "pro", kind: "service", description: "Bespoke design work; start from a new theme preset." },
  "UI-05": { name: "Video hero", tier: "plus", kind: "flag", description: "Hero plays site.media.heroVideo instead of the image." },
  "UI-06": { name: "Scroll animations & micro-interactions", tier: "start", kind: "flag", description: "Reveal / parallax / hover motion. Off = static markup." },
  "UI-07": { name: "Gallery grid + lightbox", tier: "start", kind: "flag", description: "Gallery section with keyboard-navigable lightbox." },
  "UI-08": { name: "Carousels / sliders", tier: "plus", kind: "planned", description: "Not in template yet — use a grid or add a slider lib." },
  "UI-09": { name: "Sticky CTA", tier: "plus", kind: "flag", description: "Floating call-to-action button after the hero." },
  "UI-12": { name: "FAQ accordion", tier: "start", kind: "flag", description: "FAQ section." },
  "UI-13": { name: "Flipbook", tier: "addon", kind: "planned", description: "Not in template yet." },
  "UI-14": { name: "UX helpers", tier: "basic", kind: "service", description: "Skip link, focus styles, reduced-motion support." },
  "UI-15": { name: "Pre-launch gate / Coming Soon", tier: "addon", kind: "flag", description: "proxy.ts rewrites every page to /coming-soon while COMING_SOON=1.", envVars: ["COMING_SOON", "COMING_SOON_BYPASS"] },
  "UI-16": { name: "Intro video splash", tier: "addon", kind: "planned", description: "Not in template yet." },
  "UI-17": { name: "Accessibility (WCAG basic)", tier: "pro", kind: "service", description: "Audit pass; baseline a11y is built in." },

  // ── Content & pages ────────────────────────────────────────────────────
  "CNT-01": { name: "One-page home (up to 6 sections)", tier: "basic", kind: "service", description: "site.sections controls which sections render." },
  "CNT-02": { name: "Multi-page (up to 5 pages)", tier: "start", kind: "flag", description: "Extra pages from src/content/pages/*.ts at /<slug> (max 5)." },
  "CNT-03": { name: "Multi-page (up to 10 pages)", tier: "plus", kind: "flag", description: "Raises the extra-page limit to 10." },
  "CNT-04": { name: "Extra page (each)", tier: "addon", kind: "service", description: "Add another file in src/content/pages." },
  "CNT-05": { name: "Contact page with form", tier: "basic", kind: "flag", description: "Contact section + POST /api/contact." },
  "CNT-06": { name: "Map & points of interest", tier: "basic", kind: "flag", description: "Google Maps embed (no key) + POI list." },
  "CNT-07": { name: "Legal pages", tier: "basic", kind: "flag", description: "/privacy and /terms from src/content/legal." },
  "CNT-08": { name: "Legal pages with admin editor", tier: "pro", kind: "planned", description: "Needs an admin + DB; this template is DB-free." },
  "CNT-09": { name: "Copywriting", tier: "basic", kind: "service", description: "Replace the demo copy in src/i18n/*.ts." },
  "CNT-11": { name: "Reviews section", tier: "start", kind: "flag", description: "Reviews section. Demo quotes are marked as samples — replace before enabling." },
  "CNT-12": { name: "Instagram / social feed", tier: "plus", kind: "flag", description: "Static feed from src/content/instagram.json (stub; no API)." },
  "CNT-13": { name: "Promo campaign (bar, popup, countdown)", tier: "addon", kind: "flag", description: "Promo bar with optional countdown from src/content/promo.ts." },
  "CNT-15": { name: "Restaurant menu page (images / PDF)", tier: "plus", kind: "flag", description: "/menu from src/content/menu.ts." },
  "CNT-16": { name: "Restaurant menu from DB with admin", tier: "pro", kind: "planned", description: "Needs a DB; not in this template." },
  "CNT-17": { name: "Blog / articles with admin", tier: "pro", kind: "planned", description: "Needs a DB; not in this template." },

  // ── Booking ────────────────────────────────────────────────────────────
  "BKG-13": { name: "Link to external booking engine", tier: "addon", kind: "flag", description: "CTA buttons open site.cta.externalBookingUrl." },

  // ── Integrations ───────────────────────────────────────────────────────
  "INT-05": { name: "GTM + GA4 with consent", tier: "start", kind: "flag", description: "Loads GTM or GA4 only after cookie consent.", envVars: ["NEXT_PUBLIC_GTM_ID", "NEXT_PUBLIC_GA4_ID"] },
  "INT-06": { name: "Search Console & Business Profile", tier: "basic", kind: "service", description: "Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION.", envVars: ["NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION"] },
  "INT-08": { name: "Newsletter integration", tier: "plus", kind: "flag", description: "Newsletter form → Resend audience or Brevo list; demo log otherwise.", envVars: ["RESEND_API_KEY", "RESEND_SEGMENT_ID", "BREVO_API_KEY", "BREVO_LIST_ID"] },
  "INT-09": { name: "WhatsApp / Viber button", tier: "plus", kind: "flag", description: "Floating chat buttons from brand.whatsapp / brand.viber." },

  // ── Admin ──────────────────────────────────────────────────────────────
  "ADM-01": { name: "Admin panel base", tier: "pro", kind: "planned", description: "No admin in this DB-free template." },
  "ADM-12": { name: "Site settings from admin", tier: "pro", kind: "planned", description: "Settings live in site.config.ts." },
  "ADM-16": { name: "2FA for admins", tier: "addon", kind: "planned", description: "No admin." },
  "ADM-17": { name: "Data import from legacy system", tier: "addon", kind: "service", description: "" },

  // ── Email ──────────────────────────────────────────────────────────────
  "EML-01": { name: "Transactional email infrastructure", tier: "basic", kind: "flag", description: "Resend sender in src/lib/email.ts; logs to console without a key.", envVars: ["RESEND_API_KEY", "EMAIL_FROM", "CONTACT_TO"] },

  // ── SEO & marketing ────────────────────────────────────────────────────
  "SEO-01": { name: "Technical SEO base", tier: "basic", kind: "service", description: "Metadata, sitemap, robots from site.config.", envVars: ["NEXT_PUBLIC_SITE_URL"] },
  "SEO-02": { name: "Structured data (JSON-LD)", tier: "plus", kind: "flag", description: "LocalBusiness JSON-LD in the root layout." },
  "SEO-03": { name: "Performance optimisation", tier: "basic", kind: "service", description: "next/image, font subsetting, lazy sections." },
  "SEO-04": { name: "Cookie consent (GDPR)", tier: "start", kind: "flag", description: "Consent banner; analytics wait for it." },
  "SEO-05": { name: "301 redirects from old site", tier: "addon", kind: "service", description: "Add entries to redirects() in next.config.ts." },
  "SEO-07": { name: "QR card / print material", tier: "addon", kind: "service", description: "" },

  // ── i18n ───────────────────────────────────────────────────────────────
  "I18-01": { name: "Bilingual site (2 languages)", tier: "basic", kind: "service", description: "en + el in src/i18n." },
  "I18-02": { name: "Extra language (each)", tier: "addon", kind: "service", description: "Add src/i18n/<code>.ts and register it — see CUSTOMIZE.md." },

  // ── Security ───────────────────────────────────────────────────────────
  "SEC-01": { name: "Basic security", tier: "basic", kind: "service", description: "Security headers in next.config.ts, server-side validation, honeypot." },
  "SEC-02": { name: "Rate limiting & anti-spam", tier: "start", kind: "flag", description: "Per-IP limiter on form endpoints (memory, or Upstash when configured).", envVars: ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"] },
  "SEC-04": { name: "CSP enforced & hardening audit", tier: "pro", kind: "flag", description: "Content-Security-Policy header set in proxy.ts." },

  // ── Analytics ──────────────────────────────────────────────────────────
  "ANL-01": { name: "First-party cookieless analytics", tier: "addon", kind: "planned", description: "Not in template (e.g. Plausible/Umami script)." },

  // ── Infra ──────────────────────────────────────────────────────────────
  "INF-01": { name: "Initial infrastructure setup", tier: "basic", kind: "service", description: "" },
  "INF-04": { name: "Monitoring, alerting & uptime", tier: "pro", kind: "service", description: "" },
  "INF-05": { name: "Automated tests & CI", tier: "addon", kind: "service", description: "" },
  "INF-06": { name: "Documentation & admin training", tier: "addon", kind: "service", description: "" },
  "INF-07": { name: "Photo & video editing", tier: "basic", kind: "service", description: "" },
  "INF-08": { name: "Pre-launch check & go-live", tier: "basic", kind: "service", description: "" },
} as const satisfies Record<string, ModuleDef>;

export type ModuleId = keyof typeof MODULES;
