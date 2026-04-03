import Link from "next/link";
import type { Update } from "@/types/ngo";

function formatDate(dateISO: string) {
  const date = new Date(dateISO + "T00:00:00Z");
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

export default function UpdatesSection({
  updates,
  title = "Latest Updates",
  limit = 3,
}: {
  updates: Update[];
  title?: string;
  limit?: number;
}) {
  const visible = updates.slice(0, limit);

  return (
    <section aria-labelledby="updates-title">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2
            id="updates-title"
            className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl"
          >
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-7 text-neutral-700">
            Thoughtful notices and campaign progress—shared transparently with
            our community.
          </p>
        </div>

        <Link
          href="/updates"
          className="hidden rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 sm:inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
        >
          View all
        </Link>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {visible.map((u) => (
          <article
            key={u.id}
            className="group rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800 ring-1 ring-sky-200">
                {u.type}
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

            <div className="mt-6 flex items-center justify-between">
              <Link
                href={u.href}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                aria-label={`Read ${u.title}`}
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

      <div className="mt-6 sm:hidden">
        <Link
          href="/updates"
          className="inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
        >
          View all updates
        </Link>
      </div>
    </section>
  );
}

