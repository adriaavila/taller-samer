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
    { id: "EQ-001", name: "BOBCAT", type: "Maquinaria", status: "Operativo", location: "Obra", hours: 0, nextServiceHours: 250, bay: "Bahía 1" },
    { id: "EQ-002", name: "COMPRESOR SULLAIR", type: "Maquinaria", status: "Operativo", location: "Taller", hours: 0, nextServiceHours: 250, bay: "Bahía 1" },
    { id: "EQ-003", name: "EQUIPOS MENORES", type: "Varios", status: "Operativo", location: "Almacén", hours: 0, nextServiceHours: 250, bay: "Almacén" },
    { id: "EQ-004", name: "PLANTA ASFALTO SLB8", type: "Planta", status: "Operativo", location: "Planta", hours: 0, nextServiceHours: 250, bay: "Planta" },
    { id: "EQ-005", name: "VIBROCOMPACTADOR GASOLINA", type: "Maquinaria", status: "Operativo", location: "Obra", hours: 0, nextServiceHours: 250, bay: "Bahía 1" },
    { id: "EQ-006", name: "VIBROCOMPACTADOR INGERSOLL RAND", type: "Maquinaria", status: "En mantenimiento", location: "Taller", hours: 0, nextServiceHours: 250, bay: "Bahía 2" },
    { id: "EQ-007", name: "VOLQUETA DONG FENG 3152 BHN", type: "Transporte", status: "Operativo", location: "Ruta", hours: 0, nextServiceHours: 250, bay: "Ruta" },
    { id: "EQ-008", name: "VOLQUETA DONG FENG 3787 UHN", type: "Transporte", status: "Operativo", location: "Ruta", hours: 0, nextServiceHours: 250, bay: "Ruta" },
    { id: "VH-001", name: "AUTOMOVIL NISSAN MARCH 2751UZT", type: "Vehículo Liviano", status: "Operativo", location: "Oficina", hours: 0, nextServiceHours: 250, bay: "Oficina" },
    { id: "VH-002", name: "CAMIONETA GREAT WALL 4146HUH", type: "Vehículo Liviano", status: "Operativo", location: "Campo", hours: 0, nextServiceHours: 250, bay: "Bahía 1" },
    { id: "VH-003", name: "CAMIONETA NISSAN FRONTIER 1322CAG", type: "Vehículo Liviano", status: "Operativo", location: "Campo", hours: 0, nextServiceHours: 250, bay: "Bahía 1" },
    { id: "VH-004", name: "CAMIONETA JIN BEI 3481 GAF", type: "Vehículo Liviano", status: "Operativo", location: "Campo", hours: 0, nextServiceHours: 250, bay: "Bahía 1" },
    { id: "VH-005", name: "VAGONETA TUCSON 6411DUK", type: "Vehículo Liviano", status: "Operativo", location: "Oficina", hours: 0, nextServiceHours: 250, bay: "Oficina" },
    { id: "VH-006", name: "VAGONETA WILLYS 011DDK", type: "Vehículo Liviano", status: "En mantenimiento", location: "Taller", hours: 0, nextServiceHours: 250, bay: "Bahía 2" },
    { id: "VH-007", name: "MOTOCICLETA BOXER 5522YSX", type: "Vehículo Liviano", status: "Operativo", location: "Mensajería", hours: 0, nextServiceHours: 250, bay: "Mensajería" },
    { id: "VH-008", name: "MOTOCICLETA UM 6609NII", type: "Vehículo Liviano", status: "Operativo", location: "Mensajería", hours: 0, nextServiceHours: 250, bay: "Mensajería" },
];

export const INITIAL_TIME_LOGS: TimeLog[] = [];

export const EQUIPMENT_BY_ID = Object.fromEntries(
  EQUIPMENT_LIST.map((equipment) => [equipment.id, equipment]),
) as Record<string, Equipment>;

