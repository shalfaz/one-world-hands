import Image from "next/image";
import Link from "next/link";

type FundCardFund = {
  id: string;
  name: string;
  description: string;
  href: string;
  image?: string;
  category?: string;
  categoryLabel?: string;
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
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100">
        {fund.image ? (
          <Image
            src={fund.image}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            aria-hidden="true"
            className={`flex h-full w-full items-center justify-center bg-linear-to-br ${fund.accent.gradientFrom} ${fund.accent.gradientTo}`}
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
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 text-center">
        <h3 className="text-base font-bold leading-snug text-neutral-950 sm:text-lg">
          {fund.name}
        </h3>

        {fund.categoryLabel || fund.category ? (
          <div className="mt-2">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {fund.categoryLabel || (fund.category || "").charAt(0).toUpperCase() + (fund.category || "").slice(1)}
            </span>
          </div>
        ) : null}

        <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">
          {fund.description}
        </p>

        <div className="mt-5 pt-1">
          <Link
            href={fund.href}
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#008744] px-6 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#006b36] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008744] focus-visible:ring-offset-2"
            aria-label={`Donate to ${fund.name}`}
          >
            Donate
          </Link>
        </div>
      </div>
    </article>
  );
}
