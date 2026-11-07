import type { NextConfig } from "next";

/**
 * Security headers (SEC-01) for every route. CSP lives in src/proxy.ts (SEC-04)
 * because it depends on site.config flags. Add client 301s (SEO-05) in redirects().
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // SEO-05: 301s from the client's old site, e.g.
    // { source: "/old-page.html", destination: "/our-story", permanent: true },
    return [];
  },
};

export default nextConfig;
