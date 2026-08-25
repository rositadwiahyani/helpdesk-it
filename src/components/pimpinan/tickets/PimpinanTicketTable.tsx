'use client';
import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PimpinanTicketTable({ 
  tickets, 
  isEscalatedTab = false, 
  onAction 
}: { 
  tickets: any[]; 
  isEscalatedTab?: boolean; 
  onAction?: (id: string, action: 'CLOSE' | 'RETURN') => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(tickets.length / itemsPerPage) || 1;
  
  const paginatedTickets = tickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    const s = (status || 'OPEN').toUpperCase();
    switch (s) {
      case 'WAITING VERIFICATION':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">Verifikasi</span>;
      case 'NEW':
      case 'OPEN':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">Baru / Open</span>;
      case 'IN PROGRESS':
      case 'DIPROSES':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">Diproses</span>;
      case 'WAITING CONFIRMATION':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">Konfirmasi Pelapor</span>;
      case 'RESOLVED':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">Diselesaikan</span>;
      case 'CLOSED':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">Ditutup</span>;
      case 'ESCALATED':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">Eskalasi</span>;
      case 'DITOLAK':
      case 'REJECTED':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">Ditolak</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const p = (priority || 'SEDANG').toUpperCase();
    switch (p) {
      case 'KRITIS':
      case 'CRITICAL':
        return <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-red-100 text-red-700">KRITIS</span>;
      case 'TINGGI':
      case 'HIGH':
        return <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-orange-100 text-orange-700">TINGGI</span>;
      case 'SEDANG':
      case 'MEDIUM':
        return <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-100 text-blue-700">SEDANG</span>;
      case 'RENDAH':
      case 'LOW':
        return <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-600">RENDAH</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-600">{priority}</span>;
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    try {
      return format(parseISO(dateStr), 'dd MMM yyyy, HH:mm', { locale: id });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-[var(--line)] text-xs font-bold text-[var(--text-dim)] uppercase tracking-wider">
              <th className="py-3.5 px-4">No. Tiket</th>
              <th className="py-3.5 px-4">Waktu</th>
              <th className="py-3.5 px-4">Pelapor</th>
              <th className="py-3.5 px-4">Kategori & Topik</th>
              <th className="py-3.5 px-4 text-center">Prioritas</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4">Teknisi / Petugas</th>
              {isEscalatedTab && <th className="py-3.5 px-4 text-center">Aksi Pimpinan</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {paginatedTickets.length === 0 ? (
              <tr>
                <td colSpan={isEscalatedTab ? 8 : 7} className="p-12 text-center text-[var(--text-dim)] font-medium">
                  Tidak ada data tiket yang sesuai kriteria.
                </td>
              </tr>
            ) : (
              paginatedTickets.map((t) => {
                const reporterName = t.reporter_name || t.reporters?.name || 'Anonim';
                const reporterInfo = t.nim_nip || t.reporters?.phone || t.phone || '';
                const categoryName = t.category?.name || t.categories?.name || '-';
                const subject = t.subject || t.title || 'Tanpa Judul';
                const technicianName = t.technician?.name || t.assigned_technician?.name || '-';

                return (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* No. Tiket */}
                    <td className="py-4 px-4 font-mono font-bold text-[var(--ink)]">
                      {t.ticket_num || `#${t.id.slice(0, 8)}`}
                    </td>

                    {/* Waktu */}
                    <td className="py-4 px-4 text-[var(--text-dim)] text-xs whitespace-nowrap">
                      {formatDate(t.created_at)}
                    </td>

                    {/* Pelapor */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-[var(--ink)]">{reporterName}</div>
                      {reporterInfo && <div className="text-xs text-[var(--text-dim)]">{reporterInfo}</div>}
                    </td>

                    {/* Kategori & Topik */}
                    <td className="py-4 px-4 max-w-xs">
                      <div className="font-medium text-[var(--ink)] truncate" title={subject}>{subject}</div>
                      <div className="text-xs text-[var(--text-dim)]">{categoryName}</div>
                    </td>

                    {/* Prioritas */}
                    <td className="py-4 px-4 text-center">
                      {getPriorityBadge(t.priority)}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      {getStatusBadge(t.status)}
                    </td>

                    {/* Teknisi */}
                    <td className="py-4 px-4 text-[var(--ink)] text-xs font-medium">
                      {technicianName !== '-' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 font-semibold text-slate-700">
                          {technicianName}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Belum ditugaskan</span>
                      )}
                    </td>

                    {/* Aksi Eskalasi */}
                    {isEscalatedTab && (
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => onAction && onAction(t.id, 'CLOSE')}
                            className="px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-black transition-colors shadow-sm"
                          >
                            Tutup Paksa
                          </button>
                          <button 
                            onClick={() => onAction && onAction(t.id, 'RETURN')}
                            className="px-3 py-1 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
                          >
                            Kembalikan
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
          <p className="text-xs font-medium text-[var(--text-dim)]">
            Menampilkan <span className="font-bold text-[var(--ink)]">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-bold text-[var(--ink)]">{Math.min(currentPage * itemsPerPage, tickets.length)}</span> dari <span className="font-bold text-[var(--ink)]">{tickets.length}</span> tiket
          </p>
          <div className="flex items-center gap-1.5">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="p-2 border border-[var(--line-dark)] rounded-lg text-sm font-medium text-[var(--ink)] bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--paper-2)] transition-colors shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold px-2 text-[var(--text-dim)]">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="p-2 border border-[var(--line-dark)] rounded-lg text-sm font-medium text-[var(--ink)] bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--paper-2)] transition-colors shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
