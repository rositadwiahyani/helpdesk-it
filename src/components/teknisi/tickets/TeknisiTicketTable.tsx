'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { fetchClient } from '@/lib/apiClient';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type Ticket = any; // simplified for this example
type Category = { id: string | number, name: string, dept_id?: number, parent_id?: number | null };

export default function TeknisiTicketTable({
    initialTickets,
    mainCategories,
    actionType = 'assign',
    tabsNode,
}: {
    initialTickets: Ticket[],
    mainCategories: Category[],
    actionType?: 'assign' | 'resolve' | 'reopen' | 'readonly',
    tabsNode?: React.ReactNode
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
    const [showCategoryPopup, setShowCategoryPopup] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);

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

            let newStatus = 'IN PROGRESS';
            let actionLog = 'TECH_ASSIGNED';

            const updates: any = {};
            if (actionType === 'assign') {
                newStatus = 'IN PROGRESS';
                actionLog = 'TECH_ASSIGNED';
                if (techId) updates.tech_id = techId;
            } else if (actionType === 'resolve') {
                newStatus = 'WAITING CONFIRMATION';
                actionLog = 'RESOLVED_TICKET';
            } else if (actionType === 'reopen') {
                newStatus = 'Open';
                updates.isReopen = true;
                actionLog = 'REOPEN_TICKET';
            }

            updates.status = newStatus;

            await fetchClient(`/admin/tickets/${ticketId}`, {
                method: 'PATCH',
                body: JSON.stringify(updates)
            });

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
            let newStatus = 'IN PROGRESS';
            let actionLog = 'TECH_ASSIGNED';

            if (actionType === 'assign') {
                newStatus = 'IN PROGRESS';
                actionLog = 'TECH_ASSIGNED';
            } else if (actionType === 'resolve') {
                newStatus = 'WAITING CONFIRMATION';
                actionLog = 'RESOLVED_TICKET';
            } else if (actionType === 'reopen') {
                newStatus = 'Open';
                actionLog = 'REOPEN_TICKET';
            }
            
            const promises = selectedTickets.map(async (ticketId) => {
                const ticket = tickets.find(t => t.id === ticketId);
                const ticketNum = ticket?.ticket_num ? (ticket.ticket_num.match(/\d+$/)?.[0].padStart(6, '0') || ticket.ticket_num) : ticketId;

                const updates: any = { status: newStatus };
                if (actionType === 'assign' && techId) updates.tech_id = techId;
                if (actionType === 'reopen') updates.isReopen = true;

                await fetchClient(`/admin/tickets/${ticketId}`, {
                    method: 'PATCH',
                    body: JSON.stringify(updates)
                });

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
        // COMMUNAL POOL: Tampilkan semua kategori, jangan batasi per departemen
        // if (deptId) {
        //     cats = cats.filter(cat => cat.dept_id === deptId);
        // }
        return cats;
    }, [mainCategories, deptId]);

    const processedTickets = useMemo(() => {
        let filtered = [...tickets];
        
        if (actionType === 'resolve' && techId) {
            filtered = filtered.filter(t => t.tech_id === techId);
        }

        // Filter tickets to only show those belonging to the technician's department (COMMUNAL POOL: DIMATIKAN)
        // if (deptId) {
        //     filtered = filtered.filter(t => {
        //         const cat = mainCategories.find(c => c.id === t.category_id);
        //         return cat ? Number(cat.dept_id) === Number(deptId) : false;
        //     });
        // }

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

    // Reset page to 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [processedTickets.length]);

    const totalItems = processedTickets.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const paginatedTickets = processedTickets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const getSortArrow = (key: string) => {
        const isActive = sortConfig?.key === key;
        const isAsc = isActive && sortConfig?.direction === 'asc';
        
        return (
          <svg className={`w-3 h-3 ml-1 transition-transform ${isActive ? 'text-[#1E3A8A]' : 'text-gray-400'} ${isAsc ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                {/* Kiri: Search & Bulk Actions */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                    {/* Search Bar */}
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search tickets..." 
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
                            className={`flex h-[38px] px-3.5 items-center gap-2 rounded border border-[#C3C6D1] bg-white cursor-pointer transition-colors ${showCategoryPopup || selectedCategory ? "bg-slate-50" : "hover:bg-slate-50"}`}
                        >
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 max-w-[120px] truncate">
                                {selectedCategory ? filteredCategories.find(c => String(c.id) === selectedCategory)?.name || 'Kategori' : 'Kategori'}
                            </span>
                        </button>
                        
                        {/* Category Popup */}
                        {showCategoryPopup && (
                            <div className="absolute left-0 top-[40px] z-50 flex flex-col p-2 bg-white border border-[#C3C6D1] rounded shadow-lg animate-in fade-in slide-in-from-top-2 w-max max-h-64 overflow-y-auto">
                                <div 
                                    className={`px-3 py-2 text-[13px] font-semibold rounded cursor-pointer transition-colors ${!selectedCategory ? 'bg-[#F4F7FF] text-[#1E3A8A]' : 'text-slate-700 hover:bg-slate-50'}`}
                                    onClick={() => { setSelectedCategory(''); setShowCategoryPopup(false); }}
                                >
                                    All Categories
                                </div>
                                {filteredCategories.map((cat) => (
                                    <div 
                                        key={cat.id} 
                                        className={`px-3 py-2 text-[13px] font-semibold rounded cursor-pointer transition-colors ${selectedCategory === String(cat.id) ? 'bg-[#F4F7FF] text-[#1E3A8A]' : 'text-slate-700 hover:bg-slate-50'}`}
                                        onClick={() => { setSelectedCategory(String(cat.id)); setShowCategoryPopup(false); }}
                                    >
                                        {cat.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {selectedTickets.length > 0 && actionType !== 'readonly' && (
                        <>
                            <div className="w-px h-6 bg-gray-300 mx-1 hidden md:block"></div>
                            <button 
                                onClick={handleBulkAction}
                                disabled={isProcessingBulk}
                                className={`h-[38px] px-3.5 border rounded text-[13px] font-semibold transition-colors disabled:opacity-50 ${
                                    actionType === 'reopen' 
                                        ? 'border-orange-600 text-orange-600 bg-orange-50 hover:bg-orange-100 hover:border-orange-700' 
                                        : 'border-[#1E3A8A] text-[#1E3A8A] bg-blue-50 hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A]'
                                }`}
                            >
                                {isProcessingBulk ? 'Memproses...' : `${actionType === 'assign' ? 'Ambil' : actionType === 'resolve' ? 'Selesaikan' : 'Reopen'} (${selectedTickets.length})`}
                            </button>
                        </>
                    )}
                </div>

                {/* Kanan: Advanced, Reset, Counter */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative">
                        <button 
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className={`flex h-[38px] px-3.5 items-center gap-2 rounded border border-[#C3C6D1] bg-white cursor-pointer transition-colors ${showAdvanced ? "bg-slate-50" : "hover:bg-slate-50"}`}
                        >
                            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.25 9V7.5H8.25V9H5.25ZM2.25 5.25V3.75H11.25V5.25H2.25ZM0 1.5V0H13.5V1.5H0Z" fill="#43474F" /></svg>
                            <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4">Advanced</span>
                        </button>
                        
                        {/* Advanced Filter Popup */}
                        {showAdvanced && (
                            <div className="absolute right-0 top-[40px] z-50 flex flex-col gap-3 p-4 bg-white border border-[#C3C6D1] rounded shadow-lg animate-in fade-in slide-in-from-top-2 w-64">
                                <div className="text-[13px] font-semibold text-slate-700">Filter by Date</div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] text-slate-500 uppercase font-bold">Start Date</label>
                                    <input 
                                        type="date" 
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="py-1.5 px-2 border border-[#C3C6D1] rounded text-[13px] outline-none focus:border-[#1E3A8A] w-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] text-slate-500 uppercase font-bold">End Date</label>
                                    <input 
                                        type="date" 
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="py-1.5 px-2 border border-[#C3C6D1] rounded text-[13px] outline-none focus:border-[#1E3A8A] w-full"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <button 
                        onClick={() => { setStartDate(''); setEndDate(''); setSelectedCategory(''); }}
                        className="h-[38px] px-4 bg-white text-slate-600 border border-[#C3C6D1] text-[13px] font-medium rounded hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                        Reset
                    </button>
                    <div className="ml-2 pl-2 border-l border-gray-300">
                        <span className="flex h-[34px] items-center px-2 text-xs font-bold text-[#1E3A8A] bg-slate-100 rounded">
                            {processedTickets.length} tickets
                        </span>
                    </div>
                </div>
            </div>

            {tabsNode && <div className="w-full">{tabsNode}</div>}

            {/* Table Container */}
            <div className="flex flex-col rounded-lg border border-slate-200 bg-white shadow-sm w-full overflow-hidden">
                <div className="w-full overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left table-auto">
                    <thead className="bg-[#F3F3F6] border-b border-[#C3C6D1]">
                        <tr>
                            {actionType !== 'readonly' && (
                                <th className="px-4 py-4 w-12 text-center">
                                    <input 
                                        type="checkbox" 
                                        className="rounded border-gray-300 w-4 h-4 text-[#1E3A8A] focus:ring-[#1E3A8A] cursor-pointer"
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
                            {actionType !== 'assign' && (
                                <th className="px-4 py-4 select-none w-48">
                                    <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">CATEGORY</span>
                                </th>
                            )}
                            <th className="px-4 py-4 select-none hover:bg-gray-200 transition-colors cursor-pointer w-32" onClick={() => requestSort('priority')}>
                                <div className="flex items-center group">
                                    <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">PRIORITY</span>
                                    {getSortArrow('priority')}
                                </div>
                            </th>
                            {actionType === 'assign' && (
                                <th className="px-4 py-4 select-none w-44">
                                    <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">ASSIGN TO</span>
                                </th>
                            )}
                            {actionType !== 'readonly' && (
                                <th className="px-4 py-4 select-none text-right w-40">
                                    <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">ACTION</span>
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#C3C6D1]">
                        {paginatedTickets.length === 0 ? (
                            <tr>
                                <td colSpan={actionType !== 'readonly' ? 8 : 7} className="text-center py-20 text-[#43474F] text-sm">
                                    Tidak ada tiket yang sesuai dengan filter.
                                </td>
                            </tr>
                        ) : (
                            paginatedTickets.map((ticket, index) => {
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
                                                className="rounded border-gray-300 w-4 h-4 text-[#1E3A8A] focus:ring-[#1E3A8A] cursor-pointer"
                                                checked={selectedTickets.includes(ticket.id)}
                                                onChange={() => handleSelect(ticket.id)}
                                            />
                                        </td>
                                    )}
                                    <td className="px-4 py-4 text-[#1E3A8A] font-liberationSerif text-sm font-semibold whitespace-nowrap">
                                        <Link href={`/dashboard/teknisi/tickets/${ticket.id}`} className="hover:underline">
                                            {tNum}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-4 text-[#43474F] font-iBMPlexSans text-sm whitespace-nowrap" suppressHydrationWarning>
                                        {formatTimeAgo(ticket.updated_at || ticket.created_at)}
                                    </td>
                                    <td className="px-4 py-4 max-w-xs">
                                        <Link href={`/dashboard/teknisi/tickets/${ticket.id}`} className="block">
                                            <p className="text-[#1A1C1E] font-iBMPlexSans text-sm font-medium truncate mb-0.5 hover:text-[#1E3A8A]">
                                                {(ticket.subject || ticket.category?.name || 'Tanpa Subjek').replace(/ > /g, ' / ').replace(/>/g, '/')}
                                            </p>
                                        </Link>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#1A1C1E] font-iBMPlexSans text-sm truncate max-w-[120px]">
                                                {ticket.reporter_name || '-'}
                                            </span>
                                        </div>
                                    </td>
                                    {actionType !== 'assign' && (
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className="text-[#43474F] font-iBMPlexSans text-[13px] font-medium truncate">{ticket.category?.name || '-'}</span>
                                        </td>
                                    )}
                                    <td className="px-4 py-4">
                                        {renderPriorityBadge(ticket.priority)}
                                    </td>
                                    {actionType === 'assign' && (
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className="text-[#43474F] font-iBMPlexSans text-[13px] font-medium truncate">{ticket.dept?.name || ticket.department?.name || '-'}</span>
                                        </td>
                                    )}
                                    {actionType !== 'readonly' && (
                                        <td className="px-4 py-4 text-right whitespace-nowrap">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => handleTicketAction(ticket.id, formattedTicketNum)}
                                                    className={`py-1.5 px-4 border rounded text-xs font-semibold transition-colors ${
                                                        actionType === 'reopen' ? 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100' : 'bg-white border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white'
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

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row py-4 px-6 justify-between items-center border-t border-t-[#C3C6D1] bg-[#FFF] w-full mt-auto gap-4">
                <div className="flex items-center gap-2">
                    <select 
                        value={itemsPerPage} 
                        onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                        className="text-[13px] border border-[#C3C6D1] rounded px-2 py-1 outline-none focus:border-[#1E3A8A] text-[#1A1C1E]"
                    >
                        <option value={8}>8 / page</option>
                        <option value={10}>10 / page</option>
                        <option value={15}>15 / page</option>
                        <option value={25}>25 / page</option>
                        <option value={50}>50 / page</option>
                    </select>
                    <p className="text-[#1A1C1E] font-iBMPlexSans text-[13px]">
                        Showing {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} tickets
                    </p>
                </div>
                <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className={`flex justify-center items-center rounded border border-[#C3C6D1] w-8 h-8 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}>
                    <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10L0 5L5 0L6.16667 1.16667L2.33333 5L6.16667 8.83333L5 10Z" fill="black" /></svg>
                </button>
                
                <button onClick={() => setCurrentPage(1)} className={`cursor-pointer rounded w-8 h-8 flex items-center justify-center font-semibold text-xs ${currentPage === 1 ? 'bg-[#1E3A8A] text-white' : 'hover:bg-gray-100 text-black'}`}>1</button>
                
                {totalPages > 1 && (
                    <button onClick={() => setCurrentPage(2)} className={`cursor-pointer rounded w-8 h-8 flex items-center justify-center font-semibold text-xs ${currentPage === 2 ? 'bg-[#1E3A8A] text-white' : 'hover:bg-gray-100 text-black'}`}>2</button>
                )}

                {totalPages > 2 && (
                    <button onClick={() => setCurrentPage(3)} className={`cursor-pointer rounded w-8 h-8 flex items-center justify-center font-semibold text-xs ${currentPage === 3 ? 'bg-[#1E3A8A] text-white' : 'hover:bg-gray-100 text-black'}`}>3</button>
                )}
                
                {totalPages > 4 && <span className="px-1 text-base">...</span>}
                
                {totalPages > 3 && (
                    <button onClick={() => setCurrentPage(totalPages)} className={`cursor-pointer rounded w-8 h-8 flex items-center justify-center font-semibold text-xs ${currentPage === totalPages ? 'bg-[#1E3A8A] text-white' : 'hover:bg-gray-100 text-black'}`}>{totalPages}</button>
                )}
                
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className={`flex justify-center items-center rounded border border-[#C3C6D1] w-8 h-8 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}>
                    <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.83333 5L0 1.16667L1.16667 0L6.16667 5L1.16667 10L0 8.83333L3.83333 5Z" fill="black" /></svg>
                </button>
                </div>
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
