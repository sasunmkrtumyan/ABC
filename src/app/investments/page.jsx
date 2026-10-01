'use client';

import Link from 'next/link';
import { ArrowRight, Banknote, CalendarDays, MapPin, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { pickTextByLanguage } from '@/lib/localize';
import { fetchInvestments } from '@/lib/supabase/investments';

function localeFor(language) {
  if (language === 'am') return 'hy-AM';
  if (language === 'ru') return 'ru-RU';
  return 'en-US';
}

function formatAmount(amount, currency, language) {
  if (amount == null) return '-';
  try {
    return new Intl.NumberFormat(localeFor(language), {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${Number(amount).toLocaleString()} ${currency || ''}`.trim();
  }
}

function formatDeadline(value, language) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(localeFor(language), {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export default function InvestmentsPage() {
  const { language, t } = useLanguage();
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [sector, setSector] = useState('all');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    let cancelled = false;
    fetchInvestments()
      .then((items) => {
        if (!cancelled) setInvestments(items);
      })
      .catch((loadError) => {
        if (!cancelled) setError(String(loadError?.message || 'Failed to load investments'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const sectors = useMemo(
    () => [...new Set(investments.map((item) => item.sector).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [investments],
  );

  const visibleInvestments = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return investments.filter((item) => {
      const matchesQuery =
        !needle ||
        `${item.companyName} ${pickTextByLanguage(item.title, language)} ${pickTextByLanguage(item.summary, language)}`
          .toLowerCase()
          .includes(needle);
      return (
        matchesQuery &&
        (type === 'all' || item.investmentType === type) &&
        (sector === 'all' || item.sector === sector) &&
        (status === 'all' || item.status === status)
      );
    });
  }, [investments, language, query, sector, status, type]);

  return (
    <main>
      <section className="border-b border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container-abc py-14 md:py-20">
          <h1 className="max-w-4xl break-words text-2xl font-black leading-tight text-slate-900 sm:text-3xl md:text-5xl">{t.investments.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">{t.investments.intro}</p>
        </div>
      </section>

      <div className="container-abc py-10">
        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.investments.search}
              className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none focus:border-blue-500"
            />
          </div>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3"
          >
            <option value="all">{t.investments.allTypes}</option>
            {Object.entries(t.investments.types).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <select
            value={sector}
            onChange={(event) => setSector(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3"
          >
            <option value="all">{t.investments.allSectors}</option>
            {sectors.map((sectorName) => (
              <option key={sectorName} value={sectorName}>{sectorName}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3"
          >
            <option value="all">{t.investments.allStatuses}</option>
            <option value="open">{t.investments.open}</option>
            <option value="closed">{t.investments.closed}</option>
          </select>
        </div>

        {error ? <p className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">{error}</p> : null}
        {loading ? (
          <div className="py-16 text-center text-slate-500">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-r-transparent" />
            <p>{t.investments.loading}</p>
          </div>
        ) : visibleInvestments.length ? (
          <div className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {visibleInvestments.map((item) => {
              const title = pickTextByLanguage(item.title, language);
              return (
                <article
                  key={item.id}
                  className="group flex overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex w-full flex-col">
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                      <img
                        src={item.companyImageUrl}
                        alt={item.companyName}
                        loading="lazy"
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                      />
                      <span
                        className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                          item.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {item.status === 'open' ? t.investments.open : t.investments.closed}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-sm font-bold uppercase tracking-wide text-blue-600">{item.companyName}</p>
                      <h2 className="mt-2 text-2xl font-black leading-tight text-slate-900">{title}</h2>
                      <p className="mt-3 line-clamp-3 leading-relaxed text-slate-600">
                        {pickTextByLanguage(item.summary, language)}
                      </p>
                      <div className="mt-5 space-y-2 border-t border-slate-100 pt-5 text-sm text-slate-600">
                        {item.amount != null ? (
                          <p className="flex items-center gap-2 font-bold text-slate-800">
                            <Banknote className="h-4 w-4 text-blue-600" />
                            {formatAmount(item.amount, item.currency, language)}
                          </p>
                        ) : null}
                        {item.location ? (
                          <p className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            {item.location}
                          </p>
                        ) : null}
                        <p className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-slate-400" />
                          {item.deadline ? formatDeadline(item.deadline, language) : t.investments.noDeadline}
                        </p>
                      </div>
                      <div className="mt-auto pt-6">
                        <Link
                          href={`/investments/${item.slug}`}
                          className="inline-flex items-center gap-2 font-bold text-blue-600 transition group-hover:gap-3"
                        >
                          {t.investments.viewOpportunity}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            {t.investments.noOpportunities}
          </p>
        )}
      </div>
    </main>
  );
}
