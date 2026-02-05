export const api = {
  timeLogs: {
    registerTimeLog: "timeLogs/registerTimeLog",
  },
  workOrders: {
    getActiveWorkOrders: "workOrders/getActiveWorkOrders",
  },
  analytics: {
    getMonthlyStats: "analytics/getMonthlyStats",
  },
  users: {
    getTechnicians: "users/getTechnicians",
  },
} as const;
