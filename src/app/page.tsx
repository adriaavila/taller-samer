import Link from "next/link";
<<<<<<< HEAD
import { ClipboardList, Clock, Wrench } from "lucide-react";
import { equipmentData, hourLogsData, workOrdersData } from "@/lib/data";
import {
  calculateHours,
  countByStatus,
  formatMinutes,
  getLatestLogDate,
  getLogsForDate,
} from "@/lib/metrics";
=======
import {
  ArrowUpRight,
  CalendarCheck,
  ClipboardList,
  Clock,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const summaryCards = [
  {
    title: "Horas hoy",
    value: "6h 30m",
    detail: "Último registro: 13:30",
  },
  {
    title: "OT activas",
    value: "4",
    detail: "2 por cerrar esta semana",
  },
  {
    title: "Pendientes",
    value: "7",
    detail: "3 con prioridad alta",
  },
  {
    title: "Personal en turno",
    value: "12",
    detail: "2 técnicos en ruta",
  },
];

const recentLogs = [
  {
    id: "OT-2405",
    task: "Cambio de filtros hidráulicos",
    time: "08:00 - 10:30",
    tech: "María Rojas",
  },
  {
    id: "OT-2398",
    task: "Inspección de frenos",
    time: "10:45 - 12:15",
    tech: "Carlos Soto",
  },
  {
    id: "OT-2410",
    task: "Prueba de torque",
    time: "12:30 - 13:30",
    tech: "Daniela Vega",
  },
];

const pendingTasks = [
  {
    title: "Actualizar checklist de seguridad",
    meta: "Hoy · Zona A",
    status: "Crítico",
  },
  {
    title: "Cierre OT-2389",
    meta: "Mañana · Taller central",
    status: "En revisión",
  },
  {
    title: "Planificación de repuestos",
    meta: "Viernes · Inventario",
    status: "Programado",
  },
];
>>>>>>> main

export default function Home() {
  const latestDate = getLatestLogDate(hourLogsData);
  const logsForDate = getLogsForDate(hourLogsData, latestDate);
  const totalMinutes = calculateHours(logsForDate);
  const openOrders = countByStatus(workOrdersData, "Abierta") +
    countByStatus(workOrdersData, "En progreso") +
    countByStatus(workOrdersData, "En revisión");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <main className="flex flex-col gap-10">
        <section className="flex flex-col gap-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-premium sm:p-8">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Panel general
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
<<<<<<< HEAD
              Operación diaria del taller
            </h1>
            <p className="max-w-3xl text-base text-zinc-500 sm:text-lg">
              Controla las horas de trabajo, el avance de las órdenes y la disponibilidad del equipo desde un solo lugar.
=======
              Bienvenido, equipo Taller Samer
            </h1>
            <p className="max-w-3xl text-base text-zinc-500 sm:text-lg">
              Centraliza los registros de jornada, estado de órdenes de trabajo y pendientes críticos para iniciar el día con claridad.
>>>>>>> main
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/log-hours"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-200 transition hover:bg-zinc-800"
            >
              <Clock className="h-4 w-4" />
              Registrar jornada
            </Link>
            <Link
<<<<<<< HEAD
              href="/ots"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
            >
              <ClipboardList className="h-4 w-4" />
              Gestionar OTs
=======
              href="/pending"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
            >
              <ClipboardList className="h-4 w-4" />
              Revisar pendientes
>>>>>>> main
            </Link>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
<<<<<<< HEAD
          <div className="flex flex-col gap-3 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-zinc-500">Horas registradas (último día)</p>
            <p className="text-3xl font-bold text-zinc-900">{formatMinutes(totalMinutes)}</p>
            <p className="text-xs text-zinc-400">{latestDate ?? "Sin registros"}</p>
          </div>
          <div className="flex flex-col gap-3 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-zinc-500">Órdenes activas</p>
            <p className="text-3xl font-bold text-zinc-900">{openOrders}</p>
            <p className="text-xs text-zinc-400">Incluye abiertas y en revisión</p>
          </div>
          <div className="flex flex-col gap-3 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-zinc-500">Equipos operativos</p>
            <p className="text-3xl font-bold text-zinc-900">
              {equipmentData.filter((item) => item.status === "Operativo").length}
            </p>
            <p className="text-xs text-zinc-400">De {equipmentData.length} activos</p>
          </div>
          <div className="flex flex-col gap-3 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-zinc-500">OTs cerradas</p>
            <p className="text-3xl font-bold text-zinc-900">
              {countByStatus(workOrdersData, "Cerrada")}
            </p>
            <p className="text-xs text-zinc-400">Últimas 48 horas</p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">Últimos registros de horas</h2>
              <Link
                href="/log-hours"
                className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 transition hover:text-zinc-900"
              >
                Registrar nueva jornada
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {hourLogsData.map((log) => (
                <div
                  key={log.id}
                  className="flex flex-col gap-2 rounded-2xl border border-zinc-100 bg-zinc-50/70 px-4 py-3"
                >
                  <p className="text-sm font-semibold text-zinc-900">{log.technician}</p>
                  <p className="text-xs text-zinc-500">
                    {log.workOrderId} · {log.startTime} - {log.endTime}
                  </p>
                  <p className="text-xs text-zinc-400">{log.notes}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                <Wrench className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900">Equipos con seguimiento</p>
                <p className="text-xs text-zinc-500">Revisión y mantenimiento</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {equipmentData.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50/70 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{item.name}</p>
                    <p className="text-xs text-zinc-500">{item.location}</p>
                  </div>
                  <span className="rounded-full bg-zinc-900/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-700">
                    {item.status}
                  </span>
                </div>
              ))}
=======
          {summaryCards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col gap-3 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-zinc-500">{card.title}</p>
              <p className="text-3xl font-bold text-zinc-900">{card.value}</p>
              <p className="text-xs text-zinc-400">{card.detail}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">Últimos registros</h2>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 transition hover:text-zinc-900"
              >
                Ver dashboard
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {recentLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex flex-col gap-2 rounded-2xl border border-zinc-100 bg-zinc-50/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{log.task}</p>
                    <p className="text-xs text-zinc-500">
                      {log.id} · {log.tech}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-600">
                    <Clock className="h-3.5 w-3.5" />
                    {log.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">Pendientes críticos</h2>
              <Link
                href="/pending"
                className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 transition hover:text-zinc-900"
              >
                Gestionar
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <ul className="mt-6 space-y-4">
              {pendingTasks.map((task) => (
                <li
                  key={task.title}
                  className="flex flex-col gap-2 rounded-2xl border border-zinc-100 bg-zinc-50/70 px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-zinc-900">{task.title}</p>
                    <span className="rounded-full bg-zinc-900/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-700">
                      {task.status}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">{task.meta}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                <CalendarCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900">Programación semanal</p>
                <p className="text-xs text-zinc-500">Revisa turnos y recursos</p>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 transition hover:text-zinc-900"
            >
              Abrir planificación
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900">Control de seguridad</p>
                <p className="text-xs text-zinc-500">Checklist diario y auditorías</p>
              </div>
>>>>>>> main
            </div>
            <Link
              href="/pending"
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 transition hover:text-zinc-900"
            >
              Ver checklist
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                <Wrench className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900">Operación del taller</p>
                <p className="text-xs text-zinc-500">Estado de bahías y recursos</p>
              </div>
            </div>
            <Link
              href="/admin"
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 transition hover:text-zinc-900"
            >
              Administrar recursos
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
