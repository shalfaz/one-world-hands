"use server";

import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongoose";
import Message from "@/lib/models/Message";
import User from "@/lib/models/User";

export async function replyToMessage(messageId: string, replyText: string) {
  try {
    const cookieStore = await cookies();
    const email = cookieStore.get("owh_email")?.value;

    if (!email) {
      throw new Error("Not authenticated");
    }

    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const message = await Message.findByIdAndUpdate(
      messageId,
      {
        reply: replyText,
        repliedBy: user._id,
        repliedAt: new Date(),
        status: "replied",
      },
      { new: true }
    );

    if (!message) {
      throw new Error("Message not found");
    }

    return {
      success: true,
      message: "Reply sent successfully",
    };
  } catch (error) {
    console.error("Error replying to message:", error);
    throw error;
  }
}

export async function markMessageAsRead(messageId: string) {
  try {
    await connectToDatabase();

    const message = await Message.findByIdAndUpdate(
      messageId,
      { status: "read" },
      { new: true }
    );

    if (!message) {
      throw new Error("Message not found");
    }

    return {
      success: true,
      message: "Message marked as read",
    };
  } catch (error) {
    console.error("Error marking message as read:", error);
    throw error;
  }
}
