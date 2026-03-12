'use client';

import { HeartHandshake, Info, MessageCircleQuestion, Target } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../lib/i18n/LanguageContext';
import RevealSection from './RevealSection';

const partnerLogos = [
  'Grand Candy',
  'Ararat Foods',
  'Yerevan Trade',
  'Noyan Tech',
  'Artsakh Agro',
  'Hayk Logistics',
  'Anahit Group',
];
const partnerTicker = [...partnerLogos, ...partnerLogos];

const sectionImages = {
  who: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
  mission: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  why: 'https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1200&q=80',
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

  return (
    <main>
      <section
        className="bg-gradient-to-b from-[#D90012] via-[#0033A0] to-[#F2A800] py-24 text-white relative overflow-hidden"
      >
        <div className="container-abc">
          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl motion-safe:animate-fade-up">
            {t.landing.heroTitle}
          </h1>
          <p className="mt-4 text-lg font-semibold text-orange-200">{t.common.slogan}</p>
          <p className="mt-6 max-w-2xl text-base text-blue-100 md:text-xl">{t.landing.heroSubtitle}</p>
          <a
            href="mailto:abc1111@gmail.com"
            className="mt-8 rounded-xl border-white/70 bg-white px-6 py-3 font-semibold shadow-glow inline-flex border text-[#0B3D91] transition hover:scale-[1.02]"
          >
            {t.common.connectNow}
          </a>
        </div>
      </section>

      <div className="container-abc space-y-14 lg:space-y-24 py-14">
        <RevealSection className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:p-10">
          <SectionHeader icon={<Info className="h-6 w-6" />} title={t.landing.whoTitle} />
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <p className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 leading-relaxed text-slate-600">
              {t.landing.whoText}
            </p>
            <div className="relative h-60 overflow-hidden rounded-2xl">
              <Image
                src={sectionImages.who}
                alt="ABC community"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </RevealSection>

        <RevealSection className="rounded-3xl border border-brand-blue/20 bg-brand-light p-6 shadow-lg shadow-brand-blue/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:p-10">
          <SectionHeader icon={<Target className="h-6 w-6" />} title={t.landing.missionTitle} />
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="relative h-60 overflow-hidden rounded-2xl">
              <Image
                src={sectionImages.mission}
                alt="ABC mission"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <p className="rounded-2xl border border-brand-blue/15 bg-white/90 p-6 leading-relaxed text-slate-700">
              {t.landing.missionText}
            </p>
          </div>
        </RevealSection>

        <RevealSection className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-xl shadow-slate-200/60 lg:p-10">
          <SectionHeader icon={<MessageCircleQuestion className="h-6 w-6" />} title={t.landing.whyTitle} />
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <ul className="space-y-4">
              {t.landing.whyItems.map((item) => (
                <li
                  key={item}
                  className="group flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white/80 px-5 py-4 text-slate-700 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-lg"
                >
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                    ✓
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="relative h-72 overflow-hidden rounded-3xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-transparent to-transparent"></div>
              <Image
                src={sectionImages.why}
                alt="Business connection"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </RevealSection>

        <RevealSection className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:p-10">
          <SectionHeader icon={<HeartHandshake className="h-6 w-6" />} title={t.landing.partnersTitle} />
          <div className="marquee-shell mt-2">
            <div className="marquee-track">
              {partnerTicker.map((logo, index) => (
                <div
                  key={`${logo}-${index}`}
                  className="flex h-20 min-w-[220px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 font-semibold text-slate-600 transition duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:bg-white hover:text-brand-blue hover:shadow-md"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>
    </main>
  );
}
