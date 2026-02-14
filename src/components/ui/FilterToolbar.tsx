import React from "react";
import { Download, Percent, RefreshCcwDot } from "lucide-react";
import { BsPersonAdd } from "react-icons/bs";
import { FilterProps } from "@/interface/filterToolbar";

const FilterToolbar: React.FC<FilterProps> = ({
    title,
    dateFilters = [],
    selectFilters = [],
    searchValue,
    onSearchChange,
    onExport,
    onRegister,
    onRefresh,
    onDiscount,
    exportDisabled = false,
}) => {
    const buttons = [
        { action: onExport, label: "Export", icon: <Download size={16} />, bg: "bg-green-700", hover: "hover:bg-green-600", disabled: exportDisabled },
        { action: onRegister, label: "Add Driver", icon: <BsPersonAdd size={16} />, bg: "bg-orange-700", hover: "hover:bg-orange-600", disabled: exportDisabled },
        { action: onRefresh, label: "Load More", icon: <RefreshCcwDot size={16} />, bg: "bg-orange-700", hover: "hover:bg-orange-600", disabled: exportDisabled },
        { action: onDiscount, label: "Discount", icon: <Percent size={16} />, bg: "bg-orange-700", hover: "hover:bg-orange-600", disabled: exportDisabled },
    ].filter(btn => btn.action);

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 p-6">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{title}</h2>

                {/* Filters & Buttons */}
                <div className="flex flex-wrap items-end gap-4 w-full xl:w-auto">

                    {/* Date Filters */}
                    {dateFilters.map(f => (
                        <div key={f.label} className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">{f.label}</label>
                            <input
                                type="date"
                                value={f.value}
                                onChange={e => f.onChange(e.target.value)}
                                className="px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-md text-sm text-gray-800 dark:text-gray-100 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-green-600 focus:outline-none"
                            />
                        </div>
                    ))}

                    {/* Select Filters */}
                    {selectFilters.map(f => (
                        <div key={f.label} className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">{f.label}</label>
                            <select
                                value={f.value}
                                onChange={e => f.onChange(e.target.value)}
                                className="px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-md text-sm text-gray-800 dark:text-gray-100 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-green-600 focus:outline-none"
                            >
                                {f.options.map(o => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                        </div>
                    ))}

                    {/* Search */}
                    {onSearchChange && (
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Search</label>
                            <input
                                type="text"
                                value={searchValue}
                                onChange={e => onSearchChange(e.target.value)}
                                placeholder="Search..."
                                className="px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-md text-sm w-64 text-gray-800 dark:text-gray-100 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-green-600 focus:outline-none"
                            />
                        </div>
                    )}

                    {/* Buttons */}
                    {buttons.map(btn => (
                        <button
                            key={btn.label}
                            onClick={btn.action}
                            disabled={btn.disabled}
                            className={`${btn.bg} ${btn.hover} flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white transition disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {btn.icon}
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterToolbar;
