import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  const session = request.cookies.get("owh_session")?.value;
  const role = request.cookies.get("owh_role")?.value;
  if (!session || role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      return NextResponse.json({ error: "Only JPG, PNG, and WebP images are supported" }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be smaller than 5 MB" }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const upload = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "one-world-hands/content", resource_type: "image", transformation: [{ width: 1600, height: 1600, crop: "limit", quality: "auto", fetch_format: "auto" }] },
        (error, result) => error || !result ? reject(error) : resolve({ secure_url: result.secure_url, public_id: result.public_id })
      );
      Readable.from(bytes).pipe(stream);
    });

    return NextResponse.json(upload);
  } catch (error) {
    console.error("Admin image upload error:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
