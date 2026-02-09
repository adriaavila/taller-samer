export type WorkOrderStatus = "Abierta" | "En progreso" | "En revisión" | "Cerrada";
export type WorkOrderPriority = "Alta" | "Media" | "Baja";

export interface WorkOrder {
  id: string;
  title: string;
  equipmentId: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  createdAt: string;
}

export interface Equipment {
  id: string;
  name: string;
  location: string;
  status: "Operativo" | "En mantenimiento" | "Fuera de servicio";
  lastInspection: string;
}

export interface HourLog {
  id: string;
  technician: string;
  workOrderId: string;
  startTime: string;
  endTime: string;
  notes: string;
  date: string;
}

export const equipmentData: Equipment[] = [
  {
    id: "EQ-101",
    name: "Montacarga Toyota 8FGCU25",
    location: "Bahía 2",
    status: "Operativo",
    lastInspection: "2026-02-02",
  },
  {
    id: "EQ-204",
    name: "Compresor Atlas Copco GA15",
    location: "Sala técnica",
    status: "En mantenimiento",
    lastInspection: "2026-01-28",
  },
  {
    id: "EQ-330",
    name: "Elevador hidráulico Rotary",
    location: "Bahía 4",
    status: "Operativo",
    lastInspection: "2026-02-01",
  },
  {
    id: "EQ-415",
    name: "Generador Cummins 90 kVA",
    location: "Patio norte",
    status: "Operativo",
    lastInspection: "2026-01-25",
  },
];

export const workOrdersData: WorkOrder[] = [
  {
    id: "OT-2481",
    title: "Cambio de filtros hidráulicos",
    equipmentId: "EQ-101",
    status: "En progreso",
    priority: "Alta",
    createdAt: "2026-02-05",
  },
  {
    id: "OT-2476",
    title: "Inspección de frenos",
    equipmentId: "EQ-330",
    status: "En revisión",
    priority: "Media",
    createdAt: "2026-02-04",
  },
  {
    id: "OT-2469",
    title: "Revisión de presión y fugas",
    equipmentId: "EQ-204",
    status: "Abierta",
    priority: "Alta",
    createdAt: "2026-02-03",
  },
  {
    id: "OT-2462",
    title: "Cambio de correas de transmisión",
    equipmentId: "EQ-415",
    status: "Cerrada",
    priority: "Baja",
    createdAt: "2026-02-01",
  },
];

export const hourLogsData: HourLog[] = [
  {
    id: "LOG-392",
    technician: "María Rojas",
    workOrderId: "OT-2481",
    startTime: "08:00",
    endTime: "10:30",
    notes: "Sustitución de filtros y pruebas de presión.",
    date: "2026-02-05",
  },
  {
    id: "LOG-393",
    technician: "Carlos Soto",
    workOrderId: "OT-2476",
    startTime: "10:45",
    endTime: "12:15",
    notes: "Ajuste de frenos delanteros y prueba de rodaje.",
    date: "2026-02-05",
  },
  {
    id: "LOG-394",
    technician: "Daniela Vega",
    workOrderId: "OT-2481",
    startTime: "12:30",
    endTime: "13:30",
    notes: "Verificación final y limpieza de área.",
    date: "2026-02-05",
  },
];
