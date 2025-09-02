"use client";

import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { Plus, Pencil, Trash } from "lucide-react";

interface Route {
    id: number;
    name: string;
    startPoint: string;
    endPoint: string;
    stops: number;
    status: "Active" | "Inactive";
}

const mockRoutes: Route[] = [
    {
        id: 1,
        name: "Route A",
        startPoint: "Terminal 1",
        endPoint: "Terminal 5",
        stops: 8,
        status: "Active",
    },
    {
        id: 2,
        name: "Route B",
        startPoint: "Main Station",
        endPoint: "Downtown",
        stops: 5,
        status: "Inactive",
    },
    {
        id: 3,
        name: "Route C",
        startPoint: "North Park",
        endPoint: "South Park",
        stops: 12,
        status: "Active",
    },
];

export default function Routes() {
    const [routes, setRoutes] = useState<Route[]>(mockRoutes);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 p-6 overflow-auto bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Routing Management</h2>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                        <Plus size={18} />
                        Add Route
                    </button>
                </div>

                <div className="bg-white shadow rounded overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Route Name</th>
                                <th className="px-6 py-3">Start Point</th>
                                <th className="px-6 py-3">End Point</th>
                                <th className="px-6 py-3">Stops</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {routes.map((route) => (
                                <tr key={route.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{route.name}</td>
                                    <td className="px-6 py-4">{route.startPoint}</td>
                                    <td className="px-6 py-4">{route.endPoint}</td>
                                    <td className="px-6 py-4">{route.stops}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 text-xs rounded font-medium ${route.status === "Active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {route.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <Pencil size={16} />
                                        </button>
                                        <button className="text-red-600 hover:text-red-800">
                                            <Trash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {routes.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                                        No routes found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
