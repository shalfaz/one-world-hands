import Link from "next/link";
import PageShell from "@/components/PageShell";
import FundCard from "@/components/FundCard";
import { getPublicFunds } from "@/lib/public-funds";

export const metadata = {
  title: "Donation Funds | One World Hands",
  description:
    "Support One World Hands through transparent, dignity-first donation funds aligned to community needs.",
};

export default async function DonationFundsPage() {
  const funds = await getPublicFunds();

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
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
              className="inline-flex h-11 items-center justify-center rounded-full bg-sky-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
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
          {funds.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {funds.map((fund) => (
                <div key={fund.id} id={fund.id} className="scroll-mt-28">
                  <div className="mb-3">
                    <p
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${fund.accent.bg} ${fund.accent.text} ${fund.accent.ring}`}
                    >
                      {fund.categoryLabel}
                    </p>
                  </div>

                  <FundCard fund={fund} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-neutral-300 bg-white p-10 text-center">
              <h2 className="text-lg font-semibold text-neutral-900">
                No active donation funds found
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Add or activate funds from the dashboard to show them here.
              </p>
            </div>
          )}
        </section>
      </div>
    </PageShell>
  );
}