import React from 'react';
import TeknisiTicketWorkspace from '@/components/teknisi/tickets/TeknisiTicketWorkspace';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function TeknisiUnifiedTicketsPage() {
    // Ambil semua tiket (COMMUNAL POOL - tidak difilter per departemen teknisi)
    // Tapi kecualikan tiket yang masih 'NEW' (menunggu verifikasi operator)
    const { data: tickets, error } = await supabase
        .from('tickets')
        .select(`
            *,
            category:categories (name),
            dept:departments (name)
        `)
        .neq('status', 'NEW')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching tickets for teknisi:", error);
    }

    // Ambil kategori untuk filter dropdown
    const { data: rawCategories } = await supabase
        .from('categories')
        .select('*');

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
            parent_id: cat.parent_id,
            dept_id: cat.dept_id
        };
    }).sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="w-full h-full text-slate-800 font-sans p-6 md:p-10">
            <div className="mb-8 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">Manajemen Tiket</h1>
                    <p className="text-sm text-slate-500">Kelola semua tiket yang siap diambil, sedang dikerjakan, dan telah selesai.</p>
                </div>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
                <TeknisiTicketWorkspace 
                    tickets={tickets || []} 
                    mainCategories={formattedCategories}
                />
            </div>
        </div>
    );
}
