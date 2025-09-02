"use client";

import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { Plus, Pencil, Trash } from "lucide-react";

interface Unit {
  id: number;
  plateNumber: string;
  type: string;
  capacity: number;
  status: "Active" | "Inactive" | "Under Maintenance";
}

const mockUnits: Unit[] = [
  { id: 1, plateNumber: "ABC-123", type: "Bus", capacity: 50, status: "Active" },
  { id: 2, plateNumber: "XYZ-456", type: "Van", capacity: 20, status: "Under Maintenance" },
  { id: 3, plateNumber: "LMN-789", type: "Mini Bus", capacity: 30, status: "Inactive" },
];

export default function Units() {
  const [units, setUnits] = useState<Unit[]>(mockUnits);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Unit Management</h2>
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow transition">
            <Plus size={16} />
            <span className="text-sm font-medium">Add Unit</span>
          </button>
        </div>

        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Plate Number</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Capacity</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {units.map((unit) => (
                <tr key={unit.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{unit.plateNumber}</td>
                  <td className="px-6 py-4">{unit.type}</td>
                  <td className="px-6 py-4">{unit.capacity}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded font-medium ${
                        unit.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : unit.status === "Inactive"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {unit.status}
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
              {units.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
                    No units found.
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
