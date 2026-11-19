"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { updateDonationStatus } from "./actions";

type Donation = {
  _id: string;
  donorName: string;
  email: string;
  contact: string;
  fundName: string;
  amount: number;
  paymentMethod: string;
  status: "pending" | "completed" | "failed" | "refunded";
  createdAt: string;
};

const donationStatuses: Donation["status"][] = [
  "pending",
  "completed",
  "failed",
  "refunded",
];

export default function DonationList({
  donations,
}: {
  donations: Donation[];
}) {
  const [rows, setRows] = useState(donations);
  const [savingId, setSavingId] = useState<string | null>(null);

  const handleStatusChange = async (donationId: string, status: Donation["status"]) => {
    const previousStatus = rows.find((row) => row._id === donationId)?.status;
    if (!previousStatus || status === previousStatus || savingId) return;

    setSavingId(donationId);
    try {
      const result = await updateDonationStatus(donationId, status);
      if (!result.success) throw new Error(result.error);

      setRows((currentRows) =>
        currentRows.map((row) =>
          row._id === donationId ? { ...row, status } : row
        )
      );
      await Swal.fire({
        icon: "success",
        title: "Donation updated",
        text: `Status changed to ${status}.`,
        timer: 1600,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Donation status update error:", error);
      await Swal.fire({
        icon: "error",
        title: "Could not update donation",
        text: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setSavingId(null);
    }
  };

  if (!rows.length) {
    return <p className="py-8 text-center text-slate-500">No donations found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="px-3 py-3">ID</th>
            <th className="px-3 py-3">Name</th>
            <th className="px-3 py-3">Email / Contact</th>
            <th className="px-3 py-3">Fund</th>
            <th className="px-3 py-3">Amount</th>
            <th className="px-3 py-3">Payment</th>
            <th className="px-3 py-3">Status</th>
            <th className="px-3 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((donation) => (
            <tr key={donation._id} className="border-b border-slate-100">
              <td className="px-3 py-3 font-mono text-xs text-slate-500">
                {donation._id.slice(-8)}
              </td>
              <td className="px-3 py-3 font-medium text-slate-900">
                {donation.donorName}
              </td>
              <td className="px-3 py-3 text-slate-600">
                {donation.email || donation.contact || "-"}
              </td>
              <td className="px-3 py-3 text-slate-600">{donation.fundName}</td>
              <td className="px-3 py-3 font-semibold text-slate-900">
                ৳ {donation.amount.toLocaleString()}
              </td>
              <td className="px-3 py-3 capitalize text-slate-600">
                {donation.paymentMethod}
              </td>
              <td className="px-3 py-3">
                <select
                  aria-label={`Status for donation ${donation._id}`}
                  value={donation.status}
                  disabled={savingId !== null}
                  onChange={(event) =>
                    void handleStatusChange(
                      donation._id,
                      event.target.value as Donation["status"]
                    )
                  }
                  className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold capitalize text-slate-700 disabled:opacity-60"
                >
                  {donationStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {savingId === donation._id && (
                  <span className="ml-2 text-xs text-slate-500">Saving…</span>
                )}
              </td>
              <td className="px-3 py-3 text-slate-500">
                {new Date(donation.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
