"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { ctaHref, ctaIsExternal } from "@/lib/nav";

/**
 * Sticky CTA (UI-09). Appears after the hero, hides while the contact section
 * is on screen. With BKG-13 it opens the external booking engine instead.
 */
export default function StickyCta() {
  const { t } = useLang();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [visible, setVisible] = useState(false);
  const external = ctaIsExternal();

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.7;
      const target = document.getElementById("contact");
      let over = false;
      if (target) {
        const r = target.getBoundingClientRect();
        over = r.top < window.innerHeight * 0.6 && r.bottom > 0;
      }
      setVisible(past && !over);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={ctaHref(onHome)}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="btn fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-bronze px-7 py-4 text-base font-semibold tracking-wide text-white shadow-xl shadow-bronze/30 transition-colors hover:bg-bronze-dark"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M4 5h16v10H9l-5 4V5z" />
          </svg>
          {external ? t.sticky.book : t.sticky.cta}
        </motion.a>
      )}
    </AnimatePresence>
  );
}
