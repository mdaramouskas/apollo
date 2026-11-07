import en from "./en";
import el from "./el";

/**
 * Locale registry.
 *
 * Adding a language (I18-02):
 *   1. copy src/i18n/en.ts → src/i18n/<code>.ts, translate, keep `satisfies Dict`
 *   2. import it below and add it to `dictionaries`
 *   3. add the code to `locales.supported` in site.config.ts (and translate the
 *      `Localized` fields there and in src/content/**)
 */
export const dictionaries = { en, el } as const;

export type Lang = keyof typeof dictionaries;
export type Dict = typeof en;

export const LANG_LABELS: Record<Lang, string> = { en: "EN", el: "ΕΛ" };
export const LANG_NAMES: Record<Lang, string> = { en: "English", el: "Ελληνικά" };

export function isLang(v: unknown): v is Lang {
  return typeof v === "string" && v in dictionaries;
}
