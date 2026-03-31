import AppShell from '../components/AppShell';
import './globals.css';

export const metadata = {
  title: 'Pan-Armenian Business Union',
  description: 'Armenians together, powerful than ever ✊',
  icons: {
    icon: '/img/logo.png',
    shortcut: '/img/logo.png',
    apple: '/img/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
