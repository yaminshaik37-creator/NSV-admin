"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import ApiCall from "@/Services/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";
import "leaflet/dist/leaflet.css";

/* 🌍 Country coordinates (ONLY valid ones) */
const countryCoordinates = {
    india: [20.5937, 78.9629],
    indonesia: [-0.7893, 113.9213],
    "south africa": [-30.5595, 22.9375],
    brazil: [-14.2350, -51.9253],
    australia: [-25.2744, 133.7751],
};

/* 🧹 Normalize country */
const normalize = (str) =>
    str?.toLowerCase().trim().replace(/\s+/g, " ");

/* 🔵 Bubble marker */
const createBubbleIcon = (count, country) =>
    L.divIcon({
        html: `
        <div style="display:flex;flex-direction:column;align-items:center;">

            <div style="
                background:#2563EB;
                color:white;
                width:38px;
                height:38px;
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
                font-size:11px;
                font-weight:500;
                margin-top:4px;
                color:#111827;
                background:white;
                padding:2px 6px;
                border-radius:4px;
                box-shadow:0 1px 4px rgba(0,0,0,0.15);
            ">
                ${country}
            </div>

        </div>
    `,
        className: "",
        iconSize: [40, 50],
        iconAnchor: [20, 20],
    });

export default function GlobalCoverageMap() {

    const [coverage, setCoverage] = useState([]);
    const [selected, setSelected] = useState([]);

    /* ---------- API ---------- */
    const fetchCoverage = async () => {
        try {

            const res = await ApiCall({
                url: `${API_ENDPOINTS.GLOBAL_COVERAGE}`,
                method: "GET",
            });

            if (res?.success) {

                /* 🧹 CLEAN + FILTER VALID COUNTRIES */
                const cleaned = res.data
                    .map((item) => ({
                        country: normalize(item.country),
                        procedures: Number(item.procedures || 0),
                    }))
                    .filter((item) => countryCoordinates[item.country]); // ❗ remove dirty

                setCoverage(cleaned);
                setSelected(cleaned.map((c) => c.country)); // select all by default
            }

        } catch (error) {
            console.error("Global Coverage API error:", error);
        }
    };

    useEffect(() => {
        fetchCoverage();
    }, []);

    /* ---------- Toggle ---------- */
    const toggleCountry = (country) => {
        setSelected((prev) =>
            prev.includes(country)
                ? prev.filter((c) => c !== country)
                : [...prev, country]
        );
    };

    return (
        <div className="bg-white rounded-[32px] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-[20px] font-semibold text-gray-900">
                    Global Coverage
                </h2>
            </div>

            <div className="relative">

                {/* ✅ FILTER PANEL */}
                <div className="absolute z-[9999] left-4 bottom-4 bg-white p-3 rounded-lg shadow-md w-[180px]">

                    <select className="w-full border text-sm px-2 py-1 rounded mb-2">
                        <option>Select Countries</option>
                    </select>

                    <div className="space-y-1 text-sm">

                        {/* Select All */}
                        <label className="flex justify-between items-center">
                            Select All
                            <input
                                type="checkbox"
                                checked={selected.length === coverage.length}
                                onChange={() =>
                                    setSelected(
                                        selected.length === coverage.length
                                            ? []
                                            : coverage.map((c) => c.country)
                                    )
                                }
                            />
                        </label>

                        {/* Dynamic Countries */}
                        {coverage.map((c) => (
                            <label
                                key={c.country}
                                className="flex justify-between items-center capitalize"
                            >
                                {c.country}
                                <input
                                    type="checkbox"
                                    checked={selected.includes(c.country)}
                                    onChange={() => toggleCountry(c.country)}
                                />
                            </label>
                        ))}

                    </div>
                </div>

                {/* 🌍 MAP */}
                <MapContainer
                    center={[20, 0]}
                    zoom={2}
                    style={{ height: "520px", width: "100%" }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {coverage.map((item, i) => {

                        if (!selected.includes(item.country)) return null;

                        const coords = countryCoordinates[item.country];

                        if (!coords) return null;

                        return (
                            <Marker
                                key={i}
                                position={coords}
                                icon={createBubbleIcon(item.procedures, item.country)}
                            >
                                <Tooltip>
                                    <strong>{item.country}</strong>
                                    <br />
                                    Procedures: {item.procedures}
                                </Tooltip>
                            </Marker>
                        );
                    })}
                </MapContainer>

            </div>
        </div>
    );
}
