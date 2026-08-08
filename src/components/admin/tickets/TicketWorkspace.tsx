'use client';

import React, { useState, useEffect } from 'react';
import TicketHeader from "./TicketHeader";
import TicketToolbar, { TabFilter } from "./TicketToolbar";
import TicketTableSection from "./TicketTableSection";

type Ticket = any;
import NewTicketModal from "./NewTicketModal";
import AdminFilterModal from "./AdminFilterModal";
import AdminChangeStatusModal from "./AdminChangeStatusModal";
import AdminEditTicketModal from "./AdminEditTicketModal";
import { fetchClient } from '@/lib/apiClient';
import { supabase } from '@/lib/supabase';

export default function TicketWorkspace() {
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabFilter>('all');
  const [newlyAddedTicket, setNewlyAddedTicket] = useState<Ticket | null>(null);
  
  // Real data state
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk bulk action
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);

  // State untuk modal tambahan dan filter
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isChangeStatusModalOpen, setIsChangeStatusModalOpen] = useState(false);
  const [isEditTicketModalOpen, setIsEditTicketModalOpen] = useState(false);
  const [selectedTicketToEdit, setSelectedTicketToEdit] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<any[]>([]);

  const fetchTicketsData = async () => {
    try {
      setLoading(true);
      const { data } = await fetchClient('/admin/tickets');
      if (data) setTickets(data);
      
      const { data: cats } = await supabase.from('categories').select('*');
      if (cats) setCategories(cats);
    } catch (err) {
      console.error("Failed to fetch tickets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketsData();
  }, []);

  const handleNewTicket = () => setIsNewTicketModalOpen(true);
  
  const handleExportCsv = () => {
    if (tickets.length === 0) return;
    const header = ["Ticket Num", "Subject", "Status", "Priority", "Created At"];
    const csvContent = [
      header.join(","),
      ...tickets.map(t => `"${t.ticket_num || t.ticketNumber || ''}","${(t.subject || '').replace(/"/g, '""')}","${t.status || ''}","${t.priority || ''}","${t.created_at || ''}"`)
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `tickets_admin_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleOpenFilters = () => setIsFilterModalOpen(true);

  const handleSubmitNewTicket = (ticketData: any) => {
    // Simulasi penambahan tiket untuk sementara
    alert(`Tiket baru berhasil ditambahkan! (Silakan refresh untuk melihat hasil sebenarnya dari backend)`);
    setIsNewTicketModalOpen(false);
  };

  const handleBulkStatusChange = async (newStatus: string) => {
    try {
      const { error } = await supabase.from('tickets').update({ status: newStatus }).in('id', selectedTickets);
      if (error) throw error;
      await fetchTicketsData();
      setSelectedTickets([]);
      setIsChangeStatusModalOpen(false);
    } catch (err) {
      console.error("Bulk status change failed", err);
      alert("Failed to change status.");
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedTickets.length} ticket(s)?`)) return;
    try {
      const { error } = await supabase.from('tickets').update({ status: 'DELETED' }).in('id', selectedTickets);
      if (error) throw error;
      await fetchTicketsData();
      setSelectedTickets([]);
    } catch (err) {
      console.error("Bulk delete failed", err);
      alert("Failed to delete tickets.");
    }
  };

  // Kalkulasi counts
  const counts = {
    all: tickets.length,
    open: tickets.filter(t => (t.status || '').toUpperCase() === 'OPEN').length,
    inProgress: tickets.filter(t => (t.status || '').toUpperCase() === 'IN PROGRESS').length,
    waitingVerification: tickets.filter(t => (t.status || '').toUpperCase() === 'WAITING VERIFICATION').length,
    resolved: tickets.filter(t => ['RESOLVED', 'RESOLVED_BY_SYSTEM'].includes((t.status || '').toUpperCase())).length,
    rejected: tickets.filter(t => (t.status || '').toUpperCase() === 'DITOLAK').length,
    deleted: tickets.filter(t => (t.status || '').toUpperCase() === 'DELETED').length,
  };

  return (
    <div className="flex flex-col items-start gap-6 w-full relative">
      <TicketHeader />
      
      <TicketToolbar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewTicket={handleNewTicket} 
        onExportCsv={handleExportCsv}
        onOpenFilters={handleOpenFilters}
        selectedCount={selectedTickets.length}
        onBulkAction={(action) => {
          if (action === 'Change Status') setIsChangeStatusModalOpen(true);
          else if (action === 'Delete') handleBulkDelete();
        }}
      />
      
      {loading ? (
        <div className="w-full flex justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0059BB]"></div>
        </div>
      ) : (
        <TicketTableSection 
          activeTab={activeTab} 
          tickets={tickets}
          newlyAddedTicket={newlyAddedTicket} 
          selectedTickets={selectedTickets}
          onSelectionChange={setSelectedTickets}
          filters={filters}
          searchQuery={searchQuery}
          onEditTicket={(id) => { setSelectedTicketToEdit(id); setIsEditTicketModalOpen(true); }}
        />
      )}

      {isFilterModalOpen && (
        <AdminFilterModal 
          categories={categories}
          onClose={() => setIsFilterModalOpen(false)}
          onApply={(newFilters) => setFilters(newFilters)}
        />
      )}

      {isChangeStatusModalOpen && (
        <AdminChangeStatusModal 
          selectedCount={selectedTickets.length}
          onClose={() => setIsChangeStatusModalOpen(false)}
          onSubmit={handleBulkStatusChange}
        />
      )}

      {isEditTicketModalOpen && selectedTicketToEdit && (
        <AdminEditTicketModal 
          ticketId={selectedTicketToEdit}
          onClose={() => { setIsEditTicketModalOpen(false); setSelectedTicketToEdit(null); }}
          onSaved={() => {
            setIsEditTicketModalOpen(false);
            setSelectedTicketToEdit(null);
            fetchTicketsData();
          }}
        />
      )}

      {isNewTicketModalOpen && (
        <NewTicketModal 
          onClose={() => setIsNewTicketModalOpen(false)} 
          onSubmit={handleSubmitNewTicket}
        />
      )}
    </div>
  );
}