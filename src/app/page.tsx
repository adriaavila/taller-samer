"use client";

import Link from "next/link";
import {
  Clock3,
  Wrench,
  History,
  Activity,
} from "lucide-react";
import { useTaller } from "@/components/taller-provider";
import { equipmentStatusStyles, formatDate } from "@/lib/taller";
import { cn } from "@/lib/utils";

export default function Home() {
  const { equipment, timeLogs } = useTaller();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <main className="flex flex-col gap-10">
        <section className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-premium p-8 sm:p-12">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                Gestión Simplificada
              </span>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
                Registro de Horas Taller Samer
              </h1>
              <p className="max-w-2xl text-base text-zinc-500 sm:text-lg">
                Registra las horas de trabajo directamente sobre cada equipo de forma rápida y sencilla.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/log-hours"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-zinc-200 transition hover:bg-zinc-800"
              >
                <Clock3 className="h-4 w-4" />
                Registrar Horas
              </Link>
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Equipment List */}
          <section className="flex flex-col gap-5">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-zinc-400" />
                Estado de Equipos
              </h2>
            </div>
            <div className="grid gap-4">
              {equipment.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-zinc-900">{item.name}</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">{item.type} · {item.id}</p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
                        equipmentStatusStyles[item.status]
                      )}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-400">Total Horas</p>
                      <p className="text-lg font-bold text-zinc-900">{item.hours}h</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-400">Próximo Manto.</p>
                      <p className="text-sm font-semibold text-zinc-600">{item.nextServiceHours}h</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Logs */}
          <section className="flex flex-col gap-5">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                <History className="h-5 w-5 text-zinc-400" />
                Últimos Registros
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {timeLogs.length > 0 ? (
                timeLogs.slice(0, 5).map((log) => {
                  const eq = equipment.find(e => e.id === log.equipmentId);
                  return (
                    <div
                      key={log.id}
                      className="rounded-3xl border border-zinc-100 bg-zinc-50/50 p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs font-bold text-zinc-400">{formatDate(log.date)}</span>
                          <div className="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-2 py-1">
                            <Clock3 className="h-3 w-3 text-zinc-500" />
                            <span className="text-[10px] font-bold text-zinc-900">
                              {log.startTime} - {log.endTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-zinc-900 truncate">{eq?.name || "Equipo Desconocido"}</p>
                          <p className="mt-1 text-xs text-zinc-500 line-clamp-1">{log.description}</p>
                        </div>
                        <span className="shrink-0 text-sm font-bold text-zinc-900">+{log.hours.toFixed(1)}h</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center">
                  <Activity className="h-8 w-8 text-zinc-300" />
                  <p className="text-sm text-zinc-500">No hay registros de horas todavía.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
