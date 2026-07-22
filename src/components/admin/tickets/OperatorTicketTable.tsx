'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { fetchClient } from '@/lib/apiClient';

type Ticket = any; // simplified for this example
type Category = { id: string | number, name: string, parent_id?: string | number | null };
type Department = { id: string | number, name: string };
type Technician = { id: string, name: string };

export default function OperatorTicketTable({
    initialTickets,
    categories,
    mainCategories,
    departments,
    technicians,
    actionType = 'verify'
}: {
    initialTickets: Ticket[],
    categories: Category[],
    mainCategories: Category[],
    departments: Department[],
    technicians?: Technician[],
    actionType?: 'verify' | 'rollback'
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
        
        try {
            await fetchClient(`/operator/tickets/${ticketId}`, {
                method: 'PATCH',
                body: JSON.stringify({ [field]: value })
            });
        } catch (err) {
            console.error('Update error:', err);
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

    // Bulk actions
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedTickets(processedTickets.map(t => t.id));
        } else {
            setSelectedTickets([]);
        }
    };

    const handleSelect = (id: string) => {
        if (selectedTickets.includes(id)) {
            setSelectedTickets(selectedTickets.filter(tId => tId !== id));
        } else {
            setSelectedTickets([...selectedTickets, id]);
        }
    };

    const handleBulkReject = async () => {
        if (selectedTickets.length === 0) return;
        if (!confirm(`Apakah Anda yakin ingin MENOLAK ${selectedTickets.length} tiket yang dipilih secara otomatis?`)) return;

        setIsBulkRejecting(true);
        try {
            // Placeholder API call
            const promises = selectedTickets.map(ticketId => 
                fetch('/api/tickets/operator', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        ticketId, 
                        actionType: 'reject'
                    })
                })
            );

            await Promise.all(promises);
            window.location.reload();
        } catch (error) {
            console.error('Bulk reject error:', error);
            alert('Terjadi kesalahan saat memproses bulk reject.');
        } finally {
            setIsBulkRejecting(false);
            setSelectedTickets([]);
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
    }, [initialTickets, searchQuery, selectedCategory, startDate, endDate, sortConfig]);

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
                    {mainCategories.map((cat) => (
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
                    {selectedTickets.length > 0 && (
                        <button 
                            onClick={handleBulkReject}
                            disabled={isBulkRejecting}
                            className="py-2 px-4 bg-red-600 border border-red-700 rounded-lg text-sm font-bold text-white hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50"
                        >
                            {isBulkRejecting ? 'Memproses...' : `Tolak Terpilih (${selectedTickets.length})`}
                        </button>
                    )}
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
                <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100/80 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider text-left">
                        <tr>
                            <th className="px-3 py-2 w-10 text-center">
                                <input 
                                    type="checkbox" 
                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    checked={selectedTickets.length === processedTickets.length && processedTickets.length > 0}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className="px-3 py-2 font-semibold cursor-pointer hover:bg-slate-50 transition-colors whitespace-nowrap w-20" onClick={() => requestSort('ticket_num')}>
                                <div className="flex items-center gap-1">Ticket {getSortArrow('ticket_num')}</div>
                            </th>
                            <th className="px-3 py-2 font-semibold cursor-pointer hover:bg-slate-50 transition-colors whitespace-nowrap w-28" onClick={() => requestSort('created_at')}>
                                <div className="flex items-center gap-1">Updated {getSortArrow('created_at')}</div>
                            </th>
                            <th className="px-3 py-2 font-semibold cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => requestSort('subject')}>
                                <div className="flex items-center gap-1">Subject {getSortArrow('subject')}</div>
                            </th>
                            <th className="px-3 py-2 font-semibold cursor-pointer hover:bg-slate-50 transition-colors whitespace-nowrap w-28 truncate" onClick={() => requestSort('reporter')}>
                                <div className="flex items-center gap-1">From {getSortArrow('reporter')}</div>
                            </th>
                            <th className="px-3 py-2 font-semibold whitespace-nowrap w-36">Category</th>
                            <th className="px-3 py-2 font-semibold whitespace-nowrap w-24">Priority</th>
                            <th className="px-3 py-2 font-semibold whitespace-nowrap w-28">Assigned To</th>
                            <th className="px-3 py-2 font-semibold text-right whitespace-nowrap w-24">Action</th>
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
                                <tr key={ticket.id} className={`transition-colors text-sm ${selectedTickets.includes(ticket.id) ? 'bg-blue-50' : 'hover:bg-slate-50'}`}>
                                    <td className="px-3 py-2 align-middle w-10 text-center">
                                        <input 
                                            type="checkbox" 
                                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                            checked={selectedTickets.includes(ticket.id)}
                                            onChange={() => handleSelect(ticket.id)}
                                        />
                                    </td>
                                    <td className="px-3 py-2 align-middle whitespace-nowrap">
                                        <Link href={`/dashboard/operator/tickets/${ticket.id}`} className="font-semibold text-blue-600 hover:underline">
                                            {formattedTicketNum}
                                        </Link>
                                    </td>
                                    <td className="px-3 py-2 align-middle text-slate-500 whitespace-nowrap text-xs">
                                        {ticket.created_at ? new Date(ticket.created_at).toISOString().split('T')[0] : '-'} <span className="text-[10px] ml-1">{ticket.created_at ? new Date(ticket.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                                    </td>
                                    <td className="px-3 py-2 align-middle">
                                        <Link href={`/dashboard/operator/tickets/${ticket.id}`} className="font-semibold text-slate-800 hover:text-blue-600 hover:underline block mb-1 leading-tight line-clamp-2 text-xs">
                                            {ticket.subject || ticket.category?.name || 'Tanpa Subjek'}
                                        </Link>
                                    </td>
                                    <td className="px-3 py-2 align-middle whitespace-nowrap">
                                        <div className="font-semibold text-slate-700 leading-tight text-xs">{ticket.reporter_name || 'N/A'}</div>
                                    </td>
                                    <td className="px-3 py-2 align-middle whitespace-nowrap">
                                        {actionType === 'verify' ? (
                                            <select 
                                                value={String(ticket.category_id || '')}
                                                onChange={(e) => handleInlineUpdate(ticket.id, 'category_id', e.target.value)}
                                                className="bg-white border border-slate-300 rounded px-1.5 py-1 text-[11px] focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer max-w-[140px] truncate"
                                            >
                                                <option value="">Pilih Kategori...</option>
                                                {categories.map(c => {
                                                    const parent = categories.find(p => p.id === c.parent_id);
                                                    const displayName = parent ? `${parent.name} / ${c.name}` : c.name;
                                                    return (
                                                        <option key={c.id} value={String(c.id)}>{displayName}</option>
                                                    );
                                                })}
                                            </select>
                                        ) : (
                                            <span className="text-slate-600 text-xs">{ticket.category?.name || 'N/A'}</span>
                                        )}
                                    </td>
                                    <td className="px-3 py-2 align-middle whitespace-nowrap">
                                        {actionType === 'verify' ? (
                                            <select 
                                                value={String(ticket.priority?.toLowerCase() || 'medium')}
                                                onChange={(e) => handleInlineUpdate(ticket.id, 'priority', e.target.value)}
                                                className="bg-white border border-slate-300 rounded px-1.5 py-1 text-[11px] focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                                            >
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                                <option value="critical">Critical</option>
                                            </select>
                                        ) : (
                                            <span className="text-slate-600 font-medium capitalize text-xs">{ticket.priority || 'N/A'}</span>
                                        )}
                                    </td>
                                    <td className="px-3 py-2 align-middle whitespace-nowrap">
                                        {actionType === 'verify' ? (
                                            <select 
                                                value={String(ticket.dept_id || '')}
                                                onChange={(e) => handleInlineUpdate(ticket.id, 'dept_id', e.target.value)}
                                                className="bg-white border border-slate-300 rounded px-1.5 py-1 text-[11px] focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer max-w-[120px] truncate"
                                            >
                                                <option value="">Pilih Departemen...</option>
                                                {departments?.map(dept => (
                                                    <option key={dept.id} value={String(dept.id)}>{dept.name}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <span className="text-slate-500 text-xs">{ticket.dept?.name || ticket.dept_id || '-'}</span>
                                        )}
                                    </td>
                                    <td className="px-3 py-2 align-middle text-right whitespace-nowrap">
                                        <div className="flex justify-end gap-1.5">
                                            {actionType === 'verify' ? (
                                                <>
                                                    <button onClick={() => handleInlineUpdate(ticket.id, 'status', 'Diproses')} title="Terima" className="p-1.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-600 hover:bg-emerald-100 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                                                    </button>
                                                    <button onClick={() => handleInlineUpdate(ticket.id, 'status', 'Ditolak')} title="Tolak" className="p-1.5 bg-red-50 border border-red-200 rounded text-red-600 hover:bg-red-100 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                                                    </button>
                                                </>
                                            ) : (
                                                <button onClick={() => handleInlineUpdate(ticket.id, 'status', 'Open')} className="py-1 px-2 bg-orange-50 border border-orange-200 rounded text-[11px] font-semibold text-orange-700 hover:bg-orange-100 transition-colors">
                                                    Rollback
                                                </button>
                                            )}
                                        </div>
                                    </td>
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
