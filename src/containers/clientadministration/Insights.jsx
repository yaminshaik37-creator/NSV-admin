"use client";

import { useEffect, useState } from "react";
import { PieChart, Clock, Monitor, RefreshCcw } from "lucide-react";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

export default function InsightsCards({
    clinic_id,
    range,
    startDate,
    endDate
}) {

    const [data, setData] = useState(null);

    const fetchInsights = async () => {

        try {

            const query = new URLSearchParams({
                ...(clinic_id && { clinic_id }),
                ...(range && { range }),
                ...(startDate && { startDate }),
                ...(endDate && { endDate })
            }).toString();

            const res = await ApiCall({
                url: `${API_ENDPOINTS.CLIENT_INSIGHTS}?${query}`,
                method: "GET"
            });

            if (res?.success) {
                setData(res.data);
            }

        } catch (error) {
            console.error("Insights API error:", error);
        }

    };



    useEffect(() => {
        fetchInsights();
    }, [clinic_id, range, startDate, endDate]);



    const cards = [

        {
            title: "Monthly Growth Trend",
            value: data?.momGrowth ?? 0,
            suffix: "%",
            desc: "MoM change",
            icon: PieChart,
        },

        {
            title: "YoY Performance",
            value: data?.yoyChange ?? 0,
            suffix: "%",
            desc: "YoY change",
            icon: Clock,
        },

        {
            title: "Device Type Utilization",
            value: data?.deviceUtilization ?? 0,
            suffix: "%",
            desc: "Device utilization",
            icon: Monitor,
        },

        {
            title: "Patient Retention Rate",
            value: data?.patientRetention ?? 0,
            suffix: "%",
            desc: "Returning patients",
            icon: RefreshCcw,
        },

    ];



    return (

        <div className="px-6 py-4">

            <h2 className="text-2xl font-semibold text-gray-600 mb-5">
                Insights
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                {cards.map((card, index) => {

                    const Icon = card.icon;

                    return (

                        <div
                            key={index}
                            className="bg-gray-100 rounded-2xl px-6 py-5 flex items-center justify-between shadow-sm hover:shadow-md transition"
                        >

                            <div>

                                <p className="text-gray-600 text-sm mb-3 font-medium">
                                    {card.title}
                                </p>

                                <div className="flex items-end gap-2">

                                    <span className="text-4xl font-semibold text-green-600 leading-none">
                                        {card.value}
                                    </span>

                                    <span className="text-green-600 text-lg font-medium">
                                        {card.suffix}
                                    </span>

                                    <span className="text-gray-500 text-sm ml-2">
                                        {card.desc}
                                    </span>

                                </div>

                            </div>

                            <Icon
                                size={44}
                                strokeWidth={1.5}
                                className="text-gray-300"
                            />

                        </div>

                    );

                })}

            </div>

        </div>

    );
}
