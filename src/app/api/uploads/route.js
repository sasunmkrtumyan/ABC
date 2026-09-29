import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabase/server";
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

function readAccessToken(request, formData) {
  const fromHeader = String(request.headers.get("authorization") || "").trim();
  const fromForm = String(formData.get("access_token") || "").trim();
  return fromHeader || fromForm;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const typeValue = safeSegment(formData.get("type"), "");
    const entityKey = safeSegment(formData.get("key"), "item");
    const file = formData.get("file");
    const accessToken = readAccessToken(request, formData);

    if (!ALLOWED_TYPES.has(typeValue)) {
      return NextResponse.json({ message: "Invalid upload type." }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "Missing file." }, { status: 400 });
    }

    if (!String(file.type || "").toLowerCase().startsWith("image/")) {
      return NextResponse.json({ message: "Only image uploads are allowed." }, { status: 400 });
    }

    const folder = `${typeValue}s`;
    const serviceClient = createSupabaseServiceClient();

    if (!accessToken) {
      if (!serviceClient) {
        return NextResponse.json(
          { message: "Նիստը չի գտնվել։ Թարմացրեք էջը, նորից մուտք գործեք և կրկին փորձեք։" },
          { status: 401 }
        );
      }
      const publicUrl = await uploadPublicImageWithClient(serviceClient, file, folder, entityKey);
      return NextResponse.json({ path: publicUrl }, { status: 201 });
    }

    const userClient = createSupabaseServerClient({ accessToken });
    const { data: userData, error: userError } = await userClient.auth.getUser();
    if (userError || !userData?.user?.id) {
      return NextResponse.json(
        { message: "Նիստը սխալ է կամ սպառվել է։ Նորից մուտք գործեք։" },
        { status: 401 }
      );
    }

    const { data: adminRow, error: adminError } = await userClient
      .from("admins")
      .select("user_id")
      .eq("user_id", userData.user.id)
      .maybeSingle();

    if (adminError || !adminRow) {
      return NextResponse.json(
        {
          message: `Դուք չունեք admin write permission Supabase-ում։ SQL Editor-ում կատարեք՝ insert into public.admins (user_id) values ('${userData.user.id}') on conflict (user_id) do nothing;`,
        },
        { status: 403 }
      );
    }

    const uploader = serviceClient || userClient;
    const publicUrl = await uploadPublicImageWithClient(uploader, file, folder, entityKey);

    return NextResponse.json({ path: publicUrl }, { status: 201 });
  } catch (error) {
    console.error("Upload failed", error);
    return NextResponse.json(
      { message: `Failed to upload file. ${String(error?.message || "")}`.trim() },
      { status: 500 }
    );
  }
}
