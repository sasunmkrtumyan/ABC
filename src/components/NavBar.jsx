"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../lib/i18n/LanguageContext";

export default function NavBar() {
  const { t } = useLanguage();

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
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand.blue text-lg font-black text-white">
            A
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand.blue">ABC</p>
            <p className="text-xs text-slate-500">Armenian Business Club</p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-slate-700 hover:text-brand.blue">
              {link.label}
            </Link>
          ))}
        </div>

        <LanguageSwitcher />
      </nav>
    </header>
  );
}
