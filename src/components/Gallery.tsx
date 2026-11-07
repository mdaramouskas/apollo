"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";
import Reveal, { SectionTitle } from "./Reveal";
import { site } from "../../site.config";

/** Gallery grid + lightbox (UI-07). Keyboard: Esc, ←, →. Focus returns to the opener on close. */
export default function Gallery() {
  const { t } = useLang();
  const images = site.media.galleryImages;
  const [lightbox, setLightbox] = useState<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setLightbox(null);
    openerRef.current?.focus();
  }, []);
  const step = useCallback(
    (dir: 1 | -1) => setLightbox((i) => (i === null ? null : (i + dir + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  const alt = (i: number) => t.gallery.photoAlt.replace("{n}", String(i + 1));

  return (
    <section id="gallery" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle kicker={t.gallery.kicker} title={t.gallery.title} />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.map((src, i) => (
            <Reveal key={src} delay={(i % 3) * 0.1} className={i === 0 ? "col-span-2 row-span-2" : ""}>
              <button
                onClick={(e) => {
                  openerRef.current = e.currentTarget;
                  setLightbox(i);
                }}
                className={`group block w-full overflow-hidden ${i === 0 ? "arch h-full min-h-[240px]" : "card aspect-[4/3]"}`}
                aria-label={alt(i)}
              >
                <Image
                  src={src}
                  alt={alt(i)}
                  width={i === 0 ? 900 : 440}
                  height={i === 0 ? 700 : 340}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={alt(lightbox)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
            onClick={close}
          >
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-4xl"
            >
              <Image src={images[lightbox]} alt={alt(lightbox)} width={1200} height={800} className="max-h-[85vh] w-full rounded-xl object-contain" />
            </motion.div>

            <button onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/25" aria-label={t.gallery.prev}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/25" aria-label={t.gallery.next}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
            </button>
            <button ref={closeBtnRef} onClick={close} className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/25" aria-label={t.gallery.close}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
