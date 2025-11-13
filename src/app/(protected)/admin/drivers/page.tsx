'use client';

import Modal from '@/components/Modal';
import { Pagination } from '@/components/Pagination';
import { Sidebar } from '@/components/Sidebar';
import { Driver, DriverResponse, DriverWithWallet } from '@/types/drivers';
import { useEffect, useState, useMemo } from 'react';

interface DriverModalProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    loading: boolean;
    selectedDriver: any; // Replace with proper type if available
    wallet: any;
}

export default function DriversPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState<DriverWithWallet | null>(null);
    const [walletLogs, setWalletLogs] = useState<any[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100;

    const [activeTab, setActiveTab] = useState("Details");
    const tabs = ["Details", "Personal", "Transport", "Ride History", "Messages", "Wallet"];

    const renderTabContent = () => {
        if (!selectedDriver) return <p className="text-gray-500">No driver found.</p>;

        switch (activeTab) {
            /** ─────────────────────────────── DETAILS TAB ─────────────────────────────── **/
            case "Details":
                return (
                    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg p-6 md:p-8 items-center md:items-center space-y-6 md:space-y-0 md:space-x-10">
                        {/* Profile Picture */}
                        <div className="flex-shrink-0 flex justify-center md:justify-start">
                            <img
                                src={selectedDriver.personalRequirements?.profilePicture?.url || "/default-profile.png"}
                                alt={`${selectedDriver.name} Profile`}
                                className="w-60 h-60 rounded-full border-2 border-gray-200 shadow-md object-cover"
                            />
                        </div>

                        {/* Driver Details */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-700 text-sm md:text-base">
                            {[
                                ["ID", selectedDriver.id],
                                ["Name", selectedDriver.name],
                                ["Email", selectedDriver.email],
                                ["Mobile", selectedDriver.mobnum],
                                ["Car Type", selectedDriver.carType || "-"],
                                ["City", selectedDriver.city],
                                ["Status", selectedDriver.status],
                                ["Wallet Balance", `₱${selectedDriver.wallet?.walletBalance.toFixed(2) || "0.00"}`],
                                ["Created At", selectedDriver.createdAt ? new Date(selectedDriver.createdAt).toLocaleString() : "-"]
                            ].map(([label, value]) => (
                                <p key={label}>
                                    <span className="font-semibold text-gray-900">{label}:</span> {value}
                                </p>
                            ))}
                        </div>
                    </div>
                );

            /** ─────────────────────────────── PERSONAL TAB ─────────────────────────────── **/
            case "Personal":
                const pr = selectedDriver.personalRequirements;
                return (
                    <div className="bg-white rounded-xl shadow-md p-6 space-y-3 text-sm md:text-base text-gray-700">
                        <p><span className="font-semibold text-gray-900">Nationality:</span> {pr.nationality || "-"}</p>
                        <p><span className="font-semibold text-gray-900">PWD:</span> {pr.pwd ? "Yes" : "No"}</p>
                        <p><span className="font-semibold text-gray-900">Emergency Contact:</span> {pr.emergencyContactName || "-"}</p>
                        <p><span className="font-semibold text-gray-900">License Number:</span> {pr.driverLicenseNumber || "-"}</p>
                        <p><span className="font-semibold text-gray-900">License Expiry:</span> {pr.driverLicenseExpDate || "-"}</p>
                    </div>
                );

            /** ─────────────────────────────── TRANSPORT TAB ─────────────────────────────── **/
            case "Transport":
                const tr = selectedDriver.transportRequirements;
                return (
                    <div className="bg-white rounded-xl shadow-md p-6 space-y-3 text-sm md:text-base text-gray-700">
                        <p><span className="font-semibold text-gray-900">Plate Number:</span> {tr.plateNumber || "-"}</p>
                        <p><span className="font-semibold text-gray-900">OR Number:</span> {tr.orNumber || "-"}</p>
                        <p><span className="font-semibold text-gray-900">CR Number:</span> {tr.crNumber || "-"}</p>
                        <p><span className="font-semibold text-gray-900">Vehicle:</span> {`${tr.carBrand || "-"} ${tr.carModel || ""}`}</p>
                        <p><span className="font-semibold text-gray-900">Color:</span> {tr.carColor || "-"}</p>
                    </div>
                );

            /** ─────────────────────────────── RIDE HISTORY TAB ─────────────────────────────── **/
            case "Ride History":
                return selectedDriver.rideHistory.length ? (
                    <ul className="bg-white rounded-xl shadow-md p-6 list-disc list-inside text-gray-700">
                        {selectedDriver.rideHistory.map((ride: any, idx: number) => (
                            <li key={idx}>{ride}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No ride history available.</p>
                );

            /** ─────────────────────────────── MESSAGES TAB ─────────────────────────────── **/
            case "Messages":
                return selectedDriver.messages.length ? (
                    <ul className="bg-white rounded-xl shadow-md p-6 list-disc list-inside text-gray-700">
                        {selectedDriver.messages.map((msg: any, idx: number) => (
                            <li key={idx}>{msg}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No messages available.</p>
                );

            /** ─────────────────────────────── WALLET TAB ─────────────────────────────── **/
            case "Wallet":
                const totalCredits = walletLogs
                    .filter(log => log.amount > 0)
                    .reduce((sum, log) => sum + log.amount, 0);
                const totalDebits = walletLogs
                    .filter(log => log.amount < 0)
                    .reduce((sum, log) => sum + log.amount, 0);

                return (
                    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
                        {/* Wallet Summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                            {[
                                { label: "Balance", value: selectedDriver.wallet?.walletBalance || 0 },
                                { label: "Credits", value: totalCredits },
                                { label: "Deductions", value: Math.abs(totalDebits) },
                            ].map((item) => (
                                <div key={item.label} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                    <p className="text-gray-700 text-xs font-medium">{item.label}</p>
                                    <p className="text-lg font-semibold text-orange-600">₱{item.value.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        {/* Transaction History */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                Transaction History ({walletLogs.length})
                            </h3>
                            <div className="overflow-x-auto rounded-lg border border-gray-200">
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
                                                <td
                                                    colSpan={4}
                                                    className="px-6 py-6 text-center text-gray-500 italic"
                                                >
                                                    No wallet transactions found.
                                                </td>
                                            </tr>
                                        ) : (
                                            walletLogs.map((log, idx) => (
                                                <tr
                                                    key={idx}
                                                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                                                >
                                                    <td className="px-6 py-4 text-gray-600">{log.bookingId}</td>
                                                    <td className="px-6 py-4 text-gray-700">{log.description}</td>
                                                    <td
                                                        className={`px-6 py-4 text-right font-semibold ${log.amount >= 0 ? "text-green-600" : "text-red-500"
                                                            }`}
                                                    >
                                                        {log.amount >= 0 ? "+" : ""}
                                                        ₱{log.amount.toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-500">
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
                );

            /** ─────────────────────────────── DEFAULT ─────────────────────────────── **/
            default:
                return null;
        }
    };

    // Fetch drivers once on mount
    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const res = await fetch('/api/user/drivers');
                if (!res.ok) throw new Error('Failed to fetch drivers');
                const data = await res.json();
                setDrivers(data);
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
        };

        fetchDrivers();
    }, []);

    async function fetchDriverDetails(id: string) {
        setLoading(true);
        setSelectedDriver(null);
        try {
            const res = await fetch(`/api/admin/getDriver/${id}`);
            if (!res.ok) throw new Error("Failed to fetch driver");

            const data: DriverResponse = await res.json();
            setSelectedDriver({ ...data.driver, wallet: data.wallet });
            setWalletLogs(data.walletLogs || []);
            setIsOpen(true); // open modal after fetching
        } catch (err) {
            console.error("Error fetching driver details:", err);
        } finally {
            setLoading(false);
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'text-green-600';
            case 'pending':
                return 'text-yellow-600';
            case 'rejected':
                return 'text-red-600';
            default:
                return 'text-gray-500';
        }
    };

    // Filters & sorting
    const displayedDrivers = useMemo(() => {
        let filtered = drivers;

        // Date range filter (using Date objects)
        if (fromDate && toDate) {
            const from = new Date(fromDate);
            const to = new Date(toDate);
            filtered = filtered.filter((d) => {
                const created = d.createdAt ? new Date(d.createdAt) : null;
                return created && created >= from && created <= to;
            });
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter((d) => d.status === statusFilter);
        }

        // Search filter
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (d) =>
                    d.id?.toLowerCase().includes(term) ||
                    d.name?.toLowerCase().includes(term) ||
                    d.email?.toLowerCase().includes(term) ||
                    d.mobnum?.includes(term)
            );
        }

        return filtered;
    }, [drivers, statusFilter, searchTerm, fromDate, toDate]);

    const sortedDrivers = useMemo(() => {
        return displayedDrivers.slice().sort((a, b) => {
            const dateA = new Date(a.createdAt || '').getTime();
            const dateB = new Date(b.createdAt || '').getTime();
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
    }, [displayedDrivers, sortOrder]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [statusFilter, searchTerm, fromDate, toDate]);

    // Pagination
    const totalPages = Math.ceil(sortedDrivers.length / itemsPerPage);
    const paginatedDrivers = sortedDrivers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Totals
    const totals = useMemo(() => {
        const approved = displayedDrivers.filter((d) => d.status === 'approved').length;
        const pending = displayedDrivers.filter((d) => d.status === 'pending').length;
        const rejected = displayedDrivers.filter((d) => d.status === 'rejected').length;
        return { approved, pending, rejected };
    }, [displayedDrivers]);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-8 overflow-auto space-y-6">
                {/* Header + Filters */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-2xl font-semibold text-gray-800 ml-20">Drivers</h2>

                    <div className="flex flex-wrap items-center gap-4 border border-gray-300 rounded-lg p-4">
                        {/* Date Filters */}
                        {[
                            { label: 'From', value: fromDate, setter: setFromDate },
                            { label: 'To', value: toDate, setter: setToDate },
                        ].map((d) => (
                            <div key={d.label} className="flex items-center gap-2">
                                <label className="text-sm text-gray-600">{d.label}:</label>
                                <input
                                    type="date"
                                    value={d.value}
                                    onChange={(e) => d.setter(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                                />
                            </div>
                        ))}

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">Status:</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                            >
                                <option value="all">All</option>
                                <option value="approved">Approved</option>
                                <option value="pending">Pending</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        {/* Search */}
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search name, email, or mobile"
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-64"
                        />

                        {/* Export (stubbed) */}
                        <button
                            className="ml-auto px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md shadow-sm text-sm font-medium transition"
                            onClick={() => alert('Export feature not yet implemented')}
                        >
                            Export
                        </button>
                    </div>
                </div>

                {/* Totals Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: 'Approved', value: totals.approved },
                        { label: 'Pending', value: totals.pending },
                        { label: 'Rejected', value: totals.rejected },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="relative bg-orange-50 border-l-4 border-orange-500 shadow-sm rounded-lg px-4 py-6"
                        >
                            <p className="absolute top-2 left-4 text-gray-900 text-sm">{item.label}</p>
                            <div className="flex items-center justify-center h-full">
                                <p className="text-orange-700 font-bold text-2xl">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-white shadow-md rounded-lg overflow-auto">
                    <table className="min-w-full text-sm text-left border-collapse">
                        <thead className="bg-gray-200 text-gray-900 uppercase text-xs border-b border-gray-200">
                            <tr>
                                {['ID', 'Name', 'Email', 'Mobile', 'Car Type', 'City', 'Status'].map((col) => (
                                    <th key={col} className="px-6 py-3 font-medium text-left">
                                        {col}
                                    </th>
                                ))}
                                <th className="px-6 py-3 font-medium text-left">
                                    <button
                                        className="flex items-center gap-1 hover:text-gray-600 transition uppercase"
                                        onClick={() =>
                                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                                        }
                                    >
                                        Created At
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-4 w-4 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 15l7-7 7 7"
                                            />
                                        </svg>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedDrivers.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-6 text-gray-500 italic">
                                        No drivers found for selected filters.
                                    </td>
                                </tr>
                            ) : (
                                paginatedDrivers.map((d) => (
                                    <tr
                                        key={d._id}
                                        onClick={() => {
                                            fetchDriverDetails(d._id);
                                        }}
                                        className="border-b hover:bg-gray-50 transition cursor-pointer"
                                    >
                                        <td className="px-6 py-3">{d.id}</td>
                                        <td className="px-6 py-3">{d.name}</td>
                                        <td className="px-6 py-3">{d.email}</td>
                                        <td className="px-6 py-3">{d.mobnum}</td>
                                        <td className="px-6 py-3">{d.carType}</td>
                                        <td className="px-6 py-3">{d.city}</td>
                                        <td className={`px-6 py-3 font-semibold ${getStatusColor(d.status)}`}>
                                            {d.status}
                                        </td>
                                        <td className="px-6 py-3 text-gray-500">
                                            {d.createdAt ? new Date(d.createdAt).toLocaleString() : "-"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={selectedDriver?.name} size="full">
                        {loading ? (
                            <p className="text-center text-gray-500 py-10">Loading...</p>
                        ) : (
                            <div className="flex flex-col h-full">
                                {/* Navigation Tabs */}
                                <div className="overflow-x-auto border-b mb-6">
                                    <nav className="flex space-x-2 md:space-x-4 px-2 md:px-4">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`whitespace-nowrap py-2 px-4 md:px-6 rounded-t-lg font-medium transition-colors duration-200${activeTab === tab
                                                    ? "bg-blue-500 text-gray-500 shadow-lg"
                                                    : "text-gray-600 hover:text-orange-500 hover:bg-gray-100"
                                                    }`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </nav>
                                </div>

                                {/* Tab Content */}
                                <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 rounded-b-lg shadow-inner">
                                    {renderTabContent()}
                                </div>
                            </div>
                        )}
                    </Modal>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </div>
    );
}
