"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

type FundCardFund = {
  id: string;
  slug?: string;
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

type TranslatedFundItem = {
  name: string;
  description: string;
  impactSummary: string;
  categoryLabel: string;
};

export default function FundCard({ fund }: { fund: FundCardFund }) {
  const { t, tr } = useLanguage();

  const items = t.funds.items as Record<string, TranslatedFundItem>;
  const lookupKey =
    fund.slug ??
    (fund.id in items
      ? fund.id
      : (fund.href.split("/").filter(Boolean).pop() ?? ""));
  const translated = items[lookupKey];

  const displayName = translated?.name ?? fund.name;
  const displayDescription = translated?.description ?? fund.description;

  const rawCategory = fund.categoryLabel || fund.category || "";
  const categories = t.funds.categories as Record<string, string>;
  const displayCategory =
    translated?.categoryLabel ??
    (rawCategory
      ? categories[rawCategory.toLowerCase()] ??
        (fund.categoryLabel ||
          rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1))
      : "");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#D9E2EC] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#009EDB] hover:shadow-[0_18px_42px_-30px_rgba(23,74,112,0.25)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EAF6FB]">
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

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div className="flex flex-1 flex-col">
          <h3 className="line-clamp-2 min-h-[3.2rem] text-lg font-semibold leading-snug tracking-tight text-[#174A70]">
            {displayName}
          </h3>

          {displayCategory ? (
            <div className="mt-2">
              <span className="inline-flex items-center whitespace-nowrap rounded-full bg-[#EAF6FB] px-3 py-1 text-xs font-semibold text-[#174A70]">
                {displayCategory}
              </span>
            </div>
          ) : null}

          <p className="mt-3 line-clamp-3 min-h-[4.5rem] flex-1 text-sm leading-6 text-[#475569]">
            {displayDescription}
          </p>
        </div>

        <div className="mt-5 pt-1">
          <Link
            href={fund.href}
            className="inline-flex h-11 w-full items-center justify-center whitespace-nowrap rounded-full bg-[#009EDB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
            aria-label={tr("funds.card.donateToAria", { fundName: displayName })}
          >
            {t.funds.card.donate}
          </Link>
        </div>
      </div>
    </article>
  );
}
