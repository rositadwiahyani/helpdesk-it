import React from 'react';
import TeknisiStatistics from '@/components/teknisi/tickets/TeknisiStatistics';
import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function TeknisiDashboard() {
    // Ambil user saat ini
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/login');
    }

    // Ambil profil teknisi untuk mendapatkan dept_id
    const { data: profile } = await supabase
        .from('staff_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (!profile) {
        redirect('/login');
    }

    const deptId = profile.dept_id;

    // Ambil tiket khusus untuk departemen teknisi ini
    const { data: tickets } = await supabase
        .from('tickets')
        .select('*, category:categories(id, name)')
        .eq('dept_id', deptId)
        .order('created_at', { ascending: false });

    // Ambil log tiket (untuk mengetahui kapan tiket diverifikasi / diselesaikan) khusus tiket departemen ini
    const ticketIds = (tickets || []).map(t => t.id);
    let ticketLogs: any[] = [];
    if (ticketIds.length > 0) {
        const { data: logs } = await supabase
            .from('ticket_logs')
            .select('*')
            .in('ticket_id', ticketIds)
            .in('action', ['CHANGE_STATUS', 'ASSIGN_TICKET']);
        if (logs) ticketLogs = logs;
    }

    // Ambil kategori & departemen (meskipun departemen mungkin cuma 1 untuk teknisi ini, tapi props membutuhkannya)
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

    // 1. Open Tickets Hari Ini: Tiket di-assign ke departemen ini hari ini, status Open/Verified, belum di-assign ke tech
    const openTicketsToday = (tickets || []).filter(t => 
        t.created_at >= todayStr && 
        !t.tech_id && 
        t.status !== 'Resolved'
    ).length;

    // 2. Tugas Saya Hari Ini: Tiket yang sedang dikerjakan oleh teknisi ini
    const myTasksToday = (tickets || []).filter(t => 
        t.tech_id === user.id && 
        t.status !== 'Resolved'
    ).length; // Bisa jadi tidak harus 'hari ini' diciptakan, tapi 'tugas hari ini' biasanya tugas aktif. Kita hitung tugas aktif.

    // 3. Ticket Solved Hari Ini (oleh departemen ini)
    const solvedToday = (tickets || []).filter(t => 
        t.status === 'Resolved' && 
        t.updated_at >= todayStr // Asumsi updated_at terakhir adalah saat di-resolve, atau bisa cek via ticketLogs
    ).length;

    return (
        <div className="w-full h-full text-slate-800 font-sans p-6 md:p-10">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Teknisi</h1>
                    <p className="text-sm text-slate-500 mt-1">Ringkasan statistik dan tugas unit Anda.</p>
                </div>
            </div>

            {/* Statistik Hari Ini */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex-1 shadow-sm">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Open Tickets Hari Ini</div>
                    <div className="text-3xl font-black text-slate-800">{openTicketsToday}</div>
                    <div className="text-xs text-slate-500 mt-1">Menunggu diambil</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex-1 shadow-sm">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tugas Saya Hari Ini</div>
                    <div className="text-3xl font-black text-blue-600">{myTasksToday}</div>
                    <div className="text-xs text-slate-500 mt-1">Tugas aktif Anda</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex-1 shadow-sm">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Ticket Solved Hari Ini</div>
                    <div className="text-3xl font-black text-emerald-600">{solvedToday}</div>
                    <div className="text-xs text-slate-500 mt-1">Selesai oleh departemen</div>
                </div>
            </div>

            {/* Komponen Statistik & Grafik */}
            <TeknisiStatistics 
                tickets={tickets || []}
                ticketLogs={ticketLogs || []}
                categories={formattedCategories}
                departments={departments || []}
                currentUserId={user.id}
            />
        </div>
    );
}
