"use client";

import Link from "next/link";
import { ACTIVITY_FEED, HOURS_BY_TEAM } from "@/lib/constants";
import { ArrowUpRight, ChartBar, Clock, Gauge, Users, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { equipmentStatusStyles, workerStatusStyles, workOrderStatusStyles } from "@/lib/taller";
import { useTaller } from "@/components/taller-provider";

export default function DashboardPage() {
  const { equipment, workers, workOrders } = useTaller();

  const totalHours = HOURS_BY_TEAM.reduce((sum, item) => sum + item.hours, 0);
  const completedOrders = workOrders.filter(
    (workOrder) => workOrder.status === "Completada",
  ).length;
  const activeOrders = workOrders.filter(
    (workOrder) =>
      workOrder.status === "Pendiente" || workOrder.status === "En progreso",
  ).length;
  const complianceRate =
    workOrders.length > 0
      ? Math.round((completedOrders / workOrders.length) * 100)
      : 0;
  const backlog = workOrders.filter(
    (workOrder) => workOrder.status !== "Completada",
  ).length;
  const shiftCoverage = {
    Mañana: workers.filter((worker) => worker.shift === "Mañana").length,
    Tarde: workers.filter((worker) => worker.shift === "Tarde").length,
    Mixto: workers.filter((worker) => worker.shift === "Mixto").length,
  };
  const bayEfficiency =
    equipment.length > 0
      ? Math.round(
          (equipment.filter((equipmentItem) => equipmentItem.status === "Operativo")
            .length /
            equipment.length) *
            100,
        )
      : 0;
  const focusOrders = workOrders.filter(
    (workOrder) => workOrder.status !== "Completada",
  ).slice(0, 3);
  const roster = workers.slice(0, 4);

  const kpis = [
    { title: "Horas registradas", value: `${totalHours}h`, change: "+12h" },
    { title: "OT finalizadas", value: `${completedOrders}`, change: "+2" },
    { title: "Cumplimiento", value: `${complianceRate}%`, change: "+9%" },
    { title: "Backlog", value: `${backlog}`, change: `${activeOrders} activas` },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <main className="flex flex-col gap-8">
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            <ChartBar className="h-4 w-4" />
            Dashboard operacional
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
            Indicadores clave del taller
          </h1>
          <p className="max-w-2xl text-base text-zinc-500">
            El panel cruza horas, OTs, disponibilidad de equipos y carga de operarios para sostener decisiones diarias sin salir de la app.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.title}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-zinc-500">{kpi.title}</p>
              <p className="mt-2 text-3xl font-bold text-zinc-900">{kpi.value}</p>
              <p className="mt-1 text-xs font-semibold text-emerald-600">
                {kpi.change} vs. último corte
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">Actividad reciente</h2>
              <Link
                href="/log-hours"
                className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 transition hover:text-zinc-900"
              >
                Registrar jornada
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {ACTIVITY_FEED.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-2xl border border-zinc-100 bg-zinc-50/70 px-4 py-3"
                >
                  <Clock className="mt-1 h-4 w-4 text-zinc-400" />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500">{item.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Gauge className="h-5 w-5 text-zinc-400" />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">Eficiencia por bahía</p>
                  <p className="text-xs text-zinc-500">
                    Relación entre equipos listos y capacidad total
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-2 flex-1 rounded-full bg-zinc-100">
                  <div
                    className="h-2 rounded-full bg-zinc-900"
                    style={{ width: `${bayEfficiency}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-zinc-600">
                  {bayEfficiency}%
                </span>
              </div>
              <div className="mt-4 grid gap-2 text-xs text-zinc-500">
                {equipment.slice(0, 3).map((equipmentItem) => (
                  <div
                    key={equipmentItem.id}
                    className="flex items-center justify-between rounded-2xl bg-zinc-50 px-3 py-2"
                  >
                    <span className="font-medium text-zinc-700">{equipmentItem.bay}</span>
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                        equipmentStatusStyles[equipmentItem.status],
                      )}
                    >
                      {equipmentItem.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-zinc-400" />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">Cobertura de turno</p>
                  <p className="text-xs text-zinc-500">
                    {workers.length} operarios cargados en plantilla
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-zinc-500">
                <div className="rounded-2xl bg-zinc-100 px-3 py-2 text-center">
                  Mañana
                  <span className="mt-1 block text-sm font-semibold text-zinc-900">
                    {shiftCoverage.Mañana}
                  </span>
                </div>
                <div className="rounded-2xl bg-zinc-100 px-3 py-2 text-center">
                  Tarde
                  <span className="mt-1 block text-sm font-semibold text-zinc-900">
                    {shiftCoverage.Tarde}
                  </span>
                </div>
                <div className="rounded-2xl bg-zinc-100 px-3 py-2 text-center">
                  Mixto
                  <span className="mt-1 block text-sm font-semibold text-zinc-900">
                    {shiftCoverage.Mixto}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Wrench className="h-5 w-5 text-zinc-400" />
              <div>
                <h2 className="text-lg font-semibold text-zinc-900">OTs que requieren foco</h2>
                <p className="text-xs text-zinc-500">
                  Priorizadas por estado y riesgo operativo
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {focusOrders.map((workOrder) => (
                <div
                  key={workOrder.id}
                  className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">
                        {workOrder.title}
                      </p>
                      <p className="text-xs text-zinc-500">{workOrder.id}</p>
                    </div>
                    <span
                      className={cn(
                        "text-[11px] font-bold uppercase tracking-wide",
                        workOrderStatusStyles[workOrder.status],
                      )}
                    >
                      {workOrder.status}
                    </span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-zinc-100">
                    <div
                      className="h-2 rounded-full bg-zinc-900"
                      style={{ width: `${workOrder.progress}%` }}
                    />
                  </div>
                </div>
              ))}
              {focusOrders.length === 0 && (
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-sm text-zinc-500">
                  No quedan OTs activas en el tablero.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-zinc-400" />
              <div>
                <h2 className="text-lg font-semibold text-zinc-900">Cuadrilla activa</h2>
                <p className="text-xs text-zinc-500">
                  Estado de disponibilidad y carga individual
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {roster.map((worker) => (
                <div
                  key={worker.id}
                  className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{worker.name}</p>
                      <p className="text-xs text-zinc-500">{worker.role}</p>
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
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-2 flex-1 rounded-full bg-zinc-100">
                      <div
                        className="h-2 rounded-full bg-zinc-900"
                        style={{ width: `${worker.workload}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-zinc-600">
                      {worker.workload}%
                    </span>
                  </div>
                </div>
              ))}
              {roster.length === 0 && (
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-sm text-zinc-500">
                  No quedan operarios registrados.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
