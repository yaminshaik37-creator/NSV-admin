"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    Area
} from "recharts";

import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

export default function UpdatesCards({
    iid,
    clinic_id,
    range,
    startDate,
    endDate
}) {

    const [data, setData] = useState(null);

    /* ---------- query builder ---------- */
    const buildQuery = (params) =>
        new URLSearchParams(
            Object.fromEntries(
                Object.entries(params).filter(([_, v]) => v)
            )
        ).toString();

    /* ---------- API ---------- */
    const fetchKpis = async () => {
        try {

            const query = buildQuery({
                iid,
                clinic_id,
                range,
                startDate,
                endDate
            });

            const res = await ApiCall({
                url: `${API_ENDPOINTS.UPDATES_KPIS}?${query}`,
                method: "GET"
            });

            if (res?.success) {
                setData(res.data);
            }

        } catch (error) {
            console.error("KPI API Error:", error);
            setData(null);
        }
    };

    /* ---------- lifecycle ---------- */
    useEffect(() => {
        fetchKpis();
    }, [iid, clinic_id, range, startDate, endDate]);

    /* ---------- loading fallback ---------- */
    if (!data) {
        return <div className="text-sm text-gray-400">Loading...</div>;
    }

    /* ---------- cards mapping ---------- */
    const cards = [
        {
            title: "Total Procedures (National)",
            value: data.totalProcedures,
            change: data.proceduresChangePct,
            isPercent: true
        },
        {
            title: "Operational Clinics",
            value: data.operationalClinics,
            change: null
        },
        {
            title: "Registered Devices",
            value: data.registeredDevices,
            change: null
        },
        {
            title: "Active Device Ratio",
            value: data.activeDeviceRatio,
            change: null,
            isPercentValue: true
        },
        {
            title: "Avg Procedures / Device",
            value: data.avgProceduresPerDevice,
            change: null
        }
    ];

    return (

        <div className="w-full">

            {/* Title */}
            <h2 className="text-[18px] font-semibold text-gray-600 mb-4">
                Updates
            </h2>

            {/* Grid */}
            <div className="grid md:grid-cols-4 gap-5">

                {cards.map((card, i) => {

                    const isUp = card.change >= 0;

                    /* dummy sparkline (can replace later with real trend API) */
                    const chartData = [10, 20, 18, 25, 22, 30].map((v, idx) => ({
                        x: idx,
                        y: v
                    }));

                    return (
                        <div
                            key={i}
                            className="bg-[#F9FAFB] rounded-[20px] px-5 py-4 shadow-sm border border-gray-100 h-[110px] flex flex-col justify-between"
                        >

                            {/* Title */}
                            <div className="flex justify-between items-start">

                                <p className="text-[14px] text-gray-500">
                                    {card.title}
                                </p>

                                {/* Sparkline */}
                                <div className="w-[90px] h-[40px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData}>
                                            <Area
                                                type="monotone"
                                                dataKey="y"
                                                stroke="none"
                                                fill="#E5E7EB"
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="y"
                                                stroke="#9CA3AF"
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                            </div>

                            {/* Bottom */}
                            <div className="flex justify-between items-end">

                                <span className="text-[28px] font-semibold text-gray-900">

                                    {card.isPercentValue
                                        ? `${card.value}%`
                                        : card.value?.toLocaleString()}

                                </span>

                                {card.change !== null && (
                                    <div className="flex items-center gap-1">

                                        {isUp ? (
                                            <TrendingUp size={14} className="text-green-500" />
                                        ) : (
                                            <TrendingDown size={14} className="text-red-500" />
                                        )}

                                        <span className={`text-[12px] ${isUp ? "text-green-500" : "text-red-500"}`}>
                                            {card.change > 0 ? "+" : ""}
                                            {card.change}%
                                        </span>

                                    </div>
                                )}

                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}
