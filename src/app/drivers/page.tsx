"use client";

import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { Plus, Pencil, Trash } from "lucide-react";

interface Driver {
  id: number;
  name: string;
  licenseNumber: string;
  status: "Active" | "Inactive";
}

const mockDrivers: Driver[] = [
  { id: 1, name: "John Doe", licenseNumber: "D123456", status: "Active" },
  { id: 2, name: "Jane Smith", licenseNumber: "D789012", status: "Inactive" },
  { id: 3, name: "Michael Brown", licenseNumber: "D345678", status: "Active" },
];

export default function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Driver Management</h2>
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow transition">
            <Plus size={16} />
            <span className="text-sm font-medium">Add Driver</span>
          </button>
        </div>

        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">License Number</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {drivers.map((driver) => (
                <tr key={driver.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{driver.name}</td>
                  <td className="px-6 py-4">{driver.licenseNumber}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded font-medium ${
                        driver.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {driver.status}
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
              {drivers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-400">
                    No drivers found.
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