import type { HourLog, WorkOrder, WorkOrderStatus } from "./data";

function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function calculateHours(logs: HourLog[]) {
  return logs.reduce((total, log) => total + (toMinutes(log.endTime) - toMinutes(log.startTime)), 0);
}

export function formatMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

export function getLatestLogDate(logs: HourLog[]) {
  if (logs.length === 0) {
    return null;
  }

  return logs
    .map((log) => log.date)
    .sort((a, b) => (a < b ? 1 : -1))[0];
}

export function getLogsForDate(logs: HourLog[], date: string | null) {
  if (!date) {
    return [];
  }
  return logs.filter((log) => log.date === date);
}

export function countByStatus(workOrders: WorkOrder[], status: WorkOrderStatus) {
  return workOrders.filter((order) => order.status === status).length;
}
