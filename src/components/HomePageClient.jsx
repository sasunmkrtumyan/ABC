"use client";

import Image from "next/image";
import RevealSection from "./RevealSection";
import { useLanguage } from "../lib/i18n/LanguageContext";
import { useRef, useState } from "react";
import TestimonialCard from "./TestimonialCard";

const testimonials = {
  am: [
    {
      name: "Արման Մ.",
      position: "Գլխավոր տնօրեն",
      company: "Grand Candy",
      text: "ABC-ի շնորհիվ գտանք վստահելի գործընկերներ Մոսկվայում և Փարիզում։",
    },
    {
      name: "Սոնա Գ.",
      position: "Բիզնես զարգացման ղեկավար",
      company: "Ararat Foods",
      text: "Այս համայնքը արագացրեց մեր բիզնես կապերը և միջազգային տեսանելիությունը։",
    },
    {
      name: "Դավիթ Հ.",
      position: "Արտահանման մենեջեր",
      company: "EcoFarm Armenia",
      text: "ABC հարթակը մեզ օգնեց նոր շուկաներ մտնել և վստահելի համագործակցություններ կառուցել։",
    },
  ],
  ru: [
    {
      name: "Арман М.",
      position: "Генеральный директор",
      company: "Grand Candy",
      text: "Через ABC мы нашли надежных партнеров в Москве и Париже.",
    },
    {
      name: "Сона Г.",
      position: "Руководитель развития бизнеса",
      company: "Ararat Foods",
      text: "Сообщество заметно ускорило наши деловые связи.",
    },
    {
      name: "Давид А.",
      position: "Менеджер по экспорту",
      company: "EcoFarm Armenia",
      text: "Платформа ABC помогла нам выйти на новые рынки и выстроить надежные партнерства.",
    },
  ],
  en: [
    {
      name: "Arman M.",
      position: "Chief Executive Officer",
      company: "Grand Candy",
      text: "Through ABC we found trusted partners in multiple markets.",
    },
    {
      name: "Sona G.",
      position: "Head of Business Development",
      company: "Ararat Foods",
      text: "The community helped us grow our business network faster.",
    },
    {
      name: "David A.",
      position: "Export Manager",
      company: "EcoFarm Armenia",
      text: "ABC helped us enter new markets and build strong international partnerships.",
    },
  ],
};


const partnerLogos = [
  "Grand Candy",
  "Ararat Foods",
  "Yerevan Trade",
  "Noyan Tech",
  "Artsakh Agro",
  "Hayk Logistics",
  "Anahit Group",
];
const partnerTicker = [...partnerLogos, ...partnerLogos];

const sectionImages = {
  who: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
  mission:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  why: "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1200&q=80",
  testimonials:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
};

function SectionHeader({ icon, title, badge }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-brand-blue text-xl text-white">
        {icon}
      </span>
      <div>
        {badge ? <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue/80">{badge}</p> : null}
        <h2 className=" text-xl lg:text-3xl font-black text-brand-dark">{title}</h2>
      </div>
    </div>
  );
}

export default function HomePageClient() {

  const scrollRef = useRef(null);
const [activeIndex, setActiveIndex] = useState(0);

const scrollToIndex = (index) => {
  const container = scrollRef.current;
  if (!container) return;

  const card = container.children[index];
  container.scrollTo({
    left: card.offsetLeft - 16,
    behavior: "smooth",
  });

  setActiveIndex(index);
};

  const { t, language } = useLanguage();

  return (
    <main>
      <section className="relative overflow-hidden bg-hero-gradient py-24 text-white">
        <div className="container-abc">
          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl motion-safe:animate-fade-up">
            {t.landing.heroTitle}
          </h1>
          <p className="mt-4 text-lg font-semibold text-orange-200">{t.common.slogan}</p>
          <p className="mt-6 max-w-2xl text-base text-blue-100 md:text-xl">{t.landing.heroSubtitle}</p>
          <a
            href="mailto:abc1111@gmail.com"
            className="mt-8 inline-flex rounded-xl border border-white/70 bg-white px-6 py-3 font-semibold text-[#0B3D91] shadow-glow transition hover:scale-[1.02]"
          >
            {t.common.connectNow}
          </a>
        </div>
      </section>

      <div className="container-abc space-y-14 lg:space-y-24  py-14">
        <RevealSection className="grid gap-6 rounded-2xl bg-white p-8 shadow-sm md:grid-cols-2 md:items-center">
          <div>
            <SectionHeader icon="👥" title={t.landing.whoTitle}  />
            <p className="text-slate-600">{t.landing.whoText}</p>
          </div>
          <div className="relative h-56 overflow-hidden rounded-2xl">
            <Image src={sectionImages.who} alt="ABC community" fill className="object-cover" />
          </div>
        </RevealSection>

        <RevealSection className="grid gap-6 rounded-2xl border border-brand-blue/20 bg-brand-light p-8 md:grid-cols-2 md:items-center">
          <div className="order-2 md:order-1">
            <div className="relative h-56 overflow-hidden rounded-2xl">
              <Image src={sectionImages.mission} alt="ABC mission" fill className="object-cover" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <SectionHeader icon="🎯" title={t.landing.missionTitle}  />
            <p className="text-slate-700">{t.landing.missionText}</p>
          </div>
        </RevealSection>

       <RevealSection className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-slate-50 p-4 lg:p-10 shadow-xl shadow-slate-200/60 md:grid md:grid-cols-2 md:gap-12">
  
  <div className="relative z-10">
    <SectionHeader icon="⭐" title={t.landing.whyTitle} />

    <ul className="mt-6 space-y-4">
      {t.landing.whyItems.map((item) => (
        <li
          key={item}
          className="group flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white/70 px-5 py-4 text-slate-700 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-lg"
        >
          <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
            ✓
          </span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>

  <div className="relative mt-10 h-72 overflow-hidden rounded-3xl shadow-2xl md:mt-0">
    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-transparent to-transparent"></div>
    <Image
      src={sectionImages.why}
      alt="Business connection"
      fill
      className="object-cover transition-transform duration-700 hover:scale-105"
    />
  </div>
</RevealSection>


  <RevealSection className="rounded-3xl bg-gradient-to-br from-brand-light to-white p-10 shadow-sm">
    <SectionHeader icon="💬" title={t.landing.testimonialsTitle} />

    <div className="relative mt-10">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
      >
        {testimonials[language].map((item, index) => (
          <TestimonialCard
            key={item.name}
            item={item}
            active={index === activeIndex}
          />
        ))}
      </div>

    </div>
</RevealSection>

        <RevealSection className="rounded-2xl bg-white p-8 shadow-sm">
          <SectionHeader icon="🤝" title={t.landing.partnersTitle}  />
          <div className="marquee-shell mt-6">
            <div className="marquee-track">
              {partnerTicker.map((logo, index) => (
                <div
                  key={`${logo}-${index}`}
                  className="flex h-20 min-w-[220px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 font-semibold text-slate-600"
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
