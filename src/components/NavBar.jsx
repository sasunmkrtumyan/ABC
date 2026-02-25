"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../lib/i18n/LanguageContext";

export default function NavBar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/partners", label: t.nav.partners },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <nav className="container-abc flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-lg font-black text-white">
            A
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-500">
              ABC
            </p>
            <p className="text-xs text-slate-500">
              Armenian Business Club
            </p>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-700 transition-colors hover:text-blue-500"
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        {/* Mobile right side */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />

          {/* Burger button */}
          <button
            onClick={() => setOpen(!open)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 w-6 bg-slate-800 transition-all duration-300 ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-slate-800 transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-slate-800 transition-all duration-300 ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-abc justify-center border-t border-slate-200 pt-6 items-center space-y-4 flex flex-col gap-4 pb-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-semibold text-slate-700 transition-colors hover:text-blue-500"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
