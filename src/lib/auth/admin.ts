import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongoose";
import User from "@/lib/models/User";
import {
  getSessionUserId,
  isAuthorizedAdminSession,
} from "@/lib/auth/session";
import { DashboardActionError } from "@/lib/dashboard/errors";

export async function requireAdminSession(sessionToken?: string) {
  if (!sessionToken) {
    throw new DashboardActionError("Please sign in with an administrator account.");
  }

  const userId = getSessionUserId(sessionToken);
  if (!userId) {
    throw new DashboardActionError("Your session is invalid. Please sign in again.");
  }

  await connectToDatabase();
  const user = await User.findById(userId).select("_id password role");

  if (!user) {
    throw new DashboardActionError("Your account could not be found. Please sign in again.");
  }

  if (
    !isAuthorizedAdminSession(sessionToken, {
      _id: String(user._id),
      password: user.password,
      role: user.role,
    })
  ) {
    throw new DashboardActionError("Administrator access is required.");
  }

  return user;
}

export async function requireAdminUser() {
  const cookieStore = await cookies();
  return requireAdminSession(cookieStore.get("owh_session")?.value);
}
