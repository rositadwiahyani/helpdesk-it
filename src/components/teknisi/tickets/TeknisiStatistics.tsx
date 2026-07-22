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
import TeknisiTicketTable from './TeknisiTicketTable';

type Ticket = any;
type Category = { id: string; name: string };
type Department = { id: string; name: string };
type TicketLog = any;

interface TeknisiStatisticsProps {
  tickets: Ticket[];
  ticketLogs: TicketLog[];
  categories: Category[];
  departments: Department[];
  currentUserId: string;
}

export default function TeknisiStatistics({
  tickets,
  ticketLogs,
  categories,
  departments,
  currentUserId,
}: TeknisiStatisticsProps) {
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

  // Tiket terbaru (5 tiket terakhir)
  const recentTickets = useMemo(() => {
    return [...tickets].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);
  }, [tickets]);

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

      {/* Recent Tickets Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mt-2">
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Tiket Terbaru Departemen Anda
          </h2>
          <p className="text-sm text-slate-500 mt-1">5 tiket terakhir yang ditugaskan ke departemen Anda.</p>
        </div>
        <TeknisiTicketTable 
            initialTickets={recentTickets}
            categories={categories}
            mainCategories={categories.filter(c => !c.name.includes('/'))}
            departments={departments}
            actionType="assign"
            currentUserId={currentUserId}
        />
      </div>
    </div>
  );
}
