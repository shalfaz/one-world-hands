import Link from "next/link";
import PageShell from "@/components/PageShell";
import HomeDonationFundsSection from "@/components/HomeDonationFundsSection";
import { FaArrowRight, FaBullhorn } from "react-icons/fa6";

export const metadata = {
  title: "Updates | One World Hands",
  description:
    "Stay up to date with One World Hands notices, campaigns, and transparent program learning.",
};

export default function UpdatesPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-[#D9E2EC] bg-white p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">
            News and progress
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#174A70] sm:text-4xl">
            Updates
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#475569]">
            Notices, campaign progress, and announcements shared transparently
            with our community.
          </p>
        </section>

        <div className="mt-8 rounded-2xl border border-dashed border-[#D9E2EC] bg-white px-6 py-14 text-center sm:px-10">
          <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF6FB] text-[#009EDB]">
            <FaBullhorn aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-lg font-semibold text-[#174A70]">
            No updates to share just yet
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#627D98]">
            We’ll share campaign progress and announcements here as they become
            available. In the meantime, explore our programs and resources.
          </p>
          <Link
            href="/programs"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#174A70] hover:text-[#009EDB]"
          >
            Explore programs <FaArrowRight aria-hidden="true" className="text-xs" />
          </Link>
        </div>
      </div>

      <HomeDonationFundsSection />
    </PageShell>
  );
}