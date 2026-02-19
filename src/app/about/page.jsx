"use client";

import RevealSection from "../../components/RevealSection";
import { useLanguage } from "../../lib/i18n/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="container-abc py-12">
      <RevealSection className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-black text-brand.dark">{t.about.title}</h1>
        <p className="mt-4 text-slate-600">{t.about.intro}</p>
      </RevealSection>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {t.about.blocks.map((block) => (
          <RevealSection key={block} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-slate-700">{block}</p>
          </RevealSection>
        ))}
      </div>
    </main>
  );
}
