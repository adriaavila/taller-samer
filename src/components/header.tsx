"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5 transition hover:opacity-80">
          <Logo className="h-10 w-10 transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-zinc-900">
              Taller Samer
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400">
              Operación diaria
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
