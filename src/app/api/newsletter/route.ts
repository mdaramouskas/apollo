import { NextResponse } from "next/server";
import { isOn } from "@/config/features";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { site } from "../../../../site.config";

/**
 * POST /api/newsletter (INT-08). Provider from site.integrations.newsletter:
 *  - "resend": Resend contacts (RESEND_API_KEY, optional RESEND_SEGMENT_ID)
 *  - "brevo":  Brevo contacts API (BREVO_API_KEY, BREVO_LIST_ID)
 *  - "none" or missing keys: demo — logs and returns ok.
 * 404 when the module is off.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  if (!isOn("INT-08")) return NextResponse.json({ error: "not_found" }, { status: 404 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  if (typeof body.website === "string" && body.website.trim() !== "") return NextResponse.json({ ok: true });

  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const rl = await rateLimit(`newsletter:${clientIp(req)}`, { limit: 5, windowSec: 600 });
  if (!rl.ok) return NextResponse.json({ error: "rate_limited" }, { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } });

  try {
    const provider = site.integrations.newsletter;
    if (provider === "resend" && process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const segment = process.env.RESEND_SEGMENT_ID;
      const { error } = await resend.contacts.create({
        email,
        unsubscribed: false,
        ...(segment ? { segments: [{ id: segment }] } : {}),
      });
      if (error) throw new Error(`${error.name}: ${error.message}`);
      return NextResponse.json({ ok: true, demo: false });
    }
    if (provider === "brevo" && process.env.BREVO_API_KEY) {
      const listId = Number(process.env.BREVO_LIST_ID);
      const res = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: { "api-key": process.env.BREVO_API_KEY, "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, updateEnabled: true, ...(listId ? { listIds: [listId] } : {}) }),
      });
      if (!res.ok && res.status !== 204) throw new Error(`Brevo HTTP ${res.status}`);
      return NextResponse.json({ ok: true, demo: false });
    }
    console.log("[newsletter:demo] not configured — subscription logged only", { email });
    return NextResponse.json({ ok: true, demo: true });
  } catch (err) {
    console.error("[newsletter] failed", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}
