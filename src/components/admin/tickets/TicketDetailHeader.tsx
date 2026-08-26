import React from 'react';
import Link from 'next/link';
import { Ticket } from '@/lib/mock/tickets';

interface TicketDetailHeaderProps {
  ticket: Ticket;
}

export default function TicketDetailHeader({ ticket }: TicketDetailHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[13px] font-bold">
        <Link href="/admin/tickets" className="text-[var(--text-dim)] hover:text-[var(--ink)] transition-colors">Tickets</Link>
        <span className="text-[var(--line-dark)]">/</span>
        <span className="text-[var(--ink)]">Ticket Detail</span>
      </div>

      {/* Main Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono font-bold text-lg text-[var(--gold-soft)] bg-[var(--paper-2)] px-2.5 py-1 rounded-lg border border-[var(--line-dark)]">
              {ticket.id}
            </span>
            <span className="px-2 py-1 bg-[var(--gold-soft)] text-[var(--gold)] font-bold rounded-lg">
              {ticket.priority}
            </span>
            <span className="px-2 py-1 bg-[var(--success)] text-[var(--success-text)] font-bold rounded-lg">
              {ticket.status}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)] leading-tight">
            {ticket.subject}
          </h2>
        </div>

        {/* Quick actions (mock) */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button 
            onClick={() => alert('Change status...')}
            className="bg-white border border-[var(--line)] text-[var(--text-dim)] px-4 py-2 rounded-xl text-xs font-bold hover:bg-[var(--paper-2)] hover:text-[var(--ink)] transition-colors flex items-center gap-1.5"
          >
            Change Status
          </button>
          <button 
            onClick={() => alert('Assign ticket...')}
            className="bg-white border border-[var(--line)] text-[var(--text-dim)] px-4 py-2 rounded-xl text-xs font-bold hover:bg-[var(--paper-2)] hover:text-[var(--ink)] transition-colors flex items-center gap-1.5"
          >
            Assign Agent
          </button>
          <button 
            onClick={() => alert('Close ticket...')}
            className="bg-[var(--ink)] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[var(--text)] transition-colors flex items-center gap-1.5"
          >
            Close Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
