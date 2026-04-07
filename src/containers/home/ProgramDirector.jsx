"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "../programdirector/Filter";
import UpdatesCards from "../programdirector/Updates";
import InsightsStatusCards from "../programdirector/Insights";
import GlobalCoverageDashboard from "../programdirector/GlobalCovrageDashboard";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

export default function ProgramDirector() {

    const [clinic_id, setClinicId] = useState("");
    const [range, setRange] = useState("30d");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

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

            <DashboardHeader clinics={clinics}
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

            <GlobalCoverageDashboard />

        </div>
    );
}
