"use server";

import connectToDatabase from "@/lib/mongoose";
import Message from "@/lib/models/Message";

export async function submitContactMessage(
  name: string,
  email: string,
  message: string
) {
  try {
    // Validate inputs
    if (!name || !email || !message) {
      throw new Error("All fields are required");
    }

    if (name.trim().length < 2) {
      throw new Error("Name must be at least 2 characters");
    }

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      throw new Error("Invalid email address");
    }

    if (message.trim().length < 10) {
      throw new Error("Message must be at least 10 characters");
    }

    await connectToDatabase();

    // Create and save message
    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      status: "unread",
    });

    console.log("Message saved:", newMessage._id);

    return {
      success: true,
      messageId: String(newMessage._id),
    };
  } catch (error) {
    console.error("Error submitting contact message:", error);
    throw error;
  }
}
