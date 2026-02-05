"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useMutation, useQuery } from "convex/react";
import type { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import Toast from "@/components/Toast";

type ToastState = { message: string; type: "success" | "error" } | null;

const defaultTimes = {
  start: "08:00",
  end: "17:00",
};

export default function Home() {
  const workOrders =
    useQuery(api.workOrders.getActiveWorkOrders as any) ?? [];
  const technicians = useQuery(api.users.getTechnicians as any) ?? [];
  const registerTimeLog = useMutation(api.timeLogs.registerTimeLog as any);

  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );
  const [startTime, setStartTime] = useState(defaultTimes.start);
  const [endTime, setEndTime] = useState(defaultTimes.end);
  const [description, setDescription] = useState("");
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState<
    Id<"workOrders"> | ""
  >("");
  const [selectedTechnicianId, setSelectedTechnicianId] = useState<
    Id<"users"> | ""
  >("");
  const [otQuery, setOtQuery] = useState("");
  const [isOtOpen, setIsOtOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (technicians.length > 0 && !selectedTechnicianId) {
      setSelectedTechnicianId(technicians[0]._id);
    }
  }, [selectedTechnicianId, technicians]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || (window as typeof window & any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    setSpeechSupported(true);
    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join(" ")
        .trim();
      if (transcript) {
        setDescription((prev) => `${prev}${prev ? " " : ""}${transcript}`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setToast({
        message: "No se pudo capturar el dictado.",
        type: "error",
      });
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const selectedWorkOrderLabel = useMemo(() => {
    const selected = workOrders.find(
      (order: { _id: Id<"workOrders"> }) => order._id === selectedWorkOrderId,
    );
    return selected ? `${selected.otCode} · ${selected.title}` : "";
  }, [selectedWorkOrderId, workOrders]);

  const filteredWorkOrders = useMemo(() => {
    const query = otQuery.trim().toLowerCase();
    if (!query) {
      return workOrders;
    }

    return workOrders.filter((order: { otCode: string; title: string }) =>
      `${order.otCode} ${order.title}`.toLowerCase().includes(query),
    );
  }, [otQuery, workOrders]);

  const resetForm = () => {
    setStartTime(defaultTimes.start);
    setEndTime(defaultTimes.end);
    setDescription("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedTechnicianId || !selectedWorkOrderId) {
      setToast({
        message: "Selecciona una OT activa y un técnico.",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await registerTimeLog({
        userId: selectedTechnicianId,
        workOrderId: selectedWorkOrderId,
        date,
        startTime,
        endTime,
        description,
      });
      setToast({
        message: "Horas registradas correctamente.",
        type: "success",
      });
      resetForm();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo registrar.";
      setToast({ message, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      setToast({
        message: "El navegador no soporta dictado por voz.",
        type: "error",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      return;
    }

    setIsListening(true);
    recognitionRef.current.start();
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900 sm:px-10 lg:px-16">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Registro de horas
          </span>
          <h1 className="text-3xl font-semibold text-zinc-900 sm:text-4xl">
            Mejora tu registro diario con un formulario claro y guiado
          </h1>
          <p className="max-w-2xl text-base text-zinc-600">
            Completa los detalles de tu jornada en un solo lugar. Todos los
            campos obligatorios están marcados con un asterisco.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10"
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-zinc-900" htmlFor="fecha">
                Fecha
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  id="fecha"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700"
                />
                <span className="text-xs text-zinc-500">
                  Asegúrate de seleccionar el día correcto.
                </span>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-900">
                  Técnico
                </label>
                <select
                  value={selectedTechnicianId}
                  onChange={(event) =>
                    setSelectedTechnicianId(event.target.value as Id<"users">)
                  }
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
                >
                  {technicians.length === 0 && (
                    <option value="">Sin técnicos cargados</option>
                  )}
                  {technicians.map((tech: { _id: Id<"users">; name: string }) => (
                    <option key={tech._id} value={tech._id}>
                      {tech.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-900">
                  Orden de Trabajo
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={otQuery || selectedWorkOrderLabel}
                    onChange={(event) => {
                      setOtQuery(event.target.value);
                      setSelectedWorkOrderId("");
                      setIsOtOpen(true);
                    }}
                    onFocus={() => setIsOtOpen(true)}
                    onBlur={() => {
                      window.setTimeout(() => setIsOtOpen(false), 120);
                    }}
                    placeholder="Busca por código o descripción"
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
                    aria-expanded={isOtOpen}
                    aria-autocomplete="list"
                  />
                  {isOtOpen && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-10 max-h-56 overflow-auto rounded-2xl border border-zinc-200 bg-white p-2 shadow-lg">
                      {filteredWorkOrders.length === 0 && (
                        <p className="px-3 py-2 text-sm text-zinc-500">
                          No hay OTs activas con ese criterio.
                        </p>
                      )}
                      {filteredWorkOrders.map(
                        (order: {
                          _id: Id<"workOrders">;
                          otCode: string;
                          title: string;
                        }) => (
                          <button
                            type="button"
                            key={order._id}
                            onMouseDown={() => {
                              setSelectedWorkOrderId(order._id);
                              setOtQuery(`${order.otCode} · ${order.title}`);
                              setIsOtOpen(false);
                            }}
                            className="flex w-full flex-col rounded-xl px-3 py-2 text-left transition hover:bg-zinc-100"
                          >
                            <span className="text-sm font-semibold text-zinc-900">
                              {order.otCode}
                            </span>
                            <span className="text-xs text-zinc-500">
                              {order.title}
                            </span>
                          </button>
                        ),
                      )}
                    </div>
                  )}
                </div>
                <p className="text-sm text-zinc-500">
                  Puedes editar el tipo de falla y mantenimiento después en
                  &quot;OT&quot;.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-900">
                Horas de Trabajo <span className="text-red-500">*</span>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-zinc-500">
                    Hora Inicial <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(event) => setStartTime(event.target.value)}
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-zinc-500">
                    Hora Final <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(event) => setEndTime(event.target.value)}
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-900">
                Trabajo Ejecutado <span className="text-red-500">*</span>{" "}
                <span className="text-xs font-normal text-zinc-500">
                  (Con entrada de voz principal)
                </span>
              </label>
              <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>Describe las tareas realizadas</span>
                  <button
                    type="button"
                    onClick={toggleListening}
                    disabled={!speechSupported}
                    className={`rounded-full px-3 py-1 text-xs font-semibold text-white transition ${
                      isListening ? "animate-pulse bg-emerald-500" : "bg-zinc-900"
                    } disabled:cursor-not-allowed disabled:bg-zinc-300`}
                  >
                    {!speechSupported
                      ? "Dictado no disponible"
                      : isListening
                        ? "Escuchando..."
                        : "🎙️ Dictar"}
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Ejemplo: Inspección general, cambio de filtros y ajuste de presión."
                  className="w-full resize-none border-none bg-transparent text-base text-zinc-900 outline-none placeholder:text-zinc-400"
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-zinc-500">
                * Campos obligatorios para registrar la jornada.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="rounded-full border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-900"
                >
                  Guardar borrador
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
                >
                  {isSubmitting && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  )}
                  {isSubmitting ? "Guardando..." : "Registrar horas"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>

      {toast && (
        <div className="fixed right-6 top-6 z-50">
          <Toast
            message={toast.message}
            type={toast.type}
            onDismiss={() => setToast(null)}
          />
        </div>
      )}
    </div>
  );
}
