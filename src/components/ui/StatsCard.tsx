import React, { ReactNode } from "react";

interface StatsCardItem {
    id: string;
    label: string;
    value: number | string;
    color?: string;        // e.g. "green", "blue", "red"
    icon?: ReactNode;
}

interface StatsCardProps {
    items: StatsCardItem[];
    columns?: number;
    className?: string;
}

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

const StatsCard: React.FC<StatsCardProps> = ({
    items,
    columns = 3,
    className = "",
}) => {
    const gridClass = columnMap[columns] ?? columnMap[3];

    return (
        <div className={`grid ${gridClass} gap-5 ${className}`}>
            {items.map((item) => {
                const styles = colorMap[item.color ?? "zinc"];

                return (
                    <div
                        key={item.id}
                        className="
                            group relative
                            backdrop-blur-sm
                            bg-gradient-to-br from-white to-zinc-50
                            dark:from-zinc-900 dark:to-zinc-800
                            border border-zinc-200 dark:border-zinc-700
                            rounded-2xl
                            p-5
                            shadow-sm
                            hover:shadow-xl
                            hover:-translate-y-1
                            transition-all duration-300
                            overflow-hidden
                            "
                    >
                        {/* Accent Glow Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${styles} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                    {item.label}
                                </p>

                                {item.icon && (
                                    <div className={`${styles.split(" ")[2]} transition-transform group-hover:scale-110`}>
                                        {item.icon}
                                    </div>
                                )}
                            </div>

                            {/* Value */}
                            <div className="mt-4">
                                <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                    {item.value}
                                </h3>
                            </div>
                        </div>

                        {/* Bottom Accent Bar */}
                        <div
                            className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${styles.split(" ")[0]} opacity-70`}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default StatsCard;
