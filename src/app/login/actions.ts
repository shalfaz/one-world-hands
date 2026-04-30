"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hashPassword, needsRehash, verifyPassword } from "@/lib/password";
import connectToDatabase from "@/lib/mongoose";
import User from "@/lib/models/User";

export async function loginUser(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "").trim();

  if (!email || !password) {
    redirect("/login?error=missing");
  }

  await connectToDatabase();
  const user = await User.findOne({ email });

  if (!user) {
    redirect("/login?error=user");
  }

  const isValidPassword = verifyPassword(password, user.password || "");
  if (!isValidPassword) {
    redirect("/login?error=password");
  }

  if (needsRehash(user.password)) {
    user.password = hashPassword(password);
    await user.save();
  }

  const role = String(user.role || "admin").toLowerCase();

  const cookieStore = await cookies();

  // Preserving the old cookies the app relies on
  cookieStore.set("owh_session", "authenticated", { httpOnly: true, secure: false, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  cookieStore.set("owh_role", role, { httpOnly: true, secure: false, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  cookieStore.set("owh_email", user.email, { httpOnly: true, secure: false, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  cookieStore.set("owh_name", user.name || "", { httpOnly: true, secure: false, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });

  cookieStore.set("owh_session_public", "authenticated", { httpOnly: false, secure: false, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  cookieStore.set("owh_role_public", role, { httpOnly: false, secure: false, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  cookieStore.set("owh_email_public", user.email, { httpOnly: false, secure: false, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  cookieStore.set("owh_name_public", user.name || "", { httpOnly: false, secure: false, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });

  redirect("/");
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
