'use client';

import { Sidebar } from '@/components/Sidebar';
import { Driver } from '@/types/drivers';
import { useEffect, useState, useMemo } from 'react';

export default function DriversPage() {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');

    useEffect(() => {
        async function fetchDrivers() {
            try {
                const res = await fetch('/api/user/drivers');
                if (!res.ok) throw new Error('Failed to fetch drivers');
                const data = await res.json();
                setDrivers(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchDrivers();
    }, []);

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

    // Filtered and sorted drivers
    const displayedDrivers = useMemo(() => {
        let filtered = [...drivers];

        // Filter by createdAt date range
        if (fromDate && toDate) {
            filtered = filtered.filter((d) => {
                const created = d.createdAt ? new Date(d.createdAt).toISOString().split('T')[0] : '';
                return created >= fromDate && created <= toDate;
            });
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter((d) => d.status === statusFilter);
        }

        // Search by name, email, or mobile number
        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (d) =>
                    d.name?.toLowerCase().includes(term) ||
                    d.email?.toLowerCase().includes(term) ||
                    d.mobnum?.includes(term)
            );
        }

        return filtered;
    }, [drivers, statusFilter, searchTerm, fromDate, toDate]);

    const sortedDrivers = useMemo(() => {
        return [...displayedDrivers].sort((a, b) => {
            const dateA = new Date(a.createdAt || '').getTime();
            const dateB = new Date(b.createdAt || '').getTime();
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
    }, [displayedDrivers, sortOrder]);

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

                        <button className="ml-auto px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md shadow-sm text-sm font-medium transition">
                            Export
                        </button>
                    </div>
                </div>

                {/* Totals Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4">
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
                                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    >
                                        Created At
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-4 w-4 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                        </svg>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedDrivers.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-6 text-gray-500 italic">
                                        No drivers found for selected filters.
                                    </td>
                                </tr>
                            ) : (
                                sortedDrivers.map((d) => (
                                    <tr key={d.id} className="border-b hover:bg-gray-50 transition">
                                        <td className="px-6 py-3">{d.id}</td>
                                        <td className="px-6 py-3">{d.name}</td>
                                        <td className="px-6 py-3">{d.email}</td>
                                        <td className="px-6 py-3">{d.mobnum}</td>
                                        <td className="px-6 py-3">{d.carType}</td>
                                        <td className="px-6 py-3">{d.city}</td>
                                        <td className={`px-6 py-3 font-semibold ${getStatusColor(d.status)}`}>{d.status}</td>
                                        <td className="px-6 py-3 text-gray-500">
                                            {d.createdAt ? new Date(d.createdAt).toLocaleString() : '-'}
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
}
