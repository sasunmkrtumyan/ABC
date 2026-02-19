module.exports = [
"[project]/src/lib/supabase/client.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-ssr] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://icnamgvlmqmopmjcuaiy.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "sb_publishable_Kxg6v0Ecx9Y0lXgqHURWTA_ObNJmqUF");
// Keep this module client-safe: only NEXT_PUBLIC_* env vars.
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
}),
"[project]/src/lib/supabase/auth.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSession",
    ()=>getSession,
    "onAuthStateChange",
    ()=>onAuthStateChange,
    "signInWithPassword",
    ()=>signInWithPassword,
    "signOut",
    ()=>signOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.js [app-ssr] (ecmascript)");
;
async function signInWithPassword(email, password) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithPassword({
        email,
        password
    });
}
async function signOut() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
}
async function getSession() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
}
function onAuthStateChange(callback) {
    // Returns { data: { subscription } }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange((_event, session)=>{
        callback(session);
    });
}
}),
"[project]/src/lib/supabase/partners.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createPartner",
    ()=>createPartner,
    "deletePartner",
    ()=>deletePartner,
    "fetchPartnerById",
    ()=>fetchPartnerById,
    "fetchPartnerBySlug",
    ()=>fetchPartnerBySlug,
    "fetchPartners",
    ()=>fetchPartners,
    "updatePartner",
    ()=>updatePartner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.js [app-ssr] (ecmascript)");
;
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
        updatedAt: row.updated_at
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
        logo_url: payload.logoUrl || ""
    };
}
async function fetchPartners() {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("partners").select("*").order("created_at", {
        ascending: false
    });
    if (error) throw error;
    return (data || []).map(fromRow);
}
async function fetchPartnerBySlug(slug) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("partners").select("*").eq("slug", slug).single();
    if (error) {
        // Supabase returns a 406-ish error when no rows; normalize to null.
        if (String(error.code || "").toUpperCase() === "PGRST116") return null;
        throw error;
    }
    return fromRow(data);
}
async function fetchPartnerById(partnerId) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("partners").select("*").eq("id", partnerId).single();
    if (error) {
        if (String(error.code || "").toUpperCase() === "PGRST116") return null;
        throw error;
    }
    return fromRow(data);
}
async function createPartner(payload) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("partners").insert(toRow(payload)).select("*").single();
    if (error) throw error;
    return fromRow(data);
}
async function updatePartner(partnerId, payload) {
    const row = toRow(payload);
    // updated_at is managed by trigger in SQL, but setting it here is fine if trigger isn't present.
    row.updated_at = new Date().toISOString();
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("partners").update(row).eq("id", partnerId).select("*").single();
    if (error) throw error;
    return fromRow(data);
}
async function deletePartner(partnerId) {
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("partners").delete().eq("id", partnerId);
    if (error) throw error;
    return true;
}
}),
"[project]/src/lib/slugify.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "slugify",
    ()=>slugify
]);
function slugify(input) {
    return String(input).toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}
}),
"[project]/src/lib/supabase/tags.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTag",
    ()=>createTag,
    "deleteTag",
    ()=>deleteTag,
    "fetchTags",
    ()=>fetchTags,
    "updateTag",
    ()=>updateTag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slugify$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/slugify.js [app-ssr] (ecmascript)");
;
;
function fromRow(row) {
    if (!row) return null;
    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        createdAt: row.created_at
    };
}
async function fetchTags() {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("tags").select("*").order("name", {
        ascending: true
    });
    if (error) throw error;
    return (data || []).map(fromRow);
}
async function createTag(name) {
    const cleanName = String(name || "").trim();
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("tags").insert({
        name: cleanName,
        slug: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slugify$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["slugify"])(cleanName)
    }).select("*").single();
    if (error) throw error;
    return fromRow(data);
}
async function updateTag(tagId, name) {
    const cleanName = String(name || "").trim();
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("tags").update({
        name: cleanName,
        slug: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slugify$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["slugify"])(cleanName)
    }).eq("id", tagId).select("*").single();
    if (error) throw error;
    return fromRow(data);
}
async function deleteTag(tagId) {
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("tags").delete().eq("id", tagId);
    if (error) throw error;
    return true;
}
}),
"[project]/src/lib/supabase/storage.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uploadPartnerLogo",
    ()=>uploadPartnerLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.js [app-ssr] (ecmascript)");
;
const BUCKET = "partner-logos";
async function uploadPartnerLogo(file, slug) {
    if (!file) throw new Error("Missing file");
    const safeName = String(file.name || "logo").replace(/\s+/g, "-");
    const path = `partners/${slug}-${Date.now()}-${safeName}`;
    const { error: uploadError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].storage.from(BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || "application/octet-stream"
    });
    if (uploadError) throw uploadError;
    const { data } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
}
}),
"[project]/src/lib/localDb.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "readLocalPartners",
    ()=>readLocalPartners,
    "readLocalTags",
    ()=>readLocalTags,
    "toLocalId",
    ()=>toLocalId,
    "writeLocalPartners",
    ()=>writeLocalPartners,
    "writeLocalTags",
    ()=>writeLocalTags
]);
const PARTNERS_KEY = "abc_local_partners";
const TAGS_KEY = "abc_local_tags";
function safeParse(json, fallback) {
    try {
        const parsed = JSON.parse(json);
        return Array.isArray(parsed) ? parsed : fallback;
    } catch  {
        return fallback;
    }
}
function readLocalPartners() {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
}
function writeLocalPartners(partners) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function readLocalTags() {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
}
function writeLocalTags(tags) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function toLocalId(prefix) {
    return `local-${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
}),
"[project]/src/app/admin/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/auth.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$partners$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/partners.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$tags$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/tags.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$storage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/storage.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slugify$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/slugify.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localDb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/localDb.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const ADMIN_USERNAME = "abc1111";
const ADMIN_EMAIL = ("TURBOPACK compile-time value", "sasunmkrtumyan92@gmail.com") || "sasunmkrtumyan92@gmail.com";
const LOCAL_ADMIN_PASSWORD = "Ernestabc1111";
const LOCAL_ADMIN_SESSION_KEY = "abc_local_admin_session";
const ENABLE_LOCAL_ADMIN_FALLBACK = ("TURBOPACK compile-time value", "development") !== "production" && process.env.NEXT_PUBLIC_ENABLE_LOCAL_ADMIN_FALLBACK !== "false";
function getLoginErrorMessage(error) {
    const message = String(error?.message || error || "").toLowerCase();
    if (message.includes("invalid login credentials")) {
        return "Սխալ email կամ գաղտնաբառ";
    }
    if (message.includes("email not confirmed")) {
        return "Email-ը հաստատված չէ (Supabase Auth)";
    }
    if (message.includes("user not found")) {
        return "Ադմին օգտատեր չի գտնվել Supabase-ում";
    }
    if (message.includes("network") || message.includes("fetch")) {
        return "Ցանցային խնդիր կա, ստուգեք ինտերնետ կապը";
    }
    return `Մուտքը չհաջողվեց (${error?.message || "unknown"}). Ստուգեք կարգավորումները`;
}
const emptyForm = {
    name: "",
    descriptionAm: "",
    descriptionRu: "",
    descriptionEn: "",
    email: "",
    location: "",
    phones: "",
    tags: []
};
function pickLocalizedValue(valueByLang = {}) {
    return valueByLang.am || valueByLang.en || valueByLang.ru || "";
}
function AdminPage() {
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLocalAdmin, setIsLocalAdmin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [partners, setPartners] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [availableTags, setAvailableTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(emptyForm);
    const [logoFile, setLogoFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [successMessage, setSuccessMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [partnerSearch, setPartnerSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [newTagName, setNewTagName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [editingTagId, setEditingTagId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [editingTagName, setEditingTagName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isPartnerModalOpen, setIsPartnerModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dataMode, setDataMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("supabase");
    const isEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>Boolean(editingId), [
        editingId
    ]);
    const isAuthenticated = Boolean(user || isLocalAdmin);
    const showSuccess = (message)=>{
        setSuccessMessage(message);
        setTimeout(()=>setSuccessMessage(""), 2500);
    };
    const switchToLocalMode = (message)=>{
        setDataMode("local");
        setPartners((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localDb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readLocalPartners"])());
        setAvailableTags((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localDb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readLocalTags"])());
        if (message) setError(message);
    };
    const loadSupabaseData = async ()=>{
        try {
            const [partnersData, tagsData] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$partners$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchPartners"])(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$tags$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchTags"])()
            ]);
            setPartners(partnersData);
            setAvailableTags(tagsData);
        } catch (loadError) {
            const code = loadError?.code || loadError?.status || "unknown";
            switchToLocalMode(`Supabase հասանելի չէ (${code}). անցում տեղային ռեժիմի`);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const hasLocalSession = window.localStorage.getItem(LOCAL_ADMIN_SESSION_KEY) === "1";
        if (hasLocalSession && ENABLE_LOCAL_ADMIN_FALLBACK) {
            setIsLocalAdmin(true);
            setIsLoading(false);
        }
        let cancelled = false;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSession"])().then(({ data })=>{
            if (cancelled) return;
            setUser(data?.session?.user || null);
            if (!hasLocalSession) setIsLoading(false);
        }).catch(()=>{
            if (cancelled) return;
            if (!hasLocalSession) setIsLoading(false);
        });
        const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onAuthStateChange"])((session)=>{
            if (cancelled) return;
            setUser(session?.user || null);
            if (!hasLocalSession) setIsLoading(false);
        });
        return ()=>{
            cancelled = true;
            data?.subscription?.unsubscribe();
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isAuthenticated) return undefined;
        if (dataMode === "local") {
            setPartners((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localDb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readLocalPartners"])());
            setAvailableTags((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localDb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readLocalTags"])());
            return undefined;
        }
        loadSupabaseData();
        return undefined;
    }, [
        isAuthenticated,
        dataMode
    ]);
    const login = async (event)=>{
        event.preventDefault();
        setError("");
        if (username !== ADMIN_USERNAME) {
            setError("Սխալ մուտքանուն");
            return;
        }
        const emailCandidates = Array.from(new Set([
            ADMIN_EMAIL,
            "sasunmkrtumyan92@gmail.com",
            "abc1111@gmail.com"
        ].filter(Boolean)));
        let lastError = null;
        try {
            for (const email of emailCandidates){
                const { error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signInWithPassword"])(email, password);
                if (!error) return;
                lastError = error;
                // Stop early for non-credential/config errors.
                const msg = String(error?.message || "").toLowerCase();
                if (!msg.includes("invalid login credentials") && !msg.includes("user not found")) break;
            }
            if (ENABLE_LOCAL_ADMIN_FALLBACK && password === LOCAL_ADMIN_PASSWORD) {
                window.localStorage.setItem(LOCAL_ADMIN_SESSION_KEY, "1");
                setIsLocalAdmin(true);
                setError("");
                return;
            }
            setError(getLoginErrorMessage(lastError));
        } catch (loginError) {
            setError(getLoginErrorMessage(loginError || lastError));
        }
    };
    const handleLogout = async ()=>{
        if (user) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signOut"])();
        window.localStorage.removeItem(LOCAL_ADMIN_SESSION_KEY);
        setIsLocalAdmin(false);
        setUser(null);
    };
    const fillEditForm = async (id)=>{
        let item = partners.find((p)=>p.id === id);
        if (!item && dataMode !== "local") {
            item = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$partners$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchPartnerById"])(id);
        }
        if (!item) return;
        setError("");
        setEditingId(id);
        setForm({
            name: pickLocalizedValue(item.name),
            descriptionAm: item.description?.am || "",
            descriptionRu: item.description?.ru || "",
            descriptionEn: item.description?.en || "",
            email: item.email || "",
            location: item.location || "",
            phones: (item.phones || []).join(", "),
            tags: item.tags || []
        });
        setLogoFile(null);
        setIsPartnerModalOpen(true);
    };
    const clearForm = ()=>{
        setForm(emptyForm);
        setEditingId(null);
        setLogoFile(null);
    };
    const openAddPartnerModal = ()=>{
        setError("");
        clearForm();
        setIsPartnerModalOpen(true);
    };
    const closePartnerModal = ()=>{
        setIsPartnerModalOpen(false);
        setError("");
        clearForm();
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        setError("");
        setSuccessMessage("");
        const tags = (form.tags || []).map((item)=>item.trim()).filter(Boolean);
        const phones = form.phones.split(",").map((item)=>item.trim()).filter(Boolean);
        if (!form.name.trim()) {
            setError("Անունը պարտադիր է");
            return;
        }
        if (!form.descriptionAm && !form.descriptionEn && !form.descriptionRu) {
            setError("Առնվազն մեկ նկարագրություն պարտադիր է");
            return;
        }
        if (!form.email) {
            setError("Email-ը պարտադիր է");
            return;
        }
        if (!tags.length) {
            setError("Առնվազն 1 tag պարտադիր է");
            return;
        }
        if (!isEdit && !logoFile) {
            setError("Լոգոն պարտադիր է");
            return;
        }
        setSubmitting(true);
        const slug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slugify$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["slugify"])(form.name);
        let logoUrl = null;
        try {
            if (dataMode === "local") {
                if (logoFile) {
                    logoUrl = await new Promise((resolve, reject)=>{
                        const reader = new FileReader();
                        reader.onload = ()=>resolve(String(reader.result || ""));
                        reader.onerror = reject;
                        reader.readAsDataURL(logoFile);
                    });
                }
                const payload = {
                    slug,
                    name: {
                        am: form.name,
                        en: form.name,
                        ru: form.name
                    },
                    description: {
                        am: form.descriptionAm || "",
                        en: form.descriptionEn || "",
                        ru: form.descriptionRu || ""
                    },
                    email: form.email,
                    location: form.location || "",
                    phones,
                    tags,
                    ...logoUrl ? {
                        logoUrl
                    } : {}
                };
                if (isEdit) {
                    const updated = partners.map((item)=>item.id === editingId ? {
                            ...item,
                            ...payload,
                            updatedAt: Date.now()
                        } : item);
                    setPartners(updated);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localDb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeLocalPartners"])(updated);
                    showSuccess("Գործընկերը հաջողությամբ թարմացվեց (local)");
                } else {
                    const next = [
                        {
                            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localDb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toLocalId"])("partner"),
                            ...payload,
                            createdAt: Date.now(),
                            updatedAt: Date.now()
                        },
                        ...partners
                    ];
                    setPartners(next);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localDb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeLocalPartners"])(next);
                    showSuccess("Գործընկերը հաջողությամբ ավելացվեց (local)");
                }
                closePartnerModal();
                return;
            }
            if (logoFile) logoUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$storage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uploadPartnerLogo"])(logoFile, slug);
            const payload = {
                slug,
                name: {
                    am: form.name,
                    en: form.name,
                    ru: form.name
                },
                description: {
                    am: form.descriptionAm || "",
                    en: form.descriptionEn || "",
                    ru: form.descriptionRu || ""
                },
                email: form.email,
                location: form.location || "",
                phones,
                tags,
                ...logoUrl ? {
                    logoUrl
                } : {}
            };
            if (isEdit) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$partners$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updatePartner"])(editingId, payload);
                showSuccess("Գործընկերը հաջողությամբ թարմացվեց");
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$partners$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPartner"])(payload);
                showSuccess("Գործընկերը հաջողությամբ ավելացվեց");
            }
            await loadSupabaseData();
            closePartnerModal();
        } catch (submitError) {
            const code = submitError?.code || "";
            const status = submitError?.status;
            const message = String(submitError?.message || "");
            const lower = message.toLowerCase();
            if (status === 401 || status === 403 || lower.includes("permission denied") || lower.includes("row-level security") || lower.includes("not allowed")) {
                switchToLocalMode("Supabase access denied. Անցում տեղային ռեժիմի");
                return;
            }
            if (lower.includes("bucket") && (lower.includes("not found") || lower.includes("does not exist"))) {
                setError("Storage bucket-ը չի գտնվել. Ստուգեք Supabase Storage bucket-ը (partner-logos)");
            } else if (lower.includes("storage") && lower.includes("unauthorized")) {
                setError("Storage թույլտվություն չկա. ստուգեք Supabase Storage policies-ը");
            } else {
                setError(`Սխալ տեղի ունեցավ (${code || status || "unknown"}), փորձեք կրկին`);
            }
        } finally{
            setSubmitting(false);
        }
    };
    const removePartner = async (id)=>{
        if (dataMode === "local") {
            const next = partners.filter((item)=>item.id !== id);
            setPartners(next);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localDb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeLocalPartners"])(next);
            showSuccess("Գործընկերը ջնջվեց (local)");
            return;
        }
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$partners$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deletePartner"])(id);
            showSuccess("Գործընկերը ջնջվեց");
            await loadSupabaseData();
        } catch (deleteError) {
            if (deleteError?.status === 401 || deleteError?.status === 403 || String(deleteError?.message || "").toLowerCase().includes("row-level security") || String(deleteError?.message || "").toLowerCase().includes("permission denied")) {
                switchToLocalMode("Supabase access denied. Անցում տեղային ռեժիմի");
            }
            setError(`Գործընկերոջ ջնջումը չհաջողվեց (${deleteError?.code || "unknown"})`);
        }
    };
    const addTag = async ()=>{
        const nextName = newTagName.trim();
        if (!nextName) return;
        if (dataMode === "local") {
            const next = [
                ...availableTags,
                {
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localDb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toLocalId"])("tag"),
                    name: nextName,
                    slug: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slugify$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["slugify"])(nextName)
                }
            ];
            setAvailableTags(next);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localDb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeLocalTags"])(next);
            setNewTagName("");
            showSuccess("Tag-ը ավելացվեց (local)");
            return;
        }
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$tags$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTag"])(nextName);
            setNewTagName("");
            showSuccess("Tag-ը ավելացվեց");
            await loadSupabaseData();
        } catch (tagError) {
            if (tagError?.status === 401 || tagError?.status === 403 || String(tagError?.message || "").toLowerCase().includes("row-level security") || String(tagError?.message || "").toLowerCase().includes("permission denied")) {
                switchToLocalMode("Supabase access denied. tag-երը տեղային ռեժիմում են");
            }
            setError(`Tag ավելացնելը չհաջողվեց (${tagError?.code || "unknown"})`);
        }
    };
    const startEditTag = (tag)=>{
        setError("");
        setEditingTagId(tag.id);
        setEditingTagName(tag.name);
    };
    const saveTagEdit = async ()=>{
        if (!editingTagId || !editingTagName.trim()) return;
        setError("");
        if (dataMode === "local") {
            const next = availableTags.map((tag)=>tag.id === editingTagId ? {
                    ...tag,
                    name: editingTagName.trim(),
                    slug: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slugify$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["slugify"])(editingTagName.trim())
                } : tag);
            const oldTag = availableTags.find((tag)=>tag.id === editingTagId);
            const newTag = editingTagName.trim();
            setAvailableTags(next);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localDb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeLocalTags"])(next);
            if (oldTag && oldTag.name !== newTag) {
                const nextPartners = partners.map((partner)=>({
                        ...partner,
                        tags: (partner.tags || []).map((tag)=>tag === oldTag.name ? newTag : tag)
                    }));
                setPartners(nextPartners);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localDb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeLocalPartners"])(nextPartners);
            }
            setEditingTagId("");
            setEditingTagName("");
            showSuccess("Tag-ը թարմացվեց (local)");
            return;
        }
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$tags$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateTag"])(editingTagId, editingTagName.trim());
            setEditingTagId("");
            setEditingTagName("");
            showSuccess("Tag-ը թարմացվեց");
            await loadSupabaseData();
        } catch (tagError) {
            if (tagError?.status === 401 || tagError?.status === 403 || String(tagError?.message || "").toLowerCase().includes("row-level security") || String(tagError?.message || "").toLowerCase().includes("permission denied")) {
                switchToLocalMode("Supabase access denied. tag edit-ը local mode է");
            }
            setError(`Tag թարմացնելը չհաջողվեց (${tagError?.code || "unknown"})`);
        }
    };
    const removeTag = async (tagId)=>{
        if (dataMode === "local") {
            const found = availableTags.find((item)=>item.id === tagId);
            const nextTags = availableTags.filter((tag)=>tag.id !== tagId);
            setAvailableTags(nextTags);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localDb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeLocalTags"])(nextTags);
            if (found) {
                const nextPartners = partners.map((partner)=>({
                        ...partner,
                        tags: (partner.tags || []).filter((tag)=>tag !== found.name)
                    }));
                setPartners(nextPartners);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localDb$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeLocalPartners"])(nextPartners);
            }
            setForm((prev)=>({
                    ...prev,
                    tags: (prev.tags || []).filter((tag)=>found ? tag !== found.name : true)
                }));
            showSuccess("Tag-ը ջնջվեց (local)");
            return;
        }
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$tags$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteTag"])(tagId);
            setForm((prev)=>({
                    ...prev,
                    tags: (prev.tags || []).filter((tag)=>{
                        const found = availableTags.find((item)=>item.id === tagId);
                        return found ? tag !== found.name : true;
                    })
                }));
            showSuccess("Tag-ը ջնջվեց");
            await loadSupabaseData();
        } catch (tagError) {
            if (tagError?.status === 401 || tagError?.status === 403 || String(tagError?.message || "").toLowerCase().includes("row-level security") || String(tagError?.message || "").toLowerCase().includes("permission denied")) {
                switchToLocalMode("Supabase access denied. tag delete-ը local mode է");
            }
            setError(`Tag ջնջելը չհաջողվեց (${tagError?.code || "unknown"})`);
        }
    };
    const filteredPartners = partners.filter((item)=>{
        const q = partnerSearch.trim().toLowerCase();
        if (!q) return true;
        const partnerName = pickLocalizedValue(item.name).toLowerCase();
        const partnerEmail = String(item.email || "").toLowerCase();
        return partnerName.includes(q) || partnerEmail.includes(q);
    });
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "container-abc py-12",
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/src/app/admin/page.jsx",
            lineNumber: 537,
            columnNumber: 12
        }, this);
    }
    if (!user && !isLocalAdmin) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "container-abc py-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-black text-brand.dark",
                        children: "Ադմին մուտք"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 544,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm text-slate-500",
                        children: "URL: abc1111.am/admin"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 545,
                        columnNumber: 11
                    }, this),
                    ENABLE_LOCAL_ADMIN_FALLBACK ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-slate-500",
                        children: "Տեղային մուտքը միացված է (dev mode)"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 547,
                        columnNumber: 13
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: login,
                        className: "mt-6 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: username,
                                onChange: (event)=>setUsername(event.target.value),
                                placeholder: "Մուտքանուն",
                                className: "w-full rounded-xl border border-slate-300 px-4 py-3"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 551,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "password",
                                value: password,
                                onChange: (event)=>setPassword(event.target.value),
                                placeholder: "Գաղտնաբառ",
                                className: "w-full rounded-xl border border-slate-300 px-4 py-3"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 557,
                                columnNumber: 13
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-red-600",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 564,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "w-full bg-blue-500 rounded-xl px-4 py-3 font-semibold text-white",
                                children: "Մուտք"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 565,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 550,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 543,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/admin/page.jsx",
            lineNumber: 542,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "container-abc py-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-black text-brand.dark",
                        children: "Գործընկերների կառավարում"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 577,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `rounded-full px-3 py-1 text-xs font-semibold ${dataMode === "local" ? "border border-amber-200 bg-amber-50 text-amber-700" : "border border-emerald-200 bg-emerald-50 text-emerald-700"}`,
                                children: dataMode === "local" ? "LOCAL MODE" : "SUPABASE MODE"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 579,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleLogout,
                                className: "rounded-xl border border-slate-300 px-4 py-2",
                                children: "Ելք"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 588,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 578,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 576,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 597,
                columnNumber: 9
            }, this) : null,
            successMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-6 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700",
                children: successMessage
            }, void 0, false, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 603,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "rounded-2xl bg-white p-6 shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold",
                            children: "Գործընկերներ"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/page.jsx",
                            lineNumber: 609,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: openAddPartnerModal,
                            className: "rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white",
                            children: "Ավելացնել գործընկեր"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/page.jsx",
                            lineNumber: 610,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/page.jsx",
                    lineNumber: 608,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 607,
                columnNumber: 7
            }, this),
            isPartnerModalOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold",
                                    children: isEdit ? "Փոփոխել գործընկեր" : "Ավելացնել գործընկեր"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 624,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: closePartnerModal,
                                    className: "rounded-lg border border-slate-300 px-3 py-1.5 text-sm",
                                    children: "Փակել"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 625,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/page.jsx",
                            lineNumber: 623,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: "grid gap-4 md:grid-cols-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: form.name,
                                    onChange: (event)=>setForm((prev)=>({
                                                ...prev,
                                                name: event.target.value
                                            })),
                                    placeholder: "Անուն*",
                                    className: "rounded-xl border border-slate-300 px-4 py-3 md:col-span-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 635,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: form.descriptionAm,
                                    onChange: (event)=>setForm((prev)=>({
                                                ...prev,
                                                descriptionAm: event.target.value
                                            })),
                                    placeholder: "Նկարագրություն (AM)",
                                    className: "min-h-28 rounded-xl border border-slate-300 px-4 py-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 641,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: form.descriptionRu,
                                    onChange: (event)=>setForm((prev)=>({
                                                ...prev,
                                                descriptionRu: event.target.value
                                            })),
                                    placeholder: "Описание (RU)",
                                    className: "min-h-28 rounded-xl border border-slate-300 px-4 py-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 647,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: form.descriptionEn,
                                    onChange: (event)=>setForm((prev)=>({
                                                ...prev,
                                                descriptionEn: event.target.value
                                            })),
                                    placeholder: "Description (EN)",
                                    className: "min-h-28 rounded-xl border border-slate-300 px-4 py-3 md:col-span-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 653,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: form.email,
                                    onChange: (event)=>setForm((prev)=>({
                                                ...prev,
                                                email: event.target.value
                                            })),
                                    placeholder: "Email*",
                                    className: "rounded-xl border border-slate-300 px-4 py-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 659,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: form.location,
                                    onChange: (event)=>setForm((prev)=>({
                                                ...prev,
                                                location: event.target.value
                                            })),
                                    placeholder: "Հասցե",
                                    className: "rounded-xl border border-slate-300 px-4 py-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 665,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: form.phones,
                                    onChange: (event)=>setForm((prev)=>({
                                                ...prev,
                                                phones: event.target.value
                                            })),
                                    placeholder: "Հեռախոսներ (ստորակետով)",
                                    className: "rounded-xl border border-slate-300 px-4 py-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 671,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-slate-300 px-4 py-3 md:col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-2 text-sm font-semibold text-slate-700",
                                            children: "Tags*"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 678,
                                            columnNumber: 17
                                        }, this),
                                        availableTags.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-2",
                                            children: availableTags.map((tag)=>{
                                                const checked = (form.tags || []).includes(tag.name);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: checked,
                                                            onChange: (event)=>{
                                                                setForm((prev)=>{
                                                                    const current = prev.tags || [];
                                                                    const nextTags = event.target.checked ? [
                                                                        ...new Set([
                                                                            ...current,
                                                                            tag.name
                                                                        ])
                                                                    ] : current.filter((item)=>item !== tag.name);
                                                                    return {
                                                                        ...prev,
                                                                        tags: nextTags
                                                                    };
                                                                });
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/page.jsx",
                                                            lineNumber: 685,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: tag.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/page.jsx",
                                                            lineNumber: 698,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, tag.id, true, {
                                                    fileName: "[project]/src/app/admin/page.jsx",
                                                    lineNumber: 684,
                                                    columnNumber: 25
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 680,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-slate-500",
                                            children: "Tag չկան։ Ստորև ավելացրեք առաջին tag-ը։"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 704,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 677,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "file",
                                    onChange: (event)=>setLogoFile(event.target.files?.[0] || null),
                                    accept: "image/*",
                                    className: "rounded-xl border border-slate-300 px-4 py-3 md:col-span-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 707,
                                    columnNumber: 15
                                }, this),
                                error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-red-600 md:col-span-2",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 714,
                                    columnNumber: 24
                                }, this) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 md:col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            disabled: submitting,
                                            className: "rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white disabled:opacity-50",
                                            children: isEdit ? "Պահպանել" : "Ավելացնել"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 717,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: closePartnerModal,
                                            className: "rounded-xl border border-slate-300 px-5 py-3 font-semibold",
                                            children: "Չեղարկել"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 723,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 716,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/page.jsx",
                            lineNumber: 634,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/page.jsx",
                    lineNumber: 622,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 621,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-8 rounded-2xl bg-white p-6 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold",
                        children: "Tag-երի կառավարում"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 737,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: newTagName,
                                onChange: (event)=>setNewTagName(event.target.value),
                                placeholder: "Նոր tag անուն",
                                className: "w-full rounded-xl border border-slate-300 px-4 py-3"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 739,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: addTag,
                                className: "rounded-xl bg-blue-500 px-4 py-3 font-semibold text-white",
                                children: "Ավելացնել"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 745,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 738,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 space-y-2",
                        children: availableTags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2 rounded-lg border border-slate-200 p-3 md:flex-row md:items-center",
                                children: editingTagId === tag.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: editingTagName,
                                            onChange: (event)=>setEditingTagName(event.target.value),
                                            onKeyDown: (event)=>{
                                                if (event.key === "Enter") {
                                                    event.preventDefault();
                                                    saveTagEdit();
                                                }
                                            },
                                            className: "w-full rounded-lg border border-slate-300 px-3 py-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 755,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: saveTagEdit,
                                            className: "rounded-lg border border-slate-300 px-3 py-2",
                                            children: "Պահպանել"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 766,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setEditingTagId(""),
                                            className: "rounded-lg border border-slate-300 px-3 py-2",
                                            children: "Չեղարկել"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 769,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "flex-1 font-medium",
                                            children: tag.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 775,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>startEditTag(tag),
                                            className: "rounded-lg border border-slate-300 px-3 py-2",
                                            children: "Խմբագրել"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 776,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>removeTag(tag.id),
                                            className: "rounded-lg border border-red-200 px-3 py-2 text-red-600",
                                            children: "Ջնջել"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 779,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, tag.id, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 752,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 750,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 736,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-8 rounded-2xl bg-white p-6 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold",
                        children: "Գործընկերների ցանկ"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 790,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: partnerSearch,
                        onChange: (event)=>setPartnerSearch(event.target.value),
                        placeholder: "Փնտրել գործընկեր անունով կամ email-ով",
                        className: "mt-4 w-full rounded-xl border border-slate-300 px-4 py-3"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 791,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 space-y-3",
                        children: [
                            filteredPartners.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                    className: "flex flex-col gap-3 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-semibold text-blue-500",
                                                    children: pickLocalizedValue(item.name)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/page.jsx",
                                                    lineNumber: 801,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-slate-500",
                                                    children: item.email
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/page.jsx",
                                                    lineNumber: 802,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 800,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>fillEditForm(item.id),
                                                    className: "rounded-lg border border-slate-300 px-4 py-2",
                                                    children: "Խմբագրել"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/page.jsx",
                                                    lineNumber: 805,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>removePartner(item.id),
                                                    className: "rounded-lg border border-red-200 px-4 py-2 text-red-600",
                                                    children: "Ջնջել"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/page.jsx",
                                                    lineNumber: 808,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 804,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 799,
                                    columnNumber: 13
                                }, this)),
                            !filteredPartners.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-500",
                                children: "Գործընկերներ չեն գտնվել։"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 815,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 797,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 789,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/page.jsx",
        lineNumber: 575,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_292c1f8b._.js.map