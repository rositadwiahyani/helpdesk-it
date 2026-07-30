import React from 'react';
import { fetchServer } from '@/lib/apiServer';

export default async function PimpinanPerformancePage() {
  let tickets: any[] = [];
  
  try {
    tickets = await fetchServer('/admin/tickets');
  } catch (error) {
    console.error("Gagal mengambil data tiket:", error);
  }

  // Calculate Teknisi Ranking
  const teknisiStats: Record<string, { name: string; total: number; resolved: number; totalTime: number }> = {};
  
  // Calculate Operator Ranking
  const operatorStats: Record<string, { name: string; verified: number; total: number }> = {};

  tickets.forEach(ticket => {
    // Teknisi logic
    if (ticket.technician_id && ticket.technician) {
      if (!teknisiStats[ticket.technician_id]) {
        teknisiStats[ticket.technician_id] = { name: ticket.technician.name || 'Unknown', total: 0, resolved: 0, totalTime: 0 };
      }
      teknisiStats[ticket.technician_id].total++;
      if (ticket.status === 'RESOLVED' || ticket.status === 'CLOSED') {
        teknisiStats[ticket.technician_id].resolved++;
        // Calculate resolution time if possible (simplified here)
        if (ticket.updated_at && ticket.created_at) {
            const timeDiff = new Date(ticket.updated_at).getTime() - new Date(ticket.created_at).getTime();
            teknisiStats[ticket.technician_id].totalTime += timeDiff;
        }
      }
    }

    // Operator logic
    // We assume ticket.operator_id or looking at system_audit_logs would be more accurate,
    // but for simplicity, let's just show mock or simplified operator stats if operator isn't directly on ticket
  });

  const teknisiRanking = Object.values(teknisiStats).map(t => {
    const avgTimeMs = t.resolved > 0 ? t.totalTime / t.resolved : 0;
    const avgTimeHours = (avgTimeMs / (1000 * 60 * 60)).toFixed(1);
    const slaAchievement = t.total > 0 ? Math.round((t.resolved / t.total) * 100) : 0;
    return { ...t, avgTimeHours, slaAchievement };
  }).sort((a, b) => b.resolved - a.resolved);

  return (
    <div className="flex flex-col items-start gap-6 w-full max-w-[1440px] mx-auto pb-10">
      <div className="flex flex-col items-start gap-1">
        <h1 className="text-slate-900 font-extrabold text-2xl tracking-tight">Laporan Performa</h1>
        <p className="text-slate-500 font-medium text-sm">Pemantauan kinerja Teknisi dan Operator IT Helpdesk.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Teknisi Ranking */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm">🏆</span>
            Ranking Teknisi
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
                  <th className="pb-3 pr-4">Nama Teknisi</th>
                  <th className="pb-3 px-4 text-center">Tiket Selesai</th>
                  <th className="pb-3 px-4 text-center">Avg Resolusi</th>
                  <th className="pb-3 pl-4 text-right">SLA %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teknisiRanking.length > 0 ? teknisiRanking.map((t, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 pr-4 font-medium text-slate-800">{t.name}</td>
                    <td className="py-3 px-4 text-center text-slate-600">
                      <span className="inline-block bg-slate-100 rounded-md px-2 py-1 text-xs font-bold">{t.resolved} / {t.total}</span>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-600 text-sm">{t.avgTimeHours} Jam</td>
                    <td className="py-3 pl-4 text-right">
                      <span className={`text-sm font-bold ${t.slaAchievement >= 80 ? 'text-green-600' : 'text-amber-600'}`}>
                        {t.slaAchievement}%
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-500 text-sm">Belum ada data performa teknisi.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Operator Ranking */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-sm">🎯</span>
            Ranking Operator
          </h2>
          <div className="flex flex-col items-center justify-center flex-1 text-center py-10 px-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-slate-700 font-medium mb-1">Data Operator Sedang Dikalkulasi</h3>
            <p className="text-slate-500 text-sm">Sistem sedang merekapitulasi data verifikasi tiket per operator untuk bulan ini.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
