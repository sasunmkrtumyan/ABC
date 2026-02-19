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
  fetchPartners,
  updatePartner,
} from "../../lib/firebase/partners";
import { uploadPartnerLogo } from "../../lib/firebase/storage";
import { slugify } from "../../lib/slugify";

const ADMIN_USERNAME = "abc1111";
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "abc1111@abc1111.am";

const emptyForm = {
  nameAm: "",
  nameRu: "",
  nameEn: "",
  descriptionAm: "",
  descriptionRu: "",
  descriptionEn: "",
  email: "",
  location: "",
  phones: "",
  tags: "",
};

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [partners, setPartners] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [logoFile, setLogoFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const isEdit = useMemo(() => Boolean(editingId), [editingId]);

  const loadPartners = async () => {
    const data = await fetchPartners();
    setPartners(data);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setIsLoading(false);
      if (nextUser) await loadPartners();
    });

    return () => unsub();
  }, []);

  const login = async (event) => {
    event.preventDefault();
    setError("");
    if (username !== ADMIN_USERNAME) {
      setError("Սխալ մուտքանուն");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
    } catch {
      setError("Սխալ գաղտնաբառ կամ մուտք արգելված է");
    }
  };

  const fillEditForm = async (id) => {
    const item = await fetchPartnerById(id);
    if (!item) return;
    setEditingId(id);
    setForm({
      nameAm: item.name?.am || "",
      nameRu: item.name?.ru || "",
      nameEn: item.name?.en || "",
      descriptionAm: item.description?.am || "",
      descriptionRu: item.description?.ru || "",
      descriptionEn: item.description?.en || "",
      email: item.email || "",
      location: item.location || "",
      phones: (item.phones || []).join(", "),
      tags: (item.tags || []).join(", "),
    });
    setLogoFile(null);
  };

  const clearForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setLogoFile(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const tags = form.tags
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const phones = form.phones
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!form.nameAm || !form.nameRu || !form.nameEn) {
      setError("Անունը պարտադիր է բոլոր լեզուներով");
      return;
    }
    if (!form.descriptionAm || !form.descriptionRu || !form.descriptionEn) {
      setError("Նկարագրությունը պարտադիր է բոլոր լեզուներով");
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

    const slug = slugify(form.nameEn || form.nameAm);
    let logoUrl = null;

    try {
      if (logoFile) logoUrl = await uploadPartnerLogo(logoFile, slug);

      const payload = {
        slug,
        name: { am: form.nameAm, ru: form.nameRu, en: form.nameEn },
        description: {
          am: form.descriptionAm,
          ru: form.descriptionRu,
          en: form.descriptionEn,
        },
        email: form.email,
        location: form.location || "",
        phones,
        tags,
        ...(logoUrl ? { logoUrl } : {}),
      };

      if (isEdit) {
        await updatePartner(editingId, payload);
      } else {
        await createPartner(payload);
      }

      clearForm();
      await loadPartners();
    } catch {
      setError("Սխալ տեղի ունեցավ, փորձեք կրկին");
    } finally {
      setSubmitting(false);
    }
  };

  const removePartner = async (id) => {
    await deletePartner(id);
    await loadPartners();
  };

  if (isLoading) {
    return <main className="container-abc py-12">Loading...</main>;
  }

  if (!user) {
    return (
      <main className="container-abc py-12">
        <section className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-black text-brand.dark">Ադմին մուտք</h1>
          <p className="mt-2 text-sm text-slate-500">URL: abc1111.am/admin</p>

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
            <button className="w-full rounded-xl bg-brand.blue px-4 py-3 font-semibold text-white">
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
        <button
          onClick={() => signOut(auth)}
          className="rounded-xl border border-slate-300 px-4 py-2"
        >
          Ելք
        </button>
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">{isEdit ? "Փոփոխել գործընկեր" : "Ավելացնել գործընկեր"}</h2>
        <form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
          <input
            value={form.nameAm}
            onChange={(event) => setForm((prev) => ({ ...prev, nameAm: event.target.value }))}
            placeholder="Անուն (AM)*"
            className="rounded-xl border border-slate-300 px-4 py-3"
          />
          <input
            value={form.nameRu}
            onChange={(event) => setForm((prev) => ({ ...prev, nameRu: event.target.value }))}
            placeholder="Անուն (RU)*"
            className="rounded-xl border border-slate-300 px-4 py-3"
          />
          <input
            value={form.nameEn}
            onChange={(event) => setForm((prev) => ({ ...prev, nameEn: event.target.value }))}
            placeholder="Name (EN)*"
            className="rounded-xl border border-slate-300 px-4 py-3 md:col-span-2"
          />
          <textarea
            value={form.descriptionAm}
            onChange={(event) => setForm((prev) => ({ ...prev, descriptionAm: event.target.value }))}
            placeholder="Նկարագրություն (AM)*"
            className="min-h-28 rounded-xl border border-slate-300 px-4 py-3"
          />
          <textarea
            value={form.descriptionRu}
            onChange={(event) => setForm((prev) => ({ ...prev, descriptionRu: event.target.value }))}
            placeholder="Описание (RU)*"
            className="min-h-28 rounded-xl border border-slate-300 px-4 py-3"
          />
          <textarea
            value={form.descriptionEn}
            onChange={(event) => setForm((prev) => ({ ...prev, descriptionEn: event.target.value }))}
            placeholder="Description (EN)*"
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
          <input
            value={form.tags}
            onChange={(event) => setForm((prev) => ({ ...prev, tags: event.target.value }))}
            placeholder="Tags (օր. agriculture, logistics)*"
            className="rounded-xl border border-slate-300 px-4 py-3"
          />
          <input
            type="file"
            onChange={(event) => setLogoFile(event.target.files?.[0] || null)}
            accept="image/*"
            className="rounded-xl border border-slate-300 px-4 py-3 md:col-span-2"
          />

          {error && <p className="text-sm text-red-600 md:col-span-2">{error}</p>}

          <div className="flex gap-3 md:col-span-2">
            <button
              disabled={submitting}
              className="rounded-xl bg-brand.blue px-5 py-3 font-semibold text-white disabled:opacity-50"
            >
              {isEdit ? "Պահպանել" : "Ավելացնել"}
            </button>
            {isEdit && (
              <button type="button" onClick={clearForm} className="rounded-xl border border-slate-300 px-5 py-3 font-semibold">
                Չեղարկել
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Գործընկերների ցանկ</h2>
        <div className="mt-4 space-y-3">
          {partners.map((item) => (
            <article key={item.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-brand.blue">{item.name?.am}</p>
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
        </div>
      </section>
    </main>
  );
}
