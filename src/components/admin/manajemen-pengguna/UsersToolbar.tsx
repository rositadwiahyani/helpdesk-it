import React from 'react';

interface UsersToolbarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onFilterClick?: () => void;
  onAddClick?: () => void;
  selectedCount?: number;
  onBulkDeleteClick?: () => void;
  onExportClick?: () => void;
}

export default function UsersToolbar({
  searchQuery = '',
  onSearchChange,
  onFilterClick,
  onExportClick,
  onAddClick,
  selectedCount = 0,
  onBulkDeleteClick,
}: UsersToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row p-4 gap-4 justify-between items-center rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] w-full">
      {/* Search Bar fleksibel yang memanjang ke arah tombol filter */}
      <div className="flex flex-col items-start w-full md:max-w-md relative">
        <div className="flex py-[11px] px-4 pl-10 justify-center items-start rounded border border-[#C3C6D1] bg-[#FFF] w-full overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Cari nama atau NIM/NIP pelapor..."
            className="text-[#1A1C1E] placeholder:text-[#6B7280] font-iBMPlexSans text-sm w-full bg-transparent outline-none border-none p-0"
          />
        </div>
        <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-[9px] w-fit h-6 pointer-events-none">
          <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="#737780"/>
        </svg>
      </div>

      {/* Tombol aksi dengan shrink-0 agar tidak bisa digeser/wrap */}
      <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
        {selectedCount > 0 && (
          <button onClick={onBulkDeleteClick} className="cursor-pointer text-nowrap flex py-2.5 px-4 justify-center items-center gap-2 rounded border border-red-500 bg-red-50 hover:bg-red-100 transition-colors group">
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            <p className="text-red-500 font-iBMPlexSans text-xs font-semibold leading-4 tracking-[0.05em] group-hover:text-red-600">Hapus ({selectedCount})</p>
          </button>
        )}
        <button onClick={onFilterClick} className="cursor-pointer text-nowrap flex py-2.5 px-4 justify-center items-center gap-2 rounded border border-[#C3C6D1] hover:bg-gray-50 transition-colors">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 12V10H11V12H7ZM3 7V5H15V7H3ZM0 2V0H18V2H0Z" fill="#43474F"/></svg>
          <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 tracking-[0.05em]">Filter</p>
        </button>
        <button onClick={onExportClick} className="cursor-pointer text-nowrap flex py-2.5 px-4 justify-center items-center gap-2 rounded border border-[#C3C6D1] hover:bg-gray-50 transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V11H2V14H14V11H16V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16H2Z" fill="#43474F"/></svg>
          <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 tracking-[0.05em]">Export</p>
        </button>
        <button onClick={onAddClick} title="Tambah Pelapor" className="cursor-pointer text-nowrap flex py-2.5 px-4 justify-center items-center rounded bg-[#001E40] hover:bg-[#00142d] transition-colors">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 10V7H14V5H17V2H19V5H22V7H19V10H17ZM8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z" fill="white"/></svg>
        </button>
      </div>
    </div>
  );
}