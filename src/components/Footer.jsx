"use client";

import { useLanguage } from "../lib/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="container-abc flex flex-col gap-2 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <p>{t.footer.text}</p>
        <a href="mailto:abc1111@gmail.com" className="font-semibold text-brand.blue">
          abc1111@gmail.com
        </a>
      </div>
    </footer>
  );
}
