"use client";

import { useState } from "react";
import { createFund, updateFund } from "./actions";
import Swal from "sweetalert2";

export default function FundForm({
  fund,
  onSuccess,
}: {
  fund?: Record<string, unknown> | null;
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      if (fund) {
        formData.append("fundId", String(fund._id || ""));
        await updateFund(formData);
      } else {
        await createFund(formData);
      }

      Swal.fire({
        icon: "success",
        title: fund ? "Fund Updated!" : "Fund Created!",
        text: fund ? "Fund updated successfully" : "New fund created successfully",
        timer: 2000,
      });

      onSuccess?.();
    } catch (error) {
      console.error("Form error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <input
          name="name"
          type="text"
          placeholder="Fund name"
          defaultValue={String(fund?.name || "")}
          maxLength={100}
          className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-sky-600"
          required
        />

        <select
          name="category"
          defaultValue={String(fund?.category || "")}
          className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-sky-600"
          required
          aria-label="Fund category"
        >
          <option value="">Select Category</option>
          <option value="education">Education</option>
          <option value="health">Health</option>
          <option value="emergency">Emergency</option>
          <option value="community">Community</option>
          <option value="livelihood">Livelihood</option>
          <option value="other">Other</option>
        </select>

        <input
          name="targetAmount"
          type="number"
          placeholder="Target amount (BDT)"
          defaultValue={Number(fund?.targetAmount || 0)}
          min="0"
          className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-sky-600"
        />

        <select
          name="status"
          defaultValue={String(fund?.status || "draft")}
          className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-sky-600"
          aria-label="Fund status"
        >
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
        </select>

        <div className="md:col-span-2 xl:col-span-4">
          <textarea
            name="description"
            placeholder="Description"
            defaultValue={String(fund?.description || "")}
            rows={2}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-600"
          />
        </div>

        <div className="md:col-span-2 xl:col-span-4">
          <textarea
            name="impactSummary"
            placeholder="Impact summary"
            defaultValue={String(fund?.impactSummary || "")}
            rows={2}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-600"
          />
        </div>

        <div className="md:col-span-2 xl:col-span-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : fund
                ? "Update Fund"
                : "+ Add New Fund"}
          </button>
        </div>
      </div>
    </form>
  );
}
