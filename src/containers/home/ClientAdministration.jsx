"use client";

import { useEffect, useState } from "react";
import Filter from "../clientadministration/Filter";
import InsightsCards from "../clientadministration/Insights";
import UpdatesCards from "../clientadministration/Updates";
import DeviceStatus from "../clientadministration/DeviceStatusPerformance";
import DeviceDashboard from "../clientadministration/DeviceDashboard"
import CenterPerformanceTable from "../clientadministration/CenterPerformance";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

const ClientAdministration = () => {

    const [filters, setFilters] = useState({
        clinic_id: "",
        range: "30days",
        startDate: "",
        endDate: ""
    });

    const [clinics, setClinic] = useState([]);

    useEffect(() => {
        fetchClinics();
    }, []);

    const fetchClinics = async () => {
        try {
            const res = await ApiCall({ url: API_ENDPOINTS.CLINIC_MASTER, body: {}, method: "POST" });
            if (res?.success) {
                setClinic(res.data)
            }

        } catch (error) {
            console.error(error);
        }
    };
    return (

        <div>

            <Filter onFilterChange={setFilters} clinics={clinics} />

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
