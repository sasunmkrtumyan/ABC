import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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

function normalizePartner(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    email: row.email,
    phones: row.phones || [],
    tags: row.tags || [],
    logoUrl: row.logo_url || "",
  };
}

function parsePositiveInt(value, fallback) {
  const parsed = Number.parseInt(String(value || ""), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = String(searchParams.get("search") || "").trim();
    const category = String(searchParams.get("category") || "all").trim();
    const page = parsePositiveInt(searchParams.get("page"), 1);
    const pageSize = parsePositiveInt(searchParams.get("pageSize"), 10);
    const exportAll = searchParams.get("export") === "1";

    const safePageSize = Math.min(Math.max(pageSize, 1), 500);
    const supabase = createSupabaseServerClient();

    let baseQuery = supabase.from("partners").select("*", { count: "exact" }).order("created_at", { ascending: false });

    if (category && category !== "all") {
      baseQuery = baseQuery.contains("tags", [category]);
    }

    if (search) {
      const escaped = search.replace(/[%_,]/g, "\\$&");
      baseQuery = baseQuery.or(
        `name->>en.ilike.%${escaped}%,name->>am.ilike.%${escaped}%,name->>ru.ilike.%${escaped}%,email.ilike.%${escaped}%`
      );
    }

    const initialFrom = (page - 1) * safePageSize;
    const initialTo = initialFrom + safePageSize - 1;

    const { data, error, count } = exportAll ? await baseQuery : await baseQuery.range(initialFrom, initialTo);
    if (error) throw error;

    const total = Number(count || 0);
    const totalPages = exportAll ? 1 : Math.max(1, Math.ceil(total / safePageSize));
    const normalizedPage = exportAll ? 1 : Math.min(Math.max(page, 1), totalPages);
    let items = data || [];

    // If requested page is out of range, fetch the last valid page.
    if (!exportAll && normalizedPage !== page) {
      const from = (normalizedPage - 1) * safePageSize;
      const to = from + safePageSize - 1;
      const fallbackResult = await baseQuery.range(from, to);
      if (fallbackResult.error) throw fallbackResult.error;
      items = fallbackResult.data || [];
    }

    const { data: tagsData, error: tagsError } = await supabase
      .from("tags")
      .select("name, slug")
      .order("slug", { ascending: true });
    if (tagsError) throw tagsError;

    const categories = (tagsData || [])
      .map((tag) => {
        const name = parseTagName(tag.name);
        return {
          key: name.en || String(tag.slug || "").trim(),
          slug: String(tag.slug || "").trim(),
          name,
        };
      })
      .filter((tag) => tag.key);

    return NextResponse.json({
      items: items.map(normalizePartner),
      categories,
      page: normalizedPage,
      pageSize: safePageSize,
      total,
      totalPages,
    });
  } catch (error) {
    const code = error?.code || error?.status || "unknown";
    return NextResponse.json(
      { message: `Failed to fetch partners (${code}). ${String(error?.message || "")}`.trim() },
      { status: 500 }
    );
  }
}
