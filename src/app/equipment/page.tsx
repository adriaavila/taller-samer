"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Battery,
  CheckCircle2,
  Filter,
  Fuel,
  Gauge,
  Plus,
  Search,
  Settings,
  ShieldAlert,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { EQUIPMENT_LIST } from "@/lib/constants";

// Use the shared constant
const equipmentList = EQUIPMENT_LIST;

const statusColor: Record<string, string> = {
  Operational: "text-green-700 bg-green-100 border-green-200",
  Maintenance: "text-orange-700 bg-orange-100 border-orange-200",
  "Out of Service": "text-red-700 bg-red-100 border-red-200",
};

export default function EquipmentPage() {
  const [filter, setFilter] = useState("All");

  const filteredEquipment =
    filter === "All"
      ? equipmentList
      : equipmentList.filter((eq) => eq.status === filter);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <main className="flex flex-col gap-8">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              <Truck className="h-4 w-4" />
              Flota y Activos
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
              Gestión de Equipos
            </h1>
            <p className="max-w-xl text-base text-zinc-500">
              Controla el estado, ubicación y mantenimiento de la maquinaria.
            </p>
          </div>
          <Link
            href="/equipment/new"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-zinc-200 transition hover:bg-zinc-800 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Nuevo Equipo
          </Link>
        </header>

        {/* Controls: Search & Filter */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between rounded-3xl border border-zinc-200 bg-white p-2 pl-6 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <Search className="h-5 w-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar por ID, nombre o tipo..."
              className="w-full bg-transparent text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 p-2">
            <div className="h-8 w-px bg-zinc-200 mx-2 hidden sm:block" />
            {["All", "Operational", "Maintenance", "Out of Service"].map((status) => (
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
                {status === "All" ? "Todos" : status === "Operational" ? "Operativo" : status === "Maintenance" ? "Mantención" : "Fuera de Servicio"}
              </button>
            ))}
          </div>
        </section>

        {/* Equipment Grid */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEquipment.map((eq) => (
            <div
              key={eq.id}
              className="group flex flex-col justify-between rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs font-bold text-zinc-400">
                    {eq.id}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide border",
                      statusColor[eq.status]
                    )}
                  >
                    {eq.status === "Operational" ? "Operativo" : eq.status === "Maintenance" ? "Mantención" : "Fuera de Servicio"}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600">
                    <Truck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 leading-tight">
                      {eq.name}
                    </h3>
                    <p className="text-sm font-medium text-zinc-500 mt-1">
                      {eq.type}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 w-full border border-zinc-100">
                    <Gauge className="h-4 w-4 text-zinc-400" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase text-zinc-400">Horómetro</span>
                      <span className="text-sm font-bold text-zinc-700">{eq.hours.toLocaleString()} hrs</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4">
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <div className="h-2 w-2 rounded-full bg-zinc-300" />
                  <span className="text-xs font-semibold">{eq.location}</span>
                </div>
                <Link href="#" className="flex items-center justify-center rounded-full sm:opacity-0 sm:group-hover:opacity-100 transition-all p-2 hover:bg-zinc-100">
                  <ArrowUpRight className="h-4 w-4 text-zinc-400" />
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
