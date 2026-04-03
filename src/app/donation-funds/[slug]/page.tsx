import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { getPublicFundBySlug, getPublicFunds } from "@/lib/public-funds";
import { submitDonation } from "../actions";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const funds = await getPublicFunds();

  return funds.map((fund) => ({
    slug: fund.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const fund = await getPublicFundBySlug(slug);

  if (!fund) {
    return {
      title: "Donation Fund Not Found | One World Hands",
      description: "The requested donation fund could not be found.",
    };
  }

  return {
    title: `${fund.name} | One World Hands`,
    description: fund.description,
  };
}

export default async function DonationFundDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const fund = await getPublicFundBySlug(slug);

  if (!fund) {
    notFound();
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/donation-funds"
            className="inline-flex items-center text-sm font-medium text-sky-700 transition-colors hover:text-sky-800"
          >
            ← Back to Donation Funds
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
            <div
              className={`bg-gradient-to-br ${fund.accent.gradientFrom} ${fund.accent.gradientTo} px-6 py-8 text-white sm:px-8 sm:py-10`}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                {fund.categoryLabel}
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {fund.name}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-white/90">
                {fund.description}
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <div className="rounded-[1.5rem] bg-neutral-50 p-5 ring-1 ring-neutral-200">
                <h2 className="text-lg font-semibold text-neutral-950">
                  Why this fund matters
                </h2>
                <p className="mt-3 text-sm leading-7 text-neutral-700">
                  {fund.impactSummary}
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-emerald-50 p-5 ring-1 ring-emerald-200">
                  <h3 className="text-sm font-semibold text-emerald-900">
                    Community-focused support
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-emerald-800">
                    Donations are used to support practical, dignity-first
                    action shaped around local needs and priorities.
                  </p>
                </div>

                <div className="rounded-[1.5rem] bg-sky-50 p-5 ring-1 ring-sky-200">
                  <h3 className="text-sm font-semibold text-sky-900">
                    Transparent giving
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-sky-800">
                    We aim to keep giving simple, clear, and trustworthy so
                    supporters understand where help is going.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-neutral-200 bg-white p-5">
                <h3 className="text-base font-semibold text-neutral-950">
                  What your support can help with
                </h3>

                <ul className="mt-4 space-y-3 text-sm text-neutral-700">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-600" />
                    <span>Direct support aligned with this fund’s purpose</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-600" />
                    <span>Community-led planning and delivery steps</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-600" />
                    <span>Practical follow-up and stewardship support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-600" />
                    <span>Clearer long-term impact across local communities</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <aside className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${fund.accent.bg} ${fund.accent.text} ${fund.accent.ring}`}
                >
                  {fund.categoryLabel}
                </p>

                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950">
                  Donate to {fund.name}
                </h2>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${fund.accent.ring} ${fund.accent.bg}`}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className={`h-6 w-6 ${fund.accent.text}`}
                  fill="none"
                >
                  <path
                    d="M12 2l2.2 6.9H21l-5.6 4 2.1 7.1L12 15.8 6.5 20l2.1-7.1-5.6-4h6.8L12 2Z"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-neutral-700">
              Select an amount and complete the form below to support this fund.
            </p>

            <div className="mt-6">
              <p className="text-sm font-semibold text-neutral-900">
                Suggested amounts
              </p>

              <div className="mt-3 grid grid-cols-2 gap-3">
                {fund.suggestedAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-800 transition-colors hover:border-sky-300 hover:bg-sky-50"
                  >
                    ৳ {amount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <form action={submitDonation} className="mt-6 space-y-4">
              <input type="hidden" name="fundId" value={fund.id} />

              <div>
                <label
                  htmlFor="donation-amount"
                  className="mb-2 block text-sm font-medium text-neutral-900"
                >
                  Donation Amount
                </label>
                <input
                  id="donation-amount"
                  name="amount"
                  type="number"
                  placeholder="Enter amount"
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="full-name"
                  className="mb-2 block text-sm font-medium text-neutral-900"
                >
                  Your Name
                </label>
                <input
                  id="full-name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone-email"
                  className="mb-2 block text-sm font-medium text-neutral-900"
                >
                  Phone / Email
                </label>
                <input
                  id="phone-email"
                  name="email"
                  type="text"
                  placeholder="Enter phone or email"
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="donation-on-behalf"
                  className="mb-2 block text-sm font-medium text-neutral-900"
                >
                  Donate on behalf of
                </label>
                <input
                  id="donation-on-behalf"
                  name="donateOnBehalf"
                  type="text"
                  placeholder="Optional"
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="payment-method"
                  className="mb-2 block text-sm font-medium text-neutral-900"
                >
                  Payment Method
                </label>
                <select
                  id="payment-method"
                  name="paymentMethod"
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select payment method
                  </option>
                  <option value="sslcommerz">SSLCommerz</option>
                  <option value="bkash">bKash</option>
                  <option value="nagad">Nagad</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-sky-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
              >
                Donate Now
              </button>
            </form>

            <p className="mt-4 text-xs leading-6 text-neutral-500">
              By continuing, you agree to our giving process and support this
              fund according to current community needs and project priorities.
            </p>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}