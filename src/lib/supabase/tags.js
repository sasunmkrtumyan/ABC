import { supabase } from "./client";
import { slugify } from "../slugify";

function fromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    createdAt: row.created_at,
  };
}

export async function fetchTags() {
  const { data, error } = await supabase.from("tags").select("*").order("name", { ascending: true });
  if (error) throw error;
  return (data || []).map(fromRow);
}

export async function createTag(name) {
  const cleanName = String(name || "").trim();
  const { data, error } = await supabase
    .from("tags")
    .insert({ name: cleanName, slug: slugify(cleanName) })
    .select("*")
    .single();
  if (error) throw error;
  return fromRow(data);
}

export async function updateTag(tagId, name) {
  const cleanName = String(name || "").trim();
  const { data, error } = await supabase
    .from("tags")
    .update({ name: cleanName, slug: slugify(cleanName) })
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

