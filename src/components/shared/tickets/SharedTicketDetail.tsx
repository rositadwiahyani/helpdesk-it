'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchClient } from '@/lib/apiClient';
import StatusBadge from '@/components/admin/tickets/StatusBadge';
import PriorityBadge from '@/components/admin/tickets/PriorityBadge';

type Ticket = {
  id: string;
  ticket_num?: string;
  ticket_number?: string;
  subject?: string;
  description?: string;
  status?: string;
  priority?: string;
  category?: { name?: string };
  dept?: { name?: string };
  tech?: { name?: string };
  reporter_name?: string;
  phone?: string;
  reporter_type?: string;
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
  const [activeTab, setActiveTab] = useState<'thread' | 'tasks'>('thread');
  const [formTab, setFormTab] = useState<'note' | 'reply'>('note');
  const [messageText, setMessageText] = useState('');
  const [ticketStatusSelect, setTicketStatusSelect] = useState<string>('Open');

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
          setTicketStatusSelect(foundTicket.status || 'Open');
        }

        const messagesResponse = await fetchClient(`/admin/tickets/${ticketId}/messages`).catch(() => ({ data: [] }));
        setMessages(Array.isArray(messagesResponse.data) ? messagesResponse.data : []);
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

      if (ticketStatusSelect && ticketStatusSelect !== ticket.status) {
        await fetchClient(`/admin/tickets/${ticketId}`, {
          method: 'PATCH',
          body: JSON.stringify({ status: ticketStatusSelect })
        });
      }

      setMessageText('');
      setFormTab('reply');
      await new Promise((resolve) => setTimeout(resolve, 100));
      const refreshResponse = await fetchClient('/admin/tickets');
      const tickets: Ticket[] = Array.isArray(refreshResponse.data) ? refreshResponse.data : [];
      const refreshedTicket = tickets.find((item) => item.id === ticketId);
      if (refreshedTicket) {
        setTicket(refreshedTicket);
        setTicketStatusSelect(refreshedTicket.status || 'Open');
      }
      const messagesResponse = await fetchClient(`/admin/tickets/${ticketId}/messages`).catch(() => ({ data: [] }));
      setMessages(Array.isArray(messagesResponse.data) ? messagesResponse.data : []);
      alert(formTab === 'note' ? 'Internal Note berhasil disimpan!' : 'Balasan berhasil dikirim!');
    } catch (error) {
      console.error('Failed to submit action:', error);
      alert('Gagal mengirim pesan. Silakan coba lagi.');
    }
  };

  const formatDate = (value?: string) =>
    value ? new Date(value).toLocaleString('id-ID') : '-';

  const ticketNumber = ticket?.ticket_number || ticket?.ticket_num || '–';
  const department = ticket?.category?.name || ticket?.dept?.name || '-';
  const assignedTo = ticket?.tech?.name || '-';
  const requester = ticket?.reporter_name || '-';
  const email = ticket?.phone || '-';
  const source = ticket?.reporter_type || '-';

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse p-6">
        <div className="h-6 w-1/4 bg-[var(--line-dark)] rounded"></div>
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
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300 p-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[13px] font-bold text-[var(--text-dim)]">
          <Link href="/dashboard" className="hover:text-[var(--ink)] transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-[var(--ink)]">Ticket Detail</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line-dark)] pb-4">
          <div className="flex items-center gap-3">
            <span className="text-[20px] font-bold text-[var(--gold-soft)] font-mono">{ticketNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="p-2 bg-white border border-[var(--line-dark)] rounded-lg text-gray-500 hover:text-[var(--ink)] hover:bg-[var(--paper-2)] transition-all"
            >
              Print
            </button>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-['Fraunces'] font-bold text-[var(--ink)] mt-1">
          {ticket.subject || 'No Subject'}
        </h1>
      </div>

      <div className="bg-white rounded-2xl border border-[var(--line)] shadow-sm overflow-hidden flex flex-col p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          <div className="grid grid-cols-[120px_1fr] items-center gap-y-3.5 text-[13.5px]">
            <span className="font-bold text-[var(--text-dim)]">Status:</span>
            <div><StatusBadge status={ticket.status || 'Open'} /></div>

            <span className="font-bold text-[var(--text-dim)]">Priority:</span>
            <div><PriorityBadge priority={ticket.priority || 'Medium'} /></div>

            <span className="font-bold text-[var(--text-dim)]">Department:</span>
            <span className="font-semibold text-[var(--ink)] truncate">{department}</span>

            <span className="font-bold text-[var(--text-dim)]">Create Date:</span>
            <span className="font-mono text-gray-600">{formatDate(ticket.created_at)}</span>

            <span className="font-bold text-[var(--text-dim)]">Assigned To:</span>
            <span className="font-semibold text-[var(--gold-soft)]">{assignedTo}</span>

            <span className="font-bold text-[var(--text-dim)]">Source:</span>
            <span className="font-medium text-[var(--ink)]">{source}</span>
          </div>

          <div className="grid grid-cols-[120px_1fr] items-center gap-y-3.5 text-[13.5px] border-t md:border-t-0 border-[var(--line-dark)] pt-4 md:pt-0">
            <span className="font-bold text-[var(--text-dim)]">Requester:</span>
            <span className="font-bold text-[var(--ink)] flex items-center gap-1">👤 {requester}</span>

            <span className="font-bold text-[var(--text-dim)]">Email:</span>
            <span className="font-semibold text-[var(--ink)] truncate">{email}</span>

            <span className="font-bold text-[var(--text-dim)]">Updated At:</span>
            <span className="font-mono text-gray-600">{formatDate(ticket.updated_at)}</span>

            <span className="font-bold text-[var(--text-dim)]">Category:</span>
            <span className="font-semibold text-[var(--ink)]">{ticket.category?.name || '-'}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-[var(--line)] bg-[var(--paper-2)]/30 px-4 pt-4 rounded-t-2xl border border-b-0">
        <button
          onClick={() => setActiveTab('thread')}
          className={`px-5 py-2.5 text-[13.5px] font-bold rounded-t-lg border border-b-0 transition-colors ${
            activeTab === 'thread'
              ? 'bg-white border-[var(--line)] text-[var(--ink)]'
              : 'bg-transparent border-transparent text-[var(--text-dim)] hover:text-[var(--ink)] hover:bg-[var(--line-dark)]'
          }`}
          style={activeTab === 'thread' ? { marginBottom: '-1px' } : {}}
        >
          Ticket Thread ({messages.length})
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-5 py-2.5 text-[13.5px] font-bold rounded-t-lg border border-b-0 transition-colors ${
            activeTab === 'tasks'
              ? 'bg-white border-[var(--line)] text-[var(--ink)]'
              : 'bg-transparent border-transparent text-[var(--text-dim)] hover:text-[var(--ink)] hover:bg-[var(--line-dark)]'
          }`}
          style={activeTab === 'tasks' ? { marginBottom: '-1px' } : {}}
        >
          Tasks
        </button>
      </div>

      {activeTab === 'tasks' ? (
        <div className="bg-white rounded-2xl border border-[var(--line)] p-12 text-center text-sm font-bold text-[var(--text-dim)] shadow-sm">
          Belum ada sub-tugas (tasks) untuk tiket ini.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {messages.length === 0 ? (
            <div className="rounded-2xl border border-[var(--line)] bg-white p-6 text-sm text-[var(--text-dim)]">
              Belum ada balasan atau catatan untuk tiket ini.
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="rounded-2xl border overflow-hidden shadow-sm transition-all bg-blue-50/20 border-blue-100">
                <div className="px-5 py-3 border-b flex items-center justify-between gap-4 text-xs font-bold text-[var(--text-dim)] bg-blue-100/60">
                  <div className="flex items-center gap-2">
                    <span>👤 {msg.sender_name || (msg.sender_type === 'USER' ? 'User' : 'Staff')}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-800">
                      {msg.sender_type ? msg.sender_type.toUpperCase() : 'MESSAGE'}
                    </span>
                  </div>
                  <span className="font-mono">{formatDate(msg.created_at)}</span>
                </div>
                <div className="px-5 py-4 text-sm text-[var(--ink)]">
                  {msg.message}
                </div>
              </div>
            ))
          )}

          <div className="bg-white rounded-2xl border border-[var(--line)] p-6">
            <h2 className="text-lg font-semibold mb-4">Tambah balasan / catatan internal</h2>
            <form onSubmit={handleSubmitAction} className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-[1fr_160px]">
                <textarea
                  className="w-full min-h-[140px] rounded-xl border border-[var(--line)] bg-white p-4 text-sm text-[var(--ink)] outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
                  value={messageText}
                  onChange={(event) => setMessageText(event.target.value)}
                  placeholder="Tulis catatan atau balasan..."
                />
                <div className="flex flex-col gap-3">
                  <select
                    className="w-full rounded-xl border border-[var(--line)] bg-white p-3 text-sm"
                    value={ticketStatusSelect}
                    onChange={(event) => setTicketStatusSelect(event.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="Verified">Verified</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  <button
                    type="submit"
                    className="rounded-xl bg-[var(--gold)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#b68826]"
                  >
                    Kirim Balasan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
