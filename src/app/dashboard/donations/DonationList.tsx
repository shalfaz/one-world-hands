"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { updateDonationStatus } from "./actions";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t, tr } = useLanguage();

  const statusLabels: Record<string, string> = {
    pending: t.dashboard.status.pending,
    completed: t.dashboard.status.completed,
    failed: t.dashboard.status.failed,
    refunded: t.dashboard.status.refunded,
  };

  const paymentMethodLabels: Record<string, string> = {
    bkash: t.dashboard.donations.paymentMethods.bkash,
    nagad: t.dashboard.donations.paymentMethods.nagad,
    card: t.dashboard.donations.paymentMethods.card,
    bank: t.dashboard.donations.paymentMethods.bank,
    cash: t.dashboard.donations.paymentMethods.cash,
    rocket: t.dashboard.donations.paymentMethods.rocket,
  };

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
        title: t.dashboard.donations.alerts.updatedTitle,
        text: tr("dashboard.donations.alerts.updatedText", {
          status: statusLabels[status] ?? status,
        }),
        timer: 1600,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Donation status update error:", error);
      await Swal.fire({
        icon: "error",
        title: t.dashboard.donations.alerts.updateErrorTitle,
        text: error instanceof Error ? error.message : t.dashboard.common.tryAgain,
      });
    } finally {
      setSavingId(null);
    }
  };

  if (!rows.length) {
    return <p className="py-8 text-center text-slate-500">{t.dashboard.donations.empty}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="px-3 py-3">{t.dashboard.donations.columns.id}</th>
            <th className="px-3 py-3">{t.dashboard.donations.columns.name}</th>
            <th className="px-3 py-3">{t.dashboard.donations.columns.emailContact}</th>
            <th className="px-3 py-3">{t.dashboard.donations.columns.fund}</th>
            <th className="px-3 py-3">{t.dashboard.donations.columns.amount}</th>
            <th className="px-3 py-3">{t.dashboard.donations.columns.payment}</th>
            <th className="px-3 py-3">{t.dashboard.donations.columns.status}</th>
            <th className="px-3 py-3">{t.dashboard.donations.columns.date}</th>
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
              <td className="px-3 py-3 text-slate-600">{donation.fundName || t.dashboard.donations.generalFund}</td>
              <td className="px-3 py-3 font-semibold text-slate-900">
                ৳ {donation.amount.toLocaleString()}
              </td>
              <td className="px-3 py-3 capitalize text-slate-600">
                {paymentMethodLabels[donation.paymentMethod.toLowerCase()] ?? donation.paymentMethod}
              </td>
              <td className="px-3 py-3">
                <select
                  aria-label={tr("dashboard.donations.statusAriaLabel", { id: donation._id })}
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
                      {statusLabels[status] ?? status}
                    </option>
                  ))}
                </select>
                {savingId === donation._id && (
                  <span className="ml-2 text-xs text-slate-500">{t.dashboard.donations.saving}</span>
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
