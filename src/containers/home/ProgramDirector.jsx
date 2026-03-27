"use client";

import { useState } from "react";
import DashboardHeader from "../programdirector/Filter";
import UpdatesCards from "../programdirector/Updates";
import InsightsStatusCards from "../programdirector/Insights";
import GlobalCoverageDashboard from "../programdirector/GlobalCovrageDashboard";

export default function ProgramDirector() {

    const [clinic_id, setClinicId] = useState("");
    const [range, setRange] = useState("30d");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    return (
        <div>

            <DashboardHeader
                clinic_id={clinic_id}
                setClinicId={setClinicId}
                range={range}
                setRange={setRange}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />

            <InsightsStatusCards
                clinic_id={clinic_id}
                range={range}
                startDate={startDate}
                endDate={endDate}
            />

            <UpdatesCards
                clinic_id={clinic_id}
                range={range}
                startDate={startDate}
                endDate={endDate}
            />

            <GlobalCoverageDashboard/>

        </div>
    );
}
