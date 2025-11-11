'use client';

import { Sidebar } from '@/components/Sidebar';
import { Booking } from '@/types/bookings';
import { useEffect, useState, useMemo } from 'react';

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const today = new Date().toISOString().split('T')[0];
    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        async function fetchBookings() {
            try {
                const res = await fetch('/api/bookings');
                if (!res.ok) throw new Error('Failed to fetch bookings');
                const data = await res.json();
                setBookings(data);
            } catch (error) {
                console.error(error);
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
            default:
                return 'text-gray-500';
        }
    };

    // Filtered and sorted bookings
    const displayedBookings = useMemo(() => {
        let filtered = bookings;

        // Filter by date range (defaults to today's date)
        filtered = filtered.filter((b) => {
            const bookingDate = new Date(b.createdAt).toISOString().split('T')[0];
            return bookingDate >= fromDate && bookingDate <= toDate;
        });

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter((b) => b.status === statusFilter);
        }

        // Search filter
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter((b) => {
                const rider = b.riderId ? b.riderId.toLowerCase() : '';
                const driver = b.driverId ? b.driverId.toLowerCase() : '';
                return (
                    rider.includes(searchTerm.toLowerCase()) ||
                    driver.includes(searchTerm.toLowerCase())
                );
            });
        }

        return filtered;
    }, [bookings, statusFilter, searchTerm, fromDate, toDate]);

    const sortedBookings = useMemo(() => {
        const sorted = [...displayedBookings];
        sorted.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
        return sorted;
    }, [displayedBookings, sortOrder]);

    const totals = useMemo(() => {
        const finished = displayedBookings.filter(b => b.status === 'finished').length;
        const cancelled = displayedBookings.filter(b => b.status === 'cancelled').length;
        const active = displayedBookings.filter(b => b.status === 'active').length;
        const inactive = displayedBookings.filter(b => b.status === 'inactive').length;
        const booked = displayedBookings.filter(b => b.status === 'booked').length;

        return { finished, cancelled, active, inactive, booked };
    }, [displayedBookings]);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-8 overflow-auto space-y-6">
                {/* Totals Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                        { label: "Finished", value: totals.finished },
                        { label: "Cancelled", value: totals.cancelled },
                        { label: "Active", value: totals.active },
                        { label: "Inactive", value: totals.inactive },
                        { label: "Booked", value: totals.booked },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="relative bg-yellow-50 border-l-4 border-yellow-500 shadow-sm rounded-lg px-4 py-6"
                        >
                            {/* Label in top-left */}
                            <p className="absolute top-2 left-4 text-gray-900 text-sm">{item.label}</p>

                            {/* Value centered */}
                            <div className="flex items-center justify-center h-full">
                                <p className="text-yellow-700 font-bold text-2xl">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Header + Filters */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Bookings</h2>

                    <div className="flex flex-wrap items-center gap-4">
                        {/* Date Filters */}
                        {[
                            { label: "From", value: fromDate, setter: setFromDate },
                            { label: "To", value: toDate, setter: setToDate },
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
                                <option value="active">Active</option>
                                <option value="finished">Finished</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Search */}
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search Rider or Driver..."
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-64"
                        />
                        <button
                            className="ml-auto px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md shadow-sm text-sm font-medium transition"
                        >
                            Export
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white shadow-md rounded-lg overflow-auto">
                    <table className="min-w-full text-sm text-left border-collapse">
                        <thead className="bg-gray-200 text-gray-900 uppercase text-xs border-b border-gray-200">
                            <tr>
                                {["Booking ID", "Rider", "Driver", "Status", "Fare", "Origin", "Destination"].map((col) => (
                                    <th key={col} className="px-6 py-3 font-medium text-left">
                                        {col}
                                    </th>
                                ))}
                                {/* Timestamp column with sort button */}
                                <th className="px-6 py-3 font-medium text-left">
                                    <button
                                        className="flex items-center gap-1 hover:text-gray-600 transition uppercase"
                                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    >
                                        Timestamp
                                        {sortOrder === 'asc' ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="text-center py-6 text-gray-500 italic">
                                        No bookings found for selected date(s).
                                    </td>
                                </tr>
                            ) : (
                                sortedBookings.map((b) => {
                                    const bookingDate = b.createdAt.slice(0, 10);
                                    const isToday = bookingDate === today;

                                    return (
                                        <tr
                                            key={b._id}
                                            className={`border-b ${isToday ? 'bg-yellow-50' : 'bg-white'} hover:bg-gray-50 transition`}
                                        >
                                            <td className="px-6 py-3">{b.referenceNumber || b._id}</td>
                                            <td className="px-6 py-3">{b.riderId}</td>
                                            <td className="px-6 py-3">{b.driverId}</td>
                                            <td className={`px-6 py-3 font-semibold ${getStatusColor(b.status)}`}>{b.status}</td>
                                            <td className="px-6 py-3 text-gray-800">₱{b.travelFare?.toFixed(2)}</td>
                                            <td className="px-6 py-3 text-gray-600">{b.origin?.name}</td>
                                            <td className="px-6 py-3 text-gray-600">{b.destination?.name}</td>
                                            <td className="px-6 py-3 text-gray-500">{new Date(b.createdAt).toLocaleString()}</td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
