'use client';

import { useEffect, useMemo, useState } from 'react';
import { slugify } from '../../lib/slugify';
import { getSession, onAuthStateChange, signInWithPassword, signOut as supabaseSignOut } from '../../lib/supabase/auth';
import {
  createPartner,
  deletePartner,
  fetchPartnerById,
  fetchPartners,
  updatePartner,
} from '../../lib/supabase/partners';
import { uploadPartnerLogo } from '../../lib/supabase/storage';
import { createTag, deleteTag, fetchTags, updateTag } from '../../lib/supabase/tags';

const ADMIN_USERNAME = 'abc1111';
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'sasunmkrtumyan92@gmail.com';

function getMissingTableName(error) {
  const msg = String(error?.message || '');
  const match = msg.match(/'([^']+)'/);
  return match?.[1] || '';
}

function getLoginErrorMessage(error) {
  const message = String(error?.message || error || '').toLowerCase();

  if (message.includes('invalid login credentials')) {
    return 'Սխալ email կամ գաղտնաբառ';
  }
  if (message.includes('email not confirmed')) {
    return 'Email-ը հաստատված չէ (Supabase Auth)';
  }
  if (message.includes('user not found')) {
    return 'Ադմին օգտատեր չի գտնվել Supabase-ում';
  }
  if (message.includes('network') || message.includes('fetch')) {
    return 'Ցանցային խնդիր կա, ստուգեք ինտերնետ կապը';
  }

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
  logoUrl: '',
};

function pickLocalizedValue(valueByLang = {}) {
  return valueByLang.am || valueByLang.en || valueByLang.ru || '';
}

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [partners, setPartners] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [logoFile, setLogoFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [partnerSearch, setPartnerSearch] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [editingTagId, setEditingTagId] = useState('');
  const [editingTagName, setEditingTagName] = useState('');
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  const isEdit = useMemo(() => Boolean(editingId), [editingId]);
  const isAuthenticated = Boolean(user);

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 2500);
  };

  const loadSupabaseData = async () => {
    try {
      const [partnersData, tagsData] = await Promise.all([fetchPartners(), fetchTags()]);
      setPartners(partnersData);
      setAvailableTags(tagsData);
    } catch (loadError) {
      const code = loadError?.code || loadError?.status || 'unknown';
      if (code === 'PGRST205') {
        const missing = getMissingTableName(loadError);
        setError(
          `Supabase schema is not ready (missing table${missing ? `: ${missing}` : 's'}). Run supabase/schema.sql in Supabase SQL Editor, then: notify pgrst, 'reload schema';`,
        );
      } else {
        setError(`Supabase հասանելի չէ (${code}). ${String(loadError?.message || '')}`.trim());
      }
      setPartners([]);
      setAvailableTags([]);
    }
  };

  useEffect(() => {
    let cancelled = false;

    getSession()
      .then(({ data }) => {
        if (cancelled) return;
        setUser(data?.session?.user || null);
        setIsLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    const { data } = onAuthStateChange((session) => {
      if (cancelled) return;
      setUser(session?.user || null);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
      data?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return undefined;
    loadSupabaseData();
    return undefined;
  }, [isAuthenticated]);

  const login = async (event) => {
    event.preventDefault();
    setError('');
    if (username !== ADMIN_USERNAME) {
      setError('Սխալ մուտքանուն');
      return;
    }

    const emailCandidates = Array.from(
      new Set([ADMIN_EMAIL, 'sasunmkrtumyan92@gmail.com', 'abc1111@gmail.com'].filter(Boolean)),
    );

    let lastError = null;
    try {
      for (const email of emailCandidates) {
        const { error } = await signInWithPassword(email, password);
        if (!error) return;

        lastError = error;
        // Stop early for non-credential/config errors.
        const msg = String(error?.message || '').toLowerCase();
        if (!msg.includes('invalid login credentials') && !msg.includes('user not found')) break;
      }

      setError(getLoginErrorMessage(lastError));
    } catch (loginError) {
      setError(getLoginErrorMessage(loginError || lastError));
    }
  };

  const handleLogout = async () => {
    if (user) await supabaseSignOut();
    setUser(null);
  };

  const fillEditForm = async (id) => {
    let item = partners.find((p) => p.id === id);
    if (!item) {
      item = await fetchPartnerById(id);
    }
    if (!item) return;
    setError('');
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
      logoUrl: item.logoUrl || '',
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
    setError('');
    clearForm();
    setIsPartnerModalOpen(true);
  };

  const closePartnerModal = () => {
    setIsPartnerModalOpen(false);
    setError('');
    clearForm();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    const tags = (form.tags || []).map((item) => item.trim()).filter(Boolean);
    const phones = form.phones
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    if (!form.name.trim()) {
      setError('Անունը պարտադիր է');
      return;
    }
    if (!form.descriptionAm && !form.descriptionEn && !form.descriptionRu) {
      setError('Առնվազն մեկ նկարագրություն պարտադիր է');
      return;
    }
    if (!form.email) {
      setError('Email-ը պարտադիր է');
      return;
    }
    if (!tags.length) {
      setError('Առնվազն 1 tag պարտադիր է');
      return;
    }
    if (!isEdit && !logoFile) {
      setError('Լոգոն պարտադիր է');
      return;
    }

    setSubmitting(true);

    const slug = slugify(form.name);
    let logoUrl = null;

    try {
      if (logoFile) logoUrl = await uploadPartnerLogo(logoFile, slug);

      const payload = {
        slug,
        name: { am: form.name, en: form.name, ru: form.name },
        description: {
          am: form.descriptionAm || '',
          en: form.descriptionEn || '',
          ru: form.descriptionRu || '',
        },
        email: form.email,
        location: form.location || '',
        phones,
        tags,
        logoUrl: logoUrl || form.logoUrl || '',
      };

      if (isEdit) {
        await updatePartner(editingId, payload);
        showSuccess('Գործընկերը հաջողությամբ թարմացվեց');
      } else {
        await createPartner(payload);
        showSuccess('Գործընկերը հաջողությամբ ավելացվեց');
      }

      await loadSupabaseData();
      closePartnerModal();
    } catch (submitError) {
      const code = submitError?.code || '';
      const status = submitError?.status;
      const message = String(submitError?.message || '');
      const lower = message.toLowerCase();

      if (
        status === 401 ||
        status === 403 ||
        lower.includes('permission denied') ||
        lower.includes('row-level security') ||
        lower.includes('not allowed')
      ) {
        setError('Supabase access denied. Ստուգեք RLS policies-ը և admin allow-list-ը (public.admins).');
      } else if ((code || '') === 'PGRST205') {
        const missing = getMissingTableName(submitError);
        setError(
          `Supabase schema is not ready (missing table${missing ? `: ${missing}` : 's'}). Run supabase/schema.sql in Supabase SQL Editor, then: notify pgrst, 'reload schema';`,
        );
      } else if (lower.includes('bucket') && (lower.includes('not found') || lower.includes('does not exist'))) {
        setError('Storage bucket-ը չի գտնվել. Ստուգեք Supabase Storage bucket-ը (partner-logos)');
      } else if (lower.includes('storage') && lower.includes('unauthorized')) {
        setError('Storage թույլտվություն չկա. ստուգեք Supabase Storage policies-ը');
      } else {
        setError(`Սխալ տեղի ունեցավ (${code || status || 'unknown'}), փորձեք կրկին`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const removePartner = async (id) => {
    try {
      await deletePartner(id);
      showSuccess('Գործընկերը ջնջվեց');
      await loadSupabaseData();
    } catch (deleteError) {
      if (
        deleteError?.status === 401 ||
        deleteError?.status === 403 ||
        String(deleteError?.message || '')
          .toLowerCase()
          .includes('row-level security') ||
        String(deleteError?.message || '')
          .toLowerCase()
          .includes('permission denied')
      ) {
        setError('Supabase access denied. Ստուգեք RLS policies-ը և admin allow-list-ը (public.admins).');
      }
      setError(`Գործընկերոջ ջնջումը չհաջողվեց (${deleteError?.code || 'unknown'})`);
    }
  };

  const addTag = async () => {
    const nextName = newTagName.trim();
    if (!nextName) return;
    try {
      await createTag(nextName);
      setNewTagName('');
      showSuccess('Tag-ը ավելացվեց');
      await loadSupabaseData();
    } catch (tagError) {
      if (tagError?.code === 'PGRST205') {
        const missing = getMissingTableName(tagError) || 'tags';
        setError(
          `Supabase schema is not ready (missing table: ${missing}). Run supabase/schema.sql in Supabase SQL Editor, then: notify pgrst, 'reload schema';`,
        );
        return;
      }
      if (
        tagError?.status === 401 ||
        tagError?.status === 403 ||
        String(tagError?.message || '')
          .toLowerCase()
          .includes('row-level security') ||
        String(tagError?.message || '')
          .toLowerCase()
          .includes('permission denied')
      ) {
        setError('Supabase access denied. Ստուգեք RLS policies-ը և admin allow-list-ը (public.admins).');
      }
      setError(`Tag ավելացնելը չհաջողվեց (${tagError?.code || 'unknown'})`);
    }
  };

  const startEditTag = (tag) => {
    setError('');
    setEditingTagId(tag.id);
    setEditingTagName(tag.name);
  };

  const saveTagEdit = async () => {
    if (!editingTagId || !editingTagName.trim()) return;
    setError('');
    try {
      await updateTag(editingTagId, editingTagName.trim());
      setEditingTagId('');
      setEditingTagName('');
      showSuccess('Tag-ը թարմացվեց');
      await loadSupabaseData();
    } catch (tagError) {
      if (tagError?.code === 'PGRST205') {
        const missing = getMissingTableName(tagError) || 'tags';
        setError(
          `Supabase schema is not ready (missing table: ${missing}). Run supabase/schema.sql in Supabase SQL Editor, then: notify pgrst, 'reload schema';`,
        );
        return;
      }
      if (
        tagError?.status === 401 ||
        tagError?.status === 403 ||
        String(tagError?.message || '')
          .toLowerCase()
          .includes('row-level security') ||
        String(tagError?.message || '')
          .toLowerCase()
          .includes('permission denied')
      ) {
        setError('Supabase access denied. Ստուգեք RLS policies-ը և admin allow-list-ը (public.admins).');
      }
      setError(`Tag թարմացնելը չհաջողվեց (${tagError?.code || 'unknown'})`);
    }
  };

  const removeTag = async (tagId) => {
    try {
      await deleteTag(tagId);
      setForm((prev) => ({
        ...prev,
        tags: (prev.tags || []).filter((tag) => {
          const found = availableTags.find((item) => item.id === tagId);
          return found ? tag !== found.name : true;
        }),
      }));
      showSuccess('Tag-ը ջնջվեց');
      await loadSupabaseData();
    } catch (tagError) {
      if (tagError?.code === 'PGRST205') {
        const missing = getMissingTableName(tagError) || 'tags';
        setError(
          `Supabase schema is not ready (missing table: ${missing}). Run supabase/schema.sql in Supabase SQL Editor, then: notify pgrst, 'reload schema';`,
        );
        return;
      }
      if (
        tagError?.status === 401 ||
        tagError?.status === 403 ||
        String(tagError?.message || '')
          .toLowerCase()
          .includes('row-level security') ||
        String(tagError?.message || '')
          .toLowerCase()
          .includes('permission denied')
      ) {
        setError('Supabase access denied. Ստուգեք RLS policies-ը և admin allow-list-ը (public.admins).');
      }
      setError(`Tag ջնջելը չհաջողվեց (${tagError?.code || 'unknown'})`);
    }
  };

  const filteredPartners = partners.filter((item) => {
    const q = partnerSearch.trim().toLowerCase();
    if (!q) return true;
    const partnerName = pickLocalizedValue(item.name).toLowerCase();
    const partnerEmail = String(item.email || '').toLowerCase();
    return partnerName.includes(q) || partnerEmail.includes(q);
  });

  if (isLoading) {
    return <main className="container-abc py-12">Loading...</main>;
  }

  if (!user) {
    return (
      <main className="container-abc py-12">
        <section className="max-w-md rounded-2xl bg-white p-8 shadow-sm mx-auto">
          <h1 className="text-3xl font-black text-brand.dark">Ադմին մուտք</h1>
          <p className="mt-2 text-sm text-slate-500">URL: abc1111.am/admin</p>

          <form onSubmit={login} className="mt-6 space-y-4">
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Մուտքանուն"
              className="rounded-xl border-slate-300 px-4 py-3 w-full border"
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Գաղտնաբառ"
              className="rounded-xl border-slate-300 px-4 py-3 w-full border"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button className="bg-blue-500 rounded-xl px-4 py-3 font-semibold text-white w-full">Մուտք</button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="container-abc py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-black text-brand.dark">Գործընկերների կառավարում</h1>
        <div className="gap-3 flex items-center">
          <button onClick={handleLogout} className="rounded-xl border-slate-300 px-4 py-2 border">
            Ելք
          </button>
        </div>
      </div>
      {error ? (
        <p className="mb-4 rounded-lg border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 border">{error}</p>
      ) : null}

      {successMessage ? (
        <p className="mb-6 rounded-lg border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700 border">
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
        <div className="inset-0 bg-black/45 p-4 fixed z-50 flex items-center justify-center">
          <div className="max-w-4xl rounded-2xl bg-white p-6 shadow-2xl max-h-[92vh] w-full overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">{isEdit ? 'Փոփոխել գործընկեր' : 'Ավելացնել գործընկեր'}</h2>
              <button
                type="button"
                onClick={closePartnerModal}
                className="rounded-lg border-slate-300 px-3 py-1.5 text-sm border"
              >
                Փակել
              </button>
            </div>

            <form onSubmit={handleSubmit} className="gap-4 md:grid-cols-2 grid">
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Անուն*"
                className="rounded-xl border-slate-300 px-4 py-3 md:col-span-2 border"
              />
              <textarea
                value={form.descriptionAm}
                onChange={(event) => setForm((prev) => ({ ...prev, descriptionAm: event.target.value }))}
                placeholder="Նկարագրություն (AM)"
                className="min-h-28 rounded-xl border-slate-300 px-4 py-3 border"
              />
              <textarea
                value={form.descriptionRu}
                onChange={(event) => setForm((prev) => ({ ...prev, descriptionRu: event.target.value }))}
                placeholder="Описание (RU)"
                className="min-h-28 rounded-xl border-slate-300 px-4 py-3 border"
              />
              <textarea
                value={form.descriptionEn}
                onChange={(event) => setForm((prev) => ({ ...prev, descriptionEn: event.target.value }))}
                placeholder="Description (EN)"
                className="min-h-28 rounded-xl border-slate-300 px-4 py-3 md:col-span-2 border"
              />
              <input
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="Email*"
                className="rounded-xl border-slate-300 px-4 py-3 border"
              />
              <input
                value={form.location}
                onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
                placeholder="Հասցե"
                className="rounded-xl border-slate-300 px-4 py-3 border"
              />
              <input
                value={form.phones}
                onChange={(event) => setForm((prev) => ({ ...prev, phones: event.target.value }))}
                placeholder="Հեռախոսներ (ստորակետով)"
                className="rounded-xl border-slate-300 px-4 py-3 border"
              />
              <div className="rounded-xl border-slate-300 px-4 py-3 md:col-span-2 border">
                <p className="mb-2 text-sm font-semibold text-slate-700">Tags*</p>
                {availableTags.length ? (
                  <div className="gap-2 flex flex-wrap">
                    {availableTags.map((tag) => {
                      const checked = (form.tags || []).includes(tag.name);
                      return (
                        <label
                          key={tag.id}
                          className="gap-2 rounded-lg border-slate-200 px-3 py-1.5 text-sm inline-flex items-center border"
                        >
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
                className="rounded-xl border-slate-300 px-4 py-3 md:col-span-2 border"
              />

              {error ? <p className="text-sm text-red-600 md:col-span-2">{error}</p> : null}

              <div className="gap-3 md:col-span-2 flex">
                <button
                  disabled={submitting}
                  className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white disabled:opacity-50"
                >
                  {isEdit ? 'Պահպանել' : 'Ավելացնել'}
                </button>
                <button
                  type="button"
                  onClick={closePartnerModal}
                  className="rounded-xl border-slate-300 px-5 py-3 font-semibold border"
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
        <div className="mt-4 gap-3 flex">
          <input
            value={newTagName}
            onChange={(event) => setNewTagName(event.target.value)}
            placeholder="Նոր tag անուն"
            className="rounded-xl border-slate-300 px-4 py-3 w-full border"
          />
          <button type="button" onClick={addTag} className="rounded-xl bg-blue-500 px-4 py-3 font-semibold text-white">
            Ավելացնել
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {availableTags.map((tag) => (
            <div
              key={tag.id}
              className="gap-2 rounded-lg border-slate-200 p-3 md:flex-row md:items-center flex flex-col border"
            >
              {editingTagId === tag.id ? (
                <>
                  <input
                    value={editingTagName}
                    onChange={(event) => setEditingTagName(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.preventDefault();
                        saveTagEdit();
                      }
                    }}
                    className="rounded-lg border-slate-300 px-3 py-2 w-full border"
                  />
                  <button type="button" onClick={saveTagEdit} className="rounded-lg border-slate-300 px-3 py-2 border">
                    Պահպանել
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingTagId('')}
                    className="rounded-lg border-slate-300 px-3 py-2 border"
                  >
                    Չեղարկել
                  </button>
                </>
              ) : (
                <>
                  <p className="font-medium flex-1">{tag.name}</p>
                  <button
                    type="button"
                    onClick={() => startEditTag(tag)}
                    className="rounded-lg border-slate-300 px-3 py-2 border"
                  >
                    Խմբագրել
                  </button>
                  <button
                    type="button"
                    onClick={() => removeTag(tag.id)}
                    className="rounded-lg border-red-200 px-3 py-2 text-red-600 border"
                  >
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
          className="mt-4 rounded-xl border-slate-300 px-4 py-3 w-full border"
        />
        <div className="mt-4 space-y-3">
          {filteredPartners.map((item) => (
            <article
              key={item.id}
              className="gap-3 rounded-xl border-slate-200 p-4 md:flex-row md:items-center md:justify-between flex flex-col border"
            >
              <div>
                <p className="font-semibold text-blue-500">{pickLocalizedValue(item.name)}</p>
                <p className="text-sm text-slate-500">{item.email}</p>
              </div>
              <div className="gap-3 flex">
                <button onClick={() => fillEditForm(item.id)} className="rounded-lg border-slate-300 px-4 py-2 border">
                  Խմբագրել
                </button>
                <button
                  onClick={() => removePartner(item.id)}
                  className="rounded-lg border-red-200 px-4 py-2 text-red-600 border"
                >
                  Ջնջել
                </button>
              </div>
            </article>
          ))}
          {!filteredPartners.length ? (
            <p className="rounded-lg border-slate-200 px-4 py-3 text-sm text-slate-500 border">
              Գործընկերներ չեն գտնվել։
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
