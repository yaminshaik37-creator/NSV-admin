import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
} from "recharts";

export default function CommonBarChart({
    data = [],
    dataKey = "value",
    labelKey = "name",
    layout = "horizontal", // "horizontal" | "vertical"
    color = "#9EC3DB",
    barSize = 18,
}) {
    const isHorizontal = layout === "horizontal";

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                layout={isHorizontal ? "vertical" : "horizontal"}
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={!isHorizontal}
                    vertical={isHorizontal}
                />

                {/* Axes switch automatically */}
                {isHorizontal ? (
                    <>
                        {/* X = values */}
                        <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#6B7280" }}
                        />

                        {/* Y = labels */}
                        <YAxis
                            type="category"
                            dataKey={labelKey}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#374151" }}
                            width={60}
                        />
                    </>
                ) : (
                    <>
                        {/* X = labels */}
                        <XAxis
                            dataKey={labelKey}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#374151" }}
                        />

                        {/* Y = values */}
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#6B7280" }}
                        />
                    </>
                )}

                <Tooltip cursor={{ fill: "#F3F4F6" }} />

                <Bar
                    dataKey={dataKey}
                    fill={color}
                    barSize={barSize}
                    radius={
                        isHorizontal
                            ? [0, 6, 6, 0] // right rounded
                            : [6, 6, 0, 0] // top rounded
                    }
                    isAnimationActive
                    animationDuration={1000}
                    animationEasing="ease-out"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}