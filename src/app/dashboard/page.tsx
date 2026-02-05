"use client";

import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const formatMonthValue = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

export default function DashboardPage() {
  const [monthValue, setMonthValue] = useState(() =>
    formatMonthValue(new Date()),
  );

  const [year, month] = monthValue.split("-").map(Number);
  const stats =
    useQuery(api.analytics.getMonthlyStats as any, { month, year }) ?? null;

  const topTechnicians = useMemo(() => stats?.byUser ?? [], [stats]);
  const topWorkOrders = useMemo(() => stats?.byWorkOrder ?? [], [stats]);

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900 sm:px-10 lg:px-16">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Dashboard
          </span>
          <h1 className="text-3xl font-semibold text-zinc-900 sm:text-4xl">
            Indicadores mensuales de horas
          </h1>
          <p className="max-w-2xl text-base text-zinc-600">
            Consulta el rendimiento por técnico y OT para el rango seleccionado.
          </p>
        </header>

        <section className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-white px-6 py-5 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">
              Rango de fechas
            </h2>
            <p className="text-sm text-zinc-500">
              Selecciona un mes para actualizar el reporte.
            </p>
          </div>
          <input
            type="month"
            value={monthValue}
            onChange={(event) => setMonthValue(event.target.value)}
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700"
          />
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-zinc-900">
              Top técnicos por horas
            </h3>
            <div className="mt-4 space-y-3">
              {topTechnicians.length === 0 && (
                <p className="text-sm text-zinc-500">
                  No hay horas registradas en este período.
                </p>
              )}
              {topTechnicians.map((entry: any) => (
                <div
                  key={entry.userId}
                  className="flex items-center justify-between rounded-2xl border border-zinc-100 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      {entry.user?.name ?? "Técnico sin nombre"}
                    </p>
                    <p className="text-xs text-zinc-500">Horas totales</p>
                  </div>
                  <span className="text-lg font-semibold text-zinc-900">
                    {entry.hours.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-zinc-900">
              Top OTs por horas
            </h3>
            <div className="mt-4 space-y-3">
              {topWorkOrders.length === 0 && (
                <p className="text-sm text-zinc-500">
                  No hay horas registradas en este período.
                </p>
              )}
              {topWorkOrders.map((entry: any) => (
                <div
                  key={entry.workOrderId}
                  className="flex items-center justify-between rounded-2xl border border-zinc-100 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      {entry.workOrder?.otCode ?? "OT sin código"}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {entry.workOrder?.title ?? "Sin descripción"}
                    </p>
                  </div>
                  <span className="text-lg font-semibold text-zinc-900">
                    {entry.hours.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
