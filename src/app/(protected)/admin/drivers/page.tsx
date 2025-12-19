'use client';

import Modal from '@/components/Modal';
import Image from "next/image";
import SortButton from '@/components/SortButton';
import { Pagination } from '@/components/Pagination';
import { Sidebar } from '@/components/Sidebar';
import { Driver, DriverResponse, DriverWithWallet, WalletLog } from '@/types/drivers';
import { useEffect, useState, useMemo, Key } from 'react';
import { useSignedDocs } from '@/hooks/useSignedDocs';
import { DriverDataResponse, Message } from '@/types/history';
import { Eye } from 'lucide-react';
import { Loading } from '@/components/Loading';
import { useSort } from '@/hooks/useSort';

export default function DriversPage() {
    const { sortOrder, toggleSort } = useSort("desc");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rideHistory, setRideHistory] = useState<DriverDataResponse | null>(null);
    const [selectedDriver, setSelectedDriver] = useState<DriverWithWallet | null>(null);
    const [walletLogs, setWalletLogs] = useState<WalletLog[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100;

    const [activeTab, setActiveTab] = useState("Details");
    const tabs = ["Details", "Personal", "Transport", "Ride History", "Messages", "Wallet"];

    // --- Top level hooks for all documents ---
    const docKeys = {

        // Personal Docs
        profile: selectedDriver?.personalRequirements?.profilePicture?.url,
        pwdFile: selectedDriver?.personalRequirements?.pwdFile?.url,
        vaccinationCert: selectedDriver?.personalRequirements?.vaccinationCertificate?.url,
        driverLicenseFront: selectedDriver?.personalRequirements?.driverLicenseFront?.url,
        driverLicenseBack: selectedDriver?.personalRequirements?.driverLicenseBack?.url,
        otherDoc: selectedDriver?.personalRequirements?.documentImg?.url,

        // Transport Docs
        operatorDocs: selectedDriver?.transportRequirements?.vehicleOwnership?.operatorDocuments?.url,
        ownerDocs: selectedDriver?.transportRequirements?.ownerDocuments?.url,
        operatorsDoc: selectedDriver?.transportRequirements?.operatorsDocument?.url,
        vehicleOR: selectedDriver?.transportRequirements?.vehicleOR?.url,
        vehicleCR: selectedDriver?.transportRequirements?.vehicleCR?.url,
        vehicleSalesInvoice: selectedDriver?.transportRequirements?.vehicleSalesInvoice?.url,
        authorizationLetterPageOne: selectedDriver?.transportRequirements?.authorizationLetterPageOne?.url,
        authorizationLetterPageTwo: selectedDriver?.transportRequirements?.authorizationLetterPageTwo?.url,
        sPAPageOne: selectedDriver?.transportRequirements?.sPAPageOne?.url,
        sPAPageTwo: selectedDriver?.transportRequirements?.sPAPageTwo?.url,
        pAPageOne: selectedDriver?.transportRequirements?.pAPageOne?.url,
        pAPageTwo: selectedDriver?.transportRequirements?.pAPageTwo?.url,
        cPCPageOne: selectedDriver?.transportRequirements?.cPCPageOne?.url,
        cPCPageTwo: selectedDriver?.transportRequirements?.cPCPageTwo?.url,
        mEPAPageOne: selectedDriver?.transportRequirements?.mEPAPageOne?.url,
        mEPAPageTwo: selectedDriver?.transportRequirements?.mEPAPageTwo?.url,
        pAMI: selectedDriver?.transportRequirements?.pAMI?.url,
    };

    // Use the hook for each key
    const signedUrls = useSignedDocs(docKeys);

    // --- Render function ---
    const renderTabContent = () => {
        if (!selectedDriver) return <p className="text-gray-500">No driver found.</p>;
        const updateDriverStatus = async (driverId: string, newStatus: string) => {
            // Ask for confirmation first
            const confirmed = confirm(`Are you sure you want to change the driver's status to "${newStatus}"?`);
            if (!confirmed) return; // User cancelled

            try {
                const res = await fetch(`/api/driver/${driverId}/status`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: newStatus }),
                });

                const data = await res.json();

                if (!res.ok) {
                    alert(data.message || "Failed to update status");
                    return;
                }
                window.location.reload();
            } catch (error) {
                console.error("Error updating driver:", error);
                alert("Error updating driver");
            }
        };

        switch (activeTab) {
            case "Details":
                return (
                    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg p-6 md:p-8 items-center md:items-center space-y-6 md:space-y-0 md:space-x-10">
                        {/* Profile Picture */}
                        <div className="flex-shrink-0 flex justify-center md:justify-start">
                            <Image
                                src={signedUrls.profile || "/logo.png"}
                                alt={`${selectedDriver.name} Profile`}
                                width="240"
                                height="240"
                                className="w-60 h-60 border-2 border-gray-200 shadow-md object-cover"
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
                                ["Address", `${selectedDriver.address} ${selectedDriver.city} ${selectedDriver.province} ${selectedDriver.zipCode}`],
                                ["Status", selectedDriver.status.toUpperCase()],
                                ["Wallet Balance", `₱${selectedDriver.wallet?.walletBalance.toFixed(2) || "0.00"}`],
                                ["Created At", selectedDriver.createdAt ? new Date(selectedDriver.createdAt).toLocaleString() : "-"]
                            ].map(([label, value]) => (
                                <p key={label}>
                                    <span className="font-semibold text-gray-900">{label}:</span> {value}
                                </p>
                            ))}
                        </div>
                        {selectedDriver.status === "approved" && (
                            <div className="flex flex-col space-y-3">

                                {/* Deactivate button */}
                                <button
                                    className="px-4 py-2 border border-red-500 text-red-600 hover:bg-red-50 font-medium rounded-lg transition-colors"
                                    onClick={() => updateDriverStatus(selectedDriver.id, "inactive")}
                                >
                                    Deactivate
                                </button>

                                {/* Disapprove button */}
                                <button
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow transition-all"
                                    onClick={() => updateDriverStatus(selectedDriver._id, "pending")}
                                >
                                    Disapprove
                                </button>
                            </div>
                        )}

                        {selectedDriver.status === "pending" && (
                            <div className="flex flex-col space-y-3">
                                <button
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow transition-all"
                                    onClick={() => updateDriverStatus(selectedDriver._id, "rejected")}
                                >
                                    Reject
                                </button>
                                <button
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow transition-all"
                                    onClick={() => updateDriverStatus(selectedDriver._id, "approved")}
                                >
                                    Approve
                                </button>
                            </div>
                        )}
                    </div>
                );

            case "Personal":
                const pr = selectedDriver.personalRequirements;

                return (
                    <div className="bg-white rounded-xl shadow-md p-6 space-y-3 text-sm md:text-base text-gray-700">
                        {[
                            { label: "Nationality", value: pr.nationality },
                            { label: "PWD", value: pr.pwd ? "Yes" : "No" },
                            { label: "Emergency Contact", value: pr.emergencyContactName },
                            { label: "License Number", value: pr.driverLicenseNumber },
                            { label: "License Expiry", value: pr.driverLicenseExpDate },
                        ].map(({ label, value }) => (
                            <p key={label}>
                                <span className="font-semibold text-gray-900">{label}:</span> {value || "-"}
                            </p>
                        ))}

                        {[
                            { label: "PWD File", signedUrl: signedUrls.pwdFile },
                            { label: "Vaccination Certificate", signedUrl: signedUrls.vaccinationCert },
                            { label: "Driver License Front", signedUrl: signedUrls.driverLicenseFront },
                            { label: "Driver License Back", signedUrl: signedUrls.driverLicenseBack },
                            { label: "Other Document", signedUrl: signedUrls.otherDoc },
                        ].map(
                            ({ label, signedUrl }) =>
                                signedUrl && (
                                    <p key={label}>
                                        <span className="font-semibold text-gray-900">{label}:</span>{" "}
                                        <a
                                            href={signedUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            View
                                        </a>
                                    </p>
                                )
                        )}
                    </div>
                );

            /** ─────────────────────────────── TRANSPORT TAB ─────────────────────────────── **/
            case "Transport":
                const tr = selectedDriver.transportRequirements;
                return (
                    <div className="bg-white rounded-xl shadow-md p-6 space-y-3 text-sm md:text-base text-gray-700">
                        {/* Basic vehicle info */}
                        <p><span className="font-semibold text-gray-900">Plate Number:</span> {tr.plateNumber || "-"}</p>
                        <p><span className="font-semibold text-gray-900">OR Number:</span> {tr.orNumber || "-"}</p>
                        <p><span className="font-semibold text-gray-900">CR Number:</span> {tr.crNumber || "-"}</p>
                        <p><span className="font-semibold text-gray-900">Vehicle:</span> {`${tr.carBrand || "-"} ${tr.carModel || ""}`}</p>
                        <p><span className="font-semibold text-gray-900">Color:</span> {tr.carColor || "-"}</p>

                        {/* Transport document links */}
                        {[
                            { label: "Operator Documents", signedUrl: signedUrls.operatorDocs },
                            { label: "Owner Documents", signedUrl: signedUrls.ownerDocs },
                            { label: "Operators Document", signedUrl: signedUrls.operatorsDoc },
                            { label: "Vehicle OR", signedUrl: signedUrls.vehicleOR },
                            { label: "Vehicle CR", signedUrl: signedUrls.vehicleCR },
                            { label: "Vehicle Sales Invoice", signedUrl: signedUrls.vehicleSalesInvoice },
                            { label: "Authorization Letter Page 1", signedUrl: signedUrls.authorizationLetterPageOne },
                            { label: "Authorization Letter Page 2", signedUrl: signedUrls.authorizationLetterPageTwo },
                            { label: "SPA Page 1", signedUrl: signedUrls.sPAPageOne },
                            { label: "SPA Page 2", signedUrl: signedUrls.sPAPageTwo },
                            { label: "PA Page 1", signedUrl: signedUrls.pAPageOne },
                            { label: "PA Page 2", signedUrl: signedUrls.pAPageTwo },
                            { label: "CPC Page 1", signedUrl: signedUrls.cPCPageOne },
                            { label: "CPC Page 2", signedUrl: signedUrls.cPCPageTwo },
                            { label: "MEPA Page 1", signedUrl: signedUrls.mEPAPageOne },
                            { label: "MEPA Page 2", signedUrl: signedUrls.mEPAPageTwo },
                            { label: "PAMI", signedUrl: signedUrls.pAMI },
                        ].map(
                            ({ label, signedUrl }) =>
                                signedUrl && (
                                    <p key={label}>
                                        <span className="font-semibold text-gray-900">{label}:</span>{" "}
                                        <a
                                            href={signedUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            View
                                        </a>
                                    </p>
                                )
                        )}
                    </div>
                );

            /** ─────────────────────────────── RIDE HISTORY TAB ─────────────────────────────── **/
            case "Ride History":
                const rides = (rideHistory?.driver?.history || [])
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
                const totalFinished = rides.filter((ride: { status: string; }) => ride.status === "finished").length;
                const totalCancelled = rides.filter((ride: { status: string; }) => ride.status === "cancelled").length;
                return (
                    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
                        {/* Ride Summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                            {[
                                { label: "Finished Rides", value: totalFinished },
                                { label: "Cancelled Rides", value: totalCancelled },
                            ].map((item) => (
                                <div key={item.label} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-gray-700 text-xs font-medium">{item.label}</p>
                                    <p className="text-lg font-semibold text-blue-600">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Ride History Table */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
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
                                                rides.map((ride: { timestamp: string | number | Date; origin: { name: string; }; destination: { name: string; }; travelFare: number; status: string; }, idx: Key | null | undefined) => (
                                                    <tr key={idx} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4">{new Date(ride.timestamp).toLocaleDateString()}</td>
                                                        <td className="px-6 py-4">{ride.origin?.name || "-"}</td>
                                                        <td className="px-6 py-4">{ride.destination?.name || "-"}</td>
                                                        <td className="px-6 py-4 text-right font-semibold">₱{ride.travelFare?.toFixed(2) || "0.00"}</td>
                                                        <td className="px-6 py-4 capitalize">{ride.status.toUpperCase() || "-"}</td>
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

            // /** ─────────────────────────────── MESSAGES TAB ─────────────────────────────── **/
            case "Messages":
                const messages: Message[] = (rideHistory?.driver?.messages || [])
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                return messages.length ? (
                    <div className="bg-white rounded-xl shadow-md p-6 h-[500px] overflow-y-auto space-y-6">
                        {messages.map((m: Message, idx: number) => {
                            const isDriver = m.sender === "driver";

                            return (
                                <div
                                    key={idx}
                                    className={`flex w-full ${isDriver ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`
                                max-w-[75%] px-4 py-3 rounded-xl shadow-md relative
                                ${isDriver ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}
                            `}
                                    >
                                        {/* Sender Label */}
                                        <p
                                            className={`
                                    text-xs font-semibold mb-1 
                                    ${isDriver ? "text-blue-200" : "text-gray-600"}
                                `}
                                        >
                                            {isDriver ? "Driver" : "Rider"}
                                        </p>

                                        {/* Main Message Text */}
                                        <p className="text-sm whitespace-pre-line leading-relaxed">
                                            {m.msg}
                                        </p>

                                        {/* Metadata Section */}
                                        <div
                                            className={`
                                    mt-3 p-2 rounded-lg text-[11px] space-y-1
                                    ${isDriver ? "bg-blue-500/40" : "bg-gray-200"}
                                `}
                                        >
                                            <p><span className="font-semibold">Booking:</span> {m.bookingId}</p>
                                            <p><span className="font-semibold">Rider:</span> {m.riderId}</p>
                                            <p><span className="font-semibold">Driver:</span> {m.driverId}</p>
                                        </div>

                                        {/* Timestamp */}
                                        <p
                                            className={`
                                    text-[10px] mt-2 text-right
                                    ${isDriver ? "text-blue-200" : "text-gray-500"}
                                `}
                                        >
                                            {new Date(m.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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
            setLoading(true);
            try {
                const res = await fetch('/api/driver');
                if (!res.ok) throw new Error('Failed to fetch drivers');
                const data = await res.json();
                setDrivers(data);
            } catch (error) {
                console.error('Error fetching drivers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDrivers();
    }, []);

    async function fetchDetailHistory(id: string) {
        setLoading(true);
        setSelectedDriver(null);
        setWalletLogs([]);
        try {
            // Fetch driver details
            const resDriver = await fetch(`/api/driver/${id}/information`);
            if (!resDriver.ok) throw new Error("Failed to fetch driver");

            const data: DriverResponse = await resDriver.json();
            setSelectedDriver({ ...data.driver, wallet: data.wallet });
            setWalletLogs(data.walletLogs || []);

            const resHistory = await fetch(`/api/driver/${data.driver.id}/history`);
            if (!resHistory.ok) throw new Error("Failed to fetch driver history");

            const historyData = await resHistory.json();
            setRideHistory(historyData || []);
            setIsOpen(true);
        } catch (err) {
            console.error("Error fetching driver details or history:", err);
        }
        finally {
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
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 p-8 overflow-auto space-y-6">
                {/* Header + Filters */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-2xl font-semibold ml-20">Drivers</h2>
                    <div className="flex flex-wrap items-center gap-4 border border-gray-300 rounded-lg p-4">
                        {/* Date Filters */}
                        {[
                            { label: 'From', value: fromDate, setter: setFromDate },
                            { label: 'To', value: toDate, setter: setToDate },
                        ].map((d) => (
                            <div key={d.label} className="flex items-center gap-2">
                                <label className="text-sm">{d.label}:</label>
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
                            <label className="text-sm">Status:</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
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
                <div className="bg-white shadow-md rounded-lg overflow-hidden max-h-[75vh]">
                    <div className="overflow-y-auto max-h-[75vh]">
                        <table className="min-w-full text-sm text-left border-collapse">
                            <thead className="bg-gray-200 text-gray-900 uppercase text-xs border-b border-gray-200 sticky top-0 z-10">
                                <tr>
                                    {['ID', 'Name', 'Email', 'Mobile', 'Car Type', 'Plate No.', 'Status'].map((col) => (
                                        <th key={col} className="px-6 py-3 font-medium text-left bg-gray-200">
                                            {col}
                                        </th>
                                    ))}
                                    <th className="px-6 py-3 font-medium text-left">
                                        <SortButton
                                            label="Created At"
                                            sortOrder={sortOrder}
                                            onToggle={toggleSort}
                                        />
                                    </th>
                                    <th className="px-6 py-3 font-medium text-right">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={9} className="py-6">
                                            <div className="flex items-center justify-center w-full h-full">
                                                <Loading />
                                            </div>
                                        </td>
                                    </tr>
                                ) : paginatedDrivers.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="text-center py-6 text-gray-500 italic">
                                            No drivers found for selected filters.
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedDrivers.map((d) => (
                                        <tr
                                            key={d._id}
                                            className="border-b hover:bg-gray-50 transition cursor-pointer"
                                        >
                                            <td className="px-6 py-3 text-gray-500">{d.id}</td>
                                            <td className="px-6 py-3 text-gray-500">{d.name.toUpperCase()}</td>
                                            <td className="px-6 py-3 text-gray-500">{d.email}</td>
                                            <td className="px-6 py-3 text-gray-500">{d.mobnum}</td>
                                            <td className="px-6 py-3 text-gray-500">{d.carType}</td>
                                            <td className="px-6 py-3 text-gray-500">{d.transportRequirements.plateNumber}</td>
                                            <td className={`px-6 py-3 font-semibold ${getStatusColor(d.status)}`}>
                                                {d.status.toUpperCase()}
                                            </td>
                                            <td className="px-6 py-3 text-gray-500">
                                                {d.createdAt ? new Date(d.createdAt).toLocaleString() : "-"}
                                            </td>
                                            <td className="px-6 py-3 text-green-700 flex justify-end" onClick={() => fetchDetailHistory(d._id)}>
                                                <Eye />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={selectedDriver?.name} size="full">
                            {loading ? (
                                <tr>
                                    <td colSpan={9} className="py-6">
                                        <div className="flex items-center justify-center w-full h-full">
                                            <Loading />
                                        </div>
                                    </td>
                                </tr>
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
