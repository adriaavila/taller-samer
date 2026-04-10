"use client";

import { useState } from "react";
import { User, Bell, Check, Users, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { WORKERS_LIST } from "@/lib/constants";

export function Header() {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isListManagerOpen, setIsListManagerOpen] = useState(false);

    const availableWorkers = WORKERS_LIST.map(w => w.name);
    const currentWorker = availableWorkers[0] || "Trabajador";
    const currentWorkerRecord = WORKERS_LIST[0];

    return (
        <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-80 group">
                    <Logo className="h-10 w-10 transition-transform group-hover:scale-105" />
                    <span className="text-xl font-bold tracking-tight text-zinc-900">Taller app</span>
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
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsUserMenuOpen(false);
                                                setIsListManagerOpen(true);
                                            }}
                                            className="flex w-full items-center gap-2 text-xs font-semibold text-zinc-500 transition hover:text-zinc-900"
                                        >
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

            {isListManagerOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
                    <button
                        type="button"
                        aria-label="Cerrar administrador de personal"
                        className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
                        onClick={() => setIsListManagerOpen(false)}
                    />
                    <section className="relative z-10 w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-200/60">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                                    Personal
                                </p>
                                <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">
                                    Lista activa
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsListManagerOpen(false)}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <p className="mt-3 text-sm text-zinc-500">
                            Solo hay un miembro activo en la lista de personal.
                        </p>

                        <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-base font-semibold text-zinc-900">
                                        {currentWorker}
                                    </p>
                                    <p className="text-sm text-zinc-500">
                                        {currentWorkerRecord?.role}
                                    </p>
                                </div>
                                <span className="rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-800">
                                    Activo
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setIsListManagerOpen(false)}
                                className="rounded-2xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
                            >
                                Cerrar
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </header>
    );
}
