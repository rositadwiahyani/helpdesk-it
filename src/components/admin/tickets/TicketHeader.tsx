'use client';

import React from 'react';

interface TicketHeaderProps {
  onExportCsv?: () => void;
  onOpenFilters?: () => void;
  onNewTicket?: () => void;
}

export default function TicketHeader({
  onExportCsv,
  onOpenFilters,
  onNewTicket,
}: TicketHeaderProps) {
  // Dummy handlers jika backend/parent belum mengirim props
  const handleExport = () => onExportCsv ? onExportCsv() : console.log('Action: Export CSV');
  const handleFilter = () => onOpenFilters ? onOpenFilters() : console.log('Action: Open Filters');
  const handleNewTicket = () => onNewTicket ? onNewTicket() : alert('Action: Open New Ticket Modal');

  return (
    <div className="flex justify-between items-end w-full">
      <div className="flex flex-col items-start gap-1 w-fit">
        <div className="flex items-start gap-2 w-full">
          <div className="flex flex-col items-start w-fit h-full">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              Dashboard
            </p>
          </div>
          <div className="flex flex-col items-start w-fit h-full">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              /
            </p>
          </div>
          <div className="flex flex-col items-start w-fit h-full">
            <p className="text-[#1A1C1E] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              Tickets
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start w-full">
          <p className="text-[#001E40] font-iBMPlexSans text-[32px] font-semibold leading-10 w-fit tracking-[-0.02em]">
            Tickets Monitoring
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2 w-fit">
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