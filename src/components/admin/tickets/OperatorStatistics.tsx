'use client';

import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type Ticket = any;
type Category = { id: string; name: string };
type Department = { id: string; name: string };
type TicketLog = any;

interface OperatorStatisticsProps {
  tickets: Ticket[];
  ticketLogs: TicketLog[];
  categories: Category[];
  departments: Department[];
}

export default function OperatorStatistics({
  tickets,
  ticketLogs,
  categories,
  departments,
}: OperatorStatisticsProps) {
  // Date range state (default: 30 hari terakhir)
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  const [activeTab, setActiveTab] = useState<'department' | 'topics'>('department');

  // Filter data berdasarkan rentang tanggal
  const filteredData = useMemo(() => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const validTickets = tickets.filter((t) => {
      const d = new Date(t.created_at);
      return d >= start && d <= end;
    });

    const validLogs = ticketLogs.filter((l) => {
      const d = new Date(l.created_at);
      return d >= start && d <= end;
    });

    return { validTickets, validLogs };
  }, [tickets, ticketLogs, startDate, endDate]);

  // Siapkan data grafik (Agregasi harian)
  const chartData = useMemo(() => {
    const { validTickets, validLogs } = filteredData;
    const days: Record<string, { date: string; opened: number; verified: number }> = {};

    validTickets.forEach((t) => {
      const d = new Date(t.created_at).toISOString().split('T')[0];
      if (!days[d]) days[d] = { date: d, opened: 0, verified: 0 };
      days[d].opened += 1;
    });

    validLogs.forEach((l) => {
      if (l.action === 'CHANGE_STATUS' || l.action === 'REJECT_TICKET') {
        const d = new Date(l.created_at).toISOString().split('T')[0];
        if (!days[d]) days[d] = { date: d, opened: 0, verified: 0 };
        days[d].verified += 1;
      }
    });

    return Object.values(days).sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredData]);

  // Hitung statistik Department & Topik
  const statsTable = useMemo(() => {
    const { validTickets, validLogs } = filteredData;
    
    const departMap: Record<string, any> = {};
    const topicMap: Record<string, any> = {};

    // Inisialisasi map dengan default
    departments.forEach((d) => {
      departMap[d.id] = { name: d.name, opened: 0, assigned: 0, closed: 0 };
    });
    departMap['unassigned'] = { name: 'Tanpa Departemen', opened: 0, assigned: 0, closed: 0 };

    categories.forEach((c) => {
      topicMap[c.id] = { name: c.name, opened: 0, assigned: 0, closed: 0 };
    });
    topicMap['unassigned'] = { name: 'Tanpa Topik', opened: 0, assigned: 0, closed: 0 };

    // Hitung tiket masuk (opened)
    validTickets.forEach((t) => {
      const depId = t.dept_id || 'unassigned';
      const catId = t.category_id || 'unassigned';

      if (departMap[depId]) departMap[depId].opened += 1;
      if (topicMap[catId]) topicMap[catId].opened += 1;
    });

    // Hitung tiket diproses / ditolak (berdasarkan log)
    // Asumsi: log mencatat ticket_id, dari ticket_id kita cari department_id / category_id nya
    validLogs.forEach((l) => {
      const ticket = tickets.find(t => t.id === l.ticket_id);
      if (ticket) {
        const depId = ticket.dept_id || 'unassigned';
        const catId = ticket.category_id || 'unassigned';

        if (l.action === 'CHANGE_STATUS') {
          if (departMap[depId]) departMap[depId].assigned += 1;
          if (topicMap[catId]) topicMap[catId].assigned += 1;
        } else if (l.action === 'REJECT_TICKET') {
          if (departMap[depId]) departMap[depId].closed += 1;
          if (topicMap[catId]) topicMap[catId].closed += 1;
        }
      }
    });

    const departArray = Object.values(departMap).filter(d => d.opened > 0 || d.assigned > 0 || d.closed > 0);
    const topicArray = Object.values(topicMap).filter(t => t.opened > 0 || t.assigned > 0 || t.closed > 0);

    return { departments: departArray, topics: topicArray };
  }, [filteredData, departments, categories, tickets]);

  const activeStatsData = activeTab === 'department' ? statsTable.departments : statsTable.topics;

  return (
    <div className="flex flex-col gap-6">
      {/* Date Range Filter */}
      <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-5 md:p-6 shadow-sm flex flex-col sm:flex-row sm:items-end gap-4 animate-in fade-in duration-300">
        <div>
          <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2">Mulai Tanggal</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl text-[14px] font-medium outline-none focus:border-[var(--gold-soft)] transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2">Sampai Tanggal</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl text-[14px] font-medium outline-none focus:border-[var(--gold-soft)] transition-colors"
          />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="text-[13px] font-bold text-[var(--ink)] bg-[var(--paper-2)] py-2.5 px-4 rounded-xl border border-[var(--line-dark)]">
            Range: {startDate} - {endDate}
          </div>
          <button
            onClick={() => {
              const d = new Date();
              d.setDate(d.getDate() - 30);
              setStartDate(d.toISOString().split('T')[0]);
              setEndDate(new Date().toISOString().split('T')[0]);
            }}
            className="text-[13px] font-bold text-[var(--ink)] hover:bg-[var(--paper-2)] py-2.5 px-4 rounded-xl border border-[var(--line)] transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-6 md:p-8 shadow-sm animate-in fade-in duration-300 delay-75">
        <h2 className="text-[18px] font-bold text-[var(--ink)] mb-6">Grafik Aktivitas Tiket</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} tickMargin={10} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickMargin={10} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line type="monotone" name="Tiket Masuk" dataKey="opened" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 8 }} />
              <Line type="monotone" name="Tiket Diverifikasi" dataKey="verified" stroke="#10b981" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Statistics Table */}
      <div className="bg-white border border-[var(--line-dark)] rounded-2xl shadow-sm overflow-hidden animate-in fade-in duration-300 delay-150">
        <div className="p-6 md:p-8 border-b border-[var(--line-dark)]">
          <h2 className="text-[18px] font-bold text-[var(--ink)] flex items-center gap-2 mb-1">
            Statistics
          </h2>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-[var(--line-dark)] bg-white px-2">
          <button 
            className={`px-6 py-4 text-[13px] font-bold transition-colors border-b-2 -mb-[1px] ${activeTab === 'department' ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-transparent text-[var(--text-dim)] hover:text-[var(--ink)]'}`}
            onClick={() => setActiveTab('department')}
          >
            Department
          </button>
          <button 
            className={`px-6 py-4 text-[13px] font-bold transition-colors border-b-2 -mb-[1px] ${activeTab === 'topics' ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-transparent text-[var(--text-dim)] hover:text-[var(--ink)]'}`}
            onClick={() => setActiveTab('topics')}
          >
            Topics
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--paper-2)]/30 border-b border-[var(--line-dark)]">
              <tr>
                <th className="px-6 py-4 text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider w-1/3">{activeTab === 'department' ? 'Department' : 'Topics'}</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider text-center">Opened <span className="font-medium text-[10px] block opacity-70 mt-0.5">Dibuat</span></th>
                <th className="px-6 py-4 text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider text-center">Assigned <span className="font-medium text-[10px] block opacity-70 mt-0.5">Diterima/Verifikasi</span></th>
                <th className="px-6 py-4 text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider text-center">Closed <span className="font-medium text-[10px] block opacity-70 mt-0.5">Ditolak</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line-dark)]">
              {activeStatsData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-[var(--text-dim)] text-[14px]">Belum ada data untuk periode ini.</td>
                </tr>
              ) : (
                activeStatsData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[var(--paper-2)]/30 transition-colors">
                    <td className="px-6 py-4 text-[14px] font-bold text-[var(--ink)]">{row.name}</td>
                    <td className="px-6 py-4 text-[14px] text-center font-medium text-[var(--ink)]">{row.opened}</td>
                    <td className="px-6 py-4 text-[14px] text-center font-medium text-[var(--ink)]">{row.assigned}</td>
                    <td className="px-6 py-4 text-[14px] text-center font-medium text-[var(--ink)]">{row.closed}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
