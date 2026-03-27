"use client";

import { useState } from "react";
import Filter from "../clientadministration/Filter";
import InsightsCards from "../clientadministration/Insights";
import UpdatesCards from "../clientadministration/Updates";
import DeviceStatus from "../clientadministration/DeviceStatusPerformance";
import DeviceDashboard from "../clientadministration/DeviceDashboard"
import CenterPerformanceTable from "../clientadministration/CenterPerformance";

const ClientAdministration = () => {

    const [filters, setFilters] = useState({
        clinic_id: "",
        range: "30days",
        startDate: "",
        endDate: ""
    });


    return (

        <div>

            <Filter onFilterChange={setFilters} />

            <InsightsCards
                clinic_id={filters.clinic_id}
                range={filters.range}
                startDate={filters.startDate}
                endDate={filters.endDate}
            />

            <UpdatesCards clinic_id={filters.clinic_id}
                startDate={filters.startDate}
                endDate={filters.endDate} />

            <DeviceStatus clinic_id={filters.clinic_id}
                range={filters.range}
                startDate={filters.startDate}
                endDate={filters.endDate} />

            <DeviceDashboard />

            <CenterPerformanceTable
                clinic_id={filters.clinic_id}
                range={filters.range}
                startDate={filters.startDate}
                endDate={filters.endDate}
            />

        </div>

    );

};

export default ClientAdministration;
