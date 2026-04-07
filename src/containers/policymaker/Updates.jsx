"use client";

import UpdatesCard from "../executive/UpdatesCard";

export default function UpdatesCards({ updates }) {


    const chartData = [{ value: 10 }, { value: 50 }, { value: 10 }, { value: 40 }, { value: 80 }, { value: 40 }, { value: 70 }, { value: 80 }, { value: 90 }, { value: 100 }];

    return (

        <div className="w-full">

            {/* Title */}
            <h2 className="text-[18px] font-semibold text-gray-600 mb-4">
                Updates
            </h2>

            {/* Grid */}
            <div className="grid md:grid-cols-4 gap-5">

                <UpdatesCard title="Total Procedures (National)" value={updates?.tp_res?.count || 0} chartData={chartData} />
                <UpdatesCard title="Operational Clinics" value={updates?.oc_res?.count || 0} chartData={chartData} />
                <UpdatesCard title="Registered Devices" value={updates?.rd_res?.count || 0} chartData={chartData} />
                <UpdatesCard title="Active Device Ratio" value={updates?.adr_res?.active_ratio_pct || 0} chartData={chartData} />
                <UpdatesCard title="Avg Procedures / Device" value={updates?.ap_res?.avg_procedures_per_device || 0} chartData={chartData} />

            </div>

        </div>
    );
}
