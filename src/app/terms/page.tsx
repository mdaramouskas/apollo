import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isOn } from "@/config/features";
import { terms } from "@/content/legal/terms";
import LegalPage from "@/components/LegalPage";
import { site } from "../../../site.config";

export const metadata: Metadata = {
  title: terms.title[site.locales.default],
  robots: { index: false },
};

export default function TermsPage() {
  if (!isOn("CNT-07")) notFound();
  return <LegalPage doc={terms} />;
}
