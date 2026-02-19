"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { LanguageProvider } from "../lib/i18n/LanguageContext";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <LanguageProvider>
      <NavBar />
      {children}
      <Footer />
    </LanguageProvider>
  );
}
