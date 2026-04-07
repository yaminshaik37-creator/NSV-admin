import { TokenApiCall } from "@/Services/api";
import { getCachedToken } from "./TokenCache";

export function GenerateHash(dictInput) {
    try {
        let text = Buffer.from(dictInput).toString("base64")
        text = text + process.env.HASH_KEY
        const shaObj = new jsSHA("SHA-256", "TEXT", { encoding: "UTF8" });
        shaObj.update(text);

        const hash = shaObj.getHash("HEX");
        return hash;
    } catch (ex) {
    }
}


export const getUserToken = async () => {
    return { token: '' }

    const cacheToken = getCachedToken()
    if (cacheToken) {
        return { token: cacheToken?.jwt_token }
    } else {
        const res = await TokenApiCall({ url: '/api/get-cookie', });
        return { token: res?.token, refresh_token: res?.refresh_token }
    }
};
export function getDeviceHealthColor({
    inactiveDevices,
    totalDevices,
    daysInactive,
    config = {}
}) {
    // 🔧 Default thresholds (can be overridden)
    const {
        red = { pct: 50, minDays: 30 },     // >=50% inactive AND >=30 days
        amber = { pct: 25, minDays: 14 }    // >=25% inactive OR >=14 days
    } = config;

    // ✅ calculate percentage dynamically
    const inactivePct = totalDevices > 0
        ? (inactiveDevices / totalDevices) * 100
        : 0;

    // 🔴 RED condition
    if (inactivePct >= red.pct && daysInactive >= red.minDays) {
        return {
            color: "RED",
            badge: "CRITICAL",
            action: "Device audit + recall",
            inactivePct: Number(inactivePct.toFixed(1))
        };
    }

    // 🟠 AMBER condition
    if (inactivePct >= amber.pct || daysInactive >= amber.minDays) {
        return {
            color: "AMBER",
            badge: "WARNING",
            action: "Customer outreach",
            inactivePct: Number(inactivePct.toFixed(1))
        };
    }

    // 🟢 GREEN condition
    return {
        color: "GREEN",
        badge: "NORMAL",
        action: "Standard monitoring",
        inactivePct: Number(inactivePct.toFixed(1))
    };
}
export function getYAxisTicks(data, keys = ["nGyn", "nOra", "nOrtho"], steps = 5) {
    // 1. Get max value across all series
    const maxValue = Math.max(
        ...data.flatMap(item => keys.map(k => item[k] || 0))
    );

    // 2. Round up to a "nice" number
    const niceMax = Math.ceil(maxValue / 1000) * 1000;

    // 3. Create ticks
    const stepSize = Math.ceil(niceMax / steps);

    const ticks = [];
    for (let i = 0; i <= niceMax; i += stepSize) {
        ticks.push(i);
    }

    return ticks;
}
export const convert2Decimal = (num, decimal = 2) => {
    return parseFloat(Number(num).toFixed(decimal))
}