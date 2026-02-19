"use client";

import RevealSection from "../../components/RevealSection";
import { useLanguage } from "../../lib/i18n/LanguageContext";

const contactMock = {
  office: "8 Tumanyan Street, Yerevan, Armenia",
  phone: "+374 10 555500, +374 91 222233",
  email: "abc1111@gmail.com",
  hours: "Mon - Fri, 10:00 - 19:00",
};

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <main className="container-abc py-12">
      <RevealSection className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-black text-brand.dark">{t.contact.title}</h1>
        <p className="mt-3 text-slate-600">{t.contact.subtitle}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.contact.office}</p>
            <p className="mt-2 text-slate-700">{contactMock.office}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.contact.phone}</p>
            <p className="mt-2 text-slate-700">{contactMock.phone}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.contact.email}</p>
            <p className="mt-2 text-slate-700">{contactMock.email}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.contact.hours}</p>
            <p className="mt-2 text-slate-700">{contactMock.hours}</p>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
