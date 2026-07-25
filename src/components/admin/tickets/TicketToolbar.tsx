'use client';

import React from 'react';

export type TabFilter = 'all' | 'new' | 'in_progress' | 'waiting_verification' | 'resolved' | 'closed';

interface TicketCounts {
  all: number;
  new: number;
  inProgress: number;
  waitingVerification: number;
  resolved: number;
  closed: number;
}

interface TicketToolbarProps {
  activeTab?: TabFilter;
  onTabChange?: (tab: TabFilter) => void;
  counts?: TicketCounts;
  onExportCsv?: () => void;
  onOpenFilters?: () => void;
  onNewTicket?: () => void;
}

const DEFAULT_COUNTS: TicketCounts = {
  all: 248,
  new: 12,
  inProgress: 45,
  waitingVerification: 8,
  resolved: 156,
  closed: 27,
};

export default function TicketToolbar({
  activeTab = 'all',
  onTabChange,
  counts = DEFAULT_COUNTS,
  onExportCsv,
  onOpenFilters,
  onNewTicket,
}: TicketToolbarProps) {

  const handleTabClick = (tab: TabFilter) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const handleExport = () => onExportCsv ? onExportCsv() : console.log('Action: Export CSV');
  const handleFilter = () => onOpenFilters ? onOpenFilters() : console.log('Action: Open Filters');
  const handleNewTicket = () => onNewTicket ? onNewTicket() : alert('Action: Open New Ticket Modal');

  const getBtnClass = (tab: TabFilter) => 
    `cursor-pointer text-nowrap flex pt-0 pr-1 pb-3 pl-1 flex-col justify-center items-center border-b-2 w-fit transition-colors ${
      activeTab === tab ? 'border-b-[#0059BB]' : 'border-b-transparent hover:border-b-gray-300'
    }`;
    
  const getTextClass = (tab: TabFilter) => 
    `font-iBMPlexSans text-sm leading-5 w-fit transition-colors ${
      activeTab === tab ? 'text-[#0059BB] font-semibold' : 'text-[#43474F]'
    }`;

  return (
    <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-b-[#C3C6D1] w-full overflow-x-auto">
      {/* Kiri: Filter Tabs */}
      <div className="flex items-start gap-6">
        <button onClick={() => handleTabClick('all')} className={getBtnClass('all')}>
          <p className={getTextClass('all')}>All Tickets ({counts.all})</p>
        </button>
        <button onClick={() => handleTabClick('new')} className={getBtnClass('new')}>
          <p className={getTextClass('new')}>New ({counts.new})</p>
        </button>
        <button onClick={() => handleTabClick('in_progress')} className={getBtnClass('in_progress')}>
          <p className={getTextClass('in_progress')}>In Progress ({counts.inProgress})</p>
        </button>
        <button onClick={() => handleTabClick('waiting_verification')} className={getBtnClass('waiting_verification')}>
          <p className={getTextClass('waiting_verification')}>Waiting Verification ({counts.waitingVerification})</p>
        </button>
        <button onClick={() => handleTabClick('resolved')} className={getBtnClass('resolved')}>
          <p className={getTextClass('resolved')}>Resolved ({counts.resolved})</p>
        </button>
        <button onClick={() => handleTabClick('closed')} className={getBtnClass('closed')}>
          <p className={getTextClass('closed')}>Closed ({counts.closed})</p>
        </button>
      </div>

      {/* Kanan: Tombol Aksi */}
      <div className="flex items-center gap-2 w-fit pb-2">
        {/* Posisi ditukar: Filters terlebih dahulu */}
        <div 
          onClick={handleFilter}
          className="flex py-2 px-4 items-center gap-2 rounded border border-[#C3C6D1] bg-[#FFF] w-fit cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-col items-center w-fit ">
            <path d="M5.25 9V7.5H8.25V9H5.25ZM2.25 5.25V3.75H11.25V5.25H2.25ZM0 1.5V0H13.5V1.5H0Z" fill="#43474F" />
          </svg>
          <div className="flex flex-col items-center w-fit">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              Filters
            </p>
          </div>
        </div>
        
        {/* Export CSV */}
        <div 
          onClick={handleExport}
          className="flex py-2 px-4 items-center gap-2 rounded border border-[#C3C6D1] bg-[#FFF] w-fit cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-col items-center w-fit ">
            <path d="M6 9L2.25 5.25L3.3 4.1625L5.25 6.1125V0H6.75V6.1125L8.7 4.1625L9.75 5.25L6 9ZM1.5 12C1.0875 12 0.734375 11.8531 0.440625 11.5594C0.146875 11.2656 0 10.9125 0 10.5V8.25H1.5V10.5H10.5V8.25H12V10.5C12 10.9125 11.8531 11.2656 11.5594 11.5594C11.2656 11.8531 10.9125 12 10.5 12H1.5Z" fill="#43474F" />
          </svg>
          <div className="flex flex-col items-center w-fit">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              Export CSV
            </p>
          </div>
        </div>
        
        <div 
          onClick={handleNewTicket}
          className="flex py-[9px] px-4 items-center gap-2 rounded bg-[#0059BB] shadow-[01px2px0rgba(0,0,0,0.05)] w-fit cursor-pointer hover:bg-blue-800 transition-colors"
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-col items-center w-fit ">
            <path d="M4.5 6H0V4.5H4.5V0H6V4.5H10.5V6H6V10.5H4.5V6Z" fill="white" />
          </svg>
          <div className="flex flex-col items-center w-fit">
            <p className="text-[#FFF] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              New Ticket
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}