import { ConvexError, v } from "convex/values";
import { mutation } from "convex/server";

const parseTimeToMinutes = (value: string) => {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
};

export const registerTimeLog = mutation({
  args: {
    userId: v.id("users"),
    workOrderId: v.id("workOrders"),
    date: v.string(),
    startTime: v.string(),
    endTime: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.description.trim()) {
      throw new ConvexError("La descripción es obligatoria.");
    }

    const startMinutes = parseTimeToMinutes(args.startTime);
    const endMinutes = parseTimeToMinutes(args.endTime);

    if (endMinutes <= startMinutes) {
      throw new ConvexError("Hora fin debe ser mayor a inicio.");
    }

    const workDate = new Date(args.date);
    if (Number.isNaN(workDate.getTime())) {
      throw new ConvexError("Fecha inválida.");
    }

    const durationHours = (endMinutes - startMinutes) / 60;

    return await ctx.db.insert("timeLogs", {
      userId: args.userId,
      workOrderId: args.workOrderId,
      workDate: workDate.setHours(0, 0, 0, 0),
      startTime: args.startTime,
      endTime: args.endTime,
      description: args.description.trim(),
      durationHours,
    });
  },
});
