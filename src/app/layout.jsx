import "./globals.css";
import AppShell from "../components/AppShell";

export const metadata = {
  title: "ABC - Armenian Business Club",
  description: "Building Bridges, Creating Opportunities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
