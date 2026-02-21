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
        ...payload.logoUrl !== undefined ? {
            logo_url: payload.logoUrl
        } : {}
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
"use client";
;
;
;
;
;
;
;
const ADMIN_USERNAME = "abc1111";
const ADMIN_EMAIL = ("TURBOPACK compile-time value", "sasunmkrtumyan92@gmail.com") || "sasunmkrtumyan92@gmail.com";
function getMissingTableName(error) {
    const msg = String(error?.message || "");
    const match = msg.match(/'([^']+)'/);
    return match?.[1] || "";
}
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
    tags: [],
    logoUrl: ""
};
function pickLocalizedValue(valueByLang = {}) {
    return valueByLang.am || valueByLang.en || valueByLang.ru || "";
}
function AdminPage() {
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
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
    const isEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>Boolean(editingId), [
        editingId
    ]);
    const isAuthenticated = Boolean(user);
    const showSuccess = (message)=>{
        setSuccessMessage(message);
        setTimeout(()=>setSuccessMessage(""), 2500);
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
            if (code === "PGRST205") {
                const missing = getMissingTableName(loadError);
                setError(`Supabase schema is not ready (missing table${missing ? `: ${missing}` : "s"}). Run supabase/schema.sql in Supabase SQL Editor, then: notify pgrst, 'reload schema';`);
            } else {
                setError(`Supabase հասանելի չէ (${code}). ${String(loadError?.message || "")}`.trim());
            }
            setPartners([]);
            setAvailableTags([]);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSession"])().then(({ data })=>{
            if (cancelled) return;
            setUser(data?.session?.user || null);
            setIsLoading(false);
        }).catch(()=>{
            if (cancelled) return;
            setIsLoading(false);
        });
        const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onAuthStateChange"])((session)=>{
            if (cancelled) return;
            setUser(session?.user || null);
            setIsLoading(false);
        });
        return ()=>{
            cancelled = true;
            data?.subscription?.unsubscribe();
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isAuthenticated) return undefined;
        loadSupabaseData();
        return undefined;
    }, [
        isAuthenticated
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
            setError(getLoginErrorMessage(lastError));
        } catch (loginError) {
            setError(getLoginErrorMessage(loginError || lastError));
        }
    };
    const handleLogout = async ()=>{
        if (user) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$auth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signOut"])();
        setUser(null);
    };
    const fillEditForm = async (id)=>{
        let item = partners.find((p)=>p.id === id);
        if (!item) {
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
            tags: item.tags || [],
            logoUrl: item.logoUrl || ""
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
                logoUrl: logoUrl || form.logoUrl || ""
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
                setError("Supabase access denied. Ստուգեք RLS policies-ը և admin allow-list-ը (public.admins).");
            } else if ((code || "") === "PGRST205") {
                const missing = getMissingTableName(submitError);
                setError(`Supabase schema is not ready (missing table${missing ? `: ${missing}` : "s"}). Run supabase/schema.sql in Supabase SQL Editor, then: notify pgrst, 'reload schema';`);
            } else if (lower.includes("bucket") && (lower.includes("not found") || lower.includes("does not exist"))) {
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
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$partners$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deletePartner"])(id);
            showSuccess("Գործընկերը ջնջվեց");
            await loadSupabaseData();
        } catch (deleteError) {
            if (deleteError?.status === 401 || deleteError?.status === 403 || String(deleteError?.message || "").toLowerCase().includes("row-level security") || String(deleteError?.message || "").toLowerCase().includes("permission denied")) {
                setError("Supabase access denied. Ստուգեք RLS policies-ը և admin allow-list-ը (public.admins).");
            }
            setError(`Գործընկերոջ ջնջումը չհաջողվեց (${deleteError?.code || "unknown"})`);
        }
    };
    const addTag = async ()=>{
        const nextName = newTagName.trim();
        if (!nextName) return;
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$tags$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTag"])(nextName);
            setNewTagName("");
            showSuccess("Tag-ը ավելացվեց");
            await loadSupabaseData();
        } catch (tagError) {
            if (tagError?.code === "PGRST205") {
                const missing = getMissingTableName(tagError) || "tags";
                setError(`Supabase schema is not ready (missing table: ${missing}). Run supabase/schema.sql in Supabase SQL Editor, then: notify pgrst, 'reload schema';`);
                return;
            }
            if (tagError?.status === 401 || tagError?.status === 403 || String(tagError?.message || "").toLowerCase().includes("row-level security") || String(tagError?.message || "").toLowerCase().includes("permission denied")) {
                setError("Supabase access denied. Ստուգեք RLS policies-ը և admin allow-list-ը (public.admins).");
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
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$tags$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateTag"])(editingTagId, editingTagName.trim());
            setEditingTagId("");
            setEditingTagName("");
            showSuccess("Tag-ը թարմացվեց");
            await loadSupabaseData();
        } catch (tagError) {
            if (tagError?.code === "PGRST205") {
                const missing = getMissingTableName(tagError) || "tags";
                setError(`Supabase schema is not ready (missing table: ${missing}). Run supabase/schema.sql in Supabase SQL Editor, then: notify pgrst, 'reload schema';`);
                return;
            }
            if (tagError?.status === 401 || tagError?.status === 403 || String(tagError?.message || "").toLowerCase().includes("row-level security") || String(tagError?.message || "").toLowerCase().includes("permission denied")) {
                setError("Supabase access denied. Ստուգեք RLS policies-ը և admin allow-list-ը (public.admins).");
            }
            setError(`Tag թարմացնելը չհաջողվեց (${tagError?.code || "unknown"})`);
        }
    };
    const removeTag = async (tagId)=>{
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
            if (tagError?.code === "PGRST205") {
                const missing = getMissingTableName(tagError) || "tags";
                setError(`Supabase schema is not ready (missing table: ${missing}). Run supabase/schema.sql in Supabase SQL Editor, then: notify pgrst, 'reload schema';`);
                return;
            }
            if (tagError?.status === 401 || tagError?.status === 403 || String(tagError?.message || "").toLowerCase().includes("row-level security") || String(tagError?.message || "").toLowerCase().includes("permission denied")) {
                setError("Supabase access denied. Ստուգեք RLS policies-ը և admin allow-list-ը (public.admins).");
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
            lineNumber: 433,
            columnNumber: 12
        }, this);
    }
    if (!user) {
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
                        lineNumber: 440,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm text-slate-500",
                        children: "URL: abc1111.am/admin"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 441,
                        columnNumber: 11
                    }, this),
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
                                lineNumber: 444,
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
                                lineNumber: 450,
                                columnNumber: 13
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-red-600",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 457,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "w-full bg-blue-500 rounded-xl px-4 py-3 font-semibold text-white",
                                children: "Մուտք"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 458,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 443,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 439,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/admin/page.jsx",
            lineNumber: 438,
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
                        lineNumber: 470,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full px-3 py-1 text-xs font-semibold border border-emerald-200 bg-emerald-50 text-emerald-700",
                                children: "SUPABASE MODE"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 472,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleLogout,
                                className: "rounded-xl border border-slate-300 px-4 py-2",
                                children: "Ելք"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 477,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 471,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 469,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 486,
                columnNumber: 9
            }, this) : null,
            successMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-6 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700",
                children: successMessage
            }, void 0, false, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 492,
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
                            lineNumber: 498,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: openAddPartnerModal,
                            className: "rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white",
                            children: "Ավելացնել գործընկեր"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/page.jsx",
                            lineNumber: 499,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/page.jsx",
                    lineNumber: 497,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 496,
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
                                    lineNumber: 513,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: closePartnerModal,
                                    className: "rounded-lg border border-slate-300 px-3 py-1.5 text-sm",
                                    children: "Փակել"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 514,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/page.jsx",
                            lineNumber: 512,
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
                                    lineNumber: 524,
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
                                    lineNumber: 530,
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
                                    lineNumber: 536,
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
                                    lineNumber: 542,
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
                                    lineNumber: 548,
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
                                    lineNumber: 554,
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
                                    lineNumber: 560,
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
                                            lineNumber: 567,
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
                                                            lineNumber: 574,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: tag.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/page.jsx",
                                                            lineNumber: 587,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, tag.id, true, {
                                                    fileName: "[project]/src/app/admin/page.jsx",
                                                    lineNumber: 573,
                                                    columnNumber: 25
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 569,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-slate-500",
                                            children: "Tag չկան։ Ստորև ավելացրեք առաջին tag-ը։"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 593,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 566,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "file",
                                    onChange: (event)=>setLogoFile(event.target.files?.[0] || null),
                                    accept: "image/*",
                                    className: "rounded-xl border border-slate-300 px-4 py-3 md:col-span-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 596,
                                    columnNumber: 15
                                }, this),
                                error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-red-600 md:col-span-2",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 603,
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
                                            lineNumber: 606,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: closePartnerModal,
                                            className: "rounded-xl border border-slate-300 px-5 py-3 font-semibold",
                                            children: "Չեղարկել"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 612,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 605,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/page.jsx",
                            lineNumber: 523,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/page.jsx",
                    lineNumber: 511,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 510,
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
                        lineNumber: 626,
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
                                lineNumber: 628,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: addTag,
                                className: "rounded-xl bg-blue-500 px-4 py-3 font-semibold text-white",
                                children: "Ավելացնել"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 634,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 627,
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
                                            lineNumber: 644,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: saveTagEdit,
                                            className: "rounded-lg border border-slate-300 px-3 py-2",
                                            children: "Պահպանել"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 655,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setEditingTagId(""),
                                            className: "rounded-lg border border-slate-300 px-3 py-2",
                                            children: "Չեղարկել"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 658,
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
                                            lineNumber: 664,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>startEditTag(tag),
                                            className: "rounded-lg border border-slate-300 px-3 py-2",
                                            children: "Խմբագրել"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 665,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>removeTag(tag.id),
                                            className: "rounded-lg border border-red-200 px-3 py-2 text-red-600",
                                            children: "Ջնջել"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 668,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, tag.id, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 641,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 639,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 625,
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
                        lineNumber: 679,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: partnerSearch,
                        onChange: (event)=>setPartnerSearch(event.target.value),
                        placeholder: "Փնտրել գործընկեր անունով կամ email-ով",
                        className: "mt-4 w-full rounded-xl border border-slate-300 px-4 py-3"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 680,
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
                                                    lineNumber: 690,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-slate-500",
                                                    children: item.email
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/page.jsx",
                                                    lineNumber: 691,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 689,
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
                                                    lineNumber: 694,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>removePartner(item.id),
                                                    className: "rounded-lg border border-red-200 px-4 py-2 text-red-600",
                                                    children: "Ջնջել"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/page.jsx",
                                                    lineNumber: 697,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/page.jsx",
                                            lineNumber: 693,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/src/app/admin/page.jsx",
                                    lineNumber: 688,
                                    columnNumber: 13
                                }, this)),
                            !filteredPartners.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-500",
                                children: "Գործընկերներ չեն գտնվել։"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 704,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 686,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 678,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/page.jsx",
        lineNumber: 468,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_5fae90ad._.js.map