import { useInView } from "@/hooks/useInView";
import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function DonutChart({
    data = [],
    dataKey = "value",
    nameKey = "name",
    colors = ["#9EC3DB", "#6EC1E4", "#3BA3D0", "#1F7FB6"],
    innerRadius = 60,
    outerRadius = 100,
    showTooltip = true,
}) {
    // const [ref, isInView] = useInView({ threshold: 0.5 });

    return (
        // <div ref={ref} style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%" >
            <PieChart>
                <Pie
                    data={data}
                    dataKey={dataKey}
                    nameKey={nameKey}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    paddingAngle={2}
                    cornerRadius={6}
                    isAnimationActive
                    animationDuration={1000}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                        />
                    ))}
                </Pie>

                {showTooltip && <Tooltip />}
            </PieChart>
        </ResponsiveContainer>
        // </div>
    );
}