"use server";

import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongoose";
import Program from "@/lib/models/Program";
import User from "@/lib/models/User";
import { redirect } from "next/navigation";

async function getUserFromCookie() {
  const cookieStore = await cookies();
  const email = cookieStore.get("owh_email")?.value;

  if (!email) {
    throw new Error("User not authenticated");
  }

  await connectToDatabase();
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function createProgram(formData: FormData) {
  try {
    const title = String(formData.get("title") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const status = String(formData.get("status") || "draft").trim();

    if (!title || !category || !location) {
      console.log("Missing required fields");
      throw new Error("All fields are required");
    }

    const user = await getUserFromCookie();

    await connectToDatabase();
    const newProgram = await Program.create({
      title,
      category,
      location,
      description,
      status,
      createdBy: user._id,
    });

    console.log("Program created:", newProgram);
    redirect("/dashboard/programs?success=created");
  } catch (error) {
    console.error("Create program error:", error);
    redirect("/dashboard/programs?error=failed");
  }
}

export async function updateProgram(formData: FormData) {
  try {
    const programId = String(formData.get("programId") || "").trim();
    const title = String(formData.get("title") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const status = String(formData.get("status") || "draft").trim();

    if (!programId || !title || !category || !location) {
      throw new Error("All fields are required");
    }

    await connectToDatabase();
    const updated = await Program.findByIdAndUpdate(
      programId,
      { title, category, location, description, status },
      { new: true, runValidators: true }
    );

    if (!updated) {
      throw new Error("Program not found");
    }

    console.log("Program updated:", updated);
    redirect("/dashboard/programs?success=updated");
  } catch (error) {
    console.error("Update program error:", error);
    redirect("/dashboard/programs?error=failed");
  }
}

export async function deleteProgram(programId: string) {
  try {
    if (!programId) {
      throw new Error("Program ID is required");
    }

    await connectToDatabase();
    const deleted = await Program.findByIdAndDelete(programId);

    if (!deleted) {
      throw new Error("Program not found");
    }

    console.log("Program deleted:", deleted);
    return { success: true, message: "Program deleted successfully" };
  } catch (error) {
    console.error("Delete program error:", error);
    throw error;
  }
}

export async function getPrograms() {
  try {
    await connectToDatabase();
    const programs = await Program.find()
      .lean()
      .sort({ createdAt: -1 });

    // Manually fetch user data and convert to plain objects
    const programsWithUsers = await Promise.all(
      programs.map(async (program: Record<string, unknown>) => {
        const user = await User.findById(program.createdBy).select("name email").lean();
        return {
          _id: String(program._id),
          title: program.title,
          description: program.description || "",
          category: program.category,
          location: program.location,
          status: program.status,
          createdBy: {
            _id: user ? String(user._id) : "",
            name: user?.name || "Unknown",
            email: user?.email || "unknown@example.com",
          },
          createdAt: String(program.createdAt),
          updatedAt: String(program.updatedAt),
        };
      })
    );

    return programsWithUsers;
  } catch (error) {
    console.error("Get programs error:", error);
    return [];
  }
}

export async function getProgramById(programId: string) {
  try {
    if (!programId) {
      throw new Error("Program ID is required");
    }

    await connectToDatabase();
    const program = await Program.findById(programId).lean();

    if (!program) {
      return null;
    }

    const user = await User.findById(program.createdBy).select("name email").lean();
    return {
      _id: String(program._id),
      title: program.title,
      description: program.description || "",
      category: program.category,
      location: program.location,
      status: program.status,
      createdBy: {
        _id: user ? String(user._id) : "",
        name: user?.name || "Unknown",
        email: user?.email || "unknown@example.com",
      },
      createdAt: String(program.createdAt),
      updatedAt: String(program.updatedAt),
    };
  } catch (error) {
    console.error("Get program error:", error);
    return null;
  }
}
