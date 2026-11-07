"use client";

import Script from "next/script";
import { isOn } from "@/config/features";
import { useHydrated } from "@/lib/storage";
import { useConsent } from "./CookieConsent";
import { site } from "../../site.config";

/**
 * GTM / GA4 loader (INT-05). Scripts are injected only after the visitor
 * grants consent (SEO-04). If SEO-04 is off, consent is assumed — make sure
 * that is legally acceptable for the client before doing so.
 * Env: NEXT_PUBLIC_GTM_ID (GTM-XXXX) or NEXT_PUBLIC_GA4_ID (G-XXXX).
 */
export default function Analytics() {
  const hydrated = useHydrated();
  const consent = useConsent();
  const allowed = hydrated && (!isOn("SEO-04") || consent === "granted");

  if (!allowed) return null;

  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  const ga4 = process.env.NEXT_PUBLIC_GA4_ID;

  if (site.integrations.analytics === "gtm" && gtm) {
    return (
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
      </Script>
    );
  }
  if (site.integrations.analytics === "ga4" && ga4) {
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4}',{anonymize_ip:true});`}
        </Script>
      </>
    );
  }
  return null;
}
