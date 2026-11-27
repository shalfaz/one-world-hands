"use client";

import Link from "next/link";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslatedProgram } from "@/components/i18n/ProgramsHelpers";

export default function ProgramCard({
  program,
}: {
  program: Record<string, unknown>;
}) {
  const { t } = useLanguage();
  const translated = useTranslatedProgram({
    title: String(program.title || ""),
    description: String(program.description || ""),
    location: String(program.location || ""),
  });
  const category = String(program.category || "other");
  const categoryLabels = t.programs.categories as Record<string, string>;
  const categoryLabel =
    categoryLabels[category.toLowerCase()] ??
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <Link href={`/programs/${program._id}`} className="block h-full">
      <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#D9E2EC] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#009EDB] hover:shadow-[0_18px_42px_-30px_rgba(23,74,112,0.25)]">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EAF6FB]">
          {program.imageUrl ? (
            <Image
              src={String(program.imageUrl)}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div
              aria-hidden="true"
              className="relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br from-[#009EDB] to-[#174A70]"
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
              <span className="inline-flex items-center whitespace-nowrap rounded-full bg-[#EAF6FB] px-3 py-1 text-xs font-semibold text-[#174A70]">
                {categoryLabel}
              </span>
            </div>

            <p className="mt-3 line-clamp-3 min-h-[4.5rem] flex-1 text-sm leading-6 text-[#475569]">
              {translated.description}
            </p>

            <p className="mt-3 flex items-center gap-2 truncate text-xs font-medium text-neutral-500">
              <FaLocationDot aria-hidden="true" className="shrink-0 text-[#009EDB]" />
              <span className="truncate">{translated.location}</span>
            </p>

            <p className="mt-2 text-xs text-neutral-500">
              {new Date(String(program.createdAt)).toLocaleDateString()}
            </p>
          </div>

          <div className="mt-5 pt-1">
            <span className="inline-flex h-11 w-full items-center justify-center whitespace-nowrap rounded-full bg-[#009EDB] px-6 text-sm font-semibold text-white transition-colors group-hover:bg-[#0088be]">
              {t.programs.card.learnMoreArrow}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
