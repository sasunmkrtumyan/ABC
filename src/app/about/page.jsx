'use client';

import { Building2, CheckCircle2, Globe2, ShieldCheck } from 'lucide-react';
import RevealSection from '../../components/RevealSection';
import { useLanguage } from '../../lib/i18n/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="container-abc py-10 md:py-14">
      <RevealSection className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-sm">
        <div className="grid gap-8 p-7 md:grid-cols-[1.2fr_0.8fr] md:p-10">
          <div>
            <h1 className="mt-4 text-3xl font-black leading-tight text-brand.dark md:text-5xl">{t.about.title}</h1>
            <p className="mt-5 text-base leading-relaxed text-slate-700 md:text-lg">{t.about.intro}</p>
          </div>
          <div className="grid gap-3 self-start rounded-2xl border border-slate-200 bg-white/80 p-4 backdrop-blur-sm md:p-5">
            <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
              <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
              <p className="text-sm text-slate-700">{t.about.highlights?.[0]}</p>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
              <p className="text-sm text-slate-700">{t.about.highlights?.[1]}</p>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" />
              <p className="text-sm text-slate-700">{t.about.highlights?.[2]}</p>
            </div>
          </div>
        </div>
      </RevealSection>

      <div className="mt-8 grid gap-4 md:mt-10 md:gap-5">
        {t.about.blocks.map((block, index) => (
          <RevealSection
            key={`${index}-${block.slice(0, 20)}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:p-6"
          >
            <div className="flex gap-4">
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                {index + 1}
              </span>
              <p className="leading-relaxed text-slate-700">{block}</p>
            </div>
          </RevealSection>
        ))}
      </div>
    </main>
  );
}
