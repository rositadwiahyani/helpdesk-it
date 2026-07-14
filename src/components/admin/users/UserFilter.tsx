import React from 'react';

interface UserFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  onReset: () => void;
}

export default function UserFilter({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  onReset
}: UserFilterProps) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--line)] shadow-sm p-4 lg:p-5 flex flex-col xl:flex-row xl:items-end gap-4">
      {/* Search Input */}
      <div className="flex-1 flex flex-col gap-2">
        <label className="text-[13px] font-bold text-[var(--ink)]">Search User</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-[var(--text-dim)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-11 pr-4 py-2.5 bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl text-[14px] text-[var(--ink)] placeholder-[var(--text-dim)] focus:outline-none focus:border-[var(--gold-soft)] transition-colors"
          />
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-bold text-[var(--ink)]">Filter Status</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] cursor-pointer min-w-[150px]"
        >
          <option value="All">Semua</option>
          <option value="Active (Registered)">Active (Registered)</option>
          <option value="Guest">Guest</option>
          <option value="Locked (Pending Activation)">Locked (Pending Activation)</option>
        </select>
      </div>

      {/* Reset Button */}
      <div className="mt-2 xl:mt-0">
        <button
          onClick={onReset}
          className="w-full xl:w-auto bg-white border border-[var(--line)] text-[var(--text-dim)] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[var(--paper-2)] hover:text-[var(--ink)] transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Reset Filter
        </button>
      </div>
    </div>
  );
}
