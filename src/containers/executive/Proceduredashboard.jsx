"use client";

import ProceduresOverTime from "./ProcedureOverTimenew";
import NationalCoverage from "./NationalCoverage";
import VolumeByState from "./VolumeByState";


/* ---------------- LEFT: Procedures Over Time (AREA CHART) ---------------- */


/* ---------------- RIGHT TOP: Device Card with Top Tabs ---------------- */


/* ---------------- RIGHT BOTTOM: Volume by State ---------------- */


/* ---------------- MAIN DASHBOARD ---------------- */
export default function Proceduredashboard() {
    return (
        <div className="h-screen bg-[#F5F5F7] p-5 overflow-hidden">
            <div className="h-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-5">
                {/* Left Section */}
                <NationalCoverage />

                {/* Right Section */}
                <div className="flex flex-col gap-5 h-full">
                    <ProceduresOverTime />
                    <VolumeByState />
                </div>
            </div>
        </div>
    );
}
