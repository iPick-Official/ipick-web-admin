import React, { useState, useMemo } from "react";
import StatsCard from "../ui/StatsCard";
import DataTable, { Column } from "../ui/DataTable";
import { FaMoneyBill } from "react-icons/fa";
import { Wallet, WalletLog } from "@/types/drivers";

type Props = {
    wallet?: Wallet | null;
    walletLogs: WalletLog[];
};

const WalletCard: React.FC<Props> = ({ wallet, walletLogs }) => {
    const balance = wallet?.walletBalance ?? 0;
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const sortedLogs = useMemo(() => {
        return [...walletLogs].sort((a, b) => {
            const aTime = new Date(a.createdAt).getTime();
            const bTime = new Date(b.createdAt).getTime();
            return sortOrder === "asc" ? aTime - bTime : bTime - aTime;
        });
    }, [walletLogs, sortOrder]);

    const columns: Column<WalletLog>[] = [
        { key: "bookingId", label: "Booking ID" },
        { key: "description", label: "Description" },
        {
            key: "amount",
            label: "Amount",
            render: (log) => (
                <span className={log.amount >= 0 ? "text-green-600" : "text-red-500"}>
                    {log.amount >= 0 ? "+" : ""}₱{log.amount.toFixed(2)}
                </span>
            ),
        },
        { key: "topupBy", label: "Topup By" },
        {
            key: "createdAt",
            label: "Date",
            sortable: true,
            render: (log) => new Date(log.createdAt).toLocaleString(),
        },
    ];

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 space-y-6">
            <StatsCard columns={2}
                items={[
                    { id: "all", label: "Wallet Balance", value: `₱${balance.toFixed(2)}`, icon: <FaMoneyBill className="w-5 h-5" />, color: "green" },
                ]} />
            {/* Wallet Transaction Table */}
            <div>
                <h3 className="text-lg font-semibold mb-3">Transaction History ({sortedLogs.length})</h3>
                <DataTable<WalletLog>
                    columns={columns}
                    data={sortedLogs}
                    sortOrder={sortOrder}
                    onSortToggle={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
                    emptyMessage="No wallet transactions found."
                />
            </div>
        </div>
    );
};

export default WalletCard;
