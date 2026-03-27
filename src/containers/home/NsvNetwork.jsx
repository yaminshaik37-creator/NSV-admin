"use client";

import React, { useState } from "react";
import DashboardFilters from "../network/Filter";
import InsightsCard from "../network/Insights";
import UpdatesCard from "../network/Updates";
import CenterPerformanceTable from "../network/CenterPerformance";
import FootPrint from "../network/Footprint";

const NsvNetwork = () => {

    const [iid, setIid] = useState("");
    const [clinicId, setClinicId] = useState("");
    const [state, setState] = useState("");

    const [range, setRange] = useState("30d");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    return (
        <div className="space-y-6">

            <DashboardFilters
                iid={iid}
                setIid={setIid}
                clinicId={clinicId}
                setClinicId={setClinicId}
                range={range}
                setRange={setRange}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />

            <InsightsCard
                iid={iid}
                state={state}
                clinic_id={clinicId}
                range={range}
                startDate={startDate}
                endDate={endDate}
            />

            <UpdatesCard
                iid={iid}
                state={state}
                clinic_id={clinicId}
                range={range}
                startDate={startDate}
                endDate={endDate}
            />

            <CenterPerformanceTable
                iid={iid}
                state={state}
                clinic_id={clinicId}
                range={range}
                startDate={startDate}
                endDate={endDate}
            />

            <FootPrint
                iid={iid}
                state={state}
                clinic_id={clinicId}
                range={range}
                startDate={startDate}
                endDate={endDate}
            />

        </div>
    );
};

export default NsvNetwork;
