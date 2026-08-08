'use client';

import React, { useState, useMemo } from 'react';
import OperatorTicketTable from '@/components/admin/tickets/OperatorTicketTable';

type Ticket = any;

interface OperatorTicketWorkspaceProps {
    tickets: Ticket[];
    departments: any[];
    categories: any[];
    mainCategories: any[];
    technicians: any[];
}

export default function OperatorTicketWorkspace({
    tickets,
    departments,
    categories,
    mainCategories,
    technicians,
}: OperatorTicketWorkspaceProps) {
    const [activeTab, setActiveTab] = useState<'all' | 'verification' | 'processing' | 'resolved' | 'rejected'>('all');

    const filteredTickets = useMemo(() => {
        switch (activeTab) {
            case 'verification':
                return tickets.filter(t => t.status === 'WAITING VERIFICATION');
            case 'processing':
                return tickets.filter(t => ['Open', 'NEW', 'IN PROGRESS', 'Diproses'].includes(t.status?.toUpperCase() || t.status));
            case 'resolved':
                return tickets.filter(t => ['RESOLVED', 'CLOSED', 'RESOLVED_BY_SYSTEM'].includes(t.status?.toUpperCase() || t.status));
            case 'rejected':
                return tickets.filter(t => ['DITOLAK', 'REJECTED'].includes(t.status?.toUpperCase() || t.status));
            case 'all':
            default:
                return tickets;
        }
    }, [tickets, activeTab]);

    const getActionType = () => {
        if (activeTab === 'verification') return 'verify';
        if (activeTab === 'rejected') return 'rollback';
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
                    onClick={() => setActiveTab('verification')}
                    className={`px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                        activeTab === 'verification'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                >
                    Menunggu Verifikasi
                    <span className="ml-2 bg-amber-100 text-amber-700 py-0.5 px-2 rounded-full text-xs">
                        {tickets.filter(t => t.status === 'WAITING VERIFICATION').length}
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab('processing')}
                    className={`px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                        activeTab === 'processing'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                >
                    Diproses
                    <span className="ml-2 bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full text-xs">
                        {tickets.filter(t => ['Open', 'NEW', 'IN PROGRESS', 'Diproses'].includes(t.status?.toUpperCase() || t.status)).length}
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
                <button
                    onClick={() => setActiveTab('rejected')}
                    className={`px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                        activeTab === 'rejected'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                >
                    Ditolak
                    <span className="ml-2 bg-red-100 text-red-700 py-0.5 px-2 rounded-full text-xs">
                        {tickets.filter(t => ['DITOLAK', 'REJECTED'].includes(t.status?.toUpperCase() || t.status)).length}
                    </span>
                </button>
            </div>

            {/* Table Area */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <OperatorTicketTable
                    initialTickets={filteredTickets}
                    departments={departments}
                    categories={categories}
                    mainCategories={mainCategories}
                    technicians={technicians}
                    actionType={getActionType()}
                    assignToType={activeTab === 'resolved' ? 'resolver' : 'dept'}
                />
            </div>
        </div>
    );
}
