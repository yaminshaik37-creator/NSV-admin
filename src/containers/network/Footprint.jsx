"use client";

import DeviceCard from "./ProcedureOverTime";
// import ProceduresOverTime from "./NationalCoverage";
import VolumeByState from "./ProcedureVolumeByState";


import dynamic from "next/dynamic";

const ProceduresOverTime = dynamic(
    () => import("./NationalCoverage"),
    { ssr: false }
);


/* ---------------- MAIN DASHBOARD ---------------- */
export default function Dashboard() {
    return (
        <div className="h-screen bg-[#F5F5F7] p-5 overflow-hidden">
            <div className="h-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-5">
                {/* Left Section */}
                <ProceduresOverTime />

                {/* Right Section */}
                <div className="flex flex-col gap-5 h-full">
                    <DeviceCard />
                    <VolumeByState />
                </div>
            </div>
        </div>
    );
}
