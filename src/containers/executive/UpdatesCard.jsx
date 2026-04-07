"use client";

import { ArrowUp, ArrowDown } from "lucide-react";
import Trends from "@/components/charts/Trends";

export default function UpdatesCard({ title, value, percentChange, chartData }) {

    const isPositive = percentChange >= 0;

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center">
            <div>
                <h3 className="text-sm text-gray-500 mb-2">   {title} </h3>

                <div className="text-4xl font-semibold text-green-600"> {value} </div>

                {<div className={`flex items-center text-sm mt-2 ${isPositive ? "text-green-500" : "text-red-500"}`}   >
                    {isPositive ? (
                        <ArrowUp size={14} />
                    ) : (
                        <ArrowDown size={14} />
                    )}

                    <span className="ml-1">
                        {Math.abs(percentChange)}%
                    </span>
                </div>}
            </div>

            {/* Sparkline */}
            <div className="w-[120px] h-[50px]">
                <Trends chartData={chartData} />
            </div>

        </div>
    );
}
