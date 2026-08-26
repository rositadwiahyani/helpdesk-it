'use client';

import React, { useState, useEffect } from 'react';
import TicketHeader from "./TicketHeader";
import TicketToolbar, { TabFilter } from "./TicketToolbar";
import TicketTableSection from "./TicketTableSection";

type Ticket = any;
import NewTicketModal from "./NewTicketModal";
import AdminFilterModal from './AdminFilterModal';
import AdminChangeStatusModal from './AdminChangeStatusModal';
import AdminEditTicketModal from './AdminEditTicketModal';
import AdminDeleteConfirmModal from './modals/AdminDeleteConfirmModal';
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
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isEditTicketModalOpen, setIsEditTicketModalOpen] = useState(false);
  const [selectedTicketToEdit, setSelectedTicketToEdit] = useState<string | null>(null);
  
  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('success');

  const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
      setToastMessage(message);
      setToastType(type);
      setTimeout(() => setToastMessage(null), 3000);
  };
  
  const [filters, setFilters] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);

  const fetchTicketsData = async (isBackground = false) => {
    try {
      if (!isBackground) setLoading(true);
      const { data } = await fetchClient('/admin/tickets');
      if (data) setTickets(data);
      
      const { data: cats } = await supabase.from('categories').select('*');
      const { data: depts } = await supabase.from('departments').select('*');
      const { data: techs } = await supabase.from('users').select('*');
      
      if (techs) setTechnicians(techs);
      if (depts) setDepartments(depts);
      
      if (cats && depts) {
        const formattedCategories = cats.map((cat: any) => {
            const dept = depts.find((d: any) => d.id === cat.dept_id);
            const deptName = dept ? dept.name : '';
            
            const breadcrumb = [];
            let current = cat;
            while (current) {
                breadcrumb.unshift(current.name);
                current = cats.find((c: any) => c.id === current.parent_id);
            }
            
            if (deptName) {
                breadcrumb.unshift(deptName);
            }
            
            return {
                id: cat.id,
                name: breadcrumb.join(' > ')
            };
        });
        setCategories(formattedCategories);
      } else if (cats) {
        setCategories(cats);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketsData();
  }, []);

  const handleNewTicket = () => setIsNewTicketModalOpen(true);
  
  const handleExportCsv = () => {
    let filteredTickets = [...tickets];
    
    // 1. Filter by Status (Active Tab)
    if (activeTab !== 'all') {
      const statusMap: Record<string, string> = {
        'open': 'OPEN',
        'in_progress': 'IN PROGRESS',
        'waiting_verification': 'WAITING VERIFICATION',
        'rejected': 'DITOLAK',
        'deleted': 'DELETED'
      };
      
      if (activeTab === 'resolved') {
        filteredTickets = filteredTickets.filter(t => ['RESOLVED', 'RESOLVED_BY_SYSTEM'].includes((t.status || '').toUpperCase()));
      } else {
        filteredTickets = filteredTickets.filter(t => (t.status || '').toUpperCase() === statusMap[activeTab]);
      }
    }

    if (filteredTickets.length === 0) return;

    const header = ["Ticket Num", "Subject", "Status", "Priority", "Created At"];
    const csvContent = [
      header.join(","),
      ...filteredTickets.map(t => `"${t.ticket_num || t.ticketNumber || ''}","${(t.subject || '').replace(/"/g, '""')}","${t.status || ''}","${t.priority || ''}","${t.created_at || ''}"`)
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `tickets_admin_${activeTab}_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleOpenFilters = () => setIsFilterModalOpen(true);

  const handleSubmitNewTicket = async (data: any) => {
    try {
      setIsNewTicketModalOpen(false);
      // Generate sequential ticket number
      const { data: latestTicket } = await supabase
        .from('tickets')
        .select('ticket_num')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      let nextNum = 1;
      if (latestTicket && latestTicket.ticket_num) {
        const currentNum = parseInt(latestTicket.ticket_num.replace(/\D/g, ''), 10);
        if (!isNaN(currentNum)) {
          nextNum = currentNum + 1;
        }
      }
      const ticketNum = `#${nextNum.toString().padStart(6, '0')}`;

      const ticketData = {
        ticket_num: ticketNum,
        phone: data.requesterPhone || '000000',
        reporter_name: data.requesterName || 'Unknown User',
        reporter_type: 'Umum',
        nim_nip: data.requesterNim || '',
        unit: data.requesterUnit || '',
        subject: data.subject || '',
        description: data.description || '',
        category_id: data.category || null,
        dept_id: data.assignTo || null,
        status: 'NEW',
        priority: 'MEDIUM'
      };
      
      const { data: newTicket, error } = await supabase.from('tickets').insert([ticketData]).select().single();
      
      if (error) throw error;
      
      showToast('Tiket berhasil dibuat!', 'success');
      await fetchTicketsData(true);
    } catch (err) {
      console.error(err);
      showToast('Gagal membuat tiket.', 'error');
    }
  };

  const handleBulkStatusChange = async (newStatus: string) => {
    try {
      const { error } = await supabase.from('tickets').update({ status: newStatus }).in('id', selectedTickets);
      if (error) throw error;
      
      showToast(`Berhasil mengubah status ${selectedTickets.length} tiket menjadi ${newStatus}.`, 'success');
      await fetchTicketsData(true);
      setSelectedTickets([]);
      setIsChangeStatusModalOpen(false);
    } catch (err) {
      console.error("Bulk status change failed", err);
      showToast("Gagal mengubah status tiket.", 'error');
    }
  };

  const handleBulkDelete = async () => {
    try {
      if (activeTab === 'deleted') {
        for (const id of selectedTickets) {
          await fetchClient(`/admin/tickets/${id}`, { method: 'DELETE' });
        }
        showToast(`Berhasil menghapus permanen ${selectedTickets.length} tiket.`, 'success');
      } else {
        const { error } = await supabase.from('tickets').update({ status: 'DELETED' }).in('id', selectedTickets);
        if (error) throw error;
        showToast(`Berhasil memindahkan ${selectedTickets.length} tiket ke tempat sampah.`, 'success');
      }
      await fetchTicketsData(true);
      setSelectedTickets([]);
      setIsDeleteConfirmOpen(false);
    } catch (err) {
      console.error("Bulk delete failed", err);
      showToast("Gagal menghapus tiket.", 'error');
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
        categories={categories}
        selectedCategory={filters?.category || ''}
        onCategoryChange={(catId) => setFilters((prev: any) => ({ ...prev, category: catId }))}
        onBulkAction={(action) => {
          if (selectedTickets.length === 0) {
            showToast('Belum ada tiket yang dipilih!', 'warning');
            return;
          }
          if (action === 'Change Status') setIsChangeStatusModalOpen(true);
          else if (action === 'Delete') setIsDeleteConfirmOpen(true);
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
          categories={categories}
          technicians={technicians}
          departments={departments}
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

      {isDeleteConfirmOpen && (
        <AdminDeleteConfirmModal 
          selectedCount={selectedTickets.length}
          isPermanent={activeTab === 'deleted'}
          onClose={() => setIsDeleteConfirmOpen(false)}
          onConfirm={handleBulkDelete}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 px-5 py-3.5 rounded-xl shadow-lg flex items-center gap-3 z-[100] animate-in slide-in-from-top-5 duration-300 ${
            toastType === 'success' ? 'bg-[#10B981] text-white border border-[#059669]' : 
            toastType === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 
            'bg-amber-50 text-amber-800 border border-amber-300 shadow-[0_8px_30px_rgb(251,191,36,0.2)]'
        }`}>
            {toastType === 'success' ? (
                <svg className="w-5 h-5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            ) : toastType === 'error' ? (
                <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
                <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            )}
            <span className="text-[14px] font-bold tracking-tight">{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-75 transition-opacity">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
      )}

    </div>
  );
}