import React from 'react';
import TeknisiTicketTable from '@/components/teknisi/tickets/TeknisiTicketTable';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function TeknisiOpenTicketsPage() {
    // Auth check dilewati sementara
    const techId = "3"; // Dummy tech ID for "Assign to Me" action

    // Ambil tiket yang ditugaskan (Assigned) dan belum diambil oleh teknisi mana pun
    const { data: tickets, error } = await supabase
        .from('tickets')
        .select(`
            *,
            category:categories (name)
        `)
        .eq('status', 'Assigned') // Tiket yang diteruskan oleh operator
        .order('created_at', { ascending: false });

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
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Open Tickets</h1>
                <p className="text-sm text-slate-500 mt-1">Daftar tiket baru yang diteruskan ke departemen Anda dan siap ditangani.</p>
            </div>

            <TeknisiTicketTable 
                initialTickets={tickets || []} 
                mainCategories={formattedCategories}
                actionType="assign"
            />
        </div>
    );
}
