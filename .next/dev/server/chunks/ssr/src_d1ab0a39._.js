module.exports = [
"[project]/src/lib/localize.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pickTextByLanguage",
    ()=>pickTextByLanguage
]);
function pickTextByLanguage(valueByLanguage = {}, selectedLanguage) {
    if (!valueByLanguage || typeof valueByLanguage !== "object") return "";
    if (selectedLanguage && valueByLanguage[selectedLanguage]) {
        return valueByLanguage[selectedLanguage];
    }
    return valueByLanguage.am || valueByLanguage.en || valueByLanguage.ru || "";
}
}),
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
"[project]/src/app/partners/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PartnersPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$LanguageContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/LanguageContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/localize.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$partners$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/partners.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$tags$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/tags.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const PAGE_SIZE = 8;
function getMissingTableName(error) {
    const msg = String(error?.message || '');
    // PostgREST PGRST205 typically says: Could not find the 'partners' table in the schema cache
    const match = msg.match(/'([^']+)'/);
    return match?.[1] || '';
}
function PartnersPage() {
    const { t, language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$LanguageContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    const [partners, setPartners] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [availableTags, setAvailableTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        const load = async ()=>{
            setLoadError('');
            setIsLoading(true);
            try {
                const [partnersData, tagsData] = await Promise.all([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$partners$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchPartners"])(),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$tags$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchTags"])()
                ]);
                if (cancelled) return;
                setPartners(partnersData);
                setAvailableTags((tagsData || []).map((tag)=>tag.name));
            } catch (error) {
                if (cancelled) return;
                const code = error?.code || error?.status || 'unknown';
                if (code === 'PGRST205') {
                    const missing = getMissingTableName(error);
                    setLoadError(`Supabase schema is not ready (missing table${missing ? `: ${missing}` : 's'}). Run supabase/schema.sql in Supabase SQL Editor, then run: notify pgrst, 'reload schema';`);
                } else {
                    setLoadError(`Supabase unavailable (${code}). ${String(error?.message || '')}`.trim());
                }
                setPartners([]);
                setAvailableTags([]);
            } finally{
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };
        load();
        return ()=>{
            cancelled = true;
        };
    }, []);
    const categories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (availableTags.length) return availableTags;
        const unique = new Set();
        partners.forEach((item)=>(item.tags || []).forEach((tag)=>unique.add(tag)));
        return Array.from(unique);
    }, [
        partners,
        availableTags
    ]);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return partners.filter((item)=>{
            const localizedName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pickTextByLanguage"])(item.name, language);
            const byName = localizedName.toLowerCase().includes(query.toLowerCase());
            const byCategory = category === 'all' ? true : (item.tags || []).includes(category);
            return byName && byCategory;
        });
    }, [
        partners,
        query,
        category,
        language
    ]);
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setPage(1);
    }, [
        query,
        category
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "container-abc py-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-4xl font-black text-brand.dark",
                children: t.partners.title
            }, void 0, false, {
                fileName: "[project]/src/app/partners/page.jsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            loadError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700",
                children: loadError
            }, void 0, false, {
                fileName: "[project]/src/app/partners/page.jsx",
                lineNumber: 93,
                columnNumber: 20
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 gap-4 md:flex-row flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: query,
                        onChange: (event)=>setQuery(event.target.value),
                        placeholder: t.partners.search,
                        className: "rounded-xl border-slate-300 px-4 py-3 focus:border-blue-500 w-full border outline-none"
                    }, void 0, false, {
                        fileName: "[project]/src/app/partners/page.jsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: category,
                        onChange: (event)=>setCategory(event.target.value),
                        className: "rounded-xl border-slate-300 bg-white py-3 pl-4 pr-10 focus:border-blue-500 min-w-[240px] cursor-pointer appearance-none border bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207l5%205%205-5%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-[right_12px_center] bg-no-repeat outline-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "all",
                                children: t.partners.allCategories
                            }, void 0, false, {
                                fileName: "[project]/src/app/partners/page.jsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this),
                            categories.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: item,
                                    children: item
                                }, item, false, {
                                    fileName: "[project]/src/app/partners/page.jsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/partners/page.jsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/partners/page.jsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 rounded-2xl border-slate-200 bg-white overflow-y-auto border",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "divide-slate-200 min-w-full divide-y",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-slate-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-xs tracking-wider text-slate-500 text-left uppercase",
                                        children: t.partners.table.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/partners/page.jsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-xs tracking-wider text-slate-500 text-left uppercase",
                                        children: t.partners.table.categories
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/partners/page.jsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-4 py-3 text-xs tracking-wider text-slate-500 text-left uppercase",
                                        children: t.partners.table.email
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/partners/page.jsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/partners/page.jsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/partners/page.jsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            className: "divide-slate-100 divide-y",
                            children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    colSpan: "3",
                                    className: "py-12 text-slate-500 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-3 h-8 w-8 animate-spin border-blue-500 mx-auto rounded-full border-4 border-r-transparent"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/partners/page.jsx",
                                            lineNumber: 135,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "Բեռնվում է..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/partners/page.jsx",
                                            lineNumber: 136,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/partners/page.jsx",
                                    lineNumber: 134,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/partners/page.jsx",
                                lineNumber: 133,
                                columnNumber: 15
                            }, this) : paginated.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    colSpan: "3",
                                    className: "py-8 text-slate-500 text-center",
                                    children: "Գործընկերներ չեն գտնվել:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/partners/page.jsx",
                                    lineNumber: 141,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/partners/page.jsx",
                                lineNumber: 140,
                                columnNumber: 15
                            }, this) : paginated.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "hover:bg-slate-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "gap-3 flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-12 w-12 rounded-md border-slate-200 bg-slate-100 shrink-0 overflow-hidden border",
                                                        children: item.logoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            src: item.logoUrl,
                                                            alt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pickTextByLanguage"])(item.name, language) || 'logo',
                                                            width: 48,
                                                            height: 48,
                                                            className: "h-full w-full object-cover"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/partners/page.jsx",
                                                            lineNumber: 152,
                                                            columnNumber: 27
                                                        }, this) : null
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/partners/page.jsx",
                                                        lineNumber: 150,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        href: `/partner/${item.slug}`,
                                                        className: "font-semibold text-blue-500 hover:underline",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pickTextByLanguage"])(item.name, language)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/partners/page.jsx",
                                                        lineNumber: 161,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/partners/page.jsx",
                                                lineNumber: 149,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/partners/page.jsx",
                                            lineNumber: 148,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 text-slate-600",
                                            children: (()=>{
                                                const validTags = (item.tags || []).filter((tag)=>availableTags.includes(tag));
                                                return validTags.length > 0 ? validTags.join(', ') : '-';
                                            })()
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/partners/page.jsx",
                                            lineNumber: 166,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-4 py-3 text-slate-600",
                                            children: item.email
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/partners/page.jsx",
                                            lineNumber: 172,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/src/app/partners/page.jsx",
                                    lineNumber: 147,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/partners/page.jsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/partners/page.jsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/partners/page.jsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 gap-3 flex items-center justify-end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setPage((prev)=>Math.max(1, prev - 1)),
                        disabled: page === 1,
                        className: "rounded-lg border-slate-300 px-4 py-2 border disabled:opacity-40",
                        children: "Prev"
                    }, void 0, false, {
                        fileName: "[project]/src/app/partners/page.jsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-600",
                        children: `${t.common.page} ${page} ${t.common.of} ${totalPages}`
                    }, void 0, false, {
                        fileName: "[project]/src/app/partners/page.jsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setPage((prev)=>Math.min(totalPages, prev + 1)),
                        disabled: page >= totalPages,
                        className: "rounded-lg border-slate-300 px-4 py-2 border disabled:opacity-40",
                        children: "Next"
                    }, void 0, false, {
                        fileName: "[project]/src/app/partners/page.jsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/partners/page.jsx",
                lineNumber: 180,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/partners/page.jsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_d1ab0a39._.js.map