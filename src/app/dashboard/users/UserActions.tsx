"use client";

import Swal from "sweetalert2";
import { updateUserRole, deleteUser } from "./actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function UserActions({ userId, currentRole }: { userId: string; currentRole: string }) {
  const [role, setRole] = useState(currentRole);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;

    if (newRole === role || loading) return;

    const result = await Swal.fire({
      title: "Update Role?",
      text: `Change role from "${role}" to "${newRole}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, update it!",
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
          title: "Success!",
          text: "Role updated successfully",
          icon: "success",
          timer: 2000,
        });
      } catch (error) {
        await Swal.fire({
          title: "Error!",
          text: error instanceof Error ? error.message : "Please try again.",
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
      title: "Delete User?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("userId", userId);
        const deleteResult = await deleteUser(formData);
        if (!deleteResult.success) throw new Error(deleteResult.error);

        await Swal.fire({
          title: "Deleted!",
          text: "User deleted successfully",
          icon: "success",
          timer: 2000,
        });

        router.refresh();
      } catch (error) {
        await Swal.fire({
          title: "Error!",
          text: error instanceof Error ? error.message : "Please try again.",
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
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="employee">Employee</option>
        <option value="volunteer">Volunteer</option>
      </select>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-red-600 hover:text-red-700 font-semibold text-xs disabled:opacity-50"
      >
        {loading ? "Saving..." : "Delete"}
      </button>
    </div>
  );
}
