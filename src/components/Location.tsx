"use client";

import { useLang } from "@/lib/i18n";
import Reveal, { SectionTitle } from "./Reveal";
import { site } from "../../site.config";

/** Map & POIs (CNT-06). Google Maps embed without an API key + "open in maps" link. */
export default function Location() {
  const { t, lang } = useLang();
  const { lat, lng } = site.brand.mapPin;
  const mapTarget = site.brand.mapQuery ? encodeURIComponent(site.brand.mapQuery) : `${lat},${lng}`;
  const mapSrc = `https://maps.google.com/maps?q=${mapTarget}&z=16&hl=${lang}&output=embed`;
  const mapsUrl = site.brand.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <section id="location" className="bg-sand/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle kicker={t.location.kicker} title={t.location.title} />

        <div className="grid items-stretch gap-10 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <div className="arch relative h-full min-h-[320px] overflow-hidden border border-sand shadow-md">
              <iframe title={t.location.mapTitle} src={mapSrc} className="-mt-14 h-[calc(100%+3.5rem)] min-h-[376px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap bg-white/95 px-5 py-2.5 text-sm font-semibold text-ink shadow-lg transition-colors hover:bg-white"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M12 21s-7-5.1-7-11a7 7 0 0 1 14 0c0 5.9-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                {t.location.openInMaps}
              </a>
            </div>
          </Reveal>

          <div className="flex flex-col justify-center md:col-span-2">
            <Reveal delay={0.1}>
              <p className="leading-relaxed text-ink/75">{t.location.body}</p>
              <p className="mt-4 text-sm text-stone">
                {site.brand.address.line1[lang]}, {site.brand.address.postcode} {site.brand.address.city[lang]}
              </p>
            </Reveal>
            {t.location.pois.length > 0 && (
            <Reveal delay={0.2}>
              <h3 className="mb-4 mt-8 font-display text-xl">{t.location.poisTitle}</h3>
              <ul className="space-y-3">
                {t.location.pois.map((poi) => (
                  <li key={poi.name} className="flex items-center justify-between border-b border-sand pb-3 text-sm">
                    <span className="text-ink/80">{poi.name}</span>
                    <span className="text-stone">{poi.distance}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
