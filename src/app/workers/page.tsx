"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ClipboardList,
  Phone,
  Search,
  Trash2,
  UserCheck,
  Users,
} from "lucide-react";
import { useTaller } from "@/components/taller-provider";
import { workerStatusStyles } from "@/lib/taller";
import { cn } from "@/lib/utils";

export default function WorkersPage() {
  const [query, setQuery] = useState("");
  const { currentWorkerId, setCurrentWorkerId, deleteWorker, workers, workOrders } = useTaller();

  const normalizedQuery = query.trim().toLowerCase();
  const filteredWorkers = workers.filter((worker) =>
    [worker.name, worker.role, worker.specialty, worker.shift]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery),
  );



  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <main className="flex flex-col gap-8">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            <Users className="h-4 w-4" />
            Personal
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
            Administrar operarios
          </h1>
          <p className="max-w-2xl text-base text-zinc-500">
            Revisa disponibilidad, marca el operario activo y elimina registros cuando ya no correspondan. Al borrar un operario, sus OTs quedan sin asignación.
          </p>
        </header>



        <section className="flex flex-col justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-4 rounded-2xl px-3 py-2">
            <Search className="h-5 w-5 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre, rol, especialidad o turno..."
              className="w-full bg-transparent text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4">
            {filteredWorkers.length > 0 ? (
              filteredWorkers.map((worker) => {
                const assignedOrders = workOrders.filter(
                  (workOrder) => workOrder.assignedTo === worker.id,
                );
                const isActive = currentWorkerId === worker.id;

                return (
                  <article
                    key={worker.id}
                    className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-zinc-400">
                              {worker.id}
                            </span>
                            {isActive && (
                              <span className="rounded-full border border-zinc-900 bg-zinc-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                                Activo
                              </span>
                            )}
                          </div>
                          <h2 className="mt-3 text-xl font-bold text-zinc-900">
                            {worker.name}
                          </h2>
                          <p className="mt-1 text-sm text-zinc-500">
                            {worker.role} · {worker.specialty}
                          </p>
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

                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                            Turno
                          </p>
                          <p className="mt-1 text-sm font-semibold text-zinc-900">
                            {worker.shift}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                            Carga
                          </p>
                          <p className="mt-1 text-sm font-semibold text-zinc-900">
                            {worker.workload}%
                          </p>
                        </div>
                        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                            Contacto
                          </p>
                          <p className="mt-1 text-sm font-semibold text-zinc-900">
                            {worker.phone}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900">
                            <ClipboardList className="h-4 w-4 text-zinc-400" />
                            OTs asignadas
                          </div>
                          <span className="text-xs font-semibold text-zinc-500">
                            {assignedOrders.length}
                          </span>
                        </div>
                        <div className="mt-3 space-y-2">
                          {assignedOrders.length > 0 ? (
                            assignedOrders.map((workOrder) => (
                              <div
                                key={workOrder.id}
                                className="rounded-2xl border border-zinc-100 bg-white px-3 py-2"
                              >
                                <p className="text-sm font-semibold text-zinc-900">
                                  {workOrder.id}
                                </p>
                                <p className="text-xs text-zinc-500">
                                  {workOrder.title}
                                </p>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-zinc-500">
                              Sin órdenes activas en este momento.
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 border-t border-zinc-100 pt-4">
                        <button
                          type="button"
                          onClick={() => setCurrentWorkerId(worker.id)}
                          className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900"
                        >
                          <UserCheck className="h-4 w-4" />
                          Marcar activo
                        </button>
                        <Link
                          href="/log-hours"
                          className="rounded-2xl border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900"
                        >
                          Registrar horas
                        </Link>
                        <a
                          href={`tel:${worker.phone.replace(/\s+/g, "")}`}
                          className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900"
                        >
                          <Phone className="h-4 w-4" />
                          Llamar
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              window.confirm(
                                `Se eliminará a ${worker.name}. Las OTs asignadas quedarán sin operario. ¿Continuar?`,
                              )
                            ) {
                              deleteWorker(worker.id);
                            }
                          }}
                          className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-10 text-center shadow-sm">
                <p className="text-lg font-semibold text-zinc-900">
                  No encontramos operarios con esa búsqueda.
                </p>
                <p className="mt-2 text-sm text-zinc-500">
                  Prueba otro término o limpia el filtro para ver la cuadrilla completa.
                </p>
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-5">
            <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-900">
                Qué pasa al eliminar
              </h2>
              <div className="mt-5 space-y-3 text-sm text-zinc-600">
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                  El operario desaparece de la lista y del selector de usuario activo.
                </div>
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                  Las OTs que tenía asignadas permanecen, pero quedan sin responsable.
                </div>
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                  Puedes reasignarlas luego desde la gestión de OTs.
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-900">Accesos rápidos</h2>
              <div className="mt-5 space-y-3">
                <Link
                  href="/work-orders"
                  className="block rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
                >
                  Ir a órdenes de trabajo
                </Link>
                <Link
                  href="/equipment"
                  className="block rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
                >
                  Revisar equipos
                </Link>
                <Link
                  href="/log-hours"
                  className="block rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
                >
                  Registrar horas
                </Link>
              </div>
            </section>
          </aside>
        </section>
      </main>
    </div>
  );
}
