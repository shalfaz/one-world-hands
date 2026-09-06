import Link from "next/link";
import type { Program } from "@/types/ngo";

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Gradient Header */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100">
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
      <div className="flex flex-1 flex-col p-5 text-center">
        <h3 className="text-base font-bold leading-snug text-neutral-950 sm:text-lg">
          {program.title}
        </h3>

        {/* Category Badge */}
        <div className="mt-2">
          <span className={`inline-flex items-center rounded-full ${program.accent.bg} ${program.accent.text} px-3 py-1 text-xs font-semibold`}>
            {program.category.charAt(0).toUpperCase() + program.category.slice(1)}
          </span>
        </div>

        {/* Description */}
        <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">
          {program.description}
        </p>

        {/* Location */}
        <p className="mt-3 text-xs font-semibold text-neutral-500">
          📍 {program.location}
        </p>

        {/* Button */}
        <div className="mt-5 pt-1">
          <Link
            href={program.href}
            className={`inline-flex h-11 w-full items-center justify-center rounded-md ${program.accent.bg} px-6 text-sm font-bold uppercase tracking-wide ${program.accent.text} transition-colors hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${program.accent.ring}`}
            aria-label={`Learn more about ${program.title}`}
          >
            Learn More
          </Link>
        </div>
      </div>
    </article>
  );
}