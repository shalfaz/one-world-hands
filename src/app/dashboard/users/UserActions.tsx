"use client";

import Swal from "sweetalert2";
import { updateUserRole, deleteUser } from "./actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export function UserActions({ userId, currentRole }: { userId: string; currentRole: string }) {
  const [role, setRole] = useState(currentRole);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t, tr } = useLanguage();

  const roleLabels: Record<string, string> = {
    user: t.dashboard.users.roles.user,
    admin: t.dashboard.users.roles.admin,
    employee: t.dashboard.users.roles.employee,
    volunteer: t.dashboard.users.roles.volunteer,
  };

  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;

    if (newRole === role || loading) return;

    const result = await Swal.fire({
      title: t.dashboard.users.alerts.updateRoleTitle,
      text: tr("dashboard.users.alerts.updateRoleText", {
        from: roleLabels[role] ?? role,
        to: roleLabels[newRole] ?? newRole,
      }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009EDB",
      cancelButtonColor: "#ef4444",
      confirmButtonText: t.dashboard.users.alerts.updateRoleConfirm,
      cancelButtonText: t.dashboard.common.cancel,
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("role", newRole);
        const updateResult = await updateUserRole(formData);
        if (!updateResult.success) throw new Error(updateResult.error);

        setRole(newRole);
        router.refresh();
        await Swal.fire({
          title: t.dashboard.users.alerts.successTitle,
          text: t.dashboard.users.alerts.roleUpdatedText,
          icon: "success",
          timer: 2000,
        });
      } catch (error) {
        await Swal.fire({
          title: t.dashboard.users.alerts.errorTitle,
          text: error instanceof Error ? error.message : t.dashboard.common.tryAgain,
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setRole(role);
    }
  };

  const handleDelete = async () => {
    if (loading) return;
    const result = await Swal.fire({
      title: t.dashboard.users.alerts.deleteUserTitle,
      text: t.dashboard.users.alerts.deleteUserText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: t.dashboard.users.alerts.deleteUserConfirm,
      cancelButtonText: t.dashboard.common.cancel,
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("userId", userId);
        const deleteResult = await deleteUser(formData);
        if (!deleteResult.success) throw new Error(deleteResult.error);

        await Swal.fire({
          title: t.dashboard.users.alerts.deletedTitle,
          text: t.dashboard.users.alerts.userDeletedText,
          icon: "success",
          timer: 2000,
        });

        router.refresh();
      } catch (error) {
        await Swal.fire({
          title: t.dashboard.users.alerts.errorTitle,
          text: error instanceof Error ? error.message : t.dashboard.common.tryAgain,
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <select
        value={role}
        onChange={handleRoleChange}
        disabled={loading}
        className="h-8 rounded-md border border-slate-300 bg-white px-2 text-xs"
      >
        <option value="user">{t.dashboard.users.roles.user}</option>
        <option value="admin">{t.dashboard.users.roles.admin}</option>
        <option value="employee">{t.dashboard.users.roles.employee}</option>
        <option value="volunteer">{t.dashboard.users.roles.volunteer}</option>
      </select>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="whitespace-nowrap text-red-600 hover:text-red-700 font-semibold text-xs disabled:opacity-50"
      >
        {loading ? t.dashboard.users.actions.saving : t.dashboard.users.actions.delete}
      </button>
    </div>
  );
}
