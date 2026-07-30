import React from 'react';
import OperatorTicketTable from '@/components/admin/tickets/OperatorTicketTable';
import { calculateIsOverdue } from '@/lib/utils/sla';
import { fetchServer } from '@/lib/apiServer';

export const dynamic = 'force-dynamic';

export default async function OperatorInProgressTicketsPage() {
    let apiData;
    try {
        const res = await fetchServer('/operator/tickets/inprogress');
        apiData = res.data;
    } catch (err) {
        console.error("Error fetching in-progress tickets:", err);
        apiData = {
            tickets: [],
            slaConfigs: [],
            departments: [],
            categories: [],
            technicians: []
        };
    }

    const { tickets, slaConfigs, departments, categories: rawCategories, technicians } = apiData;

    // Format kategori dengan hierarki Departemen / Kategori / Subkategori (jika ada)
    const formattedCategories = (rawCategories || []).map((cat: any) => {
        const dept = (departments || []).find((d: any) => d.id === cat.dept_id);
        const deptName = dept ? dept.name : '';
        
        const breadcrumb = [];
        let current = cat;
        while (current) {
            breadcrumb.unshift(current.name);
            current = (rawCategories || []).find((c: any) => c.id === current.parent_id);
        }
        
        if (deptName) {
            breadcrumb.unshift(deptName);
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

    // Kategori utama untuk filter pencarian (tampilkan semua kategori)
    const mainCategories = formattedCategories;

    return (
        <div className="w-full h-full text-slate-800 font-sans p-6 md:p-10">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tiket In Progress</h1>
                    <p className="text-sm text-slate-500 mt-1">Daftar tiket yang sedang dikerjakan oleh teknisi.</p>
                </div>
            </div>

            {/* Komponen Tabel Client-Side dengan Filter/Sorting */}
            <OperatorTicketTable 
                initialTickets={processedTickets} 
                departments={departments || []}
                categories={formattedCategories}
                mainCategories={mainCategories}
                technicians={technicians || []}
                actionType="readonly"
                assignToHeader="DITANGANI OLEH"
                assignToType="tech"
            />
        </div>
    );
}
