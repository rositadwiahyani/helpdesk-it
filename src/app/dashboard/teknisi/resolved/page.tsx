import React from 'react';
import TeknisiTicketTable from '@/components/teknisi/tickets/TeknisiTicketTable';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function TeknisiResolvedTicketsPage() {
    // Auth check dilewati sementara
    const techId = "3"; // Dummy tech ID

    // Ambil tiket yang sudah diselesaikan
    const { data: tickets, error } = await supabase
        .from('tickets')
        .select(`
            *,
            category:categories (name)
        `)
        .in('status', ['Resolved', 'Closed'])
        // .eq('tech_id', techId)
        .order('updated_at', { ascending: false });

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
    
    // Hapus filter ini agar bisa digunakan untuk mencocokkan ID turunan
    // const mainCategories = formattedCategories.filter(c => !c.parent_id);

    return (
        <div className="w-full h-full text-slate-800 font-sans p-6 md:p-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Resolved Tickets</h1>
                <p className="text-sm text-slate-500 mt-1">Daftar tiket yang telah berhasil Anda selesaikan.</p>
            </div>

            <TeknisiTicketTable 
                initialTickets={tickets || []} 
                mainCategories={formattedCategories}
                actionType="reopen"
            />
        </div>
    );
}
