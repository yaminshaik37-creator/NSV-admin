
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const Trends = ({ chartData }) => {
    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#9CA3AF"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default Trends;