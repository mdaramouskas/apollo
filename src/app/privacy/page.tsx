import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isOn } from "@/config/features";
import { privacy } from "@/content/legal/privacy";
import LegalPage from "@/components/LegalPage";
import { site } from "../../../site.config";

export const metadata: Metadata = {
  title: privacy.title[site.locales.default],
  robots: { index: false },
};

export default function PrivacyPage() {
  if (!isOn("CNT-07")) notFound();
  return <LegalPage doc={privacy} />;
}
