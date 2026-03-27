"use client";

import { useState, useEffect } from "react";
import { Maximize2 } from "lucide-react";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

export default function ProceduresOverTime({ facility_id, iid, range, startDate, endDate }) {

    const [activeTab, setActiveTab] = useState("gender");
    const [data, setData] = useState([]);

    const fetchData = async () => {

        const query = new URLSearchParams({
            ...(facility_id && { facility_id }),
            ...(iid && { iid }),
            ...(range && { range }),
            ...(startDate && { startDate }),
            ...(endDate && { endDate })
        }).toString();

        const res = await ApiCall({
            url: `${API_ENDPOINTS.DEVICES_DASHBOARD}?${query}`,
            method: "GET"
        });

        if (res?.success) {

            const total = res.data.genderDistribution.reduce((sum, g) => sum + g.count, 0);

            setData(
                res.data.genderDistribution.map(g => ({
                    label: g.gender,
                    value: Math.round((g.count / total) * 100)
                }))
            );

        }
    };

    useEffect(() => {
        fetchData();
    }, [facility_id, iid, range, startDate, endDate]);


    return (

        <div className="bg-white rounded-[32px] p-6 shadow-sm h-[300px] flex flex-col w-full border border-gray-50 relative">

            <div className="flex justify-between items-center mb-4">

                <div className="flex items-center gap-6">

                    <button
                        className="text-[14px] font-semibold text-gray-400"
                        onClick={() => setActiveTab("age")}
                    >
                        Age Distribution
                    </button>

                    <button
                        className="text-[14px] font-semibold border-b-2 text-[#2563EB] border-[#2563EB]"
                        onClick={() => setActiveTab("gender")}
                    >
                        Gender Distribution
                    </button>

                </div>

                <button className="p-2 bg-[#F0F7FF] rounded-lg text-[#3B82F6]">
                    <Maximize2 size={16} />
                </button>

            </div>


            <div className="flex-1 bg-[#F3F8FB] rounded-[20px] p-6 flex flex-col justify-center gap-6">

                {data.map((item, index) => (

                    <div key={index} className="flex items-center gap-4">

                        <span className="text-[13px] font-medium text-gray-600 w-[60px]">
                            {item.label}
                        </span>

                        <div className="flex-1 relative">

                            <div className="h-[10px] bg-[#D7E7F4] rounded-full" />

                            <div
                                className="absolute top-0 left-0 h-[10px] bg-[#0E5DA8] rounded-full"
                                style={{ width: `${item.value}%` }}
                            />

                        </div>

                        <span className="text-[13px] font-semibold text-gray-500 w-[40px] text-right">
                            {item.value}%
                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
}
