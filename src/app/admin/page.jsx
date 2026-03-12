'use client';

import { slugify } from '@/lib/slugify.js';
import { getSession, onAuthStateChange, signInWithPassword, signOut as supabaseSignOut } from '@/lib/supabase/auth.js';
import { createPartner, deletePartner, fetchPartners, updatePartner } from '@/lib/supabase/partners.js';
import { uploadPartnerLogo } from '@/lib/supabase/storage.js';
import { createTag, deleteTag, fetchTags } from '@/lib/supabase/tags.js';
import Link from 'next/link'; // Ավելացրել ենք Link հղման համար
import { useEffect, useMemo, useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const ADMIN_USERNAME = 'abc1111';
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'sasunmkrtumyan92@gmail.com';

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
  logoUrl: '',
};

function pickLocalizedValue(valueByLang = {}) {
  return valueByLang.am || valueByLang.en || valueByLang.ru || '';
}

function getTagKey(tag) {
  if (!tag) return '';
  if (typeof tag.name === 'string') return tag.name;
  return tag.name?.en || tag.slug || '';
}

function getTagLabel(tag) {
  if (!tag) return '';
  if (typeof tag.name === 'string') return tag.name;
  return tag.name?.am || tag.name?.en || tag.name?.ru || tag.slug || '';
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('partners'); // Լռելյայն tab
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

  const isEdit = useMemo(() => Boolean(editingId), [editingId]);
  const isAuthenticated = Boolean(user);
  const filteredPartners = useMemo(
    () => partners.filter((p) => pickLocalizedValue(p.name).toLowerCase().includes(partnerSearch.toLowerCase())),
    [partners, partnerSearch],
  );

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
      setError(`Supabase սխալ: ${loadError?.message}`);
    }
  };

  useEffect(() => {
    let cancelled = false;
    getSession().then(({ data }) => {
      if (!cancelled) {
        setUser(data?.session?.user || null);
        setIsLoading(false);
      }
    });
    const { data } = onAuthStateChange((session) => {
      if (!cancelled) setUser(session?.user || null);
    });
    return () => {
      cancelled = true;
      data?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) loadSupabaseData();
  }, [isAuthenticated]);

  const login = async (event) => {
    event.preventDefault();
    setError('');
    if (username !== ADMIN_USERNAME) {
      setError('Սխալ մուտքանուն');
      return;
    }
    const { error } = await signInWithPassword(ADMIN_EMAIL, password);
    if (error) setError(getLoginErrorMessage(error));
  };

  const handleLogout = async () => {
    if (user) await supabaseSignOut();
    setUser(null);
  };

  const fillEditForm = (id) => {
    const item = partners.find((p) => p.id === id);
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
      logoUrl: item.logoUrl || '',
    });
    setActiveTab('add-partner');
  };

  const clearForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setLogoFile(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const slug = slugify(form.name);
    let logoUrl = null;

    try {
      if (logoFile) logoUrl = await uploadPartnerLogo(logoFile, slug);
      const payload = {
        slug,
        name: { am: form.name, en: form.name, ru: form.name },
        description: { am: form.descriptionAm, en: form.descriptionEn, ru: form.descriptionRu },
        email: form.email,
        location: form.location,
        phones: form.phones
          .split(',')
          .map((p) => p.trim())
          .filter(Boolean),
        tags: form.tags,
        logoUrl: logoUrl || form.logoUrl,
      };

      if (isEdit) {
        await updatePartner(editingId, payload);
        showSuccess('Թարմացվեց');
      } else {
        await createPartner(payload);
        showSuccess('Ավելացվեց');
      }
      await loadSupabaseData();
      clearForm();
      setActiveTab('partners');
    } catch (e) {
      setError('Գործողությունը ձախողվեց');
    } finally {
      setSubmitting(false);
    }
  };

  // Tag functions (same logic)
  const addTag = async () => {
    if (!newTagName.trim()) return;
    await createTag(newTagName.trim());
    setNewTagName('');
    loadSupabaseData();
  };

  const removeTag = async (id) => {
    if (!confirm('Համոզվա՞ծ եք:')) return;
    await deleteTag(id);
    loadSupabaseData();
  };

  const removePartner = async (id) => {
    if (confirm('Համոզվա՞ծ եք:')) {
      await deletePartner(id);
      loadSupabaseData();
    }
  };

  const exportPartnersCSV = () => {
    const headers = ['Անուն (Name)', 'Կատեգորիա (Category)', 'Email', 'Հեռախոս (Phone)'];
    const escapeCsv = (str) => `"${String(str).replace(/"/g, '""')}"`;

    const csvRows = [
      headers.join(','),
      ...filteredPartners.map((p) => {
        const name = escapeCsv(pickLocalizedValue(p.name));
        const categories = escapeCsv((p.tags || []).join(', '));
        const email = escapeCsv(p.email || '');
        const phones = escapeCsv((p.phones || []).join(', '));
        return `${name},${categories},${email},${phones}`;
      }),
    ];

    const blob = new Blob(['\uFEFF' + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'partners.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportPartnersPDF = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    const rows = filteredPartners.map((p) => [
        pickLocalizedValue(p.name) || '-',
        (p.tags || []).join(', ') || '-',
        p.email || '-',
        (p.phones || []).join(', ') || '-',
      ]);

    autoTable(doc, {
      head: [['Name', 'Category', 'Email', 'Phone']],
      body: rows,
      styles: { fontSize: 10 },
    });
    doc.save('partners.pdf');
  };
  if (isLoading) return <main className="container-abc py-12">Բեռնվում է...</main>;

  if (!user) {
    return (
      <main className="container-abc py-12">
        <section className="max-w-md rounded-2xl bg-white p-8 shadow-sm mx-auto">
          <h1 className="text-3xl font-black text-slate-800">Ադմին մուտք</h1>
          <form onSubmit={login} className="mt-6 space-y-4">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Մուտքանուն"
              className="rounded-xl border-slate-300 px-4 py-3 w-full border"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Գաղտնաբառ"
              className="rounded-xl border-slate-300 px-4 py-3 w-full border"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button className="bg-blue-600 rounded-xl px-4 py-3 font-semibold text-white w-full">Մուտք</button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="container-abc py-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-black text-slate-800">Admin Panel</h1>
        <div className="gap-3 flex">
          <Link href="/" className="rounded-xl bg-slate-100 px-4 py-2 font-medium hover:bg-slate-200 transition">
            Գլխավոր (Home)
          </Link>
          <button onClick={handleLogout} className="rounded-xl border-slate-300 px-4 py-2 hover:bg-red-50 border">
            Ելք
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-6 gap-2 border-slate-200 flex border-b pb-px">
        <button
          onClick={() => {
            setActiveTab('partners');
            clearForm();
          }}
          className={`px-6 py-3 font-bold transition-all ${activeTab === 'partners' ? 'border-blue-600 text-blue-600 border-b-2' : 'text-slate-500'}`}
        >
          Գործընկերների ցանկ
        </button>
        <button
          onClick={() => setActiveTab('add-partner')}
          className={`px-6 py-3 font-bold transition-all ${activeTab === 'add-partner' ? 'border-blue-600 text-blue-600 border-b-2' : 'text-slate-500'}`}
        >
          {isEdit ? 'Խմբագրել' : 'Ավելացնել գործընկեր'}
        </button>
        <button
          onClick={() => setActiveTab('tags')}
          className={`px-6 py-3 font-bold transition-all ${activeTab === 'tags' ? 'border-blue-600 text-blue-600 border-b-2' : 'text-slate-500'}`}
        >
          Tags
        </button>
      </div>

      {error && <p className="mb-4 text-red-600 bg-red-50 p-3 rounded-xl border-red-100 border">{error}</p>}
      {successMessage && (
        <p className="mb-4 text-green-600 bg-green-50 p-3 rounded-xl border-green-100 border">{successMessage}</p>
      )}

      {/* Tab 1: Partners List */}
      {activeTab === 'partners' && (
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="gap-4 mb-6 flex">
            <input
              value={partnerSearch}
              onChange={(e) => setPartnerSearch(e.target.value)}
              placeholder="Փնտրել գործընկեր..."
              className="rounded-xl border-slate-300 px-4 py-3 flex-1 border"
            />
            <button
              onClick={exportPartnersCSV}
              className="px-6 py-3 font-bold text-white bg-green-600 rounded-xl hover:bg-green-700 transition"
            >
              Export CSV
            </button>
            <button
              onClick={exportPartnersPDF}
              className="px-6 py-3 font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition"
            >
              Export PDF
            </button>
          </div>
          <div className="space-y-3">
            {filteredPartners.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border-slate-100 rounded-xl hover:bg-slate-50 flex items-center justify-between border transition"
                >
                  <div>
                    <p className="font-bold text-slate-800">{pickLocalizedValue(item.name)}</p>
                    <p className="text-sm text-slate-500">{item.email}</p>
                  </div>
                  <div className="gap-2 flex">
                    <button
                      onClick={() => fillEditForm(item.id)}
                      className="px-4 py-2 text-sm font-semibold bg-slate-100 rounded-lg"
                    >
                      Խմբագրել
                    </button>
                    <button
                      onClick={() => removePartner(item.id)}
                      className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-lg"
                    >
                      Ջնջել
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Tab 2: Add/Edit Partner */}
      {activeTab === 'add-partner' && (
        <section className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6">{isEdit ? 'Խմբագրել' : 'Նոր գործընկեր'}</h2>
          <form onSubmit={handleSubmit} className="md:grid-cols-2 gap-6 grid grid-cols-1">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Անուն*"
              className="md:col-span-2 rounded-xl border-slate-300 px-4 py-3 border"
              required
            />
            <textarea
              value={form.descriptionAm}
              onChange={(e) => setForm({ ...form, descriptionAm: e.target.value })}
              placeholder="Նկարագրություն (AM)"
              className="rounded-xl border-slate-300 px-4 py-3 h-32 border"
            />
            <textarea
              value={form.descriptionRu}
              onChange={(e) => setForm({ ...form, descriptionRu: e.target.value })}
              placeholder="Описание (RU)"
              className="rounded-xl border-slate-300 px-4 py-3 h-32 border"
            />
            <textarea
              value={form.descriptionEn}
              onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
              placeholder="Description (EN)"
              className="md:col-span-2 rounded-xl border-slate-300 px-4 py-3 h-32 border"
            />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email*"
              className="rounded-xl border-slate-300 px-4 py-3 border"
              required
            />
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Հասցե"
              className="rounded-xl border-slate-300 px-4 py-3 border"
            />
            <input
              value={form.phones}
              onChange={(e) => setForm({ ...form, phones: e.target.value })}
              placeholder="Հեռախոսներ (ստորակետով)"
              className="md:col-span-2 rounded-xl border-slate-300 px-4 py-3 border"
            />

            <div className="md:col-span-2 p-4 border-slate-200 rounded-xl border">
              <p className="mb-3 font-semibold text-slate-700">Tags*</p>
              <div className="gap-2 flex flex-wrap">
                {availableTags.map((tag) => (
                  <label
                    key={tag.id}
                    className={`px-3 py-1.5 rounded-lg cursor-pointer border transition ${form.tags.includes(getTagKey(tag)) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200'}`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={form.tags.includes(getTagKey(tag))}
                      onChange={(e) => {
                        const tagKey = getTagKey(tag);
                        const next = e.target.checked
                          ? [...form.tags, tagKey]
                          : form.tags.filter((t) => t !== tagKey);
                        setForm({ ...form, tags: next });
                      }}
                    />
                    {getTagLabel(tag)}
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="mb-2 text-sm font-medium text-slate-500">Լոգո (պարտադիր նորի համար)</p>
              <input
                type="file"
                onChange={(e) => setLogoFile(e.target.files?.[0])}
                className="w-full"
                accept="image/*"
              />
            </div>

            <div className="gap-4 md:col-span-2 pt-4 flex">
              <button
                disabled={submitting}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50"
              >
                {submitting ? 'Պահպանվում է...' : isEdit ? 'Թարմացնել' : 'Ստեղծել'}
              </button>
              <button
                type="button"
                onClick={() => {
                  clearForm();
                  setActiveTab('partners');
                }}
                className="bg-slate-100 px-8 py-3 rounded-xl font-bold"
              >
                Չեղարկել
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Tab 3: Tags Management */}
      {activeTab === 'tags' && (
        <section className="rounded-2xl bg-white p-8 shadow-sm max-w-2xl">
          <div className="gap-3 mb-8 flex">
            <input
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="Նոր tag"
              className="rounded-xl border-slate-300 px-4 py-3 w-full border"
            />
            <button
              onClick={addTag}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold whitespace-nowrap"
            >
              Ավելացնել
            </button>
          </div>
          <div className="space-y-3">
            {availableTags.map((tag) => (
              <div key={tag.id} className="p-3 border-slate-100 rounded-xl flex items-center justify-between border">
                <span className="font-medium">{getTagLabel(tag)}</span>
                <button onClick={() => removeTag(tag.id)} className="text-red-500 text-sm font-bold">
                  Ջնջել
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
