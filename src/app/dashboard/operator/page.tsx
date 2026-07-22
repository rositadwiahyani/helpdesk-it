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
