"use client";

import { createProgram, updateProgram } from "./actions";
import { useState } from "react";
import Swal from "sweetalert2";

interface Program {
  _id: string;
  title: string;
  description?: string;
  category: string;
  location: string;
  status: string;
}

export default function ProgramForm({ program }: { program?: Program }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      if (program) {
        formData.append("programId", program._id);
        await updateProgram(formData);
      } else {
        await createProgram(formData);
      }

      Swal.fire({
        icon: "success",
        title: program ? "Program Updated" : "Program Created",
        text: program
          ? "Program has been updated successfully"
          : "New program has been created successfully",
        confirmButtonColor: "#0ea5e9",
      });
    } catch (error) {
      console.error("Form error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save program",
        confirmButtonColor: "#0ea5e9",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-4">
      <input
        name="title"
        placeholder="Program title"
        defaultValue={program?.title || ""}
        className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
        required
      />
      <select
        name="category"
        defaultValue={program?.category || ""}
        aria-label="Select program category"
        className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
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
        className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
        required
      />
      <select
        name="status"
        defaultValue={program?.status || "draft"}
        aria-label="Select program status"
        className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
      >
        <option value="draft">Draft</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <textarea
        name="description"
        placeholder="Description (optional)"
        defaultValue={program?.description || ""}
        rows={2}
        className="md:col-span-4 rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
      />

      <div className="md:col-span-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Saving..." : program ? "Update Program" : "+ Add New Program"}
        </button>
      </div>
    </form>
  );
}
