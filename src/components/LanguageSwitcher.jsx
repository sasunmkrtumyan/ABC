"use client";

import { useEffect, useState } from "react";
import { LANGUAGES } from "../lib/i18n/messages";
import { useLanguage } from "../lib/i18n/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="relative min-w-36">
        <select
          disabled
          className="w-max appearance-none rounded-xl border border-slate-300 bg-white p-2 px-4 text-sm font-semibold text-slate-700 shadow-sm outline-none"
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
        className="w-max appearance-none rounded-xl border border-slate-300 bg-white p-2 px-4  text-sm font-semibold text-slate-700 shadow-sm outline-none transition focus:border-blue-500"
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
