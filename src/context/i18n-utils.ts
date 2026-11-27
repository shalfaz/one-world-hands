import type en from "@/locales/en.json";

export type Lang = "en" | "bn";

/** Shape of the translation dictionary (derived from en.json). */
export type Dictionary = typeof en;

type Leaves<T> = T extends string
  ? never
  : T extends readonly unknown[]
  ? never
  : {
      [K in keyof T & string]: T[K] extends string ? K : `${K}.${Leaves<T[K]>}`;
    }[keyof T & string];

/** Every dot-separated path in en.json that resolves to a string, e.g. "nav.home". */
export type TranslationKey = Leaves<Dictionary>;

export type TranslationVars = Record<string, string | number>;

/** Replaces `{name}` placeholders in a translated string. */
export function format(template: string, vars?: TranslationVars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match
  );
}

/** Resolves a dot-separated path inside a dictionary. Falls back to the key itself. */
export function getByPath(dictionary: unknown, path: string): string {
  let node: unknown = dictionary;
  for (const part of path.split(".")) {
    if (node && typeof node === "object" && part in (node as Record<string, unknown>)) {
      node = (node as Record<string, unknown>)[part];
    } else {
      return path;
    }
  }
  return typeof node === "string" ? node : path;
}
