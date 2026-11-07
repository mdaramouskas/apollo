"use client";

import { useLang } from "@/lib/i18n";
import Reveal, { SectionTitle } from "./Reveal";

/** Simple line icons keyed by the `icon` field in the dictionary. Add your own paths here. */
const icons: Record<string, string> = {
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 16l9 5 9-5",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2",
  chat: "M4 5h16v10H9l-5 4V5z",
  star: "M12 3l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 18.2 5.9 21.6l1.4-6.8L2.2 10.1l6.9-.8z",
};

export default function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="bg-sand/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle kicker={t.services.kicker} title={t.services.title} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <div className="card group flex h-full flex-col gap-4 border border-sand bg-white/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-bronze/50 hover:bg-white/90 hover:shadow-md">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-deep transition-transform duration-300 group-hover:scale-110 group-hover:text-bronze"
                  aria-hidden
                >
                  <path d={icons[s.icon] ?? icons.spark} />
                </svg>
                <h3 className="font-display text-xl text-ink">{s.title}</h3>
                <p className="text-sm leading-relaxed text-ink/70">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
