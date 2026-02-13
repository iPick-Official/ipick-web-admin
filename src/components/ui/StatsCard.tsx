import React, { ReactNode } from "react";

export interface StatsCardItem {
    id: string;
    label: string;
    value: number | string;
    color?: string;
    icon?: ReactNode;
}

interface StatsCardProps {
    items: StatsCardItem[];
    columns?: number | string;
    className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
    items,
    columns = 3,
    className = "",
}) => {
    const gridColsClass =
        typeof columns === "number" ? `md:grid-cols-${columns}` : columns;

    return (
        <div className={`grid grid-cols-1 ${gridColsClass} gap-4 ${className}`}>
            {items.map((item) => (
                <div
                    key={item.id}
                    className="
            group relative
            bg-white dark:bg-zinc-900
            border border-zinc-200 dark:border-zinc-800
            rounded-xl
            p-6
            shadow-sm
            hover:shadow-md
            transition-all duration-300
          "
                >
                    {/* Label + Icon */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{item.label}</p>

                        {item.icon && (
                            <div className={`text-${item.color ?? "zinc-400"} dark:text-${item.color ?? "zinc-500"}`}>
                                {item.icon}
                            </div>
                        )}
                    </div>

                    {/* Value */}
                    <div className="mt-3 flex items-end justify-between">
                        <h3 className="text-3xl font-semibold text-zinc-900 dark:text-white tracking-tight">
                            {item.value}
                        </h3>
                    </div>

                    {/* Accent Line */}
                    <div
                        className="absolute bottom-0 left-0 h-1 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl bg-gradient-to-r from-green-700 to-red-700"
                    />
                </div>
            ))}
        </div>
    );
};

export default StatsCard;
