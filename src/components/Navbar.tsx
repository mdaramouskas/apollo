"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { LANG_LABELS, LANG_NAMES } from "@/i18n";
import { ctaHref, ctaIsExternal, navItems } from "@/lib/nav";
import { MOTION } from "./Reveal";
import { site } from "../../site.config";

/**
 * Fixed navbar: transparent over the hero, solid after scrolling.
 * `solid` forces the solid look on pages without a dark hero (legal, menu…).
 */
export default function Navbar({ solid = false }: { solid?: boolean }) {
  const { lang, setLang, t, supported } = useLang();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = navItems(t, lang, onHome);
  const isSolid = solid || scrolled || open;
  const external = ctaIsExternal();
  const Header = MOTION ? motion.header : "header";
  const motionProps = MOTION
    ? { initial: { y: -80, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.8, ease: "easeOut" as const } }
    : {};

  const langButtons = (
    <div className="flex items-center gap-1">
      {supported.map((l) => (
        <button
          key={l}
          onClick={() => {
            setLang(l);
            setOpen(false);
          }}
          aria-label={`${t.nav.languageLabel}: ${LANG_NAMES[l]}`}
          aria-pressed={lang === l}
          className={`btn border px-2.5 py-1 text-xs font-medium tracking-widest transition-colors duration-300 ${
            lang === l
              ? "border-bronze bg-bronze text-white"
              : isSolid
                ? "border-bronze/40 text-bronze hover:bg-bronze hover:text-white"
                : "border-cream/50 text-cream hover:bg-cream/20"
          }`}
        >
          {LANG_LABELS[l]}
        </button>
      ))}
    </div>
  );

  return (
    <Header
      {...motionProps}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        isSolid ? "bg-cream/90 shadow-sm shadow-ink/5 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4" aria-label="Main">
        <Link
          href="/"
          className={`font-display text-2xl tracking-wide transition-colors duration-500 ${isSolid ? "text-ink" : "text-cream"}`}
        >
          {site.brand.name}
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-7 md:flex">
          {items.map((it) => (
            <li key={it.href}>
              <Link
                href={it.href}
                className={`text-sm tracking-wide transition-colors duration-500 hover:text-bronze ${
                  isSolid ? "text-ink/75" : "text-cream/90"
                }`}
              >
                {it.label}
              </Link>
            </li>
          ))}
          <li>{langButtons}</li>
          <li>
            <a
              href={ctaHref(onHome)}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="btn bg-bronze px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-bronze-dark"
            >
              {external ? t.nav.bookExternal : t.nav.cta}
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className={`transition-colors duration-500 md:hidden ${isSolid ? "text-ink" : "text-cream"}`}
          onClick={() => setOpen(!open)}
          aria-label={t.nav.menuLabel}
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <ul className="space-y-1 bg-cream/95 px-5 pb-5 backdrop-blur-md md:hidden">
          {items.map((it) => (
            <li key={it.href}>
              <Link href={it.href} onClick={() => setOpen(false)} className="block py-2 text-ink/80 hover:text-bronze">
                {it.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">{langButtons}</li>
          <li className="pt-3">
            <a
              href={ctaHref(onHome)}
              onClick={() => setOpen(false)}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="btn inline-block bg-bronze px-5 py-2.5 text-sm font-semibold text-white"
            >
              {external ? t.nav.bookExternal : t.nav.cta}
            </a>
          </li>
        </ul>
      )}
    </Header>
  );
}
