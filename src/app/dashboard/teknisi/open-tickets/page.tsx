import React from 'react';
import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import TeknisiTicketTable from '@/components/teknisi/tickets/TeknisiTicketTable';

export const dynamic = 'force-dynamic';

export default async function TeknisiOpenTicketsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/login');
    }

    const { data: profile } = await supabase
        .from('staff_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (!profile) {
        redirect('/login');
    }

    const deptId = profile.dept_id;

    // Ambil tiket departemen ini yang belum di-assign (tech_id IS NULL) dan status != Resolved
    const { data: tickets } = await supabase
        .from('tickets')
        .select('*, category:categories(id, name)')
        .eq('dept_id', deptId)
        .is('tech_id', null)
        .neq('status', 'Resolved')
        .order('created_at', { ascending: false });

    const { data: rawCategories } = await supabase.from('categories').select('*');
    const { data: departments } = await supabase.from('departments').select('id, name');

    const formattedCategories = (rawCategories || []).map(cat => {
        let breadcrumb = [cat.name];
        let current = cat;
        while (current && current.parent_id) {
            current = (rawCategories || []).find(c => c.id === current.parent_id);
            if (current) breadcrumb.unshift(current.name);
        }

        if (breadcrumb.length === 1 && cat.dept_id) {
            const dept = (departments || []).find(d => d.id === cat.dept_id);
            if (dept) {
                breadcrumb.unshift(dept.name);
            }
        }

        return {
            id: cat.id,
            name: breadcrumb.join(' / '),
        };
    }).sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="w-full h-full text-slate-800 font-sans p-6 md:p-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Open Tickets</h1>
                <p className="text-sm text-slate-500 mt-1">Daftar tiket terbuka yang ditugaskan ke unit Anda dan menunggu untuk dikerjakan.</p>
            </div>

            <TeknisiTicketTable 
                initialTickets={tickets || []}
                categories={formattedCategories}
                mainCategories={formattedCategories.filter(c => !c.name.includes('/'))}
                departments={departments || []}
                actionType="assign"
                currentUserId={user.id}
            />
        </div>
    );
}
