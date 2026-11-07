"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { isOn } from "@/config/features";

/** True when scroll animations (UI-06) are on. Components use it to pick static markup. */
export const MOTION = isOn("UI-06");

/**
 * Scroll-triggered reveal wrapper: children fade & slide in the first time
 * they enter the viewport. Respects prefers-reduced-motion and the UI-06 flag.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (!MOTION || reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Title ornament. The CSS theme decides which variant is visible:
 * a thin line (default preset) or a hand-drawn squiggle (warm preset).
 */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex ${className}`} aria-hidden>
      <span className="ornament-line h-0.5 w-12 rounded-full bg-current" />
      <svg
        className="ornament-squiggle squiggle"
        width="90"
        height="14"
        viewBox="0 0 90 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M2 8c7-8 14 8 21 0s14 8 21 0 14 8 21 0 14 8 22 0" />
      </svg>
    </span>
  );
}

/** Kicker + title + ornament, at the top of every section. */
export function SectionTitle({
  kicker,
  title,
  light = false,
  align = "center",
}: {
  kicker: string;
  title: string;
  light?: boolean;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <div className={`mb-14 ${center ? "text-center" : ""}`}>
      <Reveal>
        <p className={`kicker mb-3 ${light ? "text-sand" : "text-bronze"}`}>{kicker}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className={`font-display text-4xl md:text-5xl ${light ? "text-cream" : "text-ink"}`}>{title}</h2>
      </Reveal>
      <Reveal delay={0.2}>
        <div className={`mt-5 flex ${center ? "justify-center" : ""} ${light ? "text-sand" : "text-bronze"}`}>
          <Ornament />
        </div>
      </Reveal>
    </div>
  );
}
