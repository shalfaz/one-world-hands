"use client";

import { createProgram, updateProgram } from "./actions";
import { useState } from "react";
import Swal from "sweetalert2";
import AdminImageField from "@/components/AdminImageField";
import { getDashboardActionError } from "@/lib/dashboard/errors";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t } = useLanguage();
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
          title: t.manage.programs.form.saveErrorTitle,
          text: result.error,
          confirmButtonColor: "#009EDB",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: program ? t.manage.programs.form.updatedTitle : t.manage.programs.form.createdTitle,
        text: program
          ? t.manage.programs.form.updatedText
          : t.manage.programs.form.createdText,
        confirmButtonColor: "#009EDB",
      });
      onSuccess?.();
    } catch (error) {
      console.error("Form error:", error);
      Swal.fire({
        icon: "error",
        title: t.manage.programs.form.saveErrorTitle,
        text: getDashboardActionError(error, t.manage.common.tryAgain),
        confirmButtonColor: "#009EDB",
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
        placeholder={t.manage.programs.form.titlePlaceholder}
        defaultValue={program?.title || ""}
        className="h-11 rounded-lg border border-[#D9E2EC] px-4 text-sm outline-none focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
        required
      />
      <select
        name="category"
        defaultValue={program?.category || ""}
        aria-label={t.manage.programs.form.categoryAria}
        className="h-11 rounded-lg border border-[#D9E2EC] px-4 text-sm outline-none focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
        required
      >
        <option value="">{t.manage.common.selectCategory}</option>
        <option value="health">{t.manage.common.categories.health}</option>
        <option value="education">{t.manage.common.categories.education}</option>
        <option value="community">{t.manage.common.categories.community}</option>
        <option value="livelihood">{t.manage.common.categories.livelihood}</option>
        <option value="relief">{t.manage.common.categories.relief}</option>
        <option value="other">{t.manage.common.categories.other}</option>
      </select>
      <input
        name="location"
        placeholder={t.manage.programs.form.locationPlaceholder}
        defaultValue={program?.location || ""}
        className="h-11 rounded-lg border border-[#D9E2EC] px-4 text-sm outline-none focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
        required
      />
      <select
        name="status"
        defaultValue={program?.status || "draft"}
        aria-label={t.manage.programs.form.statusAria}
        className="h-11 rounded-lg border border-[#D9E2EC] px-4 text-sm outline-none focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
      >
        <option value="draft">{t.manage.common.statuses.draft}</option>
        <option value="active">{t.manage.common.statuses.active}</option>
        <option value="inactive">{t.manage.common.statuses.inactive}</option>
        <option value="completed">{t.manage.common.statuses.completed}</option>
        <option value="archived">{t.manage.common.statuses.archived}</option>
      </select>

      <textarea
        name="description"
        placeholder={t.manage.programs.form.descriptionPlaceholder}
        defaultValue={program?.description || ""}
        rows={2}
        className="md:col-span-4 rounded-lg border border-[#D9E2EC] px-4 py-2 text-sm outline-none focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
      />

      <textarea
        name="objectives"
        placeholder={t.manage.programs.form.objectivesPlaceholder}
        defaultValue={program?.objectives || ""}
        rows={2}
        className="md:col-span-4 rounded-lg border border-[#D9E2EC] px-4 py-2 text-sm outline-none focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
      />

      <label className="text-xs font-semibold text-slate-600">{t.manage.programs.form.startDate}
        <input name="startDate" type="date" defaultValue={program?.startDate?.slice(0, 10)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 text-sm" />
      </label>
      <label className="text-xs font-semibold text-slate-600">{t.manage.programs.form.endDate}
        <input name="endDate" type="date" defaultValue={program?.endDate?.slice(0, 10)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 text-sm" />
      </label>
      <label className="flex items-end gap-3 pb-3 text-sm font-semibold text-slate-700 md:col-span-2">
        <input name="published" type="checkbox" value="true" defaultChecked={Boolean(program?.published ?? program?.status === "active")} className="h-4 w-4 rounded text-[#009EDB]" />
        {t.manage.common.publishedOnWebsite}
      </label>

      <div className="md:col-span-4">
        <button
          type="submit"
          disabled={loading || imageUploading}
          className="rounded-full bg-[#009EDB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] disabled:opacity-50"
        >
          {imageUploading ? t.manage.common.uploadingImage : loading ? t.manage.common.saving : program ? t.manage.programs.form.updateButton : t.manage.programs.form.addButton}
        </button>
      </div>
    </form>
  );
}
