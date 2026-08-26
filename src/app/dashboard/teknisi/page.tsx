import React from 'react';
import TeknisiStatistics from '@/components/teknisi/tickets/TeknisiStatistics';
import { fetchServer } from '@/lib/apiServer';
import { redirect } from 'next/navigation';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function TeknisiDashboard() {
    let authData;
    try {
        const response = await fetchServer('/auth/me');
        authData = response.data;
    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.error("Gagal mengambil data dashboard:", error);
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
    
    // Filter tiket khusus untuk departemen teknisi ini (FITUR INI DIMATIKAN SESUAI PERMINTAAN USER - COMMUNAL POOL)
    // tickets = tickets.filter((t: any) => t.dept_id === deptId);

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
    const openCount = (tickets || []).filter((t: any) => t.status === 'NEW' || t.status === 'IN PROGRESS').length;
    const resolvedCount = (tickets || []).filter((t: any) => (t.status === 'RESOLVED' || t.status === 'CLOSED') && new Date(t.resolved_at || t.created_at) >= today).length;

    const myActiveTasks = (tickets || [])
        .filter((t: any) => t.status === 'IN PROGRESS' && t.tech_id === user.id)
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // Ambil recent activity (logs) untuk departemen ini atau general (tergantung kebutuhan, di sini kita ambil 5 terbaru)
    const { data: recentLogs } = await supabase
        .from('ticket_logs')
        .select(`
            *,
            ticket:tickets(ticket_num, subject)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

    const renderPriorityBadge = (priority: string) => {
        const p = (priority || 'MEDIUM').toUpperCase();
        let bg = 'bg-slate-100';
        let text = 'text-slate-600';
        
        if (p === 'CRITICAL') { bg = 'bg-red-100'; text = 'text-red-700'; }
        if (p === 'HIGH') { bg = 'bg-red-50'; text = 'text-red-600'; }
        if (p === 'MEDIUM') { bg = 'bg-orange-50'; text = 'text-orange-600'; }

        return (
            <div className={`flex py-0.5 px-2 items-center rounded ${bg} w-fit`}>
                <p className={`${text} font-iBMPlexSans text-[9px] font-bold uppercase tracking-wider`}>
                    {p}
                </p>
            </div>
        );
    };

    const formatTimeAgo = (dateStr: string) => {
        if (!dateStr) return 'Unknown';
        const date = new Date(dateStr);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        
        if (diffInSeconds < 60) return `${diffInSeconds} mins ago`;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} days ago`;
    };

    return (
        <div className="flex flex-col gap-6 p-6 md:p-10">
            <div>
                <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Dashboard Teknisi</h2>
                <p className="text-[var(--text-dim)] text-sm">Ringkasan tugas dan statistik tiket departemen Anda.</p>
            </div>

            {/* Statistik Hari Ini */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                        <div className="text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2">Tiket Masuk Hari Ini</div>
                        <div className="text-4xl font-bold text-[var(--ink)]">
                            <AnimatedCounter value={todayCount || 0} duration={1200} />
                        </div>
                    </div>
                    <div className="text-xs text-[var(--text-dim)] mt-4">Total diteruskan hari ini</div>
                </div>
                <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                        <div className="text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2">Open Ticket</div>
                        <div className="text-4xl font-bold text-[#0059BB]">
                            <AnimatedCounter value={openCount || 0} duration={1500} />
                        </div>
                    </div>
                    <div className="text-xs text-[var(--text-dim)] mt-4">Menunggu ditangani</div>
                </div>
                <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                        <div className="text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2">Selesai Hari Ini</div>
                        <div className="text-4xl font-bold text-emerald-600">
                            <AnimatedCounter value={resolvedCount || 0} duration={1800} />
                        </div>
                    </div>
                    <div className="text-xs text-[var(--text-dim)] mt-4">Tiket berhasil diselesaikan</div>
                </div>
            </div>

            {/* Grid 2 Column for Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    {/* Komponen Statistik Kategori */}
                    <TeknisiStatistics 
                        tickets={tickets || []}
                        categories={rawCategories || []}
                    />
                </div>
                <div className="lg:col-span-1 flex flex-col gap-6">
                    {/* My Active Tasks Widget */}
                    <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm flex flex-col animate-in fade-in slide-in-from-bottom-3 duration-500">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-[17px] font-bold text-[var(--ink)]">My Active Tasks</h3>
                            <a href="/dashboard/teknisi/open-tickets" className="text-sm font-semibold text-[#0059BB] hover:underline">View All</a>
                        </div>
                        <div className="flex flex-col gap-3">
                            {myActiveTasks.length > 0 ? myActiveTasks.slice(0, 3).map((task: any) => {
                                const formattedTicketNum = task.ticket_num ? 
                                    (task.ticket_num.match(/\d+$/)?.[0].padStart(6, '0') || task.ticket_num) 
                                    : task.id.substring(0, 8);
                                
                                return (
                                    <div key={task.id} className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center justify-between mb-2">
                                            {renderPriorityBadge(task.priority)}
                                            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">#{formattedTicketNum}</span>
                                        </div>
                                        <p className="text-[13px] font-bold text-slate-800 line-clamp-2 leading-snug">{task.subject || task.category?.name || 'Tanpa Subjek'}</p>
                                        <div className="flex items-center gap-1.5 mt-2.5">
                                            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span className="text-[11px] font-medium text-slate-500">{formatTimeAgo(task.updated_at || task.created_at)}</span>
                                        </div>
                                    </div>
                                );
                            }) : (
                                <div className="p-4 text-center text-sm text-slate-500">Tidak ada task aktif.</div>
                            )}
                        </div>
                    </div>

                    {/* Recent Activity Widget */}
                    <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h3 className="text-[17px] font-bold text-[var(--ink)] mb-5">Recent Activity</h3>
                        <div className="flex flex-col">
                            {recentLogs && recentLogs.length > 0 ? recentLogs.map((log: any, index: number) => {
                                const isLast = index === recentLogs.length - 1;
                                let color = 'bg-slate-200';
                                if (log.action === 'RESOLVED' || log.action === 'CLOSED') color = 'bg-emerald-500';
                                else if (log.action === 'ASSIGNED' || log.action === 'VERIFIED') color = 'bg-[#0059BB]';
                                else if (log.action === 'REJECTED') color = 'bg-red-500';
                                else if (log.action === 'CREATED') color = 'bg-amber-500';

                                const ticketName = log.ticket?.ticket_num ? `#${log.ticket.ticket_num}` : 'Ticket';
                                const ticketSubject = log.ticket?.subject || 'Tanpa subjek';
                                
                                return (
                                    <div key={log.id} className={`flex gap-4 relative ${!isLast ? 'pb-5' : ''}`}>
                                        {!isLast && <div className="absolute top-2 bottom-0 left-[7px] w-[2px] bg-slate-100"></div>}
                                        <div className={`relative z-10 w-4 h-4 rounded-full ${color} ring-4 ring-white mt-1 shrink-0`}></div>
                                        <div className="pb-1">
                                            <p className="text-[13px] font-bold text-slate-800">{ticketName} {log.action.toLowerCase()}</p>
                                            <p className="text-[12.5px] text-slate-500 mt-1 leading-snug line-clamp-2">{ticketSubject}</p>
                                            <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">{formatTimeAgo(log.created_at)}</p>
                                        </div>
                                    </div>
                                );
                            }) : (
                                <div className="p-4 text-center text-sm text-slate-500">Tidak ada aktivitas terbaru.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
