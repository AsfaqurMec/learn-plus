import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/getSession";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please choose an image file." },
        { status: 400 },
      );
    }
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WEBP, and GIF are supported." },
        { status: 400 },
      );
    }
    if (file.size <= 0 || file.size > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        { error: "Image size must be between 1 byte and 8 MB." },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    const uploaded = await uploadImageToCloudinary({
      dataUri,
      folder: "landing-page/admin",
    });

    return NextResponse.json({
      message: "Image uploaded.",
      imageUrl: uploaded.secure_url,
      publicId: uploaded.public_id,
      width: uploaded.width,
      height: uploaded.height,
      format: uploaded.format,
    });
  } catch (err) {
    console.error("[admin image upload]", err);
    return NextResponse.json(
      { error: "Could not upload image. Check Cloudinary configuration." },
      { status: 500 },
    );
  }
}
