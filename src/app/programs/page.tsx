import Link from "next/link";
import { programs } from "@/data/programs";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Programs | One World Hands",
  description:
    "Explore One World Hands programs designed with communities to deliver dignity-first humanitarian support.",
};

export default function ProgramsPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Hero intro */}
          <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
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
                  className="inline-flex h-11 items-center justify-center rounded-full bg-sky-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  Donate Now
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  Explore Resources
                </Link>
              </div>
            </div>
          </section>

          {/* Program cards */}
          <section className="mt-10" aria-label="Programs list">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <article
                  key={program.id}
                  id={program.id}
                  className="scroll-mt-28 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                        {program.category}
                      </p>
                      <h2 className="mt-2 text-lg font-semibold tracking-tight text-neutral-950">
                        {program.title}
                      </h2>
                    </div>
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${program.accent.ring} bg-white`}
                      aria-hidden="true"
                    >
                      <svg
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

                  {program.fundingSources && program.fundingSources.length > 0 && (
                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                        Related funding source(s)
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {program.fundingSources.map((src) => (
                          <span
                            key={src}
                            className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-700"
                          >
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <details className="group">
                      <summary
                        className="cursor-pointer list-none rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden"
                      >
                        Learn More
                      </summary>
                      <div className="mt-4 border-t border-neutral-200 pt-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                              Location
                            </p>
                            <p className="mt-1 text-sm font-medium text-neutral-800">
                              {program.location}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                              Duration
                            </p>
                            <p className="mt-1 text-sm font-medium text-neutral-800">
                              {program.duration}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-sm font-semibold text-neutral-950">
                            Impact points
                          </p>
                          <ul className="mt-3 space-y-2">
                            {program.impactPoints.map((point) => (
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
                        </div>
                      </div>
                    </details>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
    </PageShell>
  );
}
