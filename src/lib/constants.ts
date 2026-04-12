export type EquipmentStatus =
  | "Operativo"
  | "En mantenimiento"
  | "Fuera de servicio";

export type WorkerStatus =
  | "Disponible"
  | "Asignado"
  | "En campo"
  | "Descanso";

export type WorkerShift = "Mañana" | "Tarde" | "Mixto";

export type WorkOrderStatus =
  | "Pendiente"
  | "En progreso"
  | "Completada"
  | "Bloqueada";

export type WorkOrderPriority = "Crítica" | "Alta" | "Media" | "Baja";

export type WorkOrderType = "Preventivo" | "Correctivo" | "Predictivo";

export interface Equipment {
  id: string;
  name: string;
  type: string;
  status: EquipmentStatus;
  location: string;
  hours: number;
  nextServiceHours: number;
  bay: string;
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  specialty: string;
  shift: WorkerShift;
  status: WorkerStatus;
  phone: string;
  workload: number;
  activeWorkOrderId?: string;
}

export interface WorkOrder {
  id: string;
  title: string;
  equipmentId: string;
  type: WorkOrderType;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  assignedTo: string;
  scheduledDate: string;
  estimatedHours: number;
  progress: number;
  bay: string;
  description: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  meta: string;
  timestamp: string;
}

export interface AlertItem {
  id: string;
  title: string;
  detail: string;
  level: "Crítica" | "Seguimiento" | "Info";
  href: string;
}

export interface ChartDatum {
  name: string;
  value: number;
}

export interface TeamHoursDatum {
  name: string;
  hours: number;
}

export const EQUIPMENT_STATUS_OPTIONS = [
  "Todos",
  "Operativo",
  "En mantenimiento",
  "Fuera de servicio",
] as const;

export const WORK_ORDER_STATUS_OPTIONS = [
  "Todos",
  "Pendiente",
  "En progreso",
  "Completada",
  "Bloqueada",
] as const;

export const EQUIPMENT_LIST: Equipment[] = [
  {
    id: "EQ-001",
    name: "Bobcat S550",
    type: "Carga",
    status: "En mantenimiento",
    location: "Bahía 2",
    hours: 2487,
    nextServiceHours: 2500,
    bay: "Bahía 2",
  },
  {
    id: "EQ-002",
    name: "Compresor Sullair 375",
    type: "Apoyo",
    status: "Operativo",
    location: "Patio norte",
    hours: 1136,
    nextServiceHours: 1200,
    bay: "Patio",
  },
  {
    id: "EQ-003",
    name: "Planta asfalto SLB8",
    type: "Planta",
    status: "Operativo",
    location: "Línea de producción",
    hours: 5320,
    nextServiceHours: 5500,
    bay: "Planta",
  },
  {
    id: "EQ-004",
    name: "Vibrocompactador Ingersoll Rand",
    type: "Compactación",
    status: "Fuera de servicio",
    location: "Zona de espera",
    hours: 1970,
    nextServiceHours: 2000,
    bay: "Bahía 3",
  },
  {
    id: "EQ-005",
    name: "Volqueta Dong Feng 3152 BHN",
    type: "Transporte",
    status: "Operativo",
    location: "Frente sur",
    hours: 842,
    nextServiceHours: 900,
    bay: "Ruta",
  },
  {
    id: "EQ-006",
    name: "Volqueta Dong Feng 3787 UHN",
    type: "Transporte",
    status: "Operativo",
    location: "Cantera",
    hours: 910,
    nextServiceHours: 1000,
    bay: "Ruta",
  },
  {
    id: "VH-001",
    name: "Camioneta Nissan Frontier 1322 CAG",
    type: "Vehículo liviano",
    status: "Operativo",
    location: "Campo",
    hours: 464,
    nextServiceHours: 500,
    bay: "Campo",
  },
  {
    id: "VH-002",
    name: "Motocicleta Boxer 5522 YSX",
    type: "Mensajería",
    status: "Operativo",
    location: "Almacén",
    hours: 286,
    nextServiceHours: 300,
    bay: "Mensajería",
  },
];

export const WORKERS_LIST: Worker[] = [
  {
    id: "P-001",
    name: "Jesús Valenzuela",
    role: "Jefe de taller",
    specialty: "Coordinación y mecánica general",
    shift: "Mañana",
    status: "Asignado",
    phone: "+591 70123451",
    workload: 82,
    activeWorkOrderId: "OT-2026-015",
  },
];

export const WORK_ORDER_LIST: WorkOrder[] = [
  {
    id: "OT-2026-014",
    title: "Diagnóstico de sistema hidráulico",
    equipmentId: "EQ-001",
    type: "Correctivo",
    priority: "Crítica",
    status: "En progreso",
    assignedTo: "P-002",
    scheduledDate: "2026-04-09",
    estimatedHours: 6,
    progress: 65,
    bay: "Bahía 2",
    description: "Revisar pérdida de presión en cilindro principal y validar sello del pistón.",
  },
  {
    id: "OT-2026-015",
    title: "Cambio de aceite y filtros",
    equipmentId: "EQ-005",
    type: "Preventivo",
    priority: "Media",
    status: "Pendiente",
    assignedTo: "P-001",
    scheduledDate: "2026-04-10",
    estimatedHours: 4,
    progress: 0,
    bay: "Bahía 1",
    description: "Servicio de 900 horas con cambio de aceite, filtro primario y secundario.",
  },
  {
    id: "OT-2026-012",
    title: "Refuerzo de tolva y soldadura lateral",
    equipmentId: "EQ-006",
    type: "Correctivo",
    priority: "Alta",
    status: "En progreso",
    assignedTo: "P-004",
    scheduledDate: "2026-04-09",
    estimatedHours: 8,
    progress: 40,
    bay: "Patio exterior",
    description: "Recuperar fisura lateral en tolva y reemplazar platina desgastada.",
  },
  {
    id: "OT-2026-011",
    title: "Calibración de tablero y sensores",
    equipmentId: "EQ-003",
    type: "Predictivo",
    priority: "Alta",
    status: "Completada",
    assignedTo: "P-003",
    scheduledDate: "2026-04-08",
    estimatedHours: 5,
    progress: 100,
    bay: "Planta",
    description: "Calibración preventiva del tablero principal y validación de sensores de temperatura.",
  },
  {
    id: "OT-2026-010",
    title: "Cambio de rodamiento delantero",
    equipmentId: "EQ-004",
    type: "Correctivo",
    priority: "Alta",
    status: "Bloqueada",
    assignedTo: "P-006",
    scheduledDate: "2026-04-11",
    estimatedHours: 7,
    progress: 15,
    bay: "Bahía 3",
    description: "Equipo detenido hasta recepción de repuesto y alineación final.",
  },
  {
    id: "OT-2026-009",
    title: "Revisión de sistema de luces",
    equipmentId: "VH-001",
    type: "Preventivo",
    priority: "Baja",
    status: "Completada",
    assignedTo: "P-003",
    scheduledDate: "2026-04-07",
    estimatedHours: 2,
    progress: 100,
    bay: "Campo",
    description: "Cambio de fusible, prueba de relé y revisión de cableado de luces traseras.",
  },
];

export const OPERATION_ALERTS: AlertItem[] = [
  {
    id: "alert-1",
    title: "Bobcat en bahía 2 con prioridad crítica",
    detail: "La OT-2026-014 sigue abierta y compromete la salida del frente norte.",
    level: "Crítica",
    href: "/work-orders",
  },
  {
    id: "alert-2",
    title: "Compactador fuera de servicio",
    detail: "EQ-004 espera repuesto para cerrar la OT-2026-010.",
    level: "Seguimiento",
    href: "/equipment",
  },
  {
    id: "alert-3",
    title: "Servicio preventivo programado mañana",
    detail: "La volqueta EQ-005 vence servicio de 900 horas en el próximo turno.",
    level: "Info",
    href: "/work-orders/new",
  },
];

export const ACTIVITY_FEED: ActivityItem[] = [
  {
    id: "activity-1",
    title: "Rosa Fernández avanzó 65% de la OT-2026-014",
    meta: "Bobcat S550 · Bahía 2",
    timestamp: "Hace 12 min",
  },
  {
    id: "activity-2",
    title: "Diego Mamani cerró la calibración del tablero principal",
    meta: "Planta asfalto SLB8 · OT-2026-011",
    timestamp: "Hace 35 min",
  },
  {
    id: "activity-3",
    title: "Andrea Salvatierra completó checklist de apertura",
    meta: "Taller central · Turno mañana",
    timestamp: "Hace 1 h",
  },
  {
    id: "activity-4",
    title: "Se programó el preventivo de la volqueta 3152 BHN",
    meta: "OT-2026-015 · Servicio de 900 horas",
    timestamp: "Hace 2 h",
  },
];

export const HOURS_BY_TEAM: TeamHoursDatum[] = [
  { name: "Mecánica", hours: 34 },
  { name: "Hidráulica", hours: 18 },
  { name: "Eléctrica", hours: 21 },
  { name: "Soldadura", hours: 12 },
  { name: "Apoyo", hours: 14 },
];

export const LABOR_COST_DATA: ChartDatum[] = [
  { name: "Mecánica", value: 3200 },
  { name: "Hidráulica", value: 2100 },
  { name: "Eléctrica", value: 1700 },
  { name: "Apoyo", value: 950 },
];

export const EQUIPMENT_BY_ID = Object.fromEntries(
  EQUIPMENT_LIST.map((equipment) => [equipment.id, equipment]),
) as Record<string, Equipment>;

export const WORKERS_BY_ID = Object.fromEntries(
  WORKERS_LIST.map((worker) => [worker.id, worker]),
) as Record<string, Worker>;
