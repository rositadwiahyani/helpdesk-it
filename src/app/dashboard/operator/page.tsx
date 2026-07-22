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
        <div className="w-full h-full text-slate-800 font-sans p-6 md:p-10">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Operator</h1>
                    <p className="text-sm text-slate-500 mt-1">Ringkasan statistik dan aktivitas helpdesk.</p>
                </div>
            </div>

            {/* Statistik Hari Ini */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex-1 shadow-sm">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tiket Dibuat Hari Ini</div>
                    <div className="text-3xl font-black text-slate-800">{todayCount || 0}</div>
                    <div className="text-xs text-slate-500 mt-1">Total masuk hari ini</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex-1 shadow-sm">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Menunggu Verifikasi</div>
                    <div className="text-3xl font-black text-orange-600">{openCount}</div>
                    <div className="text-xs text-slate-500 mt-1">Status Open</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex-1 shadow-sm">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Diverifikasi Hari Ini</div>
                    <div className="text-3xl font-black text-emerald-600">{verifiedCount || 0}</div>
                    <div className="text-xs text-slate-500 mt-1">Diterima / Ditolak</div>
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
