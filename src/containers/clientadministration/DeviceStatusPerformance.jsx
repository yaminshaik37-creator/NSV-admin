"use client";

import { useEffect, useState } from "react";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

export default function DeviceStatus({
    clinic_id,
    range,
    startDate,
    endDate
}) {

    const [devices, setDevices] = useState([]);

    const fetchDevices = async () => {
        try {

            const query = new URLSearchParams({
                ...(clinic_id && { clinic_id }),
                ...(range && { range }),
                ...(startDate && { startDate }),
                ...(endDate && { endDate })
            }).toString();

            const res = await ApiCall({
                url: `${API_ENDPOINTS.DEVICE_STATUS}?${query}`,
                method: "GET"
            });

            if (res?.success) {
                setDevices(res.data || []);
            }

        } catch (error) {
            console.error("Device Status API Error:", error);
        }
    };

    useEffect(() => {
        fetchDevices();
    }, [clinic_id, range, startDate, endDate]);



    const getDeviceDescription = (device) => {

        const map = {
            nGyn: "Cervical Cancer Screening",
            nOrtho: "Cardiac Monitoring",
            nOra: "Oral Cancer Screening"
        };

        return map[device] || "Medical Device";
    };



    return (
        <div className="px-6 py-6">

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-600 mb-6">
                Device Status & Performance
            </h2>


            {/* Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">

                {devices.map((device, index) => (

                    <div
                        key={index}
                        className=" bg-gray-100 rounded-2xl p-6 shadow-sm"
                    >

                        {/* Header */}
                        <div className="flex justify-between items-center mb-2">

                            <h3 className="text-lg font-semibold text-gray-700">
                                {device.device}
                            </h3>

                            <span
                                className={`text-xs font-semibold px-3 py-1 rounded-md ${device.status === "ACTIVE"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-red-100 text-red-600"
                                    }`}
                            >
                                {device.status}
                            </span>

                        </div>


                        {/* Description */}
                        <p className="text-gray-500 text-sm mb-6">
                            {getDeviceDescription(device.device)}
                        </p>


                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">

                            {/* Procedures */}
                            <div className="bg-gray-200 rounded-xl py-5 text-center">

                                <p className="text-3xl font-semibold text-gray-700">
                                    {device.proceduresMTD}
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
                                    Procedures MTD
                                </p>

                            </div>


                            {/* Uptime */}
                            <div className="bg-gray-200 rounded-xl py-5 text-center">

                                <p className="text-3xl font-semibold text-gray-700">
                                    {Number(device.uptimePct).toFixed(1)}%
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
                                    Uptime
                                </p>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}
