'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../../lib/i18n/LanguageContext';
import { pickTextByLanguage } from '../../lib/localize';
import { getSession } from '../../lib/supabase/auth';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = [10, 20, 50, 100, 500];

function normalizeLookupKey(value) {
  return String(value || '').trim().toLowerCase();
}

function safePdfFileName(value) {
  return String(value || 'export').replace(/[\\/:*?"<>|]/g, '_').trim() || 'export';
}

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function applyPdfFont(doc) {
  const loaded = { default: 'helvetica', armenian: 'helvetica' };
  const candidates = [
    { file: '/fonts/NotoSans-Regular.ttf', vfs: 'NotoSans-Regular.ttf', family: 'NotoSans', key: 'default' },
    {
      file: '/fonts/NotoSansArmenian-Regular.ttf',
      vfs: 'NotoSansArmenian-Regular.ttf',
      family: 'NotoSansArmenian',
      key: 'armenian',
    },
  ];

  for (const candidate of candidates) {
    try {
      const response = await fetch(candidate.file);
      if (!response.ok) continue;
      const fontBuffer = await response.arrayBuffer();
      const fontBase64 = arrayBufferToBase64(fontBuffer);
      doc.addFileToVFS(candidate.vfs, fontBase64);
      doc.addFont(candidate.vfs, candidate.family, 'normal');
      loaded[candidate.key] = candidate.family;
    } catch (_) {
      // skip font candidate
    }
  }

  if (loaded.default === 'helvetica' && loaded.armenian !== 'helvetica') {
    loaded.default = loaded.armenian;
  }

  doc.setFont(loaded.default, 'normal');
  return loaded;
}

function getLanguageValue(valueByLang = {}, langCode) {
  return String(valueByLang?.[langCode] || '').trim();
}

function getExportPartnerName(item) {
  // Keep export name language-independent and always populated.
  return (
    getLanguageValue(item?.name, 'en') ||
    getLanguageValue(item?.name, 'ru') ||
    getLanguageValue(item?.name, 'am') ||
    String(item?.slug || '').trim() ||
    String(item?.email || '').trim() ||
    '-'
  );
}

function getMissingTableName(error) {
  const msg = String(error?.message || '');
  // PostgREST PGRST205 typically says: Could not find the 'partners' table in the schema cache
  const match = msg.match(/'([^']+)'/);
  return match?.[1] || '';
}

async function getAuthHeaders() {
  const { data } = await getSession();
  const token = String(data?.session?.access_token || '').trim();
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
}

export default function PartnersPage() {
  const { t, language } = useLanguage();
  const [partners, setPartners] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [loadError, setLoadError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const getCategoryLabel = (categoryItem, lang) => {
    const name = categoryItem?.name || {};
    return name[lang] || name.en || name.am || name.ru || categoryItem?.key || '';
  };

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoadError('');
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize),
          category,
        });
        if (query.trim()) params.set('search', query.trim());

        const authHeaders = await getAuthHeaders();
        const response = await fetch(`/api/partners?${params.toString()}`, {
          signal: controller.signal,
          cache: 'no-store',
          headers: authHeaders,
        });
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload?.message || 'Failed to fetch partners.');
        }

        if (cancelled) return;
        setPartners(payload.items || []);
        setAvailableTags(payload.categories || []);
        setTotal(payload.total || 0);
        setTotalPages(payload.totalPages || 1);
        if (typeof payload.page === 'number') {
          setPage(payload.page);
        }
      } catch (error) {
        if (error?.name === 'AbortError') return;
        if (cancelled) return;
        const code = error?.code || error?.status || 'unknown';
        if (code === 'PGRST205') {
          const missing = getMissingTableName(error);
          setLoadError(
            `Supabase schema is not ready (missing table${missing ? `: ${missing}` : 's'}). Run supabase/schema.sql in Supabase SQL Editor, then run: notify pgrst, 'reload schema';`,
          );
        } else {
          setLoadError(`Supabase unavailable (${code}). ${String(error?.message || '')}`.trim());
        }
        setPartners([]);
        setAvailableTags([]);
        setTotal(0);
        setTotalPages(1);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }, 250);

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, [category, page, pageSize, query]);

  const categories = useMemo(() => availableTags, [availableTags]);
  const categoryMap = useMemo(() => {
    const map = new Map();
    (categories || []).forEach((item) => {
      const aliases = [item.key, item.slug, item?.name?.en, item?.name?.am, item?.name?.ru];
      aliases.forEach((alias) => {
        const key = normalizeLookupKey(alias);
        if (key) map.set(key, item);
      });
    });
    return map;
  }, [categories]);

  useEffect(() => {
    setPage(1);
  }, [query, category, pageSize]);

  const exportPdf = async () => {
    if (category === 'all') return;
    setIsExporting(true);
    try {
      const params = new URLSearchParams({
        page: '1',
        pageSize: '100',
        category,
        export: '1',
      });
      if (query.trim()) params.set('search', query.trim());

      const authHeaders = await getAuthHeaders();
      const response = await fetch(`/api/partners?${params.toString()}`, {
        cache: 'no-store',
        headers: authHeaders,
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || 'Failed to export data.');
      }

      const selectedActiveCategory =
        (payload.categories || []).find((item) => normalizeLookupKey(item.key) === normalizeLookupKey(category)) ||
        categoryMap.get(normalizeLookupKey(category));
      const selectedCategoryLabel =
        getCategoryLabel(selectedActiveCategory, language) || getCategoryLabel(selectedActiveCategory, 'en') || '-';
      const rows = (payload.items || []).map((item) => [
        getExportPartnerName(item),
        selectedCategoryLabel,
        String(item?.email || '-'),
        (item?.phones || []).join(', ') || '-',
      ]);

      const doc = new jsPDF({ orientation: 'landscape' });
      const fonts = await applyPdfFont(doc);
      autoTable(doc, {
        head: [['Name', 'Category', 'Email', 'Phone']],
        body: rows,
        styles: { fontSize: 10, font: fonts.default },
        didParseCell: (hookData) => {
          // Keep partner name in default font; translate only category column.
          if (language === 'am' && hookData.column.index === 1) {
            hookData.cell.styles.font = fonts.armenian;
          } else {
            hookData.cell.styles.font = fonts.default;
          }
        },
      });
      const exportName = getCategoryLabel(selectedActiveCategory, language) || category;
      doc.save(`${safePdfFileName(exportName)}.pdf`);
    } catch (error) {
      setLoadError(String(error?.message || 'Failed to export PDF.'));
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <main className="container-abc py-12">
      <h1 className="text-4xl font-black text-brand.dark">{t.partners.title}</h1>
      {loadError ? <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{loadError}</p> : null}

      <div className="mt-6 gap-4 md:flex-row flex flex-col">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.partners.search}
          className="rounded-xl border-slate-300 px-4 py-3 focus:border-blue-500 w-full border outline-none"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl border-slate-300 bg-white py-3 pl-4 pr-10 focus:border-blue-500 min-w-[240px] cursor-pointer appearance-none border bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207l5%205%205-5%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-[right_12px_center] bg-no-repeat outline-none"
        >
          <option value="all">{t.partners.allCategories}</option>
          {categories.map((item) => (
            <option key={item.key} value={item.key}>
              {getCategoryLabel(item, language)}
            </option>
          ))}
        </select>
        {category !== 'all' ? (
          <button
            onClick={exportPdf}
            disabled={isExporting || isLoading}
            className="rounded-xl whitespace-nowrap bg-blue-500 px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </button>
        ) : null}
      </div>

      <div className="mt-6 rounded-2xl border-slate-200 bg-white overflow-y-auto border">
        <table className="divide-slate-200 min-w-full divide-y">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-xs tracking-wider text-slate-500 text-left uppercase">
                {t.partners.table.name}
              </th>
              <th className="px-4 py-3 text-xs tracking-wider text-slate-500 text-left uppercase">
                {t.partners.table.categories}
              </th>
              <th className="px-4 py-3 text-xs tracking-wider text-slate-500 text-left uppercase">
                {t.partners.table.email}
              </th>
              <th className="px-4 py-3 text-xs tracking-wider text-slate-500 text-left uppercase">Phone</th>
            </tr>
          </thead>
          <tbody className="divide-slate-100 divide-y">
            {isLoading ? (
              <tr>
                <td colSpan="4" className="py-12 text-slate-500 text-center">
                  <div className="mb-3 h-8 w-8 animate-spin border-blue-500 mx-auto rounded-full border-4 border-r-transparent"></div>
                  <p>Բեռնվում է...</p>
                </td>
              </tr>
            ) : partners.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-8 text-slate-500 text-center">
                  Գործընկերներ չեն գտնվել:
                </td>
              </tr>
            ) : (
              partners.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="gap-3 flex items-center">
                      <div className="h-12 w-12 rounded-md border-slate-200 bg-slate-100 shrink-0 overflow-hidden border">
                        {item.logoUrl ? (
                          <Image
                            src={item.logoUrl}
                            alt={pickTextByLanguage(item.name, language) || 'logo'}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <Link href={`/partner/${item.slug}`} className="font-semibold text-blue-500 hover:underline">
                        {pickTextByLanguage(item.name, language)}
                      </Link>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {(() => {
                      const translatedTags = (item.tags || [])
                        .map((tagKey) => categoryMap.get(normalizeLookupKey(tagKey)))
                        .filter(Boolean)
                        .map((tag) => getCategoryLabel(tag, language));
                      return translatedTags.length > 0 ? translatedTags.join(', ') : '-';
                    })()}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{item.email}</td>
                  <td className="px-4 py-3 text-slate-600">{item?.phones?.[0] || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-5 gap-3 flex flex-wrap items-center justify-between">
        <div className="gap-2 flex items-center">
          <label htmlFor="pageSize" className="text-sm text-slate-600">
            Per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(event) => setPageSize(Number(event.target.value))}
            className="rounded-lg border-slate-300 bg-white px-3 py-2 text-sm border"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        {total > pageSize ? (
          <div className="gap-3 flex items-center">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="rounded-lg border-slate-300 px-4 py-2 border disabled:opacity-40"
            >
              Prev
            </button>
            <p className="text-sm text-slate-600">{`${t.common.page} ${page} ${t.common.of} ${totalPages}`}</p>
            <button
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page >= totalPages}
              className="rounded-lg border-slate-300 px-4 py-2 border disabled:opacity-40"
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </main>
  );
}
