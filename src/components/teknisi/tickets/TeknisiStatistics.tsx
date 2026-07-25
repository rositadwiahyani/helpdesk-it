'use client';

import React, { useState, useMemo } from 'react';

type Ticket = any;
type Category = { id: string; name: string };

interface TeknisiStatisticsProps {
  tickets: Ticket[];
  categories: Category[];
}

export default function TeknisiStatistics({ tickets, categories }: TeknisiStatisticsProps) {
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  
  const [deptId, setDeptId] = useState<number | null>(null);

  React.useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            if (user.dept_id) setDeptId(user.dept_id);
        } catch (e) {}
    }
  }, []);

  const filteredTickets = useMemo(() => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    return tickets.filter((t) => {
      const d = new Date(t.created_at);
      return d >= start && d <= end;
    });
  }, [tickets, startDate, endDate]);

  const statsTable = useMemo(() => {
    const topicMap: Record<string, any> = {};

    const filteredCategories = deptId 
      ? categories.filter((c: any) => c.dept_id === deptId)
      : categories;

    filteredCategories.forEach((c) => {
      topicMap[c.id] = { name: c.name, opened: 0, resolved: 0 };
    });
    // Menghilangkan "Kategori Lain" jika kita hanya fokus pada kategori departemen sendiri
    // topicMap['unassigned'] = { name: 'Kategori Lain', opened: 0, resolved: 0 };

    filteredTickets.forEach((t) => {
      const catId = t.category_id || 'unassigned';
      if (!topicMap[catId]) {
        topicMap[catId] = { name: t.category?.name || 'Unknown', opened: 0, resolved: 0 };
      }
      // Hanya hitung jika kategori termasuk dalam filter departemen kita
      if (topicMap[catId]) {
          topicMap[catId].opened += 1;
          
          if (t.status === 'Resolved' || t.status === 'Closed') {
            topicMap[catId].resolved += 1;
          }
      }
    });

    return Object.values(topicMap)
      .filter((t: any) => t.opened > 0 || t.resolved > 0)
      .sort((a: any, b: any) => b.opened - a.opened);
  }, [filteredTickets, categories, deptId]);

  const handleReset = () => {
    const d = new Date();
    setEndDate(d.toISOString().split('T')[0]);
    d.setDate(d.getDate() - 30);
    setStartDate(d.toISOString().split('T')[0]);
  };

  return (
    <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-[var(--ink)]">Distribusi Kategori</h3>
          <p className="text-sm text-[var(--text-dim)]">Berdasarkan tiket yang ditugaskan ke departemen Anda.</p>
        </div>
        
        {/* Filter Tanggal */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-1 ml-1">Mulai Tanggal</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="py-1.5 px-3 border border-[var(--line-dark)] rounded-lg text-sm text-[var(--ink)] bg-[var(--paper-2)] outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-shadow"
              />
            </div>
            <span className="text-[var(--text-dim)] mt-5">-</span>
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-1 ml-1">Sampai Tanggal</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="py-1.5 px-3 border border-[var(--line-dark)] rounded-lg text-sm text-[var(--ink)] bg-[var(--paper-2)] outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-shadow"
              />
            </div>
          </div>
          
          <button 
            onClick={handleReset}
            className="mt-5 py-1.5 px-4 bg-white border border-[var(--line-dark)] rounded-lg text-sm font-medium text-[var(--ink)] hover:bg-[var(--paper-2)] transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold">
            <tr>
              <th className="px-5 py-3">Topik / Kategori</th>
              <th className="px-5 py-3 text-center">Total Masuk</th>
              <th className="px-5 py-3 text-center">Diselesaikan</th>
              <th className="px-5 py-3 text-right">Completion Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {statsTable.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-slate-400 font-medium">
                  Tidak ada data untuk rentang waktu ini.
                </td>
              </tr>
            ) : (
              statsTable.map((item: any) => {
                const rate = item.opened === 0 ? 0 : Math.round((item.resolved / item.opened) * 100);
                return (
                  <tr key={item.name} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3 font-semibold text-slate-700">{item.name}</td>
                    <td className="px-5 py-3 text-center text-slate-600">{item.opened}</td>
                    <td className="px-5 py-3 text-center text-emerald-600 font-medium">{item.resolved}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${rate >= 75 ? 'bg-emerald-500' : rate >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${rate}%` }}></div>
                        </div>
                        <span className="text-slate-600 font-medium w-9 text-right">{rate}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
