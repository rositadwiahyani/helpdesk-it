'use client';
import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { fetchClient } from '@/lib/apiClient';
import StatusBadge from '@/components/admin/tickets/StatusBadge';
import PriorityBadge from '@/components/admin/tickets/PriorityBadge';

export default function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const ticketId = unwrappedParams.id;
  const [ticket, setTicket] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // States for interaction
  const [activeTab, setActiveTab] = useState<'thread' | 'tasks'>('thread');
  const [formTab, setFormTab] = useState<'note' | 'reply'>('note');
  const [noteTitle, setNoteTitle] = useState('');
  const [messageText, setMessageText] = useState('');
  const [ticketStatusSelect, setTicketStatusSelect] = useState<string>('Open');

  useEffect(() => {
    fetchTicket();
  }, [ticketId]);

  const fetchTicket = async () => {
    setIsLoading(true);
    try {
      // Temporarily fetch all tickets and find the one we need since we don't have a direct endpoint by ID
      const { data } = await fetchClient('/admin/tickets');
      const foundTicket = (data || []).find((t: any) => t.id === ticketId);
      
      if (foundTicket) {
        // GET Messages
        const msgRes = await fetchClient(`/admin/tickets/${ticketId}/messages`).catch(() => ({ data: [] }));
        
        const formattedTicket = {
          id: foundTicket.id,
          ticket_num: foundTicket.ticket_number,
          subject: foundTicket.subject,
          status: foundTicket.status,
          priority: foundTicket.priority || 'Medium',
          department: foundTicket.departments?.name || '-',
          createdDate: new Date(foundTicket.created_at).toLocaleString('id-ID'),
          assignedTo: foundTicket.profiles?.full_name || '-',
          description: foundTicket.description,
          category: foundTicket.help_topics?.topic_name || '-',
          attachment: foundTicket.attachment_url,
          creatorInfo: {
            name: foundTicket.profiles?.full_name || 'System',
            type: 'Staf',
            email: '-',
            phone: '-'
          }
        };

        setTicket(formattedTicket);
        setTicketStatusSelect(formattedTicket.status);
        setMessages(msgRes.data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    try {
      // POST message
      await fetchClient(`/admin/tickets/${ticketId}/messages`, {
        method: 'POST',
        body: JSON.stringify({ message: messageText })
      });

      // If status changed
      if (ticketStatusSelect !== ticket.status) {
        await fetchClient(`/admin/tickets/${ticketId}`, {
          method: 'PATCH',
          body: JSON.stringify({ status: ticketStatusSelect })
        });
      }

      setMessageText('');
      setNoteTitle('');
      alert(formTab === 'note' ? 'Internal Note berhasil disimpan!' : 'Balasan berhasil dikirim!');
      fetchTicket();
    } catch (error: any) {
      alert('Gagal: ' + error.message);
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center">Loading ticket detail...</div>;
  }

  if (!ticket) {
    return <div className="p-10 text-center">Tiket tidak ditemukan.</div>;
  }

  return (
    <div className="w-full h-full text-slate-800 font-sans p-6 md:p-10">
      {/* (Omitted long UI for brevity, keeping standard structure) */}
      <div className="mb-4">
        <Link href="/dashboard/teknisi" className="text-blue-600 hover:underline">
          &larr; Kembali ke Dashboard
        </Link>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{ticket.subject}</h1>
            <p className="text-slate-500 mt-1">#{ticket.ticket_num} &bull; {ticket.createdDate}</p>
          </div>
          <div className="flex gap-2">
            <PriorityBadge priority={ticket.priority} />
            <StatusBadge status={ticket.status} />
          </div>
        </div>
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 mb-6 whitespace-pre-wrap">
          {ticket.description}
        </div>
        <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Balasan / Catatan Internal</h2>
            <textarea 
              className="w-full border rounded-lg p-3" 
              rows={4} 
              value={messageText} 
              onChange={e => setMessageText(e.target.value)} 
              placeholder="Tulis pesan..."
            />
            <div className="mt-4 flex gap-4">
              <select className="border rounded px-3 py-2" value={ticketStatusSelect} onChange={e => setTicketStatusSelect(e.target.value)}>
                <option value="Open">Open</option>
                <option value="Verified">Verified</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
              <button onClick={handleSendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
                Kirim
              </button>
            </div>
            
            <div className="mt-8 space-y-4">
              {messages.map((m: any) => (
                <div key={m.id} className="p-4 border rounded-lg bg-gray-50">
                  <p className="text-sm font-semibold">{m.sender_name} ({m.sender_role})</p>
                  <p className="mt-1">{m.message}</p>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}
