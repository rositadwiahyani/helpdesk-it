import React from 'react';

interface UsersToolbarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onFilterClick?: () => void;
  onResetFilterClick?: () => void;
  onAddClick?: () => void;
  selectedCount?: number;
  onBulkDeleteClick?: () => void;
  onExportClick?: () => void;
  onResetFilterClick?: () => void;
}

export default function UsersToolbar({
  searchQuery = '',
  onSearchChange,
  onFilterClick,
  onResetFilterClick,
  onExportClick,
  onAddClick,
  selectedCount = 0,
  onBulkDeleteClick,
}: UsersToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
      {/* Search Bar & Bulk Actions */}
      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="relative w-full md:w-[350px]">
          <input 
            type="text" 
            placeholder="Cari nama atau NIM/NIP pelapor..." 
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] w-full"
          />
          <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        <div className="flex gap-1 items-center">
          {/* Delete Button */}
          <button onClick={onBulkDeleteClick} className="p-2 border border-[#C3C6D1] rounded hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-gray-700 relative group h-[38px] flex items-center justify-center" title="Delete">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>

        {selectedCount > 0 && (
          <span className="text-xs font-bold text-[#1E3A8A] bg-blue-50 px-2 py-1 rounded ml-1">{selectedCount} selected</span>
        )}
      </div>

      {/* Tombol aksi dengan shrink-0 agar tidak bisa digeser/wrap */}
      <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
        <button onClick={onResetFilterClick} title="Reset Filter" className="h-[38px] px-4 bg-white text-slate-600 border border-[#C3C6D1] text-[13px] font-medium rounded hover:bg-slate-50 hover:text-slate-900 transition-colors">
          Reset
        </button>
        <button onClick={onFilterClick} className="flex items-center gap-2 px-3 py-2 border border-[#C3C6D1] rounded bg-white hover:bg-gray-50 text-sm text-[#43474F] font-iBMPlexSans">
          <svg width="16" height="16" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 12V10H11V12H7ZM3 7V5H15V7H3ZM0 2V0H18V2H0Z" fill="currentColor"/></svg>
          Advanced
        </button>
        <button onClick={onExportClick} className="flex items-center gap-2 px-3 py-2 border border-[#C3C6D1] rounded bg-white hover:bg-gray-50 text-sm text-[#43474F] font-iBMPlexSans">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V11H2V14H14V11H16V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16H2Z" fill="currentColor"/></svg>
          Export CSV
        </button>
        <button onClick={onAddClick} title="Tambah Pelapor" className="flex items-center gap-2 px-4 py-2 bg-[#001E40] text-white rounded hover:bg-[#00142d] text-sm font-iBMPlexSans">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          Tambah Pelapor
        </button>
      </div>
    </div>
  );
}