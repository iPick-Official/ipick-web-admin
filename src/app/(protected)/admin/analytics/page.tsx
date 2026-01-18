"use client";

import { Sidebar } from "@/components/Sidebar";
import {
  BarChart2,
  BusFront,
  DollarSign,
  Users,
} from "lucide-react";
import { MonthlyRidershipChart, RidershipData } from "@/components/MonthlyRidershipChart";

export default function Analytics() {

  const sampleData: RidershipData[] = [
    { month: "Jan", riders: 1200 },
    { month: "Feb", riders: 1500 },
    { month: "Mar", riders: 1700 },
    { month: "Apr", riders: 1600 },
    { month: "May", riders: 1800 },
    { month: "Jun", riders: 2000 },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SummaryCard icon={<BusFront size={24} />} title="Total Trips" value="1,280" />
          <SummaryCard icon={<Users size={24} />} title="Riders Today" value="3,542" />
          <SummaryCard icon={<DollarSign size={24} />} title="Revenue" value="₱124,500" />
          <SummaryCard icon={<BarChart2 size={24} />} title="Active Buses" value="42" />
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white rounded-xl p-6 shadow mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Monthly Ridership Overview</h2>
          <MonthlyRidershipChart data={sampleData} />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Top Performing Routes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Route</th>
                  <th className="px-4 py-3">Trips</th>
                  <th className="px-4 py-3">Riders</th>
                  <th className="px-4 py-3">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { route: "Cubao - Makati", trips: 120, riders: 1300, revenue: "₱45,000" },
                  { route: "QC - Manila", trips: 98, riders: 980, revenue: "₱38,400" },
                  { route: "Pasig - BGC", trips: 110, riders: 1040, revenue: "₱41,200" },
                ].map((item, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{item.route}</td>
                    <td className="px-4 py-3">{item.trips}</td>
                    <td className="px-4 py-3">{item.riders}</td>
                    <td className="px-4 py-3">{item.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// SummaryCard component
function SummaryCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
      <div className="bg-orange-100 text-orange-500 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-xl font-semibold">{value}</h3>
      </div>
    </div>
  );
}
