"use client";


import CommonBarChart from "@/components/charts/CommonBarChart";

export default function VolumeByState({ proceduresVolumeByState }) {


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
                    data={proceduresVolumeByState}
                    layout="horizontal"
                    dataKey="value"
                    labelKey="name"
                />
            </div>

        </div>
    );
}
