import Link from "next/link";
import { ArrowUpRight, ChartBar, Clock, Gauge, Users } from "lucide-react";

const kpis = [
  { title: "Horas registradas", value: "154h", change: "+12%" },
  { title: "OT finalizadas", value: "28", change: "+4" },
  { title: "Tasa de cumplimiento", value: "92%", change: "+1.8%" },
  { title: "Backlog", value: "11", change: "-3" },
];

const activity = [
  {
    title: "OT-2401 · Ajuste de suspensión",
    meta: "Equipo Norte · 2h 15m",
  },
  {
    title: "OT-2394 · Diagnóstico eléctrico",
    meta: "Bahía 3 · 1h 10m",
  },
  {
    title: "OT-2412 · Inspección preventiva",
    meta: "Zona A · 3 técnicos",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <main className="flex flex-col gap-8">
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            <ChartBar className="h-4 w-4" />
            Dashboard operacional
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
            Indicadores clave del taller
          </h1>
          <p className="max-w-2xl text-base text-zinc-500">
            Revisa el rendimiento diario y detecta rápidamente desvíos en productividad y tiempos de respuesta.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.title}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-zinc-500">{kpi.title}</p>
              <p className="mt-2 text-3xl font-bold text-zinc-900">{kpi.value}</p>
              <p className="mt-1 text-xs font-semibold text-emerald-600">
                {kpi.change} vs. última semana
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">Actividad reciente</h2>
              <Link
                href="/log-hours"
                className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 transition hover:text-zinc-900"
              >
                Registrar jornada
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {activity.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-2xl border border-zinc-100 bg-zinc-50/70 px-4 py-3"
                >
                  <Clock className="mt-1 h-4 w-4 text-zinc-400" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
                    <p className="text-xs text-zinc-500">{item.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Gauge className="h-5 w-5 text-zinc-400" />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">Eficiencia por bahía</p>
                  <p className="text-xs text-zinc-500">Bahía 2 lidera con 97%</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-2 flex-1 rounded-full bg-zinc-100">
                  <div className="h-2 w-[85%] rounded-full bg-zinc-900" />
                </div>
                <span className="text-xs font-semibold text-zinc-600">85%</span>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-zinc-400" />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">Cobertura de turno</p>
                  <p className="text-xs text-zinc-500">12 técnicos activos</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-zinc-500">
                <div className="rounded-2xl bg-zinc-100 px-3 py-2 text-center">
                  Mañana
                  <span className="mt-1 block text-sm font-semibold text-zinc-900">6</span>
                </div>
                <div className="rounded-2xl bg-zinc-100 px-3 py-2 text-center">
                  Tarde
                  <span className="mt-1 block text-sm font-semibold text-zinc-900">4</span>
                </div>
                <div className="rounded-2xl bg-zinc-100 px-3 py-2 text-center">
                  Noche
                  <span className="mt-1 block text-sm font-semibold text-zinc-900">2</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
