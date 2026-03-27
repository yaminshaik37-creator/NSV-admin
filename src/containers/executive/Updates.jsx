"use client";

import { useEffect, useState } from "react";
import UpdatesCard from "./UpdatesCard";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

export default function Updates({ selectedState }) {

    const [kpiData, setKpiData] = useState({});
    const [loading, setLoading] = useState(false);

    // const fetchKpis = async (state) => {
    //     try {
    //         setLoading(true);

    //         const stateQuery =
    //             state && state !== "All States"
    //                 ? `?state=${state}`
    //                 : "";

    //         const res = await ApiCall({
    //             url: `${API_ENDPOINTS.EXECUTIVE_UPDATES}${stateQuery}`,
    //             method: "GET"
    //         });

    //         if (res?.success) {
    //             setKpiData(res.data);
    //         }

    //     } catch (error) {
    //         console.error("KPI Error:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchKpis(selectedState);
    // }, [selectedState]);

    const chartData = [{ value: 10 }, { value: 50 }, { value: 10 }, { value: 40 }, { value: 80 }, { value: 40 }, { value: 70 }, { value: 80 }, { value: 90 }, { value: 100 }];

    // if (loading) {
    //     return (
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    //             {Array.from({ length: 4 }).map((_, i) => (
    //                 <div
    //                     key={i}
    //                     className="bg-white h-[130px] rounded-xl animate-pulse"
    //                 />
    //             ))}
    //         </div>
    //     );
    // }

    return (
        <div className="bg-gray-100 p-8 rounded-xl">

            <h1 className="text-2xl font-semibold mb-6">
                Updates
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* TOTAL PROCEDURES */}
                <UpdatesCard
                    title="Total Procedures"
                    value={155}
                    percentChange={0}
                    chartData={chartData}
                />

                {/* ACTIVE DEVICE RATIO */}
                <UpdatesCard
                    title="Active Device Ratio"
                    value={66}
                    percentChange={3}
                    chartData={chartData}
                />

                {/* PROCEDURES MTD */}
                <UpdatesCard
                    title="Procedures Month-to-Date"
                    value={980}
                    percentChange={-10}
                    chartData={chartData}
                />

                {/* ACTIVE CLINICS */}
                <UpdatesCard
                    title="Active Clinics"
                    value={95}
                    percentChange={26}
                    chartData={chartData}
                />

            </div>
        </div>
    );
}
