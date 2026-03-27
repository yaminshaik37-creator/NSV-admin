"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";
import "leaflet/dist/leaflet.css";

/* State coordinates */
const stateCoordinates = {
    gujarat: [22.2587, 71.1924],
    maharashtra: [19.7515, 75.7139],
    delhi: [28.7041, 77.1025],
    rajasthan: [27.0238, 74.2179],
    "uttar pradesh": [26.8467, 80.9462],
    assam: [26.2006, 92.9376],
    telangana: [18.1124, 79.0193],
};

/* Custom marker - Fixed Syntax Errors */
const createBubbleIcon = (count, state) =>
    L.divIcon({
        html: `
        <div style="display:flex;flex-direction:column;align-items:center;">
            <div style="
                background:#2563EB;
                color:white;
                width:36px;
                height:36px;
                border-radius:50%;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:13px;
                font-weight:600;
                box-shadow:0 3px 8px rgba(0,0,0,0.3);
            ">
                ${count}
            </div>
            <div style="
                font-size: 11px;
                font-weight: 500;
                margin-top: 4px;
                color:#111827;
                background: white;
                padding: 2px 6px;
                border-radius: 4px;
                box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
                white-space: nowrap;
            ">
                ${state}
            </div>
        </div>`,
        className: "",
        iconSize: [40, 50],
        iconAnchor: [20, 20],
    });

export default function NationalCoverageMap() {
    const [coverage, setCoverage] = useState([]);
    const [mounted, setMounted] = useState(false);

    // Ensure Leaflet only runs on the client side
    useEffect(() => {
        setMounted(true);
        fetchCoverage();
    }, []);

    const fetchCoverage = async () => {
        try {
            const res = await ApiCall({
                url: API_ENDPOINTS.NETWORK_NATIONAL_COVERAGE,
                method: "GET",
                params: { countries: "india" }
            });

            if (res?.success) {
                setCoverage(Array.isArray(res.data) ? res.data : []);
            }
        } catch (error) {
            console.error("Coverage API error:", error);
            setCoverage([]);
        }
    };

    if (!mounted) return null;

    return (
        <div className="bg-white rounded-[32px] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-[20px] font-semibold text-gray-900">
                    National Coverage Map
                </h2>
                <select
                    defaultValue="india"
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm outline-none"
                >
                    <option value="india">India</option>
                </select>
            </div>

            {/* Map */}
            <div className="rounded-[20px] overflow-hidden border border-gray-100">
                <MapContainer
                    center={[22.5937, 78.9629]}
                    zoom={5}
                    style={{ height: "520px", width: "100%" }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {coverage.map((item, i) => {
                        const coords = stateCoordinates[item.state?.toLowerCase()];
                        if (!coords) return null;

                        return (
                            <Marker
                                key={i}
                                position={coords}
                                icon={createBubbleIcon(item.procedures, item.state)}
                            >
                                <Tooltip>
                                    <strong>{item.state}</strong>
                                    <br />
                                    Procedures: {item.procedures}
                                </Tooltip>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>

            <p className="text-xs text-gray-500 text-right mt-2 font-medium">
                Zoom in each state to see more details
            </p>
        </div>
    );
}
