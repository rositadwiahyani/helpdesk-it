import React from 'react';
import { fetchServer } from '@/lib/apiServer';

export default async function PimpinanSlaPage() {
  let dashboardData: any = {};
  
  try {
    dashboardData = await fetchServer('/admin/dashboard');
  } catch (error) {
    console.error("Gagal mengambil data SLA:", error);
  }

  const slaHealth = dashboardData?.slaHealth || { CRITICAL: 100, HIGH: 100, MEDIUM: 100, LOW: 100 };
  const slaKeys = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

  const getPriorityColor = (p: string) => {
    switch(p) {
      case 'CRITICAL': return 'bg-red-500';
      case 'HIGH': return 'bg-orange-500';
      case 'MEDIUM': return 'bg-blue-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="flex flex-col items-start gap-6 w-full max-w-[1440px] mx-auto pb-10">
      <div className="flex flex-col items-start gap-1">
        <h1 className="text-slate-900 font-extrabold text-2xl tracking-tight">Laporan SLA (Service Level Agreement)</h1>
        <p className="text-slate-500 font-medium text-sm">Pemantauan kepatuhan SLA berdasarkan tingkat prioritas tiket.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Pencapaian SLA */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center text-sm">✓</span>
            Pencapaian SLA per Prioritas
          </h2>
          
          <div className="flex flex-col gap-6">
            {slaKeys.map(p => {
              const val = slaHealth[p] || 0;
              return (
                <div key={p} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-slate-700">{p}</span>
                    <span className="font-bold text-slate-900">{val}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${getPriorityColor(p)}`} 
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tiket Melewati SLA */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center text-sm">⚠️</span>
            Tiket Mendekati / Melewati SLA
          </h2>
          <div className="flex flex-col items-center justify-center flex-1 text-center py-10 px-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
              <span className="text-2xl">🎉</span>
            </div>
            <h3 className="text-slate-700 font-medium mb-1">Kinerja Sangat Baik!</h3>
            <p className="text-slate-500 text-sm">Saat ini tidak ada tiket yang melewati batas target SLA.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
