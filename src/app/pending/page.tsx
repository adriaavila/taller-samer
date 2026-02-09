import Link from "next/link";
import { AlertTriangle, ArrowUpRight, CheckCircle2 } from "lucide-react";

const tasks = [
  {
    title: "Actualizar checklist de seguridad",
    description: "Completar verificación de extintores y EPP.",
    owner: "Equipo Norte",
    status: "Crítico",
  },
  {
    title: "Cierre OT-2389",
    description: "Subir evidencia fotográfica y firmar recepción.",
    owner: "María Rojas",
    status: "En revisión",
  },
  {
    title: "Planificación de repuestos",
    description: "Validar stock de frenos y lubricantes.",
    owner: "Almacén",
    status: "Programado",
  },
  {
    title: "Capacitación de seguridad",
    description: "Enviar material y confirmar asistencia.",
    owner: "RRHH",
    status: "Pendiente",
  },
];

export default function PendingPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <main className="flex flex-col gap-8">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            <AlertTriangle className="h-4 w-4" />
            Pendientes
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
            Tareas que requieren atención inmediata
          </h1>
          <p className="max-w-2xl text-base text-zinc-500">
            Prioriza las actividades críticas para mantener la operación del taller al día.
          </p>
        </header>

        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900">Lista de pendientes</h2>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 transition hover:text-zinc-900"
            >
              Ver indicadores
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-6 space-y-4">
            {tasks.map((task) => (
              <div
                key={task.title}
                className="flex flex-col gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-zinc-400" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{task.title}</p>
                    <p className="text-xs text-zinc-500">{task.description}</p>
                    <p className="mt-1 text-xs text-zinc-400">Responsable: {task.owner}</p>
                  </div>
                </div>
                <span className="w-fit rounded-full bg-zinc-900/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-700">
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
