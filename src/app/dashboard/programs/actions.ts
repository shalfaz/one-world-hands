"use server";

import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongoose";
import Program from "@/lib/models/Program";
import User from "@/lib/models/User";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  getSessionUserId,
  isAuthorizedAdminSession,
} from "@/lib/auth/session";

async function getAdminFromSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("owh_session")?.value;

  if (!sessionToken) {
    throw new Error("User not authenticated");
  }

  const userId = getSessionUserId(sessionToken);
  if (!userId) {
    throw new Error("Invalid session");
  }

  await connectToDatabase();
  const user = await User.findById(userId).select("_id password role");

  if (!user) {
    throw new Error("User not found");
  }

  if (
    !isAuthorizedAdminSession(sessionToken, {
      _id: String(user._id),
      password: user.password,
      role: user.role,
    })
  ) {
    throw new Error("Administrator authorization required");
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

    const user = await getAdminFromSession();

    await connectToDatabase();
    if (
      title.toLocaleLowerCase("en") === "merit scholarship program" &&
      (await Program.exists({ title: /^Merit Scholarship Program$/i }))
    ) {
      throw new Error("Merit Scholarship Program already exists");
    }

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

    await getAdminFromSession();
    await connectToDatabase();
    const existing = await Program.findById(programId).select("title status");
    if (
      existing?.title === "Merit Scholarship Program" &&
      existing.status === "draft" &&
      status === "active"
    ) {
      throw new Error(
        "Publish the scholarship through its approved-content publishing control"
      );
    }

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

    await getAdminFromSession();
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

export async function publishMeritScholarship(
  programId: string,
  approvedDescription: string,
  approvalConfirmed: boolean
) {
  if (!approvalConfirmed) {
    throw new Error("NGO content approval must be confirmed");
  }
  if (!/^[a-f\d]{24}$/i.test(programId)) {
    throw new Error("Invalid program ID");
  }
  if (typeof approvedDescription !== "string") {
    throw new Error("Approved program content is required");
  }

  const admin = await getAdminFromSession();
  await connectToDatabase();
  const published = await Program.findOneAndUpdate(
    {
      _id: programId,
      title: "Merit Scholarship Program",
      status: "draft",
      description: approvedDescription,
    },
    {
      $set: {
        status: "active",
        approvedBy: admin._id,
        approvedAt: new Date(),
      },
    },
    { new: true, runValidators: true }
  );

  if (!published) {
    throw new Error(
      "The scholarship draft changed or is no longer publishable; reload and review it again"
    );
  }

  revalidatePath("/programs");
  revalidatePath("/");
  revalidatePath(`/programs/${programId}`);

  return { success: true };
}

export async function updateMeritScholarshipDraft(
  programId: string,
  description: string
) {
  if (!/^[a-f\d]{24}$/i.test(programId)) {
    throw new Error("Invalid program ID");
  }
  if (typeof description !== "string" || !description.trim()) {
    throw new Error("A draft description is required");
  }

  await getAdminFromSession();
  await connectToDatabase();
  const updated = await Program.findOneAndUpdate(
    {
      _id: programId,
      title: "Merit Scholarship Program",
      status: "draft",
    },
    { $set: { description: description.trim() } },
    { new: true, runValidators: true }
  );

  if (!updated) {
    throw new Error("The scholarship draft is no longer editable");
  }

  revalidatePath("/dashboard/programs");
  return { success: true };
}

function getDefaultPrograms() {
  const now = new Date().toISOString();

  return [
    {
      _id: "food-assistance",
      title: "Food Assistance Program",
      description: "Providing food aid to vulnerable families.",
      category: "relief",
      location: "Global",
      status: "active",
      createdBy: {
        _id: "",
        name: "One World Hands",
        email: "",
      },
      createdAt: now,
      updatedAt: now,
    },
    {
      _id: "medical-assistance",
      title: "Medical Assistance Program",
      description: "Healthcare and medical support for communities.",
      category: "health",
      location: "Global",
      status: "active",
      createdBy: {
        _id: "",
        name: "One World Hands",
        email: "",
      },
      createdAt: now,
      updatedAt: now,
    },
  ];
}

export async function getPrograms() {
  await getAdminFromSession();

  try {
    if (!process.env.MONGO_URI && !process.env.MONGODB_URI) {
      return getDefaultPrograms();
    }

    try {
      await connectToDatabase();
    } catch (dbError) {
      console.warn(
        "Database connection failed in getPrograms, falling back to defaults:",
        dbError instanceof Error ? dbError.message : String(dbError)
      );
      return getDefaultPrograms();
    }

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
    console.error("Unexpected error in getPrograms:", error);
    return getDefaultPrograms();
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
