'use client';

import RevealSection from '../../components/RevealSection';
import { useLanguage } from '../../lib/i18n/LanguageContext';

const contactMock = {
  office: '48/1 Nalbandyan St, Yerevan, Armenia',
  phone: `+374 77333297`,
  email: 'info@abc1111.am',
  hours: 'Mon - Fri, 10:00 - 19:00',
};

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <main className="container-abc py-12 space-y-8">
      <RevealSection className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-black text-brand.dark">{t.contact.title}</h1>
        <p className="mt-3 text-slate-600">{t.contact.subtitle}</p>

        <div className="mt-8 gap-4 md:grid-cols-2 grid">
          <div className="rounded-xl border-slate-200 p-5 border">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">{t.contact.office}</p>
            <p className="mt-2 text-slate-700">{contactMock.office}</p>
          </div>
          <div className="rounded-xl border-slate-200 p-5 border">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">{t.contact.phone}</p>
            <p className="mt-2 text-slate-700">{contactMock.phone}</p>
          </div>
          <div className="rounded-xl border-slate-200 p-5 border">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">{t.contact.email}</p>
            <p className="mt-2 text-slate-700">{contactMock.email}</p>
          </div>
          <div className="rounded-xl border-slate-200 p-5 border">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">{t.contact.hours}</p>
            <p className="mt-2 text-slate-700">{contactMock.hours}</p>
          </div>
        </div>
      </RevealSection>

      {/* Google Map Embed */}
      <div className="rounded-2xl shadow-sm h-[450px] w-full overflow-hidden">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.3435005489227!2d44.514504476786655!3d40.17916837147885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abcfa94b65b8f%3A0x69fb75bd975b7c20!2s48%2F1%20Nalbandyan%20St%2C%20Yerevan%200010!5e0!3m2!1sen!2sam!4v1773657230092!5m2!1sen!2sam" width="600" height="450" style={{width: '100%', height: '70%'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </main>
  );
}
