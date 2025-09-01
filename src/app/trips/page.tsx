"use client";

import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { Plus } from "lucide-react";

const mockTrips = [
  {
    id: 1,
    busName: "Bus 101",
    route: "Cubao → Ayala",
    driver: "Juan Dela Cruz",
    departure: "08:00 AM",
    status: "On Time",
  },
  {
    id: 2,
    busName: "Bus 202",
    route: "SM North → MOA",
    driver: "Pedro Santos",
    departure: "09:30 AM",
    status: "Delayed",
  },
  {
    id: 3,
    busName: "Bus 303",
    route: "Pasig → BGC",
    driver: "Maria Lopez",
    departure: "10:15 AM",
    status: "On Time",
  },
  {
    id: 4,
    busName: "Bus 404",
    route: "Caloocan → Makati",
    driver: "Ana Reyes",
    departure: "11:45 AM",
    status: "On Time",
  },
  {
    id: 5,
    busName: "Bus 505",
    route: "Las Piñas → Ortigas",
    driver: "Daniel Cruz",
    departure: "01:30 PM",
    status: "Delayed",
  },
];

export default function Trips() {
  const [statusFilter, setStatusFilter] = useState<"All" | "On Time" | "Delayed">("All");
  const [page, setPage] = useState(1);
  const tripsPerPage = 3;

  const filteredTrips = mockTrips.filter((trip) =>
    statusFilter === "All" ? true : trip.status === statusFilter
  );

  const paginatedTrips = filteredTrips.slice(
    (page - 1) * tripsPerPage,
    page * tripsPerPage
  );

  const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 bg-gray-50 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Trips</h1>
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow transition">
            <Plus size={16} />
            <span className="text-sm font-medium">Add Trip</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex gap-2">
            {["All", "On Time", "Delayed"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as any)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  statusFilter === status
                    ? "bg-orange-100 text-orange-600"
                    : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
          <table className="w-full table-auto text-sm text-gray-700">
            <thead>
              <tr className="text-left border-b text-gray-500">
                <th className="py-2">Bus Name</th>
                <th className="py-2">Route</th>
                <th className="py-2">Driver</th>
                <th className="py-2">Departure</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTrips.map((trip) => (
                <tr
                  key={trip.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3">{trip.busName}</td>
                  <td className="py-3">{trip.route}</td>
                  <td className="py-3">{trip.driver}</td>
                  <td className="py-3">{trip.departure}</td>
                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        trip.status === "On Time"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))}

              {paginatedTrips.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No trips found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-sm rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
