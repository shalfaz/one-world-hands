"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { TranslationKey } from "@/context/i18n-utils";

type TranslatedProgramItem = {
  title: string;
  description: string;
};

const PROGRAM_TITLE_KEY_MAP: Record<string, string> = {
  "food assistance program": "food-assistance",
  "food assistance": "food-assistance",
  "medical assistance program": "medical-assistance",
  "medical assistance initiative": "medical-assistance",
  "medical aid program": "medical-assistance",
  "education support program": "education-support",
  "education support scholarship": "education-support",
  "merit scholarship program": "merit-scholarship",
  "merit scholarship": "merit-scholarship",
  "self-reliance & livelihood program": "self-reliance-livelihood",
  "self-reliance and livelihood program": "self-reliance-livelihood",
  "skill development training": "self-reliance-livelihood",
  "women empowerment initiative": "women-empowerment",
  "women empowerment program": "women-empowerment",
  "clean water program": "clean-water",
  "clean water project": "clean-water",
  "tree plantation program": "tree-plantation",
  "tree plantation drive": "tree-plantation",
  "winter support program": "winter-support",
  "ramadan food & iftar program": "ramadan-food-iftar",
  "ramadan iftar program": "ramadan-food-iftar",
  "ramadan food and iftar program": "ramadan-food-iftar",
  "qurbani for everyone (eid project)": "qurbani-eid",
  "qurbani & eid support": "qurbani-eid",
  "qurbani and eid support": "qurbani-eid",
  "eid clothes & eidi food program": "eid-clothes-eidi",
  "eid clothes and eidi food program": "eid-clothes-eidi",
  "eid clothes & food program": "eid-clothes-eidi",
  "eid clothes & eidi program": "eid-clothes-eidi",
  "emergency relief program": "emergency-relief",
  "emergency relief": "emergency-relief",
};

function resolveProgramKey(title: string): string | null {
  const normalized = title
    .normalize("NFC")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

  if (normalized in PROGRAM_TITLE_KEY_MAP) {
    return PROGRAM_TITLE_KEY_MAP[normalized];
  }

  // Keyword fallback for close variants
  if (normalized.includes("eid clothes") || normalized.includes("eidi")) {
    return "eid-clothes-eidi";
  }
  if (normalized.includes("merit scholarship")) {
    return "merit-scholarship";
  }
  if (normalized.includes("clean water")) {
    return "clean-water";
  }
  if (normalized.includes("tree plantation")) {
    return "tree-plantation";
  }
  if (normalized.includes("winter support")) {
    return "winter-support";
  }
  if (normalized.includes("ramadan")) {
    return "ramadan-food-iftar";
  }
  if (normalized.includes("qurbani")) {
    return "qurbani-eid";
  }
  if (normalized.includes("food assistance")) {
    return "food-assistance";
  }
  if (normalized.includes("medical assistance")) {
    return "medical-assistance";
  }
  if (normalized.includes("education support")) {
    return "education-support";
  }
  if (normalized.includes("self-reliance") || normalized.includes("skill development")) {
    return "self-reliance-livelihood";
  }
  if (normalized.includes("women empowerment")) {
    return "women-empowerment";
  }
  if (normalized.includes("emergency relief")) {
    return "emergency-relief";
  }
  return null;
}

export function useTranslatedProgram(program: {
  title: string;
  description?: string;
  location?: string;
}) {
  const { lang, t } = useLanguage();

  if (lang !== "bn") {
    return {
      title: program.title,
      description: program.description ?? "",
      location: program.location ?? "",
    };
  }

  const key = resolveProgramKey(program.title);
  const items = t.programs.items as Record<string, TranslatedProgramItem>;
  const translated = key ? items[key] : undefined;

  const locations = t.programs.locations as Record<string, string>;
  const rawLocation = (program.location ?? "").trim();
  const translatedLocation = rawLocation
    ? (locations[rawLocation.toLowerCase()] ?? rawLocation)
    : "";

  return {
    title: translated?.title ?? program.title,
    description: translated?.description ?? (program.description ?? ""),
    location: translatedLocation,
  };
}

export function ProgramTranslatedField({
  field,
  programTitle,
  fallback,
}: {
  field: "title" | "description" | "location";
  programTitle: string;
  fallback: string;
}) {
  const translated = useTranslatedProgram({
    title: programTitle,
    description: field === "description" ? fallback : undefined,
    location: field === "location" ? fallback : undefined,
  });

  return <>{translated[field]}</>;
}

export function ProgramsAriaSection({
  className,
  ariaLabelKey,
  children,
}: {
  className?: string;
  ariaLabelKey: TranslationKey;
  children: ReactNode;
}) {
  const { tr } = useLanguage();
  return (
    <section className={className} aria-label={tr(ariaLabelKey)}>
      {children}
    </section>
  );
}

export function ProgramCategoryLabel({ category }: { category: string }) {
  const { t } = useLanguage();
  const labels = t.programs.categories as Record<string, string>;
  const fallback = category.charAt(0).toUpperCase() + category.slice(1);
  return <>{labels[category.toLowerCase()] ?? fallback}</>;
}

export function ResourceTypeLabel({ type }: { type: string }) {
  const { t } = useLanguage();
  const labels = t.resources.typeLabels as Record<string, string>;
  const fallback = type.charAt(0).toUpperCase() + type.slice(1);
  return <>{labels[type.toLowerCase()] ?? fallback}</>;
}

export function RelatedResourcesHeading({ type }: { type: string }) {
  const { t, tr } = useLanguage();
  const related = t.resources.detail.relatedByType as Record<string, string>;
  const key = type.toLowerCase();
  if (key in related) {
    return <>{related[key]}</>;
  }
  const fallbackType = `${type.charAt(0).toUpperCase() + type.slice(1)}s`;
  return <>{tr("resources.detail.relatedFallback", { type: fallbackType })}</>;
}
