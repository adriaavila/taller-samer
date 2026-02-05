import { v } from "convex/values";
import { query } from "convex/server";

export const getMonthlyStats = query({
  args: {
    month: v.number(),
    year: v.number(),
  },
  handler: async (ctx, args) => {
    const startDate = new Date(args.year, args.month - 1, 1);
    const endDate = new Date(args.year, args.month, 1);

    const logs = await ctx.db
      .query("timeLogs")
      .withIndex("by_workDate", (q) =>
        q.gte("workDate", startDate.getTime()).lt("workDate", endDate.getTime()),
      )
      .collect();

    const hoursByUser = new Map<string, number>();
    const hoursByOt = new Map<string, number>();

    for (const log of logs) {
      hoursByUser.set(
        log.userId,
        (hoursByUser.get(log.userId) ?? 0) + log.durationHours,
      );
      hoursByOt.set(
        log.workOrderId,
        (hoursByOt.get(log.workOrderId) ?? 0) + log.durationHours,
      );
    }

    const [users, workOrders] = await Promise.all([
      Promise.all(
        Array.from(hoursByUser.keys(), async (userId) => ({
          userId,
          user: await ctx.db.get(userId),
          hours: hoursByUser.get(userId) ?? 0,
        })),
      ),
      Promise.all(
        Array.from(hoursByOt.keys(), async (workOrderId) => ({
          workOrderId,
          workOrder: await ctx.db.get(workOrderId),
          hours: hoursByOt.get(workOrderId) ?? 0,
        })),
      ),
    ]);

    return {
      byUser: users
        .filter((entry) => entry.user)
        .sort((a, b) => b.hours - a.hours),
      byWorkOrder: workOrders
        .filter((entry) => entry.workOrder)
        .sort((a, b) => b.hours - a.hours),
    };
  },
});
