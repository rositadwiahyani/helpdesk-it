'use client';
import React from 'react';

export default function PimpinanReportsPage() {
  const handleExport = (type: string) => {
    alert(`Mengekspor laporan format ${type}...\n(Dalam sistem nyata, ini akan mengunduh file)`);
  };

  return (
    <div className="flex flex-col items-start gap-6 w-full max-w-[1440px] mx-auto pb-10">
      <div className="flex flex-col items-start gap-1">
        <h1 className="text-slate-900 font-extrabold text-2xl tracking-tight">Rekap Laporan</h1>
        <p className="text-slate-500 font-medium text-sm">Unduh ringkasan berkala dan statistik data operasional.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">Laporan Mingguan</h3>
            <p className="text-sm text-slate-500 mb-6">Rekapitulasi tren tiket, performa SLA, dan kinerja teknisi dalam 7 hari terakhir.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleExport('PDF')} className="flex-1 py-2 bg-[#0F172A] text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">PDF</button>
            <button onClick={() => handleExport('Excel')} className="flex-1 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">Excel</button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">Laporan Bulanan</h3>
            <p className="text-sm text-slate-500 mb-6">Ringkasan eksekutif komprehensif, evaluasi pencapaian target bulan ini.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleExport('PDF')} className="flex-1 py-2 bg-[#0F172A] text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">PDF</button>
            <button onClick={() => handleExport('Excel')} className="flex-1 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">Excel</button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">Rekap Riwayat Pesan Bot</h3>
            <p className="text-sm text-slate-500 mb-6">Statistik pengiriman pesan WhatsApp Bot (berhasil/gagal) dan tren interaksi pengguna.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleExport('PDF')} className="flex-1 py-2 bg-[#0F172A] text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">PDF</button>
            <button onClick={() => handleExport('Excel')} className="flex-1 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">Excel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
