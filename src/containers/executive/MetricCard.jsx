export default function InsightCard({ title, value, description, icon, }) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
            <div>
                <h3 className="text-sm text-gray-500 font-medium mb-2">
                    {title}
                </h3>

                <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-red-500">
                        {value}
                    </span>

                    <span className="text-gray-600 text-sm">
                        {description}
                    </span>
                </div>
            </div>

            <div className="text-gray-300">
                {icon}
            </div>
        </div>
    );
}
