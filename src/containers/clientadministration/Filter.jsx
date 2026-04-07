"use client";

import { useState, useEffect } from "react";

export default function HeaderFilter({ onFilterChange, clinics }) {

    const [clinic_id, setClinicId] = useState("");
    const [range, setRange] = useState("30days");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    useEffect(() => {

        onFilterChange({
            clinic_id,
            range,
            startDate,
            endDate
        });

    }, [clinic_id, range, startDate, endDate]);



    return (
        <div className="w-full bg-gray-100 px-6 py-4 flex items-center justify-between">

            {/* LEFT */}
            <div className="flex items-center gap-4">

                <h1 className="text-3xl font-semibold text-gray-700">
                    Apollo Hospitals
                </h1>

                <select
                    value={clinic_id}
                    onChange={(e) => setClinicId(e.target.value)}
                    className="border rounded-lg px-3 py-2 bg-white shadow-sm"
                >
                    {clinics.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">

                <div className="flex border rounded-lg overflow-hidden bg-white">

                    <button
                        onClick={() => setRange("24h")}
                        className={`px-4 py-2 ${range === "24h"
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100"
                            }`}
                    >
                        24 hours
                    </button>

                    <button
                        onClick={() => setRange("7days")}
                        className={`px-4 py-2 border-l ${range === "7days"
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100"
                            }`}
                    >
                        7 days
                    </button>

                    <button
                        onClick={() => setRange("30days")}
                        className={`px-4 py-2 border-l ${range === "30days"
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100"
                            }`}
                    >
                        30 days
                    </button>

                </div>


                <div className="flex flex-col text-sm">
                    <label className="text-gray-500">Start date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded-md px-3 py-1 bg-white"
                    />
                </div>


                <div className="flex flex-col text-sm">
                    <label className="text-gray-500">End date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border rounded-md px-3 py-1 bg-white"
                    />
                </div>

            </div>

        </div>
    );
}
