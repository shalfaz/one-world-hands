import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import { requireAdminSession } from "@/lib/auth/admin";
import { DashboardActionError } from "@/lib/dashboard/errors";

export const runtime = "nodejs";

function hasValidImageSignature(type: string, bytes: Buffer) {
  if (type === "image/jpeg") {
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (type === "image/png") {
    return bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  }
  return (
    type === "image/webp" &&
    bytes.length >= 12 &&
    bytes.toString("ascii", 0, 4) === "RIFF" &&
    bytes.toString("ascii", 8, 12) === "WEBP"
  );
}

export async function POST(request: NextRequest) {
  try {
    await requireAdminSession(request.cookies.get("owh_session")?.value);
  } catch (error) {
    if (error instanceof DashboardActionError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    console.error("Admin image upload authorization error:", error);
    return NextResponse.json(
      { error: "Could not verify administrator access. Check the database connection." },
      { status: 503 }
    );
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      {
        error:
          "Image storage is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
      },
      { status: 503 }
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      return NextResponse.json({ error: "Only JPG, PNG, and WebP images are supported" }, { status: 400 });
    }
    if (file.size === 0) {
      return NextResponse.json({ error: "The selected image is empty." }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be smaller than 5 MB" }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    if (!hasValidImageSignature(file.type, bytes)) {
      return NextResponse.json(
        { error: "The selected file is not a valid JPG, PNG, or WebP image." },
        { status: 400 }
      );
    }

    const upload = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "one-world-hands/content", resource_type: "image", transformation: [{ width: 1600, height: 1600, crop: "limit", quality: "auto", fetch_format: "auto" }] },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (!result?.secure_url) {
            reject(new Error("Cloudinary returned no image URL."));
          } else {
            resolve({ secure_url: result.secure_url, public_id: result.public_id });
          }
        }
      );
      Readable.from(bytes).pipe(stream);
    });

    return NextResponse.json(upload);
  } catch (error) {
    console.error("Admin image upload error:", error);
    return NextResponse.json(
      { error: "Image upload failed. Verify Cloudinary credentials and storage permissions." },
      { status: 502 }
    );
  }
}
