import type { Dict } from "@/i18n";
import type { Lang } from "@/i18n";
import type { SectionId } from "@/config/types";
import { isOn } from "@/config/features";
import { enabledPages } from "@/content/pages";
import { site } from "../../site.config";

/** A section renders only if listed in site.sections AND its module (if any) is on. */
const SECTION_MODULE: Partial<Record<SectionId, Parameters<typeof isOn>[0]>> = {
  gallery: "UI-07",
  reviews: "CNT-11",
  instagram: "CNT-12",
  faq: "UI-12",
  location: "CNT-06",
  contact: "CNT-05",
};

export function enabledSections(): SectionId[] {
  return site.sections.filter((s) => {
    const mod = SECTION_MODULE[s];
    return mod ? isOn(mod) : true;
  });
}

/** Sections that get a navbar link (services/instagram are reachable by scrolling). */
const NAV_SECTIONS: SectionId[] = ["about", "services", "gallery", "reviews", "faq", "location", "contact"];

export interface NavItem {
  href: string;
  label: string;
}

/** Navbar links for the current language. `onHome` decides anchor vs. /#anchor. */
export function navItems(t: Dict, lang: Lang, onHome: boolean): NavItem[] {
  const prefix = onHome ? "" : "/";
  const items: NavItem[] = enabledSections()
    .filter((s) => NAV_SECTIONS.includes(s))
    .map((s) => ({ href: `${prefix}#${s}`, label: t.nav[s] }));

  if (isOn("CNT-15")) items.push({ href: "/menu", label: t.nav.menu });
  for (const p of enabledPages()) if (p.inNav) items.push({ href: `/${p.slug}`, label: p.navLabel[lang] });
  return items;
}

/** Where the primary CTA points (hero, sticky button). */
export function ctaHref(onHome = true): string {
  if (isOn("BKG-13") && site.cta.target === "external" && site.cta.externalBookingUrl) {
    return site.cta.externalBookingUrl;
  }
  return onHome ? "#contact" : "/#contact";
}

export function ctaIsExternal(): boolean {
  return isOn("BKG-13") && site.cta.target === "external" && Boolean(site.cta.externalBookingUrl);
}
