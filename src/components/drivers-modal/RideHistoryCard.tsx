import React, { useMemo, useState } from "react";
import DataTable, { Column } from "../ui/DataTable";
import { Ride, Rides } from "@/types/history";
import StatsCard from "../ui/StatsCard";
import { CheckCircleIcon, XCircle } from "lucide-react";
import { BsCardChecklist } from "react-icons/bs";

const RideHistoryCard: React.FC<Rides> = ({ rideHistory }) => {
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const rides = rideHistory?.driver?.history || [];

    const sortedRides = useMemo(() => {
        return [...rides].sort((a, b) => {
            const aTime = new Date(a.updatedAt).getTime();
            const bTime = new Date(b.updatedAt).getTime();
            return sortOrder === "asc" ? aTime - bTime : bTime - aTime;
        });
    }, [rides, sortOrder]);

    const totalFinished = rides.filter((ride) => ride.status === "finished").length;
    const totalCancelled = rides.filter((ride) => ride.status === "cancelled").length;

    const columns: Column<Ride>[] = [
        { key: "origin", label: "Origin", render: (ride) => ride.origin?.name || "-" },
        { key: "destination", label: "Destination", render: (ride) => ride.destination?.name || "-" },
        { key: "travelFare", label: "Fare (₱)", className: "text-right font-semibold", render: (ride) => `₱${ride.travelFare?.toFixed(2) ?? "0.00"}` },
        { key: "status", label: "Status", render: (ride) => (ride.status ? ride.status.toUpperCase() : "-") },
        { key: "timestamp", label: "Timestamp", sortable: true, render: (ride) => new Date(ride.updatedAt).toLocaleString() },
    ];

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6 space-y-6">
            {/* Ride Summary using StatsCard */}
            <StatsCard columns={3}
                items={[
                    { id: "all", label: "Total Rides", value: rides.length, icon: <BsCardChecklist className="w-5 h-5" />, color: "blue" },
                    { id: "finished", label: "Finished Rides", value: totalFinished, icon: <CheckCircleIcon className="w-5 h-5" />, color: "green" },
                    { id: "cancelled", label: "Cancelled Rides", value: totalCancelled, icon: <XCircle className="w-5 h-5" />, color: "red" },
                ]} />

            {/* Ride History Table */}
            <div>
                <DataTable<Ride>
                    columns={columns}
                    data={sortedRides}
                    sortOrder={sortOrder}
                    onSortToggle={() =>
                        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                    }
                    emptyMessage="No ride history available."
                />
            </div>
        </div>
    );
};

export default RideHistoryCard;
