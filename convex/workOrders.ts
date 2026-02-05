import { query } from "convex/server";

export const getActiveWorkOrders = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("workOrders")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .collect();
  },
});
