import React from 'react';

interface TicketToolbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  priorityFilter: string;
  setPriorityFilter: (p: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (d: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onReset: () => void;
  onOpenAdvancedFilter: () => void;
  onOpenCreateTicket: () => void;
  selectedCount: number;
  onAssignSelected: () => void;
  onDeleteSelected: () => void;
  onChangeStatusSelected: (status: string) => void;
}

export default function TicketToolbar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  departmentFilter,
  setDepartmentFilter,
  activeTab,
  setActiveTab,
  onReset,
  onOpenAdvancedFilter,
  onOpenCreateTicket,
  selectedCount,
  onAssignSelected,
  onDeleteSelected,
  onChangeStatusSelected
}: TicketToolbarProps) {
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = React.useState(false);
  const [isAssignDropdownOpen, setIsAssignDropdownOpen] = React.useState(false);
  
  const ticketTabs = [
    { label: 'All', value: 'All' },
    { label: 'Open', value: 'Open' },
    { label: 'My Tickets', value: 'MyTickets' },
    { label: 'Closed', value: 'Closed' },
    { label: 'Trash', value: 'Trash' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-[var(--line)] shadow-sm overflow-hidden flex flex-col">
      {/* 1. TOP TABS & BULK ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--line)] px-4 pt-4 sm:pt-0 bg-[var(--paper-2)]/30 gap-3">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {ticketTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-5 py-2.5 text-[13.5px] font-bold rounded-t-lg border border-b-0 transition-colors whitespace-nowrap ${
                activeTab === tab.value
                  ? 'bg-white border-[var(--line)] text-[var(--ink)]'
                  : 'bg-transparent border-transparent text-[var(--text-dim)] hover:text-[var(--ink)] hover:bg-[var(--line-dark)]'
              }`}
              style={activeTab === tab.value ? { marginBottom: '-1px' } : {}}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bulk Action Controls (Sejajar Tabs di Ujung Kanan) */}
        <div className="flex items-center gap-2 pb-2 sm:pb-0 sm:self-center h-10">
          
          {/* Change Status Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                if (selectedCount === 0) {
                  alert('Silakan pilih minimal satu tiket terlebih dahulu.');
                  return;
                }
                setIsStatusDropdownOpen(!isStatusDropdownOpen);
                setIsAssignDropdownOpen(false);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 border border-[var(--line-dark)] rounded-lg text-xs font-bold bg-white transition-colors ${
                selectedCount > 0 ? 'text-[var(--ink)] hover:bg-[var(--paper-2)]' : 'text-gray-400 opacity-60 cursor-not-allowed'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              <span>Status</span>
              <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>

            {isStatusDropdownOpen && selectedCount > 0 && (
              <div className="absolute right-0 mt-1 w-36 bg-white border border-[var(--line-dark)] rounded-xl shadow-lg z-50 overflow-hidden">
                <div className="py-1">
                  {['Open', 'In Progress', 'Resolved', 'Closed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        onChangeStatusSelected(st);
                        setIsStatusDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-[var(--paper-2)] transition-colors text-[var(--ink)]"
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Assign Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                if (selectedCount === 0) {
                  alert('Silakan pilih minimal satu tiket terlebih dahulu.');
                  return;
                }
                setIsAssignDropdownOpen(!isAssignDropdownOpen);
                setIsStatusDropdownOpen(false);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 border border-[var(--line-dark)] rounded-lg text-xs font-bold bg-white transition-colors ${
                selectedCount > 0 ? 'text-[var(--ink)] hover:bg-[var(--paper-2)]' : 'text-gray-400 opacity-60 cursor-not-allowed'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Assign</span>
              <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>

            {isAssignDropdownOpen && selectedCount > 0 && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-[var(--line-dark)] rounded-xl shadow-lg z-50 overflow-hidden">
                <div className="py-1">
                  <button
                    onClick={() => {
                      alert('Claiming selected tickets...');
                      setIsAssignDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-[var(--paper-2)] transition-colors text-[var(--ink)]"
                  >
                    Claim Tickets
                  </button>
                  <button
                    onClick={() => {
                      onAssignSelected();
                      setIsAssignDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-[var(--paper-2)] transition-colors text-[var(--ink)]"
                  >
                    Assign to Agent
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Delete/Trash Button */}
          <button
            onClick={() => {
              if (selectedCount === 0) {
                alert('Silakan pilih minimal satu tiket terlebih dahulu.');
                return;
              }
              if (confirm(`Apakah Anda yakin ingin memindahkan ${selectedCount} tiket ke Trash?`)) {
                onDeleteSelected();
              }
            }}
            className={`flex items-center justify-center p-2 border border-[var(--line-dark)] rounded-lg bg-white transition-colors ${
              selectedCount > 0 ? 'text-red-600 hover:bg-red-50 hover:border-red-200' : 'text-gray-400 opacity-60 cursor-not-allowed'
            }`}
            title="Move to Trash"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

        </div>
      </div>

      {/* 2. TOOLBAR FILTERS */}
      <div className="p-4 lg:p-5 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          
          {/* Left: Filters & Search */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            
            {/* Search */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-[12px] font-bold text-[var(--ink)]">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-[var(--text-dim)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search ticket..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2 bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl text-[13.5px] text-[var(--ink)] placeholder-[var(--text-dim)] focus:outline-none focus:border-[var(--gold-soft)] transition-colors"
                />
              </div>
            </div>

            {/* Status (Optional Override) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[var(--ink)]">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-3 py-2 text-[13.5px] focus:outline-none focus:border-[var(--gold-soft)] cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Open">Open</option>
                <option value="Waiting">Waiting</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Priority */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[var(--ink)]">Priority</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-3 py-2 text-[13.5px] focus:outline-none focus:border-[var(--gold-soft)] cursor-pointer"
              >
                <option value="All">All Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

          </div>

          {/* Right: Actions */}
          <div className="flex flex-wrap items-center gap-2">
            
            <button
              onClick={onOpenAdvancedFilter}
              className="bg-white border border-[var(--line)] text-[var(--text-dim)] px-4 py-2 rounded-xl text-[13.5px] font-bold hover:bg-[var(--paper-2)] hover:text-[var(--ink)] transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.477 8 1.4m0 0l-2.243.748M20 4.4L19.25 6.6M12 21c-2.755 0-5.455-.477-8-1.4m0 0l2.243-.748M4 19.6l.75-2.2M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
              Advanced
            </button>

            <button
              onClick={onReset}
              className="bg-white border border-[var(--line)] text-[var(--text-dim)] px-4 py-2 rounded-xl text-[13.5px] font-bold hover:bg-[var(--paper-2)] hover:text-[var(--ink)] transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>

            <button
              onClick={onOpenCreateTicket}
              className="bg-[var(--ink)] text-white px-4 py-2 rounded-xl text-[13.5px] font-bold hover:bg-[var(--text)] transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Ticket
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
