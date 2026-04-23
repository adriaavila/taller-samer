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
  INITIAL_TIME_LOGS,
  type Equipment,
  type TimeLog,
} from "@/lib/constants";

interface TallerState {
  equipment: Equipment[];
  timeLogs: TimeLog[];
}

interface TallerContextValue extends TallerState {
  addTimeLog: (log: Omit<TimeLog, "id">) => void;
  deleteTimeLog: (id: string) => void;
  updateEquipmentStatus: (id: string, status: Equipment["status"]) => void;
  addEquipment: (equipment: Equipment) => void;
  updateEquipment: (equipment: Equipment) => void;
  deleteEquipment: (id: string) => void;
}

const STORAGE_KEY = "taller-samer-state-v2";

const initialState: TallerState = {
  equipment: EQUIPMENT_LIST,
  timeLogs: INITIAL_TIME_LOGS,
};

const TallerContext = createContext<TallerContextValue | null>(null);

function normalizeState(value: Partial<TallerState>): TallerState {
  const equipment = Array.isArray(value.equipment) && value.equipment.length > 0 ? value.equipment : EQUIPMENT_LIST;
  const timeLogs = Array.isArray(value.timeLogs) ? value.timeLogs : INITIAL_TIME_LOGS;

  return {
    equipment,
    timeLogs,
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

  const addTimeLog = (log: Omit<TimeLog, "id">) => {
    setState((currentState) => {
      const newLog = {
        ...log,
        id: `LOG-${Date.now()}`,
      };
      
      // Update equipment hours
      const newEquipment = currentState.equipment.map(eq => 
        eq.id === log.equipmentId 
          ? { ...eq, hours: eq.hours + log.hours }
          : eq
      );

      return {
        ...currentState,
        equipment: newEquipment,
        timeLogs: [newLog, ...currentState.timeLogs],
      };
    });
  };

  const deleteTimeLog = (id: string) => {
    setState((currentState) => ({
      ...currentState,
      timeLogs: currentState.timeLogs.filter((log) => log.id !== id),
    }));
  };

  const updateEquipmentStatus = (id: string, status: Equipment["status"]) => {
    setState((currentState) => ({
      ...currentState,
      equipment: currentState.equipment.map((eq) =>
        eq.id === id ? { ...eq, status } : eq
      ),
    }));
  };

  const addEquipment = (newEq: Equipment) => {
    setState((currentState) => ({
      ...currentState,
      equipment: [...currentState.equipment, newEq],
    }));
  };

  const updateEquipment = (updatedEq: Equipment) => {
    setState((currentState) => ({
      ...currentState,
      equipment: currentState.equipment.map((eq) =>
        eq.id === updatedEq.id ? updatedEq : eq
      ),
    }));
  };

  const deleteEquipment = (id: string) => {
    setState((currentState) => ({
      ...currentState,
      equipment: currentState.equipment.filter((eq) => eq.id !== id),
    }));
  };

  const value: TallerContextValue = {
    ...state,
    addTimeLog,
    deleteTimeLog,
    updateEquipmentStatus,
    addEquipment,
    updateEquipment,
    deleteEquipment,
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
