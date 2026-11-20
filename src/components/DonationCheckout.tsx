"use client";

import { useState, type FormEvent } from "react";
import type { DonationFundRecord } from "@/lib/data/donationFunds";

type DonationCheckoutProps = {
  fund: DonationFundRecord;
};

const paymentMethods = [
  { id: "bkash", label: "bKash", detail: "Mobile wallet" },
  { id: "nagad", label: "Nagad", detail: "Mobile wallet" },
  { id: "card", label: "Card", detail: "Debit or credit" },
] as const;

export default function DonationCheckout({ fund }: DonationCheckoutProps) {
  const [amount, setAmount] = useState(String(fund.suggestedAmounts[0] ?? 500));
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string>(paymentMethods[0].id);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedAmount = customAmount || amount;

  async function submitDonation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!Number.isFinite(Number(selectedAmount)) || Number(selectedAmount) <= 0) {
      setError("Enter a donation amount greater than zero.");
      return;
    }

    if (!donorName.trim()) {
      setError("Enter your full name.");
      return;
    }

    if (!email.trim() && !phone.trim()) {
      setError("Add an email address or phone number so we can contact you.");
      return;
    }

    if (!paymentMethods.some((method) => method.id === paymentMethod)) {
      setError("Choose a payment method.");
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch("/api/quick-donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fundId: fund.id,
          amount: Number(selectedAmount),
          donorName: donorName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          contact: phone.trim() || email.trim(),
          paymentMethod,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || "Unable to submit donation details.");
      setSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      aria-labelledby="donation-form-title"
      className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-[0_8px_30px_rgba(23,74,112,0.1)]"
    >
      <div className="bg-[#009EDB] px-5 py-5 text-white sm:px-7 sm:py-6">
        <div>
          <p className="text-xs font-bold uppercase text-white/75">
            {submitted ? "Thank you" : "Make an impact"}
          </p>
          <h2 id="donation-form-title" className="mt-1 text-xl font-bold leading-snug sm:text-2xl">
            {submitted ? "Donation details received" : "Make a difference today"}
          </h2>
          <p className="mt-2 max-w-md text-sm leading-5 text-white/90">
            {submitted ? fund.name : `Support ${fund.name} and help strengthen its work.`}
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-7">
      {submitted ? (
        <div role="status" aria-live="polite">
          <p className="text-base leading-7 text-neutral-800">
            Your ৳{Number(selectedAmount).toLocaleString()} donation details for {fund.name} were submitted.
          </p>
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            Online payment processing is not enabled yet, so no payment was taken.
          </p>
        </div>
      ) : (
        <form onSubmit={submitDonation}>
          <fieldset>
            <legend className="text-sm font-semibold text-neutral-800">Select an amount</legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {fund.suggestedAmounts.map((suggestedAmount) => (
                <button
                  key={suggestedAmount}
                  type="button"
                  aria-pressed={!customAmount && amount === String(suggestedAmount)}
                  onClick={() => {
                    setAmount(String(suggestedAmount));
                    setCustomAmount("");
                  }}
                  className={`h-11 rounded-md border text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2 ${
                    !customAmount && amount === String(suggestedAmount)
                      ? "border-[#009EDB] bg-[#EAF6FB] text-[#174A70]"
                      : "border-neutral-300 bg-white text-neutral-800 hover:border-[#009EDB]"
                  }`}
                >
                  ৳{suggestedAmount.toLocaleString()}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="mt-4 block text-sm font-semibold text-neutral-800" htmlFor="custom-amount">
            Or enter another amount
          </label>
          <div className="mt-2 flex h-11 items-center rounded-md border border-neutral-300 focus-within:ring-2 focus-within:ring-[#009EDB]">
            <span className="pl-3 text-sm font-semibold text-neutral-500">৳</span>
            <input
              id="custom-amount"
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              value={customAmount}
              onChange={(event) => setCustomAmount(event.target.value)}
              placeholder="Enter amount"
              className="h-full min-w-0 flex-1 rounded-md bg-transparent px-2 text-sm text-neutral-950 outline-none"
            />
          </div>

          <div className="mt-6 border-t border-neutral-200 pt-5">
            <h3 className="text-sm font-semibold text-neutral-800">Your information</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-medium text-neutral-700 sm:col-span-2" htmlFor="donor-name">
                Full name
                <input
                  id="donor-name"
                  autoComplete="name"
                  required
                  value={donorName}
                  onChange={(event) => setDonorName(event.target.value)}
                  className="mt-1.5 h-11 w-full rounded-md border border-neutral-300 px-3 text-sm text-neutral-950 outline-none focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
                />
              </label>
              <label className="text-sm font-medium text-neutral-700" htmlFor="donor-email">
                Email
                <input
                  id="donor-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-1.5 h-11 w-full rounded-md border border-neutral-300 px-3 text-sm text-neutral-950 outline-none focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
                />
              </label>
              <label className="text-sm font-medium text-neutral-700" htmlFor="donor-phone">
                Phone
                <input
                  id="donor-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="mt-1.5 h-11 w-full rounded-md border border-neutral-300 px-3 text-sm text-neutral-950 outline-none focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
                />
              </label>
            </div>
          </div>

          <fieldset className="mt-6 border-t border-neutral-200 pt-5">
            <legend className="text-sm font-semibold text-neutral-800">Choose a payment method</legend>
            <div className="mt-3 grid gap-2">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-md border px-3 transition-colors ${
                    paymentMethod === method.id ? "border-[#009EDB] bg-[#EAF6FB]" : "border-neutral-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                    className="h-4 w-4 accent-[#009EDB]"
                  />
                  <span className="flex flex-1 items-center justify-between gap-3">
                    <span className="text-sm font-bold text-neutral-900">{method.label}</span>
                    <span className="text-xs text-neutral-500">{method.detail}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <p className="mt-4 text-xs leading-5 text-neutral-500">
            Payment processing is not enabled. Submitting records a pending donation request; no payment will be taken.
          </p>
          {error && <p className="mt-4 text-sm font-medium text-red-700" role="alert">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-[#009EDB] px-5 text-sm font-bold text-white transition-colors hover:bg-[#0088be] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
          >
            {submitting ? "Submitting..." : "Donate"}
          </button>
        </form>
      )}
      </div>
    </section>
  );
}