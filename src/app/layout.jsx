import AppShell from '../components/AppShell';
import './globals.css';

export const metadata = {
  title: 'ABC - Armenian Business Club',
  description: 'Building Bridges, Creating Opportunities.',
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
