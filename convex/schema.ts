import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    role: v.string(),
  }),
  workOrders: defineTable({
    otCode: v.string(),
    title: v.string(),
    status: v.union(v.literal("active"), v.literal("closed")),
  })
    .index("by_otCode", ["otCode"])
    .index("by_status", ["status"]),
  timeLogs: defineTable({
    userId: v.id("users"),
    workOrderId: v.id("workOrders"),
    workDate: v.number(),
    startTime: v.string(),
    endTime: v.string(),
    description: v.string(),
    durationHours: v.number(),
  })
    .index("by_workDate", ["workDate"])
    .index("by_workOrder", ["workOrderId"])
    .index("by_user", ["userId"]),
});
