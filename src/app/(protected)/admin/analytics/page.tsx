"use client";

import { useEffect, useState, useMemo } from "react";
import { MonthlyRidershipChart, RidershipData } from "@/components/ui/MonthlyRidershipChart";
import { fetchJSON } from "@/app/utils/fetchJSON";
import { Booking } from "@/types/bookings";
import { Sidebar } from "@/components/ui/Sidebar";
import StatsCard from "@/components/ui/StatsCard";
import { BsCardChecklist } from "react-icons/bs";
import { CheckCircleIcon, XCircleIcon, PauseCircleIcon } from "lucide-react";
import { Loading } from "@/components/ui/Loading";
import FilterToolbar from "@/components/ui/FilterToolbar";
import DataTable, { Column } from "@/components/ui/DataTable";

interface DriverStats {
  driverId: string;
  totalBookings: number;
  finished: number;
  cancelled: number;
  inactive: number;
}

export default function BookingsAnalytics() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch bookings
  useEffect(() => {
    setLoading(true);
    fetchJSON<Booking[]>("/api/bookings")
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const oneYearAgo = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    return d;
  }, []);

  const recentBookings = useMemo(
    () => bookings.filter((b) => new Date(b.updatedAt) >= oneYearAgo),
    [bookings, oneYearAgo]
  );

  // Monthly chart data
  const last12Months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - (11 - i));
      return d.toLocaleString("default", { month: "short" });
    });
  }, []);

  const monthlyData: RidershipData[] = useMemo(() => {
    const monthMap: Record<string, { total: number; completed: number; cancelled: number; inactive: number }> = {};

    last12Months.forEach((month) => {
      monthMap[month] = { total: 0, completed: 0, cancelled: 0, inactive: 0 };
    });

    recentBookings.forEach((b) => {
      const month = new Date(b.updatedAt).toLocaleString("default", { month: "short" });
      if (!monthMap[month]) monthMap[month] = { total: 0, completed: 0, cancelled: 0, inactive: 0 };

      monthMap[month].total += 1;
      if (b.status === "finished") monthMap[month].completed += 1;
      if (b.status === "cancelled") monthMap[month].cancelled += 1;
      if (b.status === "inactive") monthMap[month].inactive += 1;
    });

    return last12Months.map((m) => ({
      month: m,
      total: monthMap[m].total,
      completed: monthMap[m].completed,
      cancelled: monthMap[m].cancelled,
      inactive: monthMap[m].inactive,
    }));
  }, [recentBookings, last12Months]);

  // Status counts for summary cards
  const statusCounts = useMemo(() => {
    const finished = recentBookings.filter((b) => b.status === "finished").length;
    const cancelled = recentBookings.filter((b) => b.status === "cancelled").length;
    const inactive = recentBookings.filter((b) => b.status === "inactive").length;
    return { finished, cancelled, inactive, totalBookings: recentBookings.length };
  }, [recentBookings]);

  // Compute top drivers
  const topDrivers: DriverStats[] = useMemo(() => {
    const map: Record<string, DriverStats> = {};
    recentBookings.forEach((b) => {
      if (!b.driverId) return;
      if (!map[b.driverId]) map[b.driverId] = { driverId: b.driverId, totalBookings: 0, finished: 0, cancelled: 0, inactive: 0 };
      map[b.driverId].totalBookings += 1;
      if (b.status === "finished") map[b.driverId].finished += 1;
      if (b.status === "cancelled") map[b.driverId].cancelled += 1;
      if (b.status === "inactive") map[b.driverId].inactive += 1;
    });
    return Object.values(map).sort((a, b) => b.totalBookings - a.totalBookings).slice(0, 10);
  }, [recentBookings]);

  // Columns for DataTable
  const driverColumns: Column<DriverStats>[] = [
    { key: "driverId", label: "Driver ID" },
    { key: "totalBookings", label: "Total Bookings" },
    { key: "finished", label: "Completed" },
    { key: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto space-y-6">
        <FilterToolbar title="Bookings Analytics" onExport={() => ""} exportDisabled={loading} />

        {/* Summary Cards */}
        <StatsCard
          columns={4}
          items={[
            { id: "all", label: "Total Bookings", value: statusCounts.totalBookings, icon: <BsCardChecklist className="w-5 h-5" />, color: "blue" },
            { id: "finished", label: "Completed", value: statusCounts.finished, icon: <CheckCircleIcon className="w-5 h-5" />, color: "green" },
            { id: "cancelled", label: "Cancelled", value: statusCounts.cancelled, icon: <XCircleIcon className="w-5 h-5" />, color: "red" },
            { id: "inactive", label: "Inactive", value: statusCounts.inactive, icon: <PauseCircleIcon className="w-5 h-5" />, color: "zinc" },
          ]}
          className="mb-10"
        />

        {/* Monthly Bookings Chart */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6 transition-colors">
          {loading ? <Loading /> : <MonthlyRidershipChart data={monthlyData} />}
        </div>

        {/* Top Performing Drivers */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Top Performing Drivers</h2>
          <DataTable
            columns={driverColumns}
            data={topDrivers}
            loading={loading}
            rowKey={(row) => row.driverId}
            emptyMessage="No driver data available."
          />
        </div>
      </div>
    </div>
  );
}
