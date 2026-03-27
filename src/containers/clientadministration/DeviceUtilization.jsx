"use client";

import { useState, useEffect } from "react";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

export default function DeviceUtilization({ clinic_id, iid }) {
    const [data, setData] = useState({ active: 85, inactive: 15 });
    const [selectedDevices, setSelectedDevices] = useState(["nGyn", "nOra", "nOrtho"]);
    const devices = ["nGyn", "nOra", "nOrtho"];

    const fetchData = async () => {
        try {
            const query = new URLSearchParams({
                ...(clinic_id && { clinic_id }),
                ...(iid && { iid }),
                ...(selectedDevices.length > 0 && { devices: selectedDevices.join(",") })
            }).toString();

            const res = await ApiCall({
                url: `${API_ENDPOINTS.DEVICE_STATUS_ACTIVE_INACTIVE}?${query}`,
                method: "GET"
            });

            if (res?.success) {
                setData({
                    active: res.data.activePct ?? 0,
                    inactive: res.data.inactivePct ?? 0
                });
            }
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [clinic_id, iid, selectedDevices]);

    // Donut Math
    const radius = 170;
    const circumference = 2 * Math.PI * radius;
    const activeOffset = circumference - (data.active / 100) * circumference;

    return (
        <div className="bg-white rounded-[32px] p-10 shadow-sm min-h-[600px] w-full max-w-5xl mx-auto border border-gray-50">
            <h2 className="text-[#64748b] text-xl font-medium mb-12">Device Utilization</h2>

            <div className="flex flex-row items-start justify-between gap-10">

                {/* 1. SELECT MENU */}
                <div className="w-64 z-20">
                    <div className="border border-gray-200 rounded-t-xl p-3 flex justify-between items-center text-gray-500 bg-white">
                        Select Devices <span className="text-blue-400 text-xs">▼</span>
                    </div>
                    <div className="border-x border-b border-gray-200 rounded-b-xl overflow-hidden shadow-sm bg-white">
                        <label className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-100 cursor-pointer">
                            <span className="text-sm font-medium">Select All</span>
                            <input
                                type="checkbox"
                                checked={selectedDevices.length === devices.length}
                                onChange={() => setSelectedDevices(selectedDevices.length === devices.length ? [] : devices)}
                                className="w-4 h-4 rounded accent-blue-500"
                            />
                        </label>
                        {devices.map((device) => (
                            <label key={device} className="p-3 bg-white flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                                <span className="text-sm text-gray-600">{device}</span>
                                <input
                                    type="checkbox"
                                    checked={selectedDevices.includes(device)}
                                    onChange={() => setSelectedDevices(prev => prev.includes(device) ? prev.filter(d => d !== device) : [...prev, device])}
                                    className="w-4 h-4 rounded accent-blue-500"
                                />
                            </label>
                        ))}
                    </div>
                </div>

                {/* 2. CUSTOM SVG CHART (Replaces Recharts) */}
                <div className="relative flex-1 flex flex-col items-center justify-center">
                    <div className="relative w-[450px] h-[450px]">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 400 400">
                            {/* Background Circle (Inactive) */}
                            <circle
                                cx="200"
                                cy="200"
                                r={radius}
                                stroke="#DDF1FF"
                                strokeWidth="70"
                                fill="transparent"
                            />
                            {/* Progress Circle (Active) */}
                            <circle
                                cx="200"
                                cy="200"
                                r={radius}
                                stroke="#82D1FF"
                                strokeWidth="70"
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={activeOffset}
                                strokeLinecap="flat"
                                className="transition-all duration-500 ease-out"
                            />
                        </svg>

                        {/* Center Label Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <div className="flex items-baseline">
                                <span className="text-[72px] font-semibold text-gray-700 leading-none">{data.active}</span>
                                <span className="text-3xl text-gray-500 ml-1">%</span>
                            </div>
                            <span className="text-2xl text-gray-400 font-light mt-2">Active</span>
                        </div>
                    </div>
                </div>

                {/* 3. LEGEND */}
                <div className="flex flex-col gap-6 self-center lg:self-end mb-10 mr-4">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#82D1FF]" />
                        <span className="text-gray-500 font-medium text-lg">Active</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#DDF1FF]" />
                        <span className="text-gray-500 font-medium text-lg">Inactive</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
