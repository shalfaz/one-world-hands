import Link from "next/link";
import { programs } from "@/data/programs";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Humanitarian Programs | One World Hands - Food, Medical & Education Support",
  description:
    "Explore One World Hands programs including food assistance, emergency relief, medical assistance, winter support, and education. Designed with communities for dignity-first humanitarian impact.",
  keywords:
    "humanitarian programs, food assistance, emergency relief, medical assistance, education support, winter support, community programs",
  openGraph: {
    title: "Our Programs | One World Hands Humanitarian Support",
    description:
      "Discover our community-designed programs for food, medical, education, and emergency support.",
    url: "https://oneworldhands.org/programs",
  },
};

export default function ProgramsPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Hero intro */}
          <section className="rounded-2xl lg:rounded-3xl border-2 border-neutral-200 bg-linear-to-br from-white to-neutral-50 p-6 shadow-lg sm:p-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-neutral-950 via-neutral-800 to-neutral-700 bg-clip-text text-transparent sm:text-4xl">
                  Programs
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
                  Each program is designed with communities to deliver dignified
                  support, practical education, and lasting community capacity.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/donation-funds"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-linear-to-r from-sky-600 to-blue-600 px-6 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  🎁 Donate Now
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex h-11 items-center justify-center rounded-full border-2 border-sky-300 bg-white px-6 text-sm font-bold text-sky-700 shadow-md transition-all hover:shadow-lg hover:scale-105 hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  📚 Explore Resources
                </Link>
              </div>
            </div>
          </section>

          {/* Program cards */}
          <section className="mt-10" aria-label="Programs list">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <article
                  key={program.id}
                  id={program.id}
                  className={`scroll-mt-28 group relative overflow-hidden rounded-xl lg:rounded-2xl border-2 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 bg-white ${program.accent.ring}`}
                >
                  <div
                    className={`pointer-events-none absolute right-0 top-0 h-16 w-16 lg:h-20 lg:w-20 rounded-full bg-linear-to-br ${program.accent.gradientFrom} ${program.accent.gradientTo} opacity-15`}
                  />
                  <div
                    className={`pointer-events-none absolute -left-4 -bottom-4 h-24 w-24 rounded-full bg-linear-to-tl ${program.accent.gradientFrom} ${program.accent.gradientTo} opacity-10`}
                  />

                  <div className="relative p-5 lg:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold uppercase tracking-widest ${program.accent.text} opacity-80`}>
                          {program.category}
                        </p>
                        <h2 className="mt-1.5 text-base lg:text-lg font-bold tracking-tight bg-linear-to-r from-neutral-950 via-neutral-800 to-neutral-700 bg-clip-text text-transparent">
                          {program.title}
                        </h2>
                      </div>
                      <span
                        className={`shrink-0 inline-flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-lg lg:rounded-xl ring-2 ring-offset-2 ${program.accent.ring} ${program.accent.bg} shadow-lg transition-transform group-hover:scale-110`}
                        aria-hidden="true"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className={`h-5 w-5 lg:h-6 lg:w-6 ${program.accent.text}`}
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

                    <p className="mt-3 text-sm leading-6 text-neutral-700 line-clamp-2">
                      {program.description}
                    </p>

                    {program.fundingSources && program.fundingSources.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">
                          📌 Related funding source(s)
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {program.fundingSources.map((src) => (
                            <span
                              key={src}
                              className={`rounded-full border-2 px-3 py-1 text-xs font-bold text-black transition-all shadow-lg hover:shadow-xl hover:scale-105${program.accent.bg} shadow-md`}
                            >
                              ✨ {src}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-5">
                      <details className="group/details">
                        <summary
                          className={`cursor-pointer list-none rounded-full border-2 px-4 py-2 text-sm font-bold text-neutral-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 [&::-webkit-details-marker]:hidden ${program.accent.bg}`}
                        >
                          📖 Learn More
                        </summary>
                        <div className="mt-4 border-t-2 border-neutral-200 pt-4">
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">
                                📍 Location
                              </p>
                              <p className="mt-1 text-sm font-semibold text-neutral-800">
                                {program.location}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">
                                ⏱️ Duration
                              </p>
                              <p className="mt-1 text-sm font-semibold text-neutral-800">
                                {program.duration}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4">
                            <p className="text-sm font-bold text-neutral-950">
                              ⭐ Impact points
                            </p>
                            <ul className="mt-3 space-y-2">
                              {program.impactPoints.map((point) => (
                                <li
                                  key={point}
                                  className="flex items-start gap-2 text-sm text-neutral-800 font-medium"
                                >
                                  <span className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-offset-1 shrink-0 font-bold text-white text-xs ${program.accent.bg} shadow-md`}>
                                    ✓
                                  </span>
                                  <span className="leading-6">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </details>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
    </PageShell>
  );
}
