import Link from "next/link";
import type { Program } from "@/types/ngo";

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <article
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl",
        "border-2 transition-all duration-300",
        "p-3 sm:p-4 lg:p-5",
        "shadow-md hover:shadow-xl hover:-translate-y-1",
        "bg-linear-to-br from-white to-neutral-50",
        "dark:from-neutral-900 dark:to-neutral-800",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute right-0 top-0 h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-linear-to-br ${program.accent.gradientFrom} ${program.accent.gradientTo} opacity-15 sm:opacity-20`}
      />
      
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -left-4 -bottom-4 h-20 w-20 sm:h-28 sm:w-28 rounded-full bg-linear-to-tl ${program.accent.gradientFrom} ${program.accent.gradientTo} opacity-10 sm:opacity-15`}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-3">
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-bold uppercase tracking-widest ${program.accent.text} opacity-80`}>
              {program.category}
            </p>
            <h3 className="mt-1 sm:mt-1.5 text-sm sm:text-base lg:text-lg font-bold leading-tight sm:leading-5 bg-linear-to-r from-neutral-950 via-neutral-800 to-neutral-700 dark:from-white dark:via-neutral-100 dark:to-neutral-300 bg-clip-text text-transparent wrap-break-word">
              {program.title}
            </h3>
          </div>
          <span
            className={`shrink-0 mt-0.5 sm:mt-0 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl ring-2 ring-offset-2 dark:ring-offset-neutral-900 ${program.accent.ring} ${program.accent.bg} shadow-lg transition-transform group-hover:scale-110`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className={`h-4.5 w-4.5 sm:h-5 sm:w-5 ${program.accent.text}`}
              fill="none"
            >
              <path
                d="M12 2l2.2 6.9H21l-5.6 4 2.1 7.1L12 15.8 6.5 20l2.1-7.1-5.6-4h6.8L12 2Z"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-5 sm:leading-6 text-neutral-700 dark:text-neutral-300 line-clamp-2">
          {program.description}
        </p>

        <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
          {program.impactPoints.slice(0, 3).map((point, index) => (
            <li
              key={point}
              className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200"
            >
              <span className={`mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full ring-2 ring-offset-1 shrink-0 transition-transform group-hover:rotate-12 font-bold text-white text-xs ${[
                program.accent.bg,
              ][index % 1]} shadow-md`}>
                ✓
              </span>
              <span className="leading-5 sm:leading-6 font-medium">{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-2.5 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 pt-2.5 sm:pt-4 border-t-2 border-neutral-200 dark:border-neutral-700">
          <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
            <span className="text-lg">📍</span>{program.location}
          </p>
          <Link
            href={program.href}
            className={`w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-1.5 rounded-full font-bold px-3.5 sm:px-4 py-2 sm:py-1.5 text-xs sm:text-sm transition-all duration-300 ring-2 ring-offset-2 dark:ring-offset-neutral-900 shadow-lg hover:shadow-xl hover:scale-105 text-white ${program.accent.bg}`}
            aria-label={`Learn more about ${program.title}`}
          >
            Learn More
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
              fill="none"
            >
              <path
                d="M5 12h12M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}