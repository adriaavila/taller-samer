"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Check,
  ClipboardList,
  User,
  Wrench,
} from "lucide-react";
import { useTaller } from "@/components/taller-provider";

export default function NewWorkOrderPage() {
  const router = useRouter();
  const { equipment, workers, workOrders } = useTaller();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState("");

  useEffect(() => {
    const equipment = new URLSearchParams(window.location.search).get("equipment");
    if (equipment) {
      const frame = window.requestAnimationFrame(() => {
        setSelectedEquipment(equipment);
      });

      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/work-orders");
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <main className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="flex flex-col gap-8">
          <header className="flex flex-col gap-4">
            <Link
              href="/work-orders"
              className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a OTs
            </Link>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
                Nueva orden de trabajo
              </h1>
              <p className="text-base text-zinc-500">
                Crea una OT completa con equipo, prioridad, responsable y contexto suficiente para que el taller la ejecute sin fricción.
              </p>
            </div>
          </header>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="flex flex-col gap-3 sm:col-span-2">
                <label htmlFor="title" className="text-sm font-bold text-zinc-900">
                  Título de la tarea <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  placeholder="Ej: Cambio de aceite motor"
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="equipment" className="text-sm font-bold text-zinc-900">
                  Equipo afectado <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="equipment"
                    name="equipment"
                    required
                    value={selectedEquipment}
                    onChange={(event) => setSelectedEquipment(event.target.value)}
                    className="w-full appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                  >
                    <option value="" disabled>
                      Selecciona un equipo...
                    </option>
                    {equipment.length > 0 ? (
                      equipment.map((equipmentItem) => (
                        <option key={equipmentItem.id} value={equipmentItem.id}>
                          {equipmentItem.name} ({equipmentItem.id})
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No hay equipos disponibles
                      </option>
                    )}
                  </select>
                  <Wrench className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="type" className="text-sm font-bold text-zinc-900">
                  Tipo de mantenimiento <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="type"
                    name="type"
                    required
                    defaultValue=""
                    className="w-full appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                  >
                    <option value="" disabled>
                      Selecciona el tipo...
                    </option>
                    <option value="Preventivo">Preventivo</option>
                    <option value="Correctivo">Correctivo</option>
                    <option value="Predictivo">Predictivo</option>
                  </select>
                  <ClipboardList className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="priority" className="text-sm font-bold text-zinc-900">
                  Prioridad <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="priority"
                    name="priority"
                    required
                    defaultValue="Media"
                    className="w-full appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                  >
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                    <option value="Crítica">Crítica</option>
                  </select>
                  <AlertTriangle className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="assignedTo" className="text-sm font-bold text-zinc-900">
                  Asignar operario
                </label>
                <div className="relative">
                  <select
                    id="assignedTo"
                    name="assignedTo"
                    defaultValue=""
                    className="w-full appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                  >
                    <option value="" disabled>
                      Selecciona un operario...
                    </option>
                    {workers.length > 0 ? (
                      workers.map((worker) => (
                        <option key={worker.id} value={worker.name}>
                          {worker.name} · {worker.role}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No hay operarios disponibles
                      </option>
                    )}
                  </select>
                  <User className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="date" className="text-sm font-bold text-zinc-900">
                  Fecha programada
                </label>
                <div className="relative">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="w-full appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                  />
                  <Calendar className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:col-span-2">
                <label htmlFor="description" className="text-sm font-bold text-zinc-900">
                  Descripción detallada
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  placeholder="Describe el trabajo a realizar, condición del equipo, repuestos estimados y cualquier restricción para el turno..."
                  className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-zinc-100 pt-6">
              <Link
                href="/work-orders"
                className="rounded-2xl border border-zinc-200 px-6 py-3 text-sm font-bold text-zinc-600 transition hover:bg-zinc-50 active:scale-95"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-zinc-200 transition hover:bg-zinc-800 disabled:opacity-50 active:scale-95"
              >
                {isSubmitting ? (
                  "Creando..."
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Crear OT
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        <aside className="flex flex-col gap-5">
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">Cuadrilla disponible</h2>
            <p className="mt-1 text-xs text-zinc-500">
              Referencia rápida para decidir a quién asignar la nueva OT.
            </p>
            <div className="mt-5 space-y-3">
              {workers.length > 0 ? (
                workers.map((worker) => (
                  <div
                    key={worker.id}
                    className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-4"
                  >
                    <p className="text-sm font-semibold text-zinc-900">{worker.name}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {worker.role} · {worker.specialty}
                    </p>
                    <p className="mt-2 text-xs text-zinc-400">
                      Carga actual: {worker.workload}%
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-sm text-zinc-500">
                  No hay operarios cargados para asignar.
                </div>
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">OTs abiertas</h2>
            <p className="mt-1 text-xs text-zinc-500">
              Contexto del backlog antes de crear una nueva orden.
            </p>
            <div className="mt-5 space-y-3">
              {workOrders.filter((workOrder) => workOrder.status !== "Completada").length > 0 ? (
                workOrders
                  .filter((workOrder) => workOrder.status !== "Completada")
                  .map((workOrder) => (
                    <div
                      key={workOrder.id}
                      className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-4"
                    >
                      <p className="text-sm font-semibold text-zinc-900">{workOrder.title}</p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {workOrder.id} · {workOrder.status}
                      </p>
                    </div>
                  ))
              ) : (
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-sm text-zinc-500">
                  No hay OTs abiertas en este momento.
                </div>
              )}
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
