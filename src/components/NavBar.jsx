'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '../lib/i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function NavBar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/partners', label: t.nav.partners },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <header className="top-0 border-slate-200 bg-white/90 backdrop-blur-md sticky z-50 border-b">
      <nav className="container-abc py-4 flex items-center justify-between">
        <Link href="/" className="gap-3 flex items-center">
          <img src="/img/logo.png" alt="ABC Logo" className="h-14 w-max object-contain" />
        </Link>

        {/* Desktop links */}
        <div className="gap-6 md:flex hidden items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-700 hover:text-blue-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        {/* Mobile right side */}
        <div className="gap-4 md:hidden flex items-center">
          <LanguageSwitcher />

          {/* Burger button */}
          <button
            onClick={() => setOpen(!open)}
            className="h-10 w-10 gap-1.5 relative flex flex-col items-center justify-center"
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 w-6 bg-slate-800 transition-all duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span className={`h-0.5 w-6 bg-slate-800 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span
              className={`h-0.5 w-6 bg-slate-800 transition-all duration-300 ${
                open ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-abc border-slate-200 pt-6 space-y-4 gap-4 pb-6 flex flex-col items-center justify-center border-t">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-semibold text-slate-700 hover:text-blue-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
