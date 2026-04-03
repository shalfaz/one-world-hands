"use server";

import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase-server";

export async function submitDonation(formData: FormData) {
  const fundId = String(formData.get("fundId") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const amount = Number(formData.get("amount") || 0);

  if (!fundId || !name || !email || amount <= 0) {
    return;
  }

  const { error } = await supabaseServer.from("donations").insert({
    name,
    email,
    amount,
    fund_id: fundId,
    status: "pending",
  });

  if (error) {
    console.error("DONATION SUBMIT ERROR:", error);
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/donation-funds");
  revalidatePath(`/donation-funds/${fundId}`);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/donations");
}