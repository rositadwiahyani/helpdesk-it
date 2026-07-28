'use client';

import React from 'react';

export type TabFilter = 'all' | 'waiting_verification' | 'open' | 'in_progress' | 'resolved' | 'closed' | 'rejected' | 'deleted';

interface TicketCounts {
  all: number;
  open: number;
  inProgress: number;
  waitingVerification: number;
  resolved: number;
  closed: number;
  rejected: number;
  deleted: number;
}

interface TicketToolbarProps {
  activeTab?: TabFilter;
  onTabChange?: (tab: TabFilter) => void;
  counts?: TicketCounts;
  onExportCsv?: () => void;
  onOpenFilters?: () => void;
  onNewTicket?: () => void;
  selectedCount?: number;
}

const DEFAULT_COUNTS: TicketCounts = {
  all: 248,
  waitingVerification: 8,
  open: 12,
  inProgress: 45,
  resolved: 156,
  closed: 27,
  rejected: 5,
  deleted: 0,
};

export default function TicketToolbar({
  activeTab = 'all',
  onTabChange,
  counts = DEFAULT_COUNTS,
  onExportCsv,
  onOpenFilters,
  onNewTicket,
  selectedCount = 0,
  onBulkAction,
}: TicketToolbarProps & { onBulkAction?: (action: string) => void }) {

  const handleTabClick = (tab: TabFilter) => {
    if (onTabChange) onTabChange(tab);
  };

  const handleBulkAction = (action: string) => {
    if (selectedCount === 0) {
      alert("Belum ada tiket yang dipilih!");
      return;
    }
    if (onBulkAction) {
      onBulkAction(action);
    }
  };

  const getBtnClass = (tab: TabFilter) => 
    `cursor-pointer text-nowrap flex pt-0 pr-1 pb-3 pl-1 flex-col justify-center items-center border-b-2 w-fit transition-colors ${
      activeTab === tab ? 'border-b-[#0059BB]' : 'border-b-transparent hover:border-b-gray-300'
    }`;
    
  const getTextClass = (tab: TabFilter) => 
    `font-iBMPlexSans text-sm leading-5 w-fit transition-colors ${
      activeTab === tab ? 'text-[#0059BB] font-semibold' : 'text-[#43474F]'
    }`;

  return (
    <div className="flex flex-col gap-4 w-full">
      
      {/* Top Row: Search, Bulk Actions, Filters, Export, New */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
        {/* Kiri: Search & Bulk Actions */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search tickets..." 
              className="pl-9 pr-4 py-2 text-sm border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] w-full md:w-64"
            />
            <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Bulk Actions */}
          <div className="flex gap-1">
            <button onClick={() => handleBulkAction('Change Status')} className="p-2 border border-[#C3C6D1] rounded hover:bg-gray-50 text-gray-700 relative group" title="Change Status">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path></svg>
            </button>
            <button onClick={() => handleBulkAction('Delete')} className="p-2 border border-[#C3C6D1] rounded hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-gray-700 relative group" title="Delete">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
          {selectedCount > 0 && (
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded ml-1">{selectedCount} selected</span>
          )}
        </div>

        {/* Kanan: Filters, Export, New */}
        <div className="flex items-center gap-2 w-full md:w-auto">

          <div onClick={() => onOpenFilters && onOpenFilters()} className="flex py-2 px-3 items-center gap-2 rounded border border-[#C3C6D1] bg-[#FFF] cursor-pointer hover:bg-gray-50 transition-colors">
            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.25 9V7.5H8.25V9H5.25ZM2.25 5.25V3.75H11.25V5.25H2.25ZM0 1.5V0H13.5V1.5H0Z" fill="#43474F" /></svg>
            <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4">Filters</span>
          </div>
          
          <div onClick={() => onExportCsv && onExportCsv()} className="flex py-2 px-3 items-center gap-2 rounded border border-[#C3C6D1] bg-[#FFF] cursor-pointer hover:bg-gray-50 transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L2.25 5.25L3.3 4.1625L5.25 6.1125V0H6.75V6.1125L8.7 4.1625L9.75 5.25L6 9ZM1.5 12C1.0875 12 0.734375 11.8531 0.440625 11.5594C0.146875 11.2656 0 10.9125 0 10.5V8.25H1.5V10.5H10.5V8.25H12V10.5C12 10.9125 11.8531 11.2656 11.5594 11.5594C11.2656 11.8531 10.9125 12 10.5 12H1.5Z" fill="#43474F" /></svg>
            <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4">Export CSV</span>
          </div>
          
          <div onClick={() => onNewTicket && onNewTicket()} className="flex py-[9px] px-4 items-center gap-2 rounded bg-[#0059BB] shadow-[01px2px0rgba(0,0,0,0.05)] cursor-pointer hover:bg-blue-800 transition-colors">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 6H0V4.5H4.5V0H6V4.5H10.5V6H6V10.5H4.5V6Z" fill="white" /></svg>
            <span className="text-[#FFF] font-iBMPlexSans text-xs font-semibold leading-4">New Ticket</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Tabs */}
      <div className="flex items-end gap-6 border-b border-b-[#C3C6D1] w-full overflow-x-auto mt-2">
        <button onClick={() => handleTabClick('all')} className={getBtnClass('all')}>
          <p className={getTextClass('all')}>All Tickets ({counts.all})</p>
        </button>
        <button onClick={() => handleTabClick('waiting_verification')} className={getBtnClass('waiting_verification')}>
          <p className={getTextClass('waiting_verification')}>Waiting Verification ({counts.waitingVerification})</p>
        </button>
        <button onClick={() => handleTabClick('open')} className={getBtnClass('open')}>
          <p className={getTextClass('open')}>Open ({counts.open})</p>
        </button>
        <button onClick={() => handleTabClick('in_progress')} className={getBtnClass('in_progress')}>
          <p className={getTextClass('in_progress')}>In Progress ({counts.inProgress})</p>
        </button>
        <button onClick={() => handleTabClick('resolved')} className={getBtnClass('resolved')}>
          <p className={getTextClass('resolved')}>Resolved ({counts.resolved})</p>
        </button>
        <button onClick={() => handleTabClick('closed')} className={getBtnClass('closed')}>
          <p className={getTextClass('closed')}>Closed ({counts.closed})</p>
        </button>
        <button onClick={() => handleTabClick('rejected')} className={getBtnClass('rejected')}>
          <p className={getTextClass('rejected')}>Rejected ({counts.rejected})</p>
        </button>
        <button onClick={() => handleTabClick('deleted')} className={getBtnClass('deleted')}>
          <p className={getTextClass('deleted')}>Deleted ({counts.deleted})</p>
        </button>
      </div>

    </div>
  );
}