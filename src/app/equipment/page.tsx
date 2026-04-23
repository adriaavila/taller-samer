"use client";

import { useState } from "react";
import { Plus, Search, Trash2, Truck, Wrench, MapPin, Gauge } from "lucide-react";
import { useTaller } from "@/components/taller-provider";
import { cn } from "@/lib/utils";
import { EQUIPMENT_STATUS_OPTIONS, type Equipment } from "@/lib/constants";
import { equipmentStatusStyles } from "@/lib/taller";

export default function EquipmentPage() {
  const { equipment, addEquipment, updateEquipment, deleteEquipment } = useTaller();
  const [query, setQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<Equipment, "id">>({
    name: "",
    type: "",
    status: "Operativo",
    location: "Patio",
    hours: 0,
    nextServiceHours: 250,
    bay: "Bahía 1",
  });

  const filteredEquipment = equipment.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.id.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateEquipment({ ...formData, id: editingId });
      setEditingId(null);
    } else {
      addEquipment({ ...formData, id: `EQ-${Date.now().toString().slice(-3)}` });
      setIsAdding(false);
    }
    setFormData({
      name: "",
      type: "",
      status: "Operativo",
      location: "Patio",
      hours: 0,
      nextServiceHours: 250,
      bay: "Bahía 1",
    });
  };

  const startEdit = (item: Equipment) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      type: item.type,
      status: item.status,
      location: item.location,
      hours: item.hours,
      nextServiceHours: item.nextServiceHours,
      bay: item.bay,
    });
    setIsAdding(true);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <main className="flex flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">Equipos</h1>
            <p className="text-zinc-500">Configura y gestiona los activos del taller.</p>
          </div>
          <button
            onClick={() => {
              setIsAdding(!isAdding);
              setEditingId(null);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-zinc-800 active:scale-95"
          >
            {isAdding ? "Cancelar" : <><Plus className="h-4 w-4" /> Nuevo Equipo</>}
          </button>
        </header>

        {isAdding && (
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-premium sm:p-8">
            <h2 className="mb-6 text-xl font-bold text-zinc-900">
              {editingId ? "Editar Equipo" : "Agregar Nuevo Equipo"}
            </h2>
            <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-zinc-700">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900 focus:bg-white transition"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-zinc-700">Tipo</label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900 focus:bg-white transition"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-zinc-700">Estado</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900 focus:bg-white transition"
                >
                  <option value="Operativo">Operativo</option>
                  <option value="En mantenimiento">En mantenimiento</option>
                  <option value="Fuera de servicio">Fuera de servicio</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-zinc-700">Ubicación</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900 focus:bg-white transition"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-zinc-700">Horas Actuales</label>
                <input
                  type="number"
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: Number(e.target.value) })}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900 focus:bg-white transition"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-zinc-700">Próximo Servicio (h)</label>
                <input
                  type="number"
                  value={formData.nextServiceHours}
                  onChange={(e) => setFormData({ ...formData, nextServiceHours: Number(e.target.value) })}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900 focus:bg-white transition"
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="rounded-xl bg-zinc-900 px-8 py-3 text-sm font-bold text-white transition hover:bg-zinc-800"
                >
                  {editingId ? "Guardar Cambios" : "Agregar Equipo"}
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
          <Search className="h-5 w-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o ID..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm outline-none"
          />
        </section>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEquipment.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-6 transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600">
                  <Truck className="h-6 w-6" />
                </div>
                <span className={cn(
                  "rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
                  equipmentStatusStyles[item.status]
                )}>
                  {item.status}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900">{item.name}</h3>
                <p className="text-xs font-mono font-bold text-zinc-400">{item.id}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-zinc-100 pt-4">
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-zinc-400">
                    <Gauge className="h-3 w-3" /> Horas
                  </span>
                  <span className="text-sm font-bold text-zinc-700">{item.hours}h</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-zinc-400">
                    <MapPin className="h-3 w-3" /> Ubicación
                  </span>
                  <span className="text-sm font-bold text-zinc-700 truncate">{item.location}</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 mt-2">
                <button
                  onClick={() => startEdit(item)}
                  className="flex-1 rounded-xl border border-zinc-200 py-2 text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("¿Estás seguro de eliminar este equipo?")) {
                      deleteEquipment(item.id);
                    }
                  }}
                  className="flex items-center justify-center rounded-xl bg-red-50 p-2 text-red-600 hover:bg-red-100 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
