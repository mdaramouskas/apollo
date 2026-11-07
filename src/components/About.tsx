"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import Reveal, { SectionTitle } from "./Reveal";
import { site } from "../../site.config";

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionTitle kicker={t.about.kicker} title={t.about.title} />

      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <Reveal>
            <p className="leading-relaxed text-ink/75">{t.about.body1}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="leading-relaxed text-ink/75">{t.about.body2}</p>
          </Reveal>
          {t.about.stats.length > 0 && (
          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 border-t border-sand pt-8 sm:grid-cols-4">
              {t.about.stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-3xl text-bronze">{s.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-stone">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
          )}
        </div>

        <div className="grid grid-cols-2 gap-5">
          <Reveal delay={0.15} className="mt-12">
            <Image
              src={site.media.aboutImages[0]}
              alt={t.about.imageAlt1}
              width={480}
              height={640}
              className="arch aspect-[3/4] w-full object-cover shadow-xl shadow-ink/15 transition-transform duration-700 hover:scale-[1.02]"
            />
          </Reveal>
          <Reveal delay={0.3}>
            <Image
              src={site.media.aboutImages[1]}
              alt={t.about.imageAlt2}
              width={480}
              height={640}
              className="arch aspect-[3/4] w-full object-cover shadow-xl shadow-ink/15 transition-transform duration-700 hover:scale-[1.02]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
