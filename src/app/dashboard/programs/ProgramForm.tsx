"use client";

import { createProgram, updateProgram } from "./actions";
import { useState } from "react";
import Swal from "sweetalert2";
import AdminImageField from "@/components/AdminImageField";
import { getDashboardActionError } from "@/lib/dashboard/errors";

interface Program {
  _id: string;
  title: string;
  description?: string;
  category: string;
  location: string;
  status: string;
  imageUrl?: string;
  objectives?: string;
  startDate?: string;
  endDate?: string;
  published?: boolean;
}

export default function ProgramForm({ program, onSuccess }: { program?: Program; onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading || imageUploading) return;
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      let result;

      if (program) {
        formData.append("programId", program._id);
        result = await updateProgram(formData);
      } else {
        result = await createProgram(formData);
      }

      if (!result.success) {
        await Swal.fire({
          icon: "error",
          title: "Could not save program",
          text: result.error,
          confirmButtonColor: "#0ea5e9",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: program ? "Program Updated" : "Program Created",
        text: program
          ? "Program has been updated successfully"
          : "New program has been created successfully",
        confirmButtonColor: "#0ea5e9",
      });
      onSuccess?.();
    } catch (error) {
      console.error("Form error:", error);
      Swal.fire({
        icon: "error",
        title: "Could not save program",
        text: getDashboardActionError(error, "Please try again."),
        confirmButtonColor: "#0ea5e9",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-4">
      <div className="md:col-span-4"><AdminImageField value={program?.imageUrl} onUploadingChange={setImageUploading} /></div>
      <input
        name="title"
        placeholder="Program title"
        defaultValue={program?.title || ""}
        className="h-11 rounded-lg border border-[#dce5de] px-4 text-sm outline-none focus:border-[#176345] focus:ring-2 focus:ring-[#176345]/20"
        required
      />
      <select
        name="category"
        defaultValue={program?.category || ""}
        aria-label="Select program category"
        className="h-11 rounded-lg border border-[#dce5de] px-4 text-sm outline-none focus:border-[#176345] focus:ring-2 focus:ring-[#176345]/20"
        required
      >
        <option value="">Select Category</option>
        <option value="health">Health</option>
        <option value="education">Education</option>
        <option value="community">Community</option>
        <option value="livelihood">Livelihood</option>
        <option value="relief">Relief</option>
        <option value="other">Other</option>
      </select>
      <input
        name="location"
        placeholder="Location"
        defaultValue={program?.location || ""}
        className="h-11 rounded-lg border border-[#dce5de] px-4 text-sm outline-none focus:border-[#176345] focus:ring-2 focus:ring-[#176345]/20"
        required
      />
      <select
        name="status"
        defaultValue={program?.status || "draft"}
        aria-label="Select program status"
        className="h-11 rounded-lg border border-[#dce5de] px-4 text-sm outline-none focus:border-[#176345] focus:ring-2 focus:ring-[#176345]/20"
      >
        <option value="draft">Draft</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="completed">Completed</option>
        <option value="archived">Archived</option>
      </select>

      <textarea
        name="description"
        placeholder="Description (optional)"
        defaultValue={program?.description || ""}
        rows={2}
        className="md:col-span-4 rounded-lg border border-[#dce5de] px-4 py-2 text-sm outline-none focus:border-[#176345] focus:ring-2 focus:ring-[#176345]/20"
      />

      <textarea
        name="objectives"
        placeholder="Program objectives"
        defaultValue={program?.objectives || ""}
        rows={2}
        className="md:col-span-4 rounded-lg border border-[#dce5de] px-4 py-2 text-sm outline-none focus:border-[#176345] focus:ring-2 focus:ring-[#176345]/20"
      />

      <label className="text-xs font-semibold text-slate-600">Start date
        <input name="startDate" type="date" defaultValue={program?.startDate?.slice(0, 10)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 text-sm" />
      </label>
      <label className="text-xs font-semibold text-slate-600">End date
        <input name="endDate" type="date" defaultValue={program?.endDate?.slice(0, 10)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 text-sm" />
      </label>
      <label className="flex items-end gap-3 pb-3 text-sm font-semibold text-slate-700 md:col-span-2">
        <input name="published" type="checkbox" value="true" defaultChecked={Boolean(program?.published ?? program?.status === "active")} className="h-4 w-4 rounded text-[#176345]" />
        Published on the website
      </label>

      <div className="md:col-span-4">
        <button
          type="submit"
          disabled={loading || imageUploading}
          className="rounded-full bg-[#176345] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#104b34] disabled:opacity-50"
        >
          {imageUploading ? "Uploading image..." : loading ? "Saving..." : program ? "Update Program" : "+ Add New Program"}
        </button>
      </div>
    </form>
  );
}
