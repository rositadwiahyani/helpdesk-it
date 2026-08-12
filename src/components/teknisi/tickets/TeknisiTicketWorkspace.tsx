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
                return tickets.filter(t => ['OPEN', 'NEW'].includes(t.status?.toUpperCase() || t.status));
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
        <div className="flex flex-col items-start gap-6 w-full relative">
            {/* Header */}
            <div className="flex justify-between items-end w-full">
                <div className="flex flex-col items-start gap-1 w-fit">
                    <div className="flex items-start gap-2 w-full">
                        <div className="flex flex-col items-start w-fit h-full">
                            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                                Dashboard
                            </p>
                        </div>
                        <div className="flex flex-col items-start w-fit h-full">
                            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                                /
                            </p>
                        </div>
                        <div className="flex flex-col items-start w-fit h-full">
                            <p className="text-[#1A1C1E] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                                Tickets
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <p className="text-[#001E40] font-iBMPlexSans text-[32px] font-semibold leading-10 w-fit tracking-[-0.02em]">
                            Tiket
                        </p>
                    </div>
                </div>
            </div>

            {/* Table Area */}
            <div className="w-full">
                <TeknisiTicketTable
                    initialTickets={filteredTickets}
                    mainCategories={mainCategories}
                    actionType={getActionType()}
                    tabsNode={
                        <div className="flex items-end gap-6 border-b border-b-[#C3C6D1] w-full overflow-x-auto mt-2">
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`cursor-pointer text-nowrap flex pt-0 pr-1 pb-3 pl-1 flex-col justify-center items-center border-b-2 w-fit transition-colors ${
                                    activeTab === 'all'
                                        ? 'border-b-[#1E3A8A]'
                                        : 'border-b-transparent hover:border-b-gray-300'
                                }`}
                            >
                                <p className={`font-iBMPlexSans text-sm leading-5 w-fit transition-colors ${
                                    activeTab === 'all' ? 'text-[#1E3A8A] font-semibold' : 'text-[#43474F]'
                                }`}>Semua Tiket ({tickets.length})</p>
                            </button>
                            <button
                                onClick={() => setActiveTab('assigned')}
                                className={`cursor-pointer text-nowrap flex pt-0 pr-1 pb-3 pl-1 flex-col justify-center items-center border-b-2 w-fit transition-colors ${
                                    activeTab === 'assigned'
                                        ? 'border-b-[#1E3A8A]'
                                        : 'border-b-transparent hover:border-b-gray-300'
                                }`}
                            >
                                <p className={`font-iBMPlexSans text-sm leading-5 w-fit transition-colors ${
                                    activeTab === 'assigned' ? 'text-[#1E3A8A] font-semibold' : 'text-[#43474F]'
                                }`}>Tiket Saya ({tickets.filter((t: any) => t.tech_id === techId).length})</p>
                            </button>
                            <button
                                onClick={() => setActiveTab('resolved')}
                                className={`cursor-pointer text-nowrap flex pt-0 pr-1 pb-3 pl-1 flex-col justify-center items-center border-b-2 w-fit transition-colors ${
                                    activeTab === 'resolved'
                                        ? 'border-b-[#1E3A8A]'
                                        : 'border-b-transparent hover:border-b-gray-300'
                                }`}
                            >
                                <p className={`font-iBMPlexSans text-sm leading-5 w-fit transition-colors ${
                                    activeTab === 'resolved' ? 'text-[#1E3A8A] font-semibold' : 'text-[#43474F]'
                                }`}>Selesai ({tickets.filter((t: any) => ['RESOLVED', 'CLOSED', 'WAITING CONFIRMATION', 'RESOLVED_BY_SYSTEM'].includes(t.status?.toUpperCase() || t.status)).length})</p>
                            </button>
                        </div>
                    }
                />
            </div>
        </div>
    );
}
