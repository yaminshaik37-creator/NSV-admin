"use client";

import { useEffect, useState } from "react";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";
import { Maximize2 } from "lucide-react";

import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    YAxis,
    XAxis,
    Bar,
    Cell
} from "recharts";

/* 🎨 Color mapping (same as your UI) */
const COLOR_MAP = {
    "Patients": "#BEE3F8",
    "Total Devices": "#90CDF4",
    "Active Devices": "#4299E1",
    "Clinics": "#EBF8FF"
};

export default function InfrastructureChart({
    iid,
    clinic_id,
    range,
    startDate,
    endDate
}) {

    const [data, setData] = useState([]);

    /* ---------------- API CALL ---------------- */
    const fetchInfrastructureData = async () => {
        try {

            const params = {
                ...(iid && { iid }),
                ...(clinic_id && clinic_id !== "all" && { clinic_id }),
                ...(range && { range }),
                ...(startDate && { startDate }),
                ...(endDate && { endDate })
            };

            const query = new URLSearchParams(params).toString();

            const res = await ApiCall({
                url: `${API_ENDPOINTS.INFRASTRUCTURE_CHART}?${query}`,
                method: "GET"
            });

            if (res?.success) {

                const formatted = res.data.map((item) => ({
                    name: item.category,
                    value: item.value,
                    color: COLOR_MAP[item.category] || "#CBD5F5"
                }));

                setData(formatted);
            }

        } catch (error) {
            console.error("Infrastructure API error:", error);
        }
    };

    useEffect(() => {
        fetchInfrastructureData();
    }, [iid, clinic_id, range, startDate, endDate]);

    /* ---------------- LABEL ---------------- */
    const renderCustomBarLabel = ({ x, y, width, value }) => {
        return (
            <g>
                <rect
                    x={x + width / 2 - 18}
                    y={y - 28}
                    width="36"
                    height="20"
                    rx="4"
                    fill="#F8FAFC"
                    stroke="#E2E8F0"
                    strokeWidth="0.5"
                />
                <text
                    x={x + width / 2}
                    y={y - 14}
                    fill="#475569"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                >
                    {value}
                </text>
                <path
                    d={`M${x + width / 2 - 4},${y - 8}
                    L${x + width / 2 + 4},${y - 8}
                    L${x + width / 2},${y - 2} Z`}
                    fill="#F8FAFC"
                />
            </g>
        );
    };

    return (
        <div className="bg-white h-[300px] rounded-[32px] p-6 shadow-sm flex flex-col w-full border border-gray-100 overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-[18px] font-bold text-gray-700">
                    Infrastructure
                </h2>
                <button className="p-1.5 bg-blue-50 rounded-lg text-blue-500 hover:bg-blue-100 transition-colors">
                    <Maximize2 size={18} />
                </button>
            </div>

            {/* Chart */}
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 25, right: 10, left: 30, bottom: 0 }}
                        barSize={28}
                    >

                        <CartesianGrid
                            vertical={false}
                            stroke="#F1F5F9"
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="name"
                            axisLine={{ stroke: '#E2E8F0' }}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: "#64748B" }}
                            dy={8}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: "#94A3B8" }}
                            domain={[0, 500]}
                            ticks={[0, 100, 200, 300, 400, 500]}
                            width={45}
                        />

                        <Bar
                            dataKey="value"
                            radius={[4, 4, 0, 0]}
                            label={renderCustomBarLabel}
                        >
                            {data.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Bar>

                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
