import type {
  EquipmentStatus,
} from "@/lib/constants";

export const equipmentStatusStyles: Record<EquipmentStatus, string> = {
  Operativo: "border-emerald-200 bg-emerald-100 text-emerald-800",
  "En mantenimiento": "border-amber-200 bg-amber-100 text-amber-800",
  "Fuera de servicio": "border-red-200 bg-red-100 text-red-800",
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
