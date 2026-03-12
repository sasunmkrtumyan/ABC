'use client';

import { BookText, HeartHandshake, Info, MessageCircleQuestion, Target } from 'lucide-react';
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
    <div className="mb-5 gap-3 flex items-center">
      <span className="h-10 min-w-10 bg-brand-blue text-xl text-white inline-flex items-center justify-center rounded-full">
        {icon}
      </span>
      <div>
        {badge ? <p className="text-xs font-bold text-brand-blue/80 tracking-[0.2em] uppercase">{badge}</p> : null}
        <h2 className="text-xl lg:text-3xl font-black text-brand-dark">{title}</h2>
      </div>
    </div>
  );
}

export default function HomePageClient() {
  const { t, language } = useLanguage();

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
        <RevealSection className="gap-6 rounded-2xl bg-white p-8 shadow-sm md:grid-cols-2 md:items-center grid">
          <div>
            <SectionHeader icon={<Info className="h-6 w-6" />} title={t.landing.whoTitle} />
            <p className="text-slate-600">{t.landing.whoText}</p>
          </div>
          <div className="h-56 rounded-2xl relative overflow-hidden">
            <Image src={sectionImages.who} alt="ABC community" fill className="object-cover" />
          </div>
        </RevealSection>

        <RevealSection className="gap-6 rounded-2xl border-brand-blue/20 bg-brand-light p-8 md:grid-cols-2 md:items-center grid border">
          <div className="md:order-1 order-2">
            <div className="h-56 rounded-2xl relative overflow-hidden">
              <Image src={sectionImages.mission} alt="ABC mission" fill className="object-cover" />
            </div>
          </div>
          <div className="md:order-2 order-1">
            <SectionHeader icon={<Target className="h-6 w-6" />} title={t.landing.missionTitle} />
            <p className="text-slate-700">{t.landing.missionText}</p>
          </div>
        </RevealSection>

        <RevealSection className="rounded-3xl from-white to-slate-50 p-4 lg:p-10 shadow-xl shadow-slate-200/60 md:grid md:grid-cols-2 md:gap-12 relative overflow-hidden bg-gradient-to-br">
          <div className="relative z-10">
            <SectionHeader icon={<MessageCircleQuestion className="h-6 w-6" />} title={t.landing.whyTitle} />

            <ul className="mt-6 space-y-4">
              {t.landing.whyItems.map((item) => (
                <li
                  key={item}
                  className="group gap-3 rounded-xl border-slate-200/70 bg-white/70 px-5 py-4 text-slate-700 backdrop-blur hover:-translate-y-1 hover:border-indigo-400 hover:shadow-lg flex items-start border transition-all duration-300"
                >
                  <span className="mt-1 h-6 w-6 bg-indigo-100 text-sm font-semibold text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white inline-flex items-center justify-center rounded-full transition">
                    ✓
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 h-72 rounded-3xl shadow-2xl md:mt-0 relative overflow-hidden">
            <div className="inset-0 from-indigo-600/20 absolute bg-gradient-to-tr via-transparent to-transparent"></div>
            <Image
              src={sectionImages.why}
              alt="Business connection"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </RevealSection>

        <RevealSection className="rounded-2xl bg-white p-8 shadow-sm">
          <SectionHeader icon={<HeartHandshake className="h-6 w-6" />} title={t.landing.partnersTitle} />
          <div className="marquee-shell mt-6">
            <div className="marquee-track">
              {partnerTicker.map((logo, index) => (
                <div
                  key={`${logo}-${index}`}
                  className="h-20 rounded-xl border-slate-200 bg-slate-50 px-4 font-semibold text-slate-600 flex min-w-[220px] items-center justify-center border"
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
