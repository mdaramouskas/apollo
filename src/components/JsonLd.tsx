import { siteUrl } from "@/lib/site-url";
import { site } from "../../site.config";

/** LocalBusiness structured data (SEO-02) built from site.config. Server component. */
export default function JsonLd() {
  const b = site.brand;
  const lang = site.locales.default;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": b.schemaType,
    name: b.name,
    legalName: b.legalName,
    url: siteUrl(),
    description: b.tagline[lang],
    image: `${siteUrl()}${site.media.ogImage}`,
    telephone: b.phones[0],
    email: b.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address.line1[lang],
      addressLocality: b.address.city[lang],
      postalCode: b.address.postcode,
      addressCountry: b.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: b.mapPin.lat, longitude: b.mapPin.lng },
  };
  const sameAs = [b.social.instagram, b.social.facebook].filter(Boolean);
  if (sameAs.length) data.sameAs = sameAs;
  if (b.openingHours.length) data.openingHours = b.openingHours;
  if (b.vatNumber) data.vatID = b.vatNumber;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
