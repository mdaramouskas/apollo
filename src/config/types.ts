import type { Lang } from "@/i18n";
import type { ModuleId } from "./modules";

export type Plan = "basic" | "start" | "plus" | "pro";
export type ThemeKey = "default" | "warm";

/** Short text in every supported locale. */
export type Localized = Record<Lang, string>;

export interface SiteConfig {
  plan: Plan;
  brand: {
    name: string;
    legalName: string;
    tagline: Localized;
    domain: string;
    email: string;
    phones: string[];
    /** Digits with country code, no "+", e.g. "306900000000". Empty = button hidden. */
    whatsapp: string;
    viber: string;
    address: {
      line1: Localized;
      city: Localized;
      postcode: string;
      country: string;
    };
    mapPin: { lat: number; lng: number };
    /** Optional direct link to the business' Google Maps listing. */
    mapsUrl: string;
    /** Optional text query for the map embed (business name + address). Empty = use mapPin. */
    mapQuery?: string;
    social: { instagram: string; facebook: string };
    vatNumber: string;
    licenseNumber: string;
    /** schema.org type used by the JSON-LD block (SEO-02). */
    schemaType: "LocalBusiness" | "Restaurant" | "BarOrPub" | "ProfessionalService" | "Hotel" | "Organization";
    openingHours: string[];
  };
  locales: { default: Lang; supported: Lang[] };
  theme: ThemeKey;
  /** Overrides on top of plan defaults, keyed by module id. */
  features: Partial<Record<ModuleId, boolean>>;
  integrations: {
    email: "resend" | "none";
    analytics: "none" | "gtm" | "ga4";
    newsletter: "none" | "resend" | "brevo";
  };
  media: {
    heroImage: string;
    /** Used only when UI-05 (video hero) is on. Empty = image hero. */
    heroVideo: string;
    ogImage: string;
    aboutImages: [string, string];
    galleryImages: string[];
  };
  /** Primary call to action (hero button + sticky CTA UI-09). */
  cta: {
    /** "contact" scrolls to the contact section; "external" opens `externalBookingUrl` (BKG-13). */
    target: "contact" | "external";
    /** Used by BKG-13 — link to an external booking engine / reservation page. */
    externalBookingUrl: string;
  };
  /** Which one-page sections render, in this order. */
  sections: SectionId[];
}

export type SectionId =
  | "about"
  | "services"
  | "gallery"
  | "reviews"
  | "instagram"
  | "faq"
  | "location"
  | "contact";
