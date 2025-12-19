'use client';

import { Loading } from '@/components/Loading';
import { Pagination } from '@/components/Pagination';
import { Sidebar } from '@/components/Sidebar';
import SortButton from '@/components/SortButton';
import { useSort } from '@/hooks/useSort';
import { Booking } from '@/types/bookings';
import { Eye } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';

export default function BookingsPage() {
    const { sortOrder, toggleSort } = useSort("desc");
    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const today = new Date().toISOString().split('T')[0];
    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100;

    useEffect(() => {
        async function fetchBookings() {
            setLoading(true);
            try {
                const res = await fetch('/api/bookings');
                if (!res.ok) throw new Error('Failed to fetch bookings');
                const data = await res.json();
                setBookings(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchBookings();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'finished':
                return 'text-green-600';
            case 'active':
                return 'text-blue-600';
            case 'cancelled':
                return 'text-red-600';
            case 'booked':
                return 'text-yellow-600';
            default:
                return 'text-gray-500';
        }
    };

    // Filtered and sorted bookings
    const displayedBookings = useMemo(() => {
        let filtered = bookings;

        // Filter by date range (defaults to today's date)
        filtered = filtered.filter((b) => {
            const bookingDate = new Date(b.updatedAt).toISOString().split('T')[0];
            return bookingDate >= fromDate && bookingDate <= toDate;
        });

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter((b) => b.status === statusFilter);
        }

        // Search filter
        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();

            filtered = filtered.filter((b) => {
                const bookingId = b._id ? b._id.toLowerCase() : '';
                const driverId = b.driverId ? b.driverId.toLowerCase() : '';
                const riderId = b.riderId ? b.riderId.toLowerCase() : '';

                return (
                    bookingId.includes(term) ||
                    driverId.includes(term) || riderId.includes(term)
                );
            });
        }

        return filtered;
    }, [bookings, statusFilter, searchTerm, fromDate, toDate]);

    const sortedBookings = useMemo(() => {
        const sorted = [...displayedBookings];
        sorted.sort((a, b) => {
            const dateA = new Date(a.updatedAt).getTime();
            const dateB = new Date(b.updatedAt).getTime();
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
        return sorted;
    }, [displayedBookings, sortOrder]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, fromDate, toDate]);

    // Pagination
    const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);
    const paginatedRiders = sortedBookings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totals = useMemo(() => {
        const finished = displayedBookings.filter(b => b.status === 'finished').length;
        const cancelled = displayedBookings.filter(b => b.status === 'cancelled').length;
        const active = displayedBookings.filter(b => b.status === 'active').length;
        const inactive = displayedBookings.filter(b => b.status === 'inactive').length;
        const booked = displayedBookings.filter(b => b.status === 'booked').length;

        const totalBookings = displayedBookings.length;

        return { finished, cancelled, active, inactive, booked, totalBookings };
    }, [displayedBookings]);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 p-8 overflow-auto space-y-6 bg-white dark:bg-zinc-900">

                {/* Header + Filters */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-2xl font-semibold ml-20">Bookings</h2>

                    <div className="flex flex-wrap items-center gap-4 border border-gray-300 rounded-lg p-4">
                        {/* Date Filters */}
                        {[
                            { label: "From", value: fromDate, setter: setFromDate },
                            { label: "To", value: toDate, setter: setToDate },
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
                                <option value="active">Active</option>
                                <option value="finished">Finished</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="inactive">Inactive</option>
                                <option value="booked">Booked</option>
                            </select>
                        </div>

                        {/* Search */}
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search Booking ID"
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-64"
                        />
                        <button
                            className="ml-auto px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md shadow-sm text-sm font-medium transition"
                        >
                            Export
                        </button>
                    </div>
                </div>

                {/* Totals Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
                    {[
                        { label: "Bookings", value: totals.totalBookings },
                        { label: "Finished", value: totals.finished },
                        { label: "Cancelled", value: totals.cancelled },
                        { label: "Active", value: totals.active },
                        { label: "Inactive", value: totals.inactive },
                        { label: "Booked", value: totals.booked },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="relative bg-orange-50 dark:bg-zinc-800 border-l-4 border-orange-500 dark:border-green-800 shadow-sm rounded-lg px-4 py-6"
                        >
                            {/* Label in top-left */}
                            <p className="absolute top-2 left-4 text-sm">{item.label}</p>

                            {/* Value centered */}
                            <div className="flex items-center justify-center h-full">
                                <p className="text-orange-700 dark:text-orange-300 font-bold text-2xl">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="shadow-md rounded-lg overflow-hidden max-h-[75vh] bg-gray-200 dark:bg-zinc-800">
                    <div className="overflow-y-auto max-h-[75vh]">
                        <table className="min-w-full text-sm text-left border-collapse">
                            <thead className="bg-gray-200 dark:bg-zinc-700 uppercase text-xs sticky top-0 z-10">
                                <tr>
                                    {["Booking ID", "Rider ID", "Driver ID", "Status", "Fare", "Origin", "Destination"].map((col) => (
                                        <th key={col} className="px-6 py-3 font-medium text-left">
                                            {col}
                                        </th>
                                    ))}
                                    {/* Timestamp column with sort button */}
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
                                ) : paginatedRiders.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="text-center py-6 text-gray-500 italic">
                                            No bookings found for selected date(s).
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedRiders.map((b) => {
                                        const bookingDate = b.updatedAt.slice(0, 10);
                                        const isToday = bookingDate === today;

                                        return (
                                            <tr
                                                key={b._id}
                                                className={`border-b ${isToday ? "bg-orange-50" : "bg-white"} hover:bg-gray-200 dark:hover:bg-zinc-500 transition`}
                                            >
                                                <td className="px-6 py-3 dark:bg-zinc-800">{b._id}</td>
                                                <td className="px-6 py-3 dark:bg-zinc-800">{b.riderId}</td>
                                                <td className="px-6 py-3 dark:bg-zinc-800">{b.driverId || "Unassigned"}</td>
                                                <td className={`px-6 py-3 font-semibold dark:bg-zinc-800 ${getStatusColor(b.status)}`}>{b.status.toUpperCase()}</td>
                                                <td className="px-6 py-3 dark:bg-zinc-800">₱{b.travelFare?.toFixed(2)}</td>
                                                <td className="px-6 py-3 dark:bg-zinc-800">{b.origin?.name}</td>
                                                <td className="px-6 py-3 dark:bg-zinc-800">{b.destination?.name}</td>
                                                <td className="px-6 py-3 dark:bg-zinc-800">{new Date(b.updatedAt).toLocaleString()}</td>
                                                <td className="px-6 py-3 dark:bg-zinc-800">
                                                    <div className="flex items-center text-green-700 justify-center">
                                                        <Eye />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                )}
            </div>
        </div>
    );
}
