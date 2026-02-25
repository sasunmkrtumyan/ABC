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
    <main className="container-abc py-12 space-y-8">
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

      {/* Google Map Embed */}
      <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-sm">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d938.2586008299202!2d44.512912410425784!3d40.17767072940077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sam!4v1772012507926!5m2!1sen!2sam"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </main>
  );
}
