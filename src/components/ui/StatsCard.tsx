import React, { useState } from "react";
import { StatsCardWithFilterProps } from "@/interface/statsCard";

const columnMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
};

const colorMap: Record<string, string> = {
    green: "from-green-500/20 to-green-500/5 text-green-600",
    blue: "from-blue-500/20 to-blue-500/5 text-blue-600",
    red: "from-red-500/20 to-red-500/5 text-red-600",
    yellow: "from-yellow-500/20 to-yellow-500/5 text-yellow-600",
    zinc: "from-zinc-400/20 to-zinc-400/5 text-zinc-600",
};

// Map for ring colors
const ringColorMap: Record<string, string> = {
    green: "ring-green-500 dark:ring-green-400",
    blue: "ring-blue-500 dark:ring-blue-400",
    red: "ring-red-500 dark:ring-red-400",
    yellow: "ring-yellow-500 dark:ring-yellow-400",
    zinc: "ring-zinc-500 dark:ring-zinc-400",
};

const StatsCard: React.FC<StatsCardWithFilterProps> = ({
    items,
    columns = 3,
    className = "",
    onFilter,
}) => {
    const gridClass = columnMap[columns] ?? columnMap[3];
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

    const handleClick = (id: string) => {
        setSelectedFilter(id);
        if (onFilter) onFilter(id);
    };

    return (
        <div className={`grid ${gridClass} gap-3 ${className}`}>
            {items.map(item => {
                const styles = colorMap[item.color ?? "zinc"];
                const isSelected = selectedFilter === item.id;
                const ringClass = ringColorMap[item.color ?? "zinc"];

                return (
                    <div
                        key={item.id}
                        onClick={() => handleClick(item.id)}
                        className={`
              flex items-center justify-between
              rounded-full px-4 py-2
              bg-zinc-100 dark:bg-zinc-800
              text-sm
              transition-all duration-200
              cursor-pointer
              hover:bg-zinc-200 dark:hover:bg-zinc-700
              ${isSelected ? `ring-2 ${ringClass} bg-white dark:bg-zinc-900` : ""}
            `}
                    >
                        {/* Left */}
                        <div className="flex items-center gap-2">
                            {item.icon && (
                                <div className={`${styles.split(" ")[2]} text-base`}>
                                    {item.icon}
                                </div>
                            )}
                            <span className="text-zinc-700 dark:text-zinc-300">
                                {item.label}
                            </span>
                        </div>

                        {/* Right */}
                        <span className="font-semibold text-zinc-900 dark:text-white">
                            {item.value}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default StatsCard;
