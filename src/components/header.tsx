"use client";

import { Wrench, User, Bell } from "lucide-react";
import Link from "next/link";

export function Header() {
    return (
        <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-80">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 shadow-sm shadow-zinc-200">
                        <Wrench className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-zinc-900">
                        TALLER SAMER
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    <button className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900">
                        <Bell className="h-5 w-5" />
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 transition hover:bg-zinc-200">
                        <User className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}
