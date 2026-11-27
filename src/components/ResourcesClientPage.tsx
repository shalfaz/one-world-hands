"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import ResourceCard from "@/components/ResourceCard";
import {
  useLanguage,
  type Dictionary,
  type TranslationKey,
} from "@/context/LanguageContext";

const resourceTypes: { labelKey: TranslationKey; value: string }[] = [
  { labelKey: "resources.filters.all", value: "all" },
  { labelKey: "resources.filters.photo", value: "photo" },
  { labelKey: "resources.filters.video", value: "video" },
  { labelKey: "resources.filters.blog", value: "blog" },
  { labelKey: "resources.filters.annualReport", value: "annual report" },
  { labelKey: "resources.filters.publication", value: "publication" },
  { labelKey: "resources.filters.webinar", value: "webinar" },
  { labelKey: "resources.filters.document", value: "document" },
];



type SupabaseResource = {
  id: string;
  title: string;
  type: string;
  status: string;
  file_url?: string | null;
  file_urls?: string[] | null;
  created_at?: string | null;
};

type ResourcesClientPageProps = {
  resources: SupabaseResource[];
  error?: boolean;
};

function getAccent() {
  return {
    bg: "bg-[#EAF6FB]",
    text: "text-[#174A70]",
  };
}

function mapDbResourceToCard(resource: SupabaseResource, t: Dictionary) {
  const urls =
    Array.isArray(resource.file_urls) && resource.file_urls.length > 0
      ? resource.file_urls
      : resource.file_url
      ? [resource.file_url]
      : [];

  const previewUrl = urls[0] || "";
  const type = resource.type || "Resource";
  const accent = getAccent();

  const createdYear = resource.created_at
    ? new Date(resource.created_at).getFullYear()
    : 2026;

  return {
    id: resource.id,
    title: resource.title,
    description:
      type === "Photo"
        ? t.resources.defaultDescriptions.photo
        : type === "Video"
        ? t.resources.defaultDescriptions.video
        : type === "Blog"
        ? t.resources.defaultDescriptions.blog
        : type === "Webinar"
        ? t.resources.defaultDescriptions.webinar
        : t.resources.defaultDescriptions.document,
    category: type.toUpperCase(),
    type: type.toLowerCase(),
    topic: "All",
    year: createdYear,
    href: `/resources/${resource.id}`,
    previewUrl,
    accent,
  };
}

export default function ResourcesClientPage({
  resources,
  error = false,
}: ResourcesClientPageProps) {
  const { t, tr } = useLanguage();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [activeType, setActiveType] = useState("all");

  useEffect(() => {
    const typeParam = searchParams.get("type");

    if (
      typeParam &&
      [
        "photo",
        "video",
        "blog",
        "annual report",
        "publication",
        "webinar",
        "document",
        "all",
      ].includes(typeParam.toLowerCase())
    ) {
      startTransition(() => {
        setActiveType(typeParam.toLowerCase());
      });
    }
  }, [searchParams]);

  const normalizedResources = useMemo(() => {
    return resources.map((resource) => mapDbResourceToCard(resource, t));
  }, [resources, t]);

  const filteredResources = useMemo(() => {
    return normalizedResources.filter((item) => {
      const normalizedType = item.type.toLowerCase();

      const typeMatch =
        activeType === "all"
          ? true
          : normalizedType === activeType ||
            (activeType === "annual report" && normalizedType === "report");

      return typeMatch;
    });
  }, [normalizedResources, activeType]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-[#D9E2EC] bg-white p-6 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">
          {t.resources.hero.eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#174A70] sm:text-4xl">
          {t.resources.hero.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#475569]">
          {t.resources.hero.description}
        </p>
      </section>

      <div className="mt-10">
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.resources.filters.ariaLabel}>
          {resourceTypes.map((type) => {
            const isActive = activeType === type.value;

            return (
              <button
                key={type.value}
                type="button"
                onClick={() => setActiveType(type.value)}
                className={[
                  "flex min-w-0 items-center justify-center whitespace-nowrap rounded-full border px-4 py-2.5 text-center text-sm font-medium transition-colors",
                  isActive
                    ? "border-[#009EDB] bg-[#009EDB] text-white"
                    : "border-[#D9E2EC] bg-white text-[#475569] hover:border-[#009EDB] hover:bg-[#EAF6FB]",
                ].join(" ")}
              >
                {tr(type.labelKey)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {t.resources.error.loadFailed}
          </div>
        )}

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={{
                  id: resource.id,
                  title: resource.title,
                  description: resource.description,
                  category: resource.category,
                  href: resource.href,
                  previewUrl: resource.previewUrl,
                  accent: resource.accent,
                }}
              />
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-[#D9E2EC] bg-white p-10 text-center">
              <h2 className="text-lg font-semibold text-neutral-900">
                {t.resources.empty.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {t.resources.empty.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}