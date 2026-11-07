import { NextResponse, type NextRequest } from "next/server";
import { isOn } from "@/config/features";

/**
 * Request-time logic (Next 16 "proxy", formerly middleware):
 *  - UI-15 coming-soon gate: while COMING_SOON=1, every page is rewritten to
 *    /coming-soon. Visiting any URL with ?preview=<COMING_SOON_BYPASS> sets a
 *    cookie that bypasses the gate for that browser.
 *  - SEC-04: Content-Security-Policy header (enforced) when the module is on.
 */
const GATE_COOKIE = "preview";

export function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  let res: NextResponse | null = null;

  if (isOn("UI-15") && process.env.COMING_SOON === "1" && pathname !== "/coming-soon") {
    const bypass = process.env.COMING_SOON_BYPASS;
    const preview = searchParams.get(GATE_COOKIE);
    if (bypass && preview === bypass) {
      const url = req.nextUrl.clone();
      url.searchParams.delete(GATE_COOKIE);
      res = NextResponse.redirect(url);
      res.cookies.set(GATE_COOKIE, bypass, { httpOnly: true, sameSite: "lax", secure: true, maxAge: 60 * 60 * 24 * 30, path: "/" });
      return res;
    }
    const allowed = bypass && req.cookies.get(GATE_COOKIE)?.value === bypass;
    if (!allowed && !pathname.startsWith("/api/")) {
      const url = req.nextUrl.clone();
      url.pathname = "/coming-soon";
      res = NextResponse.rewrite(url);
    }
  }

  res ??= NextResponse.next();

  if (isOn("SEC-04")) {
    const csp = [
      "default-src 'self'",
      // 'unsafe-inline' is needed for Next's inline runtime + JSON-LD + GTM snippet; tighten with nonces in a hardening audit.
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://region1.google-analytics.com",
      "frame-src https://maps.google.com https://www.google.com https://www.googletagmanager.com",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; ");
    res.headers.set("Content-Security-Policy", csp);
  }

  return res;
}

export const config = {
  // Everything except Next internals and static files.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|images/|videos/|.*\\.(?:svg|png|jpg|jpeg|webp|mp4|pdf|txt|xml)$).*)"],
};
