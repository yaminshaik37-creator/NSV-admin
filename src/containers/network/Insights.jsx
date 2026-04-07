"use client";

import { PieChart } from "lucide-react";

export default function InsightsCard({ insights = [] }) {

    return (
        <div className="p-6">

            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Insights
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {(insights || []).map((item, index) => (

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
