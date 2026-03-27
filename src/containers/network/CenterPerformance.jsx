"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CenterPerformanceTable({
    iid,
    state,
    clinic_id,
    range,
    startDate,
    endDate,
}) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;



    const fetchData = useCallback(async () => {

        try {

            setLoading(true);

            /* ---------- Build Query ---------- */

            const query = new URLSearchParams({
                ...(iid && { iid }),
                ...(state && { state }),
                ...(clinic_id && clinic_id !== "all" && { clinic_id }),
                ...(range && { range }),
                ...(startDate && { startDate }),
                ...(endDate && { endDate })
            }).toString();

            const res = await ApiCall({
                url: `${API_ENDPOINTS.CENTER_PERFORMANCE_OVERVIEW}?${query}`,
                method: "GET"
            });

            if (res?.success) {

                setData(Array.isArray(res.data) ? res.data : []);
                setCurrentPage(1);

            } else {

                setData([]);

            }

        } catch (error) {

            console.error("Error fetching center performance:", error);
            setData([]);

        } finally {

            setLoading(false);

        }

    }, [iid, state, clinic_id, range, startDate, endDate]);



    useEffect(() => {
        fetchData();
    }, [fetchData]);



    const totalPages = Math.ceil(data.length / itemsPerPage);



    const paginatedData = useMemo(() => {

        const startIndex = (currentPage - 1) * itemsPerPage;
        return data.slice(startIndex, startIndex + itemsPerPage);

    }, [data, currentPage]);



    const handlePageChange = (newPage) => {

        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }

    };



    return (

        <div className="w-full p-6 flex flex-col gap-4">

            <h2 className="text-xl font-bold text-[#4B4B4B]">
                Center Performance Overview
            </h2>


            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full text-sm border-collapse table-fixed min-w-[1000px]">

                        <thead>

                            <tr className="bg-gray-50/50 border-b border-gray-100">

                                <th className="p-4 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs w-[30%]">
                                    Center Name
                                </th>

                                <th className="p-4 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs w-[15%]">
                                    Region
                                </th>

                                <th className="p-4 text-center font-semibold text-gray-500 uppercase tracking-wider text-xs w-[11%]">
                                    Devices
                                </th>

                                <th className="p-4 text-center font-semibold text-gray-500 uppercase tracking-wider text-xs w-[11%]">
                                    Procedures
                                </th>

                                <th className="p-4 text-center font-semibold text-gray-500 uppercase tracking-wider text-xs w-[11%]">
                                    Change vs Last Month
                                </th>

                                <th className="p-4 text-center font-semibold text-gray-500 uppercase tracking-wider text-xs w-[11%]">
                                    Patients
                                </th>

                                <th className="p-4 text-center font-semibold text-gray-500 uppercase tracking-wider text-xs w-[11%]">
                                    Rate
                                </th>

                            </tr>

                        </thead>



                        <tbody className="divide-y divide-gray-100">

                            {loading ? (

                                <tr>
                                    <td colSpan="7" className="text-center py-20 text-gray-400">
                                        Loading...
                                    </td>
                                </tr>

                            ) : paginatedData.length === 0 ? (

                                <tr>
                                    <td colSpan="7" className="text-center py-20 text-gray-400 font-medium">
                                        No data available
                                    </td>
                                </tr>

                            ) : (

                                paginatedData.map((item, index) => {

                                    const change = parseFloat(item.change_vs_last_month) || 0;
                                    const isPositive = change >= 0;

                                    return (

                                        <tr key={index} className="hover:bg-gray-50/80 transition-colors">

                                            <td className="p-4 whitespace-nowrap">

                                                <div className="flex items-center gap-3">

                                                    <div
                                                        className={`w-1 h-6 rounded-full shrink-0 ${isPositive ? "bg-green-500" : "bg-red-500"
                                                            }`}
                                                    />

                                                    <span className="text-gray-800 font-semibold text-[15px] truncate">
                                                        {item.center_name}
                                                    </span>

                                                </div>

                                            </td>


                                            <td className="p-4 text-gray-600 font-medium uppercase text-xs truncate">
                                                {item.region}
                                            </td>


                                            <td className="p-4 text-center text-gray-700 font-bold">
                                                {Number(item.devices).toLocaleString()}
                                            </td>


                                            <td className="p-4 text-center text-gray-700 font-bold">
                                                {Number(item.procedures).toLocaleString()}
                                            </td>


                                            <td className="p-4 text-center whitespace-nowrap">

                                                <span
                                                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${isPositive
                                                            ? "bg-green-50 text-green-600"
                                                            : "bg-red-50 text-red-600"
                                                        }`}
                                                >
                                                    {isPositive ? "+" : ""}
                                                    {change}%
                                                </span>

                                            </td>


                                            <td className="p-4 text-center text-gray-700 font-bold">
                                                {Number(item.patients).toLocaleString()}
                                            </td>


                                            <td className="p-4 text-center">
                                                <span className="text-gray-800 font-bold">
                                                    {Number(item.rate)}%
                                                </span>
                                            </td>

                                        </tr>

                                    );

                                })

                            )}

                        </tbody>

                    </table>

                </div>



                {data.length > itemsPerPage && (

                    <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white">

                        <span className="text-xs text-gray-500 font-medium">

                            Showing {(currentPage - 1) * itemsPerPage + 1}
                            {" "}to{" "}
                            {Math.min(currentPage * itemsPerPage, data.length)}
                            {" "}of{" "}
                            {data.length} entries

                        </span>



                        <div className="flex items-center gap-2">

                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50"
                            >
                                <ChevronLeft size={16} />
                            </button>



                            {[...Array(totalPages)].map((_, i) => (

                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${currentPage === i + 1
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-500 hover:bg-gray-100"
                                        }`}
                                >
                                    {i + 1}
                                </button>

                            ))}



                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50"
                            >
                                <ChevronRight size={16} />
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );
}
