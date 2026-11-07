import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { enabledPages, getPage } from "@/content/pages";
import ContentPage from "@/components/ContentPage";
import { site } from "../../../site.config";

/**
 * Extra pages (CNT-02 / CNT-03): one file in src/content/pages per page,
 * rendered at /<slug>. Only slugs returned by enabledPages() exist; anything
 * else is a 404 (dynamicParams = false).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return enabledPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  const lang = site.locales.default;
  return { title: page.title[lang], description: page.metaDescription[lang], alternates: { canonical: `/${slug}` } };
}

export default async function ExtraPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();
  return <ContentPage page={page} />;
}
