"use client";

import { Calendar, Clock, ClipboardList, User } from "lucide-react";
import { DictationTextarea } from "@/components/dictation-textarea";
import { useTaller } from "@/components/taller-provider";
import { formatDate } from "@/lib/taller";

export default function LogHoursPage() {
  const today = new Date().toISOString().split("T")[0];
  const { workOrders, workers, equipment } = useTaller();
  const activeWorkOrders = workOrders.filter(
    (workOrder) => workOrder.status !== "Completada",
  );

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <main className="flex flex-col gap-10">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-700">
              1
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              Jornada
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Registro de horas
          </h1>
          <p className="max-w-2xl text-lg text-zinc-500">
            Deja la jornada vinculada a un operario, una OT activa y una descripción clara para que el seguimiento quede listo para supervisión.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              OTs activas
            </p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">{activeWorkOrders.length}</p>
            <p className="mt-1 text-sm text-zinc-500">Disponibles para imputación</p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Operarios cargados
            </p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">{workers.length}</p>
            <p className="mt-1 text-sm text-zinc-500">Seleccionables en el registro</p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Fecha operativa
            </p>
            <p className="mt-2 text-xl font-bold text-zinc-900">{formatDate(today)}</p>
            <p className="mt-1 text-sm text-zinc-500">Corte del turno actual</p>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-premium">
          <div className="border-b border-zinc-100 bg-zinc-50/50 px-6 py-4 sm:px-8">
            <h2 className="text-sm font-semibold text-zinc-900">Detalles de la jornada</h2>
          </div>

          <div className="flex flex-col gap-8 p-6 sm:p-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="worker"
                  className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900"
                >
                  <User className="h-4 w-4 text-zinc-400" />
                  Operario
                </label>
                <div className="relative">
                  <select
                    id="worker"
                    defaultValue={workers[0]?.id}
                    className="w-full appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                  >
                    {workers.length > 0 ? (
                      workers.map((worker) => (
                        <option key={worker.id} value={worker.id}>
                          {worker.name} · {worker.role}
                        </option>
                      ))
                    ) : (
                      <option value="">Sin operarios cargados</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label
                  htmlFor="date"
                  className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900"
                >
                  <Calendar className="h-4 w-4 text-zinc-400" />
                  Fecha de registro
                </label>
                <input
                  id="date"
                  type="date"
                  defaultValue={today}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                />
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="flex flex-col gap-3 sm:col-span-2">
                <label
                  htmlFor="ot"
                  className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900"
                >
                  <ClipboardList className="h-4 w-4 text-zinc-400" />
                  Orden de trabajo (OT)
                </label>
                <div className="relative">
                  <select
                    id="ot"
                    defaultValue={activeWorkOrders[0]?.id}
                    className="w-full appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                  >
                    {activeWorkOrders.length > 0 ? (
                      activeWorkOrders.map((workOrder) => (
                        <option key={workOrder.id} value={workOrder.id}>
                          {workOrder.id} · {workOrder.title} ·{" "}
                          {equipment.find((item) => item.id === workOrder.equipmentId)?.name ??
                            "Equipo eliminado"}
                        </option>
                      ))
                    ) : (
                      <option value="">Sin OTs activas disponibles</option>
                    )}
                  </select>
                </div>
                <p className="px-1 text-xs text-zinc-400">
                  Las OTs abiertas ya aparecen disponibles para que el registro quede conectado al mantenimiento en curso.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <label className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900">
                  <Clock className="h-4 w-4 text-zinc-400" />
                  Hora de inicio <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                  defaultValue="08:00"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900">
                  <Clock className="h-4 w-4 text-zinc-400" />
                  Hora de término <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                  defaultValue="17:00"
                />
              </div>
            </div>

            <DictationTextarea
              label={
                <>
                  Trabajo ejecutado <span className="text-red-500">*</span>
                </>
              }
              rows={5}
              placeholder="Describe las tareas realizadas, hallazgos, repuestos usados y cualquier observación relevante del turno..."
            />

            <div className="grid gap-4 rounded-3xl border border-zinc-100 bg-zinc-50 p-5 sm:grid-cols-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                  Recomendación
                </p>
                <p className="mt-2 text-sm text-zinc-600">
                  Usa frases cortas con acción + resultado para facilitar auditoría.
                </p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                  Buen registro
                </p>
                <p className="mt-2 text-sm text-zinc-600">
                  &quot;Se reemplazó sello hidráulico y se validó presión de trabajo.&quot;
                </p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                  Obligatorio
                </p>
                <p className="mt-2 text-sm text-zinc-600">
                  Operario, horas y OT deben quedar completos para el cierre del día.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4 border-t border-zinc-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-medium text-zinc-400">
                <span className="text-red-500">*</span> Campos obligatorios para el registro oficial.
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="flex-1 rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-bold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900 active:scale-95 sm:flex-none"
                >
                  Limpiar formulario
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-2xl bg-zinc-900 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-zinc-200 transition hover:bg-zinc-800 hover:shadow-zinc-300 active:scale-95 sm:flex-none"
                >
                  Confirmar registro
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
