"use client";

import Swal from "sweetalert2";
import { createUser } from "./actions";
import { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function UserCreateForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t, tr } = useLanguage();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    setLoading(true);
    try {
      const result = await createUser(formData);
      if (!result.success) {
        await Swal.fire({
          title: t.dashboard.users.alerts.createErrorTitle,
          text: result.error,
          icon: "error",
        });
        return;
      }

      form.reset();
      router.refresh();
      await Swal.fire({
        title: result.warning
          ? t.dashboard.users.alerts.userCreatedTitle
          : t.dashboard.users.alerts.successTitle,
        text:
          result.warning ||
          tr("dashboard.users.alerts.userCreatedText", { name, email }),
        icon: result.warning ? "warning" : "success",
        timer: 2500,
      });
    } catch (error) {
      console.error("Create user form error:", error);
      await Swal.fire({
        title: t.dashboard.users.alerts.createErrorTitle,
        text: error instanceof Error ? error.message : t.dashboard.common.tryAgain,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <input
        name="name"
        placeholder={t.dashboard.users.form.fullNamePlaceholder}
        className="h-12 rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
        required
      />

      <input
        name="email"
        type="email"
        placeholder={t.dashboard.users.form.emailPlaceholder}
        className="h-12 rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
        required
      />

      <input
        name="password"
        type="password"
        placeholder={t.dashboard.users.form.passwordPlaceholder}
        className="h-12 rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
        required
      />

      <select
        name="role"
        defaultValue="user"
        className="h-12 rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
      >
        <option value="user">{t.dashboard.users.roles.user}</option>
        <option value="admin">{t.dashboard.users.roles.admin}</option>
        <option value="employee">{t.dashboard.users.roles.employee}</option>
        <option value="volunteer">{t.dashboard.users.roles.volunteer}</option>
      </select>

      <div className="md:col-span-2 xl:col-span-4">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-[#009EDB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? t.dashboard.users.form.creating : t.dashboard.users.form.submit}
        </button>
      </div>
    </form>
  );
}
