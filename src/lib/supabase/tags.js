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
    createdAt: row.created_at,
  };
}

export async function fetchTags() {
  const { data, error } = await supabase.from("tags").select("*").order("name", { ascending: true });
  if (error) throw error;
  return (data || []).map(fromRow);
}

export async function createTag(nameValue) {
  const name = parseTagName(nameValue);
  const cleanName = name.en;
  const { data, error } = await supabase
    .from("tags")
    .insert({ name: JSON.stringify(name), slug: slugify(cleanName) })
    .select("*")
    .single();
  if (error) throw error;
  return fromRow(data);
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

