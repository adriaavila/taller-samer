"use client";

import { useState } from "react";
import { User, Bell, Check, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { WORKERS_LIST } from "@/lib/constants";

export function Header() {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    // Use actual workers from constants
    const availableWorkers = WORKERS_LIST.map(w => w.name);
    const currentWorker = availableWorkers[0] || "Trabajador";

    return (
        <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-80 group">
                    <Logo className="h-10 w-10 transition-transform group-hover:scale-105" />
                    <span className="text-xl font-bold tracking-tight text-zinc-900">
                        TALLER SAMER
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    <button className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900">
                        <Bell className="h-5 w-5" />
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 transition hover:bg-zinc-200"
                        >
                            <User className="h-5 w-5" />
                        </button>

                        {isUserMenuOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsUserMenuOpen(false)}
                                />
                                <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl shadow-zinc-200/50">
                                    <div className="mb-2 px-3 py-2">
                                        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                                            Gestionar Personal
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        {availableWorkers.map((worker) => (
                                            <button
                                                key={worker}
                                                className={cn(
                                                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition",
                                                    worker === currentWorker
                                                        ? "bg-zinc-900 text-white"
                                                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                                                        worker === currentWorker
                                                            ? "bg-white/20 text-white"
                                                            : "bg-zinc-100 text-zinc-500"
                                                    )}>
                                                        {worker.split(" ").map(n => n[0]).join("")}
                                                    </div>
                                                    <span>{worker}</span>
                                                </div>
                                                {worker === currentWorker && (
                                                    <Check className="h-4 w-4" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-2 border-t border-zinc-100 px-3 py-2">
                                        <button className="flex w-full items-center gap-2 text-xs font-semibold text-zinc-500 transition hover:text-zinc-900">
                                            <Users className="h-4 w-4" />
                                            Administrar lista...
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
