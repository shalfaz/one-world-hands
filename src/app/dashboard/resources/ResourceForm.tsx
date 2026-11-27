"use client";

import { useState } from "react";
import { createResource, updateResource } from "./actions";
import Swal from "sweetalert2";
import { getDashboardActionError } from "@/lib/dashboard/errors";
import { useLanguage } from "@/context/LanguageContext";

const typeOptions = [
  { value: "photo" },
  { value: "document" },
  { value: "blog" },
  { value: "report" },
  { value: "webinar" },
] as const;

export default function ResourceForm({
  resource,
  onSuccess,
}: {
  resource?: Record<string, unknown> | null;
  onSuccess?: () => void;
}) {
  const { t, tr } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(
    String(resource?.type || "photo")
  );
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      let result;

      if (resource) {
        formData.append("resourceId", String(resource._id || ""));
        result = await updateResource(formData);
      } else {
        result = await createResource(formData);
      }

      if (!result.success) {
        await Swal.fire({
          icon: "error",
          title: t.manage.resources.form.saveErrorTitle,
          text: result.error,
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: resource ? t.manage.resources.form.updatedTitle : t.manage.resources.form.createdTitle,
        text: resource
          ? t.manage.resources.alerts.updatedText
          : t.manage.resources.form.createdText,
        timer: 2000,
      });

      onSuccess?.();
    } catch (error) {
      console.error("Form error:", error);
      Swal.fire({
        icon: "error",
        title: t.manage.resources.form.saveErrorTitle,
        text: getDashboardActionError(error, t.manage.common.tryAgain),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          {t.manage.resources.form.titleLabel}
        </label>
        <input
          name="title"
          type="text"
          placeholder={t.manage.resources.form.titlePlaceholder}
          defaultValue={String(resource?.title || "")}
          maxLength={150}
          className="w-full h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#009EDB]"
          required
        />
      </div>

      {/* Type Selection */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          {t.manage.resources.form.typeLabel}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {typeOptions.map((option) => (
            <label
              key={option.value}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                selectedType === option.value
                  ? "border-[#009EDB] bg-[#EAF6FB]"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                name="type"
                value={option.value}
                checked={selectedType === option.value}
                onChange={(e) => setSelectedType(e.target.value)}
                className="sr-only"
                required
              />
              <div className="text-center">
                <div className="text-xs font-semibold text-slate-700 mt-1">
                  {t.manage.resources.types[option.value]}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          {t.manage.common.description}
        </label>
        <textarea
          name="description"
          placeholder={t.manage.resources.form.descriptionPlaceholder}
          defaultValue={String(resource?.description || "")}
          rows={2}
          className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#009EDB]"
        />
      </div>

      {/* Conditional Fields Based on Type */}
      {selectedType === "document" && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            {t.manage.resources.form.uploadDocLabel}
          </label>
          <input
            name="file"
            type="file"
            title={t.manage.resources.form.uploadDocTitle}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
            onChange={(e) =>
              setFileName(e.target.files?.[0]?.name || "")
            }
            className="w-full h-11 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#009EDB]"
          />
          {fileName && (
            <p className="text-xs text-[#009EDB] font-medium mt-1">{fileName}</p>
          )}
        </div>
      )}

      {selectedType === "blog" && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            {t.manage.resources.form.blogContentLabel}
          </label>
          <textarea
            name="content"
            placeholder={t.manage.resources.form.blogContentPlaceholder}
            defaultValue={String(resource?.content || "")}
            rows={4}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#009EDB]"
          />
        </div>
      )}

      {selectedType === "webinar" && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            {t.manage.resources.form.youtubeLabel}
          </label>
          <input
            name="youtubeLink"
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            defaultValue={String(resource?.youtubeLink || "")}
            className="w-full h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#009EDB]"
            required={selectedType === "webinar"}
          />
          <p className="text-xs text-slate-500 mt-1">
            {t.manage.resources.form.youtubeHelp}
          </p>
        </div>
      )}

      {selectedType === "photo" && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            {t.manage.resources.form.uploadPhotoLabel}
          </label>
          <input
            name="file"
            type="file"
            title={t.manage.resources.form.uploadPhotoTitle}
            accept="image/*"
            onChange={(e) =>
              setFileName(e.target.files?.[0]?.name || "")
            }
            className="w-full h-11 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#009EDB]"
          />
          {fileName && (
            <p className="text-xs text-[#009EDB] font-medium mt-1">{tr("manage.resources.form.fileSelected", { fileName })}</p>
          )}
        </div>
      )}

      {selectedType === "report" && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            {t.manage.resources.form.uploadReportLabel}
          </label>
          <input
            name="file"
            type="file"
            title={t.manage.resources.form.uploadReportTitle}
            accept=".pdf,.doc,.docx"
            onChange={(e) =>
              setFileName(e.target.files?.[0]?.name || "")
            }
            className="w-full h-11 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#009EDB]"
          />
          {fileName && (
            <p className="text-xs text-[#009EDB] font-medium mt-1">{tr("manage.resources.form.fileSelected", { fileName })}</p>
          )}
        </div>
      )}

      {/* Status */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          {t.manage.common.status}
        </label>
        <select
          name="status"
          defaultValue={String(resource?.status || "draft")}
          className="w-full h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#009EDB]"
          aria-label={t.manage.resources.form.statusAria}
        >
          <option value="draft">{t.manage.common.statuses.draft}</option>
          <option value="published">{t.manage.common.statuses.published}</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-[#009EDB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] disabled:opacity-50"
      >
        {loading
          ? t.manage.common.processing
          : resource
            ? t.manage.resources.form.updateButton
            : t.manage.resources.form.addButton}
      </button>
    </form>
  );
}
