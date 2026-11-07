import { site } from "../../site.config";

/**
 * Transactional email (EML-01). Uses Resend when RESEND_API_KEY is set,
 * otherwise logs the message and reports `demo: true` so the UI can say so.
 * Never throws for a missing key — the build and demo mode must work with an
 * empty .env. Throws only on a real provider error.
 */
export interface Mail {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export function isEmailConfigured(): boolean {
  return site.integrations.email === "resend" && Boolean(process.env.RESEND_API_KEY);
}

export async function sendMail(mail: Mail): Promise<{ demo: boolean; id?: string }> {
  if (!isEmailConfigured()) {
    console.log("[email:demo] not configured — message logged only", {
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
    });
    return { demo: true };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.EMAIL_FROM ?? `${site.brand.name} <no-reply@${site.brand.domain}>`;

  const { data, error } = await resend.emails.send({
    from,
    to: mail.to,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    replyTo: mail.replyTo,
  });
  if (error) throw new Error(`Resend: ${error.name}: ${error.message}`);
  return { demo: false, id: data?.id };
}

/** Escape user input before interpolating it into HTML emails. */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
