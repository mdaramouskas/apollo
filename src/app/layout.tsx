import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/lib/i18n";
import { isOn } from "@/config/features";
import { siteUrl } from "@/lib/site-url";
import JsonLd from "@/components/JsonLd";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import ChatButtons from "@/components/ChatButtons";
import StickyCta from "@/components/StickyCta";
import PromoBar from "@/components/PromoBar";
import SkipLink from "@/components/SkipLink";
import { site } from "../../site.config";
import "./globals.css";

/*
 * Fonts are self-hosted from npm (@fontsource-variable/*, latin + greek subsets,
 * no network at build). Which family each theme preset uses is decided in
 * globals.css (--font-sans-primary / --font-sans-secondary / --font-serif).
 * Add a font = `npm i @fontsource-variable/<name>` + import here + CSS variable.
 */
import "@fontsource-variable/inter";
import "@fontsource-variable/commissioner";
import "@fontsource-variable/eb-garamond";

const lang = site.locales.default;
const title = `${site.brand.name} — ${site.brand.tagline[lang]}`;
const description = site.brand.tagline[lang];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: title, template: `%s — ${site.brand.name}` },
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: site.brand.name,
    images: [{ url: site.media.ogImage }],
    locale: lang === "el" ? "el_GR" : "en_GB",
  },
  twitter: { card: "summary_large_image", title, description, images: [site.media.ogImage] },
  alternates: { canonical: "/" },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = { themeColor: "#1c1f24" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={lang}
      data-theme={site.theme}
      className="antialiased"
    >
      <head>{isOn("SEO-02") && <JsonLd />}</head>
      <body>
        <LanguageProvider>
          <SkipLink />
          {isOn("CNT-13") && <PromoBar />}
          {children}
          {isOn("UI-09") && <StickyCta />}
          {isOn("INT-09") && <ChatButtons />}
          {isOn("SEO-04") && <CookieConsent />}
          {isOn("INT-05") && <Analytics />}
        </LanguageProvider>
      </body>
    </html>
  );
}
