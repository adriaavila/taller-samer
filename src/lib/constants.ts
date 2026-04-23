export type EquipmentStatus =
  | "Operativo"
  | "En mantenimiento"
  | "Fuera de servicio";

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

export interface TimeLog {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  equipmentId: string;
  hours: number;
  description: string;
}

export const EQUIPMENT_STATUS_OPTIONS = [
  "Todos",
  "Operativo",
  "En mantenimiento",
  "Fuera de servicio",
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

export const INITIAL_TIME_LOGS: TimeLog[] = [];

export const EQUIPMENT_BY_ID = Object.fromEntries(
  EQUIPMENT_LIST.map((equipment) => [equipment.id, equipment]),
) as Record<string, Equipment>;

