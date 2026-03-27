"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

export default function UpdatesCards({
    clinic_id,
    range
}) {

    const [data, setData] = useState(null);

    const fetchUpdates = async () => {
        try {

            const query = new URLSearchParams({
                ...(clinic_id && { clinic_id }),
                ...(range && { range })
            }).toString();

            const res = await ApiCall({
                url: `${API_ENDPOINTS.CLIENT_ADMISNISTRATION_CLIENT_UPDATES}?${query}`,
                method: "GET"
            });

            if (res?.success) {
                setData(res.data);
            }

        } catch (error) {
            console.error("Updates API Error:", error);
        }
    };

    useEffect(() => {
        fetchUpdates();
    }, [clinic_id, range]);

    const getTrend = (value) => {
        if (!value) return "up";
        return Number(value) < 0 ? "down" : "up";
    };

    const cards = [
        {
            title: "Unique Patients (MTD)",
            value: Number(data?.uniquePatientsMTD ?? 0),
            change: `${Number(data?.uniquePatientsChangePct ?? 0).toFixed(1)}%`,
            trend: getTrend(data?.uniquePatientsChangePct),
        },
        {
            title: "Procedures MTD",
            value: Number(data?.proceduresMTD ?? 0),
            change: `${Number(data?.proceduresMTDChangePct ?? 0).toFixed(1)}%`,
            trend: getTrend(data?.proceduresMTDChangePct),
        },
        {
            title: "Procedures YTD",
            value: Number(data?.proceduresYTD ?? 0),
            change: `${Number(data?.proceduresYTDChangePct ?? 0).toFixed(1)}%`,
            trend: getTrend(data?.proceduresYTDChangePct),
        },
        {
            title: "Procedures All-Time",
            value: Number(data?.proceduresAllTime ?? 0),
            change: "0%",
            trend: "up",
        },
        {
            title: "Avg Procedures per Day",
            value: Number(data?.avgProceduresPerDay ?? 0).toFixed(1),
            change: `${Number(data?.avgProceduresPerDayChangePct ?? 0).toFixed(1)}%`,
            trend: getTrend(data?.avgProceduresPerDayChangePct),
        },
    ];

    return (
        <div className="px-6 py-6">

            <h2 className="text-2xl font-semibold text-gray-600 mb-6">
                Updates
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {cards.map((card, index) => {

                    const isUp = card.trend === "up";

                    return (
                        <div
                            key={index}
                            className="bg-gray-100 rounded-2xl p-6 shadow-sm flex justify-between items-center"
                        >

                            <div>
                                <p className="text-gray-600 text-sm mb-3">
                                    {card.title}
                                </p>

                                <div className="flex items-end gap-2">
                                    <span
                                        className={`text-4xl font-semibold ${isUp ? "text-green-600" : "text-red-500"
                                            }`}
                                    >
                                        {card.value}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">

                                <div className="w-20 h-8">
                                    <svg viewBox="0 0 100 30" className="w-full h-full">
                                        <polyline
                                            fill="none"
                                            stroke="#9CA3AF"
                                            strokeWidth="2"
                                            points={
                                                isUp
                                                    ? "0,25 20,20 40,22 60,15 80,18 100,10"
                                                    : "0,10 20,15 40,12 60,18 80,20 100,25"
                                            }
                                        />
                                    </svg>
                                </div>

                                <div
                                    className={`flex items-center text-sm ${isUp ? "text-green-600" : "text-red-500"
                                        }`}
                                >
                                    {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                    <span className="ml-1">{card.change}</span>
                                </div>

                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}
