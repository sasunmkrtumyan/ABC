'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../lib/i18n/LanguageContext';
import { LANGUAGES } from '../lib/i18n/messages';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-w-36 relative">
        <select
          disabled
          className="rounded-xl border-slate-300 bg-white p-2 px-4 text-sm font-semibold text-slate-700 shadow-sm w-max appearance-none border outline-none"
          aria-label="Language selector"
        >
          <option>Հայերեն</option>
        </select>
      </div>
    );
  }

  return (
    <div className="relative">
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        className="rounded-xl border-slate-300 bg-white p-2 px-4 text-sm font-semibold text-slate-700 shadow-sm focus:border-blue-500 w-max appearance-none border transition outline-none"
        aria-label="Language selector"
      >
        {LANGUAGES.map((item) => (
          <option key={item.code} value={item.code}>
            {`${item.flag} ${item.label}`}
          </option>
        ))}
      </select>
    </div>
  );
}
