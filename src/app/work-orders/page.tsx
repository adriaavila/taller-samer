"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ClipboardList,
  Plus,
  Search,
  Trash2,
  Users,
  Wrench,
} from "lucide-react";
import { WORK_ORDER_STATUS_OPTIONS } from "@/lib/constants";
import { useTaller } from "@/components/taller-provider";
import {
  formatDate,
  workOrderPriorityStyles,
  workOrderStatusStyles,
  workerStatusStyles,
} from "@/lib/taller";
import { cn } from "@/lib/utils";

export default function WorkOrdersPage() {
  const [filter, setFilter] =
    useState<(typeof WORK_ORDER_STATUS_OPTIONS)[number]>("Todos");
  const [query, setQuery] = useState("");
  const { deleteWorkOrder, equipment, workers, workOrders } = useTaller();

  const normalizedQuery = query.trim().toLowerCase();
  const filteredOrders = workOrders.filter((workOrder) => {
    const equipmentRecord = equipment.find(
      (equipmentItem) => equipmentItem.id === workOrder.equipmentId,
    );
    const worker = workers.find((workerItem) => workerItem.id === workOrder.assignedTo);
    const matchesFilter =
      filter === "Todos" ? true : workOrder.status === filter;
    const matchesQuery =
      normalizedQuery.length === 0
        ? true
        : [
            workOrder.id,
            workOrder.title,
            equipmentRecord?.name,
            worker?.name,
            workOrder.bay,
          ]
            .filter(Boolean)
            .some((value) => value?.toLowerCase().includes(normalizedQuery));

    return matchesFilter && matchesQuery;
  });

  const summary = {
    abiertas: workOrders.filter((workOrder) => workOrder.status !== "Completada").length,
    progreso: workOrders.filter((workOrder) => workOrder.status === "En progreso").length,
    bloqueadas: workOrders.filter((workOrder) => workOrder.status === "Bloqueada").length,
    criticas: workOrders.filter((workOrder) => workOrder.priority === "Crítica").length,
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <main className="flex flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              <Wrench className="h-4 w-4" />
              Mantenimiento
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
              Órdenes de trabajo
            </h1>
            <p className="max-w-2xl text-base text-zinc-500">
              Sigue el avance por equipo, filtra por estado y elimina órdenes que ya no deben formar parte de la operación.
            </p>
          </div>
          <Link
            href="/work-orders/new"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-zinc-200 transition hover:bg-zinc-800 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Nueva OT
          </Link>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              OTs abiertas
            </p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">{summary.abiertas}</p>
            <p className="mt-1 text-sm text-zinc-500">Pendientes, activas y bloqueadas</p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              En progreso
            </p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">{summary.progreso}</p>
            <p className="mt-1 text-sm text-zinc-500">Con trabajo en curso</p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Bloqueadas
            </p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">{summary.bloqueadas}</p>
            <p className="mt-1 text-sm text-zinc-500">Esperan repuestos o decisión</p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Críticas
            </p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">{summary.criticas}</p>
            <p className="mt-1 text-sm text-zinc-500">Impactan salida operativa</p>
          </div>
        </section>

        <section className="flex flex-col justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-4 rounded-2xl px-3 py-2">
            <Search className="h-5 w-5 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por OT, equipo, bahía o técnico..."
              className="w-full bg-transparent text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 p-2">
            {WORK_ORDER_STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={cn(
                  "rounded-xl px-4 py-2 text-xs font-bold transition",
                  filter === status
                    ? "bg-zinc-900 text-white"
                    : "bg-transparent text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900",
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((workOrder) => {
                const worker = workers.find((workerItem) => workerItem.id === workOrder.assignedTo);
                const equipmentRecord = equipment.find(
                  (equipmentItem) => equipmentItem.id === workOrder.equipmentId,
                );

                return (
                  <article
                    key={workOrder.id}
                    className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-zinc-400">
                              {workOrder.id}
                            </span>
                            <span
                              className={cn(
                                "rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
                                workOrderPriorityStyles[workOrder.priority],
                              )}
                            >
                              {workOrder.priority}
                            </span>
                          </div>
                          <h2 className="mt-3 text-xl font-bold text-zinc-900">
                            {workOrder.title}
                          </h2>
                          <p className="mt-1 text-sm text-zinc-500">
                            {equipmentRecord?.name ?? "Equipo eliminado"} · {workOrder.bay}
                          </p>
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

                      <p className="text-sm leading-6 text-zinc-600">
                        {workOrder.description}
                      </p>

                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                            Tipo
                          </p>
                          <p className="mt-1 text-sm font-semibold text-zinc-900">
                            {workOrder.type}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                            Programada
                          </p>
                          <p className="mt-1 text-sm font-semibold text-zinc-900">
                            {formatDate(workOrder.scheduledDate)}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                            Estimado
                          </p>
                          <p className="mt-1 text-sm font-semibold text-zinc-900">
                            {workOrder.estimatedHours}h
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-zinc-500">
                          <span>Avance</span>
                          <span>{workOrder.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-zinc-100">
                          <div
                            className="h-2 rounded-full bg-zinc-900"
                            style={{ width: `${workOrder.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 border-t border-zinc-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-600">
                            {worker
                              ? worker.name
                                  .split(" ")
                                  .map((name) => name[0])
                                  .join("")
                                  .slice(0, 2)
                              : "SA"}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-zinc-900">
                              {worker?.name ?? "Sin asignar"}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {worker?.role ?? "Requiere reasignación"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Link
                            href="/log-hours"
                            className="rounded-2xl border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900"
                          >
                            Registrar horas
                          </Link>
                          <Link
                            href={`/work-orders/new?equipment=${workOrder.equipmentId}`}
                            className="rounded-2xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-800"
                          >
                            Reprogramar
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Se eliminará la ${workOrder.id}. Esta acción no se puede deshacer en la sesión actual. ¿Continuar?`,
                                )
                              ) {
                                deleteWorkOrder(workOrder.id);
                              }
                            }}
                            className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-10 text-center shadow-sm">
                <p className="text-lg font-semibold text-zinc-900">
                  No encontramos OTs con esos criterios.
                </p>
                <p className="mt-2 text-sm text-zinc-500">
                  Ajusta la búsqueda o cambia el filtro para revisar toda la operación.
                </p>
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-5">
            <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-zinc-400" />
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">
                    Operarios con opciones
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Accesos rápidos para reasignar o registrar jornada
                  </p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {workers.length > 0 ? (
                  workers.map((worker) => (
                    <div
                      key={worker.id}
                      className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-zinc-900">
                            {worker.name}
                          </p>
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
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                          href="/log-hours"
                          className="rounded-2xl border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-600 transition hover:bg-white hover:text-zinc-900"
                        >
                          Horas
                        </Link>
                        <Link
                          href="/workers"
                          className="rounded-2xl border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-600 transition hover:bg-white hover:text-zinc-900"
                        >
                          Operarios
                        </Link>
                        <a
                          href={`tel:${worker.phone.replace(/\s+/g, "")}`}
                          className="rounded-2xl bg-zinc-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-zinc-800"
                        >
                          Llamar
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-sm text-zinc-500">
                    No quedan operarios cargados.
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <ClipboardList className="h-5 w-5 text-zinc-400" />
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">
                    Próximos pasos
                  </h2>
                  <p className="text-xs text-zinc-500">Para cerrar el turno sin atrasos</p>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm text-zinc-600">
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                  Las OTs sin asignación deben revisarse desde la cuadrilla o desde la nueva OT.
                </div>
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                  Si eliminas un equipo, sus OTs relacionadas también salen de la operación.
                </div>
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                  Usa el botón eliminar solo cuando el registro ya no deba seguir visible.
                </div>
              </div>
            </section>
          </aside>
        </section>
      </main>
    </div>
  );
}
