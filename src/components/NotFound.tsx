"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NotFound() {
  const { t } = useLang();
  return (
    <>
      <Navbar solid />
      <main id="main" className="flex min-h-[70svh] flex-col items-center justify-center px-5 pt-24 text-center">
        <p className="kicker text-bronze">404</p>
        <h1 className="mt-3 font-display text-4xl text-ink">{t.notFound.title}</h1>
        <p className="mt-4 max-w-md text-ink/70">{t.notFound.body}</p>
        <Link href="/" className="btn mt-8 inline-block bg-bronze px-6 py-3 font-semibold text-white hover:bg-bronze-dark">{t.notFound.backHome}</Link>
      </main>
      <Footer />
    </>
  );
}
