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

export default function NewEquipmentPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock submission handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Redirect back to list
        router.push("/equipment");
    };

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
            <main className="flex flex-col gap-8">
                {/* Header */}
                <header className="flex flex-col gap-4">
                    <Link
                        href="/equipment"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Volver a Equipos
                    </Link>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
                            Nuevo Equipo
                        </h1>
                        <p className="text-base text-zinc-500">
                            Registra una nueva maquinaria o activo en la flota del taller.
                        </p>
                    </div>
                </header>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
                >
                    <div className="grid gap-8 sm:grid-cols-2">
                        {/* Name */}
                        <div className="flex flex-col gap-3">
                            <label htmlFor="name" className="text-sm font-bold text-zinc-900">
                                Nombre del Equipo <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Ej: Excavadora CAT 320"
                                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                            />
                        </div>

                        {/* ID */}
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
                                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                            />
                        </div>

                        {/* Type */}
                        <div className="flex flex-col gap-3">
                            <label htmlFor="type" className="text-sm font-bold text-zinc-900">
                                Tipo de Equipo <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="type"
                                    name="type"
                                    required
                                    defaultValue=""
                                    className="w-full appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                                >
                                    <option value="" disabled>Selecciona el tipo...</option>
                                    <option value="Maquinaria Pesada">Maquinaria Pesada</option>
                                    <option value="Transporte">Transporte</option>
                                    <option value="Perforación">Perforación</option>
                                    <option value="Carga">Carga</option>
                                    <option value="Apoyo">Apoyo</option>
                                    <option value="Vehículo Liviano">Vehículo Liviano</option>
                                </select>
                                <Truck className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                            </div>
                        </div>

                        {/* Model */}
                        <div className="flex flex-col gap-3">
                            <label htmlFor="model" className="text-sm font-bold text-zinc-900">
                                Modelo / Marca
                            </label>
                            <div className="relative">
                                <input
                                    id="model"
                                    name="model"
                                    type="text"
                                    placeholder="Ej: Cartepillar 320 GC"
                                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                                />
                                <Settings className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                            </div>
                        </div>

                        {/* Status */}
                        <div className="flex flex-col gap-3">
                            <label htmlFor="status" className="text-sm font-bold text-zinc-900">
                                Estado Inicial <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="status"
                                    name="status"
                                    required
                                    defaultValue="Operational"
                                    className="w-full appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                                >
                                    <option value="Operational">Operativo</option>
                                    <option value="Maintenance">En Mantenimiento</option>
                                    <option value="Out of Service">Fuera de Servicio</option>
                                </select>
                                <ShieldCheck className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex flex-col gap-3">
                            <label htmlFor="location" className="text-sm font-bold text-zinc-900">
                                Ubicación Actual
                            </label>
                            <div className="relative">
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    placeholder="Ej: Mina Norte - Frente 4"
                                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                                />
                                <MapPin className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                            </div>
                        </div>

                        {/* Initial Hours */}
                        <div className="flex flex-col gap-3">
                            <label htmlFor="hours" className="text-sm font-bold text-zinc-900">
                                Horómetro Inicial
                            </label>
                            <div className="relative">
                                <input
                                    id="hours"
                                    name="hours"
                                    type="number"
                                    placeholder="0"
                                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
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
                                    Guardar Equipo
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
