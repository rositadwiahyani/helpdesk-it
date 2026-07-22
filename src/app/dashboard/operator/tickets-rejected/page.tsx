import React from 'react';
import OperatorTicketTable from '@/components/admin/tickets/OperatorTicketTable';
import { calculateIsOverdue } from '@/lib/utils/sla';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function OperatorRejectedTicketsPage() {
    // Auth check dilewati (di-bypass) sementara agar bisa fokus desain UI
    
    // Mengambil tiket yang berstatus 'Ditolak' beserta kategori
    const { data: tickets, error } = await supabase
        .from('tickets')
        .select(`
            *,
            category:category_id (name)
        `)
        .eq('status', 'Ditolak')
        .order('created_at', { ascending: false });

    // Mengambil SLA Configs
    const { data: slaConfigs } = await supabase.from('sla_configs').select('*');

    // Inject is_overdue
    const processedTickets = (tickets || []).map(t => ({
        ...t,
        is_overdue: calculateIsOverdue(t, slaConfigs || [])
    }));

    // Mengambil daftar departemen untuk distribusi tiket
    const { data: departments } = await supabase
        .from('departments')
        .select('id, name')
        .order('name', { ascending: true });

    // Mengambil SEMUA kategori untuk di-format menjadi "Parent / Child"
    const { data: rawCategories } = await supabase
        .from('categories')
        .select('*');

    // Build hierarchical names for the dropdown
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
            parent_id: cat.parent_id // for filter
        };
    }).sort((a, b) => a.name.localeCompare(b.name));

    // Kategori utama untuk filter pencarian (parent_id is null)
    const mainCategories = formattedCategories.filter(c => !c.parent_id);

    return (
        <div className="w-full h-full text-slate-800 font-sans p-6 md:p-10">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tiket Ditolak</h1>
                    <p className="text-sm text-slate-500 mt-1">Daftar tiket yang telah Anda tolak (bisa di-rollback).</p>
                </div>
            </div>

            {/* Komponen Tabel Client-Side dengan Filter/Sorting */}
            <OperatorTicketTable 
                initialTickets={processedTickets} 
                departments={departments || []}
                categories={formattedCategories}
                mainCategories={mainCategories}
                actionType="rollback"
            />
        </div>
    );
}
