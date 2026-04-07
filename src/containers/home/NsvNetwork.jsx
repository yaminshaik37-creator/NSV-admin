"use client";

import { useEffect, useState } from "react";
import DashboardFilters from "../network/Filter";
import InsightsCard from "../network/Insights";
import UpdatesCard from "../network/Updates";
import CenterPerformanceTable from "../network/CenterPerformance";
import FootPrint from "../network/Footprint";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

const NsvNetwork = () => {

    const [iid, setIid] = useState("");
    const [clinicId, setClinicId] = useState("");
    const [state, setState] = useState("");

    const [range, setRange] = useState("30d");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [institute, setInstitute] = useState([]);
    const [insights, setInsights] = useState([]);
    const [networkKpis, setNetworkKpis] = useState([]);

    // const { iid, state, clinic_id, range, startDate, endDate } = query;

    useEffect(() => {
        fetchInstitute();
    }, [range]);

    const fetchInstitute = async () => {
        try {
            const res = await ApiCall({ url: API_ENDPOINTS.INSTITUTE_MASTER, body: {}, method: "POST" });
            if (res?.success) {
                setInstitute(res.data)
            }
            fetchInsights();
        } catch (error) {
            console.error(error);
        }
    };

    const fetchInsights = async () => {
        try {
            const payload = { range };
            const res = await ApiCall({ url: API_ENDPOINTS.UNDERPERFORMING_CENTER, method: "POST", body: payload });
            if (res?.success) {
                setInsights(res?.data);
            }
            fetchNetworkKpis()
        } catch (error) {
            console.error("Error fetching insights:", error);
        }
    };
    const fetchNetworkKpis = async () => {
        try {
            const payload = { range };

            const res = await ApiCall({ url: API_ENDPOINTS.NETWORK_KPIS, method: "POST", body: payload });
            if (res?.success) {
                setNetworkKpis(res?.data);
            }
        } catch (error) {
            console.error("Error fetching insights:", error);
        }
    };
    return (
        <div className="space-y-6">

            <DashboardFilters institute={institute} iid={iid} setIid={setIid} clinicId={clinicId} setClinicId={setClinicId} range={range} setRange={setRange} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
            <InsightsCard insights={insights} />

            <UpdatesCard data={networkKpis} />

            <CenterPerformanceTable iid={iid} state={state} clinic_id={clinicId} range={range} startDate={startDate} endDate={endDate} />

            <FootPrint iid={iid} state={state} clinic_id={clinicId} range={range} startDate={startDate} endDate={endDate} />

        </div>
    );
};

export default NsvNetwork;
