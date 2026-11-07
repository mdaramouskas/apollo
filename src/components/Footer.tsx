"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { isOn } from "@/config/features";
import Newsletter from "./Newsletter";
import { site } from "../../site.config";

export default function Footer() {
  const { t, lang } = useLang();
  const b = site.brand;

  return (
    <footer className="bg-ink py-14 text-white/70">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <div className="font-display text-2xl text-white">{b.name}</div>
            <p className="mt-1 text-sm">
              {b.address.line1[lang]}, {b.address.postcode} {b.address.city[lang]}
            </p>
            {b.licenseNumber && <p className="mt-1 text-xs text-white/45">{t.footer.license}: {b.licenseNumber}</p>}
            {b.vatNumber && <p className="mt-1 text-xs text-white/45">{t.footer.vat}: {b.vatNumber}</p>}
            <div className="mt-4 flex flex-col gap-1 text-sm">
              <a href={`mailto:${b.email}`} className="transition-colors hover:text-white">{b.email}</a>
              {b.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="transition-colors hover:text-white">{p}</a>
              ))}
            </div>
            <div className="mt-4 flex gap-4">
              {b.social.instagram && (
                <a href={b.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors hover:text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" /></svg>
                </a>
              )}
              {b.social.facebook && (
                <a href={b.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-colors hover:text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v9h4v-9h3l1-4h-4V8z" /></svg>
                </a>
              )}
            </div>
          </div>

          {isOn("INT-08") && <Newsletter />}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs md:flex-row">
          <span>© {new Date().getFullYear()} {b.legalName}. {t.footer.rights}</span>
          {isOn("CNT-07") && (
            <div className="flex gap-6">
              <Link href="/privacy" className="transition-colors hover:text-white">{t.footer.privacy}</Link>
              <Link href="/terms" className="transition-colors hover:text-white">{t.footer.terms}</Link>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
