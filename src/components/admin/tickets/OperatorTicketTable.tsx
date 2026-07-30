'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchClient } from '@/lib/apiClient';
import { supabase } from '@/lib/supabase';

type Ticket = any; // simplified for this example
type Category = { id: string | number, name: string };
type Department = { id: string | number, name: string };
type Technician = { id: string, name: string };

export default function OperatorTicketTable({
    initialTickets,
    categories,
    mainCategories,
    departments,
    technicians,
    actionType = 'verify',
    assignToHeader,
    assignToType
}: {
    initialTickets: Ticket[],
    categories: Category[],
    mainCategories: Category[],
    departments: Department[],
    technicians?: Technician[],
    actionType?: 'verify' | 'rollback' | 'readonly',
    assignToHeader?: string,
    assignToType?: 'dept' | 'tech' | 'resolver'
}) {
    const router = useRouter();
    // Local state for tickets to support optimistic updates
    const [tickets, setTickets] = useState<Ticket[]>(initialTickets);

    // Sync state when server data changes
    useEffect(() => {
        setTickets(initialTickets);
    }, [initialTickets]);
    // States for filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [showCategoryPopup, setShowCategoryPopup] = useState(false);

    // Bulk action state
    const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
    const [isBulkRejecting, setIsBulkRejecting] = useState(false);

    // States for sorting
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

    // Toast notification state
    const [toasts, setToasts] = useState<{id: number, message: string, type: 'success' | 'error'}[]>([]);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
    };

    // Action handler for Terima / Tolak / Rollback
    const handleTicketAction = async (ticketId: string, ticketNum: string, action: 'accept' | 'reject' | 'rollback') => {
        try {
            const ticket = tickets.find(t => t.id === ticketId);
            if (!ticket) return;

            // Validasi khusus untuk aksi "Terima"
            if (action === 'accept') {
                if (!ticket.category_id || !ticket.dept_id) {
                    showToast('Kategori dan Unit wajib dipilih sebelum menerima tiket!', 'error');
                    return;
                }
            }

            // Optimistic update: remove ticket from the current view
            setTickets(prev => prev.filter(t => t.id !== ticketId));

            const newStatus = action === 'accept' ? 'Open' : action === 'reject' ? 'REJECTED' : 'WAITING VERIFICATION';
            
            const payload: any = { status: newStatus };
            if (action === 'accept') {
                payload.dept_id = ticket.dept_id;
                payload.category_id = ticket.category_id;
            }

            // Backend call to ensure auto-notif logic fires
            await fetchClient(`/admin/tickets/${ticketId}`, {
                method: 'PATCH',
                body: JSON.stringify(payload)
            });

            // Log action is also handled by backend if we use it, but our backend might not log REJECT_TICKET specifically.
            // But it's fine to keep the manual log here for UI completeness:
            await supabase.from('ticket_logs').insert({
                ticket_id: ticketId,
                action: action === 'accept' ? 'CHANGE_STATUS' : action === 'reject' ? 'REJECT_TICKET' : 'ROLLBACK_TICKET',
                notes: `Status changed to ${newStatus}`
            });

            const actionText = action === 'accept' ? 'terima' : action === 'reject' ? 'tolak' : 'rollback';
            const toastType = action === 'reject' ? 'error' : 'success';
            
            showToast(`Tiket ${ticketNum} berhasil di${actionText}.`, toastType);
            router.refresh();
        } catch (err) {
            console.error('Error ticket action:', err);
            showToast('Gagal memproses tiket.', 'error');
        }
    };

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
            const { error } = await supabase
                .from('tickets')
                .update({ [field]: value })
                .eq('id', ticketId);
            
            if (error) {
                console.error(`Error updating ${field}:`, error);
                alert(`Gagal memperbarui ${field}`);
                // Revert state (in a real app you'd fetch or store previous state)
            }
        } catch (err) {
            console.error('Update error:', err);
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

    const handleBulkAction = async (type: 'default' | 'delete' = 'default') => {
        if (selectedTickets.length === 0) return;

        setIsBulkRejecting(true);
        try {
            const isRollback = actionType === 'rollback' && type === 'default';
            const isDelete = actionType === 'rollback' && type === 'delete';
            const newStatus = isRollback ? 'Open' : 'Ditolak';
            
            const promises = selectedTickets.map(async (ticketId) => {
                const ticket = tickets.find(t => t.id === ticketId);
                const ticketNum = ticket?.ticket_num ? (ticket.ticket_num.match(/\\d+$/)?.[0].padStart(6, '0') || ticket.ticket_num) : ticketId;

                if (isDelete) {
                    const { error } = await supabase.from('tickets').update({ status: 'DELETED' }).eq('id', ticketId);
                    if (error) throw error;
                    showToast(`Tiket ${ticketNum} berhasil dihapus.`, 'success');
                } else {
                    const { error } = await supabase
                        .from('tickets')
                        .update({ status: newStatus })
                        .eq('id', ticketId);

                    if (error) throw error;

                    await supabase.from('ticket_logs').insert({
                        ticket_id: ticketId,
                        action: isRollback ? 'ROLLBACK_TICKET' : 'REJECT_TICKET'
                    });

                    showToast(`Tiket ${ticketNum} berhasil di${isRollback ? 'rollback' : 'tolak'}.`, isRollback ? 'success' : 'error');
                }
                
                return ticketId;
            });

            await Promise.all(promises);
            
            // Optimistic update
            setTickets(prev => prev.filter(t => !selectedTickets.includes(t.id)));
            router.refresh();
        } catch (error) {
            console.error('Bulk action error:', error);
            showToast('Terjadi kesalahan saat memproses bulk action.', 'error');
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
    }, [tickets, searchQuery, selectedCategory, startDate, endDate, sortConfig]);

    const getSortArrow = (key: string) => {
        const isActive = sortConfig?.key === key;
        const isAsc = isActive && sortConfig?.direction === 'asc';
        
        return (
          <svg className={`w-3 h-3 ml-1 transition-transform ${isActive ? 'text-[#0059BB]' : 'text-gray-400'} ${isAsc ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
          </svg>
        );
    };

    const renderPriorityBadge = (priority: string) => {
        const p = (priority || 'MEDIUM').toUpperCase();
        let bg = 'bg-[#E2E2E5]';
        let text = 'text-[#43474F]';
        
        if (p === 'CRITICAL') { bg = 'bg-[#FFDAD6]'; text = 'text-[#93000A]'; }
        if (p === 'HIGH') { bg = 'bg-[#FEF1D8]'; text = 'text-[#7D5100]'; }

        return (
          <div className={`flex py-0.5 px-2 items-center rounded-sm ${bg} w-fit`}>
            <p className={`${text} font-iBMPlexSans text-[11px] font-bold leading-5 w-fit tracking-[0.025em]`}>
              {p}
            </p>
          </div>
        );
    };

    const getInitials = (name: string) => {
        if (!name) return 'U';
        const parts = name.trim().split(' ');
        if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    const formatTimeAgo = (dateStr: string) => {
        if (!dateStr) return 'Unknown';
        const date = new Date(dateStr);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        
        if (diffInSeconds < 60) return `${diffInSeconds} secs ago`;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hrs ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} days ago`;
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Toolbar (Terpisah dari Tabel) */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
                {/* Kiri: Search & Bulk Actions & Reset */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                    {/* Search Bar */}
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search ticket..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 text-sm border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] w-full md:w-64"
                        />
                        <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>

                    <div className="w-px h-6 bg-gray-300 mx-2 hidden md:block"></div>

                    {/* Category Dropdown Button */}
                    <div className="relative">
                        <button 
                            onClick={() => setShowCategoryPopup(!showCategoryPopup)}
                            className={`flex h-[34px] px-3 items-center gap-2 rounded border border-[#C3C6D1] bg-[#FFF] cursor-pointer transition-colors ${showCategoryPopup || selectedCategory ? 'bg-slate-100' : 'hover:bg-gray-50'}`}
                        >
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 max-w-[120px] truncate">
                                {selectedCategory ? mainCategories.find(c => c.id === selectedCategory)?.name || 'Kategori' : 'Kategori'}
                            </span>
                        </button>
                        
                        {/* Category Popup */}
                        {showCategoryPopup && (
                            <div className="absolute left-0 top-[40px] z-50 flex flex-col p-2 bg-white border border-[#C3C6D1] rounded shadow-lg animate-in fade-in slide-in-from-top-2 w-72 max-h-64 overflow-y-auto">
                                <div 
                                    className={`px-3 py-2 text-[13px] font-semibold rounded cursor-pointer transition-colors ${!selectedCategory ? 'bg-[#F4F7FF] text-[#0059BB]' : 'text-slate-700 hover:bg-slate-50'}`}
                                    onClick={() => { setSelectedCategory(''); setShowCategoryPopup(false); }}
                                >
                                    All Categories
                                </div>
                                {mainCategories.map((cat) => (
                                    <div 
                                        key={cat.id} 
                                        className={`px-3 py-2 text-[13px] font-semibold rounded cursor-pointer transition-colors ${selectedCategory === cat.id ? 'bg-[#F4F7FF] text-[#0059BB]' : 'text-slate-700 hover:bg-slate-50'}`}
                                        onClick={() => { setSelectedCategory(cat.id as string); setShowCategoryPopup(false); }}
                                    >
                                        {cat.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {selectedTickets.length > 0 && (
                        <>
                            <div className="w-px h-6 bg-gray-300 mx-1 hidden md:block"></div>
                            {actionType === 'rollback' && (
                                <button 
                                    onClick={() => handleBulkAction('delete')}
                                    disabled={isBulkRejecting}
                                    className="py-[7.5px] px-3 border border-[#C3C6D1] rounded text-[13px] font-semibold text-red-600 bg-red-50 hover:bg-red-100 hover:border-red-200 transition-colors disabled:opacity-50"
                                >
                                    {isBulkRejecting ? 'Memproses...' : `Hapus (${selectedTickets.length})`}
                                </button>
                            )}
                            <button 
                                onClick={() => handleBulkAction('default')}
                                disabled={isBulkRejecting}
                                className={`py-[7.5px] px-3 border border-[#C3C6D1] rounded text-[13px] font-semibold transition-colors disabled:opacity-50 ${
                                    actionType === 'rollback' 
                                        ? 'text-orange-600 bg-orange-50 hover:bg-orange-100 hover:border-orange-200' 
                                        : 'text-red-600 bg-red-50 hover:bg-red-100 hover:border-red-200'
                                }`}
                            >
                                {isBulkRejecting ? 'Memproses...' : `${actionType === 'rollback' ? 'Rollback' : 'Tolak'} (${selectedTickets.length})`}
                            </button>
                        </>
                    )}
                </div>

                {/* Kanan: Advanced, Reset, Export */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative">
                        <button 
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className={`flex h-[34px] px-3 items-center gap-2 rounded border border-[#C3C6D1] bg-[#FFF] cursor-pointer transition-colors ${showAdvanced ? 'bg-slate-100' : 'hover:bg-gray-50'}`}
                        >
                            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.25 9V7.5H8.25V9H5.25ZM2.25 5.25V3.75H11.25V5.25H2.25ZM0 1.5V0H13.5V1.5H0Z" fill="#43474F" /></svg>
                            <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4">Advanced</span>
                        </button>
                        
                        {/* Advanced Filter Popup */}
                        {showAdvanced && (
                            <div className="absolute left-0 top-[40px] z-50 flex flex-col gap-3 p-4 bg-white border border-[#C3C6D1] rounded shadow-lg animate-in fade-in slide-in-from-top-2 w-64">
                                <div className="text-[13px] font-semibold text-slate-700">Filter by Date</div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] text-slate-500 uppercase font-bold">Start Date</label>
                                    <input 
                                        type="date" 
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="py-1.5 px-2 border border-[#C3C6D1] rounded text-[13px] outline-none focus:border-[#0059BB] w-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] text-slate-500 uppercase font-bold">End Date</label>
                                    <input 
                                        type="date" 
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="py-1.5 px-2 border border-[#C3C6D1] rounded text-[13px] outline-none focus:border-[#0059BB] w-full"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <button 
                        onClick={() => { setStartDate(''); setEndDate(''); setSelectedCategory(''); }}
                        className="h-[34px] px-3 bg-white text-gray-600 border border-[#C3C6D1] text-[13px] font-semibold rounded hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                        Reset
                    </button>
                    <div className="ml-2 pl-2 border-l border-gray-300">
                        <span className="flex h-[34px] items-center px-2 text-xs font-bold text-blue-600 bg-blue-50 rounded">
                            {processedTickets.length} tickets
                        </span>
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="flex flex-col rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-sm w-full overflow-hidden">
                <div className="w-full overflow-x-auto min-h-[400px]">
                <table className="w-full text-left table-auto">
                    <thead className="bg-[#F3F3F6] border-b border-[#C3C6D1]">
                        <tr>
                            {actionType !== 'readonly' && (
                                <th className="px-4 py-4 w-12 text-center">
                                    <input 
                                        type="checkbox" 
                                        className="rounded border-gray-300 w-4 h-4 text-[#0059BB] focus:ring-[#0059BB] cursor-pointer"
                                        checked={selectedTickets.length === processedTickets.length && processedTickets.length > 0}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                            )}
                            <th className="px-4 py-4 select-none hover:bg-gray-200 transition-colors cursor-pointer w-28" onClick={() => requestSort('ticket_num')}>
                                <div className="flex items-center group">
                                    <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">NO. TIKET</span>
                                    {getSortArrow('ticket_num')}
                                </div>
                            </th>
                            <th className="px-4 py-4 select-none hover:bg-gray-200 transition-colors cursor-pointer w-36" onClick={() => requestSort('created_at')}>
                                <div className="flex items-center group">
                                    <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">LAST UPDATE</span>
                                    {getSortArrow('created_at')}
                                </div>
                            </th>
                            <th className="px-4 py-4 select-none hover:bg-gray-200 transition-colors cursor-pointer" onClick={() => requestSort('subject')}>
                                <div className="flex items-center group">
                                    <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">SUBJECT</span>
                                    {getSortArrow('subject')}
                                </div>
                            </th>
                            <th className="px-4 py-4 select-none hover:bg-gray-200 transition-colors cursor-pointer w-32" onClick={() => requestSort('reporter')}>
                                <div className="flex items-center group">
                                    <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">FROM</span>
                                    {getSortArrow('reporter')}
                                </div>
                            </th>
                            <th className="px-4 py-4 select-none w-48">
                                <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">CATEGORY</span>
                            </th>
                            <th className="px-4 py-4 select-none w-32">
                                <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">PRIORITY</span>
                            </th>
                            <th className="px-4 py-4 select-none w-44">
                                <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">{assignToHeader || 'ASSIGN TO'}</span>
                            </th>
                            {actionType !== 'readonly' && (
                                <th className="px-4 py-4 select-none text-right w-40">
                                    <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">ACTION</span>
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#C3C6D1]">
                        {processedTickets.length === 0 ? (
                            <tr>
                                <td colSpan={actionType !== 'readonly' ? 9 : 8} className="text-center py-20 text-[#43474F] text-sm">
                                    Tidak ada tiket yang sesuai dengan filter.
                                </td>
                            </tr>
                        ) : (
                            processedTickets.map((ticket, index) => {
                                const formattedTicketNum = ticket.ticket_num ? 
                                    (ticket.ticket_num.match(/\d+$/)?.[0].padStart(6, '0') || ticket.ticket_num) 
                                    : String(index + 1).padStart(6, '0');
                                const tNum = `#${formattedTicketNum}`;

                                return (
                                <tr key={ticket.id} className={`hover:bg-slate-50 transition-colors ${index % 2 === 1 ? 'bg-[#F9F9FC]' : ''}`}>
                                    {actionType !== 'readonly' && (
                                        <td className="px-4 py-4 text-center w-12">
                                            <input 
                                                type="checkbox" 
                                                className="rounded border-gray-300 w-4 h-4 text-[#0059BB] focus:ring-[#0059BB] cursor-pointer"
                                                checked={selectedTickets.includes(ticket.id)}
                                                onChange={() => handleSelect(ticket.id)}
                                            />
                                        </td>
                                    )}
                                    <td className="px-4 py-4 text-[#0059BB] font-liberationSerif text-sm font-semibold whitespace-nowrap">
                                        <Link href={`/dashboard/operator/tickets/${ticket.id}`} className="hover:underline">
                                            {tNum}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-4 text-[#43474F] font-iBMPlexSans text-sm whitespace-nowrap">
                                        {formatTimeAgo(ticket.updated_at || ticket.created_at)}
                                    </td>
                                    <td className="px-4 py-4 max-w-xs">
                                        <Link href={`/dashboard/operator/tickets/${ticket.id}`} className="block">
                                            <p className="text-[#1A1C1E] font-iBMPlexSans text-sm font-medium truncate mb-0.5 hover:text-[#0059BB]">
                                                {ticket.subject || ticket.category?.name || 'Tanpa Subjek'}
                                            </p>
                                        </Link>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#1A1C1E] font-iBMPlexSans text-sm truncate max-w-[120px]">
                                                {ticket.reporter_name || 'N/A'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        {actionType === 'verify' ? (
                                            <div className="relative w-[160px]">
                                                <select 
                                                    value={ticket.category_id || ''}
                                                    onChange={(e) => handleInlineUpdate(ticket.id, 'category_id', e.target.value)}
                                                    className="w-full bg-white border border-[#C3C6D1] rounded pl-3 pr-8 py-1.5 text-xs text-slate-700 focus:border-[#0059BB] focus:ring-1 focus:ring-[#0059BB] outline-none cursor-pointer appearance-none hover:border-slate-300 transition-colors"
                                                >
                                                    <option value="">Kategori...</option>
                                                    {categories.map(c => (
                                                        <option key={c.id} value={c.id}>{c.name}</option>
                                                    ))}
                                                </select>
                                                <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        ) : (
                                            <span className="text-[#43474F] font-iBMPlexSans text-[13px] font-medium truncate">{ticket.category?.name || 'N/A'}</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        {actionType === 'verify' ? (
                                            <div className="relative w-[110px]">
                                                <select 
                                                    value={ticket.priority?.toLowerCase() || ''}
                                                    onChange={(e) => handleInlineUpdate(ticket.id, 'priority', e.target.value)}
                                                    className="w-full bg-white border border-[#C3C6D1] rounded pl-3 pr-8 py-1.5 text-xs text-slate-700 focus:border-[#0059BB] focus:ring-1 focus:ring-[#0059BB] outline-none cursor-pointer appearance-none hover:border-slate-300 transition-colors"
                                                >
                                                    <option value="">Priority...</option>
                                                    <option value="low">Low</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="high">High</option>
                                                    <option value="critical">Critical</option>
                                                </select>
                                                <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        ) : (
                                            renderPriorityBadge(ticket.priority)
                                        )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        {assignToType === 'dept' ? (
                                            <span className="text-[#43474F] font-iBMPlexSans text-[12px]">{ticket.department?.name || departments?.find(d => String(d.id) === String(ticket.dept_id))?.name || ticket.dept_id || '-'}</span>
                                        ) : assignToType === 'tech' ? (
                                            <span className="text-[#43474F] font-iBMPlexSans text-[12px]">{ticket.tech?.name || ticket.tech_id || 'Belum di-assign'}</span>
                                        ) : assignToType === 'resolver' ? (
                                            <span className="text-[#43474F] font-iBMPlexSans text-[12px]">{ticket.tech?.name || ticket.tech_id || 'System'}</span>
                                        ) : actionType === 'verify' ? (
                                            <div className="relative w-[140px]">
                                                <select 
                                                    value={ticket.dept_id || ''}
                                                    onChange={(e) => handleInlineUpdate(ticket.id, 'dept_id', e.target.value ? Number(e.target.value) : null)}
                                                    className="w-full bg-white border border-[#C3C6D1] rounded pl-3 pr-8 py-1.5 text-xs text-slate-700 focus:border-[#0059BB] focus:ring-1 focus:ring-[#0059BB] outline-none cursor-pointer appearance-none hover:border-slate-300 transition-colors"
                                                >
                                                    <option value="">Pilih Unit...</option>
                                                    {departments?.map(dept => (
                                                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                                                    ))}
                                                </select>
                                                <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        ) : (
                                            <span className="text-[#43474F] font-iBMPlexSans text-[12px]">{ticket.department?.name || departments?.find(d => String(d.id) === String(ticket.dept_id))?.name || ticket.dept_id || '-'}</span>
                                        )}
                                    </td>
                                    {actionType !== 'readonly' && (
                                        <td className="px-4 py-4 text-right whitespace-nowrap">
                                            <div className="flex justify-end gap-2">
                                                {actionType === 'verify' ? (
                                                    <>
                                                        <button 
                                                            onClick={() => handleTicketAction(ticket.id, formattedTicketNum, 'accept')}
                                                            className="py-1.5 px-4 bg-white border border-[#0059BB] rounded text-xs font-semibold text-[#0059BB] hover:bg-[#D5E3FF] transition-colors"
                                                        >
                                                            Terima
                                                        </button>
                                                        <button 
                                                            onClick={() => handleTicketAction(ticket.id, formattedTicketNum, 'reject')}
                                                            className="py-1.5 px-4 bg-white border border-[#93000A] rounded text-xs font-semibold text-[#93000A] hover:bg-[#FFDAD6] transition-colors"
                                                        >
                                                            Tolak
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button 
                                                        onClick={() => handleTicketAction(ticket.id, formattedTicketNum, 'rollback')}
                                                        className="py-1.5 px-4 bg-white border border-orange-500 rounded text-xs font-semibold text-orange-600 hover:bg-orange-100 transition-colors"
                                                    >
                                                        Rollback
                                                    </button>
                                                )}
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
