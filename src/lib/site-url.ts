import { site } from "../../site.config";

/**
 * Canonical site URL for metadata, sitemap, robots and emails.
 * NEXT_PUBLIC_SITE_URL wins; otherwise https://<brand.domain>; localhost in dev.
 */
export function siteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (env) return env.replace(/\/$/, "");
  if (process.env.NODE_ENV !== "production") return "http://localhost:3000";
  return `https://${site.brand.domain}`;
}
