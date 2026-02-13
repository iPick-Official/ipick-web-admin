import React from "react";

type WalletLog = {
    bookingId?: string | null;
    description?: string | null;
    amount: number;
    createdAt: string | number | Date;
};

type Wallet = {
    walletBalance?: number | null;
};

type Props = {
    wallet?: Wallet | null;
    walletLogs: WalletLog[];
};

const WalletCard: React.FC<Props> = ({ wallet, walletLogs }) => {
    const balance = wallet?.walletBalance ?? 0;

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 space-y-6">
            {/* Wallet Summary */}
            <div className="grid gap-4 text-center">
                {[
                    { label: "Balance", value: balance },
                ].map((item) => (
                    <div key={item.label} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <p className="text-xs font-medium text-black">{item.label}</p>
                        <p className="text-lg font-semibold text-orange-600">
                            ₱{item.value.toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>

            {/* Transaction History */}
            <div>
                <h3 className="text-lg font-semibold mb-3">
                    Transaction History ({walletLogs.length})
                </h3>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    {/* Scrollable body */}
                    <div className="max-h-64 overflow-y-auto">
                        <table className="min-w-full text-sm text-left border-collapse">
                            <thead className="bg-gray-100 text-gray-800 uppercase text-xs font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3">Booking ID</th>
                                    <th className="px-6 py-3">Description</th>
                                    <th className="px-6 py-3 text-right">Amount</th>
                                    <th className="px-6 py-3">Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {walletLogs.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-6 text-center text-gray-500 italic">
                                            No wallet transactions found.
                                        </td>
                                    </tr>
                                ) : (
                                    walletLogs.map((log, idx) => (
                                        <tr
                                            key={idx}
                                            className="border-b last:border-0 hover:bg-slate-800 hover:text-white transition-colors"
                                        >
                                            <td className="px-6 py-4">{log.bookingId || "-"}</td>
                                            <td className="px-6 py-4">{log.description || "-"}</td>
                                            <td
                                                className={`px-6 py-4 text-right font-semibold ${log.amount >= 0 ? "text-green-600" : "text-red-500"
                                                    }`}
                                            >
                                                {log.amount >= 0 ? "+" : ""}
                                                ₱{log.amount.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {new Date(log.createdAt).toLocaleString()}
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

export default WalletCard;
