"use client";

import { useEffect, useState } from "react";

import InsightsCards from "../policymaker/Insights";
import UpdatesCards from "../policymaker/Updates";
import Filter from "../policymaker/Filter";
import GlobalCoverageDashboard from "../policymaker/GlobalCovrageDashboard";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

const PolicyMaker = () => {

    /* ---------- GLOBAL FILTER STATE ---------- */
    const [iid, setIid] = useState("");
    const [clinic_id, setClinicId] = useState("");
    const [range, setRange] = useState("30d");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [clinics, setClinic] = useState([]);
    const [insights, setInsights] = useState(null);
    const [updates, setUpdates] = useState(null);

    useEffect(() => {
        fetchClinics();
    }, []);

    const fetchClinics = async () => {
        try {
            const res = await ApiCall({ url: API_ENDPOINTS.CLINIC_MASTER, body: {}, method: "POST" });
            if (res?.success) {
                setClinic(res.data)
            }
            fetchInsights();
        } catch (error) {
            console.error(error);
        }
    };
    const fetchInsights = async () => {
        try {
            const res = await ApiCall({ url: API_ENDPOINTS.POLICY_MAKER_INSIGHTS, body: {}, method: "POST" });
            if (res?.success) {
                setInsights(res.data)
            }
            fetchUpdates();
        } catch (error) {
            console.error(error);
        }
    };
    const fetchUpdates = async () => {
        try {
            const res = await ApiCall({ url: API_ENDPOINTS.UPDATES_KPIS, body: {}, method: "POST" });
            if (res?.success) {
                setUpdates(res.data)
            }

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="p-6 space-y-6">

            {/* FILTER */}
            <Filter clinics={clinics} iid={iid} setIid={setIid} clinic_id={clinic_id} setClinicId={setClinicId} range={range} setRange={setRange} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />

            {/* INSIGHTS */}
            <InsightsCards insights={insights} />

            {/* UPDATES KPI */}
            <UpdatesCards updates={updates} />

            {/* MAP */}
            <GlobalCoverageDashboard iid={iid} clinic_id={clinic_id} range={range} startDate={startDate} endDate={endDate} />

        </div>
    );
};

export default PolicyMaker;
