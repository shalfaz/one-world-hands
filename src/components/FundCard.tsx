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
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#dce5de] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c5d8c8] hover:shadow-[0_18px_42px_-30px_rgba(24,59,44,0.38)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#edf2ed]">
        {fund.image ? (
          <Image
            src={fund.image}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-[#183b2c]">
          {fund.name}
        </h3>

        {fund.categoryLabel || fund.category ? (
          <div className="mt-2">
            <span className="inline-flex items-center rounded-full bg-[#edf5ef] px-3 py-1 text-xs font-semibold text-[#45624e]">
              {fund.categoryLabel || (fund.category || "").charAt(0).toUpperCase() + (fund.category || "").slice(1)}
            </span>
          </div>
        ) : null}

        <p className="mt-3 flex-1 text-sm leading-6 text-[#5b6d62]">
          {fund.description}
        </p>

        <div className="mt-5 pt-1">
          <Link
            href={fund.href}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#176345] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#104b34] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176345] focus-visible:ring-offset-2"
            aria-label={`Donate to ${fund.name}`}
          >
            Donate
          </Link>
        </div>
      </div>
    </article>
  );
}
