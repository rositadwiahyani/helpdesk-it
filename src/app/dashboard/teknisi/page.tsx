import React from 'react';
import TeknisiStatistics from '@/components/teknisi/tickets/TeknisiStatistics';
import { fetchServer } from '@/lib/apiServer';
import { redirect } from 'next/navigation';

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

    // 1. Open Tickets Hari Ini: Tiket di-assign ke departemen ini hari ini, status Open/Verified, belum di-assign ke tech
    const openTicketsToday = tickets.filter((t: any) => 
        t.created_at >= todayStr && 
        !t.tech_id && 
        t.status !== 'Resolved'
    ).length;

    // 2. Tugas Saya Hari Ini: Tiket yang sedang dikerjakan oleh teknisi ini
    const myTasksToday = tickets.filter((t: any) => 
        t.tech_id === user.id && 
        t.status !== 'Resolved'
    ).length; 

    // 3. Ticket Solved Hari Ini (oleh departemen ini)
    const solvedToday = tickets.filter((t: any) => 
        t.status === 'Resolved' && 
        t.updated_at >= todayStr 
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
                    <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-2">Open Tickets Baru (Hari Ini)</div>
                    <div className="text-3xl font-black text-slate-800">{openTicketsToday || 0}</div>
                    <div className="text-xs text-slate-500 mt-1">Tiket unit menunggu dikerjakan</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex-1 shadow-sm">
                    <div className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-2">Tugas Saya (Aktif)</div>
                    <div className="text-3xl font-black text-slate-800">{myTasksToday || 0}</div>
                    <div className="text-xs text-slate-500 mt-1">Tiket sedang Anda tangani</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex-1 shadow-sm">
                    <div className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">Tiket Diselesaikan (Hari Ini)</div>
                    <div className="text-3xl font-black text-slate-800">{solvedToday || 0}</div>
                    <div className="text-xs text-slate-500 mt-1">Kinerja penyelesaian hari ini</div>
                </div>
            </div>
            
        </div>
    );
}
