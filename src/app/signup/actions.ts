"use server";

import { hashPassword } from "@/lib/password";
import User from "@/lib/models/User";
import connectToDatabase from "@/lib/mongoose";
import nodemailer from "nodemailer";
import { redirect } from "next/navigation";

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export async function signupUser(formData: FormData) {
  try {
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim().toLowerCase();
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      redirect("/signup?error=missing");
    }

    if (password.length < 8) {
      redirect("/signup?error=short_password");
    }

    if (password !== confirmPassword) {
      redirect("/signup?error=mismatch");
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      redirect("/signup?error=exists");
    }

    // Hash password
    const hashedPassword = hashPassword(password);

    // Create user as 'user' role by default
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    // Send welcome email
    await transporter.sendMail({
      from: process.env.APP_EMAIL,
      to: email,
      subject: "Welcome to One World Hands NGO!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">Welcome to One World Hands!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for creating an account with us. We're excited to have you as part of our community dedicated to making a difference in the world.</p>
          
          <div style="background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p><strong>Your Account Details:</strong></p>
            <ul style="list-style: none; padding: 0;">
              <li>📧 <strong>Email:</strong> ${email}</li>
              <li>👤 <strong>Name:</strong> ${name}</li>
              <li>🔑 <strong>Role:</strong> User (Donor/Volunteer)</li>
            </ul>
          </div>

          <p>You can now log in to your account and start contributing to our mission.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000/login" style="display: inline-block; background-color: #0ea5e9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
              Log In Now
            </a>
          </div>

          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            If you didn't create this account, please ignore this email.
          </p>
          <p style="color: #999; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px;">
            One World Hands NGO | Making the world a better place
          </p>
        </div>
      `,
    });

    console.log("User registered successfully");
    redirect("/login?success=registered");
  } catch (error) {
    console.error("Error during signup:", error);
    redirect("/signup?error=server");
  }
}
