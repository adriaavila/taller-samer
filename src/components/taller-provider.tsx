"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  EQUIPMENT_LIST,
  WORKERS_LIST,
  WORK_ORDER_LIST,
  type Equipment,
  type Worker,
  type WorkOrder,
} from "@/lib/constants";

interface TallerState {
  equipment: Equipment[];
  workers: Worker[];
  workOrders: WorkOrder[];
  currentWorkerId: string;
}

interface TallerContextValue extends TallerState {
  currentWorker?: Worker;
  setCurrentWorkerId: (id: string) => void;
  deleteEquipment: (id: string) => void;
  deleteWorker: (id: string) => void;
  deleteWorkOrder: (id: string) => void;
}

const STORAGE_KEY = "taller-samer-state-v1";

const initialState: TallerState = {
  equipment: EQUIPMENT_LIST,
  workers: WORKERS_LIST,
  workOrders: WORK_ORDER_LIST,
  currentWorkerId: WORKERS_LIST[0]?.id ?? "",
};

const TallerContext = createContext<TallerContextValue | null>(null);

function normalizeState(value: Partial<TallerState>): TallerState {
  const workers = Array.isArray(value.workers) && value.workers.length > 0
    ? value.workers
    : WORKERS_LIST;
  const equipment = Array.isArray(value.equipment) ? value.equipment : EQUIPMENT_LIST;
  const workOrders = Array.isArray(value.workOrders) ? value.workOrders : WORK_ORDER_LIST;
  const currentWorkerId =
    typeof value.currentWorkerId === "string" && workers.some((worker) => worker.id === value.currentWorkerId)
      ? value.currentWorkerId
      : workers[0]?.id ?? "";

  return {
    workers,
    equipment,
    workOrders,
    currentWorkerId,
  };
}

export function TallerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TallerState>(initialState);

  useEffect(() => {
    const savedState = window.localStorage.getItem(STORAGE_KEY);
    if (!savedState) {
      return;
    }

    try {
      const parsed = JSON.parse(savedState) as Partial<TallerState>;
      const frame = window.requestAnimationFrame(() => {
        setState(normalizeState(parsed));
      });

      return () => window.cancelAnimationFrame(frame);
    } catch (error) {
      console.error("No se pudo cargar el estado local del taller", error);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setCurrentWorkerId = (id: string) => {
    setState((currentState) => ({
      ...currentState,
      currentWorkerId: currentState.workers.some((worker) => worker.id === id)
        ? id
        : currentState.currentWorkerId,
    }));
  };

  const deleteEquipment = (id: string) => {
    setState((currentState) => ({
      ...currentState,
      equipment: currentState.equipment.filter((equipment) => equipment.id !== id),
      workOrders: currentState.workOrders.filter((workOrder) => workOrder.equipmentId !== id),
    }));
  };

  const deleteWorker = (id: string) => {
    setState((currentState) => {
      const workers = currentState.workers.filter((worker) => worker.id !== id);
      const nextCurrentWorkerId =
        currentState.currentWorkerId === id ? workers[0]?.id ?? "" : currentState.currentWorkerId;

      return {
        ...currentState,
        workers,
        currentWorkerId: nextCurrentWorkerId,
        workOrders: currentState.workOrders.map((workOrder) =>
          workOrder.assignedTo === id
            ? { ...workOrder, assignedTo: "" }
            : workOrder,
        ),
      };
    });
  };

  const deleteWorkOrder = (id: string) => {
    setState((currentState) => ({
      ...currentState,
      workOrders: currentState.workOrders.filter((workOrder) => workOrder.id !== id),
    }));
  };

  const value: TallerContextValue = {
    ...state,
    currentWorker: state.workers.find((worker) => worker.id === state.currentWorkerId),
    setCurrentWorkerId,
    deleteEquipment,
    deleteWorker,
    deleteWorkOrder,
  };

  return (
    <TallerContext.Provider value={value}>
      {children}
    </TallerContext.Provider>
  );
}

export function useTaller() {
  const context = useContext(TallerContext);
  if (!context) {
    throw new Error("useTaller debe usarse dentro de TallerProvider");
  }

  return context;
}
