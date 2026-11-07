"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/lib/i18n";
import { isOn } from "@/config/features";
import { ctaHref, ctaIsExternal } from "@/lib/nav";
import { MOTION, Ornament } from "./Reveal";
import { site } from "../../site.config";

/**
 * Full-bleed hero. Plays site.media.heroVideo when UI-05 is on and a video
 * path is set; otherwise shows site.media.heroImage. Parallax and staggered
 * text only when UI-06 is on and the visitor does not prefer reduced motion.
 */
export default function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const animate = MOTION && !reduce;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  const useVideo = isOn("UI-05") && Boolean(site.media.heroVideo);
  const external = ctaIsExternal();

  const fade = (delay: number) =>
    animate ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay } } : {};

  return (
    <section id="top" ref={ref} className="relative min-h-svh overflow-hidden bg-deep">
      <motion.div style={animate ? { y: imgY } : undefined} className={`absolute inset-0 ${animate ? "scale-[1.08]" : ""}`}>
        {useVideo ? (
          <video
            src={site.media.heroVideo}
            poster={site.media.heroImage}
            autoPlay={!reduce}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            className="h-full w-full object-cover"
          />
        ) : (
          <Image src={site.media.heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
        )}
      </motion.div>

      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-ink/70" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />

      <div className="relative mx-auto flex min-h-svh w-full max-w-6xl flex-col justify-end px-5 pb-20 pt-28 md:pb-24">
        <div className="max-w-2xl">
          <motion.p {...fade(0.2)} className="kicker mb-4 text-sand">
            {t.hero.kicker}
          </motion.p>
          <motion.h1 {...fade(0.4)} className="font-display text-5xl leading-[1.08] text-cream md:text-6xl lg:text-7xl">
            {t.hero.title}
          </motion.h1>
          <motion.div {...fade(0.7)} className="mt-5 text-sand">
            <Ornament />
          </motion.div>
          <motion.p {...fade(0.8)} className="mt-6 max-w-xl leading-relaxed text-cream/85">
            {t.hero.subtitle}
          </motion.p>
          <motion.div {...fade(1)} className="mt-9 flex flex-wrap gap-3">
            <a
              href={ctaHref(true)}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="btn inline-block bg-bronze px-9 py-4 text-base font-semibold tracking-wide text-white shadow-lg shadow-ink/30 transition-all hover:-translate-y-0.5 hover:bg-bronze-dark md:px-11 md:text-lg"
            >
              {external ? t.nav.bookExternal : t.hero.cta}
            </a>
            <a
              href="#location"
              className="btn inline-block border border-cream/50 px-9 py-4 text-base font-semibold tracking-wide text-cream transition-colors hover:bg-cream/15 md:text-lg"
            >
              {t.hero.secondary}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
