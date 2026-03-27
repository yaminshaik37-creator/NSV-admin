"use client";

import { useState } from "react";
import Filter from "../executive/Filter";
import MetricsDashboard from "../executive/MetricsDashboard";
import ProceduresDashboard from "../executive/Proceduredashboard";
import QualityMetrics from "../executive/Qualitymetrics";
import Updates from "../executive/Updates";

const ExecutiveOverview = () => {

    const [selectedState, setSelectedState] = useState("All States");

    return (
        <>
            <Filter selectedState={selectedState} setSelectedState={setSelectedState} />

            <MetricsDashboard selectedState={selectedState} />
            <Updates selectedState={selectedState} />
            <ProceduresDashboard selectedState={selectedState} />
            <QualityMetrics selectedState={selectedState} />

        </>
    );
};

export default ExecutiveOverview;
