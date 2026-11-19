"use server";

import { hashPassword } from "@/lib/password";
import User from "@/lib/models/User";
import connectToDatabase from "@/lib/mongoose";
import nodemailer from "nodemailer";
import { revalidatePath } from "next/cache";
import { requireAdminUser } from "@/lib/auth/admin";
import {
  DashboardActionError,
  getDashboardActionError,
} from "@/lib/dashboard/errors";

type ActionResult =
  | { success: true; warning?: string }
  | { success: false; error: string };

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export async function createUser(formData: FormData): Promise<ActionResult> {
  try {
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");
    const role = String(formData.get("role") || "").trim();

    if (!name || !email || !password || !role) {
      throw new DashboardActionError("Name, email, password, and role are required.");
    }

    await requireAdminUser();
    if (!["user", "admin", "employee", "volunteer"].includes(role)) {
      throw new DashboardActionError("Select a valid account role.");
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new DashboardActionError("An account with this email already exists.");
    }

    const hashedPassword = hashPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    let warning: string | undefined;
    try {
      await transporter.sendMail({
        from: process.env.APP_EMAIL,
        to: email,
        subject: "Your Account Created - One World Hands NGO",
        html: `
          <h2>Welcome to One World Hands NGO!</h2>
          <p>Dear ${name},</p>
          <p>Your account has been created successfully. Your login email is ${email} and your role is ${role}.</p>
          <p>Please contact your administrator for your temporary password and change it after signing in.</p>
          <p><a href="${process.env.NEXTAUTH_URL || "https://oneworldhands.org"}/login">Sign in</a></p>
          <p>Best regards,<br>One World Hands Team</p>
        `,
      });
    } catch (error) {
      console.error("User invitation email error:", error);
      warning = "The account was created, but the invitation email could not be sent.";
    }

    revalidatePath("/dashboard/users");
    return { success: true, warning };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      error: getDashboardActionError(error, "Could not create the user. Please try again."),
    };
  }
}

export async function updateUserRole(formData: FormData): Promise<ActionResult> {
  try {
    const userId = String(formData.get("userId") || "").trim();
    const role = String(formData.get("role") || "").trim();

    if (!userId || !role) {
      throw new DashboardActionError("User ID and role are required.");
    }

    await requireAdminUser();
    if (!/^[a-f\d]{24}$/i.test(userId) || !["user", "admin", "employee", "volunteer"].includes(role)) {
      throw new DashboardActionError("Select a valid user and role.");
    }
    await connectToDatabase();
    const result = await User.updateOne(
      { _id: userId },
      { $set: { role } },
      { runValidators: true }
    );

    if (result.matchedCount === 0) {
      throw new DashboardActionError("User not found.");
    }
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Error updating user role:", error);
    return {
      success: false,
      error: getDashboardActionError(error, "Could not update the user role. Please try again."),
    };
  }
}

export async function deleteUser(formData: FormData): Promise<ActionResult> {
  try {
    const userId = String(formData.get("userId") || "").trim();
    if (!userId) {
      throw new DashboardActionError("User ID is required.");
    }

    const admin = await requireAdminUser();
    if (!/^[a-f\d]{24}$/i.test(userId)) {
      throw new DashboardActionError("Select a valid user.");
    }
    if (String(admin._id) === userId) {
      throw new DashboardActionError("You cannot delete your own administrator account.");
    }
    await connectToDatabase();
    const result = await User.deleteOne({ _id: userId });
    if (!result.deletedCount) {
      throw new DashboardActionError("User not found.");
    }
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      error: getDashboardActionError(error, "Could not delete the user. Please try again."),
    };
  }
}
