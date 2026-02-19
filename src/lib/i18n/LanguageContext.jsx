"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LANGUAGE, messages } from "./messages";

const LanguageContext = createContext(null);
const STORAGE_KEY = "abc_language";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && messages[stored]) {
      setLanguage(stored);
    }
    setReady(true);
  }, []);

  const changeLanguage = (nextLang) => {
    if (!messages[nextLang]) return;
    setLanguage(nextLang);
    window.localStorage.setItem(STORAGE_KEY, nextLang);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage: changeLanguage,
      t: messages[language],
      ready,
    }),
    [language, ready]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
