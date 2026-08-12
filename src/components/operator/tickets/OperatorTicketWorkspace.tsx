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
                <OperatorTicketTable
                    initialTickets={filteredTickets}
                    departments={departments}
                    categories={categories}
                    mainCategories={mainCategories}
                    technicians={technicians}
                    actionType={getActionType()}
                    assignToType={activeTab === 'verification' ? undefined : (activeTab === 'resolved' ? 'resolver' : 'dept')}
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
                                onClick={() => setActiveTab('verification')}
                                className={`cursor-pointer text-nowrap flex pt-0 pr-1 pb-3 pl-1 flex-col justify-center items-center border-b-2 w-fit transition-colors ${
                                    activeTab === 'verification'
                                        ? 'border-b-[#1E3A8A]'
                                        : 'border-b-transparent hover:border-b-gray-300'
                                }`}
                            >
                                <p className={`font-iBMPlexSans text-sm leading-5 w-fit transition-colors ${
                                    activeTab === 'verification' ? 'text-[#1E3A8A] font-semibold' : 'text-[#43474F]'
                                }`}>Menunggu Verifikasi ({tickets.filter((t: any) => t.status === 'WAITING VERIFICATION').length})</p>
                            </button>
                            <button
                                onClick={() => setActiveTab('processing')}
                                className={`cursor-pointer text-nowrap flex pt-0 pr-1 pb-3 pl-1 flex-col justify-center items-center border-b-2 w-fit transition-colors ${
                                    activeTab === 'processing'
                                        ? 'border-b-[#1E3A8A]'
                                        : 'border-b-transparent hover:border-b-gray-300'
                                }`}
                            >
                                <p className={`font-iBMPlexSans text-sm leading-5 w-fit transition-colors ${
                                    activeTab === 'processing' ? 'text-[#1E3A8A] font-semibold' : 'text-[#43474F]'
                                }`}>Diproses ({tickets.filter((t: any) => ['Open', 'NEW', 'IN PROGRESS', 'Diproses'].includes(t.status?.toUpperCase() || t.status)).length})</p>
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
                                }`}>Selesai ({tickets.filter((t: any) => ['RESOLVED', 'CLOSED', 'RESOLVED_BY_SYSTEM'].includes(t.status?.toUpperCase() || t.status)).length})</p>
                            </button>
                            <button
                                onClick={() => setActiveTab('rejected')}
                                className={`cursor-pointer text-nowrap flex pt-0 pr-1 pb-3 pl-1 flex-col justify-center items-center border-b-2 w-fit transition-colors ${
                                    activeTab === 'rejected'
                                        ? 'border-b-[#1E3A8A]'
                                        : 'border-b-transparent hover:border-b-gray-300'
                                }`}
                            >
                                <p className={`font-iBMPlexSans text-sm leading-5 w-fit transition-colors ${
                                    activeTab === 'rejected' ? 'text-[#1E3A8A] font-semibold' : 'text-[#43474F]'
                                }`}>Ditolak ({tickets.filter((t: any) => ['DITOLAK', 'REJECTED'].includes(t.status?.toUpperCase() || t.status)).length})</p>
                            </button>
                        </div>
                    }
                />
            </div>
        </div>
    );
}
