import Link from "next/link";
import FundCard from "@/components/FundCard";
import { getPublicDonationFunds } from "@/lib/data/donationFunds";

export default function HomeDonationFundsSection() {
  const featuredFunds = getPublicDonationFunds().slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#008744]">
              Donation Funds
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Support the fund that matters most
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
              Explore our active donation funds and support community-led,
              dignity-first action where it is needed most.
            </p>
          </div>

          <Link
            href="/donation-funds"
            className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
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
