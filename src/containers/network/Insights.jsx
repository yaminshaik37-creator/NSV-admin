"use client";

import { useEffect, useState } from "react";
import { PieChart } from "lucide-react";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

export default function InsightsCard({
    iid,
    state,
    clinic_id,
    range,
    startDate,
    endDate
}) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {

        try {

            setLoading(true);

            /* ---------- BUILD QUERY ---------- */

            const query = new URLSearchParams({
                ...(iid && { iid }),
                ...(state && { state }),
                ...(clinic_id && { clinic_id }),
                ...(range && { range }),
                ...(startDate && { startDate }),
                ...(endDate && { endDate })
            }).toString();

            const res = await ApiCall({
                url: `${API_ENDPOINTS.UNDERPERFORMING_CENTER}?${query}`,
                method: "GET"
            });

            if (res?.success) {

                const centers = Array.isArray(res?.data)
                    ? res.data.slice(0, 3)
                    : res?.data
                        ? [res.data]
                        : [];

                setData(centers);

            }

        } catch (error) {

            console.error("Error fetching insights:", error);

        } finally {

            setLoading(false);

        }
    };



    useEffect(() => {
        fetchData();
    }, [iid, state, clinic_id, range, startDate, endDate]);



    if (loading) {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Insights</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-white h-[110px] rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }



    if (!loading && data.length === 0) {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Insights
                </h2>

                <div className="bg-white rounded-xl shadow-sm p-6 text-gray-500">
                    No underperforming centers
                </div>
            </div>
        );
    }



    return (
        <div className="p-6">

            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Insights
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {data.map((item, index) => (

                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between"
                    >

                        <div>

                            <p className="text-gray-500 text-sm mb-2">
                                Underperforming Centers
                            </p>

                            <div className="flex items-center gap-3">

                                <span className="text-red-500 text-4xl font-semibold">
                                    {Math.abs(Number(item?.deviation_pct || 0))}
                                </span>

                                <span className="text-red-500 text-lg font-medium">
                                    %
                                </span>

                                <div className="text-gray-500 text-sm leading-tight">
                                    <p className="capitalize">
                                        {item?.center_name || "Unknown"}
                                    </p>
                                    <p>underperforming</p>
                                </div>

                            </div>

                        </div>

                        <div className="text-gray-400">
                            <PieChart size={40} strokeWidth={1.5} />
                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}
