'use client';

import React, { useState, useEffect } from 'react';

// --- Types ---
type PriorityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
type TicketStatus = 'NEW' | 'IN PROGRESS' | 'WAITING VERIFICATION' | 'RESOLVED';

interface User {
  name: string;
  initials?: string;
  initialsBg?: string;
  initialsText?: string;
  initialsWidth?: string;
  avatarUrl?: string;
}

interface Ticket {
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

// --- Dummy Data ---
const DUMMY_TICKETS: Ticket[] = [
  {
    id: '1',
    ticketNumber: '#TIC- 2023- 8942',
    lastUpdate: '2 mins ago',
    subject: 'SIAKAD login failure - Database Timeout',
    category: 'Category: Applications / Academic',
    requester: {
      name: 'Andi Saputra',
      initials: 'AS',
      initialsBg: 'bg-[#D5E3FF]',
      initialsText: 'text-[#001B3C]',
      initialsWidth: 'w-[22px]',
    },
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
    requester: {
      name: 'Rina Maheswari',
      initials: 'RM',
      initialsBg: 'bg-[#D8E2FF]',
      initialsText: 'text-[#001A41]',
      initialsWidth: 'w-[19px]',
    },
    priority: 'HIGH',
    assignee: {
      name: 'Deni Pratama',
      avatarUrl: '/DeniPratama.png',
    },
    status: 'IN PROGRESS',
    isOverdue: false,
  },
  {
    id: '3',
    ticketNumber: '#TIC- 2023- 8921',
    lastUpdate: '1 hour ago',
    subject: 'Request for Adobe Creative Cloud License',
    category: 'Category: Software / License',
    requester: {
      name: 'Tio Pamungkas',
      initials: 'TP',
      initialsBg: 'bg-[#E2E2E5]',
      initialsText: 'text-[#43474F]',
      initialsWidth: 'w-[19px]',
    },
    priority: 'MEDIUM',
    assignee: {
      name: 'Siti Aminah',
      avatarUrl: '/SitiAminah.png',
    },
    status: 'WAITING VERIFICATION',
    isOverdue: false,
  },
  {
    id: '4',
    ticketNumber: '#TIC- 2023- 8899',
    lastUpdate: '3 hours ago',
    subject: 'Printer repair - Rectorate Building 2nd Floor',
    category: 'Category: Hardware / Peripherals',
    requester: {
      name: 'Laras Wati',
      initials: 'LW',
      initialsBg: 'bg-[#D5E3FF]',
      initialsText: 'text-[#001B3C]',
      initialsWidth: 'w-6',
    },
    priority: 'LOW',
    assignee: {
      name: 'Bambang Heru',
      avatarUrl: '/BambangHeru.png',
    },
    status: 'RESOLVED',
    isOverdue: false,
  },
];

export default function TicketTableSection() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination config
  const totalItems = 248;
  const itemsPerPage = 4;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    // Simulate API Fetch
    const fetchTickets = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with real API call
        // const response = await fetch(`/api/tickets?page=${currentPage}`);
        // const data = await response.json();
        
        // Simulating network delay
        setTimeout(() => {
          setTickets(DUMMY_TICKETS);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [currentPage]);

  // --- Helper Renderers ---
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

  const renderStatusBadge = (status: TicketStatus, isOverdue: boolean) => {
    const styles = {
      'NEW': { bg: 'bg-[#D5E3FF]', text: 'text-[#001B3C]' },
      'IN PROGRESS': { bg: 'bg-[#D8E2FF]', text: 'text-[#001A41]' },
      'WAITING VERIFICATION': { bg: 'bg-[#E0E3E6]', text: 'text-[#43474A]' },
      'RESOLVED': { bg: 'bg-[#DCFCE7]', text: 'text-[#166534]' },
    }[status];

    if (isOverdue) {
      return (
        <div className="flex pl-6 flex-col items-start gap-1 w-[118px]">
          <div className={`flex py-0.5 px-2 items-center rounded-sm ${styles.bg} w-full`}>
            <p className={`${styles.text} font-iBMPlexSans text-[11px] font-bold leading-5 w-fit`}>
              {status}
            </p>
          </div>
          <div className="flex items-center gap-1 w-full">
            <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-col items-start w-fit">
              <path d="M0 9.5L5.5 0L11 9.5H0ZM1.725 8.5H9.275L5.5 2L1.725 8.5ZM5.5 8C5.64167 8 5.76042 7.95208 5.85625 7.85625C5.95208 7.76042 6 7.64167 6 7.5C6 7.35833 5.95208 7.23958 5.85625 7.14375C5.76042 7.04792 5.64167 7 5.5 7C5.35833 7 5.23958 7.04792 5.14375 7.14375C5.04792 7.23958 5 7.35833 5 7.5C5 7.64167 5.04792 7.76042 5.14375 7.85625C5.23958 7.95208 5.35833 8 5.5 8ZM5 6.5H6V4H5V6.5Z" fill="#BA1A1A" />
            </svg>
            <p className="text-[#BA1A1A] font-iBMPlexSans text-[10px] font-bold leading-5 w-fit">
              OVERDUE
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex pt-[35px] pr-6 pb-[35px] pl-12 flex-col items-start w-[166px]">
        <div className={`flex py-0.5 px-2 items-center rounded-sm ${styles.bg} w-fit`}>
          <p className={`${styles.text} font-iBMPlexSans text-[11px] font-bold leading-5 w-fit`}>
            {status}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-start rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[01px2px0rgba(0,0,0,0.05)] w-full overflow-hidden">
      
      {/* PERUBAHAN UTAMA: overflow-hidden diubah menjadi overflow-x-auto */}
      <div className="flex flex-col items-start -space-y-px w-full overflow-x-auto">
        
        {/* Table Header: penambahan min-w-max agar konten memaksa melebar memunculkan scroll */}
        <div className="flex justify-center items-start border-b border-b-[#C3C6D1] bg-[#F3F3F6] w-full min-w-max">
          <div className="flex py-4 px-6 flex-col items-start w-[85px]">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">NO. TIKET</p>
          </div>
          <div className="flex py-4 px-6 flex-col items-start w-[97px]">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">LAST UPDATE</p>
          </div>
          <div className="flex pt-6 pr-6 pb-[25px] pl-6 flex-col items-start w-80">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">SUBJECT</p>
          </div>
          <div className="flex pt-6 pr-6 pb-[25px] pl-6 flex-col items-start w-[153px]">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">FROM</p>
          </div>
          <div className="flex pt-6 pr-6 pb-[25px] pl-6 flex-col items-start w-[117px]">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">PRIORITY</p>
          </div>
          <div className="flex pt-6 pr-6 pb-[25px] pl-6 flex-col items-start w-[121px]">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">ASSIGN TO</p>
          </div>
          <div className="flex pt-6 pr-6 pb-[25px] pl-6 flex-col items-start w-[142px]">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">STATUS</p>
          </div>
        </div>

        {/* Table Body: penambahan min-w-max agar konten tabel selaras dengan Header */}
        <div className="flex flex-col items-start -space-y-px w-full min-w-max">
          {isLoading ? (
            <div className="flex py-10 w-full justify-center">
              <p className="text-[#43474F] font-iBMPlexSans text-sm">Loading tickets...</p>
            </div>
          ) : (
            tickets.map((ticket, index) => (
              <div 
                key={ticket.id} 
                className={`flex justify-center items-center border-b border-b-[#C3C6D1] w-full ${index % 2 === 1 ? 'bg-[#F9F9FC]' : ''} ${index === 0 ? 'pr-6' : ''}`}
              >
                {/* No. Tiket */}
                <div className="flex pt-4 pr-6 pb-[17px] pl-6 flex-col items-start w-[85px]">
                  <p className="text-[#0059BB] font-liberationSerif text-sm font-semibold leading-5 w-fit">
                    {ticket.ticketNumber}
                  </p>
                </div>

                {/* Last Update */}
                <div className="flex py-[27px] px-6 flex-col items-start w-[97px]">
                  <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                    {ticket.lastUpdate}
                  </p>
                </div>

                {/* Subject */}
                <div className="flex max-w-[320px] py-[26px] px-6 flex-col items-start gap-0.5 w-80">
                  <div className="flex flex-col items-start w-full overflow-hidden">
                    <p className="text-[#1A1C1E] font-iBMPlexSans text-sm font-medium leading-5 w-full">
                      {ticket.subject}
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#43474F] font-iBMPlexSans text-[11px] leading-5 w-full">
                      {ticket.category}
                    </p>
                  </div>
                </div>

                {/* From */}
                <div className="flex pl-6 items-center gap-2 w-[129px]">
                  <button className={`cursor-pointer text-nowrap flex pt-0.5 pr-0 pb-[3px] pl-0 justify-center items-center shrink-0 rounded-xl ${ticket.requester.initialsBg} ${ticket.requester.initialsWidth || 'w-6'} h-6`}>
                    <p className={`${ticket.requester.initialsText} font-iBMPlexSans text-[10px] font-bold leading-5 w-fit`}>
                      {ticket.requester.initials}
                    </p>
                  </button>
                  <div className="flex pr-[5px] flex-col items-start w-fit">
                    <p className="text-[#1A1C1E] font-iBMPlexSans text-sm leading-5 w-fit">
                      {ticket.requester.name}
                    </p>
                  </div>
                </div>

                {/* Priority */}
                <div className="flex pt-[35px] pr-6 pb-[35px] pl-12 flex-col items-start w-[141px]">
                  {renderPriorityBadge(ticket.priority)}
                </div>

                {/* Assign To */}
                {ticket.assignee ? (
                  <div className="flex pl-6 justify-end items-center gap-2 w-[97px] h-10">
                    <img 
                      src={ticket.assignee.avatarUrl} 
                      className="rounded-xl border border-[#C3C6D1] w-6 h-6 overflow-hidden max-w-none" 
                      alt={ticket.assignee.name} 
                    />
                    <div className="flex flex-col items-start w-fit">
                      <p className="text-[#1A1C1E] font-iBMPlexSans text-sm leading-5 w-fit">
                        {ticket.assignee.name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex py-[37px] px-6 flex-col items-start w-[121px]">
                    <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                      Unassigned
                    </p>
                  </div>
                )}

                {/* Status */}
                {renderStatusBadge(ticket.status, ticket.isOverdue)}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex py-4 px-6 justify-between items-center border-t border-t-[#C3C6D1] bg-[#FFF] w-full">
        <div className="flex flex-col items-start w-fit">
          <p className="text-[#1A1C1E] font-iBMPlexSans text-[13px] leading-[18px] w-fit">
            Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} tickets
          </p>
        </div>
        <div className="flex items-center gap-2 w-fit">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`flex justify-center items-center rounded border border-[#C3C6D1] w-8 h-8 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}
          >
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-col items-center w-fit ">
              <path d="M5 10L0 5L5 0L6.16667 1.16667L2.33333 5L6.16667 8.83333L5 10Z" fill="black" />
            </svg>
          </button>
          
          <button 
            onClick={() => setCurrentPage(1)}
            className={`cursor-pointer text-nowrap flex pt-2 pr-0 pb-[9px] pl-0 justify-center items-center rounded w-8 h-8 ${currentPage === 1 ? 'bg-[#0070EA]' : 'hover:bg-gray-100'}`}
          >
            <p className={`${currentPage === 1 ? 'text-[#FEFCFF]' : 'text-[#000]'} font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]`}>
              1
            </p>
          </button>
          <button 
            onClick={() => setCurrentPage(2)}
            className={`cursor-pointer text-nowrap flex pt-2 pr-0 pb-[9px] pl-0 justify-center items-center rounded w-8 h-8 ${currentPage === 2 ? 'bg-[#0070EA]' : 'hover:bg-gray-100'}`}
          >
            <p className={`${currentPage === 2 ? 'text-[#FEFCFF]' : 'text-[#000]'} font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]`}>
              2
            </p>
          </button>
          <button 
            onClick={() => setCurrentPage(3)}
            className={`cursor-pointer text-nowrap flex pt-2 pr-0 pb-[9px] pl-0 justify-center items-center rounded w-8 h-8 ${currentPage === 3 ? 'bg-[#0070EA]' : 'hover:bg-gray-100'}`}
          >
            <p className={`${currentPage === 3 ? 'text-[#FEFCFF]' : 'text-[#000]'} font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]`}>
              3
            </p>
          </button>
          <div className="flex py-0 px-1 flex-col items-start w-fit">
            <p className="text-[#000] font-iBMPlexSans text-base leading-6 w-fit">...</p>
          </div>
          <button 
            onClick={() => setCurrentPage(totalPages)}
            className={`cursor-pointer text-nowrap flex pt-2 pr-0 pb-[9px] pl-0 justify-center items-center rounded w-8 h-8 ${currentPage === totalPages ? 'bg-[#0070EA]' : 'hover:bg-gray-100'}`}
          >
            <p className={`${currentPage === totalPages ? 'text-[#FEFCFF]' : 'text-[#000]'} font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]`}>
              {totalPages}
            </p>
          </button>

          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`flex justify-center items-center rounded border border-[#C3C6D1] w-8 h-8 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}
          >
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-col items-center w-fit ">
              <path d="M3.83333 5L0 1.16667L1.16667 0L6.16667 5L1.16667 10L0 8.83333L3.83333 5Z" fill="black" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}