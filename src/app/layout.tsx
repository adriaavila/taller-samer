import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Taller app - Gestión de Taller",
  description: "Sistema integral para la gestión de mantenimiento y reparaciones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full scroll-smooth">
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
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
