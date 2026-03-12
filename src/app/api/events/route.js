import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isMissingEventsTable(error) {
  const code = String(error?.code || "").toUpperCase();
  const message = String(error?.message || "").toLowerCase();
  return code === "PGRST205" && message.includes("'public.events'");
}

function normalizeEvent(row) {
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
  };
}

export async function GET(request) {
  try {
    const authHeader = String(request.headers.get("authorization") || "").trim();
    const bearerToken = authHeader.toLowerCase().startsWith("bearer ")
      ? authHeader.slice(7).trim()
      : "";

    const supabase = createSupabaseServerClient({ accessToken: bearerToken });
    const { data, error } = await supabase.from("events").select("*").order("event_at", { ascending: false });
    if (error) throw error;

    return NextResponse.json(
      { items: (data || []).map(normalizeEvent) },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    const code = error?.code || error?.status || "unknown";
    const message = String(error?.message || "");
    if (isMissingEventsTable(error)) {
      return NextResponse.json(
        {
          items: [],
          degraded: true,
          message: "Events table is missing in Supabase. Run supabase/schema.sql to create it.",
        },
        {
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        }
      );
    }
    if (message.toLowerCase().includes("fetch failed")) {
      return NextResponse.json(
        {
          items: [],
          degraded: true,
          message: "Supabase is temporarily unreachable.",
        },
        {
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        }
      );
    }
    return NextResponse.json(
      { message: `Failed to fetch events (${code}). ${message}`.trim() },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }
}
