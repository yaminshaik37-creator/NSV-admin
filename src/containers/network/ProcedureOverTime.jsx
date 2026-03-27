"use client";

import { useEffect, useState, useMemo } from "react";
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList
} from "recharts";

import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";
import { Maximize2 } from "lucide-react";

export default function ProceduresOverTime({
    iid,
    state,
    clinic_id,
    startDate,
    endDate
}) {

    const [rawData, setRawData] = useState([]);
    const [range, setRange] = useState("monthly");

    const fetchChartData = async () => {

        try {

            const params = {
                ...(range && { range }),
                ...(iid && { iid }),
                ...(state && { state }),
                ...(clinic_id && clinic_id !== "all" && { clinic_id }),
                ...(startDate && { startDate }),
                ...(endDate && { endDate })
            };

            const query = new URLSearchParams(params).toString();

            const res = await ApiCall({
                url: `${API_ENDPOINTS.NETWORK_PROCEDURES_OVER_TIME}?${query}`,
                method: "GET"
            });

            if (res?.success) {
                setRawData(res.data || []);
            }

        } catch (error) {
            console.error("Chart API Error:", error);
        }

    };

    useEffect(() => {
        fetchChartData();
    }, [range, iid, state, clinic_id, startDate, endDate]);



    const chartData = useMemo(() => {

        if (range !== "monthly") return rawData;

        const monthOrder = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        return monthOrder.map((m) => {

            const found = rawData.find((d) => d.month === m);

            return found || {
                month: m,
                nGyn: 0,
                nOra: 0,
                nOrtho: 0
            };

        });

    }, [rawData, range]);



    const renderLabel = (value) => (value > 0 ? value : "");



    const maxValue = Math.max(
        ...chartData.map((d) => Math.max(d.nGyn, d.nOra, d.nOrtho)),
        100
    );



    return (

        <div className="bg-white rounded-[32px] p-6 shadow-sm h-[300px] flex flex-col w-full border border-gray-50 relative">

            {/* Header */}
            <div className="flex justify-between items-start mb-6">

                <div>

                    <h2 className="text-[20px] font-bold text-[#4B4B4B] mb-3">
                        Procedures Over Time
                    </h2>

                    {/* Legend */}
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
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-[#93C5FD]" />
                            <span className="text-[12px] font-medium text-gray-400">nOrtho</span>
                        </div>

                    </div>

                </div>



                {/* Range Filter */}
                <div className="flex items-center gap-3">

                    <div className="flex bg-[#F9FAFB] border border-gray-100 rounded-xl p-0.5">

                        {["Daily", "Weekly", "Monthly"].map((r) => (

                            <button
                                key={r}
                                onClick={() => setRange(r.toLowerCase())}
                                className={`px-4 py-1.5 text-[12px] rounded-lg transition-all font-semibold ${range === r.toLowerCase()
                                        ? "bg-white shadow-sm text-[#3B82F6]"
                                        : "text-gray-400"
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



            {/* Chart */}
            <div className="flex-1 w-full">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart
                        data={chartData}
                        margin={{ top: 25, right: 0, left: -25, bottom: 0 }}
                        barGap={4}
                    >

                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                            stroke="#F3F4F6"
                        />

                        <XAxis
                            dataKey={range === "daily" ? "day" : "month"}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#9CA3AF" }}
                            dy={10}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            domain={[0, Math.ceil(maxValue * 1.2)]}
                            tick={{ fontSize: 12, fill: "#9CA3AF" }}
                        />

                        <Tooltip cursor={{ fill: "#F9FAFB" }} />

                        <Bar dataKey="nGyn" fill="#0A1D47" barSize={10}>
                            <LabelList dataKey="nGyn" position="top" formatter={renderLabel} />
                        </Bar>

                        <Bar dataKey="nOra" fill="#1D4ED8" barSize={10}>
                            <LabelList dataKey="nOra" position="top" formatter={renderLabel} />
                        </Bar>

                        <Bar dataKey="nOrtho" fill="#93C5FD" barSize={10}>
                            <LabelList dataKey="nOrtho" position="top" formatter={renderLabel} />
                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );
}
