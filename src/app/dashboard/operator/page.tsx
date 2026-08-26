import React from 'react';
import PriorityTicketList from '@/components/operator/tickets/PriorityTicketList';
import OperatorStatistics from '@/components/admin/tickets/OperatorStatistics';
import { fetchServer } from '@/lib/apiServer';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

export const dynamic = 'force-dynamic';

export default async function OperatorDashboard() {
    // Ambil data dashboard dari Express API
    let dashboardData;
    try {
        const response = await fetchServer('/operator/dashboard');
        dashboardData = response.data;
    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.error("Gagal mengambil data dashboard:", error);
        // Fallback jika API gagal
        dashboardData = {
            tickets: [],
            ticketLogs: [],
            categories: [],
            departments: [],
            counts: { todayCount: 0, verifiedCount: 0, openCount: 0, waitingVerificationCount: 0 }
        };
    }

    const { tickets, ticketLogs, categories, departments, counts } = dashboardData;
    const { todayCount, verifiedCount, waitingVerificationCount, systemResolvedCount } = counts || {};

    return (
        <div className="flex flex-col gap-6 p-6 md:p-10">
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Beranda Operator</h2>
                <p className="text-[var(--text-dim)] text-sm">Ringkasan aktivitas tiket yang butuh perhatian Anda.</p>
            </div>

            {/* Statistik Penting */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
                <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                        <div className="text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2">Tiket Masuk Hari Ini</div>
                        <div className="text-4xl font-bold text-[var(--ink)]">
                            <AnimatedCounter value={todayCount || 0} duration={1200} />
                        </div>
                    </div>
                    <div className="text-xs text-[var(--text-dim)] mt-4">Total tiket baru hari ini</div>
                </div>
                <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow bg-amber-50/30">
                    <div>
                        <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-2">Menunggu Verifikasi</div>
                        <div className="text-4xl font-bold text-amber-600">
                            <AnimatedCounter value={waitingVerificationCount || 0} duration={1500} />
                        </div>
                    </div>
                    <div className="text-xs text-amber-700 mt-4">Butuh tindakan segera</div>
                </div>
                <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                        <div className="text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2">Tiket Self Resolved Hari Ini</div>
                        <div className="text-4xl font-bold text-[var(--ink)]">
                            <AnimatedCounter value={systemResolvedCount || 0} duration={1800} />
                        </div>
                    </div>
                    <div className="text-xs text-[var(--text-dim)] mt-4">Diselesaikan oleh sistem</div>
                </div>
            </div>

            {/* Komponen Statistik & Grafik */}
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 fill-mode-both">
                <OperatorStatistics
                    tickets={tickets || []}
                    ticketLogs={ticketLogs || []}
                    categories={categories || []}
                    departments={departments || []}
                />
            </div>

            {/* Komponen Tabel Prioritas */}
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
                <PriorityTicketList tickets={tickets || []} />
            </div>
        </div>
    );
}
