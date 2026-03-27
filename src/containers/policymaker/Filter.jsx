"use client";

export default function DashboardHeader({
    clinic_id,
    setClinicId,
    range,
    setRange,
    startDate,
    setStartDate,
    endDate,
    setEndDate
}) {

    const facilities = [
        { id: "all", name: "All Facilities" },
        { id: 1, name: "Apollo Ahmedabad" },
        { id: 2, name: "Apollo Surat" },
        { id: 3, name: "Apollo Mumbai" },
        { id: 4, name: "Apollo Mumbai" },
        { id: 5, name: "Apollo Mumbai" },
        { id: 6, name: "Apollo Mumbai" },
    ];

    return (
        <div className="w-full flex justify-between items-center">

            {/* LEFT */}
            <div className="flex items-center gap-4">

                <h1 className="text-[28px] font-semibold text-gray-700">
                    Apollo Hospitals
                </h1>

                <select
                    value={clinic_id || "all"}
                    onChange={(e) =>
                        setClinicId(e.target.value === "all" ? "" : e.target.value)
                    }
                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none"
                >
                    {facilities.map((f) => (
                        <option key={f.id} value={f.id}>
                            {f.name}
                        </option>
                    ))}
                </select>

            </div>


            {/* RIGHT */}
            <div className="flex items-center gap-3">

                {/* RANGE BUTTONS */}
                <div className="flex border border-gray-300 rounded-md overflow-hidden bg-white">

                    {[
                        { key: "24h", label: "24 hours" },
                        { key: "7d", label: "7 days" },
                        { key: "30d", label: "30 days" }
                    ].map((r) => (

                        <button
                            key={r.key}
                            onClick={() => setRange(r.key)}
                            className={`px-4 py-1.5 text-sm flex items-center gap-1 border-r last:border-r-0
                            ${range === r.key
                                    ? "bg-blue-50 text-blue-600 font-medium"
                                    : "text-gray-600 bg-white"
                                }`}
                        >
                            {range === r.key && r.key === "30d" && "✓"}
                            {r.label}
                        </button>

                    ))}

                    <div className="px-2 flex items-center border-l">
                        <span className="text-gray-500">▾</span>
                    </div>

                </div>


                {/* DATE FILTER */}
                <div className="flex items-center gap-2">

                    <div className="border border-blue-400 rounded-md px-3 py-1 text-sm text-gray-700 flex flex-col leading-tight">
                        <span className="text-[10px] text-gray-400">Start date</span>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="outline-none bg-transparent text-sm"
                        />
                    </div>

                    <span className="text-gray-400">–</span>

                    <div className="border border-blue-400 rounded-md px-3 py-1 text-sm text-gray-700 flex flex-col leading-tight">
                        <span className="text-[10px] text-gray-400">End date</span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="outline-none bg-transparent text-sm"
                        />
                    </div>

                </div>

            </div>

        </div>
    );
}
