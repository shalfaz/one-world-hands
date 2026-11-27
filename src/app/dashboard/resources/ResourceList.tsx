"use client";

import { useState } from "react";
import { deleteResource } from "./actions";
import Swal from "sweetalert2";
import { useLanguage } from "@/context/LanguageContext";

const statusColors: Record<string, string> = {
  draft: "bg-yellow-100 text-yellow-800",
  published: "bg-emerald-50 text-[#17634B]",
};

export default function ResourceList({
  resources,
  onEdit,
  onDelete,
}: {
  resources: Record<string, unknown>[];
  onEdit: (resource: Record<string, unknown>) => void;
  onDelete: () => void | Promise<void>;
}) {
  const { t, tr } = useLanguage();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const typeLabels = t.manage.resources.typeShort as Record<string, string>;
  const statusLabels = t.manage.common.statuses as Record<string, string>;

  const handleDelete = async (
    resourceId: string,
    resourceTitle: string
  ) => {
    const result = await Swal.fire({
      title: t.manage.resources.list.deleteTitle,
      text: tr("manage.resources.list.deleteConfirmText", { title: resourceTitle }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: t.manage.common.yesDeleteIt,
      cancelButtonText: t.manage.common.cancel,
    });

    if (result.isConfirmed) {
      setDeletingId(resourceId);
      try {
        const result = await deleteResource(resourceId);
        if (!result.success) {
          await Swal.fire({
            icon: "error",
            title: t.manage.resources.list.deleteErrorTitle,
            text: result.error,
          });
          return;
        }
        Swal.fire({
          icon: "success",
          title: t.manage.common.deletedTitle,
          text: t.manage.resources.list.deletedText,
          timer: 1500,
        });
        await onDelete();
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire({
          icon: "error",
          title: t.manage.resources.list.deleteErrorTitle,
          text: error instanceof Error ? error.message : t.manage.common.tryAgain,
        });
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (resources.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-slate-500">
        {t.manage.resources.list.empty}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="px-3 py-3">{t.manage.common.title}</th>
            <th className="px-3 py-3">{t.manage.resources.list.colType}</th>
            <th className="px-3 py-3">{t.manage.resources.list.colContentType}</th>
            <th className="px-3 py-3">{t.manage.common.status}</th>
            <th className="px-3 py-3">{t.manage.common.createdBy}</th>
            <th className="px-3 py-3">{t.manage.common.date}</th>
            <th className="px-3 py-3">{t.manage.common.actions}</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => {
            const createdBy = resource.createdBy as Record<string, unknown>;
            const createdAt = new Date(String(resource.createdAt));
            const statusKey = String(resource.status || "draft");
            const statusClass = statusColors[statusKey];
            const typeKey = String(resource.type || "");
            const typeLabel =
              typeLabels[typeKey] ??
              (typeKey.charAt(0).toUpperCase() + typeKey.slice(1));
            const statusLabel =
              statusLabels[statusKey] ??
              (statusKey.charAt(0).toUpperCase() + statusKey.slice(1));

            let contentType = "";
            if (resource.type === "document" && resource.fileUrl) {
              contentType = `${String(resource.fileType || "file").toUpperCase()}`;
            } else if (resource.type === "webinar" && resource.youtubeLink) {
              contentType = "YouTube";
            } else if (resource.type === "blog") {
              contentType = t.manage.resources.list.contentText;
            } else {
              contentType = String(resource.type).toUpperCase();
            }

            return (
              <tr
                key={String(resource._id)}
                className="border-b border-slate-100 hover:bg-slate-50"
              >
                <td className="px-3 py-3 font-medium text-slate-900">
                  {String(resource.title)}
                </td>
                <td className="px-3 py-3 text-slate-600">
                  {typeLabel}
                </td>
                <td className="px-3 py-3 text-xs text-slate-600">
                  {contentType}
                  {!!resource.fileUrl && (
                    <>
                      {" "}
                      <a
                        href={String(resource.fileUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-[#009EDB] hover:underline"
                      >
                        {t.manage.resources.list.viewLink}
                      </a>
                    </>
                  )}
                  {!!resource.youtubeLink && (
                    <>
                      {" "}
                      <a
                        href={String(resource.youtubeLink)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-[#009EDB] hover:underline"
                      >
                        {t.manage.resources.list.watchLink}
                      </a>
                    </>
                  )}
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
                      onClick={() => onEdit(resource)}
                      className="whitespace-nowrap rounded-lg bg-[#EAF6FB] px-3 py-1 text-xs font-semibold text-[#174A70] transition-colors hover:bg-[#009EDB] hover:text-white"
                    >
                      {t.manage.common.edit}
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(
                          String(resource._id),
                          String(resource.title)
                        )
                      }
                      disabled={deletingId !== null}
                      className="whitespace-nowrap rounded-lg bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-200 disabled:opacity-50 transition-colors"
                    >
                      {deletingId === String(resource._id)
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
