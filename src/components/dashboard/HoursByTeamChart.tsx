"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface TeamHoursDatum {
    name: string;
    hours: number;
}

const data: TeamHoursDatum[] = [
    { name: "Mecánica", hours: 42 },
    { name: "Hidráulica", hours: 28 },
    { name: "Eléctrica", hours: 19 },
    { name: "Apoyo", hours: 14 },
];

export function HoursByTeamChart() {
    return (
        <div className="min-w-0 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-zinc-900">Horas trabajadas por equipo</h3>
                <p className="text-xs text-zinc-500">Total de horas registradas esta semana</p>
            </div>
            <div className="h-[240px] w-full min-w-0">
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <BarChart data={data}>
                            <XAxis
                                dataKey="name"
                                stroke="#5a4e40"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#5a4e40"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}h`}
                            />
                            <Tooltip
                                cursor={{ fill: "#f2ece2" }}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-2 shadow-sm">
                                                <span className="text-xs font-semibold text-zinc-900">
                                                    {payload[0].value} horas
                                                </span>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar
                                dataKey="hours"
                                fill="#7a5530"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
                        No hay registros de horas esta semana
                    </div>
                )}
            </div>
        </div>
    );
}
