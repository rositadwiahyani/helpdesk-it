'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translateCategoryName, translateTicketSubject } from '@/lib/translations';

type Ticket = any;

interface PriorityTicketListProps {
    tickets: Ticket[];
}

export default function PriorityTicketList({ tickets }: PriorityTicketListProps) {
    const { t, language } = useLanguage();

    // Filter tiket yang butuh tindakan (Waiting Verification, atau Priority High/Critical) yang belum selesai
    const priorityTickets = tickets.filter(t => {
        const isCompleted = ['RESOLVED_BY_SYSTEM', 'RESOLVED', 'CLOSED', 'DELETED'].includes(t.status?.toUpperCase());
        if (isCompleted) return false;
        
        return t.status === 'WAITING VERIFICATION' || ['CRITICAL', 'HIGH'].includes(t.priority?.toUpperCase());
    }).slice(0, 8); // Ambil maksimal 8

    if (priorityTickets.length === 0) {
        return (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-slate-900 font-bold text-lg mb-1">{t('tickets.all_controlled')}</h3>
                <p className="text-slate-500 text-sm">{t('tickets.no_priority')}</p>
            </div>
        );
    }

    const renderPriorityBadge = (priority: string) => {
        const p = (priority || 'MEDIUM').toUpperCase();
        let bg = 'bg-slate-100';
        let text = 'text-slate-600';
        
        if (p === 'CRITICAL') { bg = 'bg-red-100'; text = 'text-red-700'; }
        if (p === 'HIGH') { bg = 'bg-orange-100'; text = 'text-orange-700'; }

        return (
            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded ${bg} ${text}`}>
                {language === 'en'
                    ? ({ URGENT: 'Urgent', CRITICAL: 'Critical', HIGH: 'High', MEDIUM: 'Medium', LOW: 'Low' } as Record<string, string>)[p] || p
                    : ({ URGENT: 'MENDESAK', CRITICAL: 'KRITIS', HIGH: 'TINGGI', MEDIUM: 'SEDANG', LOW: 'RENDAH' } as Record<string, string>)[p] || p}
            </span>
        );
    };

    const renderStatusBadge = (status: string) => {
        const normalized = (status || '').toUpperCase();
        const labels: Record<string, string> = language === 'en'
            ? {
                'WAITING VERIFICATION': 'Waiting Verification',
                REJECTED: 'Rejected',
                DITOLAK: 'Rejected',
                OPEN: 'Open',
                NEW: 'New',
                'IN PROGRESS': 'In Progress',
                DIPROSES: 'In Progress',
                RESOLVED: 'Resolved',
                CLOSED: 'Closed',
                'WAITING CONFIRMATION': 'Waiting Confirmation',
            }
            : {
                'WAITING VERIFICATION': 'Menunggu Verifikasi',
                REJECTED: 'Ditolak',
                DITOLAK: 'Ditolak',
                OPEN: 'Terbuka',
                NEW: 'Baru',
                'IN PROGRESS': 'Sedang Diproses',
                DIPROSES: 'Sedang Diproses',
                RESOLVED: 'Selesai',
                CLOSED: 'Ditutup',
                'WAITING CONFIRMATION': 'Menunggu Konfirmasi',
            };

        return labels[normalized] || status;
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-900">{t('tickets.need_quick_action')}</h2>
                <Link href="/dashboard/operator/tickets" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                    {t('tickets.view_all')}
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left table-auto">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t('tickets.ticket_no')}</th>
                            <th className="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t('tickets.subject')}</th>
                            <th className="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t('tickets.status')}</th>
                            <th className="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t('tickets.priority')}</th>
                            <th className="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">{t('tickets.action')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {priorityTickets.map((ticket, idx) => {
                            const formattedTicketNum = ticket.ticket_num ? 
                                (ticket.ticket_num.match(/\d+$/)?.[0].padStart(6, '0') || ticket.ticket_num) 
                                : String(idx + 1).padStart(6, '0');
                            const tNum = `#${formattedTicketNum}`;

                            return (
                                <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-5 py-4 font-mono text-[13px] font-medium text-slate-800 whitespace-nowrap">
                                        <Link href={`/dashboard/operator/tickets/${ticket.id}`} className="hover:text-blue-600 hover:underline">
                                            {tNum}
                                        </Link>
                                    </td>
                                    <td className="px-5 py-4">
                                        <p className="text-[13.5px] font-medium text-slate-800 line-clamp-1">
                                            {translateCategoryName(translateTicketSubject(ticket.subject || ticket.category?.name || t('tickets.no_subject'), language), language)}
                                        </p>
                                        <p className="text-[12px] text-slate-500 mt-0.5">
                                            {t('tickets.from')}: {ticket.reporter_name || 'N/A'}
                                        </p>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${
                                            ticket.status === 'WAITING VERIFICATION' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                                        }`}>
                                            {renderStatusBadge(ticket.status)}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        {renderPriorityBadge(ticket.priority)}
                                    </td>
                                    <td className="px-5 py-4 text-right whitespace-nowrap">
                                        <Link 
                                            href={`/dashboard/operator/tickets/${ticket.id}`}
                                            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-[12.5px] font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                                        >
                                            {t('tickets.verify')}
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
