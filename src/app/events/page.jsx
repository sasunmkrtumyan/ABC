'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { pickTextByLanguage } from '@/lib/localize';
import { getSession } from '@/lib/supabase/auth';

function normalizeRestEvent(row) {
  return {
    id: row.id,
    title: row.title || {},
    description: row.description || {},
    eventAt: row.event_at || null,
    mode: row.mode || 'offline',
    place: row.place || '',
    imageUrl: row.image_url || '',
    contactEmail: row.contact_email || '',
    contactPhone: row.contact_phone || '',
  };
}

async function fetchEventsDirectFromSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return [];

  const endpoint = `${supabaseUrl}/rest/v1/events?select=*&order=event_at.desc`;
  const response = await fetch(endpoint, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || 'Failed to fetch events directly from Supabase');
  }

  const rows = await response.json();
  return Array.isArray(rows) ? rows.map(normalizeRestEvent) : [];
}

async function getAuthHeaders() {
  const { data } = await getSession();
  const token = String(data?.session?.access_token || '').trim();
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
}

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

function getCountdown(dateValue, nowMs) {
  const targetMs = new Date(dateValue).getTime();
  if (!Number.isFinite(targetMs) || targetMs <= nowMs) return null;
  const diffHours = Math.floor((targetMs - nowMs) / (1000 * 60 * 60));
  const days = Math.floor(diffHours / 24);
  const hours = diffHours % 24;
  return { days, hours };
}

export default function EventsPage() {
  const { t, language } = useLanguage();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [nowMs, setNowMs] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNowMs(Date.now()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const fetchEvents = async () => {
      setIsLoading(true);
      setLoadError('');
      try {
        const authHeaders = await getAuthHeaders();
        const response = await fetch('/api/events', {
          cache: 'no-store',
          headers: authHeaders,
        });
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload?.message || 'Failed to fetch events');
        }
        // If local server cannot reach Supabase but browser can, fallback to direct REST.
        if (payload?.degraded) {
          const directEvents = await fetchEventsDirectFromSupabase();
          if (!cancelled) setEvents(directEvents);
          return;
        }
        if (!cancelled) setEvents(payload.items || []);
      } catch (error) {
        try {
          const directEvents = await fetchEventsDirectFromSupabase();
          if (!cancelled) {
            setEvents(directEvents);
            setLoadError('');
          }
        } catch (directError) {
          if (!cancelled) {
            setLoadError(String(directError?.message || error?.message || 'Failed to fetch events'));
            setEvents([]);
          }
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchEvents();
    return () => {
      cancelled = true;
    };
  }, []);

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const upcoming = [];
    const past = [];
    events.forEach((event) => {
      const eventMs = new Date(event.eventAt).getTime();
      if (!Number.isFinite(eventMs)) return;
      if (eventMs > nowMs) {
        upcoming.push(event);
      } else {
        past.push(event);
      }
    });

    upcoming.sort((a, b) => new Date(a.eventAt).getTime() - new Date(b.eventAt).getTime());
    past.sort((a, b) => new Date(b.eventAt).getTime() - new Date(a.eventAt).getTime());
    return { upcomingEvents: upcoming, pastEvents: past };
  }, [events, nowMs]);

  return (
    <main className="container-abc py-12">
      <h1 className="text-4xl font-black text-brand.dark">{t.events.title}</h1>
      <p className="mt-3 max-w-3xl text-slate-600">{t.events.intro}</p>
      {loadError ? <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{loadError}</p> : null}

      {isLoading ? (
        <div className="py-16 text-center text-slate-500">
          <div className="mb-3 h-8 w-8 animate-spin border-blue-500 mx-auto rounded-full border-4 border-r-transparent"></div>
          <p>{t.events.loading}</p>
        </div>
      ) : upcomingEvents.length === 0 && pastEvents.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-slate-500">{t.events.noEvents}</p>
      ) : (
        <>
          {upcomingEvents.length > 0 ? (
            <section className="mt-8">
              <h2 className="mb-4 text-2xl font-black text-slate-800">{t.events.upcomingSection}</h2>
              <div className="space-y-5">
                {upcomingEvents.map((event) => {
                  const countdown = getCountdown(event.eventAt, nowMs);
                  return (
                    <article
                      key={event.id}
                      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                    >
                      <div className="grid gap-0 lg:grid-cols-[360px_1fr]">
                        <div className="relative min-h-[240px] bg-slate-100">
                          {event.imageUrl ? (
                            <img
                              src={event.imageUrl}
                              alt={pickTextByLanguage(event.title, language) || 'event'}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-slate-400">
                              {t.events.noImage}
                            </div>
                          )}
                        </div>
                        <div className="p-6 lg:p-8">
                          <div className="gap-2 mb-4 flex flex-wrap items-center">
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                              {t.events.upcoming}
                            </span>
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                              {event.mode === 'online' ? t.events.online : t.events.offline}
                            </span>
                          </div>
                          <h3 className="text-2xl font-black text-slate-800">{pickTextByLanguage(event.title, language)}</h3>
                          <p className="mt-4 whitespace-pre-wrap leading-relaxed text-slate-700">
                            {pickTextByLanguage(event.description, language)}
                          </p>
                          <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <p className="text-sm text-slate-600 flex items-start gap-2">
                              <CalendarDays className="mt-0.5 h-4 w-4 text-slate-500 shrink-0" />
                              <span>{formatEventDate(event.eventAt, language)}</span>
                            </p>
                            <p className="text-sm text-slate-600 flex items-start gap-2">
                              <MapPin className="mt-0.5 h-4 w-4 text-slate-500 shrink-0" />
                              <span>{event.mode === 'offline' ? event.place || '-' : t.events.onlineEvent}</span>
                            </p>
                            {event.contactEmail ? (
                              <p className="text-sm text-slate-600 flex items-start gap-2">
                                <Mail className="mt-0.5 h-4 w-4 text-slate-500 shrink-0" />
                                <span>{event.contactEmail}</span>
                              </p>
                            ) : null}
                            {event.contactPhone ? (
                              <p className="text-sm text-slate-600 flex items-start gap-2">
                                <Phone className="mt-0.5 h-4 w-4 text-slate-500 shrink-0" />
                                <span>{event.contactPhone}</span>
                              </p>
                            ) : null}
                          </div>
                          {countdown ? (
                            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
                              <p className="font-semibold">{t.events.countdownTitle}</p>
                              <p className="text-sm">
                                {countdown.days} {t.events.days} / {countdown.hours} {t.events.hours}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ) : null}

          {pastEvents.length > 0 ? (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-black text-slate-800">{t.events.pastSection}</h2>
              <div className="space-y-5">
                {pastEvents.map((event) => (
                  <article key={event.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="grid gap-0 lg:grid-cols-[360px_1fr]">
                      <div className="relative min-h-[240px] bg-slate-100">
                        {event.imageUrl ? (
                          <img
                            src={event.imageUrl}
                            alt={pickTextByLanguage(event.title, language) || 'event'}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-slate-400">{t.events.noImage}</div>
                        )}
                      </div>
                      <div className="p-6 lg:p-8">
                        <div className="gap-2 mb-4 flex flex-wrap items-center">
                          <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-700">
                            {t.events.past}
                          </span>
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            {event.mode === 'online' ? t.events.online : t.events.offline}
                          </span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-800">{pickTextByLanguage(event.title, language)}</h3>
                        <p className="mt-4 whitespace-pre-wrap leading-relaxed text-slate-700">
                          {pickTextByLanguage(event.description, language)}
                        </p>
                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          <p className="text-sm text-slate-600 flex items-start gap-2">
                            <CalendarDays className="mt-0.5 h-4 w-4 text-slate-500 shrink-0" />
                            <span>{formatEventDate(event.eventAt, language)}</span>
                          </p>
                          <p className="text-sm text-slate-600 flex items-start gap-2">
                            <MapPin className="mt-0.5 h-4 w-4 text-slate-500 shrink-0" />
                            <span>{event.mode === 'offline' ? event.place || '-' : t.events.onlineEvent}</span>
                          </p>
                          {event.contactEmail ? (
                            <p className="text-sm text-slate-600 flex items-start gap-2">
                              <Mail className="mt-0.5 h-4 w-4 text-slate-500 shrink-0" />
                              <span>{event.contactEmail}</span>
                            </p>
                          ) : null}
                          {event.contactPhone ? (
                            <p className="text-sm text-slate-600 flex items-start gap-2">
                              <Phone className="mt-0.5 h-4 w-4 text-slate-500 shrink-0" />
                              <span>{event.contactPhone}</span>
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </>
      )}
    </main>
  );
}
