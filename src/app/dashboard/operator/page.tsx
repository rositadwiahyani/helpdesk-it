import React from 'react';
import OperatorStatistics from '@/components/admin/tickets/OperatorStatistics';
import { fetchServer } from '@/lib/apiServer';

export const dynamic = 'force-dynamic';

export default async function OperatorDashboard() {
    // Ambil data dashboard dari Express API
    let dashboardData;
    try {
        const response = await fetchServer('/operator/dashboard');
        dashboardData = response.data;
    } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
        // Fallback jika API gagal
        dashboardData = {
            tickets: [],
            ticketLogs: [],
            categories: [],
            departments: [],
            counts: { todayCount: 0, verifiedCount: 0, openCount: 0 }
        };
    }

    const { tickets, ticketLogs, categories: formattedCategories, departments, counts } = dashboardData;
    const { todayCount, verifiedCount, openCount } = counts;

    return (
        <div className="flex flex-col gap-6 p-6 md:p-10">
            <div>
                <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Beranda Operator</h2>
                <p className="text-[var(--text-dim)] text-sm">Ringkasan statistik dan aktivitas helpdesk secara real-time.</p>
            </div>

            {/* Statistik Hari Ini */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2">Tiket Dibuat Hari Ini</div>
                        <div className="text-4xl font-bold text-[var(--ink)]">{todayCount || 0}</div>
                    </div>
                    <div className="text-xs text-[var(--text-dim)] mt-4">Total masuk hari ini</div>
                </div>
                <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2">Menunggu Verifikasi</div>
                        <div className="text-4xl font-bold text-[var(--gold)]">{openCount}</div>
                    </div>
                    <div className="text-xs text-[var(--text-dim)] mt-4">Status Open</div>
                </div>
                <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2">Diverifikasi Hari Ini</div>
                        <div className="text-4xl font-bold text-[var(--ink)]">{verifiedCount || 0}</div>
                    </div>
                    <div className="text-xs text-[var(--text-dim)] mt-4">Diterima / Ditolak</div>
                </div>
            </div>

            {/* Komponen Statistik & Grafik */}
            <OperatorStatistics 
                tickets={tickets || []}
                ticketLogs={ticketLogs || []}
                categories={formattedCategories}
                departments={departments || []}
            />
        </div>
    );
}
