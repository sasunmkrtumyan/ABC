import { supabase } from "./client";

const BUCKET = "partner-logos";

export async function uploadPartnerLogo(file, slug) {
  if (!file) throw new Error("Missing file");

  const safeName = String(file.name || "logo").replace(/\s+/g, "-");
  const path = `partners/${slug}-${Date.now()}-${safeName}`;

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || "application/octet-stream",
  });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

