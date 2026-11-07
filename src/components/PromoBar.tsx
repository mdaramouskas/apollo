"use client";

import { useEffect, useState } from "react";
import { useLang, pick } from "@/lib/i18n";
import { useHydrated, useStorageValue, writeStorage } from "@/lib/storage";
import { promo } from "@/content/promo";

const KEY = "promo-dismissed";

/** Promo bar with optional countdown (CNT-13). Dismissal is remembered per browser. */
export default function PromoBar() {
  const { t, lang } = useLang();
  const hydrated = useHydrated();
  const dismissed = useStorageValue(KEY) === promo.text.en;
  const end = promo.until ? new Date(promo.until).getTime() : 0;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!end) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [end]);

  if (!hydrated || dismissed || (end && end <= now)) return null;

  const countdown = end ? fmt(end - now, t.promo) : null;

  return (
    <div className="relative z-50 flex items-center justify-center gap-4 bg-bronze px-10 py-2 text-center text-sm text-white">
      <span>{pick(promo.text, lang)}</span>
      {countdown && <span className="font-mono text-xs opacity-90">{countdown}</span>}
      {promo.href && <a href={promo.href} className="underline underline-offset-2">{pick(promo.linkLabel, lang)}</a>}
      <button
        onClick={() => writeStorage(KEY, promo.text.en)}
        aria-label={t.promo.dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-white/20"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </div>
  );
}

function fmt(ms: number, u: { days: string; hours: string; minutes: string; seconds: string }) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return `${d}${u.days} ${h}${u.hours} ${m}${u.minutes} ${sec}${u.seconds}`;
}
