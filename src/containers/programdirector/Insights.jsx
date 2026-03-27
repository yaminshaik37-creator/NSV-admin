"use client";

import { RotateCcw, CircleDot, DollarSign } from "lucide-react";

export default function InsightsStatusCards() {

    const cards = [
        {
            title: "Utilization Gap Status",
            value: "19%",
            desc: "Of registered devices inactive",
            color: "text-red-500",
            icon: RotateCcw
        },
        {
            title: "Concentration Risk Status",
            value: "65%",
            desc: "Operations in Maharashtra",
            color: "text-orange-500",
            icon: CircleDot
        },
        {
            title: "Budget Utilization Status",
            value: "45%",
            desc: "Budget utilized",
            color: "text-green-600",
            icon: DollarSign
        }
    ];

    return (
        <div className="px-6 py-4">

            {/* Title */}
            <h2 className="text-[22px] font-semibold text-gray-600 mb-6">
                Insights
            </h2>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">

                {cards.map((card, index) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={index}
                            className="bg-gray-100 rounded-2xl px-6 py-5 flex justify-between items-center shadow-sm min-h-[110px]"
                        >

                            {/* LEFT */}
                            <div className="flex flex-col">

                                <p className="text-gray-600 text-[14px] mb-3 font-medium">
                                    {card.title}
                                </p>

                                <div className="flex items-center gap-2">

                                    <span className={`text-[40px] leading-none font-semibold ${card.color}`}>
                                        {card.value}
                                    </span>

                                    <span className="text-sm text-gray-500 max-w-[140px] leading-tight">
                                        {card.desc}
                                    </span>

                                </div>

                            </div>

                            {/* RIGHT ICON */}
                            <Icon
                                size={42}
                                strokeWidth={1.5}
                                className="text-gray-300 flex-shrink-0"
                            />

                        </div>
                    );
                })}

            </div>

        </div>
    );
}
