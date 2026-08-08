'use client';

import React, { useState, useMemo, useEffect } from 'react';
import TeknisiTicketTable from '@/components/teknisi/tickets/TeknisiTicketTable';

type Ticket = any;

interface TeknisiTicketWorkspaceProps {
    tickets: Ticket[];
    mainCategories: any[];
}

export default function TeknisiTicketWorkspace({
    tickets,
    mainCategories,
}: TeknisiTicketWorkspaceProps) {
    const [activeTab, setActiveTab] = useState<'all' | 'open' | 'my-tasks' | 'resolved'>('all');
    const [techId, setTechId] = useState<string | null>(null);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                if (user.id) setTechId(user.id);
            } catch (e) {}
        }
    }, []);

    const filteredTickets = useMemo(() => {
        switch (activeTab) {
            case 'open':
                return tickets.filter(t => ['Open', 'NEW'].includes(t.status?.toUpperCase() || t.status));
            case 'my-tasks':
                return tickets.filter(t => 
                    ['IN PROGRESS', 'DIPROSES'].includes(t.status?.toUpperCase() || t.status) &&
                    String(t.tech_id) === String(techId)
                );
            case 'resolved':
                return tickets.filter(t => ['RESOLVED', 'CLOSED', 'RESOLVED_BY_SYSTEM'].includes(t.status?.toUpperCase() || t.status));
            case 'all':
            default:
                return tickets;
        }
    }, [tickets, activeTab, techId]);

    const getActionType = () => {
        if (activeTab === 'open') return 'assign';
        if (activeTab === 'my-tasks') return 'resolve';
        if (activeTab === 'resolved') return 'reopen';
        return 'readonly';
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-slate-200">
                <button
                    onClick={() => setActiveTab('all')}
                    className={`px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                        activeTab === 'all'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                >
                    Semua Tiket
                    <span className="ml-2 bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-xs">{tickets.length}</span>
                </button>
                <button
                    onClick={() => setActiveTab('open')}
                    className={`px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                        activeTab === 'open'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                >
                    Siap Diambil
                    <span className="ml-2 bg-amber-100 text-amber-700 py-0.5 px-2 rounded-full text-xs">
                        {tickets.filter(t => ['Open', 'NEW'].includes(t.status?.toUpperCase() || t.status)).length}
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab('my-tasks')}
                    className={`px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                        activeTab === 'my-tasks'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                >
                    Task Saya
                    <span className="ml-2 bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full text-xs">
                        {techId ? tickets.filter(t => ['IN PROGRESS', 'DIPROSES'].includes(t.status?.toUpperCase() || t.status) && String(t.tech_id) === String(techId)).length : 0}
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab('resolved')}
                    className={`px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                        activeTab === 'resolved'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                >
                    Selesai
                    <span className="ml-2 bg-emerald-100 text-emerald-700 py-0.5 px-2 rounded-full text-xs">
                        {tickets.filter(t => ['RESOLVED', 'CLOSED', 'RESOLVED_BY_SYSTEM'].includes(t.status?.toUpperCase() || t.status)).length}
                    </span>
                </button>
            </div>

            {/* Table Area */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <TeknisiTicketTable
                    initialTickets={filteredTickets}
                    mainCategories={mainCategories}
                    actionType={getActionType()}
                />
            </div>
        </div>
    );
}
