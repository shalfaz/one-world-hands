import Link from "next/link";
import PageShell from "@/components/PageShell";
import FundCard from "@/components/FundCard";
import T from "@/components/T";
import FundsListSection from "@/components/i18n/FundsListSection";
import { getPublicDonationFunds } from "@/lib/data/donationFunds";

export const metadata = {
  title: "Donate | Support Our Humanitarian Programs | One World Hands",
  description:
    "Make a transparent, dignity-first donation to One World Hands. Support food assistance, emergency relief, medical aid, education, and winter support programs globally.",
  keywords:
    "donate, charity, humanitarian donation, NGO donation, food assistance donation, emergency relief fund, transparent giving",
  openGraph: {
    title: "Donate to One World Hands | Transparent Humanitarian Support",
    description:
      "Support our community-designed programs through transparent, dignity-first donations.",
    url: "https://oneworldhands.org/donation-funds",
  },
};

export default async function DonationFundsPage() {
  const funds = await getPublicDonationFunds();

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-[#D9E2EC] bg-white p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">
            <T k="funds.list.eyebrow" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#174A70] sm:text-4xl">
            <T k="funds.list.title" />
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#475569]">
            <T k="funds.list.description" />
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/#quick-donation"
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-[#009EDB] px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0088be] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
            >
              <T k="funds.list.donateNow" />
            </Link>
            <Link
              href="/programs"
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full border border-[#D9E2EC] bg-white px-6 text-sm font-semibold text-[#174A70] transition-colors hover:bg-[#EAF6FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
            >
              <T k="funds.list.explorePrograms" />
            </Link>
          </div>
        </section>

        <FundsListSection>
          <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
            {funds.map((fund) => (
              <div key={fund.id} id={fund.slug} className="h-full scroll-mt-28">
                <FundCard fund={fund} />
              </div>
            ))}
          </div>
        </FundsListSection>
      </div>
    </PageShell>
  );
}