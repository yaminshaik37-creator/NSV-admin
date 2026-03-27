export default function ChartLegend({ data, colors }) {
    return (
        <div className="flex flex-wrap items-center gap-4 mt-3">
            {data.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center gap-2 text-xs text-gray-600"
                >
                    <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: colors[index % colors.length] }}
                    />
                    <span>{item.name}</span>
                </div>
            ))}
        </div>
    );
}