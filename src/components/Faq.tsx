"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";
import Reveal, { SectionTitle } from "./Reveal";

/** FAQ accordion (UI-12). */
export default function Faq() {
  const { t } = useLang();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-4xl px-5 py-24 md:py-32">
      <SectionTitle kicker={t.faq.kicker} title={t.faq.title} />

      <div className="space-y-3">
        {t.faq.items.map((item, i) => {
          const open = openIdx === i;
          const panelId = `faq-panel-${i}`;
          return (
            <Reveal key={item.q} delay={i * 0.07}>
              <div className="overflow-hidden rounded-2xl border border-sand bg-white/60">
                <button
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  aria-expanded={open}
                  aria-controls={panelId}
                >
                  <span className="pr-4 font-medium text-ink">{item.q}</span>
                  <motion.svg animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-bronze" aria-hidden>
                    <path d="M12 5v14M5 12h14" />
                  </motion.svg>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div id={panelId} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                      <p className="px-6 pb-5 text-sm leading-relaxed text-ink/70">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
