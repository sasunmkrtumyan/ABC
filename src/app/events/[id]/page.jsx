'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, CalendarDays, Mail, MapPin, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { prepareHtmlForRender } from '@/lib/html';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { pickTextByLanguage } from '@/lib/localize';
import { fetchEventById } from '@/lib/supabase/events';

function formatEventDate(dateValue, language) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return '-';
  const locale = language === 'am' ? 'hy-AM' : language === 'ru' ? 'ru-RU' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export default function EventDetailsPage() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    if (!id) {
      setIsLoading(false);
      return undefined;
    }

    setIsLoading(true);
    fetchEventById(id)
      .then((item) => {
        if (!cancelled) setEvent(item?.hasDetails ? item : null);
      })
      .catch(() => {
        if (!cancelled) setEvent(null);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (isLoading) {
    return (
      <main className="container-abc py-12">
        <p className="text-slate-500">{t.events.loading}</p>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="container-abc py-12">
        <p className="text-slate-500">{t.common.noData}</p>
        <Link href="/events" className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-600 hover:underline">
          <ArrowLeft className="h-4 w-4" />
          {t.events.backToEvents}
        </Link>
      </main>
    );
  }

  const title = pickTextByLanguage(event.title, language);
  const detailsHtml = prepareHtmlForRender(pickTextByLanguage(event.details, language));

  return (
    <main className="container-abc py-12">
      <Link href="/events" className="mb-6 inline-flex items-center gap-2 font-semibold text-blue-600 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        {t.events.backToEvents}
      </Link>

      <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {event.imageUrl ? (
          <div className="max-h-[520px] overflow-hidden bg-slate-100">
            <img src={event.imageUrl} alt={title || 'event'} className="h-full max-h-[520px] w-full object-cover" />
          </div>
        ) : null}

        <div className="p-6 md:p-10">
          <div className="mb-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {event.mode === 'online' ? t.events.online : t.events.offline}
            </span>
          </div>

          <h1 className="text-3xl font-black text-slate-800 md:text-5xl">{title}</h1>

          <div className="mt-6 grid gap-3 border-b border-slate-200 pb-7 sm:grid-cols-2">
            <p className="flex items-start gap-2 text-sm text-slate-600">
              <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
              <span>{formatEventDate(event.eventAt, language)}</span>
            </p>
            <p className="flex items-start gap-2 text-sm text-slate-600">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
              <span>{event.mode === 'offline' ? event.place || '-' : t.events.onlineEvent}</span>
            </p>
            {event.contactEmail ? (
              <p className="flex items-start gap-2 text-sm text-slate-600">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <a href={`mailto:${event.contactEmail}`} className="hover:text-blue-600 hover:underline">
                  {event.contactEmail}
                </a>
              </p>
            ) : null}
            {event.contactPhone ? (
              <p className="flex items-start gap-2 text-sm text-slate-600">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <a href={`tel:${event.contactPhone}`} className="hover:text-blue-600 hover:underline">
                  {event.contactPhone}
                </a>
              </p>
            ) : null}
          </div>

          <div
            className="rich-text-content event-rich-content mt-8 text-slate-700"
            dangerouslySetInnerHTML={{ __html: detailsHtml }}
          />
        </div>
      </article>
    </main>
  );
}
