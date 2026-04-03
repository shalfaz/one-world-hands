import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "About Us | One World Hands",
  description:
    "Learn about One World Hands—our vision, mission, and how we work with communities to create dignity-first support.",
};

export default function AboutUsPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Hero intro */}
          <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                  About One World Hands
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
                  For the world, with a magic touch. We empower individuals,
                  support communities, and address social, economic, and
                  environmental challenges through direct action, education,
                  and collaboration.
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
                  href="/programs"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  Explore Programs
                </Link>
              </div>
            </div>
          </section>

          {/* Organization overview */}
          <section className="mt-10">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                  How we support people
                </h2>
                <p className="mt-3 text-base leading-7 text-neutral-700">
                  We work alongside community partners to understand needs
                  directly, respond with practical support, and share what we
                  learn along the way—so help stays useful and effective.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      title: "Direct action",
                      desc: "Support designed around urgent, practical needs.",
                      icon: (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-5 w-5 text-sky-700"
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
                      title: "Education",
                      desc: "Learning that helps people build stability.",
                      icon: (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-5 w-5 text-green-700"
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
                      title: "Collaboration",
                      desc: "Partners shape outcomes with local insight.",
                      icon: (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-5 w-5 text-indigo-700"
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
                      title: "Accountability",
                      desc: "Transparent updates and community feedback.",
                      icon: (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-5 w-5 text-amber-700"
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
                      key={c.title}
                      className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white ring-1 ring-neutral-200">
                          {c.icon}
                        </span>
                        <p className="text-sm font-semibold text-neutral-900">
                          {c.title}
                        </p>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-neutral-700">
                        {c.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 shadow-sm sm:p-8">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                  Our promise
                </h3>
                <p className="mt-3 text-base leading-7 text-neutral-700">
                  We prioritize dignity, listening, and practical support—so
                  communities aren’t just served; they’re supported to lead.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    {
                      label: "Partner-led",
                      value: "Community insight guides decisions.",
                    },
                    {
                      label: "Evidence-informed",
                      value: "Learning improves how we help.",
                    },
                    {
                      label: "Dignity-first",
                      value: "Help is delivered with respect and care.",
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-sm font-semibold text-neutral-900">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-neutral-700">
                        {item.value}
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
              <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                  Vision
                </h2>
                <p className="mt-4 text-base leading-7 text-neutral-700">
                  {`A world where every human being has opportunity, dignity, and support to live a better life.`}
                </p>
              </div>
              <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                  Mission
                </h2>
                <p className="mt-4 text-base leading-7 text-neutral-700">
                  {`To empower individuals, support communities, and address social, economic, and environmental challenges through direct action, education, and collaboration.`}
                </p>
              </div>
            </div>
          </section>

          {/* Core values */}
          <section className="mt-10" aria-labelledby="core-values">
            <div>
              <h2 id="core-values" className="text-2xl font-semibold tracking-tight text-neutral-950">
                Core Values
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-700">
                Values that keep our work trustworthy, humane, and focused on
                real outcomes.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                {
                  title: "Dignity and Safety",
                  body: "We design support that respects people’s choices and protects wellbeing.",
                  icon: "heart",
                  cls: "bg-sky-50 ring-sky-200 text-sky-700",
                },
                {
                  title: "Transparent Giving",
                  body: "We share clear updates and learning notes so supporters can follow progress.",
                  icon: "report",
                  cls: "bg-green-50 ring-green-200 text-green-700",
                },
                {
                  title: "Community Partnership",
                  body: "Local people guide priorities, delivery, and feedback.",
                  icon: "users",
                  cls: "bg-indigo-50 ring-indigo-200 text-indigo-700",
                },
                {
                  title: "Sustainable Change",
                  body: "We support practices that endure—skills, stewardship, and community ownership.",
                  icon: "leaf",
                  cls: "bg-teal-50 ring-teal-200 text-teal-700",
                },
              ].map((v) => (
                <div
                  key={v.title}
                  className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
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
                      {v.title}
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-neutral-700">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Why One World Hands exists */}
          <section className="mt-10 rounded-[2rem] border border-neutral-200 bg-neutral-50/60 p-6 shadow-sm sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                  Why One World Hands exists
                </h2>
                <p className="mt-3 text-base leading-7 text-neutral-700">
                  People deserve help that feels safe, dignified, and human.
                  When communities receive support designed with them—not just
                  delivered to them—outcomes last longer and learning improves
                  future response.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                  What we focus on
                </h3>
                <ul className="mt-4 space-y-3">
                  {[
                    "Dignity-first response for urgent needs.",
                    "Education and skill-building for stability.",
                    "Partner-led delivery and transparent reporting.",
                    "Support that strengthens community resilience over time.",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white ring-1 ring-neutral-200">
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
                      <span className="text-sm leading-6 text-neutral-700">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Optional timeline / future goal */}
          <section className="mt-10">
            <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                Looking Ahead
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-700">
                Our future goals are guided by what communities ask for most:
                dignity, stability, learning, and sustainable care.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {[
                  {
                    title: "Next 12 months",
                    body: "Strengthen community partnerships and expand learning support alongside urgent essentials.",
                  },
                  {
                    title: "Next 2–3 years",
                    body: "Deepen long-term stewardship through training and maintenance practices for water, wellbeing, and resilience.",
                  },
                  {
                    title: "Long-term goal",
                    body: "Help communities build self-sustaining pathways so support continues beyond each program cycle.",
                  },
                ].map((step) => (
                  <div
                    key={step.title}
                    className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5"
                  >
                    <p className="text-sm font-semibold text-neutral-950">
                      {step.title}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-neutral-700">
                      {step.body}
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

