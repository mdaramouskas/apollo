"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import Reveal, { SectionTitle } from "./Reveal";
import posts from "@/content/instagram.json";
import { site } from "../../site.config";

/**
 * Instagram feed (CNT-12) — STUB. Reads a static list from
 * src/content/instagram.json (no Instagram API, no token). Swap the JSON for a
 * fetch to the Graph API or a service like Behold if the client wants it live.
 */
export default function Instagram() {
  const { t } = useLang();
  const profile = site.brand.social.instagram || "https://www.instagram.com/";

  return (
    <section id="instagram" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionTitle kicker={t.instagram.kicker} title={t.instagram.title} />
      <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
        {posts.map((p, i) => (
          <Reveal key={p.image} delay={i * 0.05}>
            <a href={p.href} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-xl">
              <Image src={p.image} alt={p.alt} width={400} height={400} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </a>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}>
        <div className="mt-10 text-center">
          <a href={profile} target="_blank" rel="noopener noreferrer" className="btn inline-block border border-bronze px-6 py-2.5 text-sm font-semibold text-bronze transition-colors hover:bg-bronze hover:text-white">
            {t.instagram.follow}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
