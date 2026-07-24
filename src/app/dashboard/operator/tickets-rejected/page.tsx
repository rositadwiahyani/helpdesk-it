import React from 'react';
import OperatorTicketTable from '@/components/admin/tickets/OperatorTicketTable';
import { calculateIsOverdue } from '@/lib/utils/sla';
import { fetchServer } from '@/lib/apiServer';

export const dynamic = 'force-dynamic';

export default async function OperatorRejectedTicketsPage() {
    let apiData;
    try {
        const res = await fetchServer('/operator/tickets/rejected');
        apiData = res.data;
    } catch (err) {
        console.error("Error fetching rejected tickets:", err);
        apiData = {
            tickets: [],
            slaConfigs: [],
            departments: [],
            categories: []
        };
    }

    const { tickets, slaConfigs, departments, categories: rawCategories } = apiData;

    // Format kategori dengan hierarki Parent / Child
    const formattedCategories = (rawCategories || []).map((cat: any) => {
        const breadcrumb = [];
        let current = cat;
        while (current) {
            breadcrumb.unshift(current.name);
            current = (rawCategories || []).find((c: any) => c.id === current.parent_id);
        }
        return {
            ...cat,
            name: breadcrumb.join(' / '),
        };
    }).sort((a: any, b: any) => a.name.localeCompare(b.name));

    // Inject is_overdue
    const processedTickets = (tickets || []).map((t: any) => ({
        ...t,
        is_overdue: calculateIsOverdue(t, slaConfigs || [])
    }));

    // Kategori utama untuk filter pencarian (parent_id is null)
    const mainCategoryIds = new Set((rawCategories || []).filter((c: any) => !c.parent_id).map((c: any) => c.id));
    const mainCategories = formattedCategories.filter((c: any) => mainCategoryIds.has(c.id));

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
