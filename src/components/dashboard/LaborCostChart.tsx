"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// Data will be fetched from API
const data: any[] = [];

const COLORS = ["#18181b", "#52525b", "#a1a1aa", "#e4e4e7"];

export function LaborCostChart() {
    const totalCost = data.reduce((acc, item) => acc + item.value, 0);

    return (
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-zinc-900">Costo de mano de obra</h3>
                    <p className="text-xs text-zinc-500">Distribución por categoría</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-zinc-900">${totalCost.toLocaleString()}</p>
                    <p className="text-xs text-zinc-500">Total semana</p>
                </div>
            </div>
            <div className="flex h-[240px] items-center justify-center w-full">
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border border-zinc-200 bg-white p-2 shadow-sm">
                                                <span className="block text-xs font-semibold text-zinc-900">
                                                    {payload[0].name}
                                                </span>
                                                <span className="text-xs text-zinc-500">
                                                    ${Number(payload[0].value).toLocaleString()}
                                                </span>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="text-sm text-zinc-400">
                        No hay datos de costos disponibles
                    </div>
                )}
            </div>
            {data.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    {data.map((item, index) => (
                        <div key={item.name} className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                            <span className="font-medium text-zinc-600">{item.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
