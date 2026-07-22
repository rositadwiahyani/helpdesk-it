'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { fetchClient } from '@/lib/apiClient';

type Ticket = any; // simplified for this example
type Category = { id: string | number, name: string };
type Department = { id: string | number, name: string };

export default function TeknisiTicketTable({
    tickets: initialTickets,
    categories,
    mainCategories,
    departments,
    actionType = 'none',
    currentUserId,
}: {
    tickets: Ticket[],
    categories: Category[],
    mainCategories?: Category[],
    departments: Department[],
    actionType?: 'assign' | 'resolve' | 'none' | 'reopen',
    currentUserId?: string,
    hideAssignedToMeFilter?: boolean,
}) {
    // Local state for tickets to support optimistic updates
    const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
    // States for filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Bulk action state
    const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
    const [isBulkRejecting, setIsBulkRejecting] = useState(false);

    // States for sorting
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

    // Compute main categories if not provided
    const computedMainCategories = mainCategories || categories.filter((c: any) => !c.parent_id);

    // Loading states for actions
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    // Reset handler
    const handleReset = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setStartDate('');
        setEndDate('');
        setSortConfig(null);
        setSelectedTickets([]);
    };

    // Inline update handler
    const handleInlineUpdate = async (ticketId: string, field: string, value: any) => {
        // Optimistic UI update
        setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, [field]: value } : t));
        
        // API does not currently have a generic update field endpoint, so we fallback to PATCH status if we must, or a new API.
        // For now, assume /api/admin/tickets/:id accepts any fields in body to update
        const payload = { [field]: value };
        try {
            await fetchClient(`/admin/tickets/${ticketId}`, {
                method: 'PATCH',
                body: JSON.stringify(payload)
            });
        } catch (err) {
            console.error(`Error updating ${field}:`, err);
            alert(`Gagal memperbarui ${field}`);
            // Revert state (in a real app you'd fetch or store previous state)
        }
    };

    // Sorting handler
    const requestSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleAssignToMe = async (ticketId: string) => {
        if (!currentUserId) {
            alert('Anda belum login.');
            return;
        }
        setActionLoading(ticketId);
        try {
            await fetchClient(`/admin/tickets/${ticketId}`, {
                method: 'PATCH',
                body: JSON.stringify({ tech_id: currentUserId, status: 'In Progress' })
            });
            // Optimistic UI update: remove ticket from this view
            setTickets(prev => prev.filter(t => t.id !== ticketId));
        } catch (err) {
            console.error('Failed to assign ticket:', err);
            alert('Gagal mengambil tiket.');
        } finally {
            setActionLoading(null);
        }
    };

    const handleResolveTicket = async (ticketId: string) => {
        if (!confirm('Apakah Anda yakin tiket ini sudah selesai?')) return;
        setActionLoading(ticketId);
        try {
            await fetchClient(`/admin/tickets/${ticketId}`, {
                method: 'PATCH',
                body: JSON.stringify({ status: 'Resolved' })
            });

            // Optimistic UI update: remove ticket from this view
            setTickets(prev => prev.filter(t => t.id !== ticketId));
        } catch (err) {
            console.error('Failed to resolve ticket:', err);
            alert('Gagal menyelesaikan tiket.');
        } finally {
            setActionLoading(null);
        }
    };

    const handleReopenTicket = async (ticketId: string) => {
        if (!confirm('Apakah Anda yakin ingin membuka kembali tiket ini? Tiket akan kembali ke antrean Open Tickets.')) return;
        setActionLoading(ticketId);
        try {
            await fetchClient(`/admin/tickets/${ticketId}`, {
                method: 'PATCH',
                body: JSON.stringify({ status: 'Assigned', tech_id: null })
            });

            // Optimistic UI update: remove ticket from this view
            setTickets(prev => prev.filter(t => t.id !== ticketId));
        } catch (err) {
            console.error('Failed to reopen ticket:', err);
            alert('Gagal membuka kembali tiket.');
        } finally {
            setActionLoading(null);
        }
    };

    const handleExportCSV = () => {
        if (processedTickets.length === 0) {
            alert('Tidak ada data untuk diekspor.');
            return;
        }

        const headers = ['No. Tiket', 'Waktu Masuk', 'Subjek', 'Status', 'Pelapor', 'Unit/Fakultas', 'Kategori', 'Overdue'];
        
        const rows = processedTickets.map(t => [
            t.ticket_num,
            new Date(t.created_at).toLocaleString('id-ID'),
            `"${(t.subject || t.category?.name || 'Tanpa Subjek').replace(/"/g, '""')}"`,
            `"${(t.reporter_name || '').replace(/"/g, '""')}"`,
            `"${(t.unit || '').replace(/"/g, '""')}"`,
            `"${(t.category?.name || '').replace(/"/g, '""')}"`,
            t.is_overdue ? 'Ya' : 'Tidak'
        ]);

        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `export_tiket_operator_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Filter and Sort Logic
    const processedTickets = useMemo(() => {
        let filtered = [...tickets];

        // 1. Search filter
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(t => 
                t.ticket_num?.toLowerCase().includes(lowerQuery) ||
                t.subject?.toLowerCase().includes(lowerQuery) ||
                t.reporter_name?.toLowerCase().includes(lowerQuery)
            );
        }

        // 2. Category filter
        if (selectedCategory) {
            filtered = filtered.filter(t => t.category_id === selectedCategory);
        }

        // 3. Date Range filter
        if (startDate) {
            filtered = filtered.filter(t => new Date(t.created_at) >= new Date(startDate));
        }
        if (endDate) {
            const end = new Date(endDate);
            end.setDate(end.getDate() + 1);
            filtered = filtered.filter(t => new Date(t.created_at) <= end);
        }

        // 4. Sorting
        if (sortConfig !== null) {
            filtered.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (sortConfig.key === 'reporter') aValue = a.reporter_name || '';
                if (sortConfig.key === 'reporter') bValue = b.reporter_name || '';
                if (sortConfig.key === 'subject') aValue = a.subject || a.category?.name || '';
                if (sortConfig.key === 'subject') bValue = b.subject || b.category?.name || '';

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return filtered;
    }, [tickets, searchQuery, selectedCategory, startDate, endDate, sortConfig]);

    const getSortArrow = (key: string) => {
        if (!sortConfig || sortConfig.key !== key) return <span className="text-slate-300 ml-1">↕</span>;
        return sortConfig.direction === 'asc' ? <span className="text-blue-600 ml-1">↑</span> : <span className="text-blue-600 ml-1">↓</span>;
    };

    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center gap-3">
                <div className="relative flex-grow max-w-sm">
                    <input 
                        type="text" 
                        placeholder="Search ticket..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
                </div>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none"
                >
                    <option value="">All Categories</option>
                    {computedMainCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                <button 
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className={`py-2 px-4 border rounded-lg text-sm font-medium transition-colors ${showAdvanced ? 'bg-slate-200 border-slate-300 text-slate-800' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'}`}
                >
                    ⚙️ Advanced
                </button>
                <button 
                    onClick={handleReset}
                    className="py-2 px-4 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                    ↺ Reset
                </button>
                <div className="ml-auto flex items-center gap-3">
                    <span className="text-sm text-slate-500 font-medium whitespace-nowrap hidden sm:block">
                        Showing {processedTickets.length} tickets
                    </span>
                </div>
            </div>

            {showAdvanced && (
                <div className="p-4 border-b border-slate-200 bg-slate-100 flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                    <div className="text-sm font-medium text-slate-700">Date Range:</div>
                    <input 
                        type="date" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="py-1.5 px-3 border border-slate-300 rounded-md text-sm outline-none"
                    />
                    <span className="text-slate-400">-</span>
                    <input 
                        type="date" 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="py-1.5 px-3 border border-slate-300 rounded-md text-sm outline-none"
                    />
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left table-fixed">
                    <thead className="text-xs text-slate-500 bg-white border-b border-slate-200">
                        <tr>
                            <th className="px-4 py-3 font-semibold whitespace-nowrap">No. Tiket</th>
                            <th className="px-4 py-3 font-semibold whitespace-nowrap">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => requestSort('created_at')}>
                                    Waktu Masuk
                                    {sortConfig?.key === 'created_at' && (
                                        <span className="text-xs">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </th>
                            <th className="px-4 py-3 font-semibold min-w-[200px]">Subjek</th>
                            <th className="px-4 py-3 font-semibold whitespace-nowrap w-32">Status</th>
                            <th className="px-4 py-3 font-semibold whitespace-nowrap">Pelapor</th>
                            <th className="px-4 py-3 font-semibold whitespace-nowrap">Unit/Fakultas</th>
                            <th className="px-4 py-3 font-semibold whitespace-nowrap w-40">Category</th>
                            <th className="px-4 py-3 font-semibold whitespace-nowrap w-28">Priority</th>
                            {actionType !== 'none' && (
                                <th className="px-4 py-3 font-semibold text-right whitespace-nowrap w-32">Action</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {processedTickets.length === 0 ? (
                            <tr>
                                <td colSpan={10} className="text-center py-20 text-slate-400">
                                    Tidak ada tiket yang sesuai dengan filter.
                                </td>
                            </tr>
                        ) : (
                            processedTickets.map((ticket, index) => {
                                const formattedTicketNum = ticket.ticket_num ? 
                                    (ticket.ticket_num.match(/\d+$/)?.[0].padStart(6, '0') || ticket.ticket_num) 
                                    : String(index + 1).padStart(6, '0');

                                return (
                                <tr key={ticket.id} className="hover:bg-blue-50/50 transition-colors border-b border-slate-100 last:border-0 group">
                                    <td className="px-4 py-3 font-medium text-slate-800">
                                        <Link href={`/dashboard/teknisi/tickets/${ticket.id}`} className="hover:text-blue-600 hover:underline">
                                            {formattedTicketNum}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 align-middle text-slate-500 whitespace-nowrap">
                                        {ticket.created_at ? new Date(ticket.created_at).toISOString().split('T')[0] : '-'} <span className="text-xs ml-1">{ticket.created_at ? new Date(ticket.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                                    </td>
                                    <td className="px-4 py-3 align-middle">
                                        <Link href={`/dashboard/teknisi/tickets/${ticket.id}`} className="font-semibold text-slate-800 hover:text-blue-600 hover:underline block mb-1 leading-tight line-clamp-2">
                                            {ticket.subject || ticket.category?.name || 'Tanpa Subjek'}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 align-middle whitespace-nowrap">
                                        {ticket.status}
                                    </td>
                                    <td className="px-4 py-3 align-middle whitespace-nowrap">
                                        <div className="font-semibold text-slate-700 leading-tight">{ticket.reporter_name || 'N/A'}</div>
                                    </td>
                                    <td className="px-4 py-3 align-middle whitespace-nowrap">
                                        {ticket.unit || '-'}
                                    </td>
                                    <td className="px-4 py-3 align-middle whitespace-nowrap">
                                        <span className="text-slate-600">{ticket.category?.name || 'N/A'}</span>
                                    </td>
                                    <td className="px-4 py-3 align-middle whitespace-nowrap">
                                        <span className="text-slate-600 font-medium capitalize">{ticket.priority || 'N/A'}</span>
                                    </td>
                                    {actionType !== 'none' && (
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                {actionType === 'assign' ? (
                                                    <button 
                                                        onClick={() => handleAssignToMe(ticket.id)}
                                                        disabled={actionLoading === ticket.id}
                                                        className="py-1 px-3 bg-blue-50 border border-blue-200 rounded text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors disabled:opacity-50"
                                                    >
                                                        {actionLoading === ticket.id ? 'Mengambil...' : 'Assign to Me'}
                                                    </button>
                                                ) : actionType === 'resolve' ? (
                                                    <button 
                                                        onClick={() => handleResolveTicket(ticket.id)}
                                                        disabled={actionLoading === ticket.id}
                                                        className="py-1 px-3 bg-emerald-50 border border-emerald-200 rounded text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50"
                                                    >
                                                        {actionLoading === ticket.id ? 'Menyelesaikan...' : 'Mark as Resolved'}
                                                    </button>
                                                ) : actionType === 'reopen' ? (
                                                    <button 
                                                        onClick={() => handleReopenTicket(ticket.id)}
                                                        disabled={actionLoading === ticket.id}
                                                        className="py-1 px-3 bg-amber-50 border border-amber-200 rounded text-xs font-semibold text-amber-700 hover:bg-amber-100 transition-colors disabled:opacity-50"
                                                    >
                                                        {actionLoading === ticket.id ? 'Memproses...' : 'Reopen'}
                                                    </button>
                                                ) : null}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
                <button 
                    onClick={handleExportCSV}
                    className="py-2 px-4 bg-emerald-600 border border-emerald-700 rounded-lg text-sm font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-2"
                >
                    ⬇ Export CSV
                </button>
            </div>
        </div>
    );
}
