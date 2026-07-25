'use client';

import React, { useState, useEffect } from 'react';

export type PriorityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type TicketStatus = 'NEW' | 'IN PROGRESS' | 'WAITING VERIFICATION' | 'RESOLVED' | 'CLOSED';

export interface User {
  name: string;
  initials?: string;
  initialsBg?: string;
  initialsText?: string;
  initialsWidth?: string;
  avatarUrl?: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  lastUpdate: string;
  subject: string;
  category: string;
  requester: User;
  priority: PriorityLevel;
  assignee: User | null;
  status: TicketStatus;
  isOverdue: boolean;
}

interface TicketTableSectionProps {
  activeTab?: string;
  newlyAddedTicket?: Ticket | null;
  selectedTickets?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
}

const DUMMY_TICKETS: Ticket[] = [
  {
    id: '1',
    ticketNumber: '#TIC- 2023- 8942',
    lastUpdate: '2 mins ago',
    subject: 'SIAKAD login failure - Database Timeout',
    category: 'Category: Applications / Academic',
    requester: { name: 'Andi Saputra', initials: 'AS', initialsBg: 'bg-[#D5E3FF]', initialsText: 'text-[#001B3C]', initialsWidth: 'w-[22px]' },
    priority: 'CRITICAL',
    assignee: null,
    status: 'NEW',
    isOverdue: true,
  },
  {
    id: '2',
    ticketNumber: '#TIC- 2023- 8935',
    lastUpdate: '15 mins ago',
    subject: 'WiFi access issue in Faculty of Law',
    category: 'Category: Infrastructure / Networking',
    requester: { name: 'Rina Maheswari', initials: 'RM', initialsBg: 'bg-[#D8E2FF]', initialsText: 'text-[#001A41]', initialsWidth: 'w-[19px]' },
    priority: 'HIGH',
    assignee: { name: 'Deni Pratama', avatarUrl: '/DeniPratama.png' },
    status: 'IN PROGRESS',
    isOverdue: false,
  },
  {
    id: '3',
    ticketNumber: '#TIC- 2023- 8921',
    lastUpdate: '1 hour ago',
    subject: 'Request for Adobe Creative Cloud License',
    category: 'Category: Software / License',
    requester: { name: 'Tio Pamungkas', initials: 'TP', initialsBg: 'bg-[#E2E2E5]', initialsText: 'text-[#43474F]', initialsWidth: 'w-[19px]' },
    priority: 'MEDIUM',
    assignee: { name: 'Siti Aminah', avatarUrl: '/SitiAminah.png' },
    status: 'WAITING VERIFICATION',
    isOverdue: false,
  },
  {
    id: '4',
    ticketNumber: '#TIC- 2023- 8899',
    lastUpdate: '3 hours ago',
    subject: 'Printer repair - Rectorate Building 2nd Floor',
    category: 'Category: Hardware / Peripherals',
    requester: { name: 'Laras Wati', initials: 'LW', initialsBg: 'bg-[#D5E3FF]', initialsText: 'text-[#001B3C]', initialsWidth: 'w-6' },
    priority: 'LOW',
    assignee: { name: 'Bambang Heru', avatarUrl: '/BambangHeru.png' },
    status: 'RESOLVED',
    isOverdue: false,
  },
];

export default function TicketTableSection({ activeTab = 'all', newlyAddedTicket, selectedTickets = [], onSelectionChange }: TicketTableSectionProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (newlyAddedTicket) {
      const isExist = DUMMY_TICKETS.some(t => t.id === newlyAddedTicket.id);
      if (!isExist) DUMMY_TICKETS.unshift(newlyAddedTicket);
    }
  }, [newlyAddedTicket]);

  const totalItems = 244 + DUMMY_TICKETS.length;
  const itemsPerPage = 4;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      setTimeout(() => {
        let filteredData = DUMMY_TICKETS;
        if (activeTab !== 'all') {
          const statusMap: Record<string, string> = {
            'new': 'NEW',
            'in_progress': 'IN PROGRESS',
            'waiting_verification': 'WAITING VERIFICATION',
            'resolved': 'RESOLVED',
            'closed': 'CLOSED'
          };
          filteredData = DUMMY_TICKETS.filter(t => t.status === statusMap[activeTab]);
        }
        setTickets(filteredData);
        setIsLoading(false);
      }, 500);
    };
    fetchTickets();
  }, [currentPage, activeTab, newlyAddedTicket]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSelectionChange) {
      if (e.target.checked) {
        onSelectionChange(tickets.map(t => t.id));
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

  const renderPriorityBadge = (priority: PriorityLevel) => {
    const styles = {
      CRITICAL: { bg: 'bg-[#FFDAD6]', text: 'text-[#93000A]' },
      HIGH: { bg: 'bg-[#FEF1D8]', text: 'text-[#7D5100]' },
      MEDIUM: { bg: 'bg-[#E2E2E5]', text: 'text-[#43474F]' },
      LOW: { bg: 'bg-[#E2E2E5]', text: 'text-[#43474F]' },
    }[priority];

    return (
      <div className={`flex py-0.5 px-2 items-center rounded-sm ${styles.bg} w-fit`}>
        <p className={`${styles.text} font-iBMPlexSans text-[11px] font-bold leading-5 w-fit tracking-[0.025em]`}>
          {priority}
        </p>
      </div>
    );
  };

  const SortIcon = () => (
    <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
  );

  return (
    <div className="flex flex-col rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-sm w-full overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead className="bg-[#F3F3F6] border-b border-[#C3C6D1]">
            <tr>
              <th className="px-4 py-4 w-12 text-center">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 w-4 h-4 text-[#0059BB] focus:ring-[#0059BB]"
                  checked={tickets.length > 0 && selectedTickets.length === tickets.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-4 py-4">
                <div className="flex items-center cursor-pointer group">
                  <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">NO. TIKET</span>
                  <SortIcon />
                </div>
              </th>
              <th className="px-4 py-4">
                <div className="flex items-center cursor-pointer group">
                  <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">LAST UPDATE</span>
                  <SortIcon />
                </div>
              </th>
              <th className="px-4 py-4">
                <div className="flex items-center cursor-pointer group">
                  <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">SUBJECT</span>
                  <SortIcon />
                </div>
              </th>
              <th className="px-4 py-4">
                <div className="flex items-center cursor-pointer group">
                  <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">FROM</span>
                  <SortIcon />
                </div>
              </th>
              <th className="px-4 py-4">
                <div className="flex items-center cursor-pointer group">
                  <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">PRIORITY</span>
                  <SortIcon />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C3C6D1]">
            {isLoading ? (
              <tr><td colSpan={6} className="py-10 text-center text-sm text-[#43474F]">Loading tickets...</td></tr>
            ) : tickets.length === 0 ? (
              <tr><td colSpan={6} className="py-10 text-center text-sm text-[#43474F]">Tidak ada tiket pada filter ini.</td></tr>
            ) : (
              tickets.map((ticket, index) => (
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
                    {ticket.ticketNumber}
                  </td>
                  <td className="px-4 py-4 text-[#43474F] font-iBMPlexSans text-sm whitespace-nowrap">
                    {ticket.lastUpdate}
                  </td>
                  <td className="px-4 py-4 max-w-xs">
                    <p className="text-[#1A1C1E] font-iBMPlexSans text-sm font-medium truncate mb-0.5">
                      {ticket.subject}
                    </p>
                    <p className="text-[#43474F] font-iBMPlexSans text-[11px] truncate">
                      {ticket.category}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center justify-center shrink-0 rounded-full ${ticket.requester.initialsBg} w-6 h-6`}>
                        <span className={`${ticket.requester.initialsText} font-bold text-[10px]`}>
                          {ticket.requester.initials}
                        </span>
                      </div>
                      <span className="text-[#1A1C1E] font-iBMPlexSans text-sm truncate max-w-[120px]">
                        {ticket.requester.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {renderPriorityBadge(ticket.priority)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex py-4 px-6 justify-between items-center border-t border-t-[#C3C6D1] bg-[#FFF] w-full">
        <p className="text-[#1A1C1E] font-iBMPlexSans text-[13px]">
          Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} tickets
        </p>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className={`flex justify-center items-center rounded border border-[#C3C6D1] w-8 h-8 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}>
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10L0 5L5 0L6.16667 1.16667L2.33333 5L6.16667 8.83333L5 10Z" fill="black" /></svg>
          </button>
          
          <button onClick={() => setCurrentPage(1)} className={`cursor-pointer rounded w-8 h-8 flex items-center justify-center font-semibold text-xs ${currentPage === 1 ? 'bg-[#0070EA] text-white' : 'hover:bg-gray-100 text-black'}`}>1</button>
          <button onClick={() => setCurrentPage(2)} className={`cursor-pointer rounded w-8 h-8 flex items-center justify-center font-semibold text-xs ${currentPage === 2 ? 'bg-[#0070EA] text-white' : 'hover:bg-gray-100 text-black'}`}>2</button>
          <button onClick={() => setCurrentPage(3)} className={`cursor-pointer rounded w-8 h-8 flex items-center justify-center font-semibold text-xs ${currentPage === 3 ? 'bg-[#0070EA] text-white' : 'hover:bg-gray-100 text-black'}`}>3</button>
          
          <span className="px-1 text-base">...</span>
          
          <button onClick={() => setCurrentPage(totalPages)} className={`cursor-pointer rounded w-8 h-8 flex items-center justify-center font-semibold text-xs ${currentPage === totalPages ? 'bg-[#0070EA] text-white' : 'hover:bg-gray-100 text-black'}`}>{totalPages}</button>
          
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className={`flex justify-center items-center rounded border border-[#C3C6D1] w-8 h-8 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}>
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.83333 5L0 1.16667L1.16667 0L6.16667 5L1.16667 10L0 8.83333L3.83333 5Z" fill="black" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}