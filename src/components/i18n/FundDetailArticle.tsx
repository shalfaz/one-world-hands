"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import type { DonationFundRecord } from "@/lib/data/donationFunds";

type TranslatedFundItem = {
  name: string;
  description: string;
  impactSummary: string;
  categoryLabel: string;
};

export default function FundDetailArticle({
  fund,
}: {
  fund: DonationFundRecord;
}) {
  const { t, tr } = useLanguage();

  const items = t.funds.items as Record<string, TranslatedFundItem>;
  const translated = items[fund.slug] ?? items[fund.id];
  const name = translated?.name ?? fund.name;
  const description = translated?.description ?? fund.description;
  const impactSummary = translated?.impactSummary ?? fund.impactSummary;

  const rawCategory = fund.categoryLabel || fund.category;
  const categories = t.funds.categories as Record<string, string>;
  const categoryLabel =
    translated?.categoryLabel ??
    categories[rawCategory.toLowerCase()] ??
    rawCategory;

  return (
    <article className="min-w-0">
      <header className="mb-5">
        <p className="text-xs font-bold uppercase text-[#174A70]">
          {tr("funds.detail.categoryFund", { category: categoryLabel })}
        </p>
        <h1 className="mt-1.5 text-3xl font-bold leading-tight text-neutral-950 sm:text-4xl">
          {name}
        </h1>
      </header>

      <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-neutral-200 shadow-sm">
        {fund.image ? (
          <Image
            src={fund.image}
            alt={name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className={`h-full w-full bg-linear-to-br ${fund.accent.gradientFrom} ${fund.accent.gradientTo}`}
          />
        )}
      </div>

      <blockquote className="mt-5 rounded-lg border border-[#D9E2EC] bg-[#EAF6FB] px-5 py-5 sm:px-7">
        <p className="text-center text-base font-semibold leading-7 text-[#174A70]">
          {impactSummary}
        </p>
      </blockquote>

      <div className="mt-6 space-y-5 text-sm leading-6 text-neutral-700 sm:text-base sm:leading-7">
        <p>{description}</p>
        <p>{t.funds.detail.supportNote}</p>
      </div>

      <section
        className="mt-6 rounded-lg border border-[#D9E2EC] bg-[#EAF6FB] p-5 sm:p-6"
        aria-labelledby="fund-priorities-title"
      >
        <h2
          id="fund-priorities-title"
          className="text-lg font-bold text-[#174A70]"
        >
          {t.funds.detail.prioritiesTitle}
        </h2>
        <p className="mt-2 text-sm leading-6 text-neutral-700">
          {t.funds.detail.prioritiesIntro}
        </p>
        <ul className="mt-4 grid gap-2.5 text-sm leading-5 text-neutral-800">
          <li className="flex items-start gap-2.5">
            <span aria-hidden="true" className="mt-0.5 text-[#009EDB]">
              ●
            </span>
            <span>{impactSummary}</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span aria-hidden="true" className="mt-0.5 text-[#009EDB]">
              ●
            </span>
            <span>{description}</span>
          </li>
        </ul>
      </section>
    </article>
  );
}
