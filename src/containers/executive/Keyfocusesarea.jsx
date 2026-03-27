"use client";

import { useState, useEffect } from "react";
import AlertCard from "./UpdatesCard";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";

export default function KeyFocusAreas() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        fetchAlerts();
    }, []);

    const fetchAlerts = async () => {
        try {
            const res = await ApiCall({
                url: API_ENDPOINTS.DASHBOARD_ALERTS,
                method: "GET",
            });

            if (res?.success && res.data) {
                const data = res.data;

                const apiAlerts = [
                    {
                        id: 1,
                        severity: "CRITICAL",
                        urgency: "URGENT",
                        title: `${data.critical?.inactiveDevices || 0} devices inactive for 30+ days`,
                        description: "Devices not used recently may require audit or follow-up.",
                    },
                    {
                        id: 2,
                        severity: "WARNING",
                        urgency: "ATTENTION",
                        title: `${data.warning?.decliningClinics || 0} clinics showing declining activity`,
                        description: "Clinics with >25% drop in procedures vs last month.",
                    },
                    {
                        id: 3,
                        severity: "SUCCESS",
                        urgency: "SUCCESS",
                        title: `${data.success?.procedureName || ""} procedures up ${data.success?.growthPct || 0}%`,
                        description: "Highest growth procedure compared to previous month.",
                    },
                    {
                        id: 4,
                        severity: "INFO",
                        urgency: "OPPORTUNITY",
                        title: `${data.info?.state || ""} showing ${data.info?.growthPct || 0}% growth`,
                        description: "Region with highest growth in procedures.",
                    },
                ];

                setAlerts(apiAlerts);
            }
        } catch (error) {
            console.error("Dashboard Alerts API Error:", error);
        }
    };

    // EXACT same logic as your original
    const activeCount = alerts.filter(
        (alert) => alert.severity === "CRITICAL" || alert.severity === "WARNING"
    ).length;

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Key Focus Areas</h2>

                <div className="flex items-center gap-2">
                    <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        {activeCount} Active
                    </span>

                    <button
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Options"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Alert Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {alerts.map((alert) => (
                    <AlertCard
                        key={alert.id}
                        severity={alert.severity}
                        urgency={alert.urgency}
                        title={alert.title}
                        description={alert.description}
                        defaultExpanded={true}
                        showToggle={true}
                    />
                ))}
            </div>
        </div>
    );
}
