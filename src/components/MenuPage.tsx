"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { menu } from "@/content/menu";
import PageShell from "./PageShell";
import Reveal from "./Reveal";

/** Restaurant / bar menu page (CNT-15) from src/content/menu.ts. */
export default function MenuPage() {
  const { t, lang } = useLang();
  return (
    <PageShell kicker={t.menuPage.kicker} title={t.menuPage.title} intro={t.menuPage.intro} wide>
      {menu.pdf && (
        <a href={menu.pdf} target="_blank" rel="noopener noreferrer" className="btn mt-6 inline-block bg-bronze px-6 py-2.5 text-sm font-semibold text-white hover:bg-bronze-dark">
          {t.menuPage.downloadPdf}
        </a>
      )}
      <div className="mt-12 space-y-14">
        {menu.categories.map((cat) => (
          <Reveal key={cat.name.en}>
            <section>
              <h2 className="font-display text-2xl text-ink md:text-3xl">{cat.name[lang]}</h2>
              <ul className="mt-6 divide-y divide-sand">
                {cat.items.map((item) => (
                  <li key={item.name.en} className="flex items-center gap-4 py-4">
                    {item.image && (
                      <Image src={item.image} alt={item.name[lang]} width={96} height={96} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-medium text-ink">{item.name[lang]}</h3>
                        <span className="shrink-0 font-display text-bronze">{item.price} €</span>
                      </div>
                      {item.description && <p className="mt-1 text-sm text-ink/65">{item.description[lang]}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
