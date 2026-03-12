import { supabase } from "./client";

function isMissingEventsTable(error) {
  const code = String(error?.code || "").toUpperCase();
  const message = String(error?.message || "").toLowerCase();
  return code === "PGRST205" && message.includes("'public.events'");
}

function throwMissingEventsTableSetupError() {
  throw new Error(
    "Events table is missing in Supabase. Run supabase/schema.sql and then execute: notify pgrst, 'reload schema';"
  );
}

function fromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title || {},
    description: row.description || {},
    eventAt: row.event_at || null,
    mode: row.mode || "offline",
    place: row.place || "",
    imageUrl: row.image_url || "",
    contactEmail: row.contact_email || "",
    contactPhone: row.contact_phone || "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toRow(payload = {}) {
  return {
    title: payload.title || {},
    description: payload.description || {},
    event_at: payload.eventAt || null,
    mode: payload.mode || "offline",
    place: payload.place || "",
    image_url: payload.imageUrl || "",
    contact_email: payload.contactEmail || "",
    contact_phone: payload.contactPhone || "",
  };
}

export async function fetchEvents() {
  const { data, error } = await supabase.from("events").select("*").order("event_at", { ascending: false });
  // If events table is not created yet, keep UI usable and return empty list.
  if (error) {
    if (isMissingEventsTable(error)) return [];
    throw error;
  }
  return (data || []).map(fromRow);
}

export async function createEvent(payload) {
  const { data, error } = await supabase.from("events").insert(toRow(payload)).select("*").single();
  if (error) {
    if (isMissingEventsTable(error)) throwMissingEventsTableSetupError();
    throw error;
  }
  return fromRow(data);
}

export async function updateEvent(eventId, payload) {
  const row = toRow(payload);
  row.updated_at = new Date().toISOString();
  const { data, error } = await supabase.from("events").update(row).eq("id", eventId).select("*").single();
  if (error) {
    if (isMissingEventsTable(error)) throwMissingEventsTableSetupError();
    throw error;
  }
  return fromRow(data);
}

export async function deleteEvent(eventId) {
  const { error } = await supabase.from("events").delete().eq("id", eventId);
  if (error) {
    if (isMissingEventsTable(error)) throwMissingEventsTableSetupError();
    throw error;
  }
  return true;
}
