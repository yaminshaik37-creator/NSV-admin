"use client";

import { RotateCcw, DollarSign } from "lucide-react";

export default function InsightsCards() {
    return (
        <div className="w-full font-sans">
            {/* Title */}
            <h2 className="text-[20px] font-medium text-gray-700 mb-4">
                Insights
            </h2>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* Card 1: Regional Coverage Disparity */}
                <div className="bg-white rounded-[24px] p-6 flex justify-between items-start shadow-sm border border-gray-50">
                    <div className="flex flex-col">
                        <p className="text-[14px] text-gray-500 font-medium mb-6">
                            Regional Coverage Disparity
                        </p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-[32px] font-semibold text-[#E53E3E]">
                                19
                            </span>
                            <span className="text-[14px] font-semibold text-[#E53E3E] mr-2">%</span>
                            <p className="text-[12px] text-gray-400 leading-tight max-w-[100px]">
                                Coverage disparity in Gujarat
                            </p>
                        </div>
                    </div>
                    <div className="text-gray-400 mt-2">
                        <RotateCcw size={32} strokeWidth={2.5} className="opacity-60" />
                    </div>
                </div>

                {/* Card 2: Data Quality Issues */}
                <div className="bg-white rounded-[24px] p-6 flex justify-between items-start shadow-sm border border-gray-50">
                    <div className="flex flex-col">
                        <p className="text-[14px] text-gray-500 font-medium mb-6">
                            Data Quality Issues
                        </p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-[32px] font-semibold text-[#D69E2E]">
                                15
                            </span>
                            <span className="text-[14px] font-semibold text-[#D69E2E] mr-2">%</span>
                            <p className="text-[12px] text-gray-400 leading-tight max-w-[100px]">
                                Demographic data missing
                            </p>
                        </div>
                    </div>
                    {/* Custom Triple Circle Icon matching screenshot */}
                    <div className="text-gray-400 mt-2 opacity-60">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="7" r="3" />
                            <circle cx="7" cy="15" r="3" />
                            <circle cx="17" cy="15" r="3" />
                        </svg>
                    </div>
                </div>

                {/* Card 3: Portfolio Imbalance */}
                <div className="bg-white rounded-[24px] p-6 flex justify-between items-start shadow-sm border border-gray-50">
                    <div className="flex flex-col">
                        <p className="text-[14px] text-gray-500 font-medium mb-6">
                            Portfolio Imbalance
                        </p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-[32px] font-semibold text-[#38A169]">
                                45
                            </span>
                            <span className="text-[14px] font-semibold text-[#38A169] mr-2">%</span>
                            <p className="text-[12px] text-gray-400 leading-tight max-w-[100px]">
                                Device mix imbalance
                            </p>
                        </div>
                    </div>
                    <div className="text-gray-400 mt-2">
                        <DollarSign size={36} strokeWidth={2.5} className="opacity-60" />
                    </div>
                </div>

            </div>
        </div>
    );
}
