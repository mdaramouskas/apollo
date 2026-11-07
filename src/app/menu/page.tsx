import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isOn } from "@/config/features";
import { dictionaries } from "@/i18n";
import MenuPage from "@/components/MenuPage";
import { site } from "../../../site.config";

const t = dictionaries[site.locales.default];

export const metadata: Metadata = {
  title: t.menuPage.title,
  description: t.menuPage.intro,
};

/** /menu — restaurant menu (CNT-15). 404 when the module is off. */
export default function Menu() {
  if (!isOn("CNT-15")) notFound();
  return <MenuPage />;
}
