import React from 'react';
import { Ticket } from '@/lib/mock/tickets';

interface TicketInfoCardProps {
  ticket: Ticket;
}

export default function TicketInfoCard({ ticket }: TicketInfoCardProps) {
  const infoItems = [
    { label: 'Requester', value: ticket.requester, isBold: true },
    { label: 'Email', value: ticket.email },
    { label: 'Department', value: ticket.department, isBold: true },
    { label: 'Help Topic', value: ticket.helpTopic, isBold: true },
    { label: 'Assigned To', value: ticket.assignedTo || 'Unassigned' },
    { label: 'Created', value: ticket.createdDate },
    { label: 'Updated', value: ticket.updatedDate },
    { label: 'Due Date', value: ticket.dueDate, isWarning: true },
    { label: 'SLA Plan', value: ticket.sla },
    { label: 'Source', value: ticket.source }
  ];

  return (
    <div className="bg-white rounded-2xl border border-[var(--line)] p-5 lg:p-6 shadow-sm flex flex-col gap-4">
      <h3 className="font-bold text-[14px] text-[var(--ink)] border-b border-[var(--line-dark)] pb-3">
        Ticket Information
      </h3>

      <div className="flex flex-col gap-3.5">
        {/* Render badges separately for better spacing */}
        <div className="flex flex-col gap-1.5 border-b border-[var(--line-dark)] pb-3">
          <span className="text-[var(--text-dim)] text-[10.5px] uppercase tracking-wider font-bold">Status & Priority</span>
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
