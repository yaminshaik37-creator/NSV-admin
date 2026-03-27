"use client";

import { useState } from "react";

import InsightsCards from "../policymaker/Insights";
import UpdatesCards from "../policymaker/Updates";
import Filter from "../policymaker/Filter";
import GlobalCoverageDashboard from "../policymaker/GlobalCovrageDashboard";

const PolicyMaker = () => {

    /* ---------- GLOBAL FILTER STATE ---------- */
    const [iid, setIid] = useState("");
    const [clinic_id, setClinicId] = useState("");
    const [range, setRange] = useState("30d");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    return (
        <div className="p-6 space-y-6">

            {/* FILTER */}
            <Filter
                iid={iid}
                setIid={setIid}
                clinic_id={clinic_id}
                setClinicId={setClinicId}
                range={range}
                setRange={setRange}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />

            {/* INSIGHTS */}
            <InsightsCards
                iid={iid}
                clinic_id={clinic_id}
                range={range}
                startDate={startDate}
                endDate={endDate}
            />

            {/* UPDATES KPI */}
            <UpdatesCards
                iid={iid}
                clinic_id={clinic_id}
                range={range}
                startDate={startDate}
                endDate={endDate}
            />

            {/* MAP */}
            <GlobalCoverageDashboard
                iid={iid}
                clinic_id={clinic_id}
                range={range}
                startDate={startDate}
                endDate={endDate}
            />

        </div>
    );
};

export default PolicyMaker;
