"use client";

import UpdatesCard from "./UpdatesCard";

export default function Updates({ selectedState, updates }) {

    const chartData = [{ value: 10 }, { value: 50 }, { value: 10 }, { value: 40 }, { value: 80 }, { value: 40 }, { value: 70 }, { value: 80 }, { value: 90 }, { value: 100 }];

    return (
        <div className="bg-gray-100 p-8 rounded-xl">

            <h1 className="text-2xl font-semibold mb-6">
                Updates
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* TOTAL PROCEDURES */}
                <UpdatesCard
                    title="Total Procedures"
                    value={updates?.tp_res?.total_procedures || 0}
                    // percentChange={0}
                    chartData={chartData}
                />

                {/* ACTIVE DEVICE RATIO */}
                <UpdatesCard
                    title="Active Device Ratio"
                    value={`${updates?.adr_res?.active_ratio_pct || 0}%`}
                    // percentChange={3}
                    chartData={chartData}
                />

                {/* PROCEDURES MTD */}
                <UpdatesCard
                    title="Procedures Month-to-Date"
                    value={updates?.pmom_res?.last_30_days || 0}
                    // percentChange={-10}
                    chartData={chartData}
                />

                {/* ACTIVE CLINICS */}
                <UpdatesCard
                    title="Active Clinics"
                    value={updates?.ac_res?.active_clinics || 0}
                    // percentChange={26}
                    chartData={chartData}
                />

            </div>
        </div>
    );
}
