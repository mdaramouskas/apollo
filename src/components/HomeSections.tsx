"use client";

import type { SectionId } from "@/config/types";
import { enabledSections } from "@/lib/nav";
import About from "./About";
import Services from "./Services";
import Gallery from "./Gallery";
import Reviews from "./Reviews";
import Instagram from "./Instagram";
import Faq from "./Faq";
import Location from "./Location";
import Contact from "./Contact";

const REGISTRY: Record<SectionId, () => React.JSX.Element> = {
  about: About,
  services: Services,
  gallery: Gallery,
  reviews: Reviews,
  instagram: Instagram,
  faq: Faq,
  location: Location,
  contact: Contact,
};

/** Renders the enabled one-page sections in the order of site.sections. */
export default function HomeSections() {
  return (
    <>
      {enabledSections().map((id) => {
        const Section = REGISTRY[id];
        return <Section key={id} />;
      })}
    </>
  );
}
