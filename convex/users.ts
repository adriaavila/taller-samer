import { query } from "convex/server";

export const getTechnicians = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});
