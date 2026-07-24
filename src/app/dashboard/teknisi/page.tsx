import React from 'react';
import TeknisiStatistics from '@/components/teknisi/tickets/TeknisiStatistics';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function TeknisiDashboard() {
    // Auth check dilewati sementara, gunakan dummy department_id untuk testing UI
    const techDepartmentId = 1; // Contoh: 1 = Software

    // Ambil SEMUA tiket untuk direkap (ideal: filter by category_id yg masuk departemen ini)
    const { data: tickets } = await supabase
        .from('tickets')
        .select(`
            *,
            category:categories (name)
        `)
        .order('created_at', { ascending: false });

    // Ambil kategori untuk chart
    const { data: categories } = await supabase.from('categories').select('*');

    // Summary Cards (Hari Ini)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString();

    const todayCount = (tickets || []).filter(t => new Date(t.created_at) >= today && t.status !== 'Ditolak').length;
    const openCount = (tickets || []).filter(t => t.status === 'Assigned' || t.status === 'Open').length;
    const resolvedCount = (tickets || []).filter(t => (t.status === 'Resolved' || t.status === 'Closed') && new Date(t.resolved_at || t.created_at) >= today).length;

    return (
        <div className="flex flex-col gap-6 p-6 md:p-10">
            <div>
                <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Dashboard Teknisi</h2>
                <p className="text-[var(--text-dim)] text-sm">Ringkasan tugas dan statistik tiket departemen Anda.</p>
            </div>

            {/* Statistik Hari Ini */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2">Tiket Masuk Hari Ini</div>
                        <div className="text-4xl font-bold text-[var(--ink)]">{todayCount || 0}</div>
                    </div>
                    <div className="text-xs text-[var(--text-dim)] mt-4">Total diteruskan hari ini</div>
                </div>
                <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2">Open Ticket</div>
                        <div className="text-4xl font-bold text-[var(--gold)]">{openCount}</div>
                    </div>
                    <div className="text-xs text-[var(--text-dim)] mt-4">Menunggu ditangani</div>
                </div>
                <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2">Selesai Hari Ini</div>
                        <div className="text-4xl font-bold text-emerald-600">{resolvedCount || 0}</div>
                    </div>
                    <div className="text-xs text-[var(--text-dim)] mt-4">Tiket berhasil diselesaikan</div>
                </div>
            </div>

            {/* Komponen Statistik Kategori */}
            <TeknisiStatistics 
                tickets={tickets || []}
                categories={categories || []}
            />
        </div>
    );
}
