"use client";

import { useEffect, useState } from "react";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

import CommonBarChart from "@/components/charts/CommonBarChart";

export default function VolumeByState() {

    const [data, setData] = useState([]);

    // const fetchVolumeByState = async () => {
    //     try {

    //         const res = await ApiCall({
    //             url: API_ENDPOINTS.PROCEDURES_VOLUME_BY_STATE,
    //             method: "GET"
    //         });

    //         if (res?.success) {

    //             const cleaned = res.data
    //                 .filter(item =>
    //                     item.procedures > 0 &&     // remove zero values
    //                     item.state &&              // ensure state exists
    //                     item.state.length > 3      // remove pa, k, t etc
    //                 )
    //                 .sort((a, b) => b.procedures - a.procedures) // highest first
    //                 .slice(0, 5)                                 // show only 5
    //                 .map(item => ({
    //                     state: item.state.charAt(0).toUpperCase() + item.state.slice(1),
    //                     value: Number(item.procedures)
    //                 }));

    //             setData(cleaned);
    //         }

    //     } catch (error) {
    //         console.error("Volume by state API error:", error);
    //     }
    // };

    // useEffect(() => {
    //     fetchVolumeByState();
    // }, []);

    const stateData = [
        { name: "Guj", value: 60 },
        { name: "Mah", value: 60 },
        { name: "Kar", value: 57 },
        { name: "TN", value: 53 },
        { name: "Raj", value: 50 },
        { name: "Del", value: 47 },
    ];

    return (
        <div className="bg-white rounded-[32px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col h-[50%] overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-center mb-1">
                <h2 className="text-[20px] font-semibold text-gray-900">
                    Procedures Volume by State
                </h2>

                <button className="p-2.5 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                    <svg
                        className="w-5 h-5 text-[#3B82F6]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                    </svg>
                </button>
            </div>

            {/* Chart */}
            <div className="flex-1 min-h-0">

                <CommonBarChart
                    data={stateData}
                    layout="horizontal"
                    dataKey="value"
                    labelKey="name"
                />
            </div>

        </div>
    );
}
