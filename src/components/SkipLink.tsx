"use client";

import { useLang } from "@/lib/i18n";

/** Keyboard skip link (UI-14). Target: <main id="main">. */
export default function SkipLink() {
  const { t } = useLang();
  return <a href="#main" className="skip-link">{t.nav.skipToContent}</a>;
}
