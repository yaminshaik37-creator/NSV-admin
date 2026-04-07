"use client";

import { PieChart } from "lucide-react";

export default function UpdatesCard({ data }) {

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
                                {data?.procedures?.count || 0}
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
                                {data?.activeDevices?.count || 0}
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
                                {data?.avgCenterPerformance?.avg_center_score || 0}
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
