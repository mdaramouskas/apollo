"use client";

import { useLang } from "@/lib/i18n";
import Reveal, { SectionTitle } from "./Reveal";

function Stars() {
  return (
    <div className="flex gap-0.5 text-sand" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * Reviews (CNT-11). The dictionary ships SAMPLE quotes and the section shows a
 * visible notice until they are replaced. Never publish invented reviews.
 */
export default function Reviews() {
  const { t } = useLang();
  const isSample = t.reviews.items.some((r) => /sample|ενδεικτικ/i.test(r.name));

  return (
    <section id="reviews" className="bg-deep py-24 text-white md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle kicker={t.reviews.kicker} title={t.reviews.title} light />
        {isSample && (
          <p className="mb-8 rounded-lg border border-yellow-300/50 bg-yellow-300/10 px-4 py-2 text-center text-sm text-yellow-100">
            {t.reviews.sampleNotice}
          </p>
        )}
        <div className="grid gap-6 md:grid-cols-3">
          {t.reviews.items.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.12}>
              <figure className="card relative flex h-full flex-col bg-cream/10 p-8 pt-10 backdrop-blur-sm transition-colors duration-300 hover:bg-cream/15">
                <span aria-hidden className="absolute left-6 top-2 font-display text-6xl text-sand/60">“</span>
                <Stars />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-cream/90">{r.text}</blockquote>
                <figcaption className="mt-6 flex items-baseline justify-between text-sm">
                  <span className="font-medium text-cream">{r.name}</span>
                  <span className="text-cream/50">{r.date}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
