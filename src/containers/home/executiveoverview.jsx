"use client";

import { useEffect, useState } from "react";

import Filter from "../executive/Filter";
import MetricsDashboard from "../executive/MetricsDashboard";
import ProceduresDashboard from "../executive/Proceduredashboard";
import QualityMetrics from "../executive/Qualitymetrics";
import Updates from "../executive/Updates";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

const ExecutiveOverview = () => {

    const [selectedState, setSelectedState] = useState("Telangana");
    const [insights, setInsights] = useState(null);
    const [updates, setUpdates] = useState(null);
    const [nationalCoverage, setNationalCoverage] = useState(null);
    const [proceduresOverTime, setProceduresOverTime] = useState(null);
    const [proceduresVolumeByState, setProceduresVolumeByState] = useState(null);
    const [qualityMetrics_ngyn, setQualityMetrics_ngyn] = useState(null);
    const [qualityMetrics_ncardio, setQualityMetrics_ncardio] = useState(null);
    const [qualityMetrics_nora, setQualityMetrics_nora] = useState(null);

    useEffect(() => {
        fetchInsights();
    }, [selectedState]);

    const fetchInsights = async () => {
        try {
            const res = await ApiCall({ url: API_ENDPOINTS.EXE_DASHBOARD_ALERTS, body: { state: selectedState }, method: "POST" });
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
            const res = await ApiCall({ url: API_ENDPOINTS.UPDATES_KPI, body: { state: selectedState }, method: "POST" });
            if (res?.success) {
                setUpdates(res.data)
            }
            fetchNationalCoverage()
        } catch (error) {
            console.error(error);
        }
    };

    const fetchNationalCoverage = async () => {
        try {
            const res = await ApiCall({ url: API_ENDPOINTS.EXE_NATIONAL_COVERAGE, body: { country: 'India' }, method: "POST" });
            if (res?.success) {
                setNationalCoverage(res.data)
            }
            fetchProceduresOverTime()
        } catch (error) {
            console.error(error);
        }
    };
    const fetchProceduresOverTime = async () => {
        try {
            const res = await ApiCall({ url: API_ENDPOINTS.PROCEDURES_OVER_TIME, body: { state: '' }, method: "POST" });
            if (res?.success) {
                setProceduresOverTime(res.data)
            }
            fetchProceduresVolumeByState()
        } catch (error) {
            console.error(error);
        }
    };
    const fetchProceduresVolumeByState = async () => {
        try {
            const res = await ApiCall({ url: API_ENDPOINTS.EXE_PROCEDURES_VOLUME_BY_STATE, body: {}, method: "POST" });
            if (res?.success) {
                setProceduresVolumeByState(res.data)
            }
            fetchQualityMetrics_ngyn()
        } catch (error) {
            console.error(error);
        }
    };
    const fetchQualityMetrics_ngyn = async () => {
        try {
            const res = await ApiCall({ url: API_ENDPOINTS.EXE_QUALITY_METRICS_NGYN, body: {}, method: "POST" });
            if (res?.success) {
                setQualityMetrics_ngyn(res.data)
            }
            fetchQualityMetrics_ncardio()
        } catch (error) {
            console.error(error);
        }
    };
    const fetchQualityMetrics_ncardio = async () => {
        try {
            const res = await ApiCall({ url: API_ENDPOINTS.EXE_QUALITY_METRICS_NCARDIO, body: {}, method: "POST" });
            if (res?.success) {
                setQualityMetrics_ncardio(res.data)
            }
            fetchQualityMetrics_nora()
        } catch (error) {
            console.error(error);
        }
    };

    const fetchQualityMetrics_nora = async () => {
        try {
            const res = await ApiCall({ url: API_ENDPOINTS.EXE_QUALITY_METRICS_NORA, body: {}, method: "POST" });
            if (res?.success) {
                setQualityMetrics_nora(res.data)
            }

        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <Filter selectedState={selectedState} setSelectedState={setSelectedState} />

            <MetricsDashboard selectedState={selectedState} insights={insights} />
            <Updates selectedState={selectedState} updates={updates} />
            <ProceduresDashboard selectedState={selectedState} nationalCoverage={nationalCoverage} proceduresOverTime={proceduresOverTime} proceduresVolumeByState={proceduresVolumeByState} />
            <QualityMetrics selectedState={selectedState} qualityMetrics_ngyn={qualityMetrics_ngyn} qualityMetrics_ncardio={qualityMetrics_ncardio} qualityMetrics_nora={qualityMetrics_nora} />

        </>
    );
};

export default ExecutiveOverview;
