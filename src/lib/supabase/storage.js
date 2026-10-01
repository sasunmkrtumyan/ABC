import { supabase } from "./client";

const BUCKET = "partner-logos";

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

function resolveExtension(file) {
  const fileName = String(file?.name || "");
  const byName = fileName.includes(".") ? fileName.split(".").pop().toLowerCase() : "";
  if (byName && /^[a-z0-9]+$/.test(byName) && byName.length <= 8) return byName;

  const mime = String(file?.type || "").toLowerCase();
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  if (mime === "image/avif") return "avif";
  return "bin";
}

async function uploadPublicImage(file, folder, key, client = supabase) {
  if (!file) throw new Error("Missing file");

  const extension = resolveExtension(file);
  const objectPath = `${folder}/${safeSegment(key, folder)}-${Date.now()}.${extension}`;

  const { error: uploadError } = await client.storage.from(BUCKET).upload(objectPath, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || "application/octet-stream",
  });

  if (uploadError) throw uploadError;

  const { data } = client.storage.from(BUCKET).getPublicUrl(objectPath);
  return data.publicUrl;
}

export async function uploadPartnerLogo(file, slug) {
  return uploadPublicImage(file, "partners", slug);
}

export async function uploadEventImage(file, key = "event") {
  return uploadPublicImage(file, "events", key);
}

export async function uploadSliderImage(file, key = "slider") {
  return uploadPublicImage(file, "sliders", key);
}

export async function uploadPublicImageWithClient(client, file, folder, key) {
  return uploadPublicImage(file, folder, key, client);
}

