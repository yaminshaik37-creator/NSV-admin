"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ✅ IN VIEW HOOK (for animation trigger) */
function useInView() {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.disconnect();
            }
        }, { threshold: 0.3 });

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return [ref, isInView];
}

/* ✅ STATES */
const stateCoordinates = {
    gujarat: [22.2587, 71.1924],
    maharashtra: [19.7515, 75.7139],
    delhi: [28.7041, 77.1025],
    rajasthan: [27.0238, 74.2179],
    "uttar pradesh": [26.8467, 80.9462],
    assam: [26.2006, 92.9376],
    telangana: [18.1124, 79.0193],
    uttarakhand: [30.0668, 79.0193],
};

/* ✅ DIRTY DATA FIX */
const stateAliasMap = {
    gujrat: "gujarat",
    uttrakhand: "uttarakhand",
    hyderabad: "telangana",
};

/* ✅ NORMALIZE */
const getValidState = (state) => {
    if (!state) return null;

    let normalized = state.toLowerCase().trim();

    if (stateAliasMap[normalized]) {
        normalized = stateAliasMap[normalized];
    }

    return stateCoordinates[normalized] ? normalized : null;
};

/* ✅ IMPROVED MARKER */
const createBubbleIcon = (count, state) =>
    L.divIcon({
        html: `
        <div style="display:flex;flex-direction:column;align-items:center;">
            
            <!-- Bubble -->
            <div style="
                background:linear-gradient(135deg,#3B82F6,#1D4ED8);
                color:white;
                width:38px;
                height:38px;
                border-radius:50%;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:13px;
                font-weight:600;
                box-shadow:0 6px 12px rgba(0,0,0,0.25);
                transform:scale(0.9);
                animation:pop 0.4s ease forwards;
            ">
                ${count || 0}
            </div>

            <!-- Label -->
            <div style="
                font-size:11px;
                font-weight:500;
                margin-top:4px;
                color:#111827;
                background:white;
                padding:2px 6px;
                border-radius:4px;
                box-shadow:0 2px 6px rgba(0,0,0,0.15);
                white-space:nowrap;
            ">
                ${state}
            </div>
        </div>

        <style>
        @keyframes pop {
            0% { transform: scale(0.6); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        </style>
        `,
        className: "",
        iconSize: [40, 50],
        iconAnchor: [20, 20],
    });

export default function NationalCoverageMap() {
    const [coverage, setCoverage] = useState([]);
    const [country, setCountry] = useState("india");

    const [ref, isInView] = useInView();

    /* ✅ MOCK DATA (replace with API) */
    useEffect(() => {
        setCoverage([
            { state: "Gujarat", clinics: 60, procedures: 200 },
            { state: "Maharashtra", clinics: 7, procedures: 80 },
            { state: "Delhi", clinics: 4, procedures: 50 },
            { state: "Rajasthan", clinics: 3, procedures: 30 },
            { state: "Uttar Pradesh", clinics: 14, procedures: 120 },
        ]);
    }, []);

    return (
        <div
            ref={ref}
            className="bg-white rounded-[32px] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
        >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-[20px] font-semibold text-gray-900">
                    National Coverage Map
                </h2>

                <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                    <option value="india">India</option>
                </select>
            </div>

            {/* MAP */}
            <MapContainer
                center={[22.5937, 78.9629]}
                zoom={5}
                style={{ height: "520px", width: "100%" }}
                scrollWheelZoom={false}
            >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

                {isInView &&
                    coverage.map((item, i) => {
                        const validState = getValidState(item.state);
                        if (!validState) return null;

                        const coords = stateCoordinates[validState];
                        if (!coords) return null;

                        return (
                            <Marker
                                key={i}
                                position={coords}
                                icon={createBubbleIcon(item.clinics, validState)}
                            >
                                <Tooltip>
                                    <strong>{validState}</strong>
                                    <br />
                                    Clinics: {item.clinics}
                                    <br />
                                    Procedures: {item.procedures}
                                </Tooltip>
                            </Marker>
                        );
                    })}
            </MapContainer>

            <p className="text-xs text-gray-500 text-right mt-2">
                Showing only valid mapped states
            </p>
        </div>
    );
}