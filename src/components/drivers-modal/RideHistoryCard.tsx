import React, { Key } from "react";

type Ride = {
    timestamp: string | number | Date;
    origin?: { name?: string | null };
    destination?: { name?: string | null };
    travelFare?: number;
    status: string;
};

type Props = {
    rideHistory?: {
        driver?: {
            history?: Ride[];
        };
    } | null;
};

const RideHistoryCard: React.FC<Props> = ({ rideHistory }) => {
    const rides = (rideHistory?.driver?.history || [])
        .slice()
        .sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

    const totalFinished = rides.filter((ride) => ride.status === "finished").length;
    const totalCancelled = rides.filter((ride) => ride.status === "cancelled").length;

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 space-y-6">
            {/* Ride Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                {[
                    { label: "Finished Rides", value: totalFinished },
                    { label: "Cancelled Rides", value: totalCancelled },
                ].map((item) => (
                    <div key={item.label} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <p className="text-xs font-medium text-black">{item.label}</p>
                        <p className="text-lg font-semibold text-orange-600">{item.value}</p>
                    </div>
                ))}
            </div>

            {/* Ride History Table */}
            <div>
                <h3 className="text-lg font-semibold mb-3">
                    Ride History ({rides.length})
                </h3>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    {/* Scrollable body */}
                    <div className="max-h-64 overflow-y-auto">
                        <table className="min-w-full text-sm text-left border-collapse">
                            <thead className="bg-gray-100 text-gray-800 uppercase text-xs font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Origin</th>
                                    <th className="px-6 py-3">Destination</th>
                                    <th className="px-6 py-3 text-right">Fare (₱)</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {rides.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-6 text-center text-gray-500 italic">
                                            No ride history available.
                                        </td>
                                    </tr>
                                ) : (
                                    rides.map((ride: Ride, idx: Key) => (
                                        <tr
                                            key={idx}
                                            className="border-b last:border-0 hover:bg-slate-800 hover:text-white transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                {new Date(ride.timestamp).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">{ride.origin?.name || "-"}</td>
                                            <td className="px-6 py-4">{ride.destination?.name || "-"}</td>
                                            <td className="px-6 py-4 text-right font-semibold">
                                                ₱{ride.travelFare?.toFixed(2) || "0.00"}
                                            </td>
                                            <td className="px-6 py-4 capitalize">
                                                {ride.status.toUpperCase() || "-"}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RideHistoryCard;
