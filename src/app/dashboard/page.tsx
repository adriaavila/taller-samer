"use client";

import { useTaller } from "@/components/taller-provider";
import { Truck, Clock, Gauge, AlertCircle, TrendingUp, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { equipment, timeLogs } = useTaller();

  // Stats calculation
  const totalHours = equipment.reduce((acc, curr) => acc + curr.hours, 0);
  const totalEquipment = equipment.length;
  const inMaintenance = equipment.filter(e => e.status === "En mantenimiento").length;
  const outOfService = equipment.filter(e => e.status === "Fuera de servicio").length;
  
  // Hours logged in the last 7 days (mock calculation for visual)
  const recentLogsCount = timeLogs.length;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <main className="flex flex-col gap-10">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white">
              <TrendingUp className="h-3 w-3" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              Panel General
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Dashboard Operativo
          </h1>
          <p className="max-w-2xl text-lg text-zinc-500">
            Resumen visual del estado de la flota y actividad del taller.
          </p>
        </header>

        {/* Stats Grid */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex flex-col gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-500">Total Equipos</p>
                <p className="text-3xl font-bold text-zinc-900">{totalEquipment}</p>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-zinc-50 opacity-50" />
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex flex-col gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900">
                <Gauge className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-500">Horas Totales</p>
                <p className="text-3xl font-bold text-zinc-900">{totalHours.toLocaleString()}h</p>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-zinc-50 opacity-50" />
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex flex-col gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-500">Mantenimiento</p>
                <p className="text-3xl font-bold text-amber-600">{inMaintenance}</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex flex-col gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-500">Registros (Mes)</p>
                <p className="text-3xl font-bold text-zinc-900">{recentLogsCount}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Charts & Details */}
        <section className="grid gap-8 lg:grid-cols-2">
          {/* Status Breakdown */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-zinc-900 mb-6">Estado de la Flota</h2>
            <div className="flex flex-col gap-6">
              {[
                { label: "Operativos", count: totalEquipment - inMaintenance - outOfService, color: "bg-emerald-500", total: totalEquipment },
                { label: "En Mantenimiento", count: inMaintenance, color: "bg-amber-500", total: totalEquipment },
                { label: "Fuera de Servicio", count: outOfService, color: "bg-red-500", total: totalEquipment },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-zinc-600">{item.label}</span>
                    <span className="text-zinc-900">{item.count}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-100">
                    <div 
                      className={cn("h-full rounded-full transition-all duration-500", item.color)} 
                      style={{ width: `${(item.count / item.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-zinc-900 mb-6">Actividad Reciente</h2>
            <div className="flex flex-col gap-4">
              {timeLogs.slice(0, 4).map((log, i) => {
                const eq = equipment.find(e => e.id === log.equipmentId);
                return (
                  <div key={log.id} className="flex items-center gap-4 rounded-2xl border border-zinc-50 bg-zinc-50/50 p-4 transition hover:bg-zinc-50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Calendar className="h-5 w-5 text-zinc-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-zinc-900">{eq?.name || "Equipo Eliminado"}</p>
                      <p className="truncate text-xs text-zinc-500">{log.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-zinc-900">+{log.hours}h</p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase">{log.date}</p>
                    </div>
                  </div>
                );
              })}
              {timeLogs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Clock className="h-12 w-12 text-zinc-200 mb-4" />
                  <p className="text-sm font-medium text-zinc-500">No hay registros recientes.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
