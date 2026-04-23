"use client";

import { useState } from "react";
import { Calendar, Clock, Wrench } from "lucide-react";
import { DictationTextarea } from "@/components/dictation-textarea";
import { useTaller } from "@/components/taller-provider";
import { useRouter } from "next/navigation";

export default function LogHoursPage() {
  const router = useRouter();
  const { equipment, addTimeLog } = useTaller();
  const today = new Date().toISOString().split("T")[0];

  const [equipmentId, setEquipmentId] = useState(equipment[0]?.id || "");
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("17:00");
  const [description, setDescription] = useState("");

  const calculateHours = (start: string, end: string) => {
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);
    
    let diff = (endH * 60 + endM) - (startH * 60 + startM);
    if (diff < 0) diff += 24 * 60; // Handle overnight shifts if necessary
    
    return diff / 60;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!equipmentId || !date || !startTime || !endTime || !description) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    const calculatedHours = calculateHours(startTime, endTime);
    if (calculatedHours <= 0) {
      alert("La hora de fin debe ser posterior a la de inicio.");
      return;
    }

    addTimeLog({
      equipmentId,
      date,
      startTime,
      endTime,
      hours: calculatedHours,
      description,
    });

    router.push("/");
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <main className="flex flex-col gap-10">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-700">
              1
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              Nuevo Registro
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Registrar Horas
          </h1>
          <p className="max-w-2xl text-lg text-zinc-500">
            Ingresa las horas de trabajo realizadas en un equipo específico para mantener el historial actualizado.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-premium">
          <div className="border-b border-zinc-100 bg-zinc-50/50 px-6 py-4 sm:px-8">
            <h2 className="text-sm font-semibold text-zinc-900">Detalles del Trabajo</h2>
          </div>

          <div className="flex flex-col gap-8 p-6 sm:p-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="equipment"
                  className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900"
                >
                  <Wrench className="h-4 w-4 text-zinc-400" />
                  Equipo <span className="text-red-500">*</span>
                </label>
                <select
                  id="equipment"
                  value={equipmentId}
                  onChange={(e) => setEquipmentId(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                  required
                >
                  {equipment.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-3">
                <label
                  htmlFor="date"
                  className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900"
                >
                  <Calendar className="h-4 w-4 text-zinc-400" />
                  Fecha <span className="text-red-500">*</span>
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                  required
                />
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="startTime"
                  className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900"
                >
                  <Clock className="h-4 w-4 text-zinc-400" />
                  Hora Inicio <span className="text-red-500">*</span>
                </label>
                <input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                  required
                />
              </div>

              <div className="flex flex-col gap-3">
                <label
                  htmlFor="endTime"
                  className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900"
                >
                  <Clock className="h-4 w-4 text-zinc-400" />
                  Hora Fin <span className="text-red-500">*</span>
                </label>
                <input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base text-zinc-900 transition outline-none focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5"
                  required
                />
              </div>
            </div>

            <DictationTextarea
              label={
                <>
                  Descripción del Trabajo <span className="text-red-500">*</span>
                </>
              }
              value={description}
              onChange={setDescription}
              rows={5}
              placeholder="Describe las tareas realizadas, reparaciones o novedades..."
              required
            />

            <div className="mt-4 flex flex-col gap-4 border-t border-zinc-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-medium text-zinc-400">
                <span className="text-red-500">*</span> Campos obligatorios.
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEquipmentId(equipment[0]?.id || "");
                    setDate(today);
                    setHours(1);
                    setDescription("");
                  }}
                  className="flex-1 rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm font-bold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900 active:scale-95 sm:flex-none"
                >
                  Limpiar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-2xl bg-zinc-900 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-zinc-200 transition hover:bg-zinc-800 hover:shadow-zinc-300 active:scale-95 sm:flex-none"
                >
                  Guardar Registro
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
