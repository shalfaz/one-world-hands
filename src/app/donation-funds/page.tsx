import Link from "next/link";
import PageShell from "@/components/PageShell";
import FundCard from "@/components/FundCard";
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

export default function DonationFundsPage() {
  const funds = getPublicDonationFunds();

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-4xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Donation Funds
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
            Choose where your support helps most. Each fund is designed for
            dignity-first outcomes and community-led priorities.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/#quick-donation"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#008744] px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#006b36] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008744] focus-visible:ring-offset-2"
            >
              Donate Now
            </Link>
            <Link
              href="/programs"
              className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              Explore Programs
            </Link>
          </div>
        </section>

        <section className="mt-10" aria-label="Donation funds list">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {funds.map((fund) => (
              <div key={fund.id} id={fund.slug} className="scroll-mt-28">
                <FundCard fund={fund} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}