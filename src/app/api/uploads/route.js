import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { uploadPublicImageWithClient } from "@/lib/supabase/storage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ALLOWED_TYPES = new Set(["partner", "event"]);

function safeSegment(value, fallback = "file") {
  return (
    String(value || fallback)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-_]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || fallback
  );
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const typeValue = safeSegment(formData.get("type"), "");
    const entityKey = safeSegment(formData.get("key"), "item");
    const file = formData.get("file");
    const accessToken = request.headers.get("authorization");

    if (!ALLOWED_TYPES.has(typeValue)) {
      return NextResponse.json({ message: "Invalid upload type." }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "Missing file." }, { status: 400 });
    }

    if (!String(file.type || "").toLowerCase().startsWith("image/")) {
      return NextResponse.json({ message: "Only image uploads are allowed." }, { status: 400 });
    }

    if (!accessToken) {
      return NextResponse.json({ message: "Missing authorization." }, { status: 401 });
    }

    const supabase = createSupabaseServerClient({ accessToken });
    const folder = `${typeValue}s`;
    const publicUrl = await uploadPublicImageWithClient(supabase, file, folder, entityKey);

    return NextResponse.json({ path: publicUrl }, { status: 201 });
  } catch (error) {
    console.error("Upload failed", error);
    return NextResponse.json(
      { message: `Failed to upload file. ${String(error?.message || "")}`.trim() },
      { status: 500 }
    );
  }
}
