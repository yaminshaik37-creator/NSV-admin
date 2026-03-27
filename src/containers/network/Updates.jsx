"use client";

import { useEffect, useState } from "react";
import { PieChart } from "lucide-react";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

export default function UpdatesCard({ iid, state, range, startDate, endDate }) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {

            setLoading(true);

            /* ---------- Build Query Params ---------- */

            const query = new URLSearchParams({
                ...(iid && { iid }),
                ...(state && { state }),
                ...(range && { range }),
                ...(startDate && { startDate }),
                ...(endDate && { endDate })
            }).toString();

            const res = await ApiCall({
                url: `${API_ENDPOINTS.NETWORK_KPIS}?${query}`,
                method: "GET"
            });

            if (res?.success) {
                setData(res.data);
            }

        } catch (error) {

            console.error("Error fetching KPIs:", error);

        } finally {

            setLoading(false);

        }
    };



    useEffect(() => {
        fetchData();
    }, [iid, state, range, startDate, endDate]);



    /* ---------- Loading Skeleton ---------- */

    if (loading) {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Updates</h2>

                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white h-[110px] rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }



    return (
        <div className="p-6">

            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Updates
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* KPI 1 */}
                <div className="bg-white rounded-xl shadow-sm p-5 flex justify-between items-center">

                    <div>
                        <p className="text-gray-500 text-sm">
                            Total Procedures (Network)
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-green-600 text-3xl font-semibold">
                                {data?.procedures || 0}
                            </span>
                        </div>
                    </div>

                    <PieChart size={36} className="text-gray-400" />
                </div>


                {/* KPI 2 */}
                <div className="bg-white rounded-xl shadow-sm p-5 flex justify-between items-center">

                    <div>
                        <p className="text-gray-500 text-sm">
                            Active Devices (Network)
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-green-600 text-3xl font-semibold">
                                {data?.activeDevices || 0}
                            </span>
                        </div>
                    </div>

                    <PieChart size={36} className="text-gray-400" />
                </div>


                {/* KPI 3 */}
                <div className="bg-white rounded-xl shadow-sm p-5 flex justify-between items-center">

                    <div>
                        <p className="text-gray-500 text-sm">
                            Avg Center Performance Score
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-green-600 text-3xl font-semibold">
                                {data?.avgCenterPerformance || 0}
                            </span>
                            <span className="text-green-600 text-sm">
                                Score
                            </span>
                        </div>
                    </div>

                    <PieChart size={36} className="text-gray-400" />
                </div>

            </div>

        </div>
    );
}
