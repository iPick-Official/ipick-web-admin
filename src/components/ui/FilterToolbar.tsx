import React from "react";
import { Download, RefreshCcwDot } from "lucide-react";
import { BsPersonAdd } from "react-icons/bs";

interface DateFilter {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

interface SelectFilterOption {
    label: string;
    value: string;
}

interface SelectFilter {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectFilterOption[];
}

interface Props {
    title: string;
    dateFilters?: DateFilter[];
    selectFilters?: SelectFilter[];
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    onExport?: () => void;
    onRegister?: () => void;
    onRefresh?: () => void;
    exportDisabled?: boolean;
}

const FilterToolbar: React.FC<Props> = ({
    title,
    dateFilters = [],
    selectFilters = [],
    searchValue,
    onSearchChange,
    onExport,
    onRegister,
    onRefresh,
    exportDisabled = false,
}) => {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-300 p-6">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                {/* Title */}
                <h2 className="text-2xl font-semibold">
                    {title}
                </h2>

                {/* Filters Section */}
                <div className="flex flex-wrap items-end gap-4 w-full xl:w-auto">

                    {/* Date Filters */}
                    {dateFilters.map((filter) => (
                        <div key={filter.label} className="flex flex-col gap-1">
                            <label className="text-xs font-medium">
                                {filter.label}
                            </label>
                            <input
                                type="date"
                                value={filter.value}
                                onChange={(e) => filter.onChange(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
                            />
                        </div>
                    ))}

                    {/* Select Filters */}
                    {selectFilters.map((filter) => (
                        <div key={filter.label} className="flex flex-col gap-1">
                            <label className="text-xs font-medium">
                                {filter.label}
                            </label>
                            <select
                                value={filter.value}
                                onChange={(e) => filter.onChange(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
                            >
                                {filter.options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

                    {/* Search */}
                    {onSearchChange && (
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium">
                                Search
                            </label>
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => onSearchChange(e.target.value)}
                                placeholder="Search..."
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm w-64 focus:ring-2 focus:ring-green-600 focus:outline-none"
                            />
                        </div>
                    )}

                    {/* Export Button */}
                    {onExport && (
                        <button
                            onClick={onExport}
                            disabled={exportDisabled}
                            className="ml-auto flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Download size={16} />
                            Export
                        </button>
                    )}
                    {/* Register Driver */}
                    {onRegister && (
                        <button
                            onClick={onRegister}
                            className="ml-auto flex items-center gap-2 px-4 py-2 bg-orange-700 hover:bg-orange-600 text-white rounded-md text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <BsPersonAdd size={16} />
                            Add Driver
                        </button>
                    )}
                    {onRefresh && (
                        <button
                            onClick={onRegister}
                            className="ml-auto flex items-center gap-2 px-4 py-2 bg-orange-700 hover:bg-orange-600 text-white rounded-md text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <RefreshCcwDot size={16} />
                            Load More
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterToolbar;
