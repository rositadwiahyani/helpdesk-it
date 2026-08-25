'use client';
import React, { useState } from 'react';
import { FileText, Download, Calendar, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PimpinanReportsPage() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleExport = (title: string, format: string) => {
    const key = `${title}-${format}`;
    setDownloading(key);
    setTimeout(() => {
      setDownloading(null);
      alert(`Berhasil membuat berkas ${title} (${format}). Unduhan segera dimulai.`);
    }, 800);
  };

  const reportList = [
    {
      id: 'weekly',
      title: 'Laporan Mingguan',
      desc: 'Rekapitulasi tren tiket, performa SLA, dan kinerja penanganan tiket 7 hari terakhir.',
      icon: Calendar,
      iconColor: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'monthly',
      title: 'Laporan Bulanan Eksekutif',
      desc: 'Ringkasan komprehensif, evaluasi pencapaian target bulanan, dan beban per departemen.',
      icon: FileText,
      iconColor: 'bg-indigo-50 text-indigo-600',
    },
    {
      id: 'sla',
      title: 'Laporan Kepatuhan SLA',
      desc: 'Analisis tiket yang melewati SLA, akar masalah kendala, dan rekomendasi mitigasi.',
      icon: ShieldCheck,
      iconColor: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 'whatsapp',
      title: 'Rekap Notifikasi & Bot WA',
      desc: 'Statistik pesan WhatsApp notifikasi tiket yang terkirim ke pelapor dan operator.',
      icon: MessageSquare,
      iconColor: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="flex flex-col items-start gap-6 w-full max-w-[1440px] mx-auto pb-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Page Header */}
      <div className="flex flex-col items-start gap-1">
        <h1 className="text-2xl font-bold text-[var(--ink)] tracking-tight">Rekap Laporan</h1>
        <p className="text-[var(--text-dim)] text-sm font-medium">Unduh ringkasan berkala dan dokumen analitik operasional IT Helpdesk.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {reportList.map((item) => {
          const Icon = item.icon;
          const isPdfLoading = downloading === `${item.title}-PDF`;
          const isExcelLoading = downloading === `${item.title}-Excel`;

          return (
            <div 
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-[var(--line)] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${item.iconColor} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--ink)] text-base">{item.title}</h3>
                    <span className="text-[11px] font-semibold text-[var(--text-dim)] uppercase tracking-wider">Format Otomatis</span>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-dim)] mb-6 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[var(--line)]">
                <button 
                  onClick={() => handleExport(item.title, 'PDF')}
                  disabled={!!downloading}
                  className="flex-1 py-2.5 bg-[var(--ink)] text-white text-xs font-bold rounded-xl hover:bg-[var(--text)] transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95 disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  {isPdfLoading ? 'Memproses...' : 'Unduh PDF'}
                </button>
                <button 
                  onClick={() => handleExport(item.title, 'Excel')}
                  disabled={!!downloading}
                  className="flex-1 py-2.5 bg-white border border-[var(--line-dark)] text-[var(--ink)] text-xs font-bold rounded-xl hover:bg-[var(--paper-2)] transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95 disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5 text-[var(--text-dim)]" />
                  {isExcelLoading ? 'Memproses...' : 'Unduh Excel'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
