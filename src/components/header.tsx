"use client";

import { useState } from "react";
import { Bell, Check, ChevronRight, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { OPERATION_ALERTS } from "@/lib/constants";
import { useTaller } from "@/components/taller-provider";

export function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { currentWorker, setCurrentWorkerId, workers } = useTaller();

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

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsNotificationsOpen((open) => !open);
                setIsUserMenuOpen(false);
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-bold text-white">
                {OPERATION_ALERTS.length}
              </span>
            </button>

            {isNotificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsNotificationsOpen(false)}
                />
                <div className="absolute right-0 top-full z-50 mt-2 w-[22rem] rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl shadow-zinc-200/50">
                  <div className="px-3 py-2">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                      Alertas del taller
                    </p>
                  </div>
                  <div className="space-y-2">
                    {OPERATION_ALERTS.map((alert) => (
                      <Link
                        key={alert.id}
                        href={alert.href}
                        onClick={() => setIsNotificationsOpen(false)}
                        className="block rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-3 transition hover:border-zinc-200 hover:bg-white"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-zinc-900">
                            {alert.title}
                          </p>
                          <span className="text-[10px] font-bold uppercase tracking-wide text-zinc-400">
                            {alert.level}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-zinc-500">
                          {alert.detail}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsUserMenuOpen((open) => !open);
                setIsNotificationsOpen(false);
              }}
              className="flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-2 py-1.5 text-zinc-900 transition hover:bg-zinc-50"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold">
                {currentWorker?.name
                  ?.split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2) ?? "NA"}
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-zinc-900">
                  {currentWorker?.name ?? "Sin operario activo"}
                </p>
                <p className="text-[11px] text-zinc-500">
                  {currentWorker?.role ?? "Selecciona un operario"}
                </p>
              </div>
            </button>

            {isUserMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsUserMenuOpen(false)}
                />
                <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl shadow-zinc-200/50">
                  <div className="mb-2 px-3 py-2">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                      Operario activo
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      Cambia rápidamente quién está usando la app.
                    </p>
                  </div>
                  <div className="space-y-1">
                    {workers.map((worker) => (
                      <button
                        key={worker.id}
                        type="button"
                        onClick={() => {
                          setCurrentWorkerId(worker.id);
                          setIsUserMenuOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium transition",
                          worker.id === currentWorker?.id
                            ? "bg-zinc-900 text-white"
                            : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
                        )}
                      >
                        <div>
                          <p>{worker.name}</p>
                          <p
                            className={cn(
                              "text-[11px]",
                              worker.id === currentWorker?.id
                                ? "text-white/70"
                                : "text-zinc-400",
                            )}
                          >
                            {worker.role}
                          </p>
                        </div>
                        {worker.id === currentWorker?.id && <Check className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 border-t border-zinc-100 pt-2">
                    <Link
                      href="/workers"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Administrar operarios
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
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
