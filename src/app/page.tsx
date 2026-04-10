"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  CalendarCheck,
  ClipboardList,
  Clock3,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { HOURS_BY_TEAM, OPERATION_ALERTS } from "@/lib/constants";
import { formatDate, workerStatusStyles } from "@/lib/taller";
import { cn } from "@/lib/utils";
import { useTaller } from "@/components/taller-provider";

const recordedHours = HOURS_BY_TEAM.reduce((total, team) => total + team.hours, 0);

export default function Home() {
  const { equipment, workers, workOrders } = useTaller();
  const openOrders = workOrders.filter((workOrder) => workOrder.status !== "Completada");
  const availableWorkers = workers.filter((worker) => worker.status === "Disponible");
  const operationalEquipment = equipment.filter(
    (equipmentItem) => equipmentItem.status === "Operativo",
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <main className="flex flex-col gap-10">
        <section className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-premium">
          <div className="grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                  Inicio operativo
                </span>
                <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
                  Taller Samer listo para abrir turno con contexto real.
                </h1>
                <p className="max-w-2xl text-base text-zinc-500 sm:text-lg">
                  Revisa el estado del taller, prioriza las OTs críticas y detecta en segundos qué equipo, operario o bahía requiere atención.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/log-hours"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-200 transition hover:bg-zinc-800"
                >
                  <Clock3 className="h-4 w-4" />
                  Registrar jornada
                </Link>
                <Link
                  href="/work-orders"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
                >
                  <ClipboardList className="h-4 w-4" />
                  Gestionar OTs
                </Link>
                <Link
                  href="/equipment"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
                >
                  <Wrench className="h-4 w-4" />
                  Ver equipos
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Horas registradas
                  </p>
                  <p className="mt-2 text-3xl font-bold text-zinc-900">
                    {recordedHours}h
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">Semana en curso</p>
                </div>
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    OTs activas
                  </p>
                  <p className="mt-2 text-3xl font-bold text-zinc-900">
                    {openOrders.length}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">Incluye bloqueadas</p>
                </div>
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Equipos operativos
                  </p>
                  <p className="mt-2 text-3xl font-bold text-zinc-900">
                    {operationalEquipment.length}/{equipment.length}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">Listos para despacho</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-zinc-200 bg-zinc-50 p-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                <AlertTriangle className="h-4 w-4" />
                Prioridad del turno
              </div>
              <div className="mt-4 rounded-3xl border border-red-200 bg-red-50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">
                  {OPERATION_ALERTS[0]?.level}
                </p>
                <h2 className="mt-3 text-2xl font-bold text-zinc-900">
                  {OPERATION_ALERTS[0]?.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {OPERATION_ALERTS[0]?.detail}
                </p>
              </div>

              <div className="mt-5 space-y-3">
                {OPERATION_ALERTS.slice(1).map((alert) => (
                  <div
                    key={alert.id}
                    className="rounded-2xl border border-zinc-200 bg-white px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-zinc-900">
                      {alert.title}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">{alert.detail}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/dashboard"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-zinc-600 transition hover:text-zinc-900"
              >
                Abrir panel completo
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <DashboardCharts />
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr_0.95fr]">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                <CalendarCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900">Agenda inmediata</p>
                <p className="text-xs text-zinc-500">Próximas OTs y fechas clave</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {openOrders.slice(0, 3).map((workOrder) => (
                <div
                  key={workOrder.id}
                  className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-zinc-900">
                      {workOrder.title}
                    </p>
                    <span className="text-xs font-semibold text-zinc-500">
                      {formatDate(workOrder.scheduledDate)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">{workOrder.id}</p>
                </div>
              ))}
              {openOrders.length === 0 && (
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-sm text-zinc-500">
                  No quedan OTs abiertas.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900">Operarios disponibles</p>
                <p className="text-xs text-zinc-500">
                  {availableWorkers.length} listos para reasignar
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {availableWorkers.map((worker) => (
                <div
                  key={worker.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{worker.name}</p>
                    <p className="text-xs text-zinc-500">{worker.specialty}</p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
                      workerStatusStyles[worker.status],
                    )}
                  >
                    {worker.status}
                  </span>
                </div>
              ))}
              {availableWorkers.length === 0 && (
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-sm text-zinc-500">
                  No hay operarios disponibles por ahora.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900">Checklist del día</p>
                <p className="text-xs text-zinc-500">Cierre rápido de apertura</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm text-zinc-600">
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                Apertura de bahías y herramientas críticas confirmada.
              </div>
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                Alertas de mantenimiento priorizadas antes de despacho.
              </div>
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                Cuadrilla con foco en hidráulica, soldadura y preventivos.
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
