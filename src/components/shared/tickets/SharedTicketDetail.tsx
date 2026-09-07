'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchClient } from '@/lib/apiClient';
import StatusBadge from '@/components/admin/tickets/StatusBadge';
import PriorityBadge from '@/components/admin/tickets/PriorityBadge';
import { FaWhatsapp } from 'react-icons/fa';

type Ticket = {
  id: string;
  ticket_num?: string;
  ticket_number?: string;
  subject?: string;
  description?: string;
  status?: string;
  priority?: string;
  category_id?: number;
  category?: { name?: string };
  dept?: { name?: string };
  tech?: { name?: string };
  reporter_name?: string;
  phone?: string;
  reporter_type?: string;
  unit?: string;
  created_at?: string;
  updated_at?: string;
  tech_id?: string;
  attachment?: string | null;
  attachments?: { file_url: string; file_name?: string }[];
};

type Message = {
  id: string;
  sender_type?: string;
  sender_name?: string;
  message?: string;
  created_at?: string;
  tech?: { name?: string };
};

export default function SharedTicketDetail({ ticketId }: { ticketId: string }) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);

  
  const isTeknisi = typeof window !== 'undefined' && window.location.pathname.includes('/teknisi');
  
  // Disposisi state
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [selectedDeptId, setSelectedDeptId] = useState<string>('');
  const [selectedTechId, setSelectedTechId] = useState<string>('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [toasts, setToasts] = useState<{id: number, message: string, type: 'success' | 'error'}[]>([]);

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
  };

  useEffect(() => {
    async function loadTicket() {
      setIsLoading(true);

      try {
        const isOperator = typeof window !== 'undefined' && window.location.pathname.includes('/operator');
        
        let foundTicket = null;
        if (isOperator) {
          const detailResponse = await fetchClient(`/operator/tickets/${ticketId}`);
          foundTicket = detailResponse.data?.ticket || detailResponse.data;
        } else {
          const listResponse = await fetchClient('/admin/tickets');
          const tickets: Ticket[] = Array.isArray(listResponse.data) ? listResponse.data : [];
          foundTicket = tickets.find(
            (item) => String(item.id) === String(ticketId) || item.ticket_num === ticketId || item.ticket_number === ticketId
          );
        }

        if (!foundTicket) {
          console.warn('Ticket not found in list, unable to resolve by ID or ticket number.');
        }

        if (foundTicket) {
          setTicket(foundTicket);
        }

        // Fetch categories to build full path
        const catsResponse = await fetchClient('/admin/categories').catch(() => ({ data: [] }));
        if (Array.isArray(catsResponse.data)) {
          setCategories(catsResponse.data);
        }

        // Fetch technicians for disposisi
        import('@/lib/supabase').then(({ supabase }) => {
          supabase.from('staff_profiles').select('id, name, dept_id').in('role', ['teknisi', 'agent']).then(({ data }) => {
            if (data) setTechnicians(data);
          });
          supabase.from('departments').select('id, name').order('name').then(({ data }) => {
            if (data) setDepartments(data);
          });
        });
      } catch (error) {
        console.error('Error loading ticket detail:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadTicket();
  }, [ticketId]);



  const handleDisposisi = async () => {
    if (!selectedDeptId) return;
    
    setIsAssigning(true);
    try {
      const isOperator = typeof window !== 'undefined' && window.location.pathname.includes('/operator');
      await fetchClient(isOperator ? `/operator/tickets/${ticketId}` : `/admin/tickets/${ticketId}`, {
        method: 'PATCH',
        body: JSON.stringify({ 
          tech_id: selectedTechId || null, 
          dept_id: selectedDeptId,
          status: 'Open'
        })
      });

      showToast('Tiket berhasil di-disposisi!', 'success');
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error('Failed to assign ticket:', error);
      showToast('Gagal melakukan disposisi.', 'error');
    } finally {
      setIsAssigning(false);
    }
  };



  const handleUpdateStatus = (newStatus: string) => {
    const isResolving = newStatus === 'WAITING CONFIRMATION' || newStatus === 'RESOLVED';
    const actionText = isResolving ? 'menyelesaikan' : 'membuka kembali';

    setConfirmModal({
      isOpen: true,
      title: 'Konfirmasi Status',
      message: `Apakah Anda yakin ingin ${actionText} tiket ini?`,
      onConfirm: async () => {
        setIsUpdatingStatus(true);
        try {
          const isOperator = typeof window !== 'undefined' && window.location.pathname.includes('/operator');
          await fetchClient(isOperator ? `/operator/tickets/${ticketId}` : `/admin/tickets/${ticketId}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: newStatus })
          });

          showToast(isResolving ? 'Tiket berhasil diselesaikan!' : 'Tiket berhasil dibuka kembali!', 'success');
          setTimeout(() => window.location.reload(), 1500);
        } catch (error) {
          console.error('Gagal update status:', error);
          showToast('Gagal mengubah status tiket.', 'error');
        } finally {
          setIsUpdatingStatus(false);
        }
      }
    });
  };

  const handleUpdateField = (field: string, value: string | number) => {
    setConfirmModal({
      isOpen: true,
      title: 'Konfirmasi Perubahan',
      message: 'Apakah Anda yakin ingin mengubah data ini?',
      onConfirm: async () => {
        try {
          const isOperator = typeof window !== 'undefined' && window.location.pathname.includes('/operator');
          await fetchClient(isOperator ? `/operator/tickets/${ticketId}` : `/admin/tickets/${ticketId}`, {
            method: 'PATCH',
            body: JSON.stringify({ [field]: value })
          });
          setTicket((prev) => prev ? { ...prev, [field]: value } : null);
          showToast(`Berhasil memperbarui ${field}!`, 'success');
        } catch (error) {
          console.error(`Gagal update ${field}:`, error);
          showToast(`Gagal memperbarui ${field}.`, 'error');
        }
      }
    });
  };

  const formatDate = (value?: string) =>
    value ? new Date(value).toLocaleString('id-ID') : '-';

  const isWaitingVerification = !ticket?.dept;
  const displayStatus = (ticket?.status === 'OPEN' || isWaitingVerification) ? 'WAITING VERIFICATION' : (ticket?.status || 'Open');
  const ticketNumber = ticket?.ticket_number || ticket?.ticket_num || '–';
  const requester = ticket?.reporter_name || '-';

  // Build full category path
  let categoryPath = ticket?.category?.name || '-';
  if (ticket?.category_id && categories.length > 0) {
    let currentCat = categories.find(c => c.id === ticket.category_id);
    if (currentCat) {
      const pathArr = [currentCat.name];
      while (currentCat?.parent_id) {
        currentCat = categories.find(c => c.id === currentCat.parent_id);
        if (currentCat) pathArr.unshift(currentCat.name);
      }
      categoryPath = pathArr.join(' / ');
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse p-6">
        <div className="h-10 w-2/3 bg-[var(--line-dark)] rounded"></div>
        <div className="h-60 bg-[var(--line-dark)] rounded-2xl"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="p-16 text-center">
        <h2 className="text-xl font-bold">Ticket not found</h2>
        <Link href="/dashboard" className="text-[var(--gold)] font-bold mt-2 inline-block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300 p-6 md:p-8 max-w-[1400px] mx-auto">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[12px] font-bold text-gray-500 mb-1">
            <button onClick={() => window.history.back()} className="hover:text-gray-900 transition-colors">
              Back
            </button>
            <span>/</span>
            <span className="text-gray-900">Ticket Detail</span>
          </div>
          <span className="text-[13px] font-mono font-medium text-gray-400">#{ticketNumber}</span>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-gray-900 tracking-tight leading-tight">{ticket.subject}</h1>
        </div>
        
        <div className="flex items-center gap-3 self-start mt-4 sm:mt-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
            <div className="w-2 h-2 rounded-full bg-[#1E3A8A]"></div>
            <span className="text-[11px] font-bold text-[#1E3A8A] uppercase tracking-wider">{displayStatus}</span>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200">
            <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">{ticket.priority}</span>
          </div>
          
          <div className="h-6 w-px bg-gray-300 mx-1"></div>
          
          {ticket.status === 'RESOLVED' || ticket.status === 'CLOSED' || ticket.status === 'WAITING CONFIRMATION' ? (
            <button
              onClick={() => handleUpdateStatus(ticket.tech_id || ticket.tech?.name ? 'IN PROGRESS' : 'OPEN')}
              disabled={isUpdatingStatus}
              className="px-4 py-1.5 bg-white border-2 border-[#1E3A8A] text-[#1E3A8A] hover:bg-blue-50 disabled:opacity-50 text-[11.5px] font-bold rounded-full transition-colors shadow-sm flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              {isUpdatingStatus ? 'MEMPROSES...' : 'BUKA KEMBALI'}
            </button>
          ) : (
            <button
              onClick={() => handleUpdateStatus('WAITING CONFIRMATION')}
              disabled={isUpdatingStatus}
              className="px-4 py-1.5 bg-[#1E3A8A] hover:bg-blue-900 disabled:opacity-50 text-white text-[11.5px] font-bold rounded-full transition-colors shadow-sm flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              {isUpdatingStatus ? 'MEMPROSES...' : 'SELESAIKAN TIKET'}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-2">
          
          {/* INFORMASI TIKET */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
              <h2 className="text-[16px] font-bold text-gray-900">Informasi Tiket</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              
              {/* Kolom 1 */}
              <div className="flex flex-col divide-y divide-gray-100">
                <div className="flex items-center px-6 py-4 hover:bg-gray-50/50 transition-colors">
                  <span className="w-28 text-[13.5px] font-medium text-gray-500 shrink-0">Status</span>
                  <span className="text-[13.5px] font-bold text-[#1E3A8A] uppercase">{displayStatus}</span>
                </div>
                <div className="flex items-center px-6 py-4 hover:bg-gray-50/50 transition-colors">
                  <span className="w-28 text-[13.5px] font-medium text-gray-500 shrink-0">Department</span>
                  <span className="text-[13.5px] font-semibold text-gray-900">{ticket.dept?.name || '-'}</span>
                </div>
                <div className="flex items-center px-6 py-4 hover:bg-gray-50/50 transition-colors">
                  <span className="w-28 text-[13.5px] font-medium text-gray-500 shrink-0">Assigned To</span>
                  <span className="text-[13.5px] font-semibold text-gray-900">{ticket.tech?.name ? ticket.tech.name : 'Not Assigned'}</span>
                </div>
                <div className="flex items-center px-6 py-3 hover:bg-gray-50/50 transition-colors">
                  <span className="w-28 text-[13.5px] font-medium text-gray-500 shrink-0">Priority</span>
                  <select 
                    value={ticket.priority || ''}
                    onChange={(e) => handleUpdateField('priority', e.target.value)}
                    disabled={isTeknisi}
                    className={`flex-1 min-w-0 py-1.5 px-2 -ml-2 rounded-lg border border-transparent text-[13.5px] font-semibold text-gray-900 bg-transparent hover:bg-gray-50 hover:border-gray-200 outline-none transition-all focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] truncate ${isTeknisi ? 'opacity-90 cursor-not-allowed hover:bg-transparent hover:border-transparent appearance-none' : 'cursor-pointer'}`}
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
                <div className="flex items-center px-6 py-3 hover:bg-gray-50/50 transition-colors">
                  <span className="w-28 text-[13.5px] font-medium text-gray-500 shrink-0">Category</span>
                  <select
                    value={ticket.category_id || ''}
                    onChange={(e) => handleUpdateField('category_id', Number(e.target.value))}
                    disabled={isTeknisi}
                    className={`flex-1 min-w-0 py-1.5 px-2 -ml-2 rounded-lg border border-transparent text-[13.5px] font-semibold text-gray-900 bg-transparent hover:bg-gray-50 hover:border-gray-200 outline-none transition-all focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] truncate ${isTeknisi ? 'opacity-90 cursor-not-allowed hover:bg-transparent hover:border-transparent appearance-none' : 'cursor-pointer'}`}
                  >
                    <option value="">-- Pilih --</option>
                    {categories.map(cat => {
                      let path = cat.name;
                      let curr = cat;
                      while(curr.parent_id) {
                        curr = categories.find(c => c.id === curr.parent_id);
                        if (curr) path = curr.name + ' / ' + path;
                      }
                      return <option key={cat.id} value={cat.id}>{path}</option>;
                    })}
                  </select>
                </div>
              </div>

              {/* Kolom 2 */}
              <div className="flex flex-col divide-y divide-gray-100">
                <div className="flex items-center px-6 py-4 hover:bg-gray-50/50 transition-colors">
                  <span className="w-28 text-[13.5px] font-medium text-gray-500 shrink-0">Pelapor</span>
                  <span className="text-[13.5px] font-semibold text-gray-900 flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    {ticket.phone ? (
                      <Link href={`/dashboard/administrasi/users/${encodeURIComponent(ticket.phone)}`} className="hover:text-blue-600 hover:underline">
                        {requester}
                      </Link>
                    ) : (
                      requester
                    )}
                  </span>
                </div>
                <div className="flex items-center px-6 py-4 hover:bg-gray-50/50 transition-colors">
                  <span className="w-28 text-[13.5px] font-medium text-gray-500 shrink-0">No HP</span>
                  <span className="text-[13.5px] font-semibold text-gray-900 flex items-center gap-1.5">
                    {ticket.phone || '-'}
                    {ticket.phone && (
                      <a href={`https://wa.me/${ticket.phone.replace(/\D/g, '').replace(/^0/, '62')}`} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                        <svg className="w-4 h-4 text-green-500 cursor-pointer" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"></path></svg>
                      </a>
                    )}
                  </span>
                </div>
                <div className="flex items-center px-6 py-4 hover:bg-gray-50/50 transition-colors">
                  <span className="w-28 text-[13.5px] font-medium text-gray-500 shrink-0">Unit/Dep.</span>
                  <span className="text-[13.5px] font-semibold text-gray-900">{ticket.unit || ticket.reporter_type || '-'}</span>
                </div>
                <div className="flex items-center px-6 py-4 hover:bg-gray-50/50 transition-colors">
                  <span className="w-28 text-[13.5px] font-medium text-gray-500 shrink-0">Created</span>
                  <span className="text-[13.5px] font-semibold text-gray-900">{formatDate(ticket.created_at)}</span>
                </div>
                <div className="flex items-center px-6 py-4 hover:bg-gray-50/50 transition-colors">
                  <span className="w-28 text-[13.5px] font-medium text-gray-500 shrink-0">Updated</span>
                  <span className="text-[13.5px] font-semibold text-gray-900">{formatDate(ticket.updated_at || ticket.created_at)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ISI TIKET SECTION */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
              <h2 className="text-[16px] font-bold text-gray-900">Isi Tiket</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              
              <div className="md:col-span-2 p-6 flex flex-col gap-6">
                <div>
                  <h4 className="text-[12.5px] font-bold text-gray-400 uppercase tracking-wider mb-2">Subjek</h4>
                  <div className="text-[16px] font-bold text-gray-900">{ticket.subject}</div>
                </div>
                <div>
                  <h4 className="text-[12.5px] font-bold text-gray-400 uppercase tracking-wider mb-2">Deskripsi</h4>
                  <div className="text-[14.5px] text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {ticket.description || '-'}
                  </div>
                </div>
              </div>

              <div className="md:col-span-1 p-6 bg-gray-50/50 flex flex-col gap-4">
                <h4 className="text-[12.5px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                  Lampiran
                </h4>
                
                {(!ticket.attachment && (!ticket.attachments || ticket.attachments.length === 0)) ? (
                  <div className="text-[13px] text-gray-500 italic bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
                    Tidak ada lampiran
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {/* Single Attachment (if any) */}
                    {ticket.attachment && (
                      <a href={ticket.attachment} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full overflow-hidden rounded-xl border border-gray-200 hover:border-[#1E3A8A] hover:shadow-md transition-all bg-white group p-2">
                        {/\.(jpeg|jpg|gif|png|webp)$/i.test(ticket.attachment) ? (
                          <div className="w-14 h-14 shrink-0 bg-gray-50 rounded-lg overflow-hidden relative">
                            <img src={ticket.attachment} alt="Lampiran" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                        ) : (
                          <div className="w-14 h-14 shrink-0 bg-blue-50 rounded-lg flex items-center justify-center text-[#1E3A8A]">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                          </div>
                        )}
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="truncate text-[12.5px] font-bold text-gray-800">
                            {ticket.attachment.split('/').pop() || 'Lampiran'}
                          </div>
                          <div className="text-[11px] text-gray-400 mt-0.5">Lihat file</div>
                        </div>
                      </a>
                    )}
                    
                    {/* Multiple Attachments (ticket_attachments) */}
                    {ticket.attachments && ticket.attachments.map((att, idx) => (
                      <a key={idx} href={att.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full overflow-hidden rounded-xl border border-gray-200 hover:border-[#1E3A8A] hover:shadow-md transition-all bg-white group p-2">
                        {/\.(jpeg|jpg|gif|png|webp)$/i.test(att.file_url) ? (
                          <div className="w-14 h-14 shrink-0 bg-gray-50 rounded-lg overflow-hidden relative">
                            <img src={att.file_url} alt={att.file_name || 'Lampiran'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                        ) : (
                          <div className="w-14 h-14 shrink-0 bg-blue-50 rounded-lg flex items-center justify-center text-[#1E3A8A]">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                          </div>
                        )}
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="truncate text-[12.5px] font-bold text-gray-800">
                            {att.file_name || att.file_url.split('/').pop() || 'Lampiran'}
                          </div>
                          <div className="text-[11px] text-gray-400 mt-0.5">Lihat file</div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
              
            </div>
          </div>



      </div>
      
      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#1E3A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-[17px] font-bold text-gray-900 mb-2">{confirmModal.title}</h3>
              <p className="text-[14px] text-gray-600 leading-relaxed">{confirmModal.message}</p>
            </div>
            <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                className="px-4 py-2.5 text-[13px] font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-200 bg-gray-100 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setConfirmModal(prev => ({ ...prev, isOpen: false }));
                  confirmModal.onConfirm();
                }}
                className="px-4 py-2.5 text-[13px] font-bold text-white bg-[#1E3A8A] hover:bg-blue-900 rounded-xl transition-colors shadow-sm flex items-center justify-center"
              >
                Ya, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <div className="fixed top-24 right-8 flex flex-col gap-3 z-50 pointer-events-none">
          {toasts.map(toast => (
              <div key={toast.id} className={`px-5 py-3.5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border text-[13.5px] font-bold animate-in slide-in-from-right-8 fade-in duration-300 pointer-events-auto flex items-center gap-2 ${
                  toast.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
              }`}>
                  {toast.type === 'success' && <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                  {toast.message}
              </div>
          ))}
      </div>
    </div>
  );
}
