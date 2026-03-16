"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Calendar,
    Check,
    ClipboardList,
    User,
    Wrench,
    AlertTriangle,
} from "lucide-react";
import { EQUIPMENT_LIST, WORKERS_LIST } from "@/lib/constants";

export default function NewWorkOrderPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock submission handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Redirect back to list
        router.push("/work-orders");
    };

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
            <main className="flex flex-col gap-8">
                {/* Header */}
                <header className="flex flex-col gap-4">
                    <Link
                        href="/work-orders"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Volver a OTs
                    </Link>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
                            Nueva Orden de Trabajo
                        </h1>
                        <p className="text-base text-zinc-500">
                            Complete los detalles para crear una nueva tarea de mantenimiento.
                        </p>
                    </div>
                </header>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
                >
                    <div className="grid gap-8 sm:grid-cols-2">
                        {/* Title */}
                        <div className="flex flex-col gap-3 sm:col-span-2">
                            <label htmlFor="title" className="text-sm font-bold text-zinc-900">
                                Título de la Tarea <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                placeholder="Ej: Cambio de aceite motor"
                                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                            />
                        </div>

                        {/* Equipment */}
                        <div className="flex flex-col gap-3">
                            <label htmlFor="equipment" className="text-sm font-bold text-zinc-900">
                                Equipo Afectado <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="equipment"
                                    name="equipment"
                                    required
                                    defaultValue=""
                                    className="w-full appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                                >
                                    <option value="" disabled>
                                        Selecciona un equipo...
                                    </option>
                                    {EQUIPMENT_LIST.map((equipment) => (
                                        <option key={equipment.id} value={equipment.id}>
                                            {equipment.name} ({equipment.id})
                                        </option>
                                    ))}
                                </select>
                                <Wrench className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                            </div>
                        </div>

                        {/* Type */}
                        <div className="flex flex-col gap-3">
                            <label htmlFor="type" className="text-sm font-bold text-zinc-900">
                                Tipo de Mantenimiento <span className="text-red-500">*</span>
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
                                    <option value="Preventivo">Preventivo</option>
                                    <option value="Correctivo">Correctivo</option>
                                    <option value="Predictivo">Predictivo</option>
                                </select>
                                <ClipboardList className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                            </div>
                        </div>

                        {/* Priority */}
                        <div className="flex flex-col gap-3">
                            <label htmlFor="priority" className="text-sm font-bold text-zinc-900">
                                Prioridad <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="priority"
                                    name="priority"
                                    required
                                    defaultValue="Medium"
                                    className="w-full appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                                >
                                    <option value="Low">Baja</option>
                                    <option value="Medium">Media</option>
                                    <option value="High">Alta</option>
                                    <option value="Critical">Crítica</option>
                                </select>
                                <AlertTriangle className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                            </div>
                        </div>

                        {/* Assigned To */}
                        <div className="flex flex-col gap-3">
                            <label htmlFor="assignedTo" className="text-sm font-bold text-zinc-900">
                                Asignar Técnico
                            </label>
                            <div className="relative">
                                <select
                                    id="assignedTo"
                                    name="assignedTo"
                                    defaultValue=""
                                    className="w-full appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                                >
                                    <option value="" disabled>Selecciona un técnico (opcional)...</option>
                                    {WORKERS_LIST.map((worker) => (
                                        <option key={worker.id} value={worker.name}>
                                            {worker.name}
                                        </option>
                                    ))}
                                </select>
                                <User className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-3 sm:col-span-2">
                            <label htmlFor="description" className="text-sm font-bold text-zinc-900">
                                Descripción Detallada
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                placeholder="Detalles adicionales sobre la falla o el trabajo a realizar..."
                                className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                            />
                        </div>

                        {/* Date */}
                        <div className="flex flex-col gap-3">
                            <label htmlFor="date" className="text-sm font-bold text-zinc-900">
                                Fecha Programada
                            </label>
                            <div className="relative">
                                <input
                                    id="date"
                                    name="date"
                                    type="date"
                                    defaultValue={new Date().toISOString().split("T")[0]}
                                    className="w-full appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                                />
                                <Calendar className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 border-t border-zinc-100 pt-6">
                        <Link
                            href="/work-orders"
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
                                "Creando..."
                            ) : (
                                <>
                                    <Check className="h-4 w-4" />
                                    Crear Orden
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
