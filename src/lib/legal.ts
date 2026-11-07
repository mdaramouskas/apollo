import type { Lang } from "@/i18n";
import { site } from "../../site.config";

/** Fill `{email}`, `{legalName}`, `{address}`, `{name}` placeholders in legal copy. */
export function fillLegal(text: string, lang: Lang): string {
  const a = site.brand.address;
  const address = `${a.line1[lang]}, ${a.postcode} ${a.city[lang]}, ${a.country}`;
  return text
    .replace(/\{email\}/g, site.brand.email)
    .replace(/\{legalName\}/g, site.brand.legalName)
    .replace(/\{name\}/g, site.brand.name)
    .replace(/\{address\}/g, address);
}
