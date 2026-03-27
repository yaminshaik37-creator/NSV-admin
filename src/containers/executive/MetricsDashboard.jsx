"use client";

import { useState } from "react";

import InsightCard from "./MetricCard";
import { PieChart, Star } from "lucide-react";

export default function MetricsDashboard({ selectedState }) {

    const [loading, setLoading] = useState(false);
    const [insights, setInsights] = useState({
        inactive_device_fleet: { percentage: 45 },
        clinic_activity_decline: { percentage: 30 },
        growth_success_story: { percentage: 25 }
    });


    // useEffect(() => {
    //     fetchInsights(selectedState);
    // }, [selectedState]);

    // const fetchInsights = async (state) => {
    //     try {
    //         setLoading(true);

    //         const stateQuery =
    //             state && state !== "All States"
    //                 ? `?state=${state}`
    //                 : "";

    //         const res = await ApiCall({
    //             url: `${API_ENDPOINTS.DASHBOARD_ALERTS}${stateQuery}`,
    //             method: "GET"
    //         });

    //         if (res?.success && res?.data) {
    //             setInsights(res.data);
    //         }

    //     } catch (error) {
    //         console.error("Insights API Error:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    // if (loading) {
    //     return (
    //         <div className="bg-gray-100 p-8 rounded-xl">
    //             <h2 className="text-xl font-semibold mb-6">Insights</h2>

    //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //                 {Array.from({ length: 3 }).map((_, i) => (
    //                     <div
    //                         key={i}
    //                         className="bg-white h-[110px] rounded-xl animate-pulse"
    //                     />
    //                 ))}
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="bg-gray-100 p-8 rounded-xl">

            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Insights
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <InsightCard
                    title="Inactive Device Fleet"
                    value={`${Number(insights?.inactive_device_fleet?.percentage ?? 0)}%`}
                    description="Devices inactive"
                    icon={<PieChart className="opacity-0 animate-fadeIn delay-100" size={40} />}
                />

                <InsightCard
                    title="Clinic Activity Decline"
                    value={`${Number(insights?.clinic_activity_decline?.percentage ?? 0)}%`}
                    description="Clinic activity dropped"
                    icon={<PieChart size={40} className="opacity-0 animate-fadeIn delay-200" />}
                />

                <InsightCard
                    title="Growth Success Story"
                    value={`${Number(insights?.growth_success_story?.percentage ?? 0)}%`}
                    description="[Procedure] growing"
                    icon={<Star size={40} className="opacity-0 animate-fadeIn delay-300" />}
                />

            </div>
        </div>
    );
}
