import { ClipboardCheck, Wrench } from "lucide-react";
import { equipmentData } from "@/lib/data";

export default function EquipmentPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <main className="flex flex-col gap-8">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            <Wrench className="h-4 w-4" />
            Equipos
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
            Estado de equipos y activos críticos
          </h1>
          <p className="max-w-2xl text-base text-zinc-500">
            Mantén la trazabilidad de inspecciones y disponibilidad en cada bahía.
          </p>
        </header>

        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-white">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">Inventario operativo</p>
              <p className="text-xs text-zinc-500">{equipmentData.length} equipos monitoreados</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {equipmentData.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 rounded-2xl border border-zinc-100 bg-zinc-50/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{item.name}</p>
                  <p className="text-xs text-zinc-500">
                    {item.id} · {item.location}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">
                    Última inspección: {item.lastInspection}
                  </p>
                </div>
                <span className="w-fit rounded-full bg-zinc-900/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-700">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
