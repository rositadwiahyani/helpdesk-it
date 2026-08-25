'use client';
import React, { useState, useEffect, useMemo } from 'react';
import PimpinanTicketTable from "./PimpinanTicketTable";
import { fetchClient } from '@/lib/apiClient';
import { Search, Printer, AlertTriangle, CheckCircle2, Clock, Inbox } from 'lucide-react';

export default function PimpinanTicketWorkspace() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'unhandled' | 'inprogress' | 'resolved' | 'escalated'>('all');
  
  useEffect(() => {
    fetchTicketsData();
  }, []);

  const fetchTicketsData = async () => {
    try {
      setLoading(true);
      const data = await fetchClient('/admin/tickets');
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = useMemo(() => {
    let list = tickets;
    
    // Tab filtering
    if (activeTab === 'unhandled') {
      list = list.filter(t => t.status === 'WAITING VERIFICATION' || t.status === 'NEW' || t.status === 'OPEN');
    } else if (activeTab === 'inprogress') {
      list = list.filter(t => ['IN PROGRESS', 'DIPROSES', 'WAITING CONFIRMATION'].includes(t.status?.toUpperCase() || ''));
    } else if (activeTab === 'resolved') {
      list = list.filter(t => ['RESOLVED', 'CLOSED', 'RESOLVED_BY_SYSTEM'].includes(t.status?.toUpperCase() || ''));
    } else if (activeTab === 'escalated') {
      list = list.filter(t => t.status === 'ESCALATED' || (t.sla_due && new Date(t.sla_due).getTime() < Date.now() && !['RESOLVED', 'CLOSED'].includes(t.status)));
    }

    // Search query filtering
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(ticket => 
        (ticket.ticket_num || '').toLowerCase().includes(q) ||
        (ticket.id || '').toLowerCase().includes(q) ||
        (ticket.reporter_name || ticket.reporters?.name || '').toLowerCase().includes(q) ||
        (ticket.subject || ticket.title || '').toLowerCase().includes(q) ||
        (ticket.category?.name || ticket.categories?.name || '').toLowerCase().includes(q)
      );
    }

    return list;
  }, [tickets, activeTab, searchQuery]);

  const escalatedCount = useMemo(() => {
    return tickets.filter(t => t.status === 'ESCALATED' || (t.sla_due && new Date(t.sla_due).getTime() < Date.now() && !['RESOLVED', 'CLOSED'].includes(t.status))).length;
  }, [tickets]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4">
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-2xl font-bold text-[var(--ink)] tracking-tight">Laporan Tiket</h1>
          <p className="text-[var(--text-dim)] text-sm font-medium">Pemantauan seluruh tiket pengaduan IT Helpdesk secara real-time.</p>
        </div>
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[var(--line)] rounded-xl text-sm font-semibold text-[var(--ink)] hover:bg-[var(--paper-2)] transition-colors shadow-sm active:scale-95"
        >
          <Printer className="w-4 h-4 text-[var(--text-dim)]" />
          Cetak Laporan
        </button>
      </div>

      {/* Main Container Card */}
      <div className="w-full bg-white rounded-2xl shadow-sm border border-[var(--line)] overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-[var(--line)] overflow-x-auto no-scrollbar bg-slate-50/50">
          <button
            onClick={() => setActiveTab('all')}
            className={`cursor-pointer px-4 py-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'all' 
                ? 'border-[var(--gold)] text-[var(--gold-dim)] font-bold' 
                : 'border-transparent text-[var(--text-dim)] hover:text-[var(--ink)]'
            }`}
          >
            <Inbox className="w-4 h-4" />
            Semua Tiket ({tickets.length})
          </button>
          <button
            onClick={() => setActiveTab('unhandled')}
            className={`cursor-pointer px-4 py-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'unhandled' 
                ? 'border-[var(--gold)] text-[var(--gold-dim)] font-bold' 
                : 'border-transparent text-[var(--text-dim)] hover:text-[var(--ink)]'
            }`}
          >
            <Clock className="w-4 h-4" />
            Belum Ditangani ({tickets.filter(t => ['WAITING VERIFICATION', 'NEW', 'OPEN'].includes(t.status)).length})
          </button>
          <button
            onClick={() => setActiveTab('inprogress')}
            className={`cursor-pointer px-4 py-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'inprogress' 
                ? 'border-[var(--gold)] text-[var(--gold-dim)] font-bold' 
                : 'border-transparent text-[var(--text-dim)] hover:text-[var(--ink)]'
            }`}
          >
            <Clock className="w-4 h-4 text-blue-500" />
            Sedang Diproses ({tickets.filter(t => ['IN PROGRESS', 'DIPROSES', 'WAITING CONFIRMATION'].includes(t.status?.toUpperCase() || '')).length})
          </button>
          <button
            onClick={() => setActiveTab('resolved')}
            className={`cursor-pointer px-4 py-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'resolved' 
                ? 'border-[var(--gold)] text-[var(--gold-dim)] font-bold' 
                : 'border-transparent text-[var(--text-dim)] hover:text-[var(--ink)]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Selesai ({tickets.filter(t => ['RESOLVED', 'CLOSED', 'RESOLVED_BY_SYSTEM'].includes(t.status?.toUpperCase() || '')).length})
          </button>
          <button
            onClick={() => setActiveTab('escalated')}
            className={`cursor-pointer px-4 py-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'escalated' 
                ? 'border-red-500 text-red-600 font-bold' 
                : 'border-transparent text-[var(--text-dim)] hover:text-red-600'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-red-500" />
            Tiket Eskalasi & Overdue
            {escalatedCount > 0 && (
              <span className="bg-red-100 text-red-700 text-[11px] font-bold px-2 py-0.5 rounded-full">
                {escalatedCount}
              </span>
            )}
          </button>
        </div>

        {/* Search Toolbar */}
        <div className="p-4 border-b border-[var(--line)] flex flex-wrap justify-between items-center gap-3 bg-white">
          <div className="relative w-full sm:w-80">
            <input 
              type="text" 
              placeholder="Cari No. Tiket, pelapor, subjek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-[var(--line-dark)] rounded-xl bg-[var(--paper)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition-all"
            />
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-[var(--text-dim)]" />
          </div>
          <div className="text-xs font-semibold text-[var(--text-dim)]">
            Total {filteredTickets.length} tiket ditampilkan
          </div>
        </div>
        
        {/* Table Content */}
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--gold)]"></div>
            <p className="text-xs font-semibold text-[var(--text-dim)]">Memuat data tiket...</p>
          </div>
        ) : (
          <PimpinanTicketTable 
            tickets={filteredTickets} 
            isEscalatedTab={activeTab === 'escalated'} 
            onAction={async (id, action) => {
              if (action === 'CLOSE') {
                if (confirm('Tutup tiket ini secara paksa?')) {
                  await fetchClient(`/admin/tickets/${id}/status`, { method: 'PUT', body: JSON.stringify({ status: 'CLOSED' }) });
                  fetchTicketsData();
                }
              } else if (action === 'RETURN') {
                if (confirm('Kembalikan tiket ini ke Operator?')) {
                  await fetchClient(`/admin/tickets/${id}/status`, { method: 'PUT', body: JSON.stringify({ status: 'OPEN' }) });
                  fetchTicketsData();
                }
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
