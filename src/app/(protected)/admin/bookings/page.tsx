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

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-8 overflow-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Bookings</h2>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Date Range */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">From:</label>
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">To:</label>
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                        </div>

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
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3 font-medium">ID</th>
                                <th className="px-6 py-3 font-medium">Rider</th>
                                <th className="px-6 py-3 font-medium">Driver</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium">Fare</th>
                                <th className="px-6 py-3 font-medium">Origin</th>
                                <th className="px-6 py-3 font-medium">Destination</th>
                                <th className="px-6 py-3 font-medium">Created At</th>
                                <th className="px-6 py-3 font-medium">Rider Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedBookings.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={9}
                                        className="text-center py-6 text-gray-500 italic"
                                    >
                                        No bookings found for selected date(s).
                                    </td>
                                </tr>
                            ) : (
                                displayedBookings.map((b) => {
                                    const bookingDate = b.createdAt.slice(0, 10);
                                    const isToday = bookingDate === today;

                                    return (
                                        <tr
                                            key={b._id}
                                            className={`border-b ${isToday ? 'bg-yellow-50' : 'bg-white'
                                                } hover:bg-gray-50 transition`}
                                        >
                                            <td className="px-6 py-3">{b._id}</td>
                                            <td className="px-6 py-3">{b.riderId}</td>
                                            <td className="px-6 py-3">{b.driverId}</td>
                                            <td className={`px-6 py-3 font-semibold ${getStatusColor(b.status)}`}>
                                                {b.status}
                                            </td>
                                            <td className="px-6 py-3 text-gray-800">
                                                ₱{b.travelFare?.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-3 text-gray-600">{b.origin?.name}</td>
                                            <td className="px-6 py-3 text-gray-600">{b.destination?.name}</td>
                                            <td className="px-6 py-3 text-gray-500">
                                                {new Date(b.createdAt).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-3 text-gray-800">
                                                {b.riderRating?.rating || 'N/A'}
                                            </td>
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
