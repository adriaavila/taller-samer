"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  Gauge,
  Plus,
  Search,
  Trash2,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EQUIPMENT_STATUS_OPTIONS } from "@/lib/constants";
import { useTaller } from "@/components/taller-provider";
import { equipmentStatusStyles, getHoursToService } from "@/lib/taller";

export default function EquipmentPage() {
  const [filter, setFilter] =
    useState<(typeof EQUIPMENT_STATUS_OPTIONS)[number]>("Todos");
  const [query, setQuery] = useState("");
  const { deleteEquipment, equipment, workOrders } = useTaller();

  const normalizedQuery = query.trim().toLowerCase();
  const filteredEquipment = equipment.filter((equipmentItem) => {
    const matchesFilter =
      filter === "Todos" ? true : equipmentItem.status === filter;
    const matchesQuery =
      normalizedQuery.length === 0
        ? true
        : [
            equipmentItem.id,
            equipmentItem.name,
            equipmentItem.type,
            equipmentItem.location,
          ].some((value) => value.toLowerCase().includes(normalizedQuery));

    return matchesFilter && matchesQuery;
  });



  const upcomingService = [...equipment]
    .sort(
      (a, b) =>
        getHoursToService(a.hours, a.nextServiceHours) -
        getHoursToService(b.hours, b.nextServiceHours),
    )
    .slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <main className="flex flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              <Truck className="h-4 w-4" />
              Flota y activos
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
              Gestión de equipos
            </h1>
            <p className="max-w-2xl text-base text-zinc-500">
              Controla disponibilidad, horómetro, ubicación y elimina activos que ya no deben seguir en el panel.
            </p>
          </div>
          <Link
            href="/equipment/new"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-zinc-200 transition hover:bg-zinc-800 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Nuevo equipo
          </Link>
        </header>



        <section className="flex flex-col justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-4 rounded-2xl px-3 py-2">
            <Search className="h-5 w-5 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por ID, nombre, tipo o ubicación..."
              className="w-full bg-transparent text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 p-2">
            {EQUIPMENT_STATUS_OPTIONS.map((status) => (
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
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredEquipment.length > 0 ? (
              filteredEquipment.map((equipmentItem) => {
                const relatedOrders = workOrders.filter(
                  (workOrder) => workOrder.equipmentId === equipmentItem.id,
                );
                const hoursToService = getHoursToService(
                  equipmentItem.hours,
                  equipmentItem.nextServiceHours,
                );

                return (
                  <article
                    key={equipmentItem.id}
                    className="group flex flex-col justify-between rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-mono text-xs font-bold text-zinc-400">
                          {equipmentItem.id}
                        </span>
                        <span
                          className={cn(
                            "rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
                            equipmentStatusStyles[equipmentItem.status],
                          )}
                        >
                          {equipmentItem.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600">
                          <Truck className="h-6 w-6" />
                        </div>
                        <div>
                          <h2 className="text-lg font-bold leading-tight text-zinc-900">
                            {equipmentItem.name}
                          </h2>
                          <p className="mt-1 text-sm font-medium text-zinc-500">
                            {equipmentItem.type}
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-3">
                        <div className="flex items-center gap-2 rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2">
                          <Gauge className="h-4 w-4 text-zinc-400" />
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-400">
                              Horómetro
                            </p>
                            <p className="text-sm font-semibold text-zinc-700">
                              {equipmentItem.hours.toLocaleString()} h
                            </p>
                          </div>
                        </div>

                        <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-400">
                            Próximo servicio
                          </p>
                          <p className="mt-1 text-sm font-semibold text-zinc-700">
                            {equipmentItem.nextServiceHours.toLocaleString()} h
                          </p>
                          <p className="mt-1 text-xs text-zinc-500">
                            Faltan {hoursToService.toLocaleString()} h para mantenimiento
                          </p>
                        </div>

                        <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-400">
                            Ubicación
                          </p>
                          <p className="mt-1 text-sm font-semibold text-zinc-700">
                            {equipmentItem.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-zinc-100 pt-4">
                      {relatedOrders.length > 0 ? (
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                          <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
                            OTs relacionadas
                          </p>
                          <p className="mt-1 text-sm font-semibold text-zinc-900">
                            {relatedOrders.map((workOrder) => workOrder.id).join(", ")}
                          </p>
                        </div>
                      ) : (
                        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm text-zinc-500">
                          Sin OT abierta en este momento.
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs font-semibold text-zinc-500">
                          {equipmentItem.bay}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={`/work-orders/new?equipment=${equipmentItem.id}`}
                            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
                          >
                            Programar OT
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              const message = relatedOrders.length > 0
                                ? `Se eliminará ${equipmentItem.name} y también ${relatedOrders.length} OT(s) asociada(s). ¿Continuar?`
                                : `Se eliminará ${equipmentItem.name}. ¿Continuar?`;
                              if (window.confirm(message)) {
                                deleteEquipment(equipmentItem.id);
                              }
                            }}
                            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="sm:col-span-2 rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-10 text-center shadow-sm">
                <p className="text-lg font-semibold text-zinc-900">
                  No encontramos equipos con ese filtro.
                </p>
                <p className="mt-2 text-sm text-zinc-500">
                  Prueba otro término de búsqueda o vuelve al listado completo.
                </p>
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-5">
            <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-zinc-400" />
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">
                    Servicios próximos
                  </h2>
                  <p className="text-xs text-zinc-500">Equipos que conviene programar hoy</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {upcomingService.length > 0 ? (
                  upcomingService.map((equipmentItem) => (
                    <div
                      key={equipmentItem.id}
                      className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-zinc-900">
                            {equipmentItem.name}
                          </p>
                          <p className="text-xs text-zinc-500">{equipmentItem.id}</p>
                        </div>
                        <span className="text-xs font-semibold text-zinc-500">
                          {getHoursToService(
                            equipmentItem.hours,
                            equipmentItem.nextServiceHours,
                          )}{" "}
                          h
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-sm text-zinc-500">
                    No quedan equipos cargados.
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-zinc-400" />
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">Cierre operativo</h2>
                  <p className="text-xs text-zinc-500">
                    Puntos a revisar antes del despacho
                  </p>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm text-zinc-600">
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                  Si eliminas un equipo con OTs abiertas, esas órdenes también se eliminan.
                </div>
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                  Conviene revisar la lista de trabajo antes de limpiar activos del panel.
                </div>
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                  Mantén al menos un equipo por categoría para no vaciar reportes de operación.
                </div>
              </div>
            </section>
          </aside>
        </section>
      </main>
    </div>
  );
}
