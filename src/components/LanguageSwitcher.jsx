"use client";

import { LANGUAGES } from "../lib/i18n/messages";
import { useLanguage } from "../lib/i18n/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const selected = LANGUAGES.find((item) => item.code === language);

  return (
    <div className="relative min-w-36">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">Language</p>
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-8 text-sm font-semibold text-slate-700 shadow-sm outline-none transition focus:border-brand.blue"
        aria-label="Language selector"
      >
        {LANGUAGES.map((item) => (
          <option key={item.code} value={item.code}>
            {`${item.flag} - ${item.label}`}
          </option>
        ))}
      </select>
    </div>
  );
}
