import type { MetadataRoute } from "next";
import { isOn } from "@/config/features";
import { enabledPages } from "@/content/pages";
import { siteUrl } from "@/lib/site-url";

/** Indexable pages only: home, /menu (CNT-15) and enabled extra pages. Legal pages are noindex. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [{ url: base, lastModified: now, changeFrequency: "weekly", priority: 1 }];
  if (isOn("CNT-15")) urls.push({ url: `${base}/menu`, lastModified: now, changeFrequency: "weekly", priority: 0.8 });
  for (const p of enabledPages()) urls.push({ url: `${base}/${p.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  return urls;
}
