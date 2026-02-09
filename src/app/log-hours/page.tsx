<<<<<<< HEAD
"use client";

import { useMemo, useState } from "react";
import { Calendar, ClipboardList, Clock, Mic } from "lucide-react";
import { hourLogsData, workOrdersData } from "@/lib/data";

const technicians = [
  "María Rojas",
  "Carlos Soto",
  "Daniela Vega",
  "Luis Araya",
];

export default function LogHoursPage() {
  const [date, setDate] = useState("2026-02-05");
  const [workOrderId, setWorkOrderId] = useState(workOrdersData[0]?.id ?? "");
  const [technician, setTechnician] = useState(technicians[0]);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("17:00");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const recentLogs = useMemo(() => hourLogsData.slice(0, 3), []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(
      `Registro guardado para ${technician} en ${workOrderId} (${startTime} - ${endTime}).`
    );
  };

  const handleDraft = () => {
    setMessage("Borrador guardado localmente. Completa los campos pendientes antes de enviar.");
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
=======
import { Calendar, Clock, ClipboardList, Mic } from "lucide-react";

export default function LogHoursPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
>>>>>>> main
      <main className="flex flex-col gap-10">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-700">
              1
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
<<<<<<< HEAD
              Registro de horas
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Registrar jornada
          </h1>
          <p className="max-w-2xl text-lg text-zinc-500">
            Completa los datos requeridos para actualizar el control de horas y la OT asociada.
=======
              Personal
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Registro de horas
          </h1>
          <p className="max-w-2xl text-lg text-zinc-500">
            Gestiona tu jornada laboral de forma sencilla. Completa los detalles a continuación para registrar tus actividades.
>>>>>>> main
          </p>
        </header>

        <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-premium">
          <div className="border-b border-zinc-100 bg-zinc-50/50 px-6 py-4 sm:px-8">
<<<<<<< HEAD
            <h2 className="text-sm font-semibold text-zinc-900">Detalles de la jornada</h2>
          </div>

          <form className="flex flex-col gap-8 p-6 sm:p-8" onSubmit={handleSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <label className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900">
                  <Calendar className="h-4 w-4 text-zinc-400" />
                  Fecha de registro <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900">
                  <ClipboardList className="h-4 w-4 text-zinc-400" />
                  Orden de trabajo <span className="text-red-500">*</span>
                </label>
                <select
                  value={workOrderId}
                  onChange={(event) => setWorkOrderId(event.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                  required
                >
                  {workOrdersData.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.id} · {order.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-3">
                <label className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900">
                  <Mic className="h-4 w-4 text-zinc-400" />
                  Técnico responsable <span className="text-red-500">*</span>
                </label>
                <select
                  value={technician}
                  onChange={(event) => setTechnician(event.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                  required
                >
                  {technicians.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
=======
            <h2 className="text-sm font-semibold text-zinc-900">Detalles de la Jornada</h2>
          </div>

          <div className="flex flex-col gap-8 p-6 sm:p-8">
            <div className="flex flex-col gap-3">
              <label className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900">
                <Calendar className="h-4 w-4 text-zinc-400" />
                Fecha de registro
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-800">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  5 de febrero, 2026
                </div>
                <button
                  type="button"
                  className="rounded-2xl border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900 active:scale-95"
                >
                  Cambiar
                </button>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="flex flex-col gap-3 sm:col-span-2">
                <label className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900">
                  <ClipboardList className="h-4 w-4 text-zinc-400" />
                  Orden de Trabajo (OT)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Escribe el código de la OT..."
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg bg-zinc-200/50 px-2 py-1 text-[10px] font-bold text-zinc-500 uppercase">
                    Opcional
                  </div>
                </div>
                <p className="px-1 text-xs text-zinc-400">
                  Vincular a una OT activa facilita el seguimiento del mantenimiento.
                </p>
>>>>>>> main
              </div>

              <div className="flex flex-col gap-3">
                <label className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900">
                  <Clock className="h-4 w-4 text-zinc-400" />
<<<<<<< HEAD
                  Horario <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="time"
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                    value={startTime}
                    onChange={(event) => setStartTime(event.target.value)}
                    required
                  />
                  <input
                    type="time"
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                    value={endTime}
                    onChange={(event) => setEndTime(event.target.value)}
                    required
                  />
                </div>
=======
                  Hoja de Inicio <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                  defaultValue="08:00"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900">
                  <Clock className="h-4 w-4 text-zinc-400" />
                  Hora de Término <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                  defaultValue="17:00"
                />
>>>>>>> main
              </div>
            </div>

            <div className="flex flex-col gap-3">
<<<<<<< HEAD
              <label className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900">
                <Mic className="h-4 w-4 text-zinc-400" />
                Trabajo ejecutado <span className="text-red-500">*</span>
              </label>
=======
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900">
                  <Mic className="h-4 w-4 text-zinc-400" />
                  Trabajo Ejecutado <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-zinc-800 active:scale-95 shadow-lg shadow-zinc-200"
                >
                  <Mic className="h-3 w-3" />
                  Dictar
                </button>
              </div>
>>>>>>> main
              <textarea
                rows={4}
                placeholder="Describe las tareas realizadas durante este periodo..."
                className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
<<<<<<< HEAD
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                required
              />
            </div>

            {message ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {message}
              </div>
            ) : null}

=======
              />
            </div>

>>>>>>> main
            <div className="mt-4 flex flex-col gap-4 border-t border-zinc-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-medium text-zinc-400">
                <span className="text-red-500">*</span> Campos obligatorios para el registro oficial.
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
<<<<<<< HEAD
                  onClick={handleDraft}
                  className="flex-1 rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-bold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900 active:scale-95 sm:flex-none"
                >
                  Guardar borrador
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-2xl bg-zinc-900 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-zinc-200 transition hover:bg-zinc-800 hover:shadow-zinc-300 active:scale-95 sm:flex-none"
                >
                  Confirmar registro
                </button>
              </div>
            </div>
          </form>
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">Últimos registros</h2>
          <div className="mt-4 space-y-3">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="flex flex-col gap-1 rounded-2xl border border-zinc-100 bg-zinc-50/70 px-4 py-3"
              >
                <p className="text-sm font-semibold text-zinc-900">{log.technician}</p>
                <p className="text-xs text-zinc-500">
                  {log.workOrderId} · {log.startTime} - {log.endTime} · {log.date}
                </p>
                <p className="text-xs text-zinc-400">{log.notes}</p>
              </div>
            ))}
=======
                  className="flex-1 rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-bold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900 active:scale-95 sm:flex-none"
                >
                  Borrador
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-2xl bg-zinc-900 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-zinc-200 transition hover:bg-zinc-800 hover:shadow-zinc-300 active:scale-95 sm:flex-none"
                >
                  Confirmar Registro
                </button>
              </div>
            </div>
>>>>>>> main
          </div>
        </section>
      </main>
    </div>
  );
}
