"use server";

import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongoose";
import Resource from "@/lib/models/Resource";
import User from "@/lib/models/User";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

async function uploadToCloudinary(file: File): Promise<string> {
  try {
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
          else resolve((result?.secure_url as string) || "");
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}

export async function createResource(formData: FormData) {
  try {
    const title = String(formData.get("title") || "").trim();
    const type = String(formData.get("type") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const status = String(formData.get("status") || "draft").trim();
    const youtubeLink = String(formData.get("youtubeLink") || "").trim();
    const content = String(formData.get("content") || "").trim();
    const file = formData.get("file") as File | null;

    if (!title || !type) {
      throw new Error("Title and type are required");
    }

    const user = await getUserFromCookie();

    await connectToDatabase();

    let fileUrl = "";
    let fileType = "";

    // Upload file if provided - handle photo and document types
    if (file && file.size > 0) {
      if (type === "document" || type === "report") {
        fileUrl = await uploadToCloudinary(file);
        fileType = file.type.split("/").pop() || "file";
      } else if (type === "photo") {
        fileUrl = await uploadToCloudinary(file);
        fileType = "image";
      }
    }

    const newResource = await Resource.create({
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

    console.log("Resource created:", newResource);
    redirect("/dashboard/resources?success=created");
  } catch (error) {
    console.error("Create resource error:", error);
    redirect("/dashboard/resources?error=failed");
  }
}

export async function updateResource(formData: FormData) {
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
      throw new Error("Resource ID, title and type are required");
    }

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
        const fileUrl = await uploadToCloudinary(file);
        const fileType = "image";
        updateData = { ...updateData, fileUrl, fileType };
      }
    }

    const updated = await Resource.findByIdAndUpdate(resourceId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      throw new Error("Resource not found");
    }

    console.log("Resource updated:", updated);
    redirect("/dashboard/resources?success=updated");
  } catch (error) {
    console.error("Update resource error:", error);
    redirect("/dashboard/resources?error=failed");
  }
}

export async function deleteResource(resourceId: string) {
  try {
    if (!resourceId) {
      throw new Error("Resource ID is required");
    }

    await connectToDatabase();
    const deleted = await Resource.findByIdAndDelete(resourceId);

    if (!deleted) {
      throw new Error("Resource not found");
    }

    console.log("Resource deleted:", deleted);
    return { success: true, message: "Resource deleted successfully" };
  } catch (error) {
    console.error("Delete resource error:", error);
    throw error;
  }
}

export async function getResources() {
  try {
    await connectToDatabase();
    const resources = await Resource.find()
      .lean()
      .sort({ createdAt: -1 });

    // Manually fetch user data and convert to plain objects
    const resourcesWithUsers = await Promise.all(
      resources.map(async (resource: Record<string, unknown>) => {
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
      })
    );

    return resourcesWithUsers;
  } catch (error) {
    console.error("Get resources error:", error);
    return [];
  }
}

export async function getResourceById(resourceId: string) {
  try {
    if (!resourceId) {
      throw new Error("Resource ID is required");
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
