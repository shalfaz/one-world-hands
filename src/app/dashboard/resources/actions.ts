"use server";

import connectToDatabase from "@/lib/mongoose";
import Resource from "@/lib/models/Resource";
import User from "@/lib/models/User";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { requireAdminUser } from "@/lib/auth/admin";
import {
  DashboardActionError,
  getDashboardActionError,
} from "@/lib/dashboard/errors";

type ActionResult = { success: true } | { success: false; error: string };

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(file: File, isPhoto = false): Promise<string> {
  try {
    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      throw new DashboardActionError(
        "File storage is not configured. Set the Cloudinary environment variables."
      );
    }

    if (file.size > (isPhoto ? 5 : 10) * 1024 * 1024) {
      throw new DashboardActionError(
        isPhoto ? "Photos must be smaller than 5 MB." : "Files must be smaller than 10 MB."
      );
    }

    if (
      isPhoto &&
      !["image/jpeg", "image/png", "image/webp"].includes(file.type)
    ) {
      throw new DashboardActionError("Photos must be JPG, PNG, or WebP images.");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "owh-resources",
          public_id: `${Date.now()}-${file.name}`,
        },
        (error: unknown, result: Record<string, unknown> | undefined) => {
          if (error) reject(error);
          else if (typeof result?.secure_url === "string") resolve(result.secure_url);
          else reject(new Error("Cloudinary returned no file URL."));
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    if (error instanceof DashboardActionError) {
      throw error;
    }
    throw new DashboardActionError(
      "Cloudinary could not store the file. Verify the credentials and storage permissions."
    );
  }
}

export async function createResource(formData: FormData): Promise<ActionResult> {
  try {
    const title = String(formData.get("title") || "").trim();
    const type = String(formData.get("type") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const status = String(formData.get("status") || "draft").trim();
    const youtubeLink = String(formData.get("youtubeLink") || "").trim();
    const content = String(formData.get("content") || "").trim();
    const file = formData.get("file") as File | null;

    if (!title || !type) {
      throw new DashboardActionError("Resource title and type are required.");
    }

    const user = await requireAdminUser();

    await connectToDatabase();

    let fileUrl = "";
    let fileType = "";

    // Upload file if provided - handle photo and document types
    if (file && file.size > 0) {
      if (type === "document" || type === "report") {
        fileUrl = await uploadToCloudinary(file);
        fileType = file.type.split("/").pop() || "file";
      } else if (type === "photo") {
        fileUrl = await uploadToCloudinary(file, true);
        fileType = "image";
      }
    }

    await Resource.create({
      title,
      type,
      description,
      status,
      youtubeLink: type === "webinar" ? youtubeLink : "",
      content: type === "blog" ? content : "",
      fileUrl,
      fileType,
      createdBy: user._id,
    });

    revalidateResourcePaths();
    return { success: true };
  } catch (error) {
    console.error("Create resource error:", error);
    return {
      success: false,
      error: getDashboardActionError(error, "Could not create the resource. Please try again."),
    };
  }
}

export async function updateResource(formData: FormData): Promise<ActionResult> {
  try {
    const resourceId = String(formData.get("resourceId") || "").trim();
    const title = String(formData.get("title") || "").trim();
    const type = String(formData.get("type") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const status = String(formData.get("status") || "draft").trim();
    const youtubeLink = String(formData.get("youtubeLink") || "").trim();
    const content = String(formData.get("content") || "").trim();
    const file = formData.get("file") as File | null;

    if (!resourceId || !title || !type) {
      throw new DashboardActionError("Resource ID, title, and type are required.");
    }

    await requireAdminUser();
    await connectToDatabase();

    let updateData: Record<string, unknown> = {
      title,
      type,
      description,
      status,
      youtubeLink: type === "webinar" ? youtubeLink : "",
      content: type === "blog" ? content : "",
    };

    // Upload new file if provided - handle photo, document, and report types
    if (file && file.size > 0) {
      if (type === "document" || type === "report") {
        const fileUrl = await uploadToCloudinary(file);
        const fileType = file.type.split("/").pop() || "file";
        updateData = { ...updateData, fileUrl, fileType };
      } else if (type === "photo") {
        const fileUrl = await uploadToCloudinary(file, true);
        const fileType = "image";
        updateData = { ...updateData, fileUrl, fileType };
      }
    }

    const updated = await Resource.findByIdAndUpdate(resourceId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      throw new DashboardActionError("Resource not found.");
    }

    revalidateResourcePaths();
    return { success: true };
  } catch (error) {
    console.error("Update resource error:", error);
    return {
      success: false,
      error: getDashboardActionError(error, "Could not save the resource. Please try again."),
    };
  }
}

export async function deleteResource(resourceId: string): Promise<ActionResult> {
  try {
    if (!resourceId) {
      throw new DashboardActionError("Resource ID is required.");
    }

    await requireAdminUser();
    await connectToDatabase();
    const deleted = await Resource.findByIdAndDelete(resourceId);

    if (!deleted) {
      throw new DashboardActionError("Resource not found.");
    }

    revalidateResourcePaths();
    return { success: true };
  } catch (error) {
    console.error("Delete resource error:", error);
    return {
      success: false,
      error: getDashboardActionError(error, "Could not delete the resource. Please try again."),
    };
  }
}

export async function getResources() {
  await requireAdminUser();
  await connectToDatabase();
  const resources = await Resource.find().lean().sort({ createdAt: -1 });

  return Promise.all(
    resources.map(async (resource: Record<string, unknown>) => {
      const user = await User.findById(resource.createdBy).select("name email").lean();
      return {
        _id: String(resource._id),
        title: resource.title,
        description: resource.description || "",
        type: resource.type,
        status: resource.status,
        youtubeLink: resource.youtubeLink || "",
        content: resource.content || "",
        fileUrl: resource.fileUrl || "",
        fileType: resource.fileType || "",
        createdBy: {
          _id: user ? String(user._id) : "",
          name: user?.name || "Unknown",
          email: user?.email || "unknown@example.com",
        },
        createdAt: String(resource.createdAt),
        updatedAt: String(resource.updatedAt),
      };
    })
  );
}

export async function getResourceById(resourceId: string) {
  try {
    await requireAdminUser();
    if (!resourceId) {
      throw new DashboardActionError("Resource ID is required.");
    }

    await connectToDatabase();
    const resource = await Resource.findById(resourceId).lean();

    if (!resource) {
      return null;
    }

    const user = await User.findById(resource.createdBy)
      .select("name email")
      .lean();

    return {
      _id: String(resource._id),
      title: resource.title,
      description: resource.description || "",
      type: resource.type,
      status: resource.status,
      youtubeLink: resource.youtubeLink || "",
      content: resource.content || "",
      fileUrl: resource.fileUrl || "",
      fileType: resource.fileType || "",
      createdBy: {
        _id: user ? String(user._id) : "",
        name: user?.name || "Unknown",
        email: user?.email || "unknown@example.com",
      },
      createdAt: String(resource.createdAt),
      updatedAt: String(resource.updatedAt),
    };
  } catch (error) {
    console.error("Get resource error:", error);
    return null;
  }
}

function revalidateResourcePaths() {
  revalidatePath("/dashboard/resources");
  revalidatePath("/resources");
  revalidatePath("/");
}
