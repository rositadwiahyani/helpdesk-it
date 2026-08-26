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
  PieChart,
  Pie,
  Cell
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

const COLORS = ['#0059BB', '#10b981', '#f59e0b', '#6366f1', '#ec4899', '#8b5cf6', '#14b8a6', '#f43f5e'];

export default function OperatorStatistics({
  tickets,
  ticketLogs,
  categories,
  departments,
}: OperatorStatisticsProps) {
  // Chart Date Range (Global to Charts)
  const [chartStartDate, setChartStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().split('T')[0];
  });
  const [chartEndDate, setChartEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  // Table Date Range
  const [tableStartDate, setTableStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().split('T')[0];
  });
  const [tableEndDate, setTableEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  const [activeTab, setActiveTab] = useState<'department' | 'topics'>('department');

  // Filter Chart Data
  const filteredChartData = useMemo(() => {
    const start = new Date(chartStartDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(chartEndDate);
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
  }, [tickets, ticketLogs, chartStartDate, chartEndDate]);

  // Filter Table Data
  const filteredTableData = useMemo(() => {
    const start = new Date(tableStartDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(tableEndDate);
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
  }, [tickets, ticketLogs, tableStartDate, tableEndDate]);

  // Chart 1: Line Chart (Aktivitas Tiket)
  const lineChartData = useMemo(() => {
    const { validTickets, validLogs } = filteredChartData;
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
  }, [filteredChartData]);

  // Chart 2: Donut Chart (Distribusi Help Topic / Kategori yang diverifikasi)
  const donutChartData = useMemo(() => {
    const { validLogs } = filteredChartData;
    const catCounts: Record<string, number> = {};

    validLogs.forEach((l) => {
      if (l.action === 'CHANGE_STATUS' || l.action === 'REJECT_TICKET') {
        const ticket = tickets.find((t) => t.id === l.ticket_id);
        if (ticket) {
          const catId = ticket.category_id || 'unassigned';
          if (!catCounts[catId]) catCounts[catId] = 0;
          catCounts[catId] += 1;
        }
      }
    });

    const data = Object.entries(catCounts).map(([catId, count]) => {
      if (catId === 'unassigned') return { name: 'Lainnya', value: count };
      const cat = categories.find((c) => String(c.id) === String(catId));
      return { name: cat ? cat.name : 'Unknown', value: count };
    });

    return data.sort((a, b) => b.value - a.value); // Sort descending
  }, [filteredChartData, tickets, categories]);

  // Table Statistics
  const statsTable = useMemo(() => {
    const { validTickets, validLogs } = filteredTableData;
    
    const departMap: Record<string, any> = {};
    const topicMap: Record<string, any> = {};

    departments.forEach((d) => {
      departMap[d.id] = { name: d.name, opened: 0, assigned: 0, closed: 0 };
    });
    departMap['unassigned'] = { name: 'Tanpa Departemen', opened: 0, assigned: 0, closed: 0 };

    categories.forEach((c) => {
      topicMap[c.id] = { name: c.name, opened: 0, assigned: 0, closed: 0 };
    });
    topicMap['unassigned'] = { name: 'Tanpa Topik', opened: 0, assigned: 0, closed: 0 };

    validTickets.forEach((t) => {
      const depId = t.dept_id || 'unassigned';
      const catId = t.category_id || 'unassigned';
      if (departMap[depId]) departMap[depId].opened += 1;
      if (topicMap[catId]) topicMap[catId].opened += 1;
    });

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
  }, [filteredTableData, departments, categories, tickets]);

  const activeStatsData = activeTab === 'department' ? statsTable.departments : statsTable.topics;

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-[var(--line-dark)] p-3 rounded-xl shadow-lg">
          <p className="text-[13px] font-bold text-[var(--ink)] mb-1">{payload[0].name}</p>
          <p className="text-[13px] font-medium text-[var(--text-dim)]">Total: <span className="font-bold text-[var(--ink)]">{payload[0].value} tiket</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Chart Filter */}
      <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-end gap-4">
        <div>
          <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2">Mulai Tanggal</label>
          <input
            type="date"
            value={chartStartDate}
            onChange={(e) => setChartStartDate(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl text-[13px] font-medium outline-none focus:border-[var(--gold-soft)] transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2">Sampai Tanggal</label>
          <input
            type="date"
            value={chartEndDate}
            onChange={(e) => setChartEndDate(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl text-[13px] font-medium outline-none focus:border-[var(--gold-soft)] transition-colors"
          />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="text-[12px] font-bold text-[var(--ink)] bg-[var(--paper-2)] py-2.5 px-4 rounded-xl border border-[var(--line-dark)] hidden md:block">
            Range: {chartStartDate} - {chartEndDate}
          </div>
          <button
            onClick={() => {
              const d = new Date();
              d.setDate(d.getDate() - 7);
              setChartStartDate(d.toISOString().split('T')[0]);
              setChartEndDate(new Date().toISOString().split('T')[0]);
            }}
            className="text-[12px] font-bold text-[var(--ink)] hover:bg-[var(--paper-2)] py-2 px-4 rounded-xl border border-[var(--line)] transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm lg:col-span-2">
          <h2 className="text-[18px] font-bold text-[var(--ink)] mb-6">Grafik Aktivitas Tiket</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} tickMargin={10} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickMargin={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                <Line type="monotone" name="Tiket Masuk" dataKey="opened" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 6 }} dot={false} />
                <Line type="monotone" name="Tiket Diverifikasi" dataKey="verified" stroke="#10b981" strokeWidth={3} activeDot={{ r: 6 }} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm flex flex-col">
          <h2 className="text-[18px] font-bold text-[var(--ink)] mb-2">Distribusi Help Topic</h2>
          <p className="text-[12px] text-[var(--text-dim)] mb-6">Topik tiket terverifikasi</p>
          <div className="flex-1 w-full h-64">
            {donutChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={donutChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={2}
                    dataKey="value"
                    >
                    {donutChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                    <Legend 
                        layout="horizontal" 
                        verticalAlign="bottom" 
                        align="center"
                        wrapperStyle={{ fontSize: '11px', marginTop: '10px' }}
                    />
                </PieChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex h-full items-center justify-center text-[13px] text-[var(--text-dim)]">
                    Tidak ada data topik.
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Statistics Table */}
      <div className="bg-white border border-[var(--line-dark)] rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 md:p-6 border-b border-[var(--line-dark)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-[18px] font-bold text-[var(--ink)] flex items-center gap-2">
            Statistics Data
          </h2>
          {/* Internal Table Filters */}
          <div className="flex items-center gap-3">
             <div className="flex items-center border border-[var(--line-dark)] bg-[var(--paper-2)] rounded-lg overflow-hidden">
                <input
                    type="date"
                    value={tableStartDate}
                    onChange={(e) => setTableStartDate(e.target.value)}
                    className="px-3 py-1.5 bg-transparent text-[12px] font-medium outline-none focus:bg-white"
                />
                <div className="w-[1px] h-4 bg-[var(--line-dark)] mx-1"></div>
                <input
                    type="date"
                    value={tableEndDate}
                    onChange={(e) => setTableEndDate(e.target.value)}
                    className="px-3 py-1.5 bg-transparent text-[12px] font-medium outline-none focus:bg-white"
                />
             </div>
             <button
                onClick={() => {
                  const d = new Date();
                  d.setDate(d.getDate() - 7);
                  setTableStartDate(d.toISOString().split('T')[0]);
                  setTableEndDate(new Date().toISOString().split('T')[0]);
                }}
                className="text-[11px] font-bold text-[var(--ink)] uppercase hover:text-[var(--gold)] transition-colors"
              >
                Reset
              </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-[var(--line-dark)] bg-[var(--paper)] px-4 pt-2">
          <button 
            className={`px-5 py-3 text-[13px] font-bold transition-colors border-b-2 -mb-[1px] ${activeTab === 'department' ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-transparent text-[var(--text-dim)] hover:text-[var(--ink)]'}`}
            onClick={() => setActiveTab('department')}
          >
            Department
          </button>
          <button 
            className={`px-5 py-3 text-[13px] font-bold transition-colors border-b-2 -mb-[1px] ${activeTab === 'topics' ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-transparent text-[var(--text-dim)] hover:text-[var(--ink)]'}`}
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
                    <td className="px-6 py-4 text-[13px] font-bold text-[var(--ink)]">{row.name}</td>
                    <td className="px-6 py-4 text-[13px] text-center font-medium text-[var(--ink)]">{row.opened}</td>
                    <td className="px-6 py-4 text-[13px] text-center font-medium text-[var(--ink)]">{row.assigned}</td>
                    <td className="px-6 py-4 text-[13px] text-center font-medium text-[var(--ink)]">{row.closed}</td>
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
