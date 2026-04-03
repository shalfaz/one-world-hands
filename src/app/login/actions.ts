"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";
import { hashPassword, needsRehash, verifyPassword } from "@/lib/password";

function getRedirectPathByRole(role: string) {
  if (role === "admin") return "/dashboard";
  if (role === "employee") return "/employee-dashboard";
  if (role === "volunteer") return "/volunteer-dashboard";
  return "/dashboard";
}

export async function loginUser(formData: FormData) {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "").trim();

  if (!email || !password) {
    redirect("/login?error=missing");
  }

  const { data: user, error } = await supabaseServer
    .from("users")
    .select("id, name, email, password, role")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("SUPABASE LOGIN ERROR:", error);
    redirect("/login?error=db");
  }

  if (!user) {
    redirect("/login?error=user");
  }

  const isValidPassword = verifyPassword(password, user.password || "");

  if (!isValidPassword) {
    redirect("/login?error=password");
  }

  if (user.password && needsRehash(user.password)) {
    const upgradedPassword = hashPassword(password);

    await supabaseServer
      .from("users")
      .update({ password: upgradedPassword })
      .eq("id", user.id);
  }

  const role = String(user.role || "admin").toLowerCase();
  const redirectPath = getRedirectPathByRole(role);

  const cookieStore = await cookies();

  cookieStore.set("owh_session", "authenticated", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("owh_role", role, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("owh_email", user.email, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("owh_name", user.name || "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("owh_session_public", "authenticated", {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("owh_role_public", role, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("owh_email_public", user.email, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("owh_name_public", user.name || "", {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(redirectPath);
}

export async function logoutUser() {
  const cookieStore = await cookies();

  cookieStore.delete("owh_session");
  cookieStore.delete("owh_role");
  cookieStore.delete("owh_email");
  cookieStore.delete("owh_name");

  cookieStore.delete("owh_session_public");
  cookieStore.delete("owh_role_public");
  cookieStore.delete("owh_email_public");
  cookieStore.delete("owh_name_public");

  redirect("/");
}

/* compatibility exports */
export const loginAdmin = loginUser;
export const logoutAdmin = logoutUser;