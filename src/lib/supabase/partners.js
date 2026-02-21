import { supabase } from "./client";

function fromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    email: row.email,
    location: row.location || "",
    phones: row.phones || [],
    tags: row.tags || [],
    logoUrl: row.logo_url || "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toRow(payload = {}) {
  return {
    slug: payload.slug,
    name: payload.name,
    description: payload.description,
    email: payload.email,
    location: payload.location || "",
    phones: payload.phones || [],
    tags: payload.tags || [],
    ...(payload.logoUrl !== undefined ? { logo_url: payload.logoUrl } : {}),
  };
}

export async function fetchPartners() {
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(fromRow);
}

export async function fetchPartnerBySlug(slug) {
  const { data, error } = await supabase.from("partners").select("*").eq("slug", slug).single();
  if (error) {
    // Supabase returns a 406-ish error when no rows; normalize to null.
    if (String(error.code || "").toUpperCase() === "PGRST116") return null;
    throw error;
  }
  return fromRow(data);
}

export async function fetchPartnerById(partnerId) {
  const { data, error } = await supabase.from("partners").select("*").eq("id", partnerId).single();
  if (error) {
    if (String(error.code || "").toUpperCase() === "PGRST116") return null;
    throw error;
  }
  return fromRow(data);
}

export async function createPartner(payload) {
  const { data, error } = await supabase.from("partners").insert(toRow(payload)).select("*").single();
  if (error) throw error;
  return fromRow(data);
}

export async function updatePartner(partnerId, payload) {
  const row = toRow(payload);
  // updated_at is managed by trigger in SQL, but setting it here is fine if trigger isn't present.
  row.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("partners")
    .update(row)
    .eq("id", partnerId)
    .select("*")
    .single();
  if (error) throw error;
  return fromRow(data);
}

export async function deletePartner(partnerId) {
  const { error } = await supabase.from("partners").delete().eq("id", partnerId);
  if (error) throw error;
  return true;
}

