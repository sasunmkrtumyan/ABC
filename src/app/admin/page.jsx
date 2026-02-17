"use client";

import { useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../lib/firebase/client";
import {
  createPartner,
  deletePartner,
  fetchPartnerById,
  subscribePartners,
  updatePartner,
} from "../../lib/firebase/partners";
import { createTag, deleteTag, subscribeTags, updateTag } from "../../lib/firebase/tags";
import { uploadPartnerLogo } from "../../lib/firebase/storage";
import { slugify } from "../../lib/slugify";
import {
  readLocalPartners,
  readLocalTags,
  toLocalId,
  writeLocalPartners,
  writeLocalTags,
} from "../../lib/localDb";

const ADMIN_USERNAME = "abc1111";
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "abc1111@abc1111.am";
const LOCAL_ADMIN_PASSWORD = "Ernestabc1111";
const LOCAL_ADMIN_SESSION_KEY = "abc_local_admin_session";
const ENABLE_LOCAL_ADMIN_FALLBACK =
  process.env.NODE_ENV !== "production" &&
  process.env.NEXT_PUBLIC_ENABLE_LOCAL_ADMIN_FALLBACK !== "false";

function getLoginErrorMessage(errorCode) {
  const code = (errorCode || "").toLowerCase();

  if (code.includes("auth/invalid-credential")) {
    return "Սխալ գաղտնաբառ կամ email";
  }
  if (code.includes("auth/invalid-login-credentials")) {
    return "Սխալ email կամ գաղտնաբառ";
  }
  if (code.includes("auth/wrong-password")) {
    return "Սխալ գաղտնաբառ";
  }
  if (code.includes("auth/user-not-found")) {
    return "Ադմին օգտատեր չի գտնվել Firebase-ում";
  }
  if (code.includes("auth/invalid-email")) {
    return "NEXT_PUBLIC_ADMIN_EMAIL-ը սխալ է";
  }
  if (code.includes("auth/user-disabled")) {
    return "Այս ադմին օգտատերը անջատված է";
  }
  if (code.includes("auth/too-many-requests")) {
    return "Շատ անհաջող փորձեր կան, փորձեք քիչ հետո";
  }
  if (code.includes("auth/network-request-failed")) {
    return "Ցանցային խնդիր կա, ստուգեք ինտերնետ կապը";
  }
  if (code.includes("auth/operation-not-allowed")) {
    return "Firebase-ում Email/Password մուտքը միացված չէ";
  }
  if (code.includes("auth/configuration-not-found")) {
    return "Firebase Authentication-ը կազմաձևված չէ";
  }
  if (code.includes("auth/internal-error")) {
    return "Firebase ներքին սխալ. փորձեք կրկին";
  }

  return `Մուտքը չհաջողվեց (${errorCode || "unknown"}). Ստուգեք կարգավորումները`;
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
};

function pickLocalizedValue(valueByLang = {}) {
  return valueByLang.am || valueByLang.en || valueByLang.ru || "";
}

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isLocalAdmin, setIsLocalAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [partners, setPartners] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [logoFile, setLogoFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [partnerSearch, setPartnerSearch] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [editingTagId, setEditingTagId] = useState("");
  const [editingTagName, setEditingTagName] = useState("");
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [dataMode, setDataMode] = useState("firebase");

  const isEdit = useMemo(() => Boolean(editingId), [editingId]);
  const isAuthenticated = Boolean(user || isLocalAdmin);

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 2500);
  };

  const switchToLocalMode = (message) => {
    setDataMode("local");
    setPartners(readLocalPartners());
    setAvailableTags(readLocalTags());
    if (message) setError(message);
  };

  useEffect(() => {
    const hasLocalSession = window.localStorage.getItem(LOCAL_ADMIN_SESSION_KEY) === "1";
    if (hasLocalSession && ENABLE_LOCAL_ADMIN_FALLBACK) {
      setIsLocalAdmin(true);
      setIsLoading(false);
    }

    const unsub = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      if (!hasLocalSession) setIsLoading(false);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return undefined;
    if (dataMode === "local") {
      setPartners(readLocalPartners());
      setAvailableTags(readLocalTags());
      return undefined;
    }

    const unsubPartners = subscribePartners(
      (data) => setPartners(data),
      () => switchToLocalMode("Firebase հասանելի չէ. անցում տեղային ռեժիմի")
    );
    const unsubTags = subscribeTags(
      (data) => setAvailableTags(data),
      () => switchToLocalMode("Firebase հասանելի չէ. tag-երը տեղային ռեժիմում են")
    );

    return () => {
      unsubPartners();
      unsubTags();
    };
  }, [isAuthenticated, dataMode]);

  const login = async (event) => {
    event.preventDefault();
    setError("");
    if (username !== ADMIN_USERNAME) {
      setError("Սխալ մուտքանուն");
      return;
    }

    const emailCandidates = Array.from(
      new Set([ADMIN_EMAIL, "abc1111@abc1111.am", "abc1111@gmail.com"].filter(Boolean))
    );

    let lastErrorCode = "";
    try {
      for (const email of emailCandidates) {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          return;
        } catch (candidateError) {
          lastErrorCode = candidateError?.code || "";
          // Stop early for non-credential/config errors.
          if (
            lastErrorCode &&
            !lastErrorCode.includes("auth/user-not-found") &&
            !lastErrorCode.includes("auth/invalid-credential") &&
            !lastErrorCode.includes("auth/invalid-login-credentials")
          ) {
            break;
          }
        }
      }

      if (ENABLE_LOCAL_ADMIN_FALLBACK && password === LOCAL_ADMIN_PASSWORD) {
        window.localStorage.setItem(LOCAL_ADMIN_SESSION_KEY, "1");
        setIsLocalAdmin(true);
        setError("");
        return;
      }

      setError(getLoginErrorMessage(lastErrorCode));
    } catch (loginError) {
      setError(getLoginErrorMessage(loginError?.code || lastErrorCode));
    }
  };

  const handleLogout = async () => {
    if (user) await signOut(auth);
    window.localStorage.removeItem(LOCAL_ADMIN_SESSION_KEY);
    setIsLocalAdmin(false);
    setUser(null);
  };

  const fillEditForm = async (id) => {
    let item = partners.find((p) => p.id === id);
    if (!item && dataMode !== "local") {
      item = await fetchPartnerById(id);
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
    });
    setLogoFile(null);
    setIsPartnerModalOpen(true);
  };

  const clearForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setLogoFile(null);
  };

  const openAddPartnerModal = () => {
    setError("");
    clearForm();
    setIsPartnerModalOpen(true);
  };

  const closePartnerModal = () => {
    setIsPartnerModalOpen(false);
    setError("");
    clearForm();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    const tags = (form.tags || []).map((item) => item.trim()).filter(Boolean);
    const phones = form.phones
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

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

    const slug = slugify(form.name);
    let logoUrl = null;

    try {
      if (dataMode === "local") {
        if (logoFile) {
          logoUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result || ""));
            reader.onerror = reject;
            reader.readAsDataURL(logoFile);
          });
        }

        const payload = {
          slug,
          name: { am: form.name, en: form.name, ru: form.name },
          description: {
            am: form.descriptionAm || "",
            en: form.descriptionEn || "",
            ru: form.descriptionRu || "",
          },
          email: form.email,
          location: form.location || "",
          phones,
          tags,
          ...(logoUrl ? { logoUrl } : {}),
        };

        if (isEdit) {
          const updated = partners.map((item) =>
            item.id === editingId ? { ...item, ...payload, updatedAt: Date.now() } : item
          );
          setPartners(updated);
          writeLocalPartners(updated);
          showSuccess("Գործընկերը հաջողությամբ թարմացվեց (local)");
        } else {
          const next = [
            { id: toLocalId("partner"), ...payload, createdAt: Date.now(), updatedAt: Date.now() },
            ...partners,
          ];
          setPartners(next);
          writeLocalPartners(next);
          showSuccess("Գործընկերը հաջողությամբ ավելացվեց (local)");
        }
        closePartnerModal();
        return;
      }

      if (logoFile) logoUrl = await uploadPartnerLogo(logoFile, slug);

      const payload = {
        slug,
        name: { am: form.name, en: form.name, ru: form.name },
        description: {
          am: form.descriptionAm || "",
          en: form.descriptionEn || "",
          ru: form.descriptionRu || "",
        },
        email: form.email,
        location: form.location || "",
        phones,
        tags,
        ...(logoUrl ? { logoUrl } : {}),
      };

      if (isEdit) {
        await updatePartner(editingId, payload);
        showSuccess("Գործընկերը հաջողությամբ թարմացվեց");
      } else {
        await createPartner(payload);
        showSuccess("Գործընկերը հաջողությամբ ավելացվեց");
      }

      closePartnerModal();
    } catch (submitError) {
      const code = submitError?.code || "";
      if (code.includes("permission-denied") || String(submitError?.message || "").includes("PERMISSION_DENIED")) {
        switchToLocalMode("Firebase access denied. Անցում տեղային ռեժիմի");
      }
      if (code.includes("storage/unauthorized")) {
        setError("Storage թույլտվություն չկա. ստուգեք Firebase Storage Rules-ը");
      } else if (code.includes("storage/object-not-found") || String(submitError?.message || "").includes("404")) {
        setError("Storage bucket-ը չի գտնվել (404). Ստուգեք Firebase Storage-ի bucket կարգավորումը");
      } else {
        setError(`Սխալ տեղի ունեցավ (${code || "unknown"}), փորձեք կրկին`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const removePartner = async (id) => {
    if (dataMode === "local") {
      const next = partners.filter((item) => item.id !== id);
      setPartners(next);
      writeLocalPartners(next);
      showSuccess("Գործընկերը ջնջվեց (local)");
      return;
    }
    try {
      await deletePartner(id);
      showSuccess("Գործընկերը ջնջվեց");
    } catch (deleteError) {
      if (
        String(deleteError?.code || "").includes("permission-denied") ||
        String(deleteError?.message || "").includes("PERMISSION_DENIED")
      ) {
        switchToLocalMode("Firebase access denied. Անցում տեղային ռեժիմի");
      }
      setError(`Գործընկերոջ ջնջումը չհաջողվեց (${deleteError?.code || "unknown"})`);
    }
  };

  const addTag = async () => {
    const nextName = newTagName.trim();
    if (!nextName) return;
    if (dataMode === "local") {
      const next = [...availableTags, { id: toLocalId("tag"), name: nextName, slug: slugify(nextName) }];
      setAvailableTags(next);
      writeLocalTags(next);
      setNewTagName("");
      showSuccess("Tag-ը ավելացվեց (local)");
      return;
    }
    try {
      await createTag(nextName);
      setNewTagName("");
      showSuccess("Tag-ը ավելացվեց");
    } catch (tagError) {
      if (
        String(tagError?.code || "").includes("permission-denied") ||
        String(tagError?.message || "").includes("PERMISSION_DENIED")
      ) {
        switchToLocalMode("Firebase access denied. tag-երը տեղային ռեժիմում են");
      }
      setError(`Tag ավելացնելը չհաջողվեց (${tagError?.code || "unknown"})`);
    }
  };

  const startEditTag = (tag) => {
    setError("");
    setEditingTagId(tag.id);
    setEditingTagName(tag.name);
  };

  const saveTagEdit = async () => {
    if (!editingTagId || !editingTagName.trim()) return;
    setError("");
    if (dataMode === "local") {
      const next = availableTags.map((tag) =>
        tag.id === editingTagId
          ? { ...tag, name: editingTagName.trim(), slug: slugify(editingTagName.trim()) }
          : tag
      );
      const oldTag = availableTags.find((tag) => tag.id === editingTagId);
      const newTag = editingTagName.trim();
      setAvailableTags(next);
      writeLocalTags(next);
      if (oldTag && oldTag.name !== newTag) {
        const nextPartners = partners.map((partner) => ({
          ...partner,
          tags: (partner.tags || []).map((tag) => (tag === oldTag.name ? newTag : tag)),
        }));
        setPartners(nextPartners);
        writeLocalPartners(nextPartners);
      }
      setEditingTagId("");
      setEditingTagName("");
      showSuccess("Tag-ը թարմացվեց (local)");
      return;
    }
    try {
      await updateTag(editingTagId, editingTagName.trim());
      setEditingTagId("");
      setEditingTagName("");
      showSuccess("Tag-ը թարմացվեց");
    } catch (tagError) {
      if (
        String(tagError?.code || "").includes("permission-denied") ||
        String(tagError?.message || "").includes("PERMISSION_DENIED")
      ) {
        switchToLocalMode("Firebase access denied. tag edit-ը local mode է");
      }
      setError(`Tag թարմացնելը չհաջողվեց (${tagError?.code || "unknown"})`);
    }
  };

  const removeTag = async (tagId) => {
    if (dataMode === "local") {
      const found = availableTags.find((item) => item.id === tagId);
      const nextTags = availableTags.filter((tag) => tag.id !== tagId);
      setAvailableTags(nextTags);
      writeLocalTags(nextTags);
      if (found) {
        const nextPartners = partners.map((partner) => ({
          ...partner,
          tags: (partner.tags || []).filter((tag) => tag !== found.name),
        }));
        setPartners(nextPartners);
        writeLocalPartners(nextPartners);
      }
      setForm((prev) => ({
        ...prev,
        tags: (prev.tags || []).filter((tag) => (found ? tag !== found.name : true)),
      }));
      showSuccess("Tag-ը ջնջվեց (local)");
      return;
    }
    try {
      await deleteTag(tagId);
      setForm((prev) => ({
        ...prev,
        tags: (prev.tags || []).filter((tag) => {
          const found = availableTags.find((item) => item.id === tagId);
          return found ? tag !== found.name : true;
        }),
      }));
      showSuccess("Tag-ը ջնջվեց");
    } catch (tagError) {
      if (
        String(tagError?.code || "").includes("permission-denied") ||
        String(tagError?.message || "").includes("PERMISSION_DENIED")
      ) {
        switchToLocalMode("Firebase access denied. tag delete-ը local mode է");
      }
      setError(`Tag ջնջելը չհաջողվեց (${tagError?.code || "unknown"})`);
    }
  };

  const filteredPartners = partners.filter((item) => {
    const q = partnerSearch.trim().toLowerCase();
    if (!q) return true;
    const partnerName = pickLocalizedValue(item.name).toLowerCase();
    const partnerEmail = String(item.email || "").toLowerCase();
    return partnerName.includes(q) || partnerEmail.includes(q);
  });

  if (isLoading) {
    return <main className="container-abc py-12">Loading...</main>;
  }

  if (!user && !isLocalAdmin) {
    return (
      <main className="container-abc py-12">
        <section className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-black text-brand.dark">Ադմին մուտք</h1>
          <p className="mt-2 text-sm text-slate-500">URL: abc1111.am/admin</p>
          {ENABLE_LOCAL_ADMIN_FALLBACK ? (
            <p className="mt-1 text-xs text-slate-500">Տեղային մուտքը միացված է (dev mode)</p>
          ) : null}

          <form onSubmit={login} className="mt-6 space-y-4">
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Մուտքանուն"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Գաղտնաբառ"
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button className="w-full bg-blue-500 rounded-xl px-4 py-3 font-semibold text-white">
              Մուտք
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="container-abc py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-black text-brand.dark">Գործընկերների կառավարում</h1>
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              dataMode === "local"
                ? "border border-amber-200 bg-amber-50 text-amber-700"
                : "border border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {dataMode === "local" ? "LOCAL MODE" : "FIREBASE MODE"}
          </span>
          <button
            onClick={handleLogout}
            className="rounded-xl border border-slate-300 px-4 py-2"
          >
            Ելք
          </button>
        </div>
      </div>
      {error ? (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {successMessage ? (
        <p className="mb-6 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
          {successMessage}
        </p>
      ) : null}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Գործընկերներ</h2>
          <button
            type="button"
            onClick={openAddPartnerModal}
            className="rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white"
          >
            Ավելացնել գործընկեր
          </button>
        </div>
      </section>

      {isPartnerModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">{isEdit ? "Փոփոխել գործընկեր" : "Ավելացնել գործընկեր"}</h2>
              <button
                type="button"
                onClick={closePartnerModal}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
              >
                Փակել
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Անուն*"
                className="rounded-xl border border-slate-300 px-4 py-3 md:col-span-2"
              />
              <textarea
                value={form.descriptionAm}
                onChange={(event) => setForm((prev) => ({ ...prev, descriptionAm: event.target.value }))}
                placeholder="Նկարագրություն (AM)"
                className="min-h-28 rounded-xl border border-slate-300 px-4 py-3"
              />
              <textarea
                value={form.descriptionRu}
                onChange={(event) => setForm((prev) => ({ ...prev, descriptionRu: event.target.value }))}
                placeholder="Описание (RU)"
                className="min-h-28 rounded-xl border border-slate-300 px-4 py-3"
              />
              <textarea
                value={form.descriptionEn}
                onChange={(event) => setForm((prev) => ({ ...prev, descriptionEn: event.target.value }))}
                placeholder="Description (EN)"
                className="min-h-28 rounded-xl border border-slate-300 px-4 py-3 md:col-span-2"
              />
              <input
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="Email*"
                className="rounded-xl border border-slate-300 px-4 py-3"
              />
              <input
                value={form.location}
                onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
                placeholder="Հասցե"
                className="rounded-xl border border-slate-300 px-4 py-3"
              />
              <input
                value={form.phones}
                onChange={(event) => setForm((prev) => ({ ...prev, phones: event.target.value }))}
                placeholder="Հեռախոսներ (ստորակետով)"
                className="rounded-xl border border-slate-300 px-4 py-3"
              />
              <div className="rounded-xl border border-slate-300 px-4 py-3 md:col-span-2">
                <p className="mb-2 text-sm font-semibold text-slate-700">Tags*</p>
                {availableTags.length ? (
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => {
                      const checked = (form.tags || []).includes(tag.name);
                      return (
                        <label key={tag.id} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(event) => {
                              setForm((prev) => {
                                const current = prev.tags || [];
                                const nextTags = event.target.checked
                                  ? [...new Set([...current, tag.name])]
                                  : current.filter((item) => item !== tag.name);
                                return { ...prev, tags: nextTags };
                              });
                            }}
                          />
                          <span>{tag.name}</span>
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">Tag չկան։ Ստորև ավելացրեք առաջին tag-ը։</p>
                )}
              </div>
              <input
                type="file"
                onChange={(event) => setLogoFile(event.target.files?.[0] || null)}
                accept="image/*"
                className="rounded-xl border border-slate-300 px-4 py-3 md:col-span-2"
              />

              {error ? <p className="text-sm text-red-600 md:col-span-2">{error}</p> : null}

              <div className="flex gap-3 md:col-span-2">
                <button
                  disabled={submitting}
                  className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white disabled:opacity-50"
                >
                  {isEdit ? "Պահպանել" : "Ավելացնել"}
                </button>
                <button
                  type="button"
                  onClick={closePartnerModal}
                  className="rounded-xl border border-slate-300 px-5 py-3 font-semibold"
                >
                  Չեղարկել
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Tag-երի կառավարում</h2>
        <div className="mt-4 flex gap-3">
          <input
            value={newTagName}
            onChange={(event) => setNewTagName(event.target.value)}
            placeholder="Նոր tag անուն"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
          <button type="button" onClick={addTag} className="rounded-xl bg-blue-500 px-4 py-3 font-semibold text-white">
            Ավելացնել
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {availableTags.map((tag) => (
            <div key={tag.id} className="flex flex-col gap-2 rounded-lg border border-slate-200 p-3 md:flex-row md:items-center">
              {editingTagId === tag.id ? (
                <>
                  <input
                    value={editingTagName}
                    onChange={(event) => setEditingTagName(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        saveTagEdit();
                      }
                    }}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  />
                  <button type="button" onClick={saveTagEdit} className="rounded-lg border border-slate-300 px-3 py-2">
                    Պահպանել
                  </button>
                  <button type="button" onClick={() => setEditingTagId("")} className="rounded-lg border border-slate-300 px-3 py-2">
                    Չեղարկել
                  </button>
                </>
              ) : (
                <>
                  <p className="flex-1 font-medium">{tag.name}</p>
                  <button type="button" onClick={() => startEditTag(tag)} className="rounded-lg border border-slate-300 px-3 py-2">
                    Խմբագրել
                  </button>
                  <button type="button" onClick={() => removeTag(tag.id)} className="rounded-lg border border-red-200 px-3 py-2 text-red-600">
                    Ջնջել
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Գործընկերների ցանկ</h2>
        <input
          value={partnerSearch}
          onChange={(event) => setPartnerSearch(event.target.value)}
          placeholder="Փնտրել գործընկեր անունով կամ email-ով"
          className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3"
        />
        <div className="mt-4 space-y-3">
          {filteredPartners.map((item) => (
            <article key={item.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-blue-500">{pickLocalizedValue(item.name)}</p>
                <p className="text-sm text-slate-500">{item.email}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => fillEditForm(item.id)} className="rounded-lg border border-slate-300 px-4 py-2">
                  Խմբագրել
                </button>
                <button onClick={() => removePartner(item.id)} className="rounded-lg border border-red-200 px-4 py-2 text-red-600">
                  Ջնջել
                </button>
              </div>
            </article>
          ))}
          {!filteredPartners.length ? (
            <p className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-500">
              Գործընկերներ չեն գտնվել։
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
