import { maxExtraPages } from "@/config/features";
import type { PageContent } from "../types";
import { ourStory } from "./our-story";

/** All extra pages. Order = navbar order. Add new pages here. */
export const allPages: PageContent[] = [ourStory];

/**
 * Pages the current plan allows (CNT-02 → 5, CNT-03 → 10, otherwise none).
 * Pages beyond the limit are silently dropped — upgrade the plan or enable the
 * flag in site.config.
 */
export function enabledPages(): PageContent[] {
  return allPages.slice(0, maxExtraPages());
}

export function getPage(slug: string): PageContent | undefined {
  return enabledPages().find((p) => p.slug === slug);
}
