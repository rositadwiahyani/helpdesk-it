'use client';
import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import { DUMMY_TICKETS, Ticket, TicketMessage, TicketStatus } from '@/lib/mock/tickets';
import StatusBadge from '@/components/admin/tickets/StatusBadge';
import PriorityBadge from '@/components/admin/tickets/PriorityBadge';

export default function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const ticketId = unwrappedParams.id;
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // States for interaction
  const [activeTab, setActiveTab] = useState<'thread' | 'tasks'>('thread');
  const [formTab, setFormTab] = useState<'note' | 'reply'>('note');
  const [noteTitle, setNoteTitle] = useState('');
  const [messageText, setMessageText] = useState('');
  const [ticketStatusSelect, setTicketStatusSelect] = useState<TicketStatus>('Open');

  // Fetch ticket details
  useEffect(() => {
    const foundTicket = DUMMY_TICKETS.find(t => t.id === ticketId) || DUMMY_TICKETS[0];
    if (foundTicket) {
      setTicket(JSON.parse(JSON.stringify(foundTicket)));
      setTicketStatusSelect(foundTicket.status);
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [ticketId]);

  const handleSubmitAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket || !messageText.trim()) return;

    // Add message
    const newMessage: TicketMessage = {
      id: `msg-${Date.now()}`,
      sender: 'Admin Magang',
      role: 'admin',
      content: messageText,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      type: formTab === 'note' ? 'internal_note' : 'reply'
    };

    // Add event log
    const newEvents = [
      {
        id: `event-${Date.now()}-1`,
        event: formTab === 'note' ? 'Internal Note Posted' : 'Admin Replied',
        actor: 'Admin Magang',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
      }
    ];

    // If status changed
    if (ticketStatusSelect !== ticket.status) {
      newEvents.push({
        id: `event-${Date.now()}-2`,
        event: `Status changed to ${ticketStatusSelect}`,
        actor: 'Admin Magang',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
      });
    }

    setTicket(prev => {
      if (!prev) return null;
      return {
        ...prev,
        status: ticketStatusSelect,
        conversations: [...prev.conversations, newMessage],
        timeline: [...prev.timeline, ...newEvents],
        updatedDate: newMessage.timestamp
      };
    });

    setMessageText('');
    setNoteTitle('');
    alert(formTab === 'note' ? 'Internal Note berhasil disimpan!' : 'Balasan berhasil dikirim!');
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex flex-col gap-6 animate-pulse">
          <div className="h-6 w-1/4 bg-[var(--line-dark)] rounded"></div>
          <div className="h-10 w-2/3 bg-[var(--line-dark)] rounded"></div>
          <div className="h-60 bg-[var(--line-dark)] rounded-2xl"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!ticket) {
    return (
      <AdminLayout>
        <div className="p-16 text-center">
          <h2 className="text-xl font-bold">Ticket not found</h2>
          <Link href="/admin/tickets" className="text-[var(--gold)] font-bold mt-2 inline-block">
            Back to Tickets
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        
        {/* 1. BREADCRUMBS & BREAD TITLE */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[13px] font-bold text-[var(--text-dim)]">
            <Link href="/admin/tickets" className="hover:text-[var(--ink)] transition-colors">Tickets</Link>
            <span>/</span>
            <span className="text-[var(--ink)]">Ticket Detail</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line-dark)] pb-4">
            <div className="flex items-center gap-3">
              <span className="text-[20px] font-bold text-[var(--gold-soft)] font-mono">
                Ticket #{ticket.id}
              </span>
            </div>
            
            {/* Top Right Action Icons */}
            <div className="flex items-center gap-2">
              <button onClick={() => alert('Printing...')} className="p-2 bg-white border border-[var(--line-dark)] rounded-lg text-gray-500 hover:text-[var(--ink)] hover:bg-[var(--paper-2)] transition-all" title="Print Ticket">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.82l-.24 2.4a2 2 0 002 2.2h7.04a2 2 0 002-2.22l-.24-2.38m-10.6 0a3 3 0 01-2.94-3.32l.24-2.44A3 3 0 017.3 5h9.4a3 3 0 012.98 2.56l.24 2.44a3 3 0 01-2.94 3.32m-10.6 0h10.6" /></svg>
              </button>
              <button onClick={() => alert('Editing ticket metadata...')} className="p-2 bg-white border border-[var(--line-dark)] rounded-lg text-gray-500 hover:text-[var(--ink)] hover:bg-[var(--paper-2)] transition-all" title="Edit Ticket">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </button>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-['Fraunces'] font-bold text-[var(--ink)] mt-1">
            {ticket.subject}
          </h1>
        </div>

        {/* 2. METADATA GRID CARD (osTicket Style Modernized) */}
        <div className="bg-white rounded-2xl border border-[var(--line)] shadow-sm overflow-hidden flex flex-col p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            
            {/* Left Block */}
            <div className="grid grid-cols-[120px_1fr] items-center gap-y-3.5 text-[13.5px]">
              <span className="font-bold text-[var(--text-dim)]">Status:</span>
              <div><StatusBadge status={ticket.status} /></div>

              <span className="font-bold text-[var(--text-dim)]">Priority:</span>
              <div><PriorityBadge priority={ticket.priority} /></div>

              <span className="font-bold text-[var(--text-dim)]">Department:</span>
              <span className="font-semibold text-[var(--ink)] truncate">{ticket.department}</span>

              <span className="font-bold text-[var(--text-dim)]">Create Date:</span>
              <span className="font-mono text-gray-600">{ticket.createdDate}</span>

              <span className="font-bold text-[var(--text-dim)]">Assigned To:</span>
              <span className="font-semibold text-[var(--gold-soft)]">{ticket.assignedTo || 'Unassigned'}</span>

              <span className="font-bold text-[var(--text-dim)]">SLA Plan:</span>
              <span className="font-medium text-[var(--ink)]">{ticket.sla}</span>

              <span className="font-bold text-[var(--text-dim)]">Due Date:</span>
              <span className="font-mono text-red-500 font-bold">{ticket.dueDate}</span>
            </div>

            {/* Right Block */}
            <div className="grid grid-cols-[120px_1fr] items-center gap-y-3.5 text-[13.5px] border-t md:border-t-0 border-[var(--line-dark)] pt-4 md:pt-0">
              <span className="font-bold text-[var(--text-dim)]">User:</span>
              <span className="font-bold text-[var(--ink)] flex items-center gap-1">
                👤 {ticket.requester}
              </span>

              <span className="font-bold text-[var(--text-dim)]">Email:</span>
              <span className="font-semibold text-[var(--ink)] truncate">{ticket.email}</span>

              <span className="font-bold text-[var(--text-dim)]">Source:</span>
              <span className="font-medium text-[var(--ink)]">{ticket.source}</span>

              <span className="font-bold text-[var(--text-dim)]">Help Topic:</span>
              <span className="font-semibold text-[var(--ink)]">{ticket.helpTopic}</span>

              <span className="font-bold text-[var(--text-dim)]">Last Message:</span>
              <span className="font-mono text-gray-600">{ticket.updatedDate}</span>

              <span className="font-bold text-[var(--text-dim)]">Last Response:</span>
              <span className="font-mono text-gray-600">-</span>
            </div>

          </div>
        </div>

        {/* 3. TABS HEADER (Ticket Thread / Tasks) */}
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
            Ticket Thread ({ticket.conversations.length})
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

        {/* 4. MAIN THREAD / TASKS DISPLAY AREA */}
        {activeTab === 'tasks' ? (
          <div className="bg-white rounded-2xl border border-[var(--line)] p-12 text-center text-sm font-bold text-[var(--text-dim)] shadow-sm">
            Belum ada sub-tugas (tasks) untuk tiket ini.
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            
            {/* Conversation Messages Loop */}
            {ticket.conversations.map((msg) => {
              const isNote = msg.type === 'internal_note';
              return (
                <div key={msg.id} className="flex flex-col gap-3">
                  
                  {/* Message Bubble Card */}
                  <div className={`rounded-2xl border overflow-hidden shadow-sm transition-all ${
                    isNote ? 'bg-amber-50/50 border-amber-200' : 'bg-blue-50/20 border-blue-100'
                  }`}>
                    {/* Message Header */}
                    <div className={`px-5 py-3 border-b flex items-center justify-between gap-4 text-xs font-bold text-[var(--text-dim)] ${
                      isNote ? 'bg-amber-100/40 border-amber-200 text-amber-900' : 'bg-blue-100/20 border-blue-100 text-blue-900'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span>👤 {msg.sender}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          isNote ? 'bg-amber-200/60 text-amber-900' : msg.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {isNote ? 'INTERNAL NOTE' : msg.role.toUpperCase()}
                        </span>
                      </div>
                      <span className="font-mono">{msg.timestamp}</span>
                    </div>

                    {/* Message Body */}
                    <div className="p-5 text-[14px] leading-relaxed text-[var(--ink)] whitespace-pre-line bg-white">
                      {msg.content}
                    </div>
                  </div>

                  {/* Interleaved Timeline Events (Simulasi logs) */}
                  {ticket.timeline
                    .filter(event => event.timestamp === msg.timestamp)
                    .map((ev) => (
                      <div key={ev.id} className="flex items-center gap-2 px-6 py-2 text-xs font-semibold text-[var(--text-dim)] border-l-2 border-[var(--line-dark)] ml-6 animate-in slide-in-from-left-4 duration-200">
                        <span>📝</span>
                        <span>{ev.event} by <strong className="text-[var(--ink)]">{ev.actor}</strong></span>
                        <span className="font-mono text-[10px] opacity-60 ml-auto">{ev.timestamp}</span>
                      </div>
                    ))
                  }

                </div>
              );
            })}

            {/* Banner Penugasan Kuning (osTicket Alert Style) */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 text-xs font-bold text-amber-800 flex items-center gap-2">
              ⚠️ Ticket is assigned to {ticket.assignedTo || 'Support IT'}
            </div>

            {/* 5. ACTION BOX (Reply / Internal Note Form) */}
            <div className="bg-white rounded-2xl border border-[var(--line)] shadow-sm overflow-hidden flex flex-col">
              
              {/* Form Tab Menu */}
              <div className="flex items-center border-b border-[var(--line-dark)] bg-slate-50 px-4">
                <button
                  type="button"
                  onClick={() => setFormTab('note')}
                  className={`px-4 py-3 text-xs font-bold border-b-2 transition-all ${
                    formTab === 'note'
                      ? 'border-amber-500 text-amber-800'
                      : 'border-transparent text-[var(--text-dim)] hover:text-[var(--ink)]'
                  }`}
                >
                  Post Internal Note
                </button>
                <button
                  type="button"
                  onClick={() => setFormTab('reply')}
                  className={`px-4 py-3 text-xs font-bold border-b-2 transition-all ${
                    formTab === 'reply'
                      ? 'border-blue-500 text-blue-800'
                      : 'border-transparent text-[var(--text-dim)] hover:text-[var(--ink)]'
                  }`}
                >
                  Reply to Requester
                </button>
              </div>

              {/* Form Input Container */}
              <form onSubmit={handleSubmitAction} className="p-6 flex flex-col gap-4">
                
                {formTab === 'note' && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-bold text-[var(--ink)]">Note Title (Optional)</label>
                    <input
                      type="text"
                      placeholder="Note title - summary of the note (optional)"
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                      className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[13.5px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors w-full"
                    />
                  </div>
                )}

                {/* Mock Rich Text Editor Toolbar */}
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[var(--ink)]">
                    {formTab === 'note' ? 'Internal Note *' : 'Response Text *'}
                  </label>
                  
                  {/* Dummy Editor Control Bar */}
                  <div className="border border-[var(--line-dark)] border-b-0 rounded-t-xl bg-slate-50 px-3 py-2 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-gray-600">
                    <button type="button" className="px-2 py-1 bg-white border border-gray-200 rounded hover:bg-gray-100">File</button>
                    <button type="button" className="px-2 py-1 bg-white border border-gray-200 rounded hover:bg-gray-100">Edit</button>
                    <button type="button" className="px-2 py-1 bg-white border border-gray-200 rounded hover:bg-gray-100">View</button>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <button type="button" className="px-2 py-0.5 font-bold hover:bg-gray-200 rounded">B</button>
                    <button type="button" className="px-2 py-0.5 italic hover:bg-gray-200 rounded">I</button>
                    <button type="button" className="px-2 py-0.5 underline hover:bg-gray-200 rounded">U</button>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <button type="button" className="px-2 py-0.5 hover:bg-gray-200 rounded">Format</button>
                  </div>

                  {/* Textarea */}
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    required
                    rows={6}
                    placeholder={
                      formTab === 'note'
                        ? 'Tulis catatan rahasia internal admin di sini...'
                        : 'Tulis balasan resmi yang akan dikirim ke email pelapor...'
                    }
                    className="border border-[var(--line-dark)] rounded-b-xl p-4 text-[13.5px] focus:outline-none focus:border-[var(--gold-soft)] bg-white w-full"
                  />
                </div>

                {/* Drag and Drop Box Mockup */}
                <div 
                  onClick={() => alert('Mock upload file... (Mencari file)')}
                  className="border border-dashed border-gray-300 rounded-xl p-5 text-center text-xs font-bold text-gray-400 hover:bg-slate-50 hover:text-[var(--ink)] cursor-pointer transition-colors"
                >
                  📁 Drop files here or <span className="text-[var(--gold-soft)] underline">choose them</span>
                </div>

                {/* Bottom Row status & buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[var(--line-dark)] pt-4 mt-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--ink)]">
                    <span>Ticket Status:</span>
                    <select
                      value={ticketStatusSelect}
                      onChange={(e) => setTicketStatusSelect(e.target.value as TicketStatus)}
                      className="bg-white border border-[var(--line-dark)] rounded-lg px-2.5 py-1 text-xs cursor-pointer focus:outline-none"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Waiting">Waiting</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      type="button" 
                      onClick={() => { setMessageText(''); setNoteTitle(''); }}
                      className="bg-white border border-[var(--line)] text-[var(--text-dim)] px-4 py-2 rounded-xl text-xs font-bold hover:bg-[var(--paper-2)] transition-colors"
                    >
                      Reset
                    </button>
                    <button 
                      type="submit" 
                      className={`px-5 py-2 rounded-xl text-xs font-bold shadow-sm text-white transition-all ${
                        formTab === 'note' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {formTab === 'note' ? 'Post Note' : 'Post Reply'}
                    </button>
                  </div>
                </div>

              </form>
            </div>

          </div>
        )}

      </div>
    </AdminLayout>
  );
}
