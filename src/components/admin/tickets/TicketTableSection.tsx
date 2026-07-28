'use client';

import React, { useState, useEffect } from 'react';

export type PriorityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type TicketStatus = 'NEW' | 'IN PROGRESS' | 'WAITING VERIFICATION' | 'RESOLVED' | 'CLOSED';

interface TicketTableSectionProps {
  activeTab?: string;
  tickets?: any[];
  newlyAddedTicket?: any | null;
  selectedTickets?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  filters?: {
    category: string;
    startDate: string;
    endDate: string;
    priority: string;
  };
  onEditTicket?: (ticketId: string) => void;
}

export default function TicketTableSection({ activeTab = 'all', tickets = [], newlyAddedTicket, selectedTickets = [], onSelectionChange, filters, onEditTicket }: TicketTableSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayTickets, setDisplayTickets] = useState<any[]>([]);
  
  // Sorting state
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  
  const itemsPerPage = 8; // Menampilkan 8 baris per halaman supaya pas

  useEffect(() => {
    let filteredData = [...tickets];
    
    // 1. Filter by Status
    if (activeTab !== 'all') {
      const statusMap: Record<string, string> = {
        'open': 'NEW',
        'in_progress': 'IN PROGRESS',
        'waiting_verification': 'WAITING VERIFICATION',
        'resolved': 'RESOLVED',
        'closed': 'CLOSED',
        'rejected': 'DITOLAK',
        'deleted': 'DELETED'
      };
      filteredData = filteredData.filter(t => (t.status || '').toUpperCase() === statusMap[activeTab]);
    }

    // 1.5 Filter by Advanced Filters
    if (filters) {
      if (filters.category) {
        filteredData = filteredData.filter(t => 
          String(t.category_id) === filters.category || 
          String(t.subcategory_id) === filters.category ||
          String(t.dept_id) === filters.category
        );
      }
      if (filters.priority) {
        filteredData = filteredData.filter(t => (t.priority || '').toUpperCase() === filters.priority.toUpperCase());
      }
      if (filters.startDate) {
        filteredData = filteredData.filter(t => new Date(t.created_at) >= new Date(filters.startDate));
      }
      if (filters.endDate) {
        const end = new Date(filters.endDate);
        end.setHours(23, 59, 59, 999);
        filteredData = filteredData.filter(t => new Date(t.created_at) <= end);
      }
    }
    
    // 2. Terapkan data baru jika ada di sesi lokal (opsional untuk efek instan)
    if (newlyAddedTicket) {
      if (!filteredData.some(t => t.id === newlyAddedTicket.id)) {
          filteredData.unshift(newlyAddedTicket);
      }
    }

    // 3. Sorting
    if (sortConfig) {
      filteredData.sort((a, b) => {
        let valA, valB;
        
        switch (sortConfig.key) {
          case 'ticket_num':
            valA = a.ticket_num || a.ticketNumber || '';
            valB = b.ticket_num || b.ticketNumber || '';
            break;
          case 'updated_at':
            valA = new Date(a.updated_at || a.created_at).getTime();
            valB = new Date(b.updated_at || b.created_at).getTime();
            break;
          case 'subject':
            valA = (a.subject || '').toLowerCase();
            valB = (b.subject || '').toLowerCase();
            break;
          case 'reporter_name':
            valA = (a.reporter_name || '').toLowerCase();
            valB = (b.reporter_name || '').toLowerCase();
            break;
          case 'priority':
            const prioRank: Record<string, number> = { 'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
            valA = prioRank[(a.priority || 'MEDIUM').toUpperCase()] || 0;
            valB = prioRank[(b.priority || 'MEDIUM').toUpperCase()] || 0;
            break;
          default:
            return 0;
        }

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setDisplayTickets(filteredData);
    setCurrentPage(1); // Reset ke halaman 1 tiap kali data/sort/tab berubah
  }, [activeTab, tickets, newlyAddedTicket, sortConfig]);

  const totalItems = displayTickets.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  
  // Data untuk halaman saat ini
  const paginatedTickets = displayTickets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSelectionChange) {
      if (e.target.checked) {
        onSelectionChange(paginatedTickets.map(t => t.id));
      } else {
        onSelectionChange([]);
      }
    }
  };

  const handleSelectRow = (ticketId: string, checked: boolean) => {
    if (onSelectionChange) {
      if (checked) {
        onSelectionChange([...selectedTickets, ticketId]);
      } else {
        onSelectionChange(selectedTickets.filter(id => id !== ticketId));
      }
    }
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
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

  // Helper mendapatkan inisial dari nama
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

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    const isActive = sortConfig?.key === columnKey;
    const isAsc = isActive && sortConfig?.direction === 'asc';
    
    return (
      <svg className={`w-3 h-3 ml-1 transition-transform ${isActive ? 'text-[#0059BB]' : 'text-gray-400'} ${isAsc ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
      </svg>
    );
  };

  return (
    <div className="flex flex-col rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-sm w-full overflow-hidden">
      <div className="w-full overflow-x-auto min-h-[400px]">
        <table className="w-full text-left table-auto">
          <thead className="bg-[#F3F3F6] border-b border-[#C3C6D1]">
            <tr>
              <th className="px-4 py-4 w-12 text-center">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 w-4 h-4 text-[#0059BB] focus:ring-[#0059BB]"
                  checked={paginatedTickets.length > 0 && selectedTickets.length === paginatedTickets.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-4 py-4 select-none hover:bg-gray-200 transition-colors cursor-pointer" onClick={() => handleSort('ticket_num')}>
                <div className="flex items-center group">
                  <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">NO. TIKET</span>
                  <SortIcon columnKey="ticket_num" />
                </div>
              </th>
              <th className="px-4 py-4 select-none hover:bg-gray-200 transition-colors cursor-pointer" onClick={() => handleSort('updated_at')}>
                <div className="flex items-center group">
                  <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">LAST UPDATE</span>
                  <SortIcon columnKey="updated_at" />
                </div>
              </th>
              <th className="px-4 py-4 select-none hover:bg-gray-200 transition-colors cursor-pointer" onClick={() => handleSort('subject')}>
                <div className="flex items-center group">
                  <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">SUBJECT</span>
                  <SortIcon columnKey="subject" />
                </div>
              </th>
              <th className="px-4 py-4 select-none hover:bg-gray-200 transition-colors cursor-pointer" onClick={() => handleSort('reporter_name')}>
                <div className="flex items-center group">
                  <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">FROM</span>
                  <SortIcon columnKey="reporter_name" />
                </div>
              </th>
              <th className="px-4 py-4 select-none hover:bg-gray-200 transition-colors cursor-pointer" onClick={() => handleSort('priority')}>
                <div className="flex items-center group">
                  <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">PRIORITY</span>
                  <SortIcon columnKey="priority" />
                </div>
              </th>
              <th className="px-4 py-4 select-none w-20 text-center">
                <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">ACTION</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C3C6D1]">
            {paginatedTickets.length === 0 ? (
              <tr><td colSpan={6} className="py-10 text-center text-sm text-[#43474F]">Tidak ada tiket pada filter ini.</td></tr>
            ) : (
              paginatedTickets.map((ticket, index) => (
                <tr key={ticket.id} className={`hover:bg-slate-50 transition-colors ${index % 2 === 1 ? 'bg-[#F9F9FC]' : ''}`}>
                  <td className="px-4 py-4 text-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 w-4 h-4 text-[#0059BB] focus:ring-[#0059BB]"
                      checked={selectedTickets.includes(ticket.id)}
                      onChange={(e) => handleSelectRow(ticket.id, e.target.checked)}
                    />
                  </td>
                  <td className="px-4 py-4 text-[#0059BB] font-liberationSerif text-sm font-semibold whitespace-nowrap">
                    {ticket.ticket_num || ticket.ticketNumber}
                  </td>
                  <td className="px-4 py-4 text-[#43474F] font-iBMPlexSans text-sm whitespace-nowrap">
                    {formatTimeAgo(ticket.updated_at || ticket.created_at)}
                  </td>
                  <td className="px-4 py-4 max-w-xs">
                    <p className="text-[#1A1C1E] font-iBMPlexSans text-sm font-medium truncate mb-0.5">
                      {ticket.subject}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[#1A1C1E] font-iBMPlexSans text-sm truncate max-w-[120px]">
                        {ticket.reporter_name || 'Unknown User'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {renderPriorityBadge(ticket.priority)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button 
                      onClick={() => onEditTicket && onEditTicket(ticket.id)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition-colors inline-flex" 
                      title="Edit Ticket"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex py-4 px-6 justify-between items-center border-t border-t-[#C3C6D1] bg-[#FFF] w-full mt-auto">
        <p className="text-[#1A1C1E] font-iBMPlexSans text-[13px]">
          Showing {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} tickets
        </p>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className={`flex justify-center items-center rounded border border-[#C3C6D1] w-8 h-8 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}>
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10L0 5L5 0L6.16667 1.16667L2.33333 5L6.16667 8.83333L5 10Z" fill="black" /></svg>
          </button>
          
          <button onClick={() => setCurrentPage(1)} className={`cursor-pointer rounded w-8 h-8 flex items-center justify-center font-semibold text-xs ${currentPage === 1 ? 'bg-[#0070EA] text-white' : 'hover:bg-gray-100 text-black'}`}>1</button>
          
          {totalPages > 1 && (
              <button onClick={() => setCurrentPage(2)} className={`cursor-pointer rounded w-8 h-8 flex items-center justify-center font-semibold text-xs ${currentPage === 2 ? 'bg-[#0070EA] text-white' : 'hover:bg-gray-100 text-black'}`}>2</button>
          )}

          {totalPages > 2 && (
              <button onClick={() => setCurrentPage(3)} className={`cursor-pointer rounded w-8 h-8 flex items-center justify-center font-semibold text-xs ${currentPage === 3 ? 'bg-[#0070EA] text-white' : 'hover:bg-gray-100 text-black'}`}>3</button>
          )}
          
          {totalPages > 4 && <span className="px-1 text-base">...</span>}
          
          {totalPages > 3 && (
            <button onClick={() => setCurrentPage(totalPages)} className={`cursor-pointer rounded w-8 h-8 flex items-center justify-center font-semibold text-xs ${currentPage === totalPages ? 'bg-[#0070EA] text-white' : 'hover:bg-gray-100 text-black'}`}>{totalPages}</button>
          )}
          
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className={`flex justify-center items-center rounded border border-[#C3C6D1] w-8 h-8 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}>
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.83333 5L0 1.16667L1.16667 0L6.16667 5L1.16667 10L0 8.83333L3.83333 5Z" fill="black" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}