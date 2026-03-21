'use client';

import { useLanguage } from '../lib/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-slate-200 bg-white border-t">
      <div className="container-abc gap-2 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between flex flex-col">
        <p>{t.footer.text}</p>
        <a href="mailto:info@abc1111.am" className="font-semibold text-brand-blue">
          info@abc1111.am
        </a>
      </div>
    </footer>
  );
}
