"use server";

import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase-server";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function safeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9.-]/g, "-");
}

async function uploadSingleFile(file: File) {
  const bucket = "resources";
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = `uploads/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}-${safeFileName(file.name)}`;

  const { error: uploadError } = await supabaseServer.storage
    .from(bucket)
    .upload(filePath, buffer, {
      contentType: file.type || undefined,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = supabaseServer.storage.from(bucket).getPublicUrl(filePath);

  return {
    fileUrl: data.publicUrl,
    storagePath: filePath,
  };
}

async function uploadMultipleFiles(files: File[]) {
  const uploaded = [];

  for (const file of files) {
    if (!file || file.size === 0) continue;
    const result = await uploadSingleFile(file);
    uploaded.push(result);
  }

  return uploaded;
}

export async function addFund(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const impactSummary = String(formData.get("impactSummary") || "").trim();

  if (!name || !description || !category) return;

  const id = slugify(name);

  await supabaseServer.from("funds").upsert({
    id,
    name,
    description,
    category,
    impact_summary: impactSummary,
    status: "active",
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/funds");
  revalidatePath("/");
  revalidatePath("/donation-funds");
  revalidatePath(`/donation-funds/${id}`);
}

export async function removeFund(formData: FormData) {
  const id = String(formData.get("id") || "").trim();
  if (!id) return;

  await supabaseServer.from("funds").delete().eq("id", id);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/funds");
  revalidatePath("/");
  revalidatePath("/donation-funds");
  revalidatePath(`/donation-funds/${id}`);
}

export async function addProgram(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const status = String(formData.get("status") || "").trim() || "active";

  if (!title || !category || !location) return;

  await supabaseServer.from("programs").insert({
    title,
    category,
    location,
    status,
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/programs");
}

export async function updateProgram(formData: FormData) {
  const id = String(formData.get("id") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const status = String(formData.get("status") || "").trim() || "active";

  if (!id || !title || !category || !location) return;

  await supabaseServer
    .from("programs")
    .update({
      title,
      category,
      location,
      status,
    })
    .eq("id", id);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/programs");
}

export async function toggleProgramStatus(formData: FormData) {
  const id = String(formData.get("id") || "").trim();
  const nextStatus = String(formData.get("nextStatus") || "").trim();

  if (!id || !nextStatus) return;

  await supabaseServer
    .from("programs")
    .update({ status: nextStatus })
    .eq("id", id);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/programs");
}

export async function removeProgram(formData: FormData) {
  const id = String(formData.get("id") || "").trim();
  if (!id) return;

  await supabaseServer.from("programs").delete().eq("id", id);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/programs");
}

export async function addResource(formData: FormData) {
  try {
    const title = String(formData.get("title") || "").trim();
    const type = String(formData.get("type") || "").trim();
    const status = String(formData.get("status") || "").trim() || "draft";
    const externalUrl = String(formData.get("externalUrl") || "").trim();

    const files = formData
      .getAll("files")
      .filter((item): item is File => item instanceof File && item.size > 0);

    if (!title || !type) return;

    let fileUrls: string[] = [];
    let storagePaths: string[] = [];

    if (files.length > 0) {
      const uploaded = await uploadMultipleFiles(files);
      fileUrls = uploaded.map((item) => item.fileUrl);
      storagePaths = uploaded.map((item) => item.storagePath);
    } else if (externalUrl) {
      fileUrls = [externalUrl];
    }

    const { error } = await supabaseServer.from("resources").insert({
      title,
      type,
      status,
      file_url: fileUrls[0] || "",
      storage_path: storagePaths[0] || "",
      file_urls: fileUrls,
      storage_paths: storagePaths,
    });

    if (error) {
      console.error("ADD RESOURCE DB ERROR:", error);
      throw new Error(error.message);
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/resources");
    revalidatePath("/resources");
  } catch (error) {
    console.error("ADD RESOURCE ACTION ERROR:", error);
    throw error;
  }
}

export async function updateResource(formData: FormData) {
  try {
    const id = String(formData.get("id") || "").trim();
    const title = String(formData.get("title") || "").trim();
    const type = String(formData.get("type") || "").trim();
    const status = String(formData.get("status") || "").trim() || "draft";
    const externalUrl = String(formData.get("externalUrl") || "").trim();

    const existingStoragePathsRaw = String(
      formData.get("existingStoragePaths") || "[]"
    );
    const existingFileUrlsRaw = String(
      formData.get("existingFileUrls") || "[]"
    );

    const files = formData
      .getAll("files")
      .filter((item): item is File => item instanceof File && item.size > 0);

    if (!id || !title || !type) return;

    let existingStoragePaths: string[] = [];
    let existingFileUrls: string[] = [];

    try {
      existingStoragePaths = JSON.parse(existingStoragePathsRaw || "[]");
    } catch {
      existingStoragePaths = [];
    }

    try {
      existingFileUrls = JSON.parse(existingFileUrlsRaw || "[]");
    } catch {
      existingFileUrls = [];
    }

    let finalFileUrls = [...existingFileUrls];
    let finalStoragePaths = [...existingStoragePaths];

    if (externalUrl && !finalFileUrls.includes(externalUrl)) {
      finalFileUrls.push(externalUrl);
    }

    if (files.length > 0) {
      const uploaded = await uploadMultipleFiles(files);
      finalFileUrls = [
        ...finalFileUrls,
        ...uploaded.map((item) => item.fileUrl),
      ];
      finalStoragePaths = [
        ...finalStoragePaths,
        ...uploaded.map((item) => item.storagePath),
      ];
    }

    const { error } = await supabaseServer
      .from("resources")
      .update({
        title,
        type,
        status,
        file_url: finalFileUrls[0] || "",
        storage_path: finalStoragePaths[0] || "",
        file_urls: finalFileUrls,
        storage_paths: finalStoragePaths,
      })
      .eq("id", id);

    if (error) {
      console.error("UPDATE RESOURCE DB ERROR:", error);
      throw new Error(error.message);
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/resources");
    revalidatePath("/resources");
  } catch (error) {
    console.error("UPDATE RESOURCE ACTION ERROR:", error);
    throw error;
  }
}

export async function removeSingleResourceFile(formData: FormData) {
  try {
    const id = String(formData.get("id") || "").trim();
    const fileUrlToRemove = String(formData.get("fileUrl") || "").trim();
    const storagePathToRemove = String(formData.get("storagePath") || "").trim();

    if (!id || !fileUrlToRemove) return;

    const { data: resource, error: fetchError } = await supabaseServer
      .from("resources")
      .select("file_urls, storage_paths")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("REMOVE SINGLE FILE FETCH ERROR:", fetchError);
      throw new Error(fetchError.message);
    }

    const fileUrls = Array.isArray(resource?.file_urls) ? resource.file_urls : [];
    const storagePaths = Array.isArray(resource?.storage_paths)
      ? resource.storage_paths
      : [];

    const updatedFileUrls = fileUrls.filter((url) => url !== fileUrlToRemove);
    const updatedStoragePaths = storagePaths.filter(
      (path) => path !== storagePathToRemove
    );

    if (storagePathToRemove) {
      const { error: storageError } = await supabaseServer.storage
        .from("resources")
        .remove([storagePathToRemove]);

      if (storageError) {
        console.error("REMOVE SINGLE FILE STORAGE ERROR:", storageError);
      }
    }

    const { error: updateError } = await supabaseServer
      .from("resources")
      .update({
        file_url: updatedFileUrls[0] || "",
        storage_path: updatedStoragePaths[0] || "",
        file_urls: updatedFileUrls,
        storage_paths: updatedStoragePaths,
      })
      .eq("id", id);

    if (updateError) {
      console.error("REMOVE SINGLE FILE UPDATE ERROR:", updateError);
      throw new Error(updateError.message);
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/resources");
    revalidatePath("/resources");
  } catch (error) {
    console.error("REMOVE SINGLE RESOURCE FILE ACTION ERROR:", error);
    throw error;
  }
}

export async function removeResource(formData: FormData) {
  try {
    const id = String(formData.get("id") || "").trim();
    if (!id) return;

    const { data: resource, error: fetchError } = await supabaseServer
      .from("resources")
      .select("storage_paths, storage_path")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("REMOVE RESOURCE FETCH ERROR:", fetchError);
      throw new Error(fetchError.message);
    }

    const storagePaths = Array.isArray(resource?.storage_paths)
      ? resource.storage_paths
      : [];

    const singleStoragePath =
      typeof resource?.storage_path === "string" ? resource.storage_path : "";

    const allPaths = [...storagePaths];
    if (singleStoragePath && !allPaths.includes(singleStoragePath)) {
      allPaths.push(singleStoragePath);
    }

    if (allPaths.length > 0) {
      const { error: storageError } = await supabaseServer.storage
        .from("resources")
        .remove(allPaths);

      if (storageError) {
        console.error("REMOVE RESOURCE STORAGE ERROR:", storageError);
      }
    }

    const { error: deleteError } = await supabaseServer
      .from("resources")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("REMOVE RESOURCE DELETE ERROR:", deleteError);
      throw new Error(deleteError.message);
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/resources");
    revalidatePath("/resources");
  } catch (error) {
    console.error("REMOVE RESOURCE ACTION ERROR:", error);
    throw error;
  }
}