"use client";

import { deleteProgram } from "./actions";
import Swal from "sweetalert2";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface Program {
  _id: string;
  title: string;
  description?: string;
  category: string;
  location: string;
  status: string;
  createdBy: {
    name: string;
    email: string;
  };
  createdAt: string;
}

export default function ProgramList({
  programs,
  onEdit,
  onDelete,
}: {
  programs: Program[];
  onEdit: (program: Program) => void;
  onDelete: () => void | Promise<void>;
}) {
  const { t, tr } = useLanguage();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const categoryLabels = t.manage.common.categories as Record<string, string>;
  const statusLabels = t.manage.common.statuses as Record<string, string>;

  const handleDelete = async (programId: string, title: string) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: t.manage.programs.list.deleteTitle,
      text: tr("manage.programs.list.deleteConfirmText", { title }),
      showCancelButton: true,
      confirmButtonText: t.manage.common.delete,
      cancelButtonText: t.manage.common.cancel,
      confirmButtonColor: "#dc2626",
    });

    if (!confirm.isConfirmed) return;

    setDeletingId(programId);
    try {
      const result = await deleteProgram(programId);
      if (!result.success) {
        await Swal.fire({
          icon: "error",
          title: t.manage.programs.list.deleteErrorTitle,
          text: result.error,
          confirmButtonColor: "#009EDB",
        });
        return;
      }

      await onDelete();

      Swal.fire({
        icon: "success",
        title: t.manage.common.deletedTitleNoBang,
        text: t.manage.programs.list.deletedText,
        confirmButtonColor: "#009EDB",
      });
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        icon: "error",
        title: t.manage.programs.list.deleteErrorTitle,
        text: error instanceof Error ? error.message : t.manage.common.tryAgain,
        confirmButtonColor: "#009EDB",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-emerald-50 text-[#17634B]",
      draft: "bg-yellow-100 text-yellow-700",
      inactive: "bg-gray-100 text-gray-700",
    };
    return styles[status] || styles.draft;
  };

  if (programs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500">{t.manage.programs.list.empty}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-600 font-semibold">
            <th className="px-4 py-3">{t.manage.common.title}</th>
            <th className="px-4 py-3">{t.manage.common.category}</th>
            <th className="px-4 py-3">{t.manage.programs.list.colLocation}</th>
            <th className="px-4 py-3">{t.manage.common.status}</th>
            <th className="px-4 py-3">{t.manage.common.createdBy}</th>
            <th className="px-4 py-3">{t.manage.common.date}</th>
            <th className="px-4 py-3">{t.manage.common.actions}</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program) => (
            <tr key={program._id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 font-medium text-slate-900">{program.title}</td>
              <td className="px-4 py-3">
                <span>{categoryLabels[program.category] ?? program.category}</span>
              </td>
              <td className="px-4 py-3 text-slate-600">{program.location}</td>
              <td className="px-4 py-3">
                <span className={`inline-block whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(program.status)}`}>
                  {statusLabels[program.status] ?? program.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="text-xs">
                  <p className="font-medium text-slate-900">{program.createdBy.name}</p>
                  <p className="text-slate-500">{program.createdBy.email}</p>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-600 text-xs">
                {new Date(program.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(program)}
                    className="whitespace-nowrap rounded-lg bg-[#EAF6FB] px-3 py-1 text-xs font-medium text-[#174A70] transition-colors hover:bg-[#009EDB] hover:text-white"
                  >
                    {t.manage.common.edit}
                  </button>
                  <button
                    onClick={() => handleDelete(program._id, program.title)}
                    disabled={deletingId !== null}
                    className="whitespace-nowrap px-3 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-50 transition-colors text-xs font-medium"
                  >
                    {deletingId === program._id ? t.manage.common.deleting : t.manage.common.delete}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
