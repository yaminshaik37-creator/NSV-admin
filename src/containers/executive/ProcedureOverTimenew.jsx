"use client";

import { useEffect, useState, useMemo } from "react";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";
import { Maximize2 } from "lucide-react";
import CustomBarChart from "@/components/charts/CustomBarChart";

export default function ProceduresOverTime({ state }) {
    const [rawData, setRawData] = useState([]);
    const [range, setRange] = useState("monthly");

    // const fetchChartData = async () => {
    //     const res = await ApiCall({
    //         url: `${API_ENDPOINTS.EXECUTIVE_PROCEDURES_OVER_TIME}?range=${range}${state ? `&state=${state}` : ""}`,
    //         method: "GET"
    //     });
    //     if (res?.success) setRawData(res.data);
    // };

    // useEffect(() => { fetchChartData(); }, [range, state]);

    const bars = [
        { key: "nGyn", color: "#0A1D47" },
        { key: "nOra", color: "#1D4ED8" },
        { key: "nOrtho", color: "#93C5FD" },
    ];

    const yAxisTicks = [0, 2000, 4000, 6000, 8000, 10000];
    const dailyData = [
        { day: "Mon", nGyn: 3200, nOra: 2100, nOrtho: 1800 },
        { day: "Tue", nGyn: 4500, nOra: 2800, nOrtho: 2200 },
        { day: "Wed", nGyn: 3800, nOra: 2600, nOrtho: 2000 },
        { day: "Thu", nGyn: 5200, nOra: 3100, nOrtho: 2700 },
        { day: "Fri", nGyn: 6100, nOra: 3500, nOrtho: 3000 },
        { day: "Sat", nGyn: 4800, nOra: 2900, nOrtho: 2500 },
        { day: "Sun", nGyn: 3000, nOra: 2000, nOrtho: 1500 },
    ];

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
                    data={dailyData}
                    range="daily"
                    bars={bars}
                    yAxisTicks={yAxisTicks}
                />
            </div>
        </div>
    );
}
