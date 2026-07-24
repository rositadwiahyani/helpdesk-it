import React from 'react';
import TeknisiStatistics from '@/components/teknisi/tickets/TeknisiStatistics';
<<<<<<< HEAD
import { supabase } from '@/lib/supabase';
=======
import { fetchServer } from '@/lib/apiServer';
import { redirect } from 'next/navigation';
>>>>>>> 61586f21bf62b3be78daeaf51e816875b9f73142

export const dynamic = 'force-dynamic';

export default async function TeknisiDashboard() {
    let authData;
    try {
        const response = await fetchServer('/auth/me');
        authData = response.data;
    } catch (e) {
        redirect('/login');
    }
    
    if (!authData || !authData.user) {
        redirect('/login');
    }

    const user = authData.user;
    const profile = authData.profile;

    if (!profile) {
        redirect('/login');
    }

    const deptId = profile.dept_id;

    // Ambil tiket
    const ticketsResponse = await fetchServer('/admin/tickets');
    let tickets = ticketsResponse.data || [];
    
    // Filter tiket khusus untuk departemen teknisi ini
    tickets = tickets.filter((t: any) => t.dept_id === deptId);

    // Ambil kategori & departemen
    const categoriesResponse = await fetchServer('/admin/categories');
    const departmentsResponse = await fetchServer('/admin/departments');
    const rawCategories = categoriesResponse.data || [];
    const departments = departmentsResponse.data || [];

    // Build hierarchical names for the categories (Topics)
    const formattedCategories = rawCategories.map((cat: any) => {
        const breadcrumb = [];
        let current = cat;
        while (current) {
            breadcrumb.unshift(current.name);
            current = rawCategories.find((c: any) => c.id === current.parent_id);
        }
        return {
            id: cat.id,
            name: breadcrumb.join(' / '),
        };
    }).sort((a: any, b: any) => a.name.localeCompare(b.name));

    // Summary Cards (Hari Ini)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString();

    const todayCount = (tickets || []).filter((t: any) => new Date(t.created_at) >= today && t.status !== 'Ditolak').length;
    const openCount = (tickets || []).filter((t: any) => t.status === 'Assigned' || t.status === 'Open').length;
    const resolvedCount = (tickets || []).filter((t: any) => (t.status === 'Resolved' || t.status === 'Closed') && new Date(t.resolved_at || t.created_at) >= today).length;

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
                categories={rawCategories || []}
            />
        </div>
    );
}
