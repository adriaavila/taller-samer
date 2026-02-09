import Link from "next/link";
import { ArrowUpRight, Settings, Shield, Wrench } from "lucide-react";

const adminCards = [
  {
    title: "Roles y permisos",
    description: "Define accesos para supervisores y técnicos.",
    action: "Gestionar usuarios",
  },
  {
    title: "Inventario crítico",
    description: "Monitorea repuestos con stock bajo.",
    action: "Ver inventario",
  },
  {
    title: "Parámetros del taller",
    description: "Actualiza turnos, bahías y calendarios.",
    action: "Editar configuración",
  },
];

export default function AdminPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <main className="flex flex-col gap-8">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            <Settings className="h-4 w-4" />
            Administración
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
            Configuración general del taller
          </h1>
          <p className="max-w-2xl text-base text-zinc-500">
            Ajusta usuarios, permisos e inventario crítico para mantener la operación segura y controlada.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {adminCards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col justify-between rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{card.title}</p>
                  <p className="mt-1 text-xs text-zinc-500">{card.description}</p>
                </div>
              </div>
              <button
                type="button"
                className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 transition hover:text-zinc-900"
              >
                {card.action}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                <Wrench className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900">Estado de bahías</p>
                <p className="text-xs text-zinc-500">3 bahías disponibles, 2 en mantenimiento</p>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 transition hover:text-zinc-900"
            >
              Ver detalle
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
