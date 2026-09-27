'use client';
import React, { useState } from 'react';
import { FileText, Download, Calendar, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { fetchClient } from '@/lib/apiClient';

export default function PimpinanReportsPage() {
  const { t } = useLanguage();
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleExport = async (reportId: string, title: string, format: string) => {
    const key = `${reportId}-${format}`;
    setDownloading(key);

    try {
      const res = await fetchClient('/admin/tickets');
      let data = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
      
      // Simple filtering based on report type
      if (reportId === 'weekly') {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        data = data.filter((t: any) => new Date(t.created_at) >= lastWeek);
      } else if (reportId === 'monthly') {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        data = data.filter((t: any) => new Date(t.created_at) >= lastMonth);
      } else if (reportId === 'sla') {
        data = data.filter((t: any) => t.is_overdue || (t.sla_due && new Date(t.sla_due) < new Date()));
      }
      
      const tableData = data.map((t: any) => [
        t.ticket_num || '-',
        t.reporter_name || t.reporters?.name || '-',
        t.category?.name || t.categories?.name || '-',
        t.dept?.name || t.departments?.name || '-',
        t.status || '-',
        t.created_at ? new Date(t.created_at).toLocaleDateString() : '-'
      ]);

      const headers = ['No Tiket', 'Pelapor', 'Kategori', 'Departemen', 'Status', 'Tanggal'];

      if (format === 'PDF') {
        const doc = new jsPDF();
        doc.text(`Rekap Laporan - ${title}`, 14, 15);
        autoTable(doc, {
          head: [headers],
          body: tableData,
          startY: 20
        });
        doc.save(`Rekap_${reportId}.pdf`);
      } else if (format === 'Excel') {
        const ws = XLSX.utils.aoa_to_sheet([headers, ...tableData]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Laporan");
        XLSX.writeFile(wb, `Rekap_${reportId}.xlsx`);
      }
      
      alert(`${t('reports.success_alert')} ${title} (${format}).`);
    } catch (error) {
      console.error(error);
      alert('Gagal mengekspor data');
    } finally {
      setDownloading(null);
    }
  };

  const reportList = [
    {
      id: 'weekly',
      titleKey: 'reports.weekly_title',
      descKey: 'reports.weekly_desc',
      icon: Calendar,
      iconColor: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'monthly',
      titleKey: 'reports.monthly_title',
      descKey: 'reports.monthly_desc',
      icon: FileText,
      iconColor: 'bg-indigo-50 text-indigo-600',
    },
    {
      id: 'sla',
      titleKey: 'reports.sla_title',
      descKey: 'reports.sla_desc',
      icon: ShieldCheck,
      iconColor: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 'whatsapp',
      titleKey: 'reports.wa_title',
      descKey: 'reports.wa_desc',
      icon: MessageSquare,
      iconColor: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="flex flex-col items-start gap-6 w-full max-w-[1440px] mx-auto pb-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Page Header */}
      <div className="flex flex-col items-start gap-1">
        <h1 className="text-2xl font-bold text-[var(--ink)] tracking-tight">{t('reports.page_title')}</h1>
        <p className="text-[var(--text-dim)] text-sm font-medium">{t('reports.page_desc')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {reportList.map((item) => {
          const Icon = item.icon;
          const title = t(item.titleKey);
          const isPdfLoading = downloading === `${item.id}-PDF`;
          const isExcelLoading = downloading === `${item.id}-Excel`;

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
                    <h3 className="font-bold text-[var(--ink)] text-base">{title}</h3>
                    <span className="text-[11px] font-semibold text-[var(--text-dim)] uppercase tracking-wider">{t('reports.auto_format')}</span>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-dim)] mb-6 leading-relaxed">
                  {t(item.descKey)}
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[var(--line)]">
                <button 
                  onClick={() => handleExport(item.id, title, 'PDF')}
                  disabled={!!downloading}
                  className="flex-1 py-2.5 bg-[var(--ink)] text-white text-xs font-bold rounded-xl hover:bg-[var(--text)] transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95 disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  {isPdfLoading ? t('reports.processing') : t('reports.download_pdf')}
                </button>
                <button 
                  onClick={() => handleExport(item.id, title, 'Excel')}
                  disabled={!!downloading}
                  className="flex-1 py-2.5 bg-white border border-[var(--line-dark)] text-[var(--ink)] text-xs font-bold rounded-xl hover:bg-[var(--paper-2)] transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95 disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5 text-[var(--text-dim)]" />
                  {isExcelLoading ? t('reports.processing') : t('reports.download_excel')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
