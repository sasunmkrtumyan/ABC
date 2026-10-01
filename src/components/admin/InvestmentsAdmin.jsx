'use client';

import { useEffect, useMemo, useState } from 'react';
import RichTextEditor from '@/components/RichTextEditor';
import { slugify } from '@/lib/slugify';
import { getSession } from '@/lib/supabase/auth';
import {
  createInvestment,
  deleteInvestment,
  fetchInvestments,
  updateInvestment,
} from '@/lib/supabase/investments';
import { uploadInvestmentImage } from '@/lib/supabase/storage';

const EMPTY_FORM = {
  partnerId: '',
  slug: '',
  companyName: '',
  companyImageUrl: '',
  titleAm: '',
  titleRu: '',
  titleEn: '',
  summaryAm: '',
  summaryRu: '',
  summaryEn: '',
  detailsAm: '',
  detailsRu: '',
  detailsEn: '',
  amount: '',
  currency: 'USD',
  investmentType: 'equity',
  sector: '',
  location: '',
  deadline: '',
  website: '',
  emails: [''],
  phones: [''],
  status: 'draft',
};

const INVESTMENT_TYPES = [
  { value: 'equity', label: 'Բաժնեմասնակցություն (Equity)' },
  { value: 'loan', label: 'Վարկ / պարտք (Loan)' },
  { value: 'strategic', label: 'Ռազմավարական գործընկեր' },
  { value: 'grant', label: 'Դրամաշնորհ (Grant)' },
  { value: 'other', label: 'Այլ' },
];

function pickName(value = {}) {
  return value.am || value.en || value.ru || '';
}

function stripHtml(value = '') {
  return String(value).replace(/<[^>]*>/g, '').replace(/&nbsp;/gi, ' ').trim();
}

function normalizeWebsite(value = '') {
  const text = String(value).trim();
  if (!text || /^https?:\/\//i.test(text)) return text;
  return `https://${text}`;
}

function cleanList(values = []) {
  return values.map((value) => String(value).trim()).filter(Boolean);
}

async function uploadImage(file, key) {
  try {
    return await uploadInvestmentImage(file, key);
  } catch (directError) {
    const { data } = await getSession();
    const token = data?.session?.access_token;
    if (!token) throw directError;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'investment');
    formData.append('key', key);
    formData.append('access_token', token);
    const response = await fetch('/api/uploads', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload?.message || directError?.message || 'Image upload failed');
    return payload.path;
  }
}

function RepeatableField({ label, type = 'text', values, onChange, placeholder }) {
  const updateValue = (index, nextValue) => {
    const next = [...values];
    next[index] = nextValue;
    onChange(next);
  };

  return (
    <div className="space-y-2 rounded-xl border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        <button
          type="button"
          onClick={() => onChange([...values, ''])}
          className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold"
        >
          + Ավելացնել
        </button>
      </div>
      {values.map((value, index) => (
        <div key={`${label}-${index}`} className="flex gap-2">
          <input
            type={type}
            value={value}
            onChange={(event) => updateValue(index, event.target.value)}
            placeholder={placeholder}
            className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3"
          />
          {values.length > 1 ? (
            <button
              type="button"
              onClick={() => onChange(values.filter((_, valueIndex) => valueIndex !== index))}
              className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600"
            >
              Ջնջել
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default function InvestmentsAdmin({ partners = [], mode, onModeChange }) {
  const [investments, setInvestments] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState('');
  const [search, setSearch] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadInvestments = async () => {
    setLoading(true);
    try {
      setInvestments(await fetchInvestments({ includeDrafts: true }));
      setError('');
    } catch (loadError) {
      setError(String(loadError?.message || 'Ներդրումները չհաջողվեց բեռնել'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvestments();
  }, []);

  const filteredInvestments = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return investments;
    return investments.filter((item) =>
      `${item.companyName} ${pickName(item.title)}`.toLowerCase().includes(needle),
    );
  }, [investments, search]);

  const clearForm = () => {
    setForm(EMPTY_FORM);
    setImageFile(null);
    setEditingId('');
    setError('');
  };

  const openCreate = () => {
    clearForm();
    onModeChange('add-investment');
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setImageFile(null);
    setForm({
      partnerId: item.partnerId || '',
      slug: item.slug,
      companyName: item.companyName,
      companyImageUrl: item.companyImageUrl,
      titleAm: item.title?.am || '',
      titleRu: item.title?.ru || '',
      titleEn: item.title?.en || '',
      summaryAm: item.summary?.am || '',
      summaryRu: item.summary?.ru || '',
      summaryEn: item.summary?.en || '',
      detailsAm: item.details?.am || '',
      detailsRu: item.details?.ru || '',
      detailsEn: item.details?.en || '',
      amount: item.amount ?? '',
      currency: item.currency || 'USD',
      investmentType: item.investmentType || 'other',
      sector: item.sector || '',
      location: item.location || '',
      deadline: item.deadline || '',
      website: item.website || '',
      emails: item.emails?.length ? item.emails : [''],
      phones: item.phones?.length ? item.phones : [''],
      status: item.status || 'draft',
    });
    setError('');
    onModeChange('add-investment');
  };

  const selectPartner = (partnerId) => {
    const partner = partners.find((item) => item.id === partnerId);
    setForm((current) => ({
      ...current,
      partnerId,
      companyName: partner ? pickName(partner.name) : current.companyName,
      companyImageUrl: partner?.logoUrl || current.companyImageUrl,
      emails: partner?.email ? [partner.email] : current.emails,
      phones: partner?.phones?.length ? partner.phones : current.phones,
      website: partner?.links?.[0] || current.website,
      location: partner?.location || current.location,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const localizedRequired = [
        form.titleAm,
        form.titleRu,
        form.titleEn,
        form.summaryAm,
        form.summaryRu,
        form.summaryEn,
      ];
      if (localizedRequired.some((value) => !String(value).trim())) {
        throw new Error('Լրացրեք վերնագիրն ու կարճ նկարագրությունը բոլոր երեք լեզուներով');
      }
      if ([form.detailsAm, form.detailsRu, form.detailsEn].some((value) => !stripHtml(value))) {
        throw new Error('Լրացրեք ամբողջական նկարագրությունը բոլոր երեք լեզուներով');
      }
      if (!form.companyName.trim()) throw new Error('Նշեք ընկերության անունը');
      const rawAmount = String(form.amount).trim();
      const parsedAmount = rawAmount === '' ? null : Number(rawAmount);
      if (parsedAmount != null && (!Number.isFinite(parsedAmount) || parsedAmount <= 0)) {
        throw new Error('Նշեք վավեր ներդրման գումար');
      }
      const emails = cleanList(form.emails);
      const phones = cleanList(form.phones);
      if (!emails.length && !phones.length) throw new Error('Ավելացրեք առնվազն մեկ email կամ հեռախոս');

      const generatedSlug =
        form.slug ||
        `${slugify(form.titleEn || form.titleAm || form.companyName) || 'investment'}-${Date.now().toString(36)}`;
      let companyImageUrl = form.companyImageUrl;
      if (imageFile) companyImageUrl = await uploadImage(imageFile, generatedSlug);
      if (!companyImageUrl) throw new Error('Ընտրեք ընկերության կամ ներդրման նկար');

      const payload = {
        partnerId: form.partnerId,
        slug: generatedSlug,
        companyName: form.companyName.trim(),
        companyImageUrl,
        title: { am: form.titleAm.trim(), ru: form.titleRu.trim(), en: form.titleEn.trim() },
        summary: { am: form.summaryAm.trim(), ru: form.summaryRu.trim(), en: form.summaryEn.trim() },
        details: { am: form.detailsAm, ru: form.detailsRu, en: form.detailsEn },
        amount: parsedAmount,
        currency: form.currency,
        investmentType: form.investmentType,
        sector: form.sector.trim(),
        location: form.location.trim(),
        deadline: form.deadline,
        website: normalizeWebsite(form.website),
        emails,
        phones,
        status: form.status,
      };

      if (editingId) {
        await updateInvestment(editingId, payload);
        setMessage('Ներդրումային առաջարկը թարմացվեց');
      } else {
        await createInvestment(payload);
        setMessage('Ներդրումային առաջարկը ստեղծվեց');
      }
      await loadInvestments();
      clearForm();
      onModeChange('investments');
    } catch (submitError) {
      setError(String(submitError?.message || 'Գործողությունը ձախողվեց'));
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    if (!confirm('Համոզվա՞ծ եք, որ ցանկանում եք ջնջել առաջարկը։')) return;
    try {
      await deleteInvestment(id);
      await loadInvestments();
      setMessage('Ներդրումային առաջարկը ջնջվեց');
    } catch (removeError) {
      setError(String(removeError?.message || 'Ջնջումը ձախողվեց'));
    }
  };

  if (mode === 'investments') {
    return (
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Փնտրել ընկերությամբ կամ վերնագրով..."
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3"
          />
          <button onClick={openCreate} className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">
            + Նոր ներդրում
          </button>
        </div>
        {error ? <p className="mb-4 rounded-xl bg-red-50 p-3 text-red-700">{error}</p> : null}
        {message ? <p className="mb-4 rounded-xl bg-green-50 p-3 text-green-700">{message}</p> : null}
        {loading ? (
          <p className="text-slate-500">Բեռնվում է...</p>
        ) : filteredInvestments.length ? (
          <div className="space-y-3">
            {filteredInvestments.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-4 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center"
              >
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <p className="font-bold text-slate-800">{pickName(item.title)}</p>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        item.status === 'open'
                          ? 'bg-green-100 text-green-700'
                          : item.status === 'closed'
                            ? 'bg-slate-200 text-slate-700'
                            : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">
                    {item.companyName}
                    {item.amount != null ? ` · ${item.amount.toLocaleString()} ${item.currency}` : ''}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="rounded-lg bg-slate-100 px-4 py-2 font-semibold">
                    Խմբագրել
                  </button>
                  <button onClick={() => remove(item.id)} className="rounded-lg bg-red-50 px-4 py-2 font-semibold text-red-600">
                    Ջնջել
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-slate-200 p-4 text-slate-500">Ներդրումային առաջարկներ դեռ չկան։</p>
        )}
      </section>
    );
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-6 text-xl font-bold">{editingId ? 'Խմբագրել ներդրումային առաջարկը' : 'Նոր ներդրումային առաջարկ'}</h2>
      {error ? <p className="mb-4 rounded-xl bg-red-50 p-3 text-red-700">{error}</p> : null}
      <form onSubmit={submit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
          Կապել գոյություն ունեցող գործընկերոջ հետ (ոչ պարտադիր)
          <select
            value={form.partnerId}
            onChange={(event) => selectPartner(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3"
          >
            <option value="">Առանձին ընկերություն</option>
            {partners.map((partner) => (
              <option key={partner.id} value={partner.id}>
                {pickName(partner.name)}
              </option>
            ))}
          </select>
        </label>

        <input
          value={form.companyName}
          onChange={(event) => setForm({ ...form, companyName: event.target.value })}
          placeholder="Ընկերության անուն *"
          className="rounded-xl border border-slate-300 px-4 py-3 md:col-span-2"
          required
        />

        {['Am', 'Ru', 'En'].map((languageKey) => (
          <input
            key={`title-${languageKey}`}
            value={form[`title${languageKey}`]}
            onChange={(event) => setForm({ ...form, [`title${languageKey}`]: event.target.value })}
            placeholder={`Վերնագիր (${languageKey.toUpperCase()}) *`}
            className="rounded-xl border border-slate-300 px-4 py-3"
            required
          />
        ))}

        {['Am', 'Ru', 'En'].map((languageKey) => (
          <textarea
            key={`summary-${languageKey}`}
            value={form[`summary${languageKey}`]}
            onChange={(event) => setForm({ ...form, [`summary${languageKey}`]: event.target.value })}
            placeholder={`Կարճ նկարագրություն (${languageKey.toUpperCase()}) *`}
            className="min-h-28 rounded-xl border border-slate-300 px-4 py-3"
            required
          />
        ))}

        <div className="space-y-5 md:col-span-2">
          {[
            ['Am', 'Ամբողջական նկարագրություն (AM) *'],
            ['Ru', 'Полное описание (RU) *'],
            ['En', 'Full description (EN) *'],
          ].map(([languageKey, label]) => (
            <div key={`details-${languageKey}`}>
              <p className="mb-2 text-sm font-semibold text-slate-700">{label}</p>
              <RichTextEditor
                value={form[`details${languageKey}`]}
                onChange={(value) => setForm((current) => ({ ...current, [`details${languageKey}`]: value }))}
                placeholder={label}
              />
            </div>
          ))}
        </div>

        <input
          type="number"
          min="0"
          step="0.01"
          value={form.amount}
          onChange={(event) => setForm({ ...form, amount: event.target.value })}
          placeholder="Պահանջվող գումար (ոչ պարտադիր)"
          className="rounded-xl border border-slate-300 px-4 py-3"
        />
        <select
          value={form.currency}
          onChange={(event) => setForm({ ...form, currency: event.target.value })}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3"
        >
          {['USD', 'EUR', 'AMD', 'RUB', 'GBP'].map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <select
          value={form.investmentType}
          onChange={(event) => setForm({ ...form, investmentType: event.target.value })}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3"
        >
          {INVESTMENT_TYPES.map((type) => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
        <input
          value={form.sector}
          onChange={(event) => setForm({ ...form, sector: event.target.value })}
          placeholder="Ոլորտ (օր.՝ Տեխնոլոգիաներ)"
          className="rounded-xl border border-slate-300 px-4 py-3"
        />
        <input
          value={form.location}
          onChange={(event) => setForm({ ...form, location: event.target.value })}
          placeholder="Գտնվելու վայր"
          className="rounded-xl border border-slate-300 px-4 py-3"
        />
        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          Դիմելու վերջնաժամկետ (ոչ պարտադիր)
          <input
            type="date"
            value={form.deadline}
            onChange={(event) => setForm({ ...form, deadline: event.target.value })}
            className="rounded-xl border border-slate-300 px-4 py-3"
          />
        </label>
        <input
          value={form.website}
          onChange={(event) => setForm({ ...form, website: event.target.value })}
          placeholder="Կայք"
          className="rounded-xl border border-slate-300 px-4 py-3 md:col-span-2"
        />

        <RepeatableField
          label="Email հասցեներ"
          type="email"
          values={form.emails}
          onChange={(emails) => setForm({ ...form, emails })}
          placeholder="contact@example.com"
        />
        <RepeatableField
          label="Հեռախոսահամարներ"
          values={form.phones}
          onChange={(phones) => setForm({ ...form, phones })}
          placeholder="+374 ..."
        />

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          Կարգավիճակ
          <select
            value={form.status}
            onChange={(event) => setForm({ ...form, status: event.target.value })}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3"
          >
            <option value="draft">Սևագիր (չի երևում կայքում)</option>
            <option value="open">Բաց</option>
            <option value="closed">Փակված</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          Ընկերության / առաջարկի նկար {form.companyImageUrl ? '(ներկա նկարը կպահպանվի)' : '*'}
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setImageFile(event.target.files?.[0] || null)}
            className="rounded-xl border border-slate-300 px-4 py-3"
          />
        </label>

        <div className="flex gap-4 pt-2 md:col-span-2">
          <button disabled={busy} className="rounded-xl bg-blue-600 px-8 py-3 font-bold text-white disabled:opacity-50">
            {busy ? 'Պահպանվում է...' : editingId ? 'Թարմացնել' : 'Ստեղծել'}
          </button>
          <button
            type="button"
            onClick={() => {
              clearForm();
              onModeChange('investments');
            }}
            className="rounded-xl bg-slate-100 px-8 py-3 font-bold"
          >
            Չեղարկել
          </button>
        </div>
      </form>
    </section>
  );
}
