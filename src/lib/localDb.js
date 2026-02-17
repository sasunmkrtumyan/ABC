const PARTNERS_KEY = "abc_local_partners";
const TAGS_KEY = "abc_local_tags";

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function readLocalPartners() {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(PARTNERS_KEY) || "[]", []);
}

export function writeLocalPartners(partners) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PARTNERS_KEY, JSON.stringify(partners));
}

export function readLocalTags() {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(TAGS_KEY) || "[]", []);
}

export function writeLocalTags(tags) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TAGS_KEY, JSON.stringify(tags));
}

export function toLocalId(prefix) {
  return `local-${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
