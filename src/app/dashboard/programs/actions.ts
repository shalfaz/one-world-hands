"use server";

import connectToDatabase from "@/lib/mongoose";
import Program from "@/lib/models/Program";
import User from "@/lib/models/User";
import { revalidatePath } from "next/cache";
import { requireAdminUser } from "@/lib/auth/admin";
import {
  DashboardActionError,
  getDashboardActionError,
} from "@/lib/dashboard/errors";

type ActionResult = { success: true } | { success: false; error: string };
type ProgramStatus = "active" | "inactive" | "draft" | "completed" | "archived";

type ProgramRecord = {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: ProgramStatus;
  imageUrl: string;
  objectives: string;
  startDate: string;
  endDate: string;
  published: boolean;
  createdBy: { _id: string; name: string; email: string };
  createdAt: string;
  updatedAt: string;
};

export async function createProgram(formData: FormData): Promise<ActionResult> {
  try {
    const title = String(formData.get("title") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const status = String(formData.get("status") || "draft").trim();
    const imageUrl = String(formData.get("imageUrl") || "").trim();
    const objectives = String(formData.get("objectives") || "").trim();
    const startDate = String(formData.get("startDate") || "").trim();
    const endDate = String(formData.get("endDate") || "").trim();
    const published = String(formData.get("published") || "false") === "true";

    if (!title || !category || !location) {
      throw new DashboardActionError("Title, category, and location are required.");
    }

    const user = await requireAdminUser();

    await connectToDatabase();
    if (
      title.toLocaleLowerCase("en") === "merit scholarship program" &&
      (await Program.exists({ title: /^Merit Scholarship Program$/i }))
    ) {
      throw new DashboardActionError("Merit Scholarship Program already exists.");
    }

    const newProgram = await Program.create({
      title,
      category,
      location,
      description,
      status,
      imageUrl,
      objectives,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      published,
      createdBy: user._id,
    });

    revalidateProgramPaths(String(newProgram._id));
    return { success: true };
  } catch (error) {
    console.error("Create program error:", error);
    return {
      success: false,
      error: getDashboardActionError(error, "Could not create the program. Please try again."),
    };
  }
}

export async function updateProgram(formData: FormData): Promise<ActionResult> {
  try {
    const programId = String(formData.get("programId") || "").trim();
    const title = String(formData.get("title") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const status = String(formData.get("status") || "draft").trim();
    const imageUrl = String(formData.get("imageUrl") || "").trim();
    const objectives = String(formData.get("objectives") || "").trim();
    const startDate = String(formData.get("startDate") || "").trim();
    const endDate = String(formData.get("endDate") || "").trim();
    const published = String(formData.get("published") || "false") === "true";

    if (!programId || !title || !category || !location) {
      throw new DashboardActionError("Program ID, title, category, and location are required.");
    }

    await requireAdminUser();
    await connectToDatabase();

    const parsedStartDate = startDate ? new Date(startDate) : null;
    const parsedEndDate = endDate ? new Date(endDate) : null;
    if (
      (parsedStartDate && Number.isNaN(parsedStartDate.getTime())) ||
      (parsedEndDate && Number.isNaN(parsedEndDate.getTime()))
    ) {
      throw new DashboardActionError("Enter valid program dates.");
    }

    const updated = await Program.findByIdAndUpdate(
      programId,
      {
        title,
        category,
        location,
        description,
        status,
        imageUrl,
        objectives,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        published,
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      throw new DashboardActionError("Program not found.");
    }

    revalidateProgramPaths(programId);
    return { success: true };
  } catch (error) {
    console.error("Update program error:", error);
    return {
      success: false,
      error: getDashboardActionError(error, "Could not save the program. Please try again."),
    };
  }
}

export async function deleteProgram(programId: string): Promise<ActionResult> {
  try {
    if (!programId) {
      throw new DashboardActionError("Program ID is required.");
    }

    await requireAdminUser();
    await connectToDatabase();
    const deleted = await Program.findByIdAndDelete(programId);

    if (!deleted) {
      throw new DashboardActionError("Program not found.");
    }

    revalidateProgramPaths(programId);
    return { success: true };
  } catch (error) {
    console.error("Delete program error:", error);
    return {
      success: false,
      error: getDashboardActionError(error, "Could not delete the program. Please try again."),
    };
  }
}

export async function updateProgramStatus(programId: string, status: string, published?: boolean) {
  await requireAdminUser();
  await connectToDatabase();
  const allowedStatuses = ["active", "inactive", "draft", "completed", "archived"];
  if (!allowedStatuses.includes(status)) throw new Error("Invalid program status");
  const update: Record<string, unknown> = { status };
  if (typeof published === "boolean") update.published = published;
  const program = await Program.findByIdAndUpdate(programId, update, { new: true, runValidators: true });
  if (!program) throw new Error("Program not found");
  revalidatePath("/dashboard/programs");
  revalidatePath("/programs");
  revalidatePath("/");
  return { success: true };
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

  const admin = await requireAdminUser();
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
        published: true,
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

  revalidatePath("/dashboard/programs");
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

  await requireAdminUser();
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

export async function getPrograms(): Promise<ProgramRecord[]> {
  await requireAdminUser();
  await connectToDatabase();
  const programs = await Program.find().lean().sort({ createdAt: -1 });

  return Promise.all(
    programs.map(async (program: Record<string, unknown>) => {
      const user = await User.findById(program.createdBy).select("name email").lean();
      return {
        _id: String(program._id),
        title: String(program.title || ""),
        description: String(program.description || ""),
        category: String(program.category || ""),
        location: String(program.location || ""),
        status:
          program.status === "active" ||
          program.status === "inactive" ||
          program.status === "draft" ||
          program.status === "completed" ||
          program.status === "archived"
            ? program.status
            : "draft",
        imageUrl: String(program.imageUrl || ""),
        objectives: String(program.objectives || ""),
        startDate: program.startDate instanceof Date ? program.startDate.toISOString() : "",
        endDate: program.endDate instanceof Date ? program.endDate.toISOString() : "",
        published: Boolean(program.published ?? program.status === "active"),
        createdBy: {
          _id: user ? String(user._id) : "",
          name: String(user?.name || "Unknown"),
          email: String(user?.email || "unknown@example.com"),
        },
        createdAt: String(program.createdAt),
        updatedAt: String(program.updatedAt),
      };
    })
  );
}

export async function getProgramById(programId: string) {
  try {
    await requireAdminUser();
    if (!programId) {
      throw new DashboardActionError("Program ID is required.");
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
      imageUrl: program.imageUrl || "",
      objectives: program.objectives || "",
      startDate: program.startDate instanceof Date ? program.startDate.toISOString() : "",
      endDate: program.endDate instanceof Date ? program.endDate.toISOString() : "",
      published: Boolean(program.published ?? program.status === "active"),
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

function revalidateProgramPaths(programId: string) {
  revalidatePath("/dashboard/programs");
  revalidatePath("/programs");
  revalidatePath(`/programs/${programId}`);
  revalidatePath("/");
}
