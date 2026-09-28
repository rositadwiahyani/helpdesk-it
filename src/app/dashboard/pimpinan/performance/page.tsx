'use client';
import React, { useEffect, useState } from 'react';
import { Trophy, Users, BarChart2 } from 'lucide-react';
import { fetchClient } from '@/lib/apiClient';
import { useLanguage } from '@/context/LanguageContext';

export default function PimpinanPerformancePage() {
  const { t } = useLanguage();
  const [tickets, setTickets] = useState<any[]>([]);
  const [operators, setOperators] = useState<any[]>([]);

  useEffect(() => {
    fetchClient('/admin/tickets')
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setTickets(data);
      })
      .catch((err) => {
        console.error('Gagal mengambil data tiket:', err);
      });

    // Fetch operators
    import('@/lib/supabase').then(({ supabase }) => {
      supabase.from('staff_profiles').select('*').eq('role', 'operator').then(({ data }) => {
        if (data) setOperators(data);
      });
    });
  }, []);

  // Calculate Teknisi Ranking
  const teknisiStats: Record<string, { name: string; email: string; total: number; resolved: number; totalTime: number }> = {};

  tickets.forEach(ticket => {
    if (ticket.technician_id && (ticket.technician || ticket.assigned_technician)) {
      const techName = ticket.technician?.name || ticket.assigned_technician?.name || 'Teknisi';
      const techEmail = ticket.technician?.email || ticket.assigned_technician?.email || '-';
      if (!teknisiStats[ticket.technician_id]) {
        teknisiStats[ticket.technician_id] = { name: techName, email: techEmail, total: 0, resolved: 0, totalTime: 0 };
      }
      teknisiStats[ticket.technician_id].total++;
      if (['RESOLVED', 'CLOSED', 'RESOLVED_BY_SYSTEM'].includes((ticket.status || '').toUpperCase())) {
        teknisiStats[ticket.technician_id].resolved++;
        if (ticket.updated_at && ticket.created_at) {
          const timeDiff = new Date(ticket.updated_at).getTime() - new Date(ticket.created_at).getTime();
          teknisiStats[ticket.technician_id].totalTime += timeDiff;
        }
      }
    }
  });

  const teknisiRanking = Object.values(teknisiStats).map(t => {
    const avgTimeMs = t.resolved > 0 ? t.totalTime / t.resolved : 0;
    const avgTimeHours = (avgTimeMs / (1000 * 60 * 60)).toFixed(1);
    const slaAchievement = t.total > 0 ? Math.round((t.resolved / t.total) * 100) : 0;
    return { ...t, avgTimeHours, slaAchievement };
  }).sort((a, b) => b.resolved - a.resolved);

  return (
    <div className="flex flex-col items-start gap-6 w-full max-w-[1440px] mx-auto pb-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Page Header */}
      <div className="flex flex-col items-start gap-1">
        <h1 className="text-2xl font-bold text-[var(--ink)] tracking-tight">{t('perf.page_title', 'Laporan Performa')}</h1>
        <p className="text-[var(--text-dim)] text-sm font-medium">{t('perf.page_desc', 'Pemantauan kinerja penanganan tiket Helpdesk IT.')}</p>
      </div>

      <div className="w-full">
        {/* Teknisi Ranking Card */}
        <div className="bg-white p-6 rounded-2xl border border-[var(--line)] shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[var(--ink)] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Trophy className="w-4 h-4" />
              </div>
              {t('perf.tech_ranking_title', 'Laporan Kinerja')}
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-lg text-[var(--text-dim)]">
              {teknisiRanking.length} {t('perf.active_tech', 'Teknisi Aktif')}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--line)] text-xs font-bold text-[var(--text-dim)] uppercase tracking-wider">
                  <th className="pb-3 pr-4">Nama</th>
                  <th className="pb-3 px-4">Email</th>
                  <th className="pb-3 px-4 text-center">Selesai</th>
                  <th className="pb-3 pl-4 text-right">Tingkat SLA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                {teknisiRanking.length > 0 ? teknisiRanking.map((tech, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 pr-4 font-semibold text-[var(--ink)] flex items-center gap-2">
                      <span className="w-5 text-xs font-mono text-[var(--text-dim)]">#{idx + 1}</span>
                      {tech.name}
                    </td>
                    <td className="py-3.5 px-4 text-[var(--text-dim)]">
                      {tech.email}
                    </td>
                    <td className="py-3.5 px-4 text-center text-[var(--ink)]">
                      <span className="inline-block bg-blue-50 text-blue-700 rounded-lg px-2.5 py-1 text-xs font-bold border border-blue-100">
                        {tech.resolved}
                      </span>
                    </td>
                    <td className="py-3.5 pl-4 text-right">
                      <div className="inline-flex items-center gap-2 justify-end">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                          <div
                            className={`h-full rounded-full ${tech.slaAchievement >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            style={{ width: `${tech.slaAchievement}%` }}
                          />
                        </div>
                        <span className={`text-xs font-bold ${tech.slaAchievement >= 80 ? 'text-emerald-700' : 'text-amber-700'}`}>
                          {tech.slaAchievement}%
                        </span>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-[var(--text-dim)] text-sm">{t('perf.no_data', 'Belum ada data performa teknisi yang tercatat.')}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
