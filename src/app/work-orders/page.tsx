"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Plus,
  Search,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for Work Orders
const workOrders: Array<{
  id: string;
  title: string;
  equipment: string;
  type: string;
  priority: string;
  status: string;
  assignedTo: string;
  date: string;
}> = [
  {
    id: "OT-2025-001",
    title: "Cambio de aceite y filtros",
    equipment: "VOLQUETA DONG FENG 3152 BHN",
    type: "Preventivo",
    priority: "Medium",
    status: "Pendiente",
    assignedTo: "Carlos Soto",
    date: "2025-02-24",
  },
  {
    id: "OT-2025-002",
    title: "Diagnóstico sistema hidráulico",
    equipment: "BOBCAT",
    type: "Correctivo",
    priority: "High",
    status: "En Progreso",
    assignedTo: "María Rojas",
    date: "2025-02-23",
  },
  {
    id: "OT-2025-003",
    title: "Revisión eléctrica general",
    equipment: "PLANTA ASFALTO SLB8",
    type: "Predictivo",
    priority: "Low",
    status: "Completado",
    assignedTo: "Daniela Vega",
    date: "2025-02-21",
  },
];

const priorityColor: Record<string, string> = {
  Critical: "border-red-200 bg-red-100 text-red-800",
  High: "border-orange-200 bg-orange-100 text-orange-800",
  Medium: "border-amber-200 bg-amber-100 text-amber-800",
  Low: "border-emerald-200 bg-emerald-100 text-emerald-800",
};

export default function WorkOrdersPage() {
  const [filter, setFilter] = useState("Todos");

  const filteredOrders =
    filter === "Todos"
      ? workOrders
      : workOrders.filter((ot) => ot.status === filter);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <main className="flex flex-col gap-8">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              <Wrench className="h-4 w-4" />
              Mantenimiento
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
              Órdenes de Trabajo
            </h1>
            <p className="max-w-xl text-base text-zinc-500">
              Administra y supervisa las tareas de mantenimiento preventivo y correctivo.
            </p>
          </div>
          <Link
            href="/work-orders/new"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-zinc-200 transition hover:bg-zinc-800 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Nueva OT
          </Link>
        </header>

        {/* Controls: Search & Filter */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between rounded-3xl border border-zinc-200 bg-white p-2 pl-6 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <Search className="h-5 w-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar por ID, equipo o técnico..."
              className="w-full bg-transparent text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 p-2">
            <div className="h-8 w-px bg-zinc-200 mx-2 hidden sm:block" />
            {["Todos", "Pendiente", "En Progreso", "Completado"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={cn(
                  "rounded-xl px-4 py-2 text-xs font-bold transition",
                  filter === status
                    ? "bg-zinc-900 text-white"
                    : "bg-transparent text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </section>

        {/* Work Orders Grid */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map((ot) => (
            <div
              key={ot.id}
              className="group flex flex-col justify-between rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs font-bold text-zinc-400">
                    {ot.id}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide border",
                      priorityColor[ot.priority]
                    )}
                  >
                    {ot.priority}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 leading-tight">
                    {ot.title}
                  </h3>
                  <p className="text-sm font-medium text-zinc-500 mt-1">
                    {ot.equipment}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-zinc-50 border border-zinc-100 px-2 py-1 text-[10px] font-semibold text-zinc-600">
                    <Wrench className="h-3 w-3" />
                    {ot.type}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-zinc-50 border border-zinc-100 px-2 py-1 text-[10px] font-semibold text-zinc-600">
                    <Clock className="h-3 w-3" />
                    {ot.date}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-500 border border-zinc-200">
                    {ot.assignedTo.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-zinc-600">
                    {ot.assignedTo}
                  </span>
                </div>
                <span className={cn("text-[10px] font-bold uppercase tracking-wide", ot.status === "En Progreso" ? "text-blue-700" : ot.status === "Completado" ? "text-emerald-700" : "text-amber-700")}>
                  {ot.status}
                </span>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
