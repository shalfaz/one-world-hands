import Link from "next/link";
import PageShell from "@/components/PageShell";
import T from "@/components/T";
import type { TranslationKey } from "@/context/i18n-utils";

export const metadata = {
  title: "About One World Hands | Our Mission, Vision & Values",
  description:
    "Discover One World Hands—a humanitarian NGO committed to dignity-first support. Learn about our mission to empower individuals and communities through education, direct action, and collaboration globally.",
  keywords:
    "about One World Hands, humanitarian organization, NGO mission, community support, humanitarian values",
  openGraph: {
    title: "About One World Hands | Humanitarian Organization",
    description:
      "Learn about our mission to empower communities with dignity-first humanitarian support.",
    url: "https://oneworldhands.org/about-us",
  },
};

export default function AboutUsPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Hero intro */}
          <section className="rounded-2xl border border-[#D9E2EC] bg-white p-6 sm:p-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">
                  <T k="about.hero.eyebrow" />
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#174A70] sm:text-4xl">
                  <T k="about.hero.title" />
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
                  <T k="about.hero.subtitle" />
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/donation-funds"
                  className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-[#009EDB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
                >
                  <T k="about.hero.donateCta" />
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full border border-[#D9E2EC] bg-white px-6 text-sm font-semibold text-[#174A70] transition-colors hover:border-[#009EDB] hover:bg-[#EAF6FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
                >
                  <T k="about.hero.programsCta" />
                </Link>
              </div>
            </div>
          </section>

          {/* Organization overview */}
          <section className="mt-10">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div className="rounded-2xl border border-[#D9E2EC] bg-white p-6 sm:p-8">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                  <T k="about.overview.title" />
                </h2>
                <p className="mt-3 text-base leading-7 text-neutral-700">
                  <T k="about.overview.description" />
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      titleKey: "about.overview.cards.directAction.title" as const satisfies TranslationKey,
                      descKey: "about.overview.cards.directAction.desc" as const satisfies TranslationKey,
                      icon: (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-5 w-5 text-[#009EDB]"
                          fill="none"
                        >
                          <path
                            d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ),
                    },
                    {
                      titleKey: "about.overview.cards.education.title" as const satisfies TranslationKey,
                      descKey: "about.overview.cards.education.desc" as const satisfies TranslationKey,
                      icon: (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-5 w-5 text-[#009EDB]"
                          fill="none"
                        >
                          <path
                            d="M4 6l8-3 8 3-8 3-8-3Z"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4 6v6c0 1 3 3 8 3s8-2 8-3V6"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ),
                    },
                    {
                      titleKey: "about.overview.cards.collaboration.title" as const satisfies TranslationKey,
                      descKey: "about.overview.cards.collaboration.desc" as const satisfies TranslationKey,
                      icon: (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-5 w-5 text-[#009EDB]"
                          fill="none"
                        >
                          <path
                            d="M16 18v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinecap="round"
                          />
                          <path
                            d="M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 18v-2a4 4 0 0 0-3-3.87"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinecap="round"
                          />
                          <path
                            d="M16 6.13a4 4 0 0 1 0 7.75"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinecap="round"
                          />
                        </svg>
                      ),
                    },
                    {
                      titleKey: "about.overview.cards.accountability.title" as const satisfies TranslationKey,
                      descKey: "about.overview.cards.accountability.desc" as const satisfies TranslationKey,
                      icon: (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-5 w-5 text-[#009EDB]"
                          fill="none"
                        >
                          <path
                            d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ),
                    },
                  ].map((c) => (
                    <div
                      key={c.titleKey}
                      className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white ring-1 ring-neutral-200">
                          {c.icon}
                        </span>
                        <p className="text-sm font-semibold text-neutral-900">
                          <T k={c.titleKey} />
                        </p>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-neutral-700">
                        <T k={c.descKey} />
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[#D9E2EC] bg-[#F7FAFC] p-6 sm:p-8">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                  <T k="about.promise.heading" />
                </h3>
                <p className="mt-3 text-base leading-7 text-neutral-700">
                  <T k="about.promise.body" />
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    {
                      labelKey: "about.promise.items.partnerLed.label" as const satisfies TranslationKey,
                      valueKey: "about.promise.items.partnerLed.value" as const satisfies TranslationKey,
                    },
                    {
                      labelKey: "about.promise.items.evidenceInformed.label" as const satisfies TranslationKey,
                      valueKey: "about.promise.items.evidenceInformed.value" as const satisfies TranslationKey,
                    },
                    {
                      labelKey: "about.promise.items.dignityFirst.label" as const satisfies TranslationKey,
                      valueKey: "about.promise.items.dignityFirst.value" as const satisfies TranslationKey,
                    },
                  ].map((item) => (
                    <div key={item.labelKey}>
                      <p className="text-sm font-semibold text-neutral-900">
                        <T k={item.labelKey} />
                      </p>
                      <p className="mt-1 text-sm leading-6 text-neutral-700">
                        <T k={item.valueKey} />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="mt-10">
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#D9E2EC] bg-white p-6 sm:p-8">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                  <T k="about.visionMission.visionTitle" />
                </h2>
                <p className="mt-4 text-base leading-7 text-neutral-700">
                  <T k="about.visionMission.visionBody" />
                </p>
              </div>
              <div className="rounded-2xl border border-[#D9E2EC] bg-white p-6 sm:p-8">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                  <T k="about.visionMission.missionTitle" />
                </h2>
                <p className="mt-4 text-base leading-7 text-neutral-700">
                  <T k="about.visionMission.missionBody" />
                </p>
              </div>
            </div>
          </section>

          {/* Core values */}
          <section className="mt-10" aria-labelledby="core-values">
            <div>
              <h2 id="core-values" className="text-2xl font-semibold tracking-tight text-neutral-950">
                <T k="about.values.title" />
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-700">
                <T k="about.values.subtitle" />
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                {
                  titleKey: "about.values.items.dignityAndSafety.title" as const satisfies TranslationKey,
                  bodyKey: "about.values.items.dignityAndSafety.body" as const satisfies TranslationKey,
                  icon: "heart",
                  cls: "bg-[#EAF6FB] ring-[#D9E2EC] text-[#009EDB]",
                },
                {
                  titleKey: "about.values.items.transparentGiving.title" as const satisfies TranslationKey,
                  bodyKey: "about.values.items.transparentGiving.body" as const satisfies TranslationKey,
                  icon: "report",
                  cls: "bg-[#EAF6FB] ring-[#D9E2EC] text-[#009EDB]",
                },
                {
                  titleKey: "about.values.items.communityPartnership.title" as const satisfies TranslationKey,
                  bodyKey: "about.values.items.communityPartnership.body" as const satisfies TranslationKey,
                  icon: "users",
                  cls: "bg-[#EAF6FB] ring-[#D9E2EC] text-[#009EDB]",
                },
                {
                  titleKey: "about.values.items.sustainableChange.title" as const satisfies TranslationKey,
                  bodyKey: "about.values.items.sustainableChange.body" as const satisfies TranslationKey,
                  icon: "leaf",
                  cls: "bg-[#EAF6FB] ring-[#D9E2EC] text-[#17634B]",
                },
              ].map((v) => (
                <div
                  key={v.titleKey}
                  className="rounded-xl border border-[#D9E2EC] bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${v.cls}`}
                    >
                      {v.icon === "heart" && (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                        >
                          <path
                            d="M20.8 4.6c-1.4-1.4-3.7-1.4-5.1 0L12 8.3 8.3 4.6c-1.4-1.4-3.7-1.4-5.1 0-1.4 1.4-1.4 3.7 0 5.1L12 18.5l8.8-8.8c1.4-1.4 1.4-3.7 0-5.1Z"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      {v.icon === "report" && (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                        >
                          <path
                            d="M4 19V5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14 3v5h5"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      {v.icon === "users" && (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                        >
                          <path
                            d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinecap="round"
                          />
                          <path
                            d="M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M20 21v-2a4 4 0 0 0-3-3.87"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinecap="round"
                          />
                          <path
                            d="M17 11a4 4 0 0 0 0-8"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                      {v.icon === "leaf" && (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                        >
                          <path
                            d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 11c1.5 1.5 4.5 1.5 6 0"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </span>
                    <p className="text-sm font-semibold text-neutral-950">
                      <T k={v.titleKey} />
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-neutral-700">
                    <T k={v.bodyKey} />
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Why One World Hands exists */}
          <section className="mt-10 rounded-2xl border border-[#D9E2EC] bg-[#F7FAFC] p-6 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                  <T k="about.why.title" />
                </h2>
                <p className="mt-3 text-base leading-7 text-neutral-700">
                  <T k="about.why.body" />
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                  <T k="about.why.focusHeading" />
                </h3>
                <ul className="mt-4 space-y-3">
                  {(
                    [
                      "about.why.focusItems.item1",
                      "about.why.focusItems.item2",
                      "about.why.focusItems.item3",
                      "about.why.focusItems.item4",
                    ] as const satisfies readonly TranslationKey[]
                  ).map((itemKey) => (
                    <li key={itemKey} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white ring-1 ring-neutral-200">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5 text-[#009EDB]"
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
                      <span className="text-sm leading-6 text-neutral-700">
                        <T k={itemKey} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Optional timeline / future goal */}
          <section className="mt-10">
            <div className="rounded-2xl border border-[#D9E2EC] bg-white p-6 sm:p-10">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                <T k="about.timeline.title" />
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-700">
                <T k="about.timeline.subtitle" />
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {[
                  {
                    titleKey: "about.timeline.steps.next12Months.title" as const satisfies TranslationKey,
                    bodyKey: "about.timeline.steps.next12Months.body" as const satisfies TranslationKey,
                  },
                  {
                    titleKey: "about.timeline.steps.next2To3Years.title" as const satisfies TranslationKey,
                    bodyKey: "about.timeline.steps.next2To3Years.body" as const satisfies TranslationKey,
                  },
                  {
                    titleKey: "about.timeline.steps.longTerm.title" as const satisfies TranslationKey,
                    bodyKey: "about.timeline.steps.longTerm.body" as const satisfies TranslationKey,
                  },
                ].map((step) => (
                  <div
                    key={step.titleKey}
                    className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-5"
                  >
                    <p className="text-sm font-semibold text-neutral-950">
                      <T k={step.titleKey} />
                    </p>
                    <p className="mt-3 text-sm leading-6 text-neutral-700">
                      <T k={step.bodyKey} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
    </PageShell>
  );
}

