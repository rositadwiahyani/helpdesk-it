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
};

type Message = {
  id: string;
  sender_type?: string;
  sender_name?: string;
  message?: string;
  created_at?: string;
};

export default function SharedTicketDetail({ ticketId }: { ticketId: string }) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'notes' | 'chatlog'>('notes');
  const [messageText, setMessageText] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [quickReplies, setQuickReplies] = useState<any[]>([]);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  
  // Disposisi state
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [attachments, setAttachments] = useState<any[]>([]);
  const [selectedDeptId, setSelectedDeptId] = useState<string>('');
  const [selectedTechId, setSelectedTechId] = useState<string>('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [toasts, setToasts] = useState<{id: number, message: string, type: 'success' | 'error'}[]>([]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
  };

  useEffect(() => {
    async function loadTicket() {
      setIsLoading(true);

      try {
        const listResponse = await fetchClient('/admin/tickets');
        const tickets: Ticket[] = Array.isArray(listResponse.data) ? listResponse.data : [];
        let foundTicket = tickets.find(
          (item) => String(item.id) === String(ticketId) || item.ticket_num === ticketId || item.ticket_number === ticketId
        );

        if (!foundTicket) {
          console.warn('Ticket not found in list, unable to resolve by ID or ticket number.');
        }

        if (foundTicket) {
          setTicket(foundTicket);
        }

        const messagesResponse = await fetchClient(`/admin/tickets/${ticketId}/messages`).catch(() => ({ data: [] }));
        setMessages(Array.isArray(messagesResponse.data) ? messagesResponse.data : []);

        // Fetch categories to build full path
        const catsResponse = await fetchClient('/admin/categories').catch(() => ({ data: [] }));
        if (Array.isArray(catsResponse.data)) {
          setCategories(catsResponse.data);
        }

        // Fetch quick replies
        const qrResponse = await fetchClient('/admin/quick-replies').catch(() => []);
        if (Array.isArray(qrResponse)) {
          setQuickReplies(qrResponse);
        }

        // Fetch technicians for disposisi and attachments
        import('@/lib/supabase').then(({ supabase }) => {
          supabase.from('staff_profiles').select('id, name, dept_id').in('role', ['teknisi', 'agent']).then(({ data }) => {
            if (data) setTechnicians(data);
          });
          supabase.from('departments').select('id, name').order('name').then(({ data }) => {
            if (data) setDepartments(data);
          });
          supabase.from('ticket_attachments').select('*').eq('ticket_id', foundTicket.id).then(({ data }) => {
            if (data) setAttachments(data);
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

  const handleSubmitAction = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!ticket || !messageText.trim()) {
      return;
    }

    try {
      await fetchClient(`/admin/tickets/${ticketId}/messages`, {
        method: 'POST',
        body: JSON.stringify({ message: messageText })
      });

      setMessageText('');
      
      // Refresh messages
      const messagesResponse = await fetchClient(`/admin/tickets/${ticketId}/messages`).catch(() => ({ data: [] }));
      setMessages(Array.isArray(messagesResponse.data) ? messagesResponse.data : []);
      showToast('Catatan internal berhasil dikirim!', 'success');
    } catch (error) {
      console.error('Failed to submit action:', error);
      showToast('Gagal mengirim catatan. Silakan coba lagi.', 'error');
    }
  };

  const handleDisposisi = async () => {
    if (!selectedTechId) return;
    const tech = technicians.find(t => t.id === selectedTechId);
    if (!tech) return;

    setIsAssigning(true);
    try {
      await fetchClient(`/admin/tickets/${ticketId}`, {
        method: 'PATCH',
        body: JSON.stringify({ 
          tech_id: tech.id, 
          dept_id: tech.dept_id,
          status: 'IN PROGRESS'
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

  const sendQuickReply = async (reply: any) => {
    if (!ticket) return;
    if (!confirm('Pesan ini akan dikirimkan langsung ke WhatsApp pelapor. Lanjutkan?')) return;
    
    try {
      // Create a ticket message as internal log too
      await fetchClient(`/admin/tickets/${ticketId}/messages`, {
        method: 'POST',
        body: JSON.stringify({ message: `[QUICK REPLY SENT]\n${reply.content}` })
      });

      // Send to WA via webhook (assuming the backend API sends it, or we call wasender directly)
      // The current backend usually sends WA automatically on status change or we can do it here
      await fetchClient(`/admin/tickets/${ticketId}/messages/wa`, {
        method: 'POST',
        body: JSON.stringify({ message: reply.content, phone: ticket.phone })
      }).catch(e => console.warn('WA Webhook fail (expected if not implemented yet)', e));

      setShowQuickReplies(false);
      showToast('Jawaban cepat berhasil dikirim ke WA pelapor!', 'success');
      
      // Refresh messages
      const messagesResponse = await fetchClient(`/admin/tickets/${ticketId}/messages`).catch(() => ({ data: [] }));
      setMessages(Array.isArray(messagesResponse.data) ? messagesResponse.data : []);
    } catch (error) {
      console.error('Failed to send quick reply:', error);
      showToast('Gagal mengirim jawaban cepat.', 'error');
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    const isResolving = newStatus === 'WAITING CONFIRMATION' || newStatus === 'RESOLVED';
    if (!confirm(`Apakah Anda yakin ingin ${isResolving ? 'menyelesaikan' : 'membuka kembali'} tiket ini?`)) return;

    setIsUpdatingStatus(true);
    try {
      await fetchClient(`/admin/tickets/${ticketId}`, {
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
  };

  const handleUpdateField = async (field: string, value: string | number) => {
    if (!confirm(`Apakah Anda yakin ingin mengubah data ini?`)) return;
    try {
      await fetchClient(`/admin/tickets/${ticketId}`, {
        method: 'PATCH',
        body: JSON.stringify({ [field]: value })
      });
      setTicket((prev) => prev ? { ...prev, [field]: value } : null);
      showToast(`Berhasil memperbarui ${field}!`, 'success');
    } catch (error) {
      console.error(`Gagal update ${field}:`, error);
      showToast(`Gagal memperbarui ${field}.`, 'error');
    }
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
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">{displayStatus}</span>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200">
            <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">{ticket.priority}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-2">
        {/* LEFT COLUMN: Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* INFORMASI TIKET */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-[16px] font-bold text-gray-900 mb-5">Informasi Tiket</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              
              <div className="flex flex-col gap-4">
                <div className="flex items-start">
                  <span className="w-28 text-[13.5px] font-medium text-gray-500 shrink-0">Status</span>
                  <span className="text-[13.5px] font-bold text-orange-600 uppercase">{displayStatus}</span>
                </div>
                <div className="flex items-start">
                  <span className="w-28 text-[13.5px] font-medium text-gray-500 shrink-0">Department</span>
                  <span className="text-[13.5px] font-semibold text-gray-900">{ticket.dept?.name || '-'}</span>
                </div>
                <div className="flex items-start">
                  <span className="w-28 text-[13.5px] font-medium text-gray-500 shrink-0">Assigned To</span>
                  <span className="text-[13.5px] font-semibold text-gray-900">{ticket.tech?.name ? ticket.tech.name : 'Not Assigned'}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-28 text-[13.5px] font-medium text-gray-500 shrink-0">Priority</span>
                  <select 
                    value={ticket.priority || ''}
                    onChange={(e) => handleUpdateField('priority', e.target.value)}
                    className="flex-1 py-1 px-2 -ml-2 rounded-md border-transparent text-[13.5px] font-semibold text-gray-900 bg-transparent hover:bg-gray-50 outline-none cursor-pointer transition-colors focus:ring-2 focus:ring-gray-200"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <span className="w-28 text-[13.5px] font-medium text-gray-500 shrink-0">Category</span>
                  <select
                    value={ticket.category_id || ''}
                    onChange={(e) => handleUpdateField('category_id', Number(e.target.value))}
                    className="flex-1 py-1 px-2 -ml-2 rounded-md border-transparent text-[13.5px] font-semibold text-gray-900 bg-transparent hover:bg-gray-50 outline-none cursor-pointer transition-colors focus:ring-2 focus:ring-gray-200"
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

              <div className="flex flex-col gap-4">
                <div className="flex items-start">
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
                <div className="flex items-start">
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
                <div className="flex items-start">
                  <span className="w-28 text-[13.5px] font-medium text-gray-500 shrink-0">Unit/Dep.</span>
                  <span className="text-[13.5px] font-semibold text-gray-900">{ticket.unit || ticket.reporter_type || '-'}</span>
                </div>
                <div className="flex items-start">
                  <span className="w-28 text-[13.5px] font-medium text-gray-500 shrink-0">Created</span>
                  <span className="text-[13.5px] font-semibold text-gray-900">{formatDate(ticket.created_at)}</span>
                </div>
                <div className="flex items-start">
                  <span className="w-28 text-[13.5px] font-medium text-gray-500 shrink-0">Updated</span>
                  <span className="text-[13.5px] font-semibold text-gray-900">{formatDate(ticket.updated_at || ticket.created_at)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* TABS SECTION */}
          <div className="flex flex-col gap-0">
            <div className="flex items-center gap-1 border-b border-gray-300">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-6 py-3.5 text-[14px] font-bold rounded-t-xl transition-all border-b-4 ${
                  activeTab === 'notes'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Notes ({messages.length})
              </button>
              <button
                onClick={() => setActiveTab('chatlog')}
                className={`px-6 py-3.5 text-[14px] font-bold rounded-t-xl transition-all border-b-4 ${
                  activeTab === 'chatlog'
                    ? 'border-blue-700 text-blue-700'
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Chat Log
              </button>
            </div>
            
            {activeTab === 'notes' && (
              <div className="bg-white rounded-b-2xl border border-t-0 border-gray-200 p-6 flex flex-col gap-6 shadow-sm">
                <div className="flex flex-col gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-200 max-h-[400px] overflow-y-auto">
                  {messages.length === 0 ? (
                    <div className="text-center p-8 text-sm text-gray-500">Belum ada catatan internal.</div>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg.id} className="flex flex-col self-end items-end max-w-[85%] z-10 w-full">
                        <div className="px-5 py-4 rounded-2xl shadow-sm text-[14.5px] text-[#111b21] bg-[#e6ffed] border border-[#b7ebc5] whitespace-pre-wrap leading-relaxed w-full">
                          <div className="font-bold text-[13px] text-green-900 mb-2 flex items-center justify-between gap-2 border-b border-green-200 pb-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-green-200/60 text-green-800 tracking-wide">
                              CATATAN INTERNAL
                            </span>
                            <span className="flex items-center gap-1.5">{msg.tech?.name || msg.sender_name || 'Staff'} <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></span>
                          </div>
                          {msg.message}
                        </div>
                        <span className="text-[11px] font-semibold text-gray-400 mt-1.5 pr-1">{formatDate(msg.created_at)}</span>
                      </div>
                    ))
                  )}
                </div>

                <div className="border-t border-gray-200 pt-5 mt-1">
                  <h2 className="text-[14px] font-bold mb-3 text-gray-700">Tambah Catatan Internal</h2>
                  <form onSubmit={handleSubmitAction} className="space-y-4">
                    <textarea
                      className="w-full min-h-[80px] max-h-[200px] rounded-xl border border-gray-300 bg-gray-50/50 p-4 text-[14.5px] text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                      value={messageText}
                      onChange={(event) => setMessageText(event.target.value)}
                      placeholder="Ketik catatan aktivitas atau progress perbaikan di sini..."
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!messageText.trim()}
                        className="rounded-xl bg-[#22c55e] px-6 py-3 text-[14px] font-bold text-white transition hover:bg-green-600 shadow-sm disabled:opacity-50 disabled:hover:bg-[#22c55e] flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                        Kirim Catatan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'chatlog' && (
              <div className="bg-[#e5ddd5] rounded-b-2xl border border-t-0 border-gray-200 p-6 flex flex-col gap-5 shadow-inner min-h-[400px]" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundRepeat: 'repeat' }}>
                <div className="flex flex-col self-start items-start max-w-[90%] z-10 w-full">
                  <div className="px-5 py-4 rounded-2xl shadow-sm text-[14.5px] text-[#111b21] bg-white rounded-tl-none border border-gray-100 whitespace-pre-wrap leading-relaxed relative w-full">
                    <div className="font-bold text-[13px] text-gray-800 mb-2 flex items-center gap-2 border-b border-gray-100 pb-2">
                      <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> {requester}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-gray-100 text-gray-500 tracking-wide">PELAPOR</span>
                    </div>
                    <span className="font-extrabold text-gray-900">Subjek: {ticket.subject}</span>
                    <br/><br/>
                    <span className="font-bold text-gray-700">Deskripsi:</span>
                    <br/>
                    {ticket.description || '-'}
                    {attachments.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <span className="font-bold text-gray-700 text-[13px] mb-2 block">Lampiran:</span>
                        <div className="flex flex-wrap gap-3">
                          {attachments.map((att, idx) => (
                            <a
                              key={idx}
                              href={att.file_url}
                              target="_blank"
                              rel="noreferrer"
                              className="group block relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 hover:border-blue-300 transition-colors cursor-zoom-in shadow-sm w-[150px] h-[150px]"
                            >
                              <img
                                src={att.file_url}
                                alt={att.file_name || 'Lampiran'}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  // Fallback for non-image files
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                                  e.currentTarget.parentElement?.insertAdjacentHTML('beforeend', '<div class="text-center p-3"><svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><span class="text-[10px] text-gray-500 break-all line-clamp-2 leading-tight">' + (att.file_name || 'File') + '</span></div>');
                                }}
                              />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-gray-500 mt-2 px-1.5 py-0.5 bg-white/80 rounded-md backdrop-blur-sm shadow-sm">{formatDate(ticket.created_at)}</span>
                </div>
                <div className="mt-auto pt-6 flex justify-center w-full">
                  <div className="px-4 py-1.5 bg-[#d4c8b8] text-gray-600 rounded-full text-[11px] font-bold tracking-widest shadow-sm">
                    END OF LOG
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* DISPOSISI CARD */}
          {isWaitingVerification && (
            <div className="bg-[#fffdf0] rounded-2xl border border-yellow-300 p-5 shadow-sm flex flex-col gap-4">
              <div className="flex gap-3 items-start">
                <div className="mt-0.5 p-1.5 bg-yellow-100 text-yellow-600 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-yellow-900">Tiket Belum Ditugaskan</h3>
                  <p className="text-[12px] text-yellow-800 mt-1 leading-relaxed">Pilih departemen dan teknisi untuk memproses tiket ini.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-1">
                <select
                  value={selectedDeptId}
                  onChange={(e) => {
                    setSelectedDeptId(e.target.value);
                    setSelectedTechId(''); // reset teknisi saat departemen berubah
                  }}
                  className="w-full rounded-xl border border-yellow-300 bg-white p-3 text-[13.5px] font-semibold text-yellow-900 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                >
                  <option value="">-- Pilih Departemen --</option>
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>

                {selectedDeptId && (
                  <select
                    value={selectedTechId}
                    onChange={(e) => setSelectedTechId(e.target.value)}
                    className="w-full rounded-xl border border-yellow-300 bg-white p-3 text-[13.5px] font-semibold text-yellow-900 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                  >
                    <option value="">-- Pilih Teknisi --</option>
                    {technicians.filter(t => String(t.dept_id) === String(selectedDeptId)).map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                )}
                <button
                  onClick={handleDisposisi}
                  disabled={!selectedTechId || isAssigning}
                  className="w-full py-3 bg-[#eab308] hover:bg-[#ca8a04] disabled:opacity-50 text-white text-[13.5px] font-bold rounded-xl transition-colors shadow-sm"
                >
                  {isAssigning ? 'Memproses...' : 'DISPOSISI SEKARANG'}
                </button>
              </div>
            </div>
          )}

          {/* JAWABAN CEPAT CARD */}
          {(ticket.status === 'WAITING VERIFICATION' || ticket.status === 'IN PROGRESS' || ticket.status === 'Diproses') && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col gap-4 relative">
              <div className="flex gap-3 items-start">
                <div className="mt-0.5 p-1.5 bg-yellow-100 text-yellow-600 rounded-lg">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-900">Jawaban Cepat (Quick Reply)</h3>
                    <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">Pilih template pesan untuk dikirim langsung ke WhatsApp pelapor.</p>
                  </div>
                  <button 
                    onClick={() => setShowQuickReplies(!showQuickReplies)}
                    className="p-2 text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded-lg font-bold text-xs"
                  >
                    {showQuickReplies ? 'TUTUP' : 'PILIH TEMPLATE'}
                  </button>
                </div>
              </div>

              {showQuickReplies && (
                <div className="flex flex-col gap-2 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-200 max-h-64 overflow-y-auto">
                  {quickReplies.length === 0 ? (
                    <div className="text-center text-xs text-slate-500 p-2">Belum ada template. Buat di Dashboard Admin.</div>
                  ) : (
                    quickReplies.map(reply => (
                      <div key={reply.id} className="bg-white p-3 rounded-lg border border-slate-200 hover:border-yellow-400 hover:shadow-sm cursor-pointer transition-all flex flex-col gap-1" onClick={() => sendQuickReply(reply)}>
                        <span className="font-bold text-xs text-slate-800">{reply.title}</span>
                        <span className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{reply.content}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* TINDAKAN TIKET CARD */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col gap-4">
            <div className="flex gap-3 items-start">
              <div className="mt-0.5 p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-gray-900">
                  {ticket.status === 'RESOLVED' || ticket.status === 'CLOSED' ? 'Buka Kembali Tiket' : 'Selesaikan Tiket'}
                </h3>
                <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">
                  {ticket.status === 'RESOLVED' || ticket.status === 'CLOSED' ? 'Buka kembali tiket ini jika masih ada kendala yang belum terselesaikan.' : 'Tandai tiket ini sebagai selesai (RESOLVED) jika perbaikan sudah tuntas dilakukan.'}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-1">
              {ticket.status === 'RESOLVED' || ticket.status === 'CLOSED' || ticket.status === 'WAITING CONFIRMATION' ? (
                <button
                  onClick={() => handleUpdateStatus(ticket.tech_id || ticket.tech?.name ? 'IN PROGRESS' : 'OPEN')}
                  disabled={isUpdatingStatus}
                  className="w-full py-3 bg-white border-2 border-blue-600 text-blue-700 hover:bg-blue-50 disabled:opacity-50 text-[13.5px] font-bold rounded-xl transition-colors shadow-sm"
                >
                  {isUpdatingStatus ? 'Memproses...' : 'BUKA KEMBALI (REOPEN)'}
                </button>
              ) : (
                <button
                  onClick={() => handleUpdateStatus('WAITING CONFIRMATION')}
                  disabled={isUpdatingStatus}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-[13.5px] font-bold rounded-xl transition-colors shadow-sm"
                >
                  {isUpdatingStatus ? 'Memproses...' : 'TANDAI SELESAI'}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
      
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
