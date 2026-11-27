"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import en from "@/locales/en.json";
import bn from "@/locales/bn.json";
import {
  format,
  getByPath,
  type Dictionary,
  type Lang,
  type TranslationKey,
  type TranslationVars,
} from "./i18n-utils";

export type { Dictionary, Lang, TranslationKey, TranslationVars } from "./i18n-utils";
export { format } from "./i18n-utils";

export const LANG_STORAGE_KEY = "owh_lang";

const dictionaries: Record<Lang, Dictionary> = { en, bn };

/* ---- tiny external store so the stored language is read without hydration mismatches ---- */

const listeners = new Set<() => void>();

function readStoredLang(): Lang {
  try {
    return window.localStorage.getItem(LANG_STORAGE_KEY) === "bn" ? "bn" : "en";
  } catch {
    return "en";
  }
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === LANG_STORAGE_KEY || event.key === null) onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getServerSnapshot(): Lang {
  return "en";
}

/* ---- context ---- */

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** The active dictionary: `t.nav.home`, `t.footer.rights`, ... */
  t: Dictionary;
  /** Look up a string by dot path and fill `{placeholders}`: `tr("programs.count", { count: 3 })`. */
  tr: (key: TranslationKey, vars?: TranslationVars) => string;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: en,
  tr: (key, vars) => format(getByPath(en, key), vars),
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readStoredLang, getServerSnapshot);

  const setLang = useCallback((next: Lang) => {
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* storage unavailable: language still switches for this session via listeners below */
    }
    listeners.forEach((listener) => listener());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => {
    const t = dictionaries[lang];
    return {
      lang,
      setLang,
      t,
      tr: (key, vars) => format(getByPath(t, key), vars),
    };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
