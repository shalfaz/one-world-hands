"use client";

import { useState } from "react";
import { createFund, updateFund } from "./actions";
import Swal from "sweetalert2";
import AdminImageField from "@/components/AdminImageField";
import { getDashboardActionError } from "@/lib/dashboard/errors";
import { useLanguage } from "@/context/LanguageContext";

export default function FundForm({
  fund,
  onSuccess,
}: {
  fund?: Record<string, unknown> | null;
  onSuccess?: () => void;
}) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || imageUploading) return;
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      let result;

      if (fund) {
        formData.append("fundId", String(fund._id || ""));
        result = await updateFund(formData);
      } else {
        result = await createFund(formData);
      }

      if (!result.success) {
        await Swal.fire({
          icon: "error",
          title: t.manage.funds.form.saveErrorTitle,
          text: result.error,
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: fund ? t.manage.funds.form.updatedTitle : t.manage.funds.form.createdTitle,
        text: fund ? t.manage.funds.alerts.updatedText : t.manage.funds.form.createdText,
        timer: 2000,
      });

      onSuccess?.();
    } catch (error) {
      console.error("Form error:", error);
      Swal.fire({
        icon: "error",
        title: t.manage.funds.form.saveErrorTitle,
        text: getDashboardActionError(error, t.manage.common.tryAgain),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AdminImageField value={String(fund?.imageUrl || "")} onUploadingChange={setImageUploading} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <input
          name="name"
          type="text"
          placeholder={t.manage.funds.form.namePlaceholder}
          defaultValue={String(fund?.name || "")}
          maxLength={100}
          className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#009EDB]"
          required
        />

        <select
          name="category"
          defaultValue={String(fund?.category || "")}
          className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#009EDB]"
          required
          aria-label={t.manage.funds.form.categoryAria}
        >
          <option value="">{t.manage.common.selectCategory}</option>
          <option value="education">{t.manage.common.categories.education}</option>
          <option value="health">{t.manage.common.categories.health}</option>
          <option value="emergency">{t.manage.common.categories.emergency}</option>
          <option value="community">{t.manage.common.categories.community}</option>
          <option value="livelihood">{t.manage.common.categories.livelihood}</option>
          <option value="other">{t.manage.common.categories.other}</option>
        </select>

        <input
          name="targetAmount"
          type="number"
          placeholder={t.manage.funds.form.targetPlaceholder}
          defaultValue={Number(fund?.targetAmount || 0)}
          min="0"
          className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#009EDB]"
        />

        <select
          name="status"
          defaultValue={String(fund?.status || "draft")}
          className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#009EDB]"
          aria-label={t.manage.funds.form.statusAria}
        >
          <option value="draft">{t.manage.common.statuses.draft}</option>
          <option value="active">{t.manage.common.statuses.active}</option>
          <option value="inactive">{t.manage.common.statuses.inactive}</option>
          <option value="paused">{t.manage.common.statuses.paused}</option>
          <option value="completed">{t.manage.common.statuses.completed}</option>
          <option value="archived">{t.manage.common.statuses.archived}</option>
        </select>

        <div className="md:col-span-2 xl:col-span-4">
          <textarea
            name="description"
            placeholder={t.manage.common.description}
            defaultValue={String(fund?.description || "")}
            rows={2}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#009EDB]"
          />
        </div>

        <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 md:col-span-2 xl:col-span-4">
          <input name="published" type="checkbox" value="true" defaultChecked={Boolean(fund?.published ?? fund?.status === "active")} className="h-4 w-4 rounded border-slate-300 text-[#009EDB]" />
          {t.manage.common.publishedOnWebsite}
        </label>

        <div className="md:col-span-2 xl:col-span-4">
          <textarea
            name="impactSummary"
            placeholder={t.manage.funds.form.impactPlaceholder}
            defaultValue={String(fund?.impactSummary || "")}
            rows={2}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#009EDB]"
          />
        </div>

        <div className="md:col-span-2 xl:col-span-4">
          <button
            type="submit"
            disabled={loading || imageUploading}
            className="w-full rounded-full bg-[#009EDB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] disabled:opacity-50"
          >
            {loading
              ? t.manage.common.processing
              : imageUploading
                ? t.manage.common.uploadingImage
              : fund
                ? t.manage.funds.form.updateButton
                : t.manage.funds.form.addButton}
          </button>
        </div>
      </div>
    </form>
  );
}
