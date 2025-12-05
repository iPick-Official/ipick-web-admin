'use client';

import { Sidebar } from '@/components/Sidebar';
import { Riders } from '@/types/riders';
import { useEffect, useState, useMemo } from 'react';
import { Pagination } from '@/components/Pagination'; // import the pagination component

export default function RidersPage() {
    const [riders, setRiders] = useState<Riders[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100;

    useEffect(() => {
        async function fetchRiders() {
            try {
                const res = await fetch('/api/rider');
                if (!res.ok) throw new Error('Failed to fetch riders');
                const data = await res.json();
                setRiders(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchRiders();
    }, []);

    // Filtered and sorted riders
    const displayedRiders = useMemo(() => {
        let filtered = [...riders];

        if (fromDate && toDate) {
            filtered = filtered.filter((r) => {
                const created = r.createdAt ? new Date(r.createdAt).toISOString().split('T')[0] : '';
                return created >= fromDate && created <= toDate;
            });
        }

        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (r) =>
                    r.id?.toLowerCase().includes(term) ||
                    r.name?.toLowerCase().includes(term) ||
                    r.email?.toLowerCase().includes(term) ||
                    r.mobnum?.includes(term)
            );
        }

        return filtered;
    }, [riders, searchTerm, fromDate, toDate]);

    const sortedRiders = useMemo(() => {
        return [...displayedRiders].sort((a, b) => {
            const dateA = new Date(a.createdAt || '').getTime();
            const dateB = new Date(b.createdAt || '').getTime();
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
    }, [displayedRiders, sortOrder]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, fromDate, toDate]);

    // Pagination
    const totalPages = Math.ceil(sortedRiders.length / itemsPerPage);
    const paginatedRiders = sortedRiders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Totals
    const totals = useMemo(() => {
        const loggedIn = displayedRiders.filter((r) => r.isLogged).length;
        const notLoggedIn = displayedRiders.filter((r) => !r.isLogged).length;
        return { loggedIn, notLoggedIn };
    }, [displayedRiders]);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-8 overflow-auto space-y-6">
                {/* Header + Filters */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-2xl font-semibold text-gray-800 ml-20">Passengers</h2>
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
                        { label: 'Total Passengers', value: riders.length },
                        { label: 'Logged In', value: totals.loggedIn },
                        { label: 'Not Logged In', value: totals.notLoggedIn },
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
                            <thead className="bg-gray-200 text-gray-900 uppercase text-xs border-b border-gray-200">
                                <tr>
                                    {['ID', 'Name', 'Email', 'Mobile', 'Address', 'Logged In'].map((col) => (
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
                                {paginatedRiders.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-6 text-gray-500 italic">
                                            No riders found for selected filters.
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedRiders.map((r) => (
                                        <tr key={r._id} className="border-b hover:bg-gray-50 transition">
                                            <td className="px-6 py-3">{r.id}</td>
                                            <td className="px-6 py-3">{r.name || '-'}</td>
                                            <td className="px-6 py-3">{r.email || '-'}</td>
                                            <td className="px-6 py-3">{r.mobnum || '-'}</td>
                                            <td className="px-6 py-3">{r.address || '-'}</td>
                                            <td className={`px-6 py-3 font-semibold ${r.isLogged ? 'text-green-600' : 'text-gray-500'}`}>
                                                {r.isLogged ? 'Yes' : 'No'}
                                            </td>
                                            <td className="px-6 py-3 text-gray-500">
                                                {r.createdAt ? new Date(r.createdAt).toLocaleString() : '-'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
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
