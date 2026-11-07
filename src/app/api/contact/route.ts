import { NextResponse } from "next/server";
import { isOn } from "@/config/features";
import { escapeHtml, sendMail } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { site } from "../../../../site.config";

/**
 * POST /api/contact (CNT-05). Validates, rate-limits (SEC-02), drops honeypot
 * hits silently, and emails the business (EML-01). Returns 404 when the
 * module is off.
 */
const LIMITS = { name: 120, email: 200, phone: 40, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s().-]{5,}$/;

export async function POST(req: Request) {
  if (!isOn("CNT-05")) return NextResponse.json({ error: "not_found" }, { status: 404 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Pretend success.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, demo: false });
  }

  const str = (k: keyof typeof LIMITS) => (typeof body[k] === "string" ? (body[k] as string).trim().slice(0, LIMITS[k]) : "");
  const name = str("name");
  const email = str("email");
  const phone = str("phone");
  const message = str("message");
  const consent = body.consent === true;
  const lang = body.lang === "el" ? "el" : "en";

  const errors: string[] = [];
  if (name.length < 2) errors.push("name");
  if (!EMAIL_RE.test(email)) errors.push("email");
  if (phone && !PHONE_RE.test(phone)) errors.push("phone");
  if (message.length < 5) errors.push("message");
  if (!consent) errors.push("consent");
  if (errors.length) return NextResponse.json({ error: "invalid", fields: errors }, { status: 400 });

  const rl = await rateLimit(`contact:${clientIp(req)}`, { limit: 5, windowSec: 600 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  const to = process.env.CONTACT_TO ?? site.brand.email;
  const subject = `[${site.brand.name}] New message from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nLanguage: ${lang}\n\n${message}`;
  const html = `
    <h2 style="font-family:sans-serif">New website message</h2>
    <table style="font-family:sans-serif;font-size:14px">
      <tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><b>Email</b></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><b>Phone</b></td><td>${escapeHtml(phone || "-")}</td></tr>
      <tr><td><b>Language</b></td><td>${lang}</td></tr>
    </table>
    <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(message)}</p>`;

  try {
    const result = await sendMail({ to, subject, html, text, replyTo: email });
    return NextResponse.json({ ok: true, demo: result.demo });
  } catch (err) {
    console.error("[contact] send failed", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
