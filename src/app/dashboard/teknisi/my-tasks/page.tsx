import React from 'react';
import { fetchServer } from '@/lib/apiServer';
import { redirect } from 'next/navigation';
import TeknisiTicketTable from '@/components/teknisi/tickets/TeknisiTicketTable';

export const dynamic = 'force-dynamic';

export default async function TeknisiMyTasksPage() {
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

    const ticketsResponse = await fetchServer('/admin/tickets');
    let tickets = ticketsResponse.data || [];
    
    // Filter tiket khusus untuk teknisi ini yang belum resolved
    const myTasks = tickets.filter((t: any) => 
        t.tech_id === user.id && 
        t.status !== 'Resolved'
    );

    const categoriesResponse = await fetchServer('/admin/categories');
    const departmentsResponse = await fetchServer('/admin/departments');
    const rawCategories = categoriesResponse.data || [];
    const departments = departmentsResponse.data || [];

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

    return (
        <div className="w-full h-full text-slate-800 font-sans p-6 md:p-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Tasks</h1>
                <p className="text-sm text-slate-500 mt-1">Daftar tiket yang saat ini sedang Anda tangani.</p>
            </div>

            <TeknisiTicketTable 
                initialTickets={myTasks}
                mainCategories={formattedCategories}
                actionType="resolve"
            />
        </div>
    );
}
