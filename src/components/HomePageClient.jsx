'use client';

import { useState } from 'react';
import {
  BadgeCheck,
  CheckCheck,
  HeartHandshake,
  Link,
  Target,
} from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../lib/i18n/LanguageContext';
import RevealSection from './RevealSection';

const sectionImages = {
  welcome: '/img/aboutUs.avif',
  who: '/img/aboutUs.avif',
  mission: '/img/mission.avif',
  why: '/img/mission.avif',
  partners: '/img/logos.avif',
  connect: '/img/connect.png',
};

function SectionHeader({ icon, title, badge }) {
  return (
    <div className="mb-8 flex flex-col items-center text-center">
      <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-full bg-brand-blue text-xl text-white shadow-md shadow-brand-blue/30">
        {icon}
      </span>
      <div className="mt-3">
        {badge ? <p className="text-xs font-bold text-brand-blue/80 tracking-[0.2em] uppercase">{badge}</p> : null}
        <h2 className="text-2xl lg:text-3xl font-black text-brand-dark">{title}</h2>
      </div>
      <span className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-[#D90012] via-[#0033A0] to-[#F2A800]"></span>
    </div>
  );
}

export default function HomePageClient() {
  const { t } = useLanguage();
  const [activeWelcomeIndex, setActiveWelcomeIndex] = useState(0);

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#D90012] via-[#0033A0] to-[#0B1F5B] py-16 text-white md:py-20">
        <div className="absolute -left-16 -top-14 h-48 w-48 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-[#F2A800]/30 blur-3xl"></div>
        <div className="container-abc relative">
          <RevealSection className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-sm md:p-8 lg:p-10">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-black leading-tight md:text-5xl">{t.landing.welcomeTitle}</h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-100 md:text-base">{t.common.slogan}</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div>
                <div className="grid gap-3">
                  {t.landing.welcomeItems.map((item, index) => (
                    <button
                      key={item}
                      type="button"
                      onMouseEnter={() => setActiveWelcomeIndex(index)}
                      onFocus={() => setActiveWelcomeIndex(index)}
                      onClick={() => setActiveWelcomeIndex(index)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition md:text-base ${
                        activeWelcomeIndex === index
                          ? 'border-white/50 bg-white/20 shadow-lg'
                          : 'border-white/15 bg-white/5 hover:border-white/40 hover:bg-white/15'
                      }`}
                    >
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white">
                        <BadgeCheck className="h-4 w-4" />
                      </span>
                      <span className="ml-3 text-white/90">{item}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[280px] overflow-hidden rounded-3xl border border-white/20 bg-white/15 shadow-xl backdrop-blur-sm md:min-h-[360px]">
                <Image
                  src={sectionImages.welcome}
                  alt="Welcome"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      <div className="container-abc space-y-14 lg:space-y-24 py-14">
        {/* <RevealSection className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:p-10">
          <SectionHeader icon={<Info className="h-6 w-6" />} title={t.landing.whoTitle} />
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <p className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 leading-relaxed text-slate-600">
              {t.landing.whoText}
            </p>
            <div className="relative h-80 overflow-hidden rounded-2xl">
              <Image
                src={sectionImages.who}
                alt="ABC community"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </RevealSection> */}

        <RevealSection className="rounded-3xl border border-brand-blue/20 bg-brand-light p-6 shadow-lg shadow-brand-blue/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:p-10">
          <SectionHeader icon={<Target className="h-6 w-6" />} title={t.landing.missionTitle} />
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="relative h-80 overflow-hidden rounded-2xl">
              <Image
                src={sectionImages.mission}
                alt="ABC mission"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <p className="rounded-2xl h-max border border-brand-blue/15 bg-white/90 p-6 leading-relaxed text-slate-700">
              {t.landing.missionText}
            </p>
          </div>
        </RevealSection>

        <RevealSection className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6 shadow-xl shadow-indigo-100/50 lg:p-10">
          <SectionHeader icon={<Link className="h-6 w-6" />} title={t.landing.whyTitle} />
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-3">
              {t.landing.whyItems.map((item, index) => (
                <article
                  key={item}
                  className="rounded-2xl border border-indigo-100 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:p-5"
                >
                  <div className="flex gap-3">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                      <CheckCheck className="h-4 w-4" />
                    </span>
                    <p className="leading-relaxed text-slate-700">{item}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm md:p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-indigo-700">{t.landing.whyFocusTitle}</p>
              <div className="mt-4 space-y-3">
                {t.landing.whyFocusItems?.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-indigo-50/60 px-3 py-3">
                    <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-bold text-white">
                      ✓
                    </span>
                    <p className="text-sm leading-relaxed text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
              <a
                href="mailto:info@abc1111.am"
                className="mt-6 inline-flex rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                {t.common.connectNow}
              </a>
              <div className="mt-10 overflow-hidden rounded-xl border border-indigo-100 bg-indigo-50/50 p-2">
                <Image
                  src={sectionImages.connect}
                  alt="Connect"
                  width={800}
                  height={400}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:p-10">
          <SectionHeader icon={<HeartHandshake className="h-6 w-6" />} title={t.landing.partnersTitle} />
          <div className="relative mt-2 min-h-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 md:h-[280px] lg:h-[640px]">
            <Image
              src={sectionImages.partners}
              alt={t.landing.partnersTitle}
              fill
              className="object-fill p-4 md:p-6"
            />
          </div>
        </RevealSection>
      </div>
    </main>
  );
}
