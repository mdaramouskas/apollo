import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isOn } from "@/config/features";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Coming soon", robots: { index: false } };

/** /coming-soon — pre-launch gate target (UI-15). proxy.ts rewrites here while COMING_SOON=1. */
export default function ComingSoonPage() {
  if (!isOn("UI-15")) notFound();
  return <ComingSoon />;
}
