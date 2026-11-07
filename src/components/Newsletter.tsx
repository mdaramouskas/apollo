"use client";

import { useState, type FormEvent } from "react";
import { useLang } from "@/lib/i18n";

/** Newsletter signup (INT-08). Posts to /api/newsletter. Rendered inside the footer. */
export default function Newsletter() {
  const { t } = useLang();
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setState("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), website: data.get("website") }),
      });
      setState(res.ok ? "ok" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm" noValidate>
      <div className="font-display text-lg text-white">{t.newsletter.title}</div>
      <p className="mt-1 text-xs text-white/60">{t.newsletter.body}</p>
      <div className="mt-3 flex gap-2">
        <input
          name="email"
          type="email"
          required
          placeholder={t.newsletter.email}
          aria-label={t.newsletter.email}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-bronze focus:outline-none"
        />
        <div className="absolute -left-[9999px]" aria-hidden><input name="website" tabIndex={-1} autoComplete="off" /></div>
        <button type="submit" disabled={state === "sending"} className="btn shrink-0 bg-bronze px-4 py-2 text-sm font-semibold text-white hover:bg-bronze-dark disabled:opacity-60">
          {t.newsletter.submit}
        </button>
      </div>
      {state === "ok" && <p role="status" className="mt-2 text-xs text-green-300">{t.newsletter.success}</p>}
      {state === "error" && <p role="alert" className="mt-2 text-xs text-red-300">{t.newsletter.error}</p>}
    </form>
  );
}
