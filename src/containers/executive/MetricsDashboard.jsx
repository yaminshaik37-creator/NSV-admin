"use client";


import InsightCard from "./MetricCard";
import { PieChart, Star } from "lucide-react";

export default function MetricsDashboard({ insights }) {


    return (
        <div className="bg-gray-100 p-8 rounded-xl">

            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Insights
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <InsightCard
                    title="Inactive Device Fleet"
                    value={`${Number(insights?.inactive_res?.inactive_pct ?? 0)}%`}
                    description="Devices inactive"
                    icon={<PieChart className="opacity-0 animate-fadeIn delay-100" size={40} />}
                />

                <InsightCard
                    title="Clinic Activity Decline"
                    value={`${Number(insights?.decline_res?.decline_pct ?? 0)}%`}
                    description="Clinic activity dropped"
                    icon={<PieChart size={40} className="opacity-0 animate-fadeIn delay-200" />}
                />

                <InsightCard
                    title="Growth Success Story"
                    value={`${Number(insights?.growth_res?.growth_pct ?? 0)}%`}
                    description="[Procedure] growing"
                    icon={<Star size={40} className="opacity-0 animate-fadeIn delay-300" />}
                />

            </div>
        </div>
    );
}
