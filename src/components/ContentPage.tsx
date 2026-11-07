"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import type { PageContent } from "@/content/types";
import PageShell from "./PageShell";
import Reveal from "./Reveal";

/** Renders an extra page from src/content/pages (CNT-02 / CNT-03). */
export default function ContentPage({ page }: { page: PageContent }) {
  const { lang } = useLang();
  return (
    <PageShell kicker={page.kicker[lang]} title={page.title[lang]} intro={page.intro[lang]} wide>
      <div className="mt-12 space-y-16">
        {page.sections.map((s, i) => (
          <Reveal key={s.heading.en}>
            <section className={`grid items-center gap-8 ${s.image ? "md:grid-cols-2" : ""}`}>
              <div className={s.image && i % 2 === 1 ? "md:order-2" : ""}>
                <h2 className="font-display text-2xl text-ink md:text-3xl">{s.heading[lang]}</h2>
                <p className="mt-4 leading-relaxed text-ink/80">{s.body[lang]}</p>
              </div>
              {s.image && (
                <Image src={s.image.src} alt={s.image.alt[lang]} width={800} height={600} className="arch aspect-[4/3] w-full object-cover shadow-lg shadow-ink/10" />
              )}
            </section>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
