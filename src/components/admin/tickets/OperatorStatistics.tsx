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
    <div className="flex flex-col gap-8">
      {/* Date Range Filter */}
      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-end gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Mulai Tanggal</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full sm:w-auto p-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Sampai Tanggal</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full sm:w-auto p-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="ml-auto text-sm font-medium text-slate-600 bg-slate-100 py-2 px-4 rounded-lg">
          Range: {startDate} - {endDate}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-6">Grafik Aktivitas Tiket</h2>
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
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Statistics <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-[10px] text-slate-500 font-black">?</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">Statistics of tickets organized by department and help topic.</p>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-white">
          <button 
            className={`px-6 py-4 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'department' ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('department')}
          >
            Department
          </button>
          <button 
            className={`px-6 py-4 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'topics' ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('topics')}
          >
            Topics
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-white border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold w-1/3">{activeTab === 'department' ? 'Department' : 'Topics'}</th>
                <th className="px-6 py-4 font-semibold">Opened <span className="font-normal text-xs block text-slate-400">Dibuat</span></th>
                <th className="px-6 py-4 font-semibold">Assigned <span className="font-normal text-xs block text-slate-400">Diterima/Verifikasi</span></th>
                <th className="px-6 py-4 font-semibold">Closed <span className="font-normal text-xs block text-slate-400">Ditolak</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeStatsData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-slate-400">Belum ada data untuk periode ini.</td>
                </tr>
              ) : (
                activeStatsData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-700">{row.name}</td>
                    <td className="px-6 py-4 text-slate-600">{row.opened}</td>
                    <td className="px-6 py-4 text-slate-600">{row.assigned}</td>
                    <td className="px-6 py-4 text-slate-600">{row.closed}</td>
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
