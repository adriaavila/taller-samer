export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900 sm:px-10 lg:px-16">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Registro de horas
          </span>
          <h1 className="text-3xl font-semibold text-zinc-900 sm:text-4xl">
            Mejora tu registro diario con un formulario claro y guiado
          </h1>
          <p className="max-w-2xl text-base text-zinc-600">
            Completa los detalles de tu jornada en un solo lugar. Todos los
            campos obligatorios están marcados con un asterisco.
          </p>
        </header>

        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-zinc-900">
                Fecha
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700">
                  5 de febrero, 2026
                </span>
                <button
                  type="button"
                  className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-900"
                >
                  Cambiar fecha
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-900">
                Orden de Trabajo
              </label>
              <input
                type="text"
                placeholder="OT-2048 · Mantenimiento correctivo"
                className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
              />
              <p className="text-sm text-zinc-500">
                Puedes editar el tipo de falla y mantenimiento después en
                &quot;OT&quot;.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-900">
                Horas de Trabajo <span className="text-red-500">*</span>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-zinc-500">
                    Hora Inicial <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
                    defaultValue="08:00"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-zinc-500">
                    Hora Final <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
                    defaultValue="17:00"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-900">
                Trabajo Ejecutado <span className="text-red-500">*</span>{" "}
                <span className="text-xs font-normal text-zinc-500">
                  (Con entrada de voz principal)
                </span>
              </label>
              <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>Describe las tareas realizadas</span>
                  <button
                    type="button"
                    className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white transition hover:bg-zinc-800"
                  >
                    🎙️ Dictar
                  </button>
                </div>
                <textarea
                  rows={4}
                  placeholder="Ejemplo: Inspección general, cambio de filtros y ajuste de presión."
                  className="w-full resize-none border-none bg-transparent text-base text-zinc-900 outline-none placeholder:text-zinc-400"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-zinc-500">
                * Campos obligatorios para registrar la jornada.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="rounded-full border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-900"
                >
                  Guardar borrador
                </button>
                <button
                  type="button"
                  className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
                >
                  Registrar horas
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
