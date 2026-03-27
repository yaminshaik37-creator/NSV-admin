import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    LabelList,
} from "recharts";

const renderLabel = (value) => {
    if (!value) return "";
    return value.toLocaleString();
};

export default function CustomBarChart({
    data = [],
    range = "daily",
    bars = [],
    yAxisTicks = [],
    domain = [0, 10000],
}) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{ top: 25, right: 0, left: -25, bottom: 0 }}
                barGap={4}
            >
                <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    stroke="#a5bbe7ff"
                />

                <XAxis
                    dataKey={range === "daily" ? "day" : "month"}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#a5bbe7ff" }}
                    dy={10}
                />

                <YAxis
                    axisLine={false}
                    tickLine={false}
                    ticks={yAxisTicks}
                    domain={domain}
                    tick={{ fontSize: 12, fill: "#a5bbe7ff" }}
                />

                <Tooltip cursor={{ fill: "#a5bbe7ff" }} />

                {bars.map((bar) => (
                    <Bar
                        isAnimationActive={true} animationDuration={2000}
                        key={bar.key}
                        dataKey={bar.key}
                        fill={bar.color}
                        radius={[2, 2, 0, 0]}
                        barSize={10}
                    >
                        <LabelList
                            dataKey={bar.key}
                            position="top"
                            formatter={renderLabel}
                            style={{ fontSize: "10px", fill: "#a5bbe7ff" }}
                        />
                    </Bar>
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
}