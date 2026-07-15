'use client';
import React, { useState, useEffect, useMemo } from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import { DUMMY_TICKETS, getTicketStats, Ticket } from '@/lib/mock/tickets';
import StatCard from '@/components/admin/tickets/StatCard';
import TicketToolbar from '@/components/admin/tickets/TicketToolbar';
import TicketTable from '@/components/admin/tickets/TicketTable';
import BulkActionBar from '@/components/admin/tickets/BulkActionBar';
import AdvancedFilterModal from '@/components/admin/tickets/AdvancedFilterModal';
import CreateTicketModal from '@/components/admin/tickets/CreateTicketModal';
import AssignSelectedModal from '@/components/admin/tickets/AssignSelectedModal';

export default function TicketsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [ticketsList, setTicketsList] = useState<Ticket[]>(() => 
    DUMMY_TICKETS.map(t => ({ ...t, isDeleted: false }))
  );
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('All');

  // Modal States
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAssignSelectedOpen, setIsAssignSelectedOpen] = useState(false);

  // Advanced Filter values
  const [advancedFilters, setAdvancedFilters] = useState<any>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setDepartmentFilter('All');
    setActiveTab('All');
    setAdvancedFilters(null);
  };

  const handleDeleteSelected = () => {
    setTicketsList(prev => prev.map(t => selectedIds.includes(t.id) ? { ...t, isDeleted: true } : t));
    setSelectedIds([]);
  };

  const handleChangeStatusSelected = (newStatus: string) => {
    setTicketsList(prev => prev.map(t => selectedIds.includes(t.id) ? { ...t, status: newStatus as any } : t));
    setSelectedIds([]);
    alert(`Berhasil mengubah status ${selectedIds.length} tiket menjadi ${newStatus}.`);
  };

  // Filter Logic
  const filteredTickets = useMemo(() => {
    // Filter berdasarkan status isDeleted terlebih dahulu
    const baseTickets = ticketsList.filter(t => activeTab === 'Trash' ? t.isDeleted === true : !t.isDeleted);

    return baseTickets.filter((ticket) => {
      // 1. Search Query (subject, requester name, email, or ticket id)
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        ticket.id.toLowerCase().includes(query) ||
        ticket.subject.toLowerCase().includes(query) ||
        ticket.requester.toLowerCase().includes(query) ||
        ticket.email.toLowerCase().includes(query);

      // 2. Dropdown Status
      const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter;

      // 3. Priority
      const matchesPriority = priorityFilter === 'All' || ticket.priority === priorityFilter;

      // 4. Department
      const matchesDept = departmentFilter === 'All' || ticket.department === departmentFilter;

      // 5. Active Tab (All, Open, My Tickets, Closed, Trash)
      let matchesTab = true;
      if (activeTab === 'Open') {
        matchesTab = ticket.status === 'Open' || ticket.status === 'In Progress' || ticket.status === 'Waiting';
      } else if (activeTab === 'Closed') {
        matchesTab = ticket.status === 'Closed' || ticket.status === 'Resolved';
      } else if (activeTab === 'MyTickets') {
        matchesTab = ticket.assignedTo === 'Support IT'; // Mock "My Tickets"
      }

      // 6. Advanced Filters
      let matchesAdvanced = true;
      if (advancedFilters) {
        const { keywords, status, priority, department, agent, helpTopic, createdDate, updatedDate } = advancedFilters;
        if (keywords && !ticket.subject.toLowerCase().includes(keywords.toLowerCase()) && !ticket.id.toLowerCase().includes(keywords.toLowerCase())) {
          matchesAdvanced = false;
        }
        if (status !== 'All' && ticket.status !== status) {
          matchesAdvanced = false;
        }
        if (priority !== 'All' && ticket.priority !== priority) {
          matchesAdvanced = false;
        }
        if (department !== 'All' && ticket.department !== department) {
          matchesAdvanced = false;
        }
        if (agent !== 'All' && ticket.assignedTo !== agent) {
          matchesAdvanced = false;
        }
        if (helpTopic !== 'All' && ticket.helpTopic !== helpTopic) {
          matchesAdvanced = false;
        }
        if (createdDate && !ticket.createdDate.startsWith(createdDate)) {
          matchesAdvanced = false;
        }
        if (updatedDate && !ticket.updatedDate.startsWith(updatedDate)) {
          matchesAdvanced = false;
        }
      }

      return matchesSearch && matchesStatus && matchesPriority && matchesDept && matchesTab && matchesAdvanced;
    });
  }, [searchQuery, statusFilter, priorityFilter, departmentFilter, activeTab, advancedFilters]);

  // Dynamic Statistics
  const stats = useMemo(() => {
    return getTicketStats(ticketsList.filter(t => !t.isDeleted));
  }, [ticketsList]);

  // Table sort control (allow StatCard clicks to set default table sorting)
  const [tableSort, setTableSort] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const handleStatsClick = (category: 'Open' | 'In Progress' | 'Resolved' | 'Closed') => {
    if (category === 'Open') {
      setActiveTab('Open');
      setStatusFilter('All');
      // show most recently updated first for Open view
      setTableSort({ key: 'updatedDate', direction: 'desc' });
    } else {
      setActiveTab('All');
      setStatusFilter(category);
      // default: newest first
      setTableSort({ key: 'updatedDate', direction: 'desc' });
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        
        {/* HEADER */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-[var(--ink)]">Tickets</h2>
          <p className="text-[var(--text-dim)] text-sm">Manage and monitor all support tickets.</p>
        </div>

        {/* STATISTICS CARDS (With Dummy Load State) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-[var(--line)] shadow-sm flex flex-col gap-3 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 bg-[var(--line-dark)] rounded"></div>
                  <div className="w-10 h-10 rounded-xl bg-[var(--line-dark)]"></div>
                </div>
                <div className="h-8 w-16 bg-[var(--line-dark)] rounded"></div>
              </div>
            ))
          ) : (
            <>
              <StatCard 
                title="Open Tickets" 
                value={stats.open} 
                description="Needs action" 
                onClick={() => handleStatsClick('Open')}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                  </svg>
                } 
              />
              <StatCard 
                title="In Progress" 
                value={stats.inProgress} 
                description="Currently active" 
                onClick={() => handleStatsClick('In Progress')}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                } 
              />
              <StatCard 
                title="Resolved" 
                value={stats.resolved} 
                description="Awaiting confirmation" 
                onClick={() => handleStatsClick('Resolved')}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                } 
              />
              <StatCard 
                title="Closed" 
                value={stats.closed} 
                description="Completed tickets" 
                onClick={() => handleStatsClick('Closed')}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                } 
              />
            </>
          )}
        </div>

        {/* TOOLBAR */}
        <TicketToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onReset={handleResetFilters}
          onOpenAdvancedFilter={() => setIsAdvancedOpen(true)}
          onOpenCreateTicket={() => setIsCreateOpen(true)}
          selectedCount={selectedIds.length}
          onAssignSelected={() => setIsAssignSelectedOpen(true)}
          onDeleteSelected={handleDeleteSelected}
          onChangeStatusSelected={handleChangeStatusSelected}
        />

        {/* DATA TABLE AREA */}
        {isLoading ? (
          <div className="bg-white rounded-2xl border border-[var(--line)] p-6 flex flex-col gap-4 animate-pulse">
            <div className="h-6 w-1/3 bg-[var(--line-dark)] rounded"></div>
            <div className="h-40 bg-[var(--line-dark)] rounded-xl"></div>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[var(--line)] shadow-sm p-16 text-center flex flex-col items-center justify-center gap-4 animate-in fade-in duration-300">
            <svg className="w-16 h-16 text-[var(--text-dim)] opacity-40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div>
              <h4 className="text-base font-bold text-[var(--ink)]">No tickets found</h4>
              <p className="text-sm text-[var(--text-dim)] mt-1">Coba ubah filter atau kata kunci pencarian Anda.</p>
            </div>
            <button
              onClick={handleResetFilters}
              className="bg-[var(--ink)] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--text)] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <TicketTable
              tickets={filteredTickets}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
              isLoading={isLoading}
              initialSort={tableSort}
            />
          </div>
        )}

      </div>

      {/* MODALS */}
      <AdvancedFilterModal
        isOpen={isAdvancedOpen}
        onClose={() => setIsAdvancedOpen(false)}
        onApply={(filters) => setAdvancedFilters(filters)}
        onReset={handleResetFilters}
      />

      <CreateTicketModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <AssignSelectedModal
        isOpen={isAssignSelectedOpen}
        onClose={() => setIsAssignSelectedOpen(false)}
        selectedCount={selectedIds.length}
        onAssign={(dept, agent) => {
          alert(`Berhasil menugaskan ${selectedIds.length} tiket ke Departemen: ${dept} & Agen: ${agent}`);
          setSelectedIds([]);
        }}
      />

    </AdminLayout>
  );
}
