(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/slugify.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "slugify",
    ()=>slugify
]);
function slugify(input) {
    const amChars = {
        'ա': 'a',
        'բ': 'b',
        'գ': 'g',
        'դ': 'd',
        'ե': 'e',
        'զ': 'z',
        'է': 'e',
        'ը': 'y',
        'թ': 't',
        'ժ': 'zh',
        'ի': 'i',
        'լ': 'l',
        'խ': 'kh',
        'ծ': 'ts',
        'կ': 'k',
        'հ': 'h',
        'ձ': 'dz',
        'ղ': 'gh',
        'ճ': 'ch',
        'մ': 'm',
        'յ': 'y',
        'ն': 'n',
        'շ': 'sh',
        'ո': 'o',
        'չ': 'ch',
        'պ': 'p',
        'ջ': 'j',
        'ռ': 'r',
        'ս': 's',
        'վ': 'v',
        'տ': 't',
        'ր': 'r',
        'ց': 'ts',
        'ւ': 'v',
        'փ': 'p',
        'ք': 'k',
        'օ': 'o',
        'ֆ': 'f',
        'և': 'ev'
    };
    const ruChars = {
        'а': 'a',
        'б': 'b',
        'в': 'v',
        'г': 'g',
        'д': 'd',
        'е': 'e',
        'ё': 'yo',
        'ж': 'zh',
        'з': 'z',
        'и': 'i',
        'й': 'y',
        'к': 'k',
        'л': 'l',
        'м': 'm',
        'н': 'n',
        'о': 'o',
        'п': 'p',
        'р': 'r',
        'с': 's',
        'т': 't',
        'у': 'u',
        'ф': 'f',
        'х': 'kh',
        'ц': 'ts',
        'ч': 'ch',
        'ш': 'sh',
        'щ': 'shch',
        'ъ': '',
        'ы': 'y',
        'ь': '',
        'э': 'e',
        'ю': 'yu',
        'я': 'ya'
    };
    let str = String(input).toLowerCase().trim();
    let result = '';
    for(let i = 0; i < str.length; i++){
        const char = str[i];
        if (amChars[char] !== undefined) result += amChars[char];
        else if (ruChars[char] !== undefined) result += ruChars[char];
        else result += char;
    }
    return result.replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/^-+|-+$/g, "").replace(/-+/g, "-") || Date.now().toString(36);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/supabase/client.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://icnamgvlmqmopmjcuaiy.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "sb_publishable_Kxg6v0Ecx9Y0lXgqHURWTA_ObNJmqUF");
// Keep this module client-safe: only NEXT_PUBLIC_* env vars.
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/supabase/auth.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.js [app-client] (ecmascript)");
;
async function signInWithPassword(email, password) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithPassword({
        email,
        password
    });
}
async function signOut() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
}
async function getSession() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
}
function onAuthStateChange(callback) {
    // Returns { data: { subscription } }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange((_event, session)=>{
        callback(session);
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/supabase/partners.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.js [app-client] (ecmascript)");
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
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("partners").select("*").order("created_at", {
        ascending: false
    });
    if (error) throw error;
    return (data || []).map(fromRow);
}
async function fetchPartnerBySlug(slug) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("partners").select("*").eq("slug", slug).single();
    if (error) {
        // Supabase returns a 406-ish error when no rows; normalize to null.
        if (String(error.code || "").toUpperCase() === "PGRST116") return null;
        throw error;
    }
    return fromRow(data);
}
async function fetchPartnerById(partnerId) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("partners").select("*").eq("id", partnerId).single();
    if (error) {
        if (String(error.code || "").toUpperCase() === "PGRST116") return null;
        throw error;
    }
    return fromRow(data);
}
async function createPartner(payload) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("partners").insert(toRow(payload)).select("*").single();
    if (error) throw error;
    return fromRow(data);
}
async function updatePartner(partnerId, payload) {
    const row = toRow(payload);
    // updated_at is managed by trigger in SQL, but setting it here is fine if trigger isn't present.
    row.updated_at = new Date().toISOString();
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("partners").update(row).eq("id", partnerId).select("*").single();
    if (error) throw error;
    return fromRow(data);
}
async function deletePartner(partnerId) {
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("partners").delete().eq("id", partnerId);
    if (error) throw error;
    return true;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/supabase/storage.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uploadPartnerLogo",
    ()=>uploadPartnerLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.js [app-client] (ecmascript)");
;
const BUCKET = "partner-logos";
async function uploadPartnerLogo(file, slug) {
    if (!file) throw new Error("Missing file");
    const safeName = String(file.name || "logo").replace(/\s+/g, "-");
    const path = `partners/${slug}-${Date.now()}-${safeName}`;
    const { error: uploadError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from(BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || "application/octet-stream"
    });
    if (uploadError) throw uploadError;
    const { data } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/supabase/tags.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slugify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/slugify.js [app-client] (ecmascript)");
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
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("tags").select("*").order("name", {
        ascending: true
    });
    if (error) throw error;
    return (data || []).map(fromRow);
}
async function createTag(name) {
    const cleanName = String(name || "").trim();
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("tags").insert({
        name: cleanName,
        slug: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slugify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["slugify"])(cleanName)
    }).select("*").single();
    if (error) throw error;
    return fromRow(data);
}
async function updateTag(tagId, name) {
    const cleanName = String(name || "").trim();
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("tags").update({
        name: cleanName,
        slug: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slugify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["slugify"])(cleanName)
    }).eq("id", tagId).select("*").single();
    if (error) throw error;
    return fromRow(data);
}
async function deleteTag(tagId) {
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("tags").delete().eq("id", tagId);
    if (error) throw error;
    return true;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/admin/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)"); // Ավելացրել ենք Link հղման համար
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slugify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/slugify.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/auth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$partners$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/partners.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/storage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$tags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/tags.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
const ADMIN_USERNAME = 'abc1111';
const ADMIN_EMAIL = ("TURBOPACK compile-time value", "sasunmkrtumyan92@gmail.com") || 'sasunmkrtumyan92@gmail.com';
function getMissingTableName(error) {
    const msg = String(error?.message || '');
    const match = msg.match(/'([^']+)'/);
    return match?.[1] || '';
}
function getLoginErrorMessage(error) {
    const message = String(error?.message || error || '').toLowerCase();
    if (message.includes('invalid login credentials')) return 'Սխալ email կամ գաղտնաբառ';
    if (message.includes('email not confirmed')) return 'Email-ը հաստատված չէ (Supabase Auth)';
    if (message.includes('user not found')) return 'Ադմին օգտատեր չի գտնվել Supabase-ում';
    if (message.includes('network') || message.includes('fetch')) return 'Ցանցային խնդիր կա, ստուգեք ինտերնետ կապը';
    return `Մուտքը չհաջողվեց (${error?.message || 'unknown'}). Ստուգեք կարգավորումները`;
}
const emptyForm = {
    name: '',
    descriptionAm: '',
    descriptionRu: '',
    descriptionEn: '',
    email: '',
    location: '',
    phones: '',
    tags: [],
    logoUrl: ''
};
function pickLocalizedValue(valueByLang = {}) {
    return valueByLang.am || valueByLang.en || valueByLang.ru || '';
}
function AdminPage() {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('add-partner'); // Լռելյայն tab
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [partners, setPartners] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [availableTags, setAvailableTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(emptyForm);
    const [logoFile, setLogoFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [successMessage, setSuccessMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [partnerSearch, setPartnerSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newTagName, setNewTagName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [editingTagId, setEditingTagId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [editingTagName, setEditingTagName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const isEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminPage.useMemo[isEdit]": ()=>Boolean(editingId)
    }["AdminPage.useMemo[isEdit]"], [
        editingId
    ]);
    const isAuthenticated = Boolean(user);
    const showSuccess = (message)=>{
        setSuccessMessage(message);
        setTimeout(()=>setSuccessMessage(''), 2500);
    };
    const loadSupabaseData = async ()=>{
        try {
            const [partnersData, tagsData] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$partners$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchPartners"])(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$tags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTags"])()
            ]);
            setPartners(partnersData);
            setAvailableTags(tagsData);
        } catch (loadError) {
            setError(`Supabase սխալ: ${loadError?.message}`);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminPage.useEffect": ()=>{
            let cancelled = false;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSession"])().then({
                "AdminPage.useEffect": ({ data })=>{
                    if (!cancelled) {
                        setUser(data?.session?.user || null);
                        setIsLoading(false);
                    }
                }
            }["AdminPage.useEffect"]);
            const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onAuthStateChange"])({
                "AdminPage.useEffect": (session)=>{
                    if (!cancelled) setUser(session?.user || null);
                }
            }["AdminPage.useEffect"]);
            return ({
                "AdminPage.useEffect": ()=>{
                    cancelled = true;
                    data?.subscription?.unsubscribe();
                }
            })["AdminPage.useEffect"];
        }
    }["AdminPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminPage.useEffect": ()=>{
            if (isAuthenticated) loadSupabaseData();
        }
    }["AdminPage.useEffect"], [
        isAuthenticated
    ]);
    const login = async (event)=>{
        event.preventDefault();
        setError('');
        if (username !== ADMIN_USERNAME) {
            setError('Սխալ մուտքանուն');
            return;
        }
        const { error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signInWithPassword"])(ADMIN_EMAIL, password);
        if (error) setError(getLoginErrorMessage(error));
    };
    const handleLogout = async ()=>{
        if (user) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$auth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])();
        setUser(null);
    };
    const fillEditForm = (id)=>{
        const item = partners.find((p)=>p.id === id);
        if (!item) return;
        setEditingId(id);
        setForm({
            name: pickLocalizedValue(item.name),
            descriptionAm: item.description?.am || '',
            descriptionRu: item.description?.ru || '',
            descriptionEn: item.description?.en || '',
            email: item.email || '',
            location: item.location || '',
            phones: (item.phones || []).join(', '),
            tags: item.tags || [],
            logoUrl: item.logoUrl || ''
        });
        setActiveTab('add-partner');
    };
    const clearForm = ()=>{
        setForm(emptyForm);
        setEditingId(null);
        setLogoFile(null);
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        setSubmitting(true);
        const slug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$slugify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["slugify"])(form.name);
        let logoUrl = null;
        try {
            if (logoFile) logoUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadPartnerLogo"])(logoFile, slug);
            const payload = {
                slug,
                name: {
                    am: form.name,
                    en: form.name,
                    ru: form.name
                },
                description: {
                    am: form.descriptionAm,
                    en: form.descriptionEn,
                    ru: form.descriptionRu
                },
                email: form.email,
                location: form.location,
                phones: form.phones.split(',').map((p)=>p.trim()).filter(Boolean),
                tags: form.tags,
                logoUrl: logoUrl || form.logoUrl
            };
            if (isEdit) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$partners$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePartner"])(editingId, payload);
                showSuccess('Թարմացվեց');
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$partners$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPartner"])(payload);
                showSuccess('Ավելացվեց');
            }
            await loadSupabaseData();
            clearForm();
            setActiveTab('partners');
        } catch (e) {
            setError('Գործողությունը ձախողվեց');
        } finally{
            setSubmitting(false);
        }
    };
    // Tag functions (same logic)
    const addTag = async ()=>{
        if (!newTagName.trim()) return;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$tags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTag"])(newTagName.trim());
        setNewTagName('');
        loadSupabaseData();
    };
    const removePartner = async (id)=>{
        if (confirm('Համոզվա՞ծ եք:')) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$partners$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deletePartner"])(id);
            loadSupabaseData();
        }
    };
    if (isLoading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "container-abc py-12",
        children: "Բեռնվում է..."
    }, void 0, false, {
        fileName: "[project]/src/app/admin/page.jsx",
        lineNumber: 197,
        columnNumber: 25
    }, this);
    if (!user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "container-abc py-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "max-w-md rounded-2xl bg-white p-8 shadow-sm mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-black text-slate-800",
                        children: "Ադմին մուտք"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 203,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: login,
                        className: "mt-6 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: username,
                                onChange: (e)=>setUsername(e.target.value),
                                placeholder: "Մուտքանուն",
                                className: "rounded-xl border-slate-300 px-4 py-3 w-full border"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 205,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "password",
                                value: password,
                                onChange: (e)=>setPassword(e.target.value),
                                placeholder: "Գաղտնաբառ",
                                className: "rounded-xl border-slate-300 px-4 py-3 w-full border"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 211,
                                columnNumber: 13
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-red-600",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 218,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-blue-600 rounded-xl px-4 py-3 font-semibold text-white w-full",
                                children: "Մուտք"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 219,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 204,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 202,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/admin/page.jsx",
            lineNumber: 201,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "container-abc py-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-black text-slate-800",
                        children: "Admin Panel"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "gap-3 flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "rounded-xl bg-slate-100 flex items-center gap-2 px-4 py-2 font-medium hover:bg-slate-200 transition",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        width: "20",
                                        height: "20",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.jsx",
                                                lineNumber: 233,
                                                columnNumber: 191
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                points: "9 22 9 12 15 12 15 22"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.jsx",
                                                lineNumber: 233,
                                                columnNumber: 249
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/page.jsx",
                                        lineNumber: 233,
                                        columnNumber: 13
                                    }, this),
                                    "Home"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleLogout,
                                className: "rounded-xl border-slate-300 px-4 py-2 hover:bg-red-50 hover:text-red-700 transition border",
                                children: "Ելք"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 229,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 gap-2 border-slate-200 flex border-b pb-px",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('add-partner'),
                        className: `px-6 py-3 font-bold transition-all ${activeTab === 'add-partner' ? 'border-blue-600 text-blue-600 border-b-2' : 'text-slate-500'}`,
                        children: isEdit ? 'Խմբագրել' : 'Ավելացնել գործընկեր'
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('tags'),
                        className: `px-6 py-3 font-bold transition-all ${activeTab === 'tags' ? 'border-blue-600 text-blue-600 border-b-2' : 'text-slate-500'}`,
                        children: "Tags"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 250,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setActiveTab('partners');
                            clearForm();
                        },
                        className: `px-6 py-3 font-bold transition-all ${activeTab === 'partners' ? 'border-blue-600 text-blue-600 border-b-2' : 'text-slate-500'}`,
                        children: "Գործընկերների ցանկ"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 243,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-4 text-red-600 bg-red-50 p-3 rounded-xl border-red-100 border",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 267,
                columnNumber: 17
            }, this),
            successMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-4 text-green-600 bg-green-50 p-3 rounded-xl border-green-100 border",
                children: successMessage
            }, void 0, false, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 269,
                columnNumber: 9
            }, this),
            activeTab === 'partners' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "rounded-2xl bg-white p-6 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: partnerSearch,
                        onChange: (e)=>setPartnerSearch(e.target.value),
                        placeholder: "Փնտրել գործընկեր...",
                        className: "mb-6 rounded-xl border-slate-300 px-4 py-3 w-full border"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 275,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: partners.filter((p)=>pickLocalizedValue(p.name).toLowerCase().includes(partnerSearch.toLowerCase())).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-slate-100 rounded-xl hover:bg-slate-50 flex items-center justify-between border transition",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-bold text-slate-800",
                                                children: pickLocalizedValue(item.name)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.jsx",
                                                lineNumber: 290,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-500",
                                                children: item.email
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.jsx",
                                                lineNumber: 291,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/page.jsx",
                                        lineNumber: 289,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "gap-2 flex",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>fillEditForm(item.id),
                                                className: "px-4 py-2 text-sm font-semibold bg-slate-100 rounded-lg",
                                                children: "Խմբագրել"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.jsx",
                                                lineNumber: 294,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>removePartner(item.id),
                                                className: "px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-lg",
                                                children: "Ջնջել"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.jsx",
                                                lineNumber: 300,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/page.jsx",
                                        lineNumber: 293,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 285,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 281,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 274,
                columnNumber: 9
            }, this),
            activeTab === 'add-partner' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "rounded-2xl bg-white p-8 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold mb-6",
                        children: isEdit ? 'Խմբագրել' : 'Նոր գործընկեր'
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 316,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        className: "md:grid-cols-2 gap-6 grid grid-cols-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: form.name,
                                onChange: (e)=>setForm({
                                        ...form,
                                        name: e.target.value
                                    }),
                                placeholder: "Անուն*",
                                className: "md:col-span-2 rounded-xl border-slate-300 px-4 py-3 border",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 318,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: form.descriptionAm,
                                onChange: (e)=>setForm({
                                        ...form,
                                        descriptionAm: e.target.value
                                    }),
                                placeholder: "Նկարագրություն (AM)",
                                className: "rounded-xl border-slate-300 px-4 py-3 h-32 border"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 325,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: form.descriptionRu,
                                onChange: (e)=>setForm({
                                        ...form,
                                        descriptionRu: e.target.value
                                    }),
                                placeholder: "Описание (RU)",
                                className: "rounded-xl border-slate-300 px-4 py-3 h-32 border"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 331,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: form.descriptionEn,
                                onChange: (e)=>setForm({
                                        ...form,
                                        descriptionEn: e.target.value
                                    }),
                                placeholder: "Description (EN)",
                                className: "md:col-span-2 rounded-xl border-slate-300 px-4 py-3 h-32 border"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 337,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: form.email,
                                onChange: (e)=>setForm({
                                        ...form,
                                        email: e.target.value
                                    }),
                                placeholder: "Email*",
                                className: "rounded-xl border-slate-300 px-4 py-3 border",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 343,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: form.location,
                                onChange: (e)=>setForm({
                                        ...form,
                                        location: e.target.value
                                    }),
                                placeholder: "Հասցե",
                                className: "rounded-xl border-slate-300 px-4 py-3 border"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 350,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: form.phones,
                                onChange: (e)=>setForm({
                                        ...form,
                                        phones: e.target.value
                                    }),
                                placeholder: "Հեռախոսներ (ստորակետով)",
                                className: "md:col-span-2 rounded-xl border-slate-300 px-4 py-3 border"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 356,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:col-span-2 p-4 border-slate-200 rounded-xl border",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-3 font-semibold text-slate-700",
                                        children: "Tags*"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.jsx",
                                        lineNumber: 364,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "gap-2 flex flex-wrap",
                                        children: availableTags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: `px-3 py-1.5 rounded-lg cursor-pointer border transition ${form.tags.includes(tag.name) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        className: "hidden",
                                                        checked: form.tags.includes(tag.name),
                                                        onChange: (e)=>{
                                                            const next = e.target.checked ? [
                                                                ...form.tags,
                                                                tag.name
                                                            ] : form.tags.filter((t)=>t !== tag.name);
                                                            setForm({
                                                                ...form,
                                                                tags: next
                                                            });
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/page.jsx",
                                                        lineNumber: 371,
                                                        columnNumber: 21
                                                    }, this),
                                                    tag.name
                                                ]
                                            }, tag.id, true, {
                                                fileName: "[project]/src/app/admin/page.jsx",
                                                lineNumber: 367,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.jsx",
                                        lineNumber: 365,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 363,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:col-span-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-2 text-sm font-medium text-slate-500",
                                        children: "Լոգո (պարտադիր նորի համար)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.jsx",
                                        lineNumber: 389,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        onChange: (e)=>setLogoFile(e.target.files?.[0]),
                                        className: "w-full",
                                        accept: "image/*"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.jsx",
                                        lineNumber: 390,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 388,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "gap-4 md:col-span-2 pt-4 flex",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        disabled: submitting,
                                        className: "bg-blue-600 text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50",
                                        children: submitting ? 'Պահպանվում է...' : isEdit ? 'Թարմացնել' : 'Ստեղծել'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.jsx",
                                        lineNumber: 399,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            clearForm();
                                            setActiveTab('partners');
                                        },
                                        className: "bg-slate-100 px-8 py-3 rounded-xl font-bold",
                                        children: "Չեղարկել"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.jsx",
                                        lineNumber: 405,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 398,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 317,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 315,
                columnNumber: 9
            }, this),
            activeTab === 'tags' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "rounded-2xl bg-white p-8 shadow-sm max-w-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "gap-3 mb-8 flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: newTagName,
                                onChange: (e)=>setNewTagName(e.target.value),
                                placeholder: "Նոր tag",
                                className: "rounded-xl border-slate-300 px-4 py-3 w-full border"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 424,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: addTag,
                                className: "bg-blue-600 text-white px-6 py-3 rounded-xl font-bold whitespace-nowrap",
                                children: "Ավելացնել"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 430,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 423,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: availableTags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 border-slate-100 rounded-xl flex items-center justify-between border",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium",
                                        children: tag.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.jsx",
                                        lineNumber: 440,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>removeTag(tag.id),
                                        className: "text-red-500 text-sm font-bold",
                                        children: "Ջնջել"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.jsx",
                                        lineNumber: 441,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, tag.id, true, {
                                fileName: "[project]/src/app/admin/page.jsx",
                                lineNumber: 439,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.jsx",
                        lineNumber: 437,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.jsx",
                lineNumber: 422,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/page.jsx",
        lineNumber: 227,
        columnNumber: 5
    }, this);
}
_s(AdminPage, "+RY3eShkTVMnPhMqW9f6LYQ/VQ4=");
_c = AdminPage;
var _c;
__turbopack_context__.k.register(_c, "AdminPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1406cefd._.js.map