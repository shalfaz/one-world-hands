"use client";

import { useState } from "react";
import { deleteFund } from "./actions";
import Swal from "sweetalert2";
import { useLanguage } from "@/context/LanguageContext";

const statusColors: Record<string, string> = {
  active: "bg-emerald-50 text-[#17634B]",
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
  onDelete: () => void | Promise<void>;
}) {
  const { t, tr } = useLanguage();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const categoryLabels = t.manage.common.categories as Record<string, string>;
  const statusLabels = t.manage.common.statuses as Record<string, string>;

  const handleDelete = async (fundId: string, fundName: string) => {
    const result = await Swal.fire({
      title: t.manage.funds.list.deleteTitle,
      text: tr("manage.funds.list.deleteConfirmText", { name: fundName }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: t.manage.common.yesDeleteIt,
      cancelButtonText: t.manage.common.cancel,
    });

    if (result.isConfirmed) {
      setDeletingId(fundId);
      try {
        const result = await deleteFund(fundId);
        if (!result.success) {
          await Swal.fire({
            icon: "error",
            title: t.manage.funds.list.deleteErrorTitle,
            text: result.error,
          });
          return;
        }
        Swal.fire({
          icon: "success",
          title: t.manage.common.deletedTitle,
          text: t.manage.funds.list.deletedText,
          timer: 1500,
        });
        await onDelete();
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire({
          icon: "error",
          title: t.manage.funds.list.deleteErrorTitle,
          text: error instanceof Error ? error.message : t.manage.common.tryAgain,
        });
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (funds.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-slate-500">
        {t.manage.funds.list.empty}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="px-3 py-3">{t.manage.funds.list.colFundName}</th>
            <th className="px-3 py-3">{t.manage.common.category}</th>
            <th className="px-3 py-3">{t.manage.funds.list.colTarget}</th>
            <th className="px-3 py-3">{t.manage.funds.list.colRaised}</th>
            <th className="px-3 py-3">{t.manage.common.status}</th>
            <th className="px-3 py-3">{t.manage.common.createdBy}</th>
            <th className="px-3 py-3">{t.manage.common.date}</th>
            <th className="px-3 py-3">{t.manage.common.actions}</th>
          </tr>
        </thead>
        <tbody>
          {funds.map((fund) => {
            const createdBy = fund.createdBy as Record<string, unknown>;
            const createdAt = new Date(String(fund.createdAt));
            const statusKey = String(fund.status || "draft");
            const statusClass = statusColors[statusKey];
            const categoryKey = String(fund.category || "");
            const categoryLabel =
              categoryLabels[categoryKey] ??
              (categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1));
            const statusLabel =
              statusLabels[statusKey] ??
              (statusKey.charAt(0).toUpperCase() + statusKey.slice(1));

            return (
              <tr
                key={String(fund._id)}
                className="border-b border-slate-100 hover:bg-slate-50"
              >
                <td className="px-3 py-3 font-medium text-slate-900">
                  {String(fund.name)}
                </td>
                <td className="px-3 py-3 text-slate-600">
                  {categoryLabel}
                </td>
                <td className="px-3 py-3 text-slate-600">
                  ৳{Number(fund.targetAmount || 0).toLocaleString()}
                </td>
                <td className="px-3 py-3 text-slate-600">
                  ৳{Number(fund.raisedAmount || 0).toLocaleString()}
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
                  >
                    {statusLabel}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <div className="text-sm">
                    <p className="font-medium text-slate-900">
                      {String(createdBy?.name || t.manage.common.unknown)}
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
                      className="whitespace-nowrap rounded-lg bg-[#EAF6FB] px-3 py-1 text-xs font-semibold text-[#174A70] transition-colors hover:bg-[#009EDB] hover:text-white"
                    >
                      {t.manage.common.edit}
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(String(fund._id), String(fund.name))
                      }
                      disabled={deletingId !== null}
                      className="whitespace-nowrap rounded-lg bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-200 disabled:opacity-50 transition-colors"
                    >
                      {deletingId === String(fund._id)
                        ? t.manage.common.deleting
                        : t.manage.common.delete}
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
