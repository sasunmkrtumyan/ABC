'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Banknote,
  Briefcase,
  CalendarDays,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { prepareHtmlForRender } from '@/lib/html';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { pickTextByLanguage } from '@/lib/localize';
import { fetchInvestmentBySlug } from '@/lib/supabase/investments';

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
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export default function InvestmentDetailsPage() {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const [investment, setInvestment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!slug) return undefined;
    fetchInvestmentBySlug(slug)
      .then((item) => {
        if (!cancelled) setInvestment(item);
      })
      .catch(() => {
        if (!cancelled) setInvestment(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return <main className="container-abc py-16 text-slate-500">{t.investments.loading}</main>;
  }

  if (!investment) {
    return (
      <main className="container-abc py-16">
        <p className="text-slate-500">{t.common.noData}</p>
        <Link href="/investments" className="mt-4 inline-flex items-center gap-2 font-bold text-blue-600">
          <ArrowLeft className="h-4 w-4" />
          {t.investments.back}
        </Link>
      </main>
    );
  }

  const title = pickTextByLanguage(investment.title, language);
  const details = prepareHtmlForRender(pickTextByLanguage(investment.details, language));

  return (
    <main className="container-abc py-10 md:py-14">
      <Link href="/investments" className="mb-7 inline-flex items-center gap-2 font-bold text-blue-600 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        {t.investments.back}
      </Link>

      <h1 className="mb-7 max-w-4xl break-words text-2xl font-black leading-tight text-slate-900 md:text-[1.75rem]">{t.investments.title}</h1>

      <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="relative h-[360px] overflow-hidden bg-slate-100 md:h-[520px]">
          <img src={investment.companyImageUrl} alt={investment.companyName} className="h-full w-full object-contain" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-10">
            <div className="mb-3 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  investment.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-slate-200 text-slate-800'
                }`}
              >
                {investment.status === 'open' ? t.investments.open : t.investments.closed}
              </span>
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-800">
                {t.investments.types[investment.investmentType] || t.investments.types.other}
              </span>
            </div>
            <p className="font-bold uppercase tracking-wider text-blue-100">{investment.companyName}</p>
            <h2 className="mt-2 max-w-4xl text-3xl font-black md:text-5xl">{title}</h2>
          </div>
        </div>

        <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[1fr_340px]">
          <div>
            <p className="text-lg leading-relaxed text-slate-600">
              {pickTextByLanguage(investment.summary, language)}
            </p>
            <div
              className="rich-text-content mt-8 border-t border-slate-200 pt-8 text-slate-700"
              dangerouslySetInnerHTML={{ __html: details }}
            />
          </div>

          <aside className="h-fit rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
            {investment.amount != null ? (
              <>
                <h2 className="text-lg font-black text-slate-900">{t.investments.amount}</h2>
                <p className="mt-2 text-3xl font-black text-blue-700">
                  {formatAmount(investment.amount, investment.currency, language)}
                </p>
              </>
            ) : null}

            <dl className={`space-y-4 text-sm ${investment.amount != null ? 'mt-6 border-t border-blue-100 pt-6' : ''}`}>
              <div className="flex items-start gap-3">
                <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                <div>
                  <dt className="font-semibold text-slate-500">{t.investments.type}</dt>
                  <dd className="mt-0.5 font-bold text-slate-800">
                    {t.investments.types[investment.investmentType] || t.investments.types.other}
                  </dd>
                </div>
              </div>
              {investment.sector ? (
                <div className="flex items-start gap-3">
                  <Banknote className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <div>
                    <dt className="font-semibold text-slate-500">{t.investments.sector}</dt>
                    <dd className="mt-0.5 font-bold text-slate-800">{investment.sector}</dd>
                  </div>
                </div>
              ) : null}
              {investment.location ? (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <div>
                    <dt className="font-semibold text-slate-500">{t.investments.location}</dt>
                    <dd className="mt-0.5 font-bold text-slate-800">{investment.location}</dd>
                  </div>
                </div>
              ) : null}
              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                <div>
                  <dt className="font-semibold text-slate-500">{t.investments.deadline}</dt>
                  <dd className="mt-0.5 font-bold text-slate-800">
                    {investment.deadline ? formatDeadline(investment.deadline, language) : t.investments.noDeadline}
                  </dd>
                </div>
              </div>
            </dl>

            {investment.status === 'open' ? (
              <div className="mt-7 border-t border-blue-100 pt-6">
                <h2 className="font-black text-slate-900">{t.investments.contact}</h2>
                <div className="mt-4 space-y-3 text-sm">
                  {investment.emails.map((email) => (
                    <a key={email} href={`mailto:${email}`} className="flex items-center gap-2 text-blue-700 hover:underline">
                      <Mail className="h-4 w-4 shrink-0" />
                      <span className="break-all">{email}</span>
                    </a>
                  ))}
                  {investment.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone}`} className="flex items-center gap-2 text-blue-700 hover:underline">
                      <Phone className="h-4 w-4 shrink-0" />
                      {phone}
                    </a>
                  ))}
                  {investment.website ? (
                    <a
                      href={investment.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-700 hover:underline"
                    >
                      <ExternalLink className="h-4 w-4 shrink-0" />
                      {t.investments.website}
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </article>
    </main>
  );
}
