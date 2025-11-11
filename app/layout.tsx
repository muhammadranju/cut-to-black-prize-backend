import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import type { Metadata } from "next";
import type React from "react";
import { Toaster } from "sonner";
import "./globals.css";
import ScrollToTop from "@/components/scroll-to-top";

export const metadata: Metadata = {
  title: "Cut to Black Prize - Screenwriting Competition",
  description:
    "An exclusive screenwriting competition for emerging screenwriters",
  generator: "Cut to Black Prize",
  themeColor: "#eab308",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster richColors />
        <ScrollToTop />
      </body>
    </html>
  );
}
