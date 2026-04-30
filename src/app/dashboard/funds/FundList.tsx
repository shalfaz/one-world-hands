"use client";

import { useState } from "react";
import { deleteFund } from "./actions";
import Swal from "sweetalert2";

const categoryIcons: Record<string, string> = {
  education: "📚",
  health: "🏥",
  emergency: "🆘",
  community: "👥",
  livelihood: "💼",
  other: "📌",
};

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  draft: "bg-yellow-100 text-yellow-800",
  completed: "bg-gray-100 text-gray-800",
  paused: "bg-orange-100 text-orange-800",
};

export default function FundList({
  funds,
  onEdit,
  onDelete,
}: {
  funds: Record<string, unknown>[];
  onEdit: (fund: Record<string, unknown>) => void;
  onDelete: () => void;
}) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (fundId: string, fundName: string) => {
    const result = await Swal.fire({
      title: "Delete Fund?",
      text: `Are you sure you want to delete "${fundName}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setDeletingId(fundId);
      try {
        await deleteFund(fundId);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Fund deleted successfully",
          timer: 1500,
        });
        onDelete();
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete fund",
        });
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (funds.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-slate-500">
        No funds found. Create your first fund!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="px-3 py-3">Fund Name</th>
            <th className="px-3 py-3">Category</th>
            <th className="px-3 py-3">Target</th>
            <th className="px-3 py-3">Raised</th>
            <th className="px-3 py-3">Status</th>
            <th className="px-3 py-3">Created By</th>
            <th className="px-3 py-3">Date</th>
            <th className="px-3 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {funds.map((fund) => {
            const createdBy = fund.createdBy as Record<string, unknown>;
            const createdAt = new Date(String(fund.createdAt));
            const icon = categoryIcons[String(fund.category) || "other"] || "📌";
            const statusClass = statusColors[String(fund.status) || "draft"];

            return (
              <tr
                key={String(fund._id)}
                className="border-b border-slate-100 hover:bg-slate-50"
              >
                <td className="px-3 py-3 font-medium text-slate-900">
                  {icon} {String(fund.name)}
                </td>
                <td className="px-3 py-3 text-slate-600">
                  {String(fund.category).charAt(0).toUpperCase() +
                    String(fund.category).slice(1)}
                </td>
                <td className="px-3 py-3 text-slate-600">
                  ৳{Number(fund.targetAmount || 0).toLocaleString()}
                </td>
                <td className="px-3 py-3 text-slate-600">
                  ৳{Number(fund.raisedAmount || 0).toLocaleString()}
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
                  >
                    {String(fund.status).charAt(0).toUpperCase() +
                      String(fund.status).slice(1)}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <div className="text-sm">
                    <p className="font-medium text-slate-900">
                      {String(createdBy?.name || "Unknown")}
                    </p>
                    <p className="text-xs text-slate-500">
                      {String(createdBy?.email || "unknown@example.com")}
                    </p>
                  </div>
                </td>
                <td className="px-3 py-3 text-xs text-slate-600">
                  {createdAt.toLocaleDateString()} <br />
                  {createdAt.toLocaleTimeString()}
                </td>
                <td className="px-3 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(fund)}
                      className="rounded-lg bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-200 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(String(fund._id), String(fund.name))
                      }
                      disabled={deletingId === String(fund._id)}
                      className="rounded-lg bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-200 disabled:opacity-50 transition-colors"
                    >
                      {deletingId === String(fund._id)
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
