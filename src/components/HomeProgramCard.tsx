"use client";

import Link from "next/link";
import Image from "next/image";
import type { Program } from "@/types/ngo";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslatedProgram } from "@/components/i18n/ProgramsHelpers";

export default function HomeProgramCard({ program }: { program: Program }) {
  const { t, tr } = useLanguage();
  const translated = useTranslatedProgram(program);
  const categoryLabels = t.programs.categories as Record<string, string>;
  const categoryLabel =
    categoryLabels[program.category.toLowerCase()] ??
    program.category.charAt(0).toUpperCase() + program.category.slice(1);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#D9E2EC] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#009EDB] hover:shadow-[0_18px_42px_-30px_rgba(23,74,112,0.25)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EAF6FB]">
        {program.imageUrl ? (
          <Image
            src={program.imageUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden="true"
            className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br ${program.accent.gradientFrom} ${program.accent.gradientTo}`}
          >
            <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full border border-white/25" />
            <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full border border-white/20" />
            <div className="h-20 w-20 rounded-full border border-white/35 bg-white/10" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-5 text-left sm:p-6">
        <div className="flex flex-1 flex-col">
          <h3 className="line-clamp-2 min-h-[3.2rem] text-lg font-semibold leading-snug tracking-tight text-[#174A70]">
            {translated.title}
          </h3>

          <div className="mt-2">
            <span
              className="inline-flex items-center whitespace-nowrap rounded-full bg-[#EAF6FB] px-3 py-1 text-xs font-semibold text-[#174A70]"
            >
              {categoryLabel}
            </span>
          </div>

          <p className="mt-3 line-clamp-3 min-h-[4.5rem] flex-1 text-sm leading-6 text-[#475569]">
            {translated.description}
          </p>

          <p className="mt-3 truncate text-xs font-medium text-neutral-500">
            {translated.location}
          </p>
        </div>

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