import Link from "next/link";
import FundCard from "@/components/FundCard";
import { getPublicDonationFunds } from "@/lib/data/donationFunds";

export default async function HomeDonationFundsSection() {
  const featuredFunds = (await getPublicDonationFunds()).slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-[#D9E2EC] bg-white p-6 sm:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">
              Donation Funds
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#174A70] sm:text-4xl">
              Support the fund that matters most
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#475569]">
              Explore our active donation funds and support community-led,
              dignity-first action where it is needed most.
            </p>
          </div>

          <Link
            href="/donation-funds"
            className="inline-flex h-11 items-center justify-center rounded-full border border-[#D9E2EC] bg-white px-6 text-sm font-semibold text-[#174A70] transition-colors hover:bg-[#EAF6FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
          >
            View All Funds
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredFunds.map((fund) => (
            <FundCard key={fund.id} fund={fund} />
          ))}
        </div>
      </div>
    </section>
  );
}
