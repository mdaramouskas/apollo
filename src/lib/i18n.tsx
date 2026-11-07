"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { dictionaries, isLang, type Dict, type Lang } from "@/i18n";
import { useStorageValue, writeStorage } from "./storage";
import { site } from "../../site.config";

/**
 * Lightweight client-side i18n. The default locale comes from site.config;
 * a visitor's manual choice is remembered in localStorage and applied after
 * hydration so the first client render matches the server HTML.
 *
 * Known limitation (documented in README): the non-default language is applied
 * client-side, so crawlers index the default locale only. Use URL-based i18n if
 * SEO per language matters for the client.
 */
const STORAGE_KEY = "lang";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  supported: Lang[];
}>({
  lang: site.locales.default,
  setLang: () => {},
  t: dictionaries[site.locales.default],
  supported: site.locales.supported,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const stored = useStorageValue(STORAGE_KEY);
  const lang: Lang = isLang(stored) && site.locales.supported.includes(stored) ? stored : site.locales.default;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => writeStorage(STORAGE_KEY, l);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang], supported: site.locales.supported }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

/** Pick the current locale's value from a `{ en, el, ... }` object. */
export function pick<T>(value: Record<Lang, T>, lang: Lang): T {
  return value[lang] ?? value[site.locales.default];
}
