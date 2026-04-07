"use client";

import ProceduresOverTime from "./ProcedureOverTimenew";
// import NationalCoverage from "./NationalCoverage";
import VolumeByState from "./VolumeByState";

import dynamic from "next/dynamic";

const NationalCoverage = dynamic(
    () => import("./NationalCoverage"),
    { ssr: false }
);


export default function Proceduredashboard({ nationalCoverage, proceduresOverTime, proceduresVolumeByState }) {
    return (
        <div className="h-screen bg-[#F5F5F7] p-5 overflow-hidden">
            <div className="h-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-5">
                {/* Left Section */}
                {nationalCoverage && <NationalCoverage nationalCoverage={nationalCoverage} />}

                {/* Right Section */}
                <div className="flex flex-col gap-5 h-full">
                    {proceduresOverTime && <ProceduresOverTime proceduresOverTime={proceduresOverTime} />}
                    {proceduresVolumeByState && <VolumeByState proceduresVolumeByState={proceduresVolumeByState} />}
                </div>
            </div>
        </div>
    );
}
