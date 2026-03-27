"use client";

import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from "recharts";

import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";
import { Maximize2 } from "lucide-react";

const DEVICE_LIST = ["nGyn", "nOra", "nOrtho"];

export default function DeviceUtilization() {
    const [data, setData] = useState({
        active: 0,
        inactive: 0
    });

    const [selectedDevice, setSelectedDevice] = useState("nGyn");

    const fetchData = async () => {
        try {
            const query = new URLSearchParams({ devices: selectedDevice }).toString();
            const res = await ApiCall({
                url: `${API_ENDPOINTS.DEVICE_UTILIZATION}?${query}`,
                method: "GET"
            });

            if (res?.success) {
                setData({
                    active: res.data?.activePct || 0,
                    inactive: res.data?.inactivePct || 0
                });
            }
        } catch (error) {
            console.error("Device Utilization Error:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedDevice]);

    const chartData = [
        { name: "Inactive", value: data.inactive },
        { name: "Active", value: data.active }
    ];

    return (
        <div className="bg-white rounded-[32px] p-6 shadow-sm h-[320px] flex flex-col w-full border border-gray-100 relative overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-[18px] font-bold text-gray-700 tracking-tight">
                    Device Utilization
                </h2>
                <button className="p-2 bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl text-blue-600">
                    <Maximize2 size={18} />
                </button>
            </div>

            <div className="flex flex-1 items-center justify-between gap-4">

                {/* 🔥 Modern Device Filter */}
                <div className="z-10 bg-gray-50/50 p-3 rounded-2xl border border-gray-100 min-w-[110px]">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2 px-1">
                        Device
                    </div>
                    <div className="flex flex-col gap-2">
                        {DEVICE_LIST.map((device) => (
                            <label
                                key={device}
                                className={`flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer transition-all ${selectedDevice === device
                                        ? "bg-white shadow-sm ring-1 ring-black/5"
                                        : "hover:bg-gray-100"
                                    }`}
                            >
                                <span className={`text-[13px] ${selectedDevice === device ? "font-bold text-blue-600" : "text-gray-500"}`}>
                                    {device}
                                </span>
                                <input
                                    type="radio"
                                    className="w-3.5 h-3.5 accent-blue-600 cursor-pointer"
                                    name="device"
                                    checked={selectedDevice === device}
                                    onChange={() => setSelectedDevice(device)}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                {/* Chart Area */}
                <div className="relative flex-1 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                innerRadius={65}
                                outerRadius={85}
                                paddingAngle={2}
                                dataKey="value"
                                stroke="none"
                                startAngle={90}
                                endAngle={-270}
                            >
                                <Cell fill="#E2E8F0" /> {/* Inactive Color */}
                                <Cell fill="#3B82F6" /> {/* Active Color */}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[26px] font-bold text-gray-800 leading-none">
                            {data.active.toFixed(1)}%
                        </span>
                        <span className="text-[12px] font-medium text-gray-400 mt-1">
                            Active
                        </span>
                    </div>
                </div>

                {/* Legend - Vertical alignment for cleaner look */}
                <div className="flex flex-col gap-3 pr-2">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                        <div className="flex flex-col">
                            <span className="text-[11px] text-gray-400 leading-none">Active</span>
                            <span className="text-[13px] font-semibold text-gray-700">{data.active}%</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                        <div className="flex flex-col">
                            <span className="text-[11px] text-gray-400 leading-none">Inactive</span>
                            <span className="text-[13px] font-semibold text-gray-700">{data.inactive}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
