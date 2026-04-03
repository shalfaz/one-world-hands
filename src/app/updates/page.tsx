import Link from "next/link";
import { updates } from "@/data/updates";
import { updateSections } from "@/data/updateSections";
import PageShell from "@/components/PageShell";
import HomeDonationFundsSection from "@/components/HomeDonationFundsSection";

export const metadata = {
  title: "Updates | One World Hands",
  description:
    "Stay up to date with One World Hands notices, campaigns, and transparent program learning.",
};

function formatDate(dateISO: string) {
  const date = new Date(dateISO + "T00:00:00Z");
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

export default function UpdatesPage() {
  const sections = updateSections.map((s) => ({
    ...s,
    items: updates.filter((u) => u.type === s.type),
  }));

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Updates
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
            Notices, campaign progress, and announcements shared transparently
            with our community.
          </p>
        </section>

        <div className="mt-10 space-y-12">
          {sections.map((section) => {
            if (section.items.length === 0) return null;

            return (
              <section
                key={section.id}
                aria-labelledby={`${section.id}-title`}
              >
                <h2
                  id={`${section.id}-title`}
                  className="text-2xl font-semibold tracking-tight text-neutral-950"
                >
                  {section.heading}
                </h2>

                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((u) => (
                    <article
                      key={u.id}
                      className="group rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className={section.badgeClasses}>
                          {section.badgeLabel}
                        </span>
                        <time
                          dateTime={u.dateISO}
                          className="text-xs font-medium text-neutral-500"
                        >
                          {formatDate(u.dateISO)}
                        </time>
                      </div>

                      <h3 className="mt-3 text-lg font-semibold tracking-tight text-neutral-950">
                        {u.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-neutral-700">
                        {u.excerpt}
                      </p>

                      <div className="mt-6">
                        <Link
                          href={u.href}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                        >
                          Read more
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
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <HomeDonationFundsSection />
    </PageShell>
  );
}