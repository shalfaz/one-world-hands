"use client";

import Link from "next/link";
import type { Program } from "@/types/ngo";
import { FaLocationDot } from "react-icons/fa6";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslatedProgram } from "@/components/i18n/ProgramsHelpers";

export default function ProgramCard({ program }: { program: Program }) {
  const { t, tr } = useLanguage();
  const translated = useTranslatedProgram(program);
  const categoryLabels = t.programs.categories as Record<string, string>;
  const categoryLabel =
    categoryLabels[program.category.toLowerCase()] ??
    program.category.charAt(0).toUpperCase() + program.category.slice(1);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#D9E2EC] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#009EDB] hover:shadow-[0_18px_42px_-30px_rgba(23,74,112,0.25)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EAF6FB]">
        <div
          aria-hidden="true"
          className={`flex h-full w-full items-center justify-center bg-linear-to-br ${program.accent.gradientFrom} ${program.accent.gradientTo}`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-12 w-12 text-white/80"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 2l2.2 6.9H21l-5.6 4 2.1 7.1L12 15.8 6.5 20l2.1-7.1-5.6-4h6.8L12 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5 text-left sm:p-6">
        <div className="flex flex-1 flex-col">
          <h3 className="line-clamp-2 min-h-[3.2rem] text-lg font-semibold leading-snug tracking-tight text-[#174A70]">
            {translated.title}
          </h3>

          {/* Category Badge */}
          <div className="mt-2">
            <span className="inline-flex items-center whitespace-nowrap rounded-full bg-[#EAF6FB] px-3 py-1 text-xs font-semibold text-[#174A70]">
              {categoryLabel}
            </span>
          </div>

          {/* Description */}
          <p className="mt-3 line-clamp-3 min-h-[4.5rem] flex-1 text-sm leading-6 text-[#475569]">
            {translated.description}
          </p>

          {/* Location */}
          <p className="mt-3 flex items-center gap-2 truncate text-xs font-medium text-neutral-500">
            <FaLocationDot aria-hidden="true" className="shrink-0 text-[#009EDB]" />
            <span className="truncate">{translated.location}</span>
          </p>
        </div>

        {/* Button */}
        <div className="mt-5 pt-1">
          <Link
            href={program.href}
            className="inline-flex h-11 w-full items-center justify-center whitespace-nowrap rounded-full bg-[#009EDB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
            aria-label={tr("programs.card.learnMoreAria", { title: translated.title })}
          >
            {t.programs.card.learnMore}
          </Link>
        </div>
      </div>
    </article>
  );
}