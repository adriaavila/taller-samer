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
      <main className="flex flex-col gap-10">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-700">
              1
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              Registro de horas
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Registrar jornada
          </h1>
          <p className="max-w-2xl text-lg text-zinc-500">
            Completa los datos requeridos para actualizar el control de horas y la OT asociada.
          </p>
        </header>

        <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-premium">
          <div className="border-b border-zinc-100 bg-zinc-50/50 px-6 py-4 sm:px-8">
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
              </div>

              <div className="flex flex-col gap-3">
                <label className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900">
                  <Clock className="h-4 w-4 text-zinc-400" />
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
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900">
                <Mic className="h-4 w-4 text-zinc-400" />
                Trabajo ejecutado <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Describe las tareas realizadas durante este periodo..."
                className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
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

            <div className="mt-4 flex flex-col gap-4 border-t border-zinc-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-medium text-zinc-400">
                <span className="text-red-500">*</span> Campos obligatorios para el registro oficial.
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
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
          </div>
        </section>
      </main>
    </div>
  );
}
