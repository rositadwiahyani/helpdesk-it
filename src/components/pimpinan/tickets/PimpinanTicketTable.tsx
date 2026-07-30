'use client';
import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

export default function PimpinanTicketTable({ tickets }: { tickets: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  
  const paginatedTickets = tickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'OPEN': return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      case 'CLOSED': return 'bg-slate-100 text-slate-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch(priority) {
      case 'CRITICAL': return 'bg-red-100 text-red-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800';
      case 'MEDIUM': return 'bg-blue-100 text-blue-800';
      case 'LOW': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="p-4">ID Tiket</th>
              <th className="p-4">Tanggal</th>
              <th className="p-4">Pelapor</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Prioritas</th>
              <th className="p-4">Status</th>
              <th className="p-4">Teknisi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {paginatedTickets.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">
                  Tidak ada tiket yang ditemukan.
                </td>
              </tr>
            ) : (
              paginatedTickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">{t.id}</td>
                  <td className="p-4 text-slate-600">
                    {format(parseISO(t.created_at), 'dd MMM yyyy, HH:mm', { locale: id })}
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-slate-900">{t.reporters?.name || '-'}</div>
                    <div className="text-xs text-slate-500">{t.reporters?.phone || '-'}</div>
                  </td>
                  <td className="p-4 text-slate-600">
                    {t.categories?.name || '-'}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${getPriorityStyle(t.priority)}`}>
                      {t.priority || 'MEDIUM'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(t.status)}`}>
                      {t.status || 'OPEN'}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">
                    {t.technician?.name || '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <p className="text-sm text-slate-500">
            Menampilkan <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-medium">{Math.min(currentPage * itemsPerPage, tickets.length)}</span> dari <span className="font-medium">{tickets.length}</span> tiket
          </p>
          <div className="flex gap-1">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="px-3 py-1.5 border border-slate-300 rounded-md text-sm font-medium text-slate-600 disabled:opacity-50 disabled:bg-slate-100 hover:bg-white"
            >
              Sebelumnya
            </button>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="px-3 py-1.5 border border-slate-300 rounded-md text-sm font-medium text-slate-600 disabled:opacity-50 disabled:bg-slate-100 hover:bg-white"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
