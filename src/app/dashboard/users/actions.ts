"use server";

import { hashPassword } from "@/lib/password";
import User from "@/lib/models/User";
import connectToDatabase from "@/lib/mongoose";
import nodemailer from "nodemailer";

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export async function createUser(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    console.log("Creating user:", { name, email, role });

    if (!name || !email || !password || !role) {
      console.error("All fields are required");
      return;
    }

    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await connectToDatabase();
    console.log("MongoDB connected");

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error("User already exists:", email);
      return;
    }

    // Hash password
    const hashedPassword = hashPassword(password);
    console.log("Password hashed");

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    console.log("User saved to database");

    // Send email with login details
    console.log("Sending email to:", email);
    await transporter.sendMail({
      from: process.env.APP_EMAIL,
      to: email,
      subject: "Your Account Created - One World Hands NGO",
      html: `
        <h2>Welcome to One World Hands NGO!</h2>
        <p>Dear ${name},</p>
        <p>Your account has been created successfully. Here are your login details:</p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Password:</strong> ${password}</li>
          <li><strong>Role:</strong> ${role}</li>
          <li><strong>Login URL:</strong> <a href="http://localhost:3000/login">http://localhost:3000/login</a></li>
        </ul>
        <p><strong>Please change your password after your first login.</strong></p>
        <p>Best regards,<br>One World Hands Team</p>
      `,
    });

    console.log("User created and email sent successfully");
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function updateUserRole(formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    const role = formData.get("role") as string;

    console.log("Updating user role:", { userId, role });

    if (!userId || !role) {
      console.error("User ID and role are required");
      return;
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Update user role
    const result = await User.updateOne(
      { _id: userId },
      { role }
    );

    if (result.modifiedCount > 0) {
      console.log("User role updated successfully");
    } else {
      console.error("User not found or role not changed");
    }
  } catch (error) {
    console.error("Error updating user role:", error);
  }
}

export async function deleteUser(formData: FormData) {
  try {
    const userId = formData.get("userId") as string;

    console.log("Deleting user:", userId);

    if (!userId) {
      console.error("User ID is required");
      return;
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Delete user
    const result = await User.deleteOne({ _id: userId });

    if (result.deletedCount > 0) {
      console.log("User deleted successfully");
    } else {
      console.error("User not found");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}
