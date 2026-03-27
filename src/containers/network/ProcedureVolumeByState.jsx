"use client";

import { useEffect, useState } from "react";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    YAxis,
    XAxis,
    Bar,
    Cell
} from "recharts";

export default function VolumeByState() {

    const [data, setData] = useState([]);

    const fetchVolumeByState = async () => {
        try {

            const res = await ApiCall({
                url: API_ENDPOINTS.NETWORK_PROCEDURES_VOLUME_BY_STATE,
                method: "GET"
            });

            if (res?.success) {

                const cleaned = res.data
                    .filter(item =>
                        item.procedures > 0 &&     // remove zero values
                        item.state &&              // ensure state exists
                        item.state.length > 3      // remove pa, k, t etc
                    )
                    .sort((a, b) => b.procedures - a.procedures) // highest first
                    .slice(0, 5)                                 // show only 5
                    .map(item => ({
                        state: item.state.charAt(0).toUpperCase() + item.state.slice(1),
                        value: Number(item.procedures)
                    }));

                setData(cleaned);
            }

        } catch (error) {
            console.error("Volume by state API error:", error);
        }
    };

    useEffect(() => {
        fetchVolumeByState();
    }, []);

    return (
        <div className="bg-white rounded-[32px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col h-[50%] overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-center mb-1">
                <h2 className="text-[20px] font-semibold text-gray-900">
                    Procedures Volume by State
                </h2>

                <button className="p-2.5 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                    <svg
                        className="w-5 h-5 text-[#3B82F6]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                    </svg>
                </button>
            </div>

            {/* Chart */}
            <div className="flex-1 min-h-0">

                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 0, right: 30, left: -10, bottom: 0 }}
                        barCategoryGap="25%"
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#F3F4F6"
                            horizontal
                            vertical
                        />

                        <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#9CA3AF" }}
                        />

                        <YAxis
                            type="category"
                            dataKey="state"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 14, fill: "#1F2937", fontWeight: 500 }}
                            width={80}
                        />

                        <Bar dataKey="value" radius={[0, 0, 0, 0]} barSize={16}>
                            {data.map((entry, index) => (
                                <Cell key={index} fill="#93C5FD" />
                            ))}
                        </Bar>

                    </BarChart>
                </ResponsiveContainer>

            </div>

        </div>
    );
}
