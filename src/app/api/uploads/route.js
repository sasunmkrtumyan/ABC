import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ALLOWED_TYPES = new Set(["partner", "event"]);

function safeSegment(value, fallback = "file") {
  return String(value || fallback)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || fallback;
}

function resolveExtension(file) {
  const fileName = String(file?.name || "");
  const byName = path.extname(fileName).replace(".", "").toLowerCase();
  if (byName) return byName;

  const mime = String(file?.type || "").toLowerCase();
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  if (mime === "image/avif") return "avif";
  return "bin";
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const typeValue = safeSegment(formData.get("type"), "");
    const entityKey = safeSegment(formData.get("key"), "item");
    const file = formData.get("file");

    if (!ALLOWED_TYPES.has(typeValue)) {
      return NextResponse.json({ message: "Invalid upload type." }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "Missing file." }, { status: 400 });
    }

    if (!String(file.type || "").toLowerCase().startsWith("image/")) {
      return NextResponse.json({ message: "Only image uploads are allowed." }, { status: 400 });
    }

    const extension = resolveExtension(file);
    const fileName = `${entityKey}-${Date.now()}-${randomUUID().slice(0, 8)}.${extension}`;
    const targetDir = path.join(process.cwd(), "public", "uploads", `${typeValue}s`);
    const absoluteFilePath = path.join(targetDir, fileName);
    const publicPath = `/uploads/${typeValue}s/${fileName}`;

    await fs.mkdir(targetDir, { recursive: true });
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(absoluteFilePath, Buffer.from(arrayBuffer));

    return NextResponse.json({ path: publicPath }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to upload file. ${String(error?.message || "")}`.trim() },
      { status: 500 }
    );
  }
}
