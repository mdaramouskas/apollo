"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Ornament } from "./Reveal";

/** Shared chrome for inner pages (legal, menu, extra pages): solid navbar, title block, footer. */
export default function PageShell({
  kicker,
  title,
  meta,
  intro,
  children,
  wide = false,
}: {
  kicker?: string;
  title: string;
  meta?: string;
  intro?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  const { t } = useLang();
  return (
    <>
      <Navbar solid />
      <main id="main" className="bg-cream pt-24">
        <article className={`mx-auto px-5 py-12 md:py-16 ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
          {kicker && <p className="kicker mb-3 text-bronze">{kicker}</p>}
          <h1 className="font-display text-4xl text-ink md:text-5xl">{title}</h1>
          <div className="mt-5 text-bronze"><Ornament /></div>
          {meta && <p className="mt-2 text-sm text-ink/50">{meta}</p>}
          {intro && <p className="mt-8 leading-relaxed text-ink/80">{intro}</p>}
          {children}
          <p className="mt-14">
            <Link href="/" className="text-bronze underline-offset-4 transition-colors hover:text-ink hover:underline">
              ← {t.legal.backHome}
            </Link>
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
