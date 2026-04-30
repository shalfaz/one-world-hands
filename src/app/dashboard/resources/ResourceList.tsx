"use client";

import { useState } from "react";
import { deleteResource } from "./actions";
import Swal from "sweetalert2";

const typeIcons: Record<string, string> = {
  photo: "📷",
  document: "📄",
  blog: "📝",
  report: "📊",
  webinar: "🎥",
};

const statusColors: Record<string, string> = {
  draft: "bg-yellow-100 text-yellow-800",
  published: "bg-green-100 text-green-800",
};

export default function ResourceList({
  resources,
  onEdit,
  onDelete,
}: {
  resources: Record<string, unknown>[];
  onEdit: (resource: Record<string, unknown>) => void;
  onDelete: () => void;
}) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (
    resourceId: string,
    resourceTitle: string
  ) => {
    const result = await Swal.fire({
      title: "Delete Resource?",
      text: `Are you sure you want to delete "${resourceTitle}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setDeletingId(resourceId);
      try {
        await deleteResource(resourceId);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Resource deleted successfully",
          timer: 1500,
        });
        onDelete();
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete resource",
        });
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (resources.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-slate-500">
        No resources found. Create your first resource!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="px-3 py-3">Title</th>
            <th className="px-3 py-3">Type</th>
            <th className="px-3 py-3">Content Type</th>
            <th className="px-3 py-3">Status</th>
            <th className="px-3 py-3">Created By</th>
            <th className="px-3 py-3">Date</th>
            <th className="px-3 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => {
            const createdBy = resource.createdBy as Record<string, unknown>;
            const createdAt = new Date(String(resource.createdAt));
            const icon = typeIcons[String(resource.type) || "photo"] || "📌";
            const statusClass = statusColors[String(resource.status) || "draft"];

            let contentType = "";
            if (resource.type === "document" && resource.fileUrl) {
              contentType = `${String(resource.fileType || "file").toUpperCase()}`;
            } else if (resource.type === "webinar" && resource.youtubeLink) {
              contentType = "YouTube";
            } else if (resource.type === "blog") {
              contentType = "Text";
            } else {
              contentType = String(resource.type).toUpperCase();
            }

            return (
              <tr
                key={String(resource._id)}
                className="border-b border-slate-100 hover:bg-slate-50"
              >
                <td className="px-3 py-3 font-medium text-slate-900">
                  {icon} {String(resource.title)}
                </td>
                <td className="px-3 py-3 text-slate-600">
                  {String(resource.type)
                    .charAt(0)
                    .toUpperCase() + String(resource.type).slice(1)}
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
                        className="ml-2 text-sky-600 hover:underline"
                      >
                        (View)
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
                        className="ml-2 text-sky-600 hover:underline"
                      >
                        (Watch)
                      </a>
                    </>
                  )}
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
                  >
                    {String(resource.status)
                      .charAt(0)
                      .toUpperCase() + String(resource.status).slice(1)}
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
                      onClick={() => onEdit(resource)}
                      className="rounded-lg bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-200 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(
                          String(resource._id),
                          String(resource.title)
                        )
                      }
                      disabled={deletingId === String(resource._id)}
                      className="rounded-lg bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-200 disabled:opacity-50 transition-colors"
                    >
                      {deletingId === String(resource._id)
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
