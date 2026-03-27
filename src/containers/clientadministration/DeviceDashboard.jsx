"use client";

import AgeDistrubution from "./AgeDistribution";
import DeviceUtilization from "./DeviceUtilization";
import DailyDeviceVolume from "./DailyProcedureVolume";

export default function Dashboard() {
    return (
        <div className="h-screen bg-[#F5F5F7] p-5 overflow-hidden">
            <div className="h-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-5">
                {/* Left Section */}
                <DeviceUtilization />

                {/* Right Section */}
                <div className="flex flex-col gap-5 h-full">
                    <AgeDistrubution />
                    <DailyDeviceVolume />
                </div>
            </div>
        </div>
    );
}
