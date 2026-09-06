import Link from "next/link";
import type { Program } from "@/types/ngo";

export default function HomeProgramCard({ program }: { program: Program }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100">
        <div
          aria-hidden="true"
          className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br ${program.accent.gradientFrom} ${program.accent.gradientTo}`}
        >
          <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full border border-white/25" />
          <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full border border-white/20" />
          <div className="h-20 w-20 rounded-full border border-white/35 bg-white/10" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 text-center">
        <h3 className="text-base font-bold leading-snug text-neutral-950 sm:text-lg">
          {program.title}
        </h3>

        <div className="mt-2">
          <span
            className={`inline-flex items-center rounded-full ${program.accent.bg} ${program.accent.text} px-3 py-1 text-xs font-semibold`}
          >
            {program.category.charAt(0).toUpperCase() + program.category.slice(1)}
          </span>
        </div>

        <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">
          {program.description}
        </p>

        <p className="mt-3 text-xs font-semibold text-neutral-500">
          {program.location}
        </p>

        <div className="mt-5 pt-1">
          <Link
            href={program.href}
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#008744] px-6 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#006b36] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008744] focus-visible:ring-offset-2"
            aria-label={`Learn more about ${program.title}`}
          >
            Learn More
          </Link>
        </div>
      </div>
    </article>
  );
}