"use client";

export default function DashboardFilters({ institute,
    iid,
    setIid,
    clinicId,
    setClinicId,
    range,
    setRange,
    startDate,
    setStartDate,
    endDate,
    setEndDate
}) {

    return (
        <div className="flex flex-wrap items-center justify-between bg-white rounded-xl shadow-sm p-4 gap-4">

            {/* Left Section */}
            <div className="flex items-center gap-4">

                <h2 className="text-lg font-semibold text-gray-700">
                    Network Overview
                </h2>

                {/* Institution */}
                <select
                    value={iid}
                    onChange={(e) => setIid(e.target.value)}
                    className="border rounded-md px-3 py-2 text-sm"
                >
                    <option value="">All Institutions</option>
                    {institute?.map((item, index) => (
                        <option key={index} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                {/* Clinic Filter */}
                {/* <select
                    value={clinicId}
                    onChange={(e) => setClinicId(e.target.value)}
                    className="border rounded-md px-3 py-2 text-sm"
                >
                    <option value="">All Clinics</option>
                    <option value="1">Clinic 1</option>
                    <option value="2">Clinic 2</option>
                    <option value="3">Clinic 3</option>
                </select> */}

            </div>


            {/* Right Section */}
            <div className="flex items-center gap-3">

                {/* Range Buttons */}
                <div className="flex border rounded-lg overflow-hidden">

                    <button
                        onClick={() => setRange("24h")}
                        className={`px-4 py-2 text-sm ${range === "24h"
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-600"
                            }`}
                    >
                        24 hours
                    </button>

                    <button
                        onClick={() => setRange("7d")}
                        className={`px-4 py-2 text-sm border-l ${range === "7d"
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-600"
                            }`}
                    >
                        7 days
                    </button>

                    <button
                        onClick={() => setRange("30d")}
                        className={`px-4 py-2 text-sm border-l ${range === "30d"
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-600"
                            }`}
                    >
                        30 days
                    </button>

                </div>


                {/* Date Range */}
                <div className="flex items-center gap-2">

                    <div className="flex flex-col text-xs text-gray-500">
                        <label>Start date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border rounded-md px-2 py-1 text-sm"
                        />
                    </div>

                    <span className="mt-4">–</span>

                    <div className="flex flex-col text-xs text-gray-500">
                        <label>End date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border rounded-md px-2 py-1 text-sm"
                        />
                    </div>

                </div>

            </div>

        </div>
    );
}
