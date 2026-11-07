"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useLang } from "@/lib/i18n";
import Reveal, { SectionTitle } from "./Reveal";
import { site } from "../../site.config";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok"; demo: boolean } | { kind: "error"; code: string; fields?: string[] };

/** Contact section with form (CNT-05). Posts to /api/contact; honeypot field `website`. */
export default function Contact() {
  const { t, lang } = useLang();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const f = t.contact.form;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
          lang,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; demo?: boolean; error?: string; fields?: string[] };
      if (res.ok && json.ok) {
        setStatus({ kind: "ok", demo: Boolean(json.demo) });
        form.reset();
      } else {
        setStatus({ kind: "error", code: json.error ?? "generic", fields: json.fields });
      }
    } catch {
      setStatus({ kind: "error", code: "generic" });
    }
  }

  const errorText = status.kind === "error"
    ? status.code === "rate_limited" ? f.errors.rateLimited : status.code === "invalid" ? f.errors.invalid : f.errors.generic
    : null;
  const bad = (field: string) => status.kind === "error" && status.fields?.includes(field);
  const input = (field: string) =>
    `w-full rounded-xl border bg-white/80 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-bronze ${bad(field) ? "border-red-400" : "border-sand"}`;

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionTitle kicker={t.contact.kicker} title={t.contact.title} />

      <div className="grid gap-12 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <form onSubmit={onSubmit} noValidate className="card space-y-4 border border-sand bg-white/60 p-7 md:p-9">
            <p className="text-sm leading-relaxed text-ink/70">{t.contact.body}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1 block text-stone">{f.name}</span>
                <input name="name" required maxLength={120} autoComplete="name" className={input("name")} />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-stone">{f.email}</span>
                <input name="email" type="email" required maxLength={200} autoComplete="email" className={input("email")} />
              </label>
            </div>
            <label className="block text-sm">
              <span className="mb-1 block text-stone">{f.phone}</span>
              <input name="phone" type="tel" maxLength={40} autoComplete="tel" className={input("phone")} />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-stone">{f.message}</span>
              <textarea name="message" required rows={5} maxLength={4000} className={input("message")} />
            </label>
            {/* Honeypot — hidden from humans, filled by bots */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
              <label>
                Website <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <label className={`flex items-start gap-3 text-xs leading-relaxed ${bad("consent") ? "text-red-500" : "text-ink/70"}`}>
              <input name="consent" type="checkbox" required className="mt-0.5 accent-bronze" />
              <span>
                {f.consent}{" "}
                <Link href="/privacy" className="underline underline-offset-2">{t.footer.privacy}</Link>
              </span>
            </label>
            <button
              type="submit"
              disabled={status.kind === "sending"}
              className="btn w-full bg-bronze px-8 py-3.5 font-semibold text-white transition-colors hover:bg-bronze-dark disabled:opacity-60 sm:w-auto"
            >
              {status.kind === "sending" ? f.submitting : f.submit}
            </button>
            {status.kind === "ok" && (
              <div role="status" className="rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">
                {f.success}
                {status.demo && <div className="mt-1 text-xs text-green-700/80">{f.demoNotice}</div>}
              </div>
            )}
            {errorText && (
              <div role="alert" className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{errorText}</div>
            )}
          </form>
        </Reveal>

        <Reveal delay={0.15} className="md:col-span-2">
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-xl">{t.contact.detailsTitle}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {site.brand.email && <li><a href={`mailto:${site.brand.email}`} className="text-bronze hover:text-bronze-dark">{site.brand.email}</a></li>}
                {site.brand.phones.map((p) => (
                  <li key={p}><a href={`tel:${p.replace(/\s/g, "")}`} className="text-bronze hover:text-bronze-dark">{p}</a></li>
                ))}
                <li className="text-ink/70">
                  {site.brand.address.line1[lang]}, {site.brand.address.postcode} {site.brand.address.city[lang]}
                </li>
              </ul>
            </div>
            {site.brand.openingHours.length > 0 && (
              <div>
                <h3 className="font-display text-xl">{t.contact.hoursTitle}</h3>
                <ul className="mt-4 space-y-1 text-sm text-ink/70">
                  {site.brand.openingHours.map((h) => <li key={h}>{h}</li>)}
                </ul>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
