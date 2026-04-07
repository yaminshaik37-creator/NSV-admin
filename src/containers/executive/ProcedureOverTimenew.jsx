"use client";

import { useMemo, useState, } from "react";
import { Maximize2 } from "lucide-react";
import CustomBarChart from "@/components/charts/CustomBarChart";
import { getYAxisTicks } from "@/utils/helper";

const bars = [
    { key: "nGyn", color: "#0A1D47" },
    { key: "nOra", color: "#1D4ED8" },
    { key: "nOrtho", color: "#93C5FD" },
];

export default function ProceduresOverTime({ proceduresOverTime }) {
    const [range, setRange] = useState("monthly");



    const yAxisTicks = useMemo(() => getYAxisTicks(proceduresOverTime), [proceduresOverTime]);

    return (
        <div className="bg-white rounded-[32px] p-6 shadow-sm h-[300px] flex flex-col w-full border border-gray-50 relative">

            {/* Header: Title and Legend */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-[20px] font-bold text-[#4B4B4B] mb-3">Procedures Over Time</h2>

                    {/* Small Legend Indicators */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-[#0A1D47]" />
                            <span className="text-[12px] font-medium text-gray-400">nGyn</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-[#1D4ED8]" />
                            <span className="text-[12px] font-medium text-gray-400">nOra</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-[#3B82F6]" />
                            <span className="text-[12px] font-medium text-gray-400">nOrtho</span>
                        </div>
                    </div>
                </div>

                {/* Filter and Maximize Inside Card */}
                <div className="flex items-center gap-3">
                    <div className="flex bg-[#F9FAFB] border border-gray-100 rounded-xl p-0.5">
                        {["Daily", "Weekly", "Monthly"].map((r) => (
                            <button
                                key={r}
                                onClick={() => setRange(r.toLowerCase())}
                                className={`px-4 py-1.5 text-[12px] rounded-lg transition-all font-semibold ${range === r.toLowerCase() ? "bg-white shadow-sm text-[#3B82F6]" : "text-gray-400"
                                    }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                    <button className="p-2 bg-[#F0F7FF] rounded-lg text-[#3B82F6]">
                        <Maximize2 size={16} />
                    </button>
                </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 w-full">
                <CustomBarChart
                    data={proceduresOverTime}
                    range="monthly"
                    bars={bars}
                    yAxisTicks={yAxisTicks}
                />
            </div>
        </div>
    );
}
