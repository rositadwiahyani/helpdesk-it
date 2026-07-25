'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type Ticket = any; // simplified for this example
type Category = { id: string | number, name: string, dept_id?: number, parent_id?: number | null };

export default function TeknisiTicketTable({
    initialTickets,
    mainCategories,
    actionType = 'assign',
}: {
    initialTickets: Ticket[],
    mainCategories: Category[],
    actionType?: 'assign' | 'resolve' | 'reopen' | 'readonly',
}) {
    const router = useRouter();
    const [tickets, setTickets] = useState<Ticket[]>(initialTickets);

    const [techId, setTechId] = useState<string | undefined>(undefined);
    const [deptId, setDeptId] = useState<number | null>(null);

    useEffect(() => {
        setTickets(initialTickets);
        
        // Ambil data teknisi dari local storage
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                if (user.id) setTechId(user.id);
                if (user.dept_id) setDeptId(user.dept_id);
            } catch (e) {}
        }
    }, [initialTickets]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);

    const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
    const [isProcessingBulk, setIsProcessingBulk] = useState(false);
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
    const [toasts, setToasts] = useState<{id: number, message: string, type: 'success' | 'error'}[]>([]);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
    };

    const handleTicketAction = async (ticketId: string, ticketNum: string) => {
        try {
            setTickets(prev => prev.filter(t => t.id !== ticketId));

            let newStatus = 'In Progress';
            let actionLog = 'TECH_ASSIGNED';

            const updates: any = {};
            if (actionType === 'assign') {
                newStatus = 'In Progress';
                actionLog = 'TECH_ASSIGNED';
                if (techId) updates.tech_id = techId;
            } else if (actionType === 'resolve') {
                newStatus = 'Resolved';
                actionLog = 'RESOLVED_TICKET';
            } else if (actionType === 'reopen') {
                newStatus = 'Assigned';
                actionLog = 'REOPEN_TICKET';
            }

            updates.status = newStatus;

            const { error } = await supabase
                .from('tickets')
                .update(updates)
                .eq('id', ticketId);

            if (error) throw error;

            await supabase.from('ticket_logs').insert({
                ticket_id: ticketId,
                action: actionLog
            });

            const actionText = actionType === 'assign' ? 'diambil' : actionType === 'resolve' ? 'diselesaikan' : 'dibuka kembali';
            showToast(`Tiket ${ticketNum} berhasil ${actionText}.`, 'success');
            router.refresh();
        } catch (err) {
            console.error('Error ticket action:', err);
            showToast('Gagal memproses tiket.', 'error');
        }
    };

    const handleReset = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setStartDate('');
        setEndDate('');
        setSortConfig(null);
        setSelectedTickets([]);
    };

    const requestSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

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

    const handleBulkAction = async () => {
        if (selectedTickets.length === 0) return;

        setIsProcessingBulk(true);
        try {
            let newStatus = 'In Progress';
            let actionLog = 'TECH_ASSIGNED';

            if (actionType === 'assign') {
                newStatus = 'In Progress';
                actionLog = 'TECH_ASSIGNED';
            } else if (actionType === 'resolve') {
                newStatus = 'Resolved';
                actionLog = 'RESOLVED_TICKET';
            } else if (actionType === 'reopen') {
                newStatus = 'Assigned';
                actionLog = 'REOPEN_TICKET';
            }
            
            const promises = selectedTickets.map(async (ticketId) => {
                const ticket = tickets.find(t => t.id === ticketId);
                const ticketNum = ticket?.ticket_num ? (ticket.ticket_num.match(/\d+$/)?.[0].padStart(6, '0') || ticket.ticket_num) : ticketId;

                const updates: any = { status: newStatus };
                if (actionType === 'assign' && techId) updates.tech_id = techId;

                const { error } = await supabase.from('tickets').update(updates).eq('id', ticketId);
                if (error) throw error;

                await supabase.from('ticket_logs').insert({
                    ticket_id: ticketId,
                    action: actionLog
                });

                const actionText = actionType === 'assign' ? 'diambil' : actionType === 'resolve' ? 'diselesaikan' : 'dibuka kembali';
                showToast(`Tiket ${ticketNum} berhasil ${actionText}.`, 'success');
                return ticketId;
            });

            await Promise.all(promises);
            setTickets(prev => prev.filter(t => !selectedTickets.includes(t.id)));
            router.refresh();
        } catch (error) {
            console.error('Bulk action error:', error);
            showToast('Terjadi kesalahan saat memproses bulk action.', 'error');
        } finally {
            setIsProcessingBulk(false);
            setSelectedTickets([]);
        }
    };

    // Filter categories based on deptId, and only show children (parent_id !== null)
    const filteredCategories = useMemo(() => {
        let cats = mainCategories.filter(cat => cat.parent_id !== null);
        if (deptId) {
            cats = cats.filter(cat => cat.dept_id === deptId);
        }
        return cats;
    }, [mainCategories, deptId]);

    const processedTickets = useMemo(() => {
        let filtered = [...tickets];
        
        if (actionType === 'resolve' && techId) {
            filtered = filtered.filter(t => t.tech_id === techId);
        }

        // Filter tickets to only show those belonging to the technician's department
        if (deptId) {
            filtered = filtered.filter(t => {
                const cat = mainCategories.find(c => c.id === t.category_id);
                return cat ? Number(cat.dept_id) === Number(deptId) : false;
            });
        }

        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(t => 
                t.ticket_num?.toLowerCase().includes(lowerQuery) ||
                t.subject?.toLowerCase().includes(lowerQuery) ||
                t.reporter_name?.toLowerCase().includes(lowerQuery)
            );
        }
        if (selectedCategory) filtered = filtered.filter(t => String(t.category_id) === String(selectedCategory));
        if (startDate) filtered = filtered.filter(t => new Date(t.created_at) >= new Date(startDate));
        if (endDate) {
            const end = new Date(endDate);
            end.setDate(end.getDate() + 1);
            filtered = filtered.filter(t => new Date(t.created_at) <= end);
        }
        if (sortConfig !== null) {
            filtered.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];
                if (sortConfig.key === 'reporter') { aValue = a.reporter_name || ''; bValue = b.reporter_name || ''; }
                if (sortConfig.key === 'subject') { aValue = a.subject || a.category?.name || ''; bValue = b.subject || b.category?.name || ''; }
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return filtered;
    }, [tickets, searchQuery, selectedCategory, startDate, endDate, sortConfig, actionType, techId, deptId, mainCategories]);

    const getSortArrow = (key: string) => {
        if (!sortConfig || sortConfig.key !== key) return <span className="text-slate-300 ml-1.5">↑↓</span>;
        return sortConfig.direction === 'asc' ? <span className="text-slate-500 ml-1.5">↑</span> : <span className="text-slate-500 ml-1.5">↓</span>;
    };

    return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-wrap items-center gap-3 bg-white">
                <div className="relative flex-grow max-w-[260px]">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input 
                        type="text" 
                        placeholder="Search ticket..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-[13px] text-slate-700 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
                    />
                </div>
                <div className="relative">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-white border border-slate-200 text-slate-700 text-[13px] font-medium rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 block py-2 pl-4 pr-9 outline-none appearance-none cursor-pointer hover:border-slate-300 transition-colors"
                    >
                        <option value="">All Categories</option>
                        {filteredCategories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </div>
                <button 
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className={`py-2 px-4 border rounded-lg text-[13px] font-medium transition-colors ${showAdvanced ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                >
                    Advanced
                </button>
                <button 
                    onClick={handleReset}
                    className="py-2 px-4 bg-white border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                    Reset
                </button>
                <div className="ml-auto flex items-center gap-3">
                    {selectedTickets.length > 0 && actionType !== 'readonly' && (
                        <button 
                            onClick={handleBulkAction}
                            disabled={isProcessingBulk}
                            className={`py-2 px-4 border rounded-lg text-[13px] font-bold text-white shadow-sm disabled:opacity-50 transition-colors ${
                                actionType === 'reopen' ? 'bg-orange-600 border-orange-700 hover:bg-orange-700' : 'bg-blue-600 border-blue-700 hover:bg-blue-700'
                            }`}
                        >
                            {isProcessingBulk ? 'Memproses...' : `${actionType === 'assign' ? 'Ambil' : actionType === 'resolve' ? 'Selesaikan' : 'Reopen'} Terpilih (${selectedTickets.length})`}
                        </button>
                    )}
                    <span className="text-[13px] text-slate-500 font-medium whitespace-nowrap hidden sm:block">
                        Showing {processedTickets.length} tickets
                    </span>
                </div>
            </div>

            {showAdvanced && (
                <div className="p-3 border-b border-slate-200 bg-slate-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <div className="text-[13px] font-medium text-slate-700">Date Range:</div>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="py-1 px-2 border border-slate-300 rounded text-[13px] outline-none" />
                    <span className="text-slate-400 text-[13px]">-</span>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="py-1 px-2 border border-slate-300 rounded text-[13px] outline-none" />
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-[13px] text-left min-w-[1000px]">
                    <thead className="text-[11px] text-slate-500 bg-white border-b border-slate-100 font-bold uppercase tracking-wider">
                        <tr>
                            {actionType !== 'readonly' && (
                                <th className="px-5 py-4 whitespace-nowrap w-12">
                                    <input 
                                        type="checkbox" 
                                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                        checked={selectedTickets.length === processedTickets.length && processedTickets.length > 0}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                            )}
                            <th className="px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors whitespace-nowrap w-28" onClick={() => requestSort('ticket_num')}>
                                <div className="flex items-center gap-1">TICKET {getSortArrow('ticket_num')}</div>
                            </th>
                            <th className="px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors whitespace-nowrap w-36" onClick={() => requestSort('created_at')}>
                                <div className="flex items-center gap-1">LAST UPDATED {getSortArrow('created_at')}</div>
                            </th>
                            <th className="px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors whitespace-nowrap" onClick={() => requestSort('subject')}>
                                <div className="flex items-center gap-1">SUBJECT {getSortArrow('subject')}</div>
                            </th>
                            <th className="px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors whitespace-nowrap w-32" onClick={() => requestSort('reporter')}>
                                <div className="flex items-center gap-1">FROM {getSortArrow('reporter')}</div>
                            </th>
                            <th className="px-5 py-4 whitespace-nowrap w-48">CATEGORY</th>
                            <th className="px-5 py-4 whitespace-nowrap w-32">PRIORITY</th>
                            {actionType !== 'readonly' && (
                                <th className="px-5 py-4 text-right whitespace-nowrap w-40">ACTION</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {processedTickets.length === 0 ? (
                            <tr>
                                <td colSpan={actionType !== 'readonly' ? 8 : 7} className="text-center py-20 text-slate-400">
                                    Tidak ada tiket yang sesuai dengan filter.
                                </td>
                            </tr>
                        ) : (
                            processedTickets.map((ticket, index) => {
                                const formattedTicketNum = ticket.ticket_num ? 
                                    (ticket.ticket_num.match(/\d+$/)?.[0].padStart(6, '0') || ticket.ticket_num) 
                                    : String(index + 1).padStart(6, '0');

                                return (
                                <tr key={ticket.id} className={`transition-colors bg-white ${selectedTickets.includes(ticket.id) ? 'bg-blue-50/50' : 'hover:bg-slate-50/50'}`}>
                                    {actionType !== 'readonly' && (
                                        <td className="px-5 py-4 align-middle w-12">
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                checked={selectedTickets.includes(ticket.id)}
                                                onChange={() => handleSelect(ticket.id)}
                                            />
                                        </td>
                                    )}
                                    <td className="px-5 py-4 align-middle whitespace-nowrap">
                                        <Link href={`/dashboard/teknisi/tickets/${ticket.id}`} className="font-bold text-slate-900 text-[14px]">
                                            {formattedTicketNum}
                                        </Link>
                                    </td>
                                    <td className="px-5 py-4 align-middle whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-700 font-medium text-[13px]">
                                                {ticket.created_at ? new Date(ticket.created_at).toISOString().split('T')[0] : '-'}
                                            </span>
                                            {ticket.created_at && (
                                                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-[11px] font-semibold border border-slate-200">
                                                    {new Date(ticket.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 align-middle">
                                        <Link href={`/dashboard/teknisi/tickets/${ticket.id}`} className="font-bold text-slate-800 text-[14px] hover:text-blue-600 transition-colors block leading-tight pr-4">
                                            {ticket.subject || ticket.category?.name || 'Tanpa Subjek'}
                                        </Link>
                                    </td>
                                    <td className="px-5 py-4 align-middle whitespace-nowrap">
                                        <div className="font-medium text-slate-600 text-[13px]">{ticket.reporter_name || 'N/A'}</div>
                                    </td>
                                    <td className="px-5 py-4 align-middle whitespace-nowrap">
                                        <span className="text-slate-600 text-[13px]">{ticket.category?.name || 'N/A'}</span>
                                    </td>
                                    <td className="px-5 py-4 align-middle whitespace-nowrap">
                                        <span className="text-slate-600 text-[13px] font-medium capitalize">{ticket.priority || 'N/A'}</span>
                                    </td>
                                    {actionType !== 'readonly' && (
                                        <td className="px-5 py-4 align-middle text-right whitespace-nowrap">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => handleTicketAction(ticket.id, formattedTicketNum)}
                                                    className={`py-1.5 px-4 border rounded-lg text-[13px] font-semibold transition-colors ${
                                                        actionType === 'reopen' ? 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100' : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                                                    }`}
                                                >
                                                    {actionType === 'assign' ? 'Assign to Me' : actionType === 'resolve' ? 'Selesaikan' : 'Reopen'}
                                                </button>
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

            {/* Toast Notifications */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
                {toasts.map(toast => (
                    <div key={toast.id} className={`px-5 py-3 rounded-xl shadow-lg border text-sm font-bold animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-auto ${
                        toast.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                        {toast.message}
                    </div>
                ))}
            </div>
        </div>
    );
}
