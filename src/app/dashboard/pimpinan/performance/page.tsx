'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { Trophy } from 'lucide-react';
import { fetchClient } from '@/lib/apiClient';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';

export default function PimpinanPerformancePage() {
  const { t } = useLanguage();
  const [tickets, setTickets] = useState<any[]>([]);
  const [staffList, setStaffList] = useState<any[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [loadingStaff, setLoadingStaff] = useState(true);

  useEffect(() => {
    // Ambil semua tiket
    fetchClient('/admin/tickets')
      .then(res => {
        const data = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
          ? res.data
          : [];
        setTickets(data);
      })
      .catch(err => console.error('Gagal mengambil data tiket:', err))
      .finally(() => setLoadingTickets(false));

    // Ambil semua operator & agent dari staff_profiles
    supabase
      .from('staff_profiles')
      .select('id, name, email, role')
      .in('role', ['operator', 'teknisi', 'agent'])
      .then(({ data, error }) => {
        if (error) console.error('Gagal mengambil data staff:', error);
        if (data) setStaffList(data);
      })
      .finally(() => setLoadingStaff(false));
  }, []);

  // Hitung statistik kinerja berdasarkan tiket
  const performanceData = useMemo(() => {
    // Buat map untuk setiap staff dari staffList
    const statsMap: Record<
      string,
      {
        id: string;
        name: string;
        email: string;
        role: string;
        total: number;
        resolved: number;
        totalTimeMs: number;
      }
    > = {};

    staffList.forEach(s => {
      statsMap[s.id] = {
        id: s.id,
        name: s.name || '-',
        email: s.email || '-',
        role: s.role,
        total: 0,
        resolved: 0,
        totalTimeMs: 0,
      };
    });

    // Hitung tiket yang ditangani masing-masing staff
    tickets.forEach(ticket => {
      // Teknisi / agent yang ditugaskan via tech_id
      const techId = ticket.tech_id;
      if (techId && statsMap[techId]) {
        statsMap[techId].total++;
        const statusUp = (ticket.status || '').toUpperCase();
        if (
          ['RESOLVED', 'CLOSED', 'RESOLVED_BY_SYSTEM', 'WAITING CONFIRMATION'].includes(
            statusUp
          )
        ) {
          statsMap[techId].resolved++;
          if (ticket.updated_at && ticket.created_at) {
            const diff =
              new Date(ticket.updated_at).getTime() -
              new Date(ticket.created_at).getTime();
            if (diff > 0) statsMap[techId].totalTimeMs += diff;
          }
        }
      }
    });

    // Konversi ke array dan hitung tingkat SLA
    return Object.values(statsMap)
      .filter(s => s.total > 0) // Hanya tampilkan yang punya aktivitas
      .map(s => {
        const slaRate =
          s.total > 0 ? Math.round((s.resolved / s.total) * 100) : 0;
        return { ...s, slaRate };
      })
      .sort((a, b) => b.resolved - a.resolved);
  }, [tickets, staffList]);

  const isLoading = loadingTickets || loadingStaff;

  return (
    <div className="flex flex-col items-start gap-6 w-full max-w-[1440px] mx-auto pb-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Page Header */}
      <div className="flex flex-col items-start gap-1">
        <h1 className="text-2xl font-bold text-[var(--ink)] tracking-tight">
          {t('perf.page_title', 'Laporan Performa')}
        </h1>
        <p className="text-[var(--text-dim)] text-sm font-medium">
          Pemantauan Kinerja Penanganan Tiket Helpdesk IT
        </p>
      </div>

      <div className="w-full">
        {/* Laporan Kinerja Card */}
        <div className="bg-white p-6 rounded-2xl border border-[var(--line)] shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[var(--ink)] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Trophy className="w-4 h-4" />
              </div>
              Laporan Kinerja
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-lg text-[var(--text-dim)]">
              {performanceData.length} {t('perf.active_tech', 'Aktif')}
            </span>
          </div>

          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-[var(--gold)]" />
              <p className="text-xs font-semibold text-[var(--text-dim)]">
                Memuat data kinerja...
              </p>
            </div>
          ) : (
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
                  {performanceData.length > 0 ? (
                    performanceData.map((staff, idx) => (
                      <tr
                        key={staff.id}
                        className="hover:bg-slate-50/70 transition-colors"
                      >
                        <td className="py-3.5 pr-4 font-semibold text-[var(--ink)]">
                          <div className="flex items-center gap-2">
                            <span className="w-5 text-xs font-mono text-[var(--text-dim)]">
                              #{idx + 1}
                            </span>
                            <div>
                              <div>{staff.name}</div>
                              <div className="text-[11px] font-normal text-[var(--text-dim)] capitalize">
                                {staff.role}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[var(--text-dim)]">
                          {staff.email}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-block bg-blue-50 text-blue-700 rounded-lg px-2.5 py-1 text-xs font-bold border border-blue-100">
                            {staff.resolved}
                          </span>
                        </td>
                        <td className="py-3.5 pl-4 text-right">
                          <div className="inline-flex items-center gap-2 justify-end">
                            <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                              <div
                                className={`h-full rounded-full ${
                                  staff.slaRate >= 80
                                    ? 'bg-emerald-500'
                                    : 'bg-amber-500'
                                }`}
                                style={{ width: `${staff.slaRate}%` }}
                              />
                            </div>
                            <span
                              className={`text-xs font-bold ${
                                staff.slaRate >= 80
                                  ? 'text-emerald-700'
                                  : 'text-amber-700'
                              }`}
                            >
                              {staff.slaRate}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-8 text-center text-[var(--text-dim)] text-sm"
                      >
                        {t(
                          'perf.no_data',
                          'Belum ada data performa yang tercatat.'
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
