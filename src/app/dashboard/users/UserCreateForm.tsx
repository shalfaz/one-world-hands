"use client";

import Swal from "sweetalert2";
import { createUser } from "./actions";
import { FormEvent } from "react";

export default function UserCreateForm() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    // Show loading
    Swal.fire({
      title: "Creating user...",
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        try {
          await createUser(formData);

          Swal.fire({
            title: "Success!",
            text: `User "${name}" created successfully. Email sent to ${email}`,
            icon: "success",
            timer: 2000,
          });

          // Reset form
          e.currentTarget.reset();

          // Reload after 2 seconds
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to create user",
            icon: "error",
          });
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <input
        name="name"
        placeholder="Full name"
        className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email address"
        className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Temporary password"
        className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
        required
      />

      <select
        name="role"
        defaultValue="user"
        className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="employee">Employee</option>
        <option value="volunteer">Volunteer</option>
      </select>

      <div className="md:col-span-2 xl:col-span-4">
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-full bg-sky-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700"
        >
          Create User
        </button>
      </div>
    </form>
  );
}
