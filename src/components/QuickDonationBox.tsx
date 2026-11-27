"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

type QuickDonationFund = {
  id: string;
  slug?: string;
  name: string;
};

type TranslatedFundItem = {
  name: string;
};

export default function QuickDonationBox({
  funds,
}: {
  funds: QuickDonationFund[];
}) {
  const { t } = useLanguage();
  const translatedFunds = t.funds.items as Record<string, TranslatedFundItem>;
  const getFundDisplayName = (fund: QuickDonationFund) => {
    const key = fund.slug ?? fund.id;
    return translatedFunds[key]?.name ?? fund.name;
  };
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
      setStatus({ kind: "error", message: t.home.quickDonation.errorSelectFund });
      return;
    }

    if (!contact.trim()) {
      setStatus({
        kind: "error",
        message: t.home.quickDonation.errorContact,
      });
      return;
    }

    const amt = Number(amount);

    if (!Number.isFinite(amt) || amt <= 0) {
      setStatus({
        kind: "error",
        message: t.home.quickDonation.errorAmount,
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
        throw new Error(result?.error || t.home.quickDonation.errorSaveFailed);
      }

      const fundName = selectedFund
        ? getFundDisplayName(selectedFund)
        : t.home.quickDonation.defaultFundName;

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
            : t.home.quickDonation.errorGeneric,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section aria-labelledby="quick-donate-title" id="quick-donation">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#009EDB] bg-[#009EDB] p-6 shadow-[0_20px_55px_-35px_rgba(23,74,112,0.35)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2
                id="quick-donate-title"
                className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
              >
                {t.home.quickDonation.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                {t.home.quickDonation.subtitle}
              </p>
            </div>
          </div>

          {status.kind === "success" ? (
            <div
              className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
              role="status"
              aria-live="polite"
            >
              <p className="text-sm font-semibold text-[#17634B]">
                {t.home.quickDonation.successTitle}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#174A70]">
                {t.home.quickDonation.successSavedPrefix}{" "}
                <span className="font-semibold">৳ {status.amount}</span>{" "}
                {t.home.quickDonation.successSavedTo}{" "}
                <span className="font-semibold">{status.fundName}</span>.
              </p>
              <p className="mt-2 text-sm leading-6 text-[#174A70]">
                {t.home.quickDonation.successContactLabel}{" "}
                <span className="font-semibold">{status.contact}</span>
              </p>
              <p className="mt-2 text-xs leading-5 text-[#17634B]">
                {t.home.quickDonation.successNote}
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
                className="mt-8 grid items-end gap-4 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr_0.9fr_auto]"
                onSubmit={handleSubmit}
              >
                <div className="flex min-w-0 flex-col gap-2">
                  <label
                    htmlFor="donation-fund"
                    className="whitespace-nowrap text-sm font-medium text-white/90"
                  >
                    {t.home.quickDonation.fundLabel} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="donation-fund"
                    name="donationFund"
                    value={fundId}
                    onChange={(e) => setFundId(e.target.value)}
                    className="h-12 w-full rounded-lg border border-white/15 bg-white px-4 text-sm text-neutral-900 shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-[#174A70]"
                  >
                    <option value="" disabled>
                      {t.home.quickDonation.fundPlaceholder}
                    </option>
                    {funds.map((f) => (
                      <option key={f.id} value={f.id}>
                        {getFundDisplayName(f)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex min-w-0 flex-col gap-2">
                  <label
                    htmlFor="donor-contact"
                    className="whitespace-nowrap text-sm font-medium text-white/90"
                  >
                    {t.home.quickDonation.contactLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="donor-contact"
                    name="contact"
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={t.home.quickDonation.contactPlaceholder}
                    className="h-12 w-full rounded-lg border border-white/15 bg-white px-4 text-sm text-neutral-900 shadow-sm transition-shadow placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#174A70]"
                  />
                </div>

                <div className="flex min-w-0 flex-col gap-2">
                  <label
                    htmlFor="donation-amount"
                    className="whitespace-nowrap text-sm font-medium text-white/90"
                  >
                    {t.home.quickDonation.amountLabel} <span className="text-red-500">*</span>
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
                      className="h-12 w-full rounded-lg border border-white/15 bg-white pl-8 pr-4 text-sm text-neutral-900 shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-[#174A70]"
                      aria-describedby="donation-hint"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="hidden text-sm font-semibold lg:invisible lg:block">
                    {t.home.quickDonation.donateLabel}
                  </label>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex h-12 w-full items-center justify-center whitespace-nowrap rounded-full bg-[#EAF6FB] px-7 text-sm font-semibold text-[#174A70] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 lg:w-auto"
                  >
                    {submitting
                      ? t.home.quickDonation.saving
                      : t.home.quickDonation.submitButton}
                  </button>
                </div>
              </form>

              <p className="mt-4 text-center text-xs text-white/75">
                {t.home.quickDonation.taxReliefBefore}{" "}
                <a
                  href="#"
                    className="font-semibold text-white underline-offset-2 hover:underline"
                >
                  {t.home.quickDonation.taxReliefLink}
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}