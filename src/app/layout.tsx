import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taller Samer - Gestión de Taller",
  description: "Sistema integral para la gestión de mantenimiento y reparaciones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full font-sans antialiased bg-zinc-50 text-zinc-900`}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <Navbar />
          <main className="flex-1 pb-20 sm:pb-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
