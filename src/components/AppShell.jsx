'use client';

import { usePathname } from 'next/navigation';
import { LanguageProvider } from '../lib/i18n/LanguageContext';
import Footer from './Footer';
import NavBar from './NavBar';

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
