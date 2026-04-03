"use server";

import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase-server";
import { hashPassword } from "@/lib/password";

function normalizeRole(role: string) {
  const nextRole = role.trim().toLowerCase();

  if (nextRole === "admin") return "admin";
  if (nextRole === "employee") return "employee";
  if (nextRole === "volunteer") return "volunteer";

  return "volunteer";
}

export async function createUser(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "").trim();
  const role = normalizeRole(String(formData.get("role") || "volunteer"));

  if (!name || !email || !password) return;

  const hashedPassword = hashPassword(password);

  const { error } = await supabaseServer.from("users").insert({
    name,
    email,
    password: hashedPassword,
    role,
  });

  if (error) {
    console.error("CREATE USER ERROR:", error);
    return;
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/users");
}

export async function updateUserRole(formData: FormData) {
  const id = String(formData.get("id") || "").trim();
  const role = normalizeRole(String(formData.get("role") || "volunteer"));

  if (!id) return;

  const { error } = await supabaseServer
    .from("users")
    .update({ role })
    .eq("id", id);

  if (error) {
    console.error("UPDATE USER ROLE ERROR:", error);
    return;
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/users");
}

export async function updateUserPassword(formData: FormData) {
  const id = String(formData.get("id") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (!id || !password) return;

  const hashedPassword = hashPassword(password);

  const { error } = await supabaseServer
    .from("users")
    .update({ password: hashedPassword })
    .eq("id", id);

  if (error) {
    console.error("UPDATE USER PASSWORD ERROR:", error);
    return;
  }

  revalidatePath("/dashboard/users");
}

export async function deleteUser(formData: FormData) {
  const id = String(formData.get("id") || "").trim();

  if (!id) return;

  const { error } = await supabaseServer.from("users").delete().eq("id", id);

  if (error) {
    console.error("DELETE USER ERROR:", error);
    return;
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/users");
}