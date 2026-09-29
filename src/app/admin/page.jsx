'use client';

import { slugify } from '@/lib/slugify.js';
import { getSession, onAuthStateChange, signInWithPassword, signOut as supabaseSignOut } from '@/lib/supabase/auth.js';
import { createEvent, deleteEvent, fetchEvents, updateEvent } from '@/lib/supabase/events.js';
import { createPartner, deletePartner, fetchPartners, updatePartner } from '@/lib/supabase/partners.js';
import { uploadEventImage, uploadPartnerLogo } from '@/lib/supabase/storage.js';
import { createTag, deleteTag, fetchTags } from '@/lib/supabase/tags.js';
import RichTextEditor from '@/components/RichTextEditor.jsx';
import Link from 'next/link'; // Ավելացրել ենք Link հղման համար
import { useEffect, useMemo, useState } from 'react';

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

function getPartnerSubmitErrorMessage(error, userId = '') {
  const rawMessage = String(error?.message || error || '');
  const message = rawMessage.toLowerCase();

  if (message.includes('missing authorization') || message.includes('նիստը')) {
    return 'Գործողությունը ձախողվեց: նիստը չի գտնվել։ Թարմացրեք էջը (Ctrl+Shift+R), նորից մուտք գործեք և կրկին ստեղծեք միջոցառումը։';
  }

  if (message.includes('row-level security') || message.includes('permission denied')) {
    const sqlHint = userId
      ? `insert into public.admins (user_id) values ('${userId}') on conflict (user_id) do nothing;`
      : "insert into public.admins (user_id) values ('<YOUR_USER_UUID>') on conflict (user_id) do nothing;";
    return `Գործողությունը ձախողվեց: Դուք չունեք admin write permission Supabase-ում։ SQL Editor-ում կատարեք՝ ${sqlHint}`;
  }

  if (message.includes('duplicate key') && message.includes('partners_slug_key')) {
    return 'Գործողությունը ձախողվեց: Այս անվան slug-ը արդեն գոյություն ունի, փորձեք այլ անուն։';
  }

  if (message.includes('relation') && message.includes('partners')) {
    return "Գործողությունը ձախողվեց: partners աղյուսակը Supabase-ում չկա։ Գործարկեք supabase/schema.sql և հետո notify pgrst, 'reload schema';";
  }
  if (message.includes('column') && message.includes('links') && message.includes('does not exist')) {
    return "Գործողությունը ձախողվեց: partners աղյուսակում links դաշտը չկա։ Supabase SQL Editor-ում գործարկեք՝ alter table public.partners add column if not exists links text[] not null default '{}'::text[];";
  }

  return `Գործողությունը ձախողվեց: ${rawMessage || 'անհայտ սխալ'}`;
}

async function uploadAdminImage(file, type, key) {
  if (!file) throw new Error('Missing file');
  if (type !== 'partner' && type !== 'event') throw new Error('Invalid upload type.');

  const { data } = await getSession();
  const accessToken = data?.session?.access_token;
  if (!accessToken) {
    throw new Error('Նիստը չի գտնվել։ Թարմացրեք էջը, նորից մուտք գործեք և կրկին փորձեք։');
  }

  try {
    if (type === 'partner') return await uploadPartnerLogo(file, key);
    return await uploadEventImage(file, key);
  } catch (directUploadError) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('key', key || 'item');
    formData.append('access_token', accessToken);

    const response = await fetch('/api/uploads', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: formData,
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload?.message || directUploadError?.message || 'Image upload failed');
    }
    return String(payload?.path || '').trim();
  }
}

const emptyForm = {
  name: '',
  descriptionAm: '',
  descriptionRu: '',
  descriptionEn: '',
  email: '',
  location: '',
  phones: '',
  links: [''],
  tags: [],
  logoUrl: '',
};

const emptyEventForm = {
  titleAm: '',
  titleRu: '',
  titleEn: '',
  descriptionAm: '',
  descriptionRu: '',
  descriptionEn: '',
  hasDetails: false,
  detailsAm: '',
  detailsRu: '',
  detailsEn: '',
  eventDate: '',
  eventTime: '',
  mode: 'offline',
  place: '',
  contactEmail: '',
  contactPhone: '',
  imageUrl: '',
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

function getLocationHref(location = '') {
  const value = String(location || '').trim();
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;
}

function normalizeWebsiteLink(value = '') {
  const text = String(value || '').trim();
  if (!text) return '';
  if (/^(https?:\/\/|mailto:|tel:)/i.test(text)) return text;
  return `https://${text}`;
}

function richTextHasContent(value = '') {
  return String(value)
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .trim().length > 0;
}

function getLocalEventDateParts(value, hasTime = true) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return { eventDate: '', eventTime: '' };
  const pad = (part) => String(part).padStart(2, '0');
  return {
    eventDate: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    eventTime: hasTime ? `${pad(date.getHours())}:${pad(date.getMinutes())}` : '',
  };
}

function formatAdminEventDate(item) {
  if (!item?.eventAt) return '-';
  const date = new Date(item.eventAt);
  if (Number.isNaN(date.getTime())) return '-';
  return item.hasTime === false ? date.toLocaleDateString() : date.toLocaleString();
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('partners'); // Լռելյայն tab
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [partners, setPartners] = useState([]);
  const [events, setEvents] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [logoFile, setLogoFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [partnerSearch, setPartnerSearch] = useState('');
  const [eventSearch, setEventSearch] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [eventForm, setEventForm] = useState(emptyEventForm);
  const [eventImageFile, setEventImageFile] = useState(null);
  const [eventEditingId, setEventEditingId] = useState(null);
  const [eventSubmitting, setEventSubmitting] = useState(false);

  const isEdit = useMemo(() => Boolean(editingId), [editingId]);
  const isEventEdit = useMemo(() => Boolean(eventEditingId), [eventEditingId]);
  const isAuthenticated = Boolean(user);
  const filteredPartners = useMemo(
    () => partners.filter((p) => pickLocalizedValue(p.name).toLowerCase().includes(partnerSearch.toLowerCase())),
    [partners, partnerSearch],
  );
  const filteredEvents = useMemo(
    () =>
      events.filter((item) => {
        const title = pickLocalizedValue(item.title).toLowerCase();
        return title.includes(eventSearch.toLowerCase());
      }),
    [events, eventSearch],
  );

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 2500);
  };

  const loadSupabaseData = async () => {
    try {
      const [partnersData, tagsData, eventsData] = await Promise.all([fetchPartners(), fetchTags(), fetchEvents()]);
      setPartners(partnersData);
      setAvailableTags(tagsData);
      setEvents(eventsData);
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
      links: item.links?.length ? item.links : [''],
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

  const clearEventForm = () => {
    setEventForm(emptyEventForm);
    setEventEditingId(null);
    setEventImageFile(null);
  };

  const fillEventEditForm = (id) => {
    const item = events.find((eventItem) => eventItem.id === id);
    if (!item) return;
    const eventDateParts = getLocalEventDateParts(item.eventAt, item.hasTime);
    setEventEditingId(id);
    setEventForm({
      titleAm: item.title?.am || '',
      titleRu: item.title?.ru || '',
      titleEn: item.title?.en || '',
      descriptionAm: item.description?.am || '',
      descriptionRu: item.description?.ru || '',
      descriptionEn: item.description?.en || '',
      hasDetails: Boolean(item.hasDetails),
      detailsAm: item.details?.am || '',
      detailsRu: item.details?.ru || '',
      detailsEn: item.details?.en || '',
      eventDate: eventDateParts.eventDate,
      eventTime: eventDateParts.eventTime,
      mode: item.mode || 'offline',
      place: item.place || '',
      contactEmail: item.contactEmail || '',
      contactPhone: item.contactPhone || '',
      imageUrl: item.imageUrl || '',
    });
    setActiveTab('add-event');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    const slug = slugify(form.name);
    let logoUrl = null;

    try {
      if (!isEdit && !logoFile) throw new Error('Նոր գործընկերի համար ընտրեք լոգո');
      if (logoFile) logoUrl = await uploadAdminImage(logoFile, 'partner', slug);
      const payload = {
        slug,
        name: { am: form.name, en: form.name, ru: form.name },
        description: { am: form.descriptionAm, en: form.descriptionEn, ru: form.descriptionRu },
        email: form.email.trim(),
        location: form.location.trim(),
        phones: form.phones
          .split(',')
          .map((p) => p.trim())
          .filter(Boolean),
        links: (form.links || []).map(normalizeWebsiteLink).filter(Boolean),
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
      setError(getPartnerSubmitErrorMessage(e, user?.id));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEventSubmit = async (event) => {
    event.preventDefault();
    setEventSubmitting(true);
    setError('');
    try {
      if (!eventForm.eventDate) throw new Error('Նշեք միջոցառման ամսաթիվը');
      if (eventForm.mode === 'offline' && !eventForm.place.trim()) {
        throw new Error('Օֆլայն միջոցառման համար նշեք վայրը');
      }
      if (
        eventForm.hasDetails &&
        ![eventForm.detailsAm, eventForm.detailsRu, eventForm.detailsEn].every(richTextHasContent)
      ) {
        throw new Error('Լրացրեք միջոցառման ամբողջական բովանդակությունը բոլոր երեք լեզուներով');
      }
      if (!isEventEdit && !eventImageFile) throw new Error('Նոր միջոցառման համար ընտրեք նկար');

      let imageUrl = eventForm.imageUrl || '';
      if (eventImageFile) {
        imageUrl = await uploadAdminImage(
          eventImageFile,
          'event',
          slugify(eventForm.titleEn || eventForm.titleAm || 'event')
        );
      }

      const eventDateTime = new Date(`${eventForm.eventDate}T${eventForm.eventTime || '00:00'}`);
      if (Number.isNaN(eventDateTime.getTime())) throw new Error('Նշեք վավեր ամսաթիվ');

      const payload = {
        title: {
          am: eventForm.titleAm.trim(),
          ru: eventForm.titleRu.trim(),
          en: eventForm.titleEn.trim(),
        },
        description: {
          am: eventForm.descriptionAm.trim(),
          ru: eventForm.descriptionRu.trim(),
          en: eventForm.descriptionEn.trim(),
        },
        hasDetails: eventForm.hasDetails,
        details: eventForm.hasDetails
          ? {
              am: eventForm.detailsAm,
              ru: eventForm.detailsRu,
              en: eventForm.detailsEn,
            }
          : {},
        eventAt: eventDateTime.toISOString(),
        hasTime: Boolean(eventForm.eventTime),
        mode: eventForm.mode,
        place: eventForm.mode === 'offline' ? eventForm.place.trim() : '',
        imageUrl,
        contactEmail: eventForm.contactEmail.trim(),
        contactPhone: eventForm.contactPhone.trim(),
      };

      if (isEventEdit) {
        await updateEvent(eventEditingId, payload);
        showSuccess('Միջոցառումը թարմացվեց');
      } else {
        await createEvent(payload);
        showSuccess('Միջոցառումը ավելացվեց');
      }
      await loadSupabaseData();
      clearEventForm();
      setActiveTab('events');
    } catch (submitError) {
      const message = String(submitError?.message || '');
      if (message.toLowerCase().includes('events table is missing')) {
        setError(
          "Գործողությունը ձախողվեց: Events աղյուսակը Supabase-ում չկա։ Գործարկեք supabase/schema.sql և հետո SQL Editor-ում կատարեք՝ notify pgrst, 'reload schema';"
        );
      } else if (
        message.toLowerCase().includes('has_details') ||
        message.toLowerCase().includes('details') ||
        message.toLowerCase().includes('has_time') ||
        message.toLowerCase().includes('public_id')
      ) {
        setError(
          "Գործողությունը ձախողվեց: Events աղյուսակի նոր դաշտերը բացակայում են։ Supabase-ում նորից գործարկեք supabase/schema.sql։"
        );
      } else {
        setError(`Գործողությունը ձախողվեց: ${message}`);
      }
    } finally {
      setEventSubmitting(false);
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

  const removeEvent = async (id) => {
    if (confirm('Համոզվա՞ծ եք:')) {
      await deleteEvent(id);
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
          onClick={() => {
            setActiveTab('events');
            clearEventForm();
          }}
          className={`px-6 py-3 font-bold transition-all ${activeTab === 'events' ? 'border-blue-600 text-blue-600 border-b-2' : 'text-slate-500'}`}
        >
          Միջոցառումների ցանկ
        </button>
        <button
          onClick={() => {
            if (!isEventEdit) clearEventForm();
            setActiveTab('add-event');
          }}
          className={`px-6 py-3 font-bold transition-all ${activeTab === 'add-event' ? 'border-blue-600 text-blue-600 border-b-2' : 'text-slate-500'}`}
        >
          {isEventEdit ? 'Խմբագրել միջոցառում' : 'Ավելացնել միջոցառում'}
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
          </div>
          <div className="space-y-3">
            {filteredPartners.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border-slate-100 rounded-xl hover:bg-slate-50 flex items-center justify-between border transition"
                >
                  <div>
                    <p className="font-bold text-slate-800">{pickLocalizedValue(item.name)}</p>
                    <div className="text-sm text-slate-500">
                      {item.email ? (
                        <a href={`mailto:${item.email}`} className="underline hover:text-blue-600">
                          {item.email}
                        </a>
                      ) : null}
                      {item.location ? (
                        <p>
                          <a
                            href={getLocationHref(item.location)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-blue-600"
                          >
                            {item.location}
                          </a>
                        </p>
                      ) : null}
                    </div>
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
            <RichTextEditor
              value={form.descriptionAm}
              onChange={(nextValue) => setForm({ ...form, descriptionAm: nextValue })}
              placeholder="Նկարագրություն (AM)"
            />
            <RichTextEditor
              value={form.descriptionRu}
              onChange={(nextValue) => setForm({ ...form, descriptionRu: nextValue })}
              placeholder="Описание (RU)"
            />
            <RichTextEditor
              value={form.descriptionEn}
              onChange={(nextValue) => setForm({ ...form, descriptionEn: nextValue })}
              placeholder="Description (EN)"
              className="md:col-span-2"
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email*"
              className="rounded-xl border-slate-300 px-4 py-3 border"
              required
            />
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Հասցե կամ Google Maps հղում"
              className="rounded-xl border-slate-300 px-4 py-3 border"
            />
            <input
              value={form.phones}
              onChange={(e) => setForm({ ...form, phones: e.target.value })}
              placeholder="Հեռախոսներ (ստորակետով)"
              className="md:col-span-2 rounded-xl border-slate-300 px-4 py-3 border"
            />
            <div className="md:col-span-2 space-y-2 rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">Links</p>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, links: [...(form.links || []), ''] })}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold"
                >
                  + Add link
                </button>
              </div>
              {(form.links || []).map((linkValue, index) => (
                <div key={`partner-link-${index}`} className="flex gap-2">
                  <input
                    value={linkValue}
                    onChange={(e) => {
                      const nextLinks = [...(form.links || [])];
                      nextLinks[index] = e.target.value;
                      setForm({ ...form, links: nextLinks });
                    }}
                    placeholder="https://example.com"
                    className="flex-1 rounded-xl border border-slate-300 px-4 py-3"
                  />
                  {(form.links || []).length > 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        const nextLinks = (form.links || []).filter((_, i) => i !== index);
                        setForm({ ...form, links: nextLinks.length ? nextLinks : [''] });
                      }}
                      className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600"
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              ))}
            </div>

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
                required={!isEdit}
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

      {activeTab === 'events' && (
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6">
            <input
              value={eventSearch}
              onChange={(e) => setEventSearch(e.target.value)}
              placeholder="Փնտրել միջոցառում..."
              className="rounded-xl border-slate-300 px-4 py-3 w-full border"
            />
          </div>
          <div className="space-y-3">
            {filteredEvents.length === 0 ? (
              <p className="rounded-xl border border-slate-200 p-4 text-slate-500">Միջոցառումներ չեն գտնվել</p>
            ) : (
              filteredEvents.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border-slate-100 rounded-xl hover:bg-slate-50 flex items-center justify-between border transition"
                >
                  <div>
                    <p className="font-bold text-slate-800">{pickLocalizedValue(item.title)}</p>
                    <p className="text-sm text-slate-500">
                      {formatAdminEventDate(item)} | {item.mode === 'online' ? 'Առցանց' : 'Օֆլայն'}
                    </p>
                  </div>
                  <div className="gap-2 flex">
                    <button
                      onClick={() => fillEventEditForm(item.id)}
                      className="px-4 py-2 text-sm font-semibold bg-slate-100 rounded-lg"
                    >
                      Խմբագրել
                    </button>
                    <button
                      onClick={() => removeEvent(item.id)}
                      className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-lg"
                    >
                      Ջնջել
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {activeTab === 'add-event' && (
        <section className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6">{isEventEdit ? 'Խմբագրել միջոցառում' : 'Նոր միջոցառում'}</h2>
          <form onSubmit={handleEventSubmit} className="md:grid-cols-2 gap-6 grid grid-cols-1">
            <input
              value={eventForm.titleAm}
              onChange={(e) => setEventForm({ ...eventForm, titleAm: e.target.value })}
              placeholder="Վերնագիր (AM)*"
              className="rounded-xl border-slate-300 px-4 py-3 border"
              required
            />
            <input
              value={eventForm.titleRu}
              onChange={(e) => setEventForm({ ...eventForm, titleRu: e.target.value })}
              placeholder="Заголовок (RU)*"
              className="rounded-xl border-slate-300 px-4 py-3 border"
              required
            />
            <input
              value={eventForm.titleEn}
              onChange={(e) => setEventForm({ ...eventForm, titleEn: e.target.value })}
              placeholder="Title (EN)*"
              className="md:col-span-2 rounded-xl border-slate-300 px-4 py-3 border"
              required
            />
            <textarea
              value={eventForm.descriptionAm}
              onChange={(e) => setEventForm({ ...eventForm, descriptionAm: e.target.value })}
              placeholder="Նկարագրություն (AM)*"
              className="rounded-xl border-slate-300 px-4 py-3 h-32 border"
              required
            />
            <textarea
              value={eventForm.descriptionRu}
              onChange={(e) => setEventForm({ ...eventForm, descriptionRu: e.target.value })}
              placeholder="Описание (RU)*"
              className="rounded-xl border-slate-300 px-4 py-3 h-32 border"
              required
            />
            <textarea
              value={eventForm.descriptionEn}
              onChange={(e) => setEventForm({ ...eventForm, descriptionEn: e.target.value })}
              placeholder="Description (EN)*"
              className="md:col-span-2 rounded-xl border-slate-300 px-4 py-3 h-32 border"
              required
            />

            <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <label className="flex cursor-pointer items-center justify-between gap-4">
                <span>
                  <span className="block font-bold text-slate-800">Ավելացնել ամբողջական բովանդակություն</span>
                  <span className="mt-1 block text-sm text-slate-500">
                    Միացնելու դեպքում միջոցառման քարտում կերևա «Տեսնել ավելին» կոճակը։
                  </span>
                </span>
                <span className="relative inline-flex shrink-0">
                  <input
                    type="checkbox"
                    checked={eventForm.hasDetails}
                    onChange={(e) => setEventForm({ ...eventForm, hasDetails: e.target.checked })}
                    className="peer sr-only"
                  />
                  <span className="h-7 w-12 rounded-full bg-slate-300 transition peer-checked:bg-blue-600 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5" />
                </span>
              </label>
            </div>

            {eventForm.hasDetails ? (
              <div className="md:col-span-2 space-y-6 rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
                <div>
                  <h3 className="font-bold text-slate-800">Միջոցառման ամբողջական բովանդակություն</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Կարող եք օգտագործել վերնագրեր, ցուցակներ, հղումներ, գույներ և տեքստի հավասարեցում։
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-700">Հայերեն (AM)*</p>
                  <RichTextEditor
                    value={eventForm.detailsAm}
                    onChange={(nextValue) => setEventForm((current) => ({ ...current, detailsAm: nextValue }))}
                    placeholder="Ամբողջական բովանդակություն հայերեն"
                  />
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-700">Русский (RU)*</p>
                  <RichTextEditor
                    value={eventForm.detailsRu}
                    onChange={(nextValue) => setEventForm((current) => ({ ...current, detailsRu: nextValue }))}
                    placeholder="Полное содержание на русском"
                  />
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-700">English (EN)*</p>
                  <RichTextEditor
                    value={eventForm.detailsEn}
                    onChange={(nextValue) => setEventForm((current) => ({ ...current, detailsEn: nextValue }))}
                    placeholder="Full content in English"
                  />
                </div>
              </div>
            ) : null}

            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
              Ամսաթիվ *
              <input
                type="date"
                value={eventForm.eventDate}
                onChange={(e) => setEventForm({ ...eventForm, eventDate: e.target.value })}
                className="rounded-xl border-slate-300 px-4 py-3 border"
                required
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
              Ժամ (ոչ պարտադիր)
              <input
                type="time"
                value={eventForm.eventTime}
                onChange={(e) => setEventForm({ ...eventForm, eventTime: e.target.value })}
                className="rounded-xl border-slate-300 px-4 py-3 border"
              />
            </label>

            <select
              value={eventForm.mode}
              onChange={(e) => setEventForm({ ...eventForm, mode: e.target.value })}
              className="rounded-xl border-slate-300 px-4 py-3 border"
              required
            >
              <option value="offline">Օֆլայն</option>
              <option value="online">Առցանց</option>
            </select>

            <input
              value={eventForm.place}
              onChange={(e) => setEventForm({ ...eventForm, place: e.target.value })}
              placeholder="Միջոցառման վայր (պարտադիր օֆլայնի համար)"
              className="md:col-span-2 rounded-xl border-slate-300 px-4 py-3 border"
              required={eventForm.mode === 'offline'}
            />

            <input
              type="email"
              value={eventForm.contactEmail}
              onChange={(e) => setEventForm({ ...eventForm, contactEmail: e.target.value })}
              placeholder="Contact email (ոչ պարտադիր)"
              className="rounded-xl border-slate-300 px-4 py-3 border"
            />
            <input
              value={eventForm.contactPhone}
              onChange={(e) => setEventForm({ ...eventForm, contactPhone: e.target.value })}
              placeholder="Contact phone (ոչ պարտադիր)"
              className="rounded-xl border-slate-300 px-4 py-3 border"
            />

            <div className="md:col-span-2">
              <p className="mb-2 text-sm font-medium text-slate-500">Նկար (պարտադիր նոր միջոցառման համար)</p>
              <input
                type="file"
                onChange={(e) => setEventImageFile(e.target.files?.[0])}
                className="w-full"
                accept="image/*"
              />
            </div>

            <div className="gap-4 md:col-span-2 pt-4 flex">
              <button
                disabled={eventSubmitting}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50"
              >
                {eventSubmitting ? 'Պահպանվում է...' : isEventEdit ? 'Թարմացնել' : 'Ստեղծել'}
              </button>
              <button
                type="button"
                onClick={() => {
                  clearEventForm();
                  setActiveTab('events');
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
