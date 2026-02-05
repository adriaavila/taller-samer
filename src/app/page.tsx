import { Calendar, Clock, ClipboardList, Mic } from "lucide-react";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <main className="flex flex-col gap-10">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-700">
              1
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              Personal
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Registro de horas
          </h1>
          <p className="max-w-2xl text-lg text-zinc-500">
            Gestiona tu jornada laboral de forma sencilla. Completa los detalles a continuación para registrar tus actividades.
          </p>
        </header>

        <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-premium">
          <div className="border-b border-zinc-100 bg-zinc-50/50 px-6 py-4 sm:px-8">
            <h2 className="text-sm font-semibold text-zinc-900">Detalles de la Jornada</h2>
          </div>

          <div className="flex flex-col gap-8 p-6 sm:p-8">
            {/* Fecha Selector */}
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
              {/* Orden de Trabajo */}
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
              </div>

              {/* Horas de Trabajo */}
              <div className="flex flex-col gap-3">
                <label className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900">
                  <Clock className="h-4 w-4 text-zinc-400" />
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
              </div>
            </div>

            {/* Trabajo Ejecutado */}
            <div className="flex flex-col gap-3">
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
              <textarea
                rows={4}
                placeholder="Describe las tareas realizadas durante este periodo..."
                className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
              />
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-zinc-100 pt-8">
              <p className="text-xs font-medium text-zinc-400">
                <span className="text-red-500">*</span> Campos obligatorios para el registro oficial.
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
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
          </div>
        </section>
      </main>
    </div>
  );
}
