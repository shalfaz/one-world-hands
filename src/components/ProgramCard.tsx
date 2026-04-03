import Link from "next/link";
import type { Program } from "@/types/ngo";

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <article
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all",
        "hover:-translate-y-0.5 hover:shadow-md",
        program.accent.bg,
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-br ${program.accent.gradientFrom} ${program.accent.gradientTo} opacity-10`}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {program.category}
            </p>
            <h3 className="mt-2 text-lg font-semibold leading-6 text-neutral-950">
              {program.title}
            </h3>
          </div>
          <span
            className={`mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${program.accent.ring} bg-white`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className={`h-5 w-5 ${program.accent.text}`}
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

        <p className="mt-4 text-sm leading-6 text-neutral-700">
          {program.description}
        </p>

        <ul className="mt-4 space-y-2">
          {program.impactPoints.slice(0, 3).map((point) => (
            <li
              key={point}
              className="flex items-start gap-2 text-sm text-neutral-800"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-1 ring-neutral-200">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 text-sky-700"
                  fill="none"
                >
                  <path
                    d="M20 7L10 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="leading-6">{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6 flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-neutral-600">
            {program.location}
          </p>
          <Link
            href={program.href}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:border-sky-300 hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            aria-label={`Learn more about ${program.title}`}
          >
            Learn More
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 text-sky-700"
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
          </Link>
        </div>
      </div>
    </article>
  );
}