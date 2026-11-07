"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { LANG_LABELS } from "@/i18n";
import { Ornament } from "./Reveal";
import { site } from "../../site.config";

/** Full-screen "coming soon" page (UI-15). */
export default function ComingSoon() {
  const { t, lang, setLang, supported } = useLang();
  return (
    <main id="main" className="relative flex min-h-svh items-center justify-center overflow-hidden bg-deep px-5 text-center text-cream">
      <Image src="/images/placeholder-coming-soon.svg" alt="" fill sizes="100vw" className="object-cover opacity-40" priority />
      <div className="relative max-w-xl">
        <p className="kicker mb-4 text-sand">{site.brand.name}</p>
        <h1 className="font-display text-5xl md:text-6xl">{t.comingSoon.title}</h1>
        <div className="mt-5 flex justify-center text-sand"><Ornament /></div>
        <p className="mt-6 leading-relaxed text-cream/85">{t.comingSoon.body}</p>
        <p className="mt-8 text-sm text-cream/70">
          {t.comingSoon.contact}{" "}
          <a href={`mailto:${site.brand.email}`} className="text-cream underline underline-offset-4">{site.brand.email}</a>
        </p>
        <div className="mt-8 flex justify-center gap-2">
          {supported.map((l) => (
            <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`btn border px-3 py-1 text-xs tracking-widest ${lang === l ? "border-cream bg-cream text-ink" : "border-cream/50 text-cream"}`}>
              {LANG_LABELS[l]}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
