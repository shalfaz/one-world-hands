"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { useEffect, useState } from "react";

type Fund = {
  _id: string;
  name: string;
  description: string;
  category: string;
  impactSummary: string;
  targetAmount: number;
  raisedAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export default function FundDetailPage() {
  const params = useParams();
  const fundId = params?.id as string;
  const [fund, setFund] = useState<Fund | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!fundId) return;

    const fetchFund = async () => {
      try {
        const response = await fetch(`/api/funds/${fundId}`);
        if (!response.ok) throw new Error("Fund not found");
        const data = await response.json();
        setFund(data);
      } catch (error) {
        console.error("Error fetching fund:", error);
        setFund(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFund();
  }, [fundId]);

  if (loading) {
    return (
      <PageShell>
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <p className="text-neutral-600">Loading fund details...</p>
        </div>
      </PageShell>
    );
  }

  if (!fund) {
    return (
      <PageShell>
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <h1 className="text-2xl font-semibold text-neutral-900">Fund not found</h1>
          <p className="mt-2 text-neutral-600">
            This fund could not be found or is not available.
          </p>
          <Link
            href="/donation-funds"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700"
          >
            Back to Donation Funds
          </Link>
        </div>
      </PageShell>
    );
  }

  const progressPercent = fund.targetAmount > 0 
    ? Math.round((fund.raisedAmount / fund.targetAmount) * 100)
    : 0;

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      education: "bg-blue-50 text-blue-700 ring-blue-200",
      health: "bg-red-50 text-red-700 ring-red-200",
      emergency: "bg-orange-50 text-orange-700 ring-orange-200",
      community: "bg-emerald-50 text-emerald-700 ring-emerald-200",
      livelihood: "bg-purple-50 text-purple-700 ring-purple-200",
      other: "bg-neutral-50 text-neutral-700 ring-neutral-200",
    };
    return colors[category] || colors.other;
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/donation-funds"
          className="inline-flex items-center text-sm font-semibold text-sky-600 hover:text-sky-700"
        >
          ← Back to Donation Funds
        </Link>

        <section className="mt-8 rounded-4xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getCategoryColor(fund.category)}`}
              >
                {fund.category.charAt(0).toUpperCase() + fund.category.slice(1)}
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                {fund.name}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
                {fund.description}
              </p>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-neutral-600">Progress</p>
                <p className="mt-2 text-3xl font-semibold text-neutral-900">
                  {progressPercent}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-neutral-600">Raised Amount</p>
                <p className="mt-1 text-2xl font-semibold text-green-600">
                  ${fund.raisedAmount.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-sky-600 transition-all"
                style={{ width: `${Math.min(progressPercent, 100)}%` } as React.CSSProperties}
              />
            </div>

            <div className="mt-4 flex justify-between text-sm text-neutral-600">
              <span>Target: ${fund.targetAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Impact Summary */}
          {fund.impactSummary && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-neutral-900">Impact Summary</h2>
              <p className="mt-3 text-base leading-7 text-neutral-700">
                {fund.impactSummary}
              </p>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#quick-donation"
              className="inline-flex h-11 items-center justify-center rounded-full bg-sky-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700"
            >
              Donate to This Fund
            </Link>
            <Link
              href="/programs"
              className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50"
            >
              See Related Programs
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
