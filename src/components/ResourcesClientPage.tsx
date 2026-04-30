"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import ResourceCard from "@/components/ResourceCard";

const resourceTypes = [
  { label: "Photo", value: "photo" },
  { label: "Video", value: "video" },
  { label: "Blogs", value: "blog" },
  { label: "Annual Report", value: "annual report" },
  { label: "Publications", value: "publication" },
  { label: "Webinar", value: "webinar" },
  { label: "Document", value: "document" },
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

function getAccent(type: string) {
  const normalized = type.toLowerCase();

  if (normalized === "photo") {
    return {
      bg: "bg-sky-50",
      text: "text-sky-700",
    };
  }

  if (normalized === "video") {
    return {
      bg: "bg-red-50",
      text: "text-red-700",
    };
  }

  if (normalized === "blog") {
    return {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
    };
  }

  if (normalized === "annual report" || normalized === "report") {
    return {
      bg: "bg-amber-50",
      text: "text-amber-700",
    };
  }

  if (normalized === "publication") {
    return {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
    };
  }

  if (normalized === "webinar") {
    return {
      bg: "bg-violet-50",
      text: "text-violet-700",
    };
  }

  return {
    bg: "bg-neutral-50",
    text: "text-neutral-700",
  };
}

function mapDbResourceToCard(resource: SupabaseResource) {
  const urls =
    Array.isArray(resource.file_urls) && resource.file_urls.length > 0
      ? resource.file_urls
      : resource.file_url
      ? [resource.file_url]
      : [];

  const previewUrl = urls[0] || "";
  const type = resource.type || "Resource";
  const accent = getAccent(type);

  const createdYear = resource.created_at
    ? new Date(resource.created_at).getFullYear()
    : 2026;

  return {
    id: resource.id,
    title: resource.title,
    description:
      type === "Photo"
        ? "Uploaded photo resource from the dashboard."
        : type === "Video"
        ? "Uploaded video resource from the dashboard."
        : type === "Blog"
        ? "Published blog resource from the dashboard."
        : type === "Webinar"
        ? "Webinar resource uploaded and managed from the dashboard."
        : "Uploaded document or publication resource from the dashboard.",
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
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [activeType, setActiveType] = useState("photo");

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
      ].includes(typeParam.toLowerCase())
    ) {
      startTransition(() => {
        setActiveType(typeParam.toLowerCase());
      });
    }
  }, [searchParams]);

  const normalizedResources = useMemo(() => {
    return resources.map(mapDbResourceToCard);
  }, [resources]);

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
      <section className="rounded-4xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          Resources
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
          Explore reports, publications, learning notes, and media from One
          World Hands programs.
        </p>
      </section>

      <div className="mt-10 overflow-x-auto">
        <div className="inline-flex min-w-full rounded-full bg-sky-500 p-1 text-white">
          {resourceTypes.map((type) => {
            const isActive = activeType === type.value;

            return (
              <button
                key={type.value}
                type="button"
                onClick={() => setActiveType(type.value)}
                className={[
                  "rounded-full px-5 py-2 text-sm font-semibold transition",
                  isActive
                    ? "bg-white text-sky-700 shadow-sm"
                    : "text-white hover:bg-white/15",
                ].join(" ")}
              >
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Failed to load resources from database.
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
            <div className="col-span-full rounded-4xl border border-dashed border-neutral-300 bg-white p-10 text-center">
              <h2 className="text-lg font-semibold text-neutral-900">
                No resources found
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Try changing the type filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}