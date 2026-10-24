import { supabase } from "./client";
import { slugify } from "../slugify";

function parseTagName(nameValue) {
  if (nameValue && typeof nameValue === "object") {
    const en = String(nameValue.en || "").trim();
    const am = String(nameValue.am || en).trim();
    const ru = String(nameValue.ru || en).trim();
    return { en: en || am || ru, am, ru };
  }

  const text = String(nameValue || "").trim();
  if (!text) return { en: "", am: "", ru: "" };

  try {
    const parsed = JSON.parse(text);
    if (parsed && typeof parsed === "object") {
      const en = String(parsed.en || "").trim();
      const am = String(parsed.am || en).trim();
      const ru = String(parsed.ru || en).trim();
      return { en: en || am || ru, am, ru };
    }
  } catch (_) {
    // Legacy plain-text tag name.
  }

  return { en: text, am: text, ru: text };
}

function fromRow(row) {
  if (!row) return null;
  const name = parseTagName(row.name);
  return {
    id: row.id,
    name,
    slug: row.slug,
    key: name.en,
    position: typeof row.position === "number" ? row.position : null,
    createdAt: row.created_at,
  };
}

export async function fetchTags() {
  // Custom (drag & drop) order first; fall back to name order if the `position` column is missing.
  const ordered = await supabase
    .from("tags")
    .select("*")
    .order("position", { ascending: true, nullsFirst: false })
    .order("name", { ascending: true });
  if (!ordered.error) return (ordered.data || []).map(fromRow);

  const { data, error } = await supabase.from("tags").select("*").order("name", { ascending: true });
  if (error) throw error;
  return (data || []).map(fromRow);
}

export async function createTag(nameValue) {
  const name = parseTagName(nameValue);
  const cleanName = name.en;
  const payload = { name: JSON.stringify(name), slug: slugify(cleanName) };

  // Put new tags at the end of the custom order (best effort: ignored if `position` column is missing).
  const last = await supabase
    .from("tags")
    .select("position")
    .order("position", { ascending: false, nullsFirst: false })
    .limit(1);
  if (!last.error) payload.position = Number(last.data?.[0]?.position ?? -1) + 1;

  const { data, error } = await supabase.from("tags").insert(payload).select("*").single();
  if (error) throw error;
  return fromRow(data);
}

export async function reorderTags(orderedIds = []) {
  const results = await Promise.all(
    orderedIds.map((id, index) => supabase.from("tags").update({ position: index }).eq("id", id)),
  );
  const failed = results.find((result) => result.error);
  if (failed) throw failed.error;
  return true;
}

export async function updateTag(tagId, nameValue) {
  const name = parseTagName(nameValue);
  const cleanName = name.en;
  const { data, error } = await supabase
    .from("tags")
    .update({ name: JSON.stringify(name), slug: slugify(cleanName) })
    .eq("id", tagId)
    .select("*")
    .single();
  if (error) throw error;
  return fromRow(data);
}

export async function deleteTag(tagId) {
  const { error } = await supabase.from("tags").delete().eq("id", tagId);
  if (error) throw error;
  return true;
}

