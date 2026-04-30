"use client";

import Swal from "sweetalert2";
import { updateUserRole, deleteUser } from "./actions";

export function UserActions({ userId, currentRole }: { userId: string; currentRole: string }) {
  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;

    if (newRole === currentRole) {
      return;
    }

    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Update Role?",
      text: `Change role from "${currentRole}" to "${newRole}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      try {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("role", newRole);
        await updateUserRole(formData);

        Swal.fire({
          title: "Success!",
          text: "Role updated successfully",
          icon: "success",
          timer: 2000,
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to update role",
          icon: "error",
        });
      }
    } else {
      // Reset select to current role
      e.target.value = currentRole;
    }
  };

  const handleDelete = async () => {
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
      try {
        const formData = new FormData();
        formData.append("userId", userId);
        await deleteUser(formData);

        Swal.fire({
          title: "Deleted!",
          text: "User deleted successfully",
          icon: "success",
          timer: 2000,
        });

        // Reload page after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete user",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <select
        defaultValue={currentRole}
        onChange={handleRoleChange}
        className="h-8 rounded-md border border-slate-300 bg-white px-2 text-xs"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="employee">Employee</option>
        <option value="volunteer">Volunteer</option>
      </select>
      <button
        onClick={handleDelete}
        className="text-red-600 hover:text-red-700 font-semibold text-xs"
      >
        Delete
      </button>
    </div>
  );
}
