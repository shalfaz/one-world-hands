import Link from "next/link";
import PageShell from "@/components/PageShell";
import HomeDonationFundsSection from "@/components/HomeDonationFundsSection";

export const metadata = {
  title: "Updates | One World Hands",
  description:
    "Stay up to date with One World Hands notices, campaigns, and transparent program learning.",
};

function formatDate(dateISO: string) {
  const date = new Date(dateISO + "T00:00:00Z");
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

export default function UpdatesPage() {
  const sections: object[] = [];

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-4xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Updates
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
            Notices, campaign progress, and announcements shared transparently
            with our community.
          </p>
        </section>

        <div className="mt-10 space-y-12">
          {/* Updates will be loaded from MongoDB */}
        </div>
      </div>

      <HomeDonationFundsSection />
    </PageShell>
  );
}