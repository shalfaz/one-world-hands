"use client";

import Swal from "sweetalert2";
import { createUser } from "./actions";
import { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserCreateForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
          title: "Could not create user",
          text: result.error,
          icon: "error",
        });
        return;
      }

      form.reset();
      router.refresh();
      await Swal.fire({
        title: result.warning ? "User created" : "Success!",
        text:
          result.warning ||
          `User "${name}" created successfully. Invitation sent to ${email}.`,
        icon: result.warning ? "warning" : "success",
        timer: 2500,
      });
    } catch (error) {
      console.error("Create user form error:", error);
      await Swal.fire({
        title: "Could not create user",
        text: error instanceof Error ? error.message : "Please try again.",
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
        placeholder="Full name"
        className="h-12 rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email address"
        className="h-12 rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Temporary password"
        className="h-12 rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
        required
      />

      <select
        name="role"
        defaultValue="user"
        className="h-12 rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="employee">Employee</option>
        <option value="volunteer">Volunteer</option>
      </select>

      <div className="md:col-span-2 xl:col-span-4">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 items-center justify-center rounded-full bg-[#009EDB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? "Creating user..." : "Create User"}
        </button>
      </div>
    </form>
  );
}
