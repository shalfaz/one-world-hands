import Link from "next/link";
import { notFound } from "next/navigation";
import DonationCheckout from "@/components/DonationCheckout";
import FundDetailArticle from "@/components/i18n/FundDetailArticle";
import PageShell from "@/components/PageShell";
import T from "@/components/T";
import { getDonationFundBySlug } from "@/lib/data/donationFunds";

type FundPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: FundPageProps) {
  const { id } = await params;
  const fund = await getDonationFundBySlug(id);

  return {
    title: fund ? `Donate to ${fund.name} | One World Hands` : "Fund Not Found",
    description: fund?.description,
  };
}

export default async function FundDetailPage({ params }: FundPageProps) {
  const { id } = await params;
  const fund = await getDonationFundBySlug(id);

  if (!fund) notFound();

  return (
    <PageShell>
      <div className="bg-[#F7FAFC]">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
          <Link
            href="/donation-funds"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition-colors hover:text-[#009EDB]"
          >
            <span aria-hidden="true">←</span> <T k="funds.detail.backToAll" />
          </Link>

          <div className="mt-5 grid items-start gap-7 lg:grid-cols-[minmax(0,1.08fr)_minmax(390px,0.92fr)] lg:gap-10">
            <FundDetailArticle fund={fund} />

            <DonationCheckout fund={fund} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}