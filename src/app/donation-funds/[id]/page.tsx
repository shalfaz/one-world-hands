import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DonationCheckout from "@/components/DonationCheckout";
import PageShell from "@/components/PageShell";
import { getDonationFundBySlug } from "@/lib/data/donationFunds";

type FundPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: FundPageProps) {
  const { id } = await params;
  const fund = getDonationFundBySlug(id);

  return {
    title: fund ? `Donate to ${fund.name} | One World Hands` : "Fund Not Found",
    description: fund?.description,
  };
}

export default async function FundDetailPage({ params }: FundPageProps) {
  const { id } = await params;
  const fund = getDonationFundBySlug(id);

  if (!fund) notFound();

  return (
    <PageShell>
      <div className="bg-[#f4f7f4]">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
          <Link
            href="/donation-funds"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition-colors hover:text-[#007a3d]"
          >
            <span aria-hidden="true">←</span> All donation funds
          </Link>

          <div className="mt-5 grid items-start gap-7 lg:grid-cols-[minmax(0,1.08fr)_minmax(390px,0.92fr)] lg:gap-10">
            <article className="min-w-0">
              <header className="mb-5">
                <p className="text-xs font-bold uppercase text-[#007a3d]">
                  {fund.categoryLabel || fund.category} fund
                </p>
                <h1 className="mt-1.5 text-3xl font-bold leading-tight text-neutral-950 sm:text-4xl">
                  {fund.name}
                </h1>
              </header>

              <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-neutral-200 shadow-sm">
                {fund.image ? (
                  <Image
                    src={fund.image}
                    alt={fund.name}
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

              <blockquote className="mt-5 rounded-lg border border-[#dce9df] bg-[#edf4ef] px-5 py-5 sm:px-7">
                <p className="text-center text-base font-semibold leading-7 text-[#234333]">
                  {fund.impactSummary}
                </p>
              </blockquote>

              <div className="mt-6 space-y-5 text-sm leading-6 text-neutral-700 sm:text-base sm:leading-7">
                <p>{fund.description}</p>
                <p>
                  Your contribution helps support this fund&apos;s work and the
                  people and communities it serves. Every gift, at any amount,
                  is welcome.
                </p>
              </div>

              <section className="mt-6 rounded-lg border border-[#dce9df] bg-[#edf4ef] p-5 sm:p-6" aria-labelledby="fund-priorities-title">
                <h2 id="fund-priorities-title" className="text-lg font-bold text-[#173c2a]">
                  Fund priorities
                </h2>
                <p className="mt-2 text-sm leading-6 text-neutral-700">
                  Contributions support the activities described for this fund:
                </p>
                <ul className="mt-4 grid gap-2.5 text-sm leading-5 text-neutral-800">
                  <li className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-0.5 text-[#008744]">●</span>
                    <span>{fund.impactSummary}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-0.5 text-[#008744]">●</span>
                    <span>{fund.description}</span>
                  </li>
                </ul>
              </section>
            </article>

            <DonationCheckout fund={fund} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}