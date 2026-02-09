import Link from "next/link";
import {
  ArrowUpRight,
  CalendarCheck,
  ClipboardList,
  Clock,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { HoursByTeamChart } from "@/components/dashboard/HoursByTeamChart";
import { LaborCostChart } from "@/components/dashboard/LaborCostChart";

// Dashboard ready for real data integration

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <main className="flex flex-col gap-10">
        <section className="flex flex-col gap-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-premium sm:p-8">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Panel general
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
              Bienvenido, equipo Taller Samer
            </h1>
            <p className="max-w-3xl text-base text-zinc-500 sm:text-lg">
              Centraliza los registros de jornada, estado de órdenes de trabajo y pendientes críticos para iniciar el día con claridad.
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
              href="/work-orders"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
            >
              <ClipboardList className="h-4 w-4" />
              Gestión OTs
            </Link>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <HoursByTeamChart />
          <LaborCostChart />
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
            </div>
            <Link
              href="/work-orders"
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
              href="/equipment"
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
