"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { readStorage, useHydrated, useStorageValue, writeStorage } from "@/lib/storage";

export const CONSENT_KEY = "cookie-consent";
export type Consent = "granted" | "denied";

export function readConsent(): Consent | null {
  const v = readStorage(CONSENT_KEY);
  return v === "granted" || v === "denied" ? v : null;
}

/** Reactive consent value (null = not decided yet / before hydration). */
export function useConsent(): Consent | null {
  const v = useStorageValue(CONSENT_KEY);
  return v === "granted" || v === "denied" ? v : null;
}

/** Cookie consent banner (SEO-04). Analytics (INT-05) load only after "granted". */
export default function CookieConsent() {
  const { t } = useLang();
  const hydrated = useHydrated();
  const consent = useConsent();

  if (!hydrated || consent !== null) return null;
  return (
    <div role="dialog" aria-live="polite" aria-label="Cookies" className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border border-sand bg-cream/95 p-5 text-sm text-ink shadow-xl backdrop-blur-md">
      <p className="leading-relaxed">
        {t.cookies.text}{" "}
        <Link href="/privacy" className="underline underline-offset-2">{t.cookies.learnMore}</Link>
      </p>
      <div className="mt-4 flex gap-3">
        <button onClick={() => writeStorage(CONSENT_KEY, "granted")} className="btn bg-bronze px-5 py-2 font-semibold text-white hover:bg-bronze-dark">{t.cookies.accept}</button>
        <button onClick={() => writeStorage(CONSENT_KEY, "denied")} className="btn border border-ink/20 px-5 py-2 font-semibold hover:bg-ink/5">{t.cookies.decline}</button>
      </div>
    </div>
  );
}
