"use client";

import { useLang } from "@/lib/i18n";
import { fillLegal } from "@/lib/legal";
import type { LegalContent } from "@/content/types";
import PageShell from "./PageShell";

/** Renders a legal document from src/content/legal (CNT-07). */
export default function LegalPage({ doc }: { doc: LegalContent }) {
  const { t, lang } = useLang();
  return (
    <PageShell title={doc.title[lang]} meta={`${t.legal.updated}: ${doc.updated}`} intro={fillLegal(doc.intro[lang], lang)}>
      {doc.sections.map((s) => (
        <section key={s.heading.en} className="mt-10">
          <h2 className="font-display text-2xl text-ink">{s.heading[lang]}</h2>
          <p className="mt-3 leading-relaxed text-ink/80">{fillLegal(s.body[lang], lang)}</p>
        </section>
      ))}
    </PageShell>
  );
}
