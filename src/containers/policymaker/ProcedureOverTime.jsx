"use client";

import { useEffect, useState } from "react";
import { Maximize2 } from "lucide-react";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

export default function ClinicsPerformanceDetails({
    iid,
    clinic_id,
    range,
    startDate,
    endDate
}) {

    const [states, setStates] = useState([]);

    /* ---------- query builder ---------- */
    const buildQuery = (params) =>
        new URLSearchParams(
            Object.fromEntries(
                Object.entries(params).filter(([_, v]) => v)
            )
        ).toString();

    /* ---------- color mapper ---------- */
    const getColor = (performance) => {
        if (performance === "Excellent") return "bg-green-500";
        if (performance === "Moderate") return "bg-yellow-400";
        if (performance === "Low") return "bg-red-400";
        return "bg-red-500";
    };

    /* ---------- API ---------- */
    const fetchData = async () => {
        try {

            const query = buildQuery({
                iid,
                facility_id: clinic_id, // ⚠️ mapping correct
                range,
                startDate,
                endDate
            });

            const res = await ApiCall({
                url: `${API_ENDPOINTS.CLINICS_PERFORMANCE_DETAILS}?${query}`,
                method: "GET"
            });

            if (res?.success) {
                const mapped = res.data.map((s) => ({
                    name: capitalize(s.state),
                    value: s.procedures,
                    label: s.performance,
                    color: getColor(s.performance)
                }));

                setStates(mapped);
            }

        } catch (error) {
            console.error("Clinics Performance API Error:", error);
            setStates([]);
        }
    };

    /* ---------- helper ---------- */
    const capitalize = (str) =>
        str?.replace(/\b\w/g, (c) => c.toUpperCase());

    /* ---------- lifecycle ---------- */
    useEffect(() => {
        fetchData();
    }, [iid, clinic_id, range, startDate, endDate]);

    return (
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 w-full">

            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-[18px] font-bold text-gray-700">
                        Clinics Performance Details
                    </h2>
                    <p className="text-[13px] text-gray-400">
                        Clinics by States
                    </p>
                </div>

                <button className="p-2 bg-blue-50 rounded-xl text-blue-600">
                    <Maximize2 size={16} />
                </button>
            </div>

            {/* Map Layout */}
            <div className="grid grid-cols-3 gap-y-6 text-center mb-6">

                {states.map((s, i) => (
                    <div key={i} className="flex flex-col items-center">

                        {/* Value */}
                        <span className="text-[12px] font-semibold text-gray-600 mb-1">
                            {s.value}
                        </span>

                        {/* Indicator */}
                        <div className={`w-4 h-4 ${s.color} mb-1`} />

                        {/* Label */}
                        <span className="text-[12px] font-semibold text-gray-600">
                            {s.label}
                        </span>

                        {/* State */}
                        <span className="text-[12px] text-gray-400 mt-1">
                            {s.name}
                        </span>

                    </div>
                ))}

            </div>

            {/* Table (static for now — can make dynamic later) */}
            <div className="bg-[#F1F5F9] rounded-xl overflow-hidden">

                <table className="w-full text-[12px] text-gray-600">
                    <thead className="bg-[#E2E8F0] text-gray-600">
                        <tr>
                            <th className="text-left px-3 py-2">Est. Procedures</th>
                            <th>Guj</th>
                            <th>Del</th>
                            <th>Mah</th>
                            <th>Raj</th>
                            <th>Other</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="text-center">
                            <td className="text-left px-3 py-2 font-medium">Clinics</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>

                        <tr className="text-center">
                            <td className="text-left px-3 py-2 font-medium">% of National</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>
    );
}
