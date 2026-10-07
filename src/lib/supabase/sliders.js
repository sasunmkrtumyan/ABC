import { supabase } from "./client";

export const SLIDER_KEYS = ["top", "bottom"];

function normalizeSliderKey(value) {
  const key = String(value || "").trim();
  return SLIDER_KEYS.includes(key) ? key : SLIDER_KEYS[0];
}

function fromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    slider: row.slider,
    imageUrl: row.image_url || "",
    alt: row.alt || "",
    position: Number(row.position || 0),
    createdAt: row.created_at,
  };
}

function emptyGroups() {
  return SLIDER_KEYS.reduce((groups, key) => ({ ...groups, [key]: [] }), {});
}

function isMissingTableError(error) {
  const message = String(error?.message || "").toLowerCase();
  return (
    String(error?.code || "") === "42P01" ||
    (message.includes("slider_images") && (message.includes("does not exist") || message.includes("schema cache")))
  );
}

/**
 * Returns `{ top: [...], bottom: [...] }`. Resolves to empty groups when the
 * table has not been created yet so the public homepage keeps rendering.
 *
 * Pass a server client to read this during server rendering.
 */
export async function fetchSliderImages(client = supabase) {
  const { data, error } = await client
    .from("slider_images")
    .select("*")
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    if (isMissingTableError(error)) return emptyGroups();
    throw error;
  }

  return (data || []).reduce((groups, row) => {
    const item = fromRow(row);
    if (!item || !groups[item.slider]) return groups;
    groups[item.slider].push(item);
    return groups;
  }, emptyGroups());
}

export async function createSliderImages(slider, images = []) {
  const sliderKey = normalizeSliderKey(slider);
  const entries = images
    .map((image) => ({
      imageUrl: String(image?.imageUrl || "").trim(),
      alt: String(image?.alt || "").trim(),
    }))
    .filter((image) => image.imageUrl);

  if (!entries.length) return [];

  const { data: lastRows, error: lastError } = await supabase
    .from("slider_images")
    .select("position")
    .eq("slider", sliderKey)
    .order("position", { ascending: false })
    .limit(1);
  if (lastError) throw lastError;

  const startPosition = Number(lastRows?.[0]?.position ?? -1) + 1;

  const { data, error } = await supabase
    .from("slider_images")
    .insert(
      entries.map((image, index) => ({
        slider: sliderKey,
        image_url: image.imageUrl,
        alt: image.alt,
        position: startPosition + index,
      })),
    )
    .select("*");
  if (error) throw error;

  return (data || []).map(fromRow);
}

export async function deleteSliderImage(imageId) {
  // Ask for the deleted rows back: row level security makes a blocked delete succeed with
  // zero affected rows and no error, which would leave the image on the homepage.
  const { data, error } = await supabase
    .from("slider_images")
    .delete()
    .eq("id", imageId)
    .select("id");
  if (error) throw error;
  if (!data?.length) {
    throw new Error(
      "Slider image was not deleted (no permission or it no longer exists). Make sure you are signed in as an admin listed in public.admins."
    );
  }
  return true;
}

/** Persists a new order by writing each item's index back as its position. */
export async function reorderSliderImages(orderedImages = []) {
  if (!orderedImages.length) return true;

  const updates = orderedImages.map((image, index) =>
    supabase.from("slider_images").update({ position: index }).eq("id", image.id),
  );

  const results = await Promise.all(updates);
  const failed = results.find((result) => result.error);
  if (failed?.error) throw failed.error;
  return true;
}
