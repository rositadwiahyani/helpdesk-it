import React from 'react';
import { Ticket } from '@/lib/mock/tickets';
import { useLanguage } from '@/context/LanguageContext';

interface TicketInfoCardProps {
  ticket: Ticket;
}

export default function TicketInfoCard({ ticket }: TicketInfoCardProps) {
  const { language } = useLanguage();
  const labels = language === 'en'
    ? { requester: 'Requester', email: 'Email', department: 'Department', topic: 'Help Topic', assigned: 'Assigned To', created: 'Created', updated: 'Updated', due: 'Due Date', sla: 'SLA Plan', source: 'Source', info: 'Ticket Information', statusPriority: 'Status & Priority', unassigned: 'Unassigned' }
    : { requester: 'Pelapor', email: 'Email', department: 'Departemen', topic: 'Topik Bantuan', assigned: 'Ditugaskan Ke', created: 'Dibuat', updated: 'Diperbarui', due: 'Tenggat', sla: 'Rencana SLA', source: 'Sumber', info: 'Informasi Tiket', statusPriority: 'Status & Prioritas', unassigned: 'Belum Ditugaskan' };
  const infoItems = [
    { label: labels.requester, value: ticket.requester, isBold: true },
    { label: labels.email, value: ticket.email },
    { label: labels.department, value: ticket.department, isBold: true },
    { label: labels.topic, value: ticket.helpTopic, isBold: true },
    { label: labels.assigned, value: ticket.assignedTo || labels.unassigned },
    { label: labels.created, value: ticket.createdDate },
    { label: labels.updated, value: ticket.updatedDate },
    { label: labels.due, value: ticket.dueDate, isWarning: true },
    { label: labels.sla, value: ticket.sla },
    { label: labels.source, value: ticket.source }
  ];

  return (
    <div className="bg-white rounded-2xl border border-[var(--line)] p-5 lg:p-6 shadow-sm flex flex-col gap-4">
      <h3 className="font-bold text-[14px] text-[var(--ink)] border-b border-[var(--line-dark)] pb-3">
        {labels.info}
      </h3>

      <div className="flex flex-col gap-3.5">
        {/* Render badges separately for better spacing */}
        <div className="flex flex-col gap-1.5 border-b border-[var(--line-dark)] pb-3">
          <span className="text-[var(--text-dim)] text-[10.5px] uppercase tracking-wider font-bold">{labels.statusPriority}</span>
          <div className="flex flex-wrap gap-2 mt-1">
            <span className="px-2 py-1 bg-[var(--gold-soft)] text-[var(--gold)] font-bold rounded-lg">
              {ticket.priority}
            </span>
            <span className="px-2 py-1 bg-[var(--success)] text-[var(--success-text)] font-bold rounded-lg">
              {ticket.status}
            </span>
          </div>
        </div>

        {infoItems.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-0.5 text-[13px]">
            <span className="text-[var(--text-dim)] text-[10.5px] uppercase tracking-wider font-bold">
              {item.label}
            </span>
            <span className={`text-[13.5px] ${
              item.isWarning ? 'text-red-500 font-bold' : item.isBold ? 'font-bold text-[var(--ink)]' : 'font-medium text-[var(--ink)]'
            }`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
