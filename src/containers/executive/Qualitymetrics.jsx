"use client";

import { useEffect, useState } from "react";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";
import CommonBarChart from "@/components/charts/CommonBarChart";
import DonutChart from "@/components/charts/DonutChart";
import ChartLegend from "@/components/charts/ChartLegend";

export default function QualityMetrics() {

    const [data, setData] = useState(null);

    // const fetchMetrics = async () => {
    //     try {

    //         const res = await ApiCall({
    //             url: API_ENDPOINTS.QUALITY_METRICS,
    //             method: "GET"
    //         });

    //         if (res?.success) {
    //             setData(res.data);
    //         }

    //     } catch (err) {
    //         console.error("Metrics API error", err);
    //     }
    // };

    // useEffect(() => {
    //     fetchMetrics();
    // }, []);

    // if (!data) return null;
    const DATA = [
        { range: "0-2", value: 150 },
        { range: "3-4", value: 550 },
        { range: "5-6", value: 1400 },
        { range: "7-8", value: 1300 },
        { range: "9-10", value: 400 },
    ];

    return (
        <div className="bg-gray-100 p-10">

            <h2 className="text-lg font-semibold mb-6 text-gray-700">
                Quality Metrics - Click Any Metric to View Chart
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                {/* nGyn */}
                <div className="bg-white rounded-2xl shadow p-6">

                    <h3 className="font-semibold mb-4 text-gray-700">• nGyn Metrics</h3>

                    <Metric label="Average Image Quality score" value={'8.7/10'} color="text-green-600" />

                    <Metric label="Procedure Completion" value={'94.2%'} color="text-green-600" />

                    <Metric label="Acetic Acid Quality" value={`4.8 avg`} />

                    <Metric label="High-Grade Detection" value={`18.3%`} />

                    <div className="h-[200px] my-5">
                        <CommonBarChart data={DATA} layout="vertical" dataKey="value" labelKey="range" />
                    </div>
                </div>

                {/* nOra */}
                <div className="bg-white rounded-2xl shadow p-6">

                    <h3 className="font-semibold mb-4 text-gray-700">
                        • nOra Quality Metrics
                    </h3>

                    <Metric label="Complete Capture" value={`91.5%`} color="text-green-600" />

                    <Metric label="High-Risk Detection" value={`96.8%`} />

                    <div className="h-[200px] my-5">
                        <DonutChart data={[
                            { name: "Excellent", value: 45 },
                            { name: "Good", value: 25 },
                            { name: "Fair", value: 15 },
                            { name: "Poor", value: 15 },
                        ]} />
                        <ChartLegend data={[
                            { name: "Excellent", value: 45 },
                            { name: "Good", value: 25 },
                            { name: "Fair", value: 15 },
                            { name: "Poor", value: 15 },
                        ]} colors={["#9EC3DB", "#6EC1E4", "#3BA3D0", "#1F7FB6"]} />

                    </div>

                </div>

                {/* nCardio */}
                <div className="bg-white rounded-2xl shadow p-6">

                    <h3 className="font-semibold mb-4 text-gray-700">   • nCardio Quality Metrics  </h3>

                    <Metric label="Average Image Quality score" value={'8.7/10'} color="text-green-600" />

                    <Metric label="Procedure Completion" value={'94.2%'} color="text-green-600" />

                    <Metric label="Acetic Acid Quality" value={`4.8 avg`} />

                    <Metric label="High-Grade Detection" value={`18.3%`} />

                    <div className="h-[200px] my-5">
                        <DonutChart data={[
                            { name: "Low Risk", value: 45 },
                            { name: "Medium Risk", value: 25 },
                            { name: "High Risk", value: 15 },
                        ]} />
                        <ChartLegend data={[
                            { name: "Low Risk", value: 45 },
                            { name: "Medium Risk", value: 25 },
                            { name: "High Risk", value: 15 },
                        ]} colors={["#9EC3DB", "#6EC1E4", "#3BA3D0",]} />

                    </div>

                </div>

            </div>
        </div>
    );
}

function Metric({ label, value, color }) {
    return (
        <div className="flex justify-between text-sm mb-3">
            <span className="text-gray-600">{label}</span>
            <span className={`font-semibold ${color || "text-gray-700"}`}>
                {value}
            </span>
        </div>
    );
}
