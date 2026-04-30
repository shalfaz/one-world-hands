import Link from "next/link";
import PageShell from "@/components/PageShell";
import FundCard from "@/components/FundCard";
import { getActiveFunds } from "@/lib/services/fundService";

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
  // Load active funds from MongoDB
  const activeFunds = await getActiveFunds();

  // Helper function to get accent colors by category
  const getAccentByCategory = (category: string) => {
    const accents: Record<string, { bg: string; ring: string; text: string; gradientFrom: string; gradientTo: string }> = {
      education: {
        bg: "bg-blue-50",
        ring: "ring-blue-200",
        text: "text-blue-700",
        gradientFrom: "from-blue-400",
        gradientTo: "to-blue-600",
      },
      health: {
        bg: "bg-red-50",
        ring: "ring-red-200",
        text: "text-red-700",
        gradientFrom: "from-red-400",
        gradientTo: "to-red-600",
      },
      emergency: {
        bg: "bg-orange-50",
        ring: "ring-orange-200",
        text: "text-orange-700",
        gradientFrom: "from-orange-400",
        gradientTo: "to-orange-600",
      },
      community: {
        bg: "bg-emerald-50",
        ring: "ring-emerald-200",
        text: "text-emerald-700",
        gradientFrom: "from-emerald-400",
        gradientTo: "to-emerald-600",
      },
      livelihood: {
        bg: "bg-purple-50",
        ring: "ring-purple-200",
        text: "text-purple-700",
        gradientFrom: "from-purple-400",
        gradientTo: "to-purple-600",
      },
      other: {
        bg: "bg-neutral-50",
        ring: "ring-neutral-200",
        text: "text-neutral-700",
        gradientFrom: "from-neutral-400",
        gradientTo: "to-neutral-600",
      },
    };
    return accents[category] || accents.other;
  };

  const funds = activeFunds.map((fund) => ({
    id: fund._id,
    name: fund.name,
    description: fund.description,
    category: fund.category,
    impactSummary: fund.impactSummary,
    targetAmount: fund.targetAmount,
    raisedAmount: fund.raisedAmount,
    progress: fund.targetAmount > 0 ? (fund.raisedAmount / fund.targetAmount) * 100 : 0,
    href: `/donation-funds/${fund._id}`,
    accent: getAccentByCategory(fund.category),
  }));

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
                      {fund.category.charAt(0).toUpperCase() + fund.category.slice(1)}
                    </p>
                  </div>

                  <FundCard fund={fund} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-4xl border border-dashed border-neutral-300 bg-white p-10 text-center">
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