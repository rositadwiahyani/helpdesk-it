import React from 'react';
import { fetchServer } from '@/lib/apiServer';
import { Trophy, Users, CheckCircle2, Clock, Activity, BarChart2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PimpinanPerformancePage() {
  let tickets: any[] = [];
  
  try {
    tickets = await fetchServer('/admin/tickets');
    if (!Array.isArray(tickets)) tickets = [];
  } catch (error) {
    console.error("Gagal mengambil data tiket:", error);
  }

  // Calculate Teknisi Ranking
  const teknisiStats: Record<string, { name: string; total: number; resolved: number; totalTime: number }> = {};
  
  tickets.forEach(ticket => {
    if (ticket.technician_id && (ticket.technician || ticket.assigned_technician)) {
      const techName = ticket.technician?.name || ticket.assigned_technician?.name || 'Teknisi';
      if (!teknisiStats[ticket.technician_id]) {
        teknisiStats[ticket.technician_id] = { name: techName, total: 0, resolved: 0, totalTime: 0 };
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
        <h1 className="text-2xl font-bold text-[var(--ink)] tracking-tight">Laporan Performa</h1>
        <p className="text-[var(--text-dim)] text-sm font-medium">Pemantauan kinerja penanganan tiket oleh Teknisi dan Operator IT Helpdesk.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Teknisi Ranking Card */}
        <div className="bg-white p-6 rounded-2xl border border-[var(--line)] shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[var(--ink)] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Trophy className="w-4 h-4" />
              </div>
              Ranking & Produktivitas Teknisi
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-lg text-[var(--text-dim)]">
              {teknisiRanking.length} Teknisi Aktif
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--line)] text-xs font-bold text-[var(--text-dim)] uppercase tracking-wider">
                  <th className="pb-3 pr-4">Nama Teknisi</th>
                  <th className="pb-3 px-4 text-center">Selesai / Total</th>
                  <th className="pb-3 px-4 text-center">Avg Resolusi</th>
                  <th className="pb-3 pl-4 text-right">Tingkat SLA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                {teknisiRanking.length > 0 ? teknisiRanking.map((t, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 pr-4 font-semibold text-[var(--ink)] flex items-center gap-2">
                      <span className="w-5 text-xs font-mono text-[var(--text-dim)]">#{idx + 1}</span>
                      {t.name}
                    </td>
                    <td className="py-3.5 px-4 text-center text-[var(--ink)]">
                      <span className="inline-block bg-blue-50 text-blue-700 rounded-lg px-2.5 py-1 text-xs font-bold border border-blue-100">
                        {t.resolved} / {t.total}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center text-[var(--text-dim)] text-xs font-medium">
                      {t.avgTimeHours} Jam
                    </td>
                    <td className="py-3.5 pl-4 text-right">
                      <div className="inline-flex items-center gap-2 justify-end">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                          <div 
                            className={`h-full rounded-full ${t.slaAchievement >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                            style={{ width: `${t.slaAchievement}%` }}
                          />
                        </div>
                        <span className={`text-xs font-bold ${t.slaAchievement >= 80 ? 'text-emerald-700' : 'text-amber-700'}`}>
                          {t.slaAchievement}%
                        </span>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-[var(--text-dim)] text-sm">Belum ada data performa teknisi yang tercatat.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Operator Ranking Card */}
        <div className="bg-white p-6 rounded-2xl border border-[var(--line)] shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[var(--ink)] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              Kinerja Verifikasi Operator
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-lg text-[var(--text-dim)]">
              Front-Office
            </span>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 text-center py-12 px-6 bg-slate-50/50 rounded-xl border border-dashed border-[var(--line)]">
            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-[var(--line)] flex items-center justify-center mb-4 text-[var(--gold)]">
              <BarChart2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[var(--ink)] mb-1">Metrik Verifikasi Tiket Otomatis</h3>
            <p className="text-[var(--text-dim)] text-xs max-w-sm leading-relaxed">
              Seluruh tiket yang masuk diverifikasi dan dialokasikan ke departemen terkait oleh operator Helpdesk sesuai standar operasional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
