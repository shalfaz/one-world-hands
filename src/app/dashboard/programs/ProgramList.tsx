"use client";

import { deleteProgram } from "./actions";
import Swal from "sweetalert2";
import { useState } from "react";

interface Program {
  _id: string;
  title: string;
  description?: string;
  category: string;
  location: string;
  status: "active" | "draft" | "inactive";
  createdBy: {
    name: string;
    email: string;
  };
  createdAt: string;
}

export default function ProgramList({ programs }: { programs: Program[] }) {
  const [localPrograms, setLocalPrograms] = useState(programs);

  const handleDelete = async (programId: string, title: string) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Delete Program?",
      text: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteProgram(programId);
      setLocalPrograms(localPrograms.filter((p) => p._id !== programId));

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Program has been deleted successfully",
        confirmButtonColor: "#0ea5e9",
      });
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete program",
        confirmButtonColor: "#0ea5e9",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-green-100 text-green-700",
      draft: "bg-yellow-100 text-yellow-700",
      inactive: "bg-gray-100 text-gray-700",
    };
    return styles[status] || styles.draft;
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      health: "🏥",
      education: "📚",
      community: "👥",
      livelihood: "💼",
      relief: "🆘",
      other: "📌",
    };
    return icons[category] || "📌";
  };

  if (localPrograms.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500">No programs found. Create your first program!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-600 font-semibold">
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Created By</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {localPrograms.map((program) => (
            <tr key={program._id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 font-medium text-slate-900">{program.title}</td>
              <td className="px-4 py-3">
                <span className="flex items-center gap-1">
                  {getCategoryIcon(program.category)} {program.category}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-600">{program.location}</td>
              <td className="px-4 py-3">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(program.status)}`}>
                  {program.status}
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
                    onClick={() => handleDelete(program._id, program.title)}
                    className="px-3 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors text-xs font-medium"
                  >
                    🗑️ Delete
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
