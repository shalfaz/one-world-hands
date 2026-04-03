"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type QuickDonationFund = {
  id: string;
  name: string;
};

export default function QuickDonationBox({
  funds,
}: {
  funds: QuickDonationFund[];
}) {
  const [fundId, setFundId] = useState("");
  const [contact, setContact] = useState<string>("");
  const [amount, setAmount] = useState<string>("50");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "success"; fundName: string; amount: number; contact: string }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  const selectedFund = useMemo(
    () => funds.find((f) => f.id === fundId),
    [fundId, funds]
  );

  const searchParams = useSearchParams();

  useEffect(() => {
    const fundParam = searchParams.get("fund");
    if (fundParam && funds.some((f) => f.id === fundParam)) {
      setFundId(fundParam);
    }

    const amountParam = searchParams.get("amount");
    if (amountParam) {
      const nextAmt = Number(amountParam);
      if (Number.isFinite(nextAmt) && nextAmt > 0) {
        setAmount(String(nextAmt));
      }
    }
  }, [searchParams, funds]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!fundId) {
      setStatus({ kind: "error", message: "Please select a donation fund." });
      return;
    }

    if (!contact.trim()) {
      setStatus({
        kind: "error",
        message: "Please enter your phone number or email.",
      });
      return;
    }

    const amt = Number(amount);

    if (!Number.isFinite(amt) || amt <= 0) {
      setStatus({
        kind: "error",
        message: "Please enter a valid donation amount.",
      });
      return;
    }

    try {
      setSubmitting(true);
      setStatus({ kind: "idle" });

      const response = await fetch("/api/quick-donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fundId,
          contact: contact.trim(),
          amount: amt,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Failed to save donation.");
      }

      const fundName = selectedFund?.name ?? "Donation Fund";

      setStatus({
        kind: "success",
        fundName,
        amount: amt,
        contact: contact.trim(),
      });

      setContact("");
      setAmount("50");
      setFundId("");
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section aria-labelledby="quick-donate-title" id="quick-donation">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2
                id="quick-donate-title"
                className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl"
              >
                Make Your Donation
              </h2>
              <p className="mt-2 max-w-xl text-base leading-7 text-neutral-700">
                Choose a donation fund and share support in seconds.
              </p>
            </div>
          </div>

          {status.kind === "success" ? (
            <div
              className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6"
              role="status"
              aria-live="polite"
            >
              <p className="text-sm font-semibold text-green-900">
                Thank you for your support.
              </p>
              <p className="mt-2 text-sm leading-6 text-green-800">
                Donation saved:{" "}
                <span className="font-semibold">৳ {status.amount}</span> to{" "}
                <span className="font-semibold">{status.fundName}</span>.
              </p>
              <p className="mt-2 text-sm leading-6 text-green-800">
                Contact: <span className="font-semibold">{status.contact}</span>
              </p>
              <p className="mt-2 text-xs leading-5 text-green-700">
                Your donation request has been recorded in the system with
                pending status.
              </p>
            </div>
          ) : (
            <>
              {status.kind === "error" && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {status.message}
                </div>
              )}

              <form
                className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-[1.1fr_1fr_0.9fr_0.9fr]"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="donation-fund"
                    className="text-sm font-semibold text-neutral-900"
                  >
                    Donation Fund <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="donation-fund"
                    name="donationFund"
                    value={fundId}
                    onChange={(e) => setFundId(e.target.value)}
                    className="h-11 rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="" disabled>
                      Select a fund
                    </option>
                    {funds.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="donor-contact"
                    className="text-sm font-semibold text-neutral-900"
                  >
                    Phone / Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="donor-contact"
                    name="contact"
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Type mobile/email"
                    className="h-11 w-full rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 shadow-sm transition-shadow placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="donation-amount"
                    className="text-sm font-semibold text-neutral-900"
                  >
                    Donation Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-neutral-500">
                      ৳
                    </span>
                    <input
                      id="donation-amount"
                      inputMode="numeric"
                      name="amount"
                      type="number"
                      min={1}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="h-11 w-full rounded-2xl border border-neutral-200 bg-white pl-8 pr-4 text-sm text-neutral-900 shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-sky-500"
                      aria-describedby="donation-hint"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="invisible text-sm font-semibold">
                    Donate
                  </label>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-sky-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                  >
                    {submitting ? "Saving..." : "Donate Now"}
                  </button>
                </div>
              </form>

              <p className="mt-4 text-center text-sm text-neutral-700">
                You will receive tax relief when you donate.{" "}
                <a
                  href="#"
                  className="font-semibold text-sky-600 hover:underline"
                >
                  Click here to learn more
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}