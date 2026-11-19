import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/auth/admin";
import { DashboardActionError } from "@/lib/dashboard/errors";
import DashboardLayoutClient from "./DashboardLayoutClient";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  try {
    await requireAdminUser();
  } catch (error) {
    if (error instanceof DashboardActionError) {
      redirect("/login?error=unauthorized");
    }
    throw error;
  }

  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
