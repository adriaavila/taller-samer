"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Gauge,
  MapPin,
  Settings,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { EQUIPMENT_LIST } from "@/lib/constants";
import { getHoursToService } from "@/lib/taller";

export default function NewEquipmentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/equipment");
  };

  const closestService = [...EQUIPMENT_LIST]
    .sort(
      (a, b) =>
        getHoursToService(a.hours, a.nextServiceHours) -
        getHoursToService(b.hours, b.nextServiceHours),
    )
    .slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <main className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="flex flex-col gap-8">
          <header className="flex flex-col gap-4">
            <Link
              href="/equipment"
              className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a equipos
            </Link>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
                Nuevo equipo
              </h1>
              <p className="text-base text-zinc-500">
                Registra un activo con la información mínima para ubicarlo, medir su ciclo de servicio y conectarlo al flujo de mantenimiento.
              </p>
            </div>
          </header>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <label htmlFor="name" className="text-sm font-bold text-zinc-900">
                  Nombre del equipo <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Ej: Excavadora CAT 320"
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="id" className="text-sm font-bold text-zinc-900">
                  Identificador (ID) <span className="text-red-500">*</span>
                </label>
                <input
                  id="id"
                  name="id"
                  type="text"
                  required
                  placeholder="Ej: EQ-106"
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="type" className="text-sm font-bold text-zinc-900">
                  Tipo de equipo <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="type"
                    name="type"
                    required
                    defaultValue=""
                    className="w-full appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                  >
                    <option value="" disabled>
                      Selecciona el tipo...
                    </option>
                    <option value="Maquinaria pesada">Maquinaria pesada</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Compactación">Compactación</option>
                    <option value="Carga">Carga</option>
                    <option value="Apoyo">Apoyo</option>
                    <option value="Vehículo liviano">Vehículo liviano</option>
                  </select>
                  <Truck className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="model" className="text-sm font-bold text-zinc-900">
                  Modelo / marca
                </label>
                <div className="relative">
                  <input
                    id="model"
                    name="model"
                    type="text"
                    placeholder="Ej: Caterpillar 320 GC"
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                  />
                  <Settings className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="status" className="text-sm font-bold text-zinc-900">
                  Estado inicial <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="status"
                    name="status"
                    required
                    defaultValue="Operativo"
                    className="w-full appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                  >
                    <option value="Operativo">Operativo</option>
                    <option value="En mantenimiento">En mantenimiento</option>
                    <option value="Fuera de servicio">Fuera de servicio</option>
                  </select>
                  <ShieldCheck className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="location" className="text-sm font-bold text-zinc-900">
                  Ubicación actual
                </label>
                <div className="relative">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Ej: Mina norte - Frente 4"
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                  />
                  <MapPin className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="hours" className="text-sm font-bold text-zinc-900">
                  Horómetro inicial
                </label>
                <div className="relative">
                  <input
                    id="hours"
                    name="hours"
                    type="number"
                    placeholder="0"
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                  />
                  <Gauge className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-zinc-100 pt-6">
              <Link
                href="/equipment"
                className="rounded-2xl border border-zinc-200 px-6 py-3 text-sm font-bold text-zinc-600 transition hover:bg-zinc-50 active:scale-95"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-zinc-200 transition hover:bg-zinc-800 disabled:opacity-50 active:scale-95"
              >
                {isSubmitting ? (
                  "Guardando..."
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Guardar equipo
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        <aside className="flex flex-col gap-5">
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">
              Referencia de flota
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              Antes de crear un nuevo activo, revisa los equipos más próximos a servicio.
            </p>
            <div className="mt-5 space-y-3">
              {closestService.map((equipment) => (
                <div
                  key={equipment.id}
                  className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-4"
                >
                  <p className="text-sm font-semibold text-zinc-900">{equipment.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {equipment.id} · faltan{" "}
                    {getHoursToService(equipment.hours, equipment.nextServiceHours)} h
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">Dato mínimo sugerido</h2>
            <div className="mt-5 space-y-3 text-sm text-zinc-600">
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                Identificador único visible en taller y reportes.
              </div>
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                Ubicación inicial para evitar equipos &quot;perdidos&quot; en la operación.
              </div>
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                Horómetro real para programar mantenimientos desde el primer día.
              </div>
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
