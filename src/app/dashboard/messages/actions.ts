"use server";

import connectToDatabase from "@/lib/mongoose";
import Message from "@/lib/models/Message";
import { revalidatePath } from "next/cache";
import { requireAdminUser } from "@/lib/auth/admin";
import {
  DashboardActionError,
  getDashboardActionError,
} from "@/lib/dashboard/errors";

type ActionResult = { success: true; repliedAt?: string } | { success: false; error: string };

export async function replyToMessage(
  messageId: string,
  replyText: string
): Promise<ActionResult> {
  try {
    const user = await requireAdminUser();
    if (!/^[a-f\d]{24}$/i.test(messageId)) {
      throw new DashboardActionError("Select a valid message.");
    }
    if (!replyText.trim()) {
      throw new DashboardActionError("Enter a reply before saving.");
    }

    await connectToDatabase();
    const message = await Message.findByIdAndUpdate(
      messageId,
      {
        reply: replyText.trim(),
        repliedBy: user._id,
        repliedAt: new Date(),
        status: "replied",
      },
      { new: true, runValidators: true }
    );

    if (!message) {
      throw new DashboardActionError("Message not found. Refresh and try again.");
    }

    revalidatePath("/dashboard/messages");
    return { success: true, repliedAt: message.repliedAt?.toISOString() };
  } catch (error) {
    console.error("Error replying to message:", error);
    return {
      success: false,
      error: getDashboardActionError(error, "Could not save your reply. Please try again."),
    };
  }
}

export async function markMessageAsRead(messageId: string): Promise<ActionResult> {
  try {
    await requireAdminUser();
    if (!/^[a-f\d]{24}$/i.test(messageId)) {
      throw new DashboardActionError("Select a valid message.");
    }

    await connectToDatabase();

    const message = await Message.findByIdAndUpdate(
      messageId,
      { status: "read" },
      { new: true }
    );

    if (!message) {
      throw new DashboardActionError("Message not found. Refresh and try again.");
    }

    revalidatePath("/dashboard/messages");
    return { success: true };
  } catch (error) {
    console.error("Error marking message as read:", error);
    return {
      success: false,
      error: getDashboardActionError(error, "Could not update the message. Please try again."),
    };
  }
}
