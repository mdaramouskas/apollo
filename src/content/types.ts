import type { Localized } from "@/config/types";

export interface ContentSection {
  heading: Localized;
  body: Localized;
  /** Optional image shown beside the text. */
  image?: { src: string; alt: Localized };
}

/** An extra page rendered at /<slug> (CNT-02 / CNT-03). */
export interface PageContent {
  slug: string;
  /** Show in the navbar. */
  inNav: boolean;
  navLabel: Localized;
  kicker: Localized;
  title: Localized;
  intro: Localized;
  metaDescription: Localized;
  sections: ContentSection[];
}

/** Legal document (CNT-07). `{email}`, `{legalName}`, `{address}` are filled from site.config. */
export interface LegalContent {
  title: Localized;
  updated: string;
  intro: Localized;
  sections: { heading: Localized; body: Localized }[];
}

export interface MenuItem {
  name: Localized;
  description?: Localized;
  price: string;
  image?: string;
}

export interface MenuContent {
  /** Optional PDF in /public, e.g. "/menu.pdf". Empty = no download button. */
  pdf: string;
  categories: { name: Localized; items: MenuItem[] }[];
}

export interface PromoContent {
  text: Localized;
  href: string;
  linkLabel: Localized;
  /** ISO date for the countdown; empty = no countdown. */
  until: string;
}
