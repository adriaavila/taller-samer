import type {
  EquipmentStatus,
  WorkerStatus,
  WorkOrderPriority,
  WorkOrderStatus,
} from "@/lib/constants";

export const equipmentStatusStyles: Record<EquipmentStatus, string> = {
  Operativo: "border-emerald-200 bg-emerald-100 text-emerald-800",
  "En mantenimiento": "border-amber-200 bg-amber-100 text-amber-800",
  "Fuera de servicio": "border-red-200 bg-red-100 text-red-800",
};

export const workerStatusStyles: Record<WorkerStatus, string> = {
  Disponible: "border-emerald-200 bg-emerald-100 text-emerald-800",
  Asignado: "border-blue-200 bg-blue-100 text-blue-800",
  "En campo": "border-orange-200 bg-orange-100 text-orange-800",
  Descanso: "border-zinc-200 bg-zinc-100 text-zinc-700",
};

export const workOrderPriorityStyles: Record<WorkOrderPriority, string> = {
  Crítica: "border-red-200 bg-red-100 text-red-800",
  Alta: "border-orange-200 bg-orange-100 text-orange-800",
  Media: "border-amber-200 bg-amber-100 text-amber-800",
  Baja: "border-emerald-200 bg-emerald-100 text-emerald-800",
};

export const workOrderStatusStyles: Record<WorkOrderStatus, string> = {
  Pendiente: "text-amber-700",
  "En progreso": "text-blue-700",
  Completada: "text-emerald-700",
  Bloqueada: "text-red-700",
};

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export function getHoursToService(hours: number, nextServiceHours: number) {
  return Math.max(nextServiceHours - hours, 0);
}
