'use client';
import React, { useState, useEffect } from 'react';
import PimpinanTicketTable from "./PimpinanTicketTable";
import { fetchClient } from '@/lib/apiClient';

export default function PimpinanTicketWorkspace() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'escalated'>('all');
  
  useEffect(() => {
    fetchTicketsData();
  }, []);

  const fetchTicketsData = async () => {
    try {
      setLoading(true);
      const data = await fetchClient('/admin/tickets');
      setTickets(data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (ticket.reporters?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (ticket.title || '').toLowerCase().includes(searchQuery.toLowerCase());
                          
    if (activeTab === 'escalated') {
      return matchesSearch && ticket.status === 'ESCALATED';
    }
    return matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4">
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-slate-900 font-extrabold text-2xl tracking-tight">Laporan Tiket</h1>
          <p className="text-slate-500 font-medium text-sm">Pemantauan seluruh tiket pengaduan IT Helpdesk.</p>
        </div>
      </div>

      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'all' 
              ? 'border-[#0059BB] text-[#0059BB]' 
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Semua Tiket
        </button>
        <button
          onClick={() => setActiveTab('escalated')}
          className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'escalated' 
              ? 'border-red-500 text-red-600' 
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Tiket Eskalasi & Overdue
          {tickets.filter(t => t.status === 'ESCALATED').length > 0 && (
            <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {tickets.filter(t => t.status === 'ESCALATED').length}
            </span>
          )}
        </button>
      </div>

      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="relative w-72">
            <input 
              type="text" 
              placeholder="Cari ID tiket, pelapor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0059BB] focus:border-transparent transition-all"
            />
            <svg className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            onClick={() => window.print()}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Cetak Laporan
          </button>
        </div>
        
        {loading ? (
          <div className="p-12 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0059BB]"></div>
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
