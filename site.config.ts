import type { SiteConfig } from "@/config/types";

/**
 * THE single file a new client project edits first.
 * Everything marked TODO-CLIENT must be replaced. No secrets here — those go
 * in .env (see .env.example). Copy in every locale listed in `locales.supported`.
 */
export const site: SiteConfig = {
  // "basic" | "start" | "plus" | "pro" — see README "Plans & modules".
  plan: "basic",

  brand: {
    name: "Apollo Greek Cuisine",
    legalName: "Apollo Greek Cuisine", // TODO-CLIENT legal name (επωνυμία) as on the invoices
    tagline: { en: "Greek restaurant in Argassi, Zakynthos", el: "Ελληνικό εστιατόριο στο Αργάσι της Ζακύνθου" },
    domain: "example.com", // TODO-CLIENT
    email: "", // TODO-CLIENT business email (contact form delivery + footer); not known yet
    phones: [], // TODO-CLIENT phone not known yet — ask the owner
    whatsapp: "", // TODO-CLIENT digits only, e.g. "306900000000" (INT-09)
    viber: "", // TODO-CLIENT digits only (INT-09)
    address: {
      line1: { en: "Argassi", el: "Αργάσι" }, // TODO-CLIENT street + number not known yet
      city: { en: "Zakynthos", el: "Ζάκυνθος" },
      postcode: "29100", // from the Instagram profile
      country: "GR",
    },
    mapPin: { lat: 37.7634254, lng: 20.925667 }, // from the Google Maps listing — only used for JSON-LD; the map embed searches by mapQuery
    mapQuery: "Apollo Greek Cuisine, Argassi, Zakynthos",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Apollo+Greek+Cuisine+Argassi+Zakynthos",
    social: { instagram: "https://www.instagram.com/apollo_greek_cuisine/", facebook: "" }, // TODO-CLIENT facebook if any
    vatNumber: "", // TODO-CLIENT
    licenseNumber: "", // TODO-CLIENT e.g. tourism licence (ΜΗΤΕ); shown in footer when set
    schemaType: "Restaurant", // "Restaurant" | "BarOrPub" | "ProfessionalService" | "Hotel" | "Organization"
    openingHours: [], // TODO-CLIENT not known yet — ask the owner (schema.org format)
  },

  locales: { default: "en", supported: ["en", "el"] },

  // Theme preset: "default" (neutral) | "warm" (terracotta/boho). Tokens in src/app/globals.css.
  theme: "classic",

  // Overrides on top of plan defaults, keyed by module id.
  features: {
    // Reviews ship with SAMPLE quotes. Replace them in src/i18n/*.ts, then remove this line.
    "CNT-11": false,
    // "UI-05": true,   // video hero (needs media.heroVideo)
    // "BKG-13": true,  // external booking engine link (needs cta.externalBookingUrl)
    // "CNT-13": true,  // promo bar (content in src/content/promo.ts)
    // "UI-15": true,   // coming-soon gate (active while COMING_SOON=1 in env)
  },

  integrations: {
    email: "resend", // "resend" | "none" — without RESEND_API_KEY the form logs to the console
    analytics: "none", // "none" | "gtm" | "ga4" (INT-05)
    newsletter: "none", // "none" | "resend" | "brevo" (INT-08)
  },

  media: {
    heroImage: "/images/placeholder-hero.svg", // TODO-CLIENT
    heroVideo: "", // TODO-CLIENT e.g. "/videos/hero.mp4" (UI-05)
    ogImage: "/images/placeholder-og.svg", // TODO-CLIENT 1200×630 jpg/png recommended
    aboutImages: ["/images/placeholder-about-1.svg", "/images/placeholder-about-2.svg"], // TODO-CLIENT
    galleryImages: Array.from({ length: 8 }, (_, i) => `/images/placeholder-gallery-${String(i + 1).padStart(2, "0")}.svg`), // TODO-CLIENT
  },

  cta: {
    target: "contact", // "contact" | "external"
    externalBookingUrl: "", // TODO-CLIENT when BKG-13 is on, e.g. "https://booking.example.com"
  },

  // One-page home sections, in render order. Remove an entry to hide it.
  // Sections tied to a module (gallery→UI-07, reviews→CNT-11, instagram→CNT-12,
  // faq→UI-12, location→CNT-06, contact→CNT-05) also need that module on.
  sections: ["about", "location", "contact"], // TODO-CLIENT add "gallery" when real photos arrive; menu page (CNT-15) when the owner sends the menu
};
