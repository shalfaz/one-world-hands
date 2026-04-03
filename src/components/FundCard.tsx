import Link from "next/link";

type FundCardFund = {
  id: string;
  name: string;
  description: string;
  href: string;
  accent: {
    bg: string;
    ring: string;
    text: string;
    gradientFrom: string;
    gradientTo: string;
  };
};

export default function FundCard({ fund }: { fund: FundCardFund }) {
  return (
    <article
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all",
        "hover:-translate-y-0.5 hover:shadow-md",
        "select-none",
        fund.accent.bg,
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-br ${fund.accent.gradientFrom} ${fund.accent.gradientTo} opacity-10`}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Donation Fund
            </p>
            <h3 className="mt-2 text-lg font-semibold leading-6 text-neutral-950">
              {fund.name}
            </h3>
          </div>

          <span
            className={`mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${fund.accent.ring} bg-white`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className={`h-5 w-5 ${fund.accent.text}`}
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
          {fund.description}
        </p>

        <div className="mt-auto pt-6">
          <Link
            href={fund.href}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-sky-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            aria-label={`Donate to ${fund.name}`}
          >
            Donate
          </Link>
        </div>
      </div>
    </article>
  );
}