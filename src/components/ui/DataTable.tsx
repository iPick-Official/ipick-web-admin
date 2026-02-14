import { ChevronDown, ChevronUp } from "lucide-react";
import React, { ReactNode } from "react";
import { Loading } from "./Loading";

export interface Column<T> {
    key: keyof T | string;
    label: string;
    className?: string;
    headerClassName?: string;
    render?: (row: T) => ReactNode;
    sortable?: boolean;
}

export interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    loading?: boolean;
    emptyMessage?: string;
    onRowClick?: (row: T) => void;
    rowClassName?: (row: T) => string;
    rowKey: (row: T) => string;
    sortOrder?: "asc" | "desc";
    onSortToggle?: () => void;
    actionColumn?: {
        label: string;
        render: (row: T) => ReactNode;
        className?: string;
    };
}

const DataTable = <T extends Record<string, any>>({
    columns,
    data,
    loading = false,
    emptyMessage = "No data available.",
    onRowClick,
    rowClassName,
    rowKey,
    sortOrder,
    onSortToggle,
    actionColumn,
}: DataTableProps<T>) => {
    return (
        <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden">
            <div className="overflow-y-auto max-h-[75vh]">
                <table className="min-w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-200 dark:bg-zinc-700 uppercase text-xs sticky top-0 z-10">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key as string}
                                    className={`px-6 py-3 font-medium text-left ${col.headerClassName ?? ""}`}
                                >
                                    <div className="flex items-center gap-2">
                                        {col.label}
                                        {col.sortable && (
                                            <button
                                                onClick={onSortToggle}
                                                className="text-gray-500 hover:text-gray-700 dark:hover:text-white"
                                            >
                                                {sortOrder === "asc" ? <ChevronUp /> : <ChevronDown />}
                                            </button>
                                        )}
                                    </div>
                                </th>
                            ))}

                            {actionColumn && (
                                <th className={`px-6 py-3 font-medium text-right ${actionColumn.className ?? ""}`}>
                                    {actionColumn.label}
                                </th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length + (actionColumn ? 1 : 0)} className="py-6">
                                    <Loading />
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (actionColumn ? 1 : 0)}
                                    className="text-center py-6 text-gray-500 italic"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row) => (
                                <tr
                                    key={rowKey(row)}
                                    className={`
                                        border-b
                                        transition
                                        cursor-pointer
                                        ${rowClassName?.(row) ?? ""}
                                        hover:bg-slate-300
                                        dark:hover:bg-slate-800
                                        hover:shadow-sm
                                    `}
                                    onClick={() => onRowClick?.(row)}
                                >

                                    {columns.map((col) => (
                                        <td
                                            key={col.key as string}
                                            className={`px-6 py-3 ${col.className ?? ""}`}
                                        >
                                            {col.render ? col.render(row) : row[col.key as keyof T]}
                                        </td>
                                    ))}

                                    {actionColumn && (
                                        <td className="px-6 py-3 text-right">
                                            {actionColumn.render(row)}
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
