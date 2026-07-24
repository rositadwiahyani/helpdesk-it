import React from 'react';
import OperatorStatistics from '@/components/admin/tickets/OperatorStatistics';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function OperatorDashboard() {
    // Auth check dilewati sementara
    
    // Ambil SEMUA tiket untuk direkap di Client Component
    // Pada production berskala besar, sebaiknya ini menggunakan RPC atau View di Supabase
    const { data: tickets } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

    // Ambil log tiket (untuk mengetahui kapan tiket diverifikasi / ditolak)
    const { data: ticketLogs, error: logError } = await supabase
        .from('ticket_logs')
        .select('*')
        .in('action', ['CHANGE_STATUS', 'REJECT_TICKET']);
        
    if (logError) console.error("Error logs:", logError);

    // Ambil kategori & departemen
    const { data: rawCategories } = await supabase.from('categories').select('*');
    const { data: departments } = await supabase.from('departments').select('id, name');

    // Build hierarchical names for the categories (Topics)
    const formattedCategories = (rawCategories || []).map(cat => {
        const breadcrumb = [];
        let current = cat;
        while (current) {
            breadcrumb.unshift(current.name);
            current = (rawCategories || []).find(c => c.id === current.parent_id);
        }
        return {
            id: cat.id,
            name: breadcrumb.join(' / '),
        };
    }).sort((a, b) => a.name.localeCompare(b.name));

    // Summary Cards (Hari Ini)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString();

    const { count: todayCount } = await supabase
        .from('tickets')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', todayStr);

    const { count: verifiedCount } = await supabase
        .from('ticket_logs')
        .select('*', { count: 'exact', head: true })
        .in('action', ['CHANGE_STATUS', 'REJECT_TICKET'])
        .gte('created_at', todayStr);

    const openCount = (tickets || []).filter(t => t.status === 'Open').length;

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
