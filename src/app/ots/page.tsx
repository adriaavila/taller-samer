"use client";

import { useMemo, useState } from "react";
import { ClipboardList, Plus, Wrench } from "lucide-react";
import { equipmentData, workOrdersData } from "@/lib/data";

const statusOptions = ["Abierta", "En progreso", "En revisión", "Cerrada"] as const;
const priorityOptions = ["Alta", "Media", "Baja"] as const;

export default function OtsPage() {
  const [orders, setOrders] = useState(workOrdersData);
  const [title, setTitle] = useState("");
  const [equipmentId, setEquipmentId] = useState(equipmentData[0]?.id ?? "");
  const [priority, setPriority] = useState<(typeof priorityOptions)[number]>("Media");
  const [status, setStatus] = useState<(typeof statusOptions)[number]>("Abierta");

  const equipmentMap = useMemo(
    () => new Map(equipmentData.map((item) => [item.id, item])),
    []
  );

  const updateOrder = (
    id: string,
    updates: Partial<(typeof orders)[number]>
  ) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, ...updates } : order))
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    const newOrder = {
      id: `OT-${2400 + orders.length + 1}`,
      title: title.trim(),
      equipmentId,
      status,
      priority,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setTitle("");
    setPriority("Media");
    setStatus("Abierta");
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <main className="flex flex-col gap-8">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            <ClipboardList className="h-4 w-4" />
            Órdenes de trabajo
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
            Crear y gestionar OTs
          </h1>
          <p className="max-w-2xl text-base text-zinc-500">
            Registra nuevas órdenes y monitorea su estado desde un tablero único.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                <Plus className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900">Nueva OT</p>
                <p className="text-xs text-zinc-500">Completa los datos esenciales</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                Descripción
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Ej: Ajuste hidráulico y prueba de carga"
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                Equipo asociado
                <select
                  value={equipmentId}
                  onChange={(event) => setEquipmentId(event.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                >
                  {equipmentData.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.id} · {item.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                  Prioridad
                  <select
                    value={priority}
                    onChange={(event) => setPriority(event.target.value as typeof priority)}
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                  >
                    {priorityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                  Estado inicial
                  <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value as typeof status)}
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 transition focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5 outline-none"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-200 transition hover:bg-zinc-800"
            >
              <Wrench className="h-4 w-4" />
              Crear OT
            </button>
          </form>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-zinc-900">Resumen operativo</h2>
            <p className="mt-2 text-sm text-zinc-500">
              {orders.filter((order) => order.status !== "Cerrada").length} OTs activas ·
              {" "}
              {orders.filter((order) => order.priority === "Alta").length} con prioridad alta.
            </p>
            <div className="mt-6 space-y-4">
              {orders.slice(0, 4).map((order) => {
                const equipment = equipmentMap.get(order.equipmentId);
                return (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-zinc-100 bg-zinc-50/70 px-4 py-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-zinc-900">{order.id}</p>
                      <span className="rounded-full bg-zinc-900/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-700">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500">{order.title}</p>
                    <p className="mt-1 text-xs text-zinc-400">
                      {equipment?.name} · Prioridad {order.priority}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-zinc-900">Todas las OTs</h2>
          <div className="mt-6 space-y-4">
            {orders.map((order) => {
              const equipment = equipmentMap.get(order.equipmentId);
              return (
                <div
                  key={order.id}
                  className="flex flex-col gap-3 rounded-2xl border border-zinc-100 bg-zinc-50/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{order.title}</p>
                    <p className="text-xs text-zinc-500">
                      {order.id} · {equipment?.name}
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">Creada {order.createdAt}</p>
                  </div>
                  <div className="flex flex-col gap-2 sm:items-end">
                    <label className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                      Estado
                      <select
                        value={order.status}
                        onChange={(event) =>
                          updateOrder(order.id, {
                            status: event.target.value as typeof status,
                          })
                        }
                        className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700"
                      >
                        {statusOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                      Prioridad
                      <select
                        value={order.priority}
                        onChange={(event) =>
                          updateOrder(order.id, {
                            priority: event.target.value as typeof priority,
                          })
                        }
                        className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700"
                      >
                        {priorityOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
