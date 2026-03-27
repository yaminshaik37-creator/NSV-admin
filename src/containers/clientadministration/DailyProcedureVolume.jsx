"use client";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Line
} from "recharts";

import { useState, useEffect } from "react";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

export default function VolumeByState({ facility_id, iid, range, startDate, endDate }) {

    const [data, setData] = useState([]);

    const fetchData = async () => {

        const query = new URLSearchParams({
            ...(facility_id && { facility_id }),
            ...(iid && { iid }),
            ...(range && { range }),
            ...(startDate && { startDate }),
            ...(endDate && { endDate })
        }).toString();

        const res = await ApiCall({
            url: `${API_ENDPOINTS.DEVICES_DASHBOARD}?${query}`,
            method: "GET"
        });

        if (res?.success) {

            setData(
                res.data.dailyProcedureVolume.map(d => ({
                    day: d.day,
                    value: d.procedures
                }))
            );

        }
    };

    useEffect(() => {
        fetchData();
    }, [facility_id, iid, range, startDate, endDate]);


    return (
        <div className="bg-white rounded-[32px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col h-[50%] overflow-hidden">

            <div className="flex justify-between items-center mb-2">
                <h2 className="text-[20px] font-semibold text-gray-900">
                    Daily Procedure Volume
                </h2>
            </div>

            <div className="flex-1 min-h-0">

                <ResponsiveContainer width="100%" height="100%">

                    <AreaChart
                        data={data}
                        margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
                    >

                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />

                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />

                        <Tooltip />

                        <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill="#DBEAFE" />

                        <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: "#fff" }} />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}
