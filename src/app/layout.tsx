import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Navbar } from "@/components/navbar";
import { TallerProvider } from "@/components/taller-provider";

export const metadata: Metadata = {
  title: "Taller Samer - Gestión de Taller",
  description: "Sistema operativo para jornadas, órdenes de trabajo, equipos y control interno del taller.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full scroll-smooth">
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <TallerProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <Navbar />
            <main className="flex-1 pb-20 sm:pb-0">
              {children}
            </main>
          </div>
        </TallerProvider>
      </body>
    </html>
  );
}
