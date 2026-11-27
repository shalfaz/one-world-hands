"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { TranslationKey, TranslationVars } from "@/context/i18n-utils";

/**
 * Renders a translated string. Use this inside server components, where the
 * `useLanguage()` hook is not available:  <T k="home.hero.title" />
 */
export default function T({ k, vars }: { k: TranslationKey; vars?: TranslationVars }) {
  const { tr } = useLanguage();
  return <>{tr(k, vars)}</>;
}
