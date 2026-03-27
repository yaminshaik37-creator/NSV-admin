"use client";

import {
    LineChart,
    Line,
    ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

const dataUp = [
    { v: 10 }, { v: 20 }, { v: 18 }, { v: 25 }, { v: 22 }, { v: 30 }, { v: 28 },
];

const dataDown = [
    { v: 30 }, { v: 28 }, { v: 25 }, { v: 22 }, { v: 20 }, { v: 18 }, { v: 15 },
];

function Sparkline({ data, color = "#16a34a" }) {
    return (
        <div className="w-full h-10">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <Line
                        type="monotone"
                        dataKey="v"
                        stroke={color}
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

function Card({ title, value, suffix, change, up = true, data }) {
    return (
        <div className="bg-gray-100 rounded-xl p-5 shadow-sm flex flex-col justify-between">

            <p className="text-gray-600 text-sm font-medium">{title}</p>

            <div className="flex items-center justify-between mt-2">
                <h2 className={`text-3xl font-semibold ${up ? "text-green-600" : "text-red-500"}`}>
                    {value}
                    <span className="text-lg ml-1">{suffix}</span>
                </h2>

                <div className="w-28">
                    <Sparkline data={data} color={up ? "#16a34a" : "#ef4444"} />
                </div>
            </div>

            <div className="mt-2 flex justify-end">
                <span className={`text-xs font-medium flex items-center gap-1 ${up ? "text-green-600" : "text-red-500"}`}>
                    {up ? "▲" : "▼"} {change}
                </span>
            </div>

        </div>
    );
}

export default function DashboardUpdates({
    clinic_id,
    iid,
    range,
    startDate,
    endDate
}) {

    const [data, setData] = useState(null);

    const fetchData = async () => {

        try {

            const query = new URLSearchParams({
                ...(clinic_id && { clinic_id }),
                ...(iid && { iid }),
                ...(range && { range }),
                ...(startDate && { startDate }),
                ...(endDate && { endDate })
            }).toString();

            const res = await ApiCall({
                url: `${API_ENDPOINTS.UPDATES_DASHBOARD}?${query}`,
                method: "GET"
            });

            if (res?.success) {
                setData(res.data);
            }

        } catch (error) {
            console.error("Updates Dashboard API Error:", error);
        }

    };

    useEffect(() => {
        fetchData();
    }, [clinic_id, iid, range, startDate, endDate]);



    /* ---------- Derived UI values ---------- */

    const uniquePatients = data?.uniquePatients?.value ?? 0;
    const uniqueChange = data?.uniquePatients?.changePct ?? 0;

    const totalProcedures = data?.totalProcedures?.value ?? 0;
    const proceduresPerPatient = data?.proceduresPerPatient?.value ?? 0;
    const completionRate = data?.completionRate?.value ?? 0;

    const getTrend = (val) => Number(val) >= 0;



    return (

        <div className="p-4">

            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Updates
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <Card
                    title="Unique Patients Screened"
                    value={uniquePatients}
                    change={`${uniqueChange}%`}
                    up={getTrend(uniqueChange)}
                    data={getTrend(uniqueChange) ? dataUp : dataDown}
                />

                <Card
                    title="Total Procedures"
                    value={totalProcedures}
                    change="0%"
                    up={true}
                    data={dataUp}
                />

                <Card
                    title="Procedures / Patient"
                    value={proceduresPerPatient}
                    change="0%"
                    up={true}
                    data={dataUp}
                />

                <Card
                    title="Completion Rate"
                    value={completionRate}
                    suffix="%"
                    change="0%"
                    up={true}
                    data={dataUp}
                />

            </div>

        </div>
    );
}
