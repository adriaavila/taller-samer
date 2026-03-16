"use client";

import dynamic from "next/dynamic";

const HoursByTeamChart = dynamic(
    () =>
        import("@/components/dashboard/HoursByTeamChart").then(
            (module) => module.HoursByTeamChart
        ),
    { ssr: false }
);

const LaborCostChart = dynamic(
    () =>
        import("@/components/dashboard/LaborCostChart").then(
            (module) => module.LaborCostChart
        ),
    { ssr: false }
);

export function DashboardCharts() {
    return (
        <>
            <HoursByTeamChart />
            <LaborCostChart />
        </>
    );
}
