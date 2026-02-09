import { Calendar, Clock, ClipboardList } from "lucide-react";
import { DictationTextarea } from "@/components/dictation-textarea";

export default function LogHoursPage() {
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
            <div className="flex flex-col gap-3">
              <label className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900">
                <Calendar className="h-4 w-4 text-zinc-400" />
                Fecha de registro
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-800">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
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
                  <select
                    className="w-full appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>Selecciona una OT activa...</option>
                    {/* OTs will be dynamically populated */}
                    <option value="none" disabled>No hay OTs activas</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
                <p className="px-1 text-xs text-zinc-400">
                  Vincular a una OT activa facilita el seguimiento del mantenimiento.
                </p>
              </div>

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

            <DictationTextarea
              label={
                <>
                  Trabajo Ejecutado <span className="text-red-500">*</span>
                </>
              }
              rows={4}
              placeholder="Describe las tareas realizadas durante este periodo..."
            />

            <div className="mt-4 flex flex-col gap-4 border-t border-zinc-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
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
