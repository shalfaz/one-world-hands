"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

type ResourceCardType = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  previewUrl?: string;
  accent: {
    bg: string;
    text: string;
  };
};

export default function ResourceCard({
  resource,
  categoryLabelOverride,
}: {
  resource: ResourceCardType;
  categoryLabelOverride?: string;
}) {
  const { t } = useLanguage();
  const hasPreview = Boolean(resource.previewUrl);
  const typeLabels = t.resources.typeLabels as Record<string, string>;
  const categoryLabel =
    categoryLabelOverride ??
    typeLabels[resource.category.toLowerCase()] ??
    resource.category;

  return (
    <Link href={resource.href || "#"}>
      <article
        className={[
          "group h-full rounded-xl border border-[#D9E2EC] bg-white p-5 transition-all duration-200 sm:p-6",
          "hover:-translate-y-0.5 hover:border-[#009EDB] hover:shadow-[0_18px_42px_-30px_rgba(23,74,112,0.25)]",
        ].join(" ")}
      >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#174A70]">
            {categoryLabel}
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-[#174A70]">
            {resource.title}
          </h3>
        </div>

        <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF6FB]">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 text-[#009EDB]"
            fill="none"
          >
            <path
              d="M4 19V5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M14 3v5h5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {hasPreview && (
        <div className="mt-4 overflow-hidden rounded-xl border border-[#D9E2EC] bg-[#F7FAFC]">
          <img
            src={resource.previewUrl}
            alt={resource.title}
            className="h-56 w-full object-cover"
          />
        </div>
      )}

      <p className="mt-4 text-sm leading-6 text-[#475569]">
        {resource.description}
      </p>

      <div className="mt-6">
        <span
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#009EDB] transition-colors group-hover:text-[#0088be]"
        >
          {t.resources.card.view}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 text-[#009EDB]"
            fill="none"
          >
            <path
              d="M5 12h12M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      </article>
    </Link>
  );
}