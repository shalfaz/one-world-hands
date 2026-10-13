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
      <div className="bg-[#f6f8f5]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <Link
            href="/donation-funds"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition-colors hover:text-[#007a3d]"
          >
            <span aria-hidden="true">←</span> All donation funds
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12">
            <section>
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-neutral-200">
                {fund.image ? (
                  <Image
                    src={fund.image}
                    alt={fund.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    className="object-cover"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className={`h-full w-full bg-linear-to-br ${fund.accent.gradientFrom} ${fund.accent.gradientTo}`}
                  />
                )}
              </div>

              <div className="mt-7">
                <p className="text-sm font-bold uppercase text-[#007a3d]">
                  {fund.categoryLabel || fund.category}
                </p>
                <h1 className="mt-2 max-w-2xl text-3xl font-bold leading-tight text-neutral-950 sm:text-4xl">
                  {fund.name}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
                  {fund.description}
                </p>
              </div>

              <div className="mt-7 border-t border-neutral-200 pt-6">
                <h2 className="text-lg font-bold text-neutral-950">Your gift at work</h2>
                <p className="mt-2 max-w-2xl leading-7 text-neutral-700">
                  {fund.impactSummary}
                </p>
              </div>
            </section>

            <DonationCheckout fund={fund} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}