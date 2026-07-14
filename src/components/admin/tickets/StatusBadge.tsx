import React from 'react';
import { TicketStatus } from '@/lib/mock/tickets';

interface StatusBadgeProps {
  status: TicketStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  let colorClass = '';
  let indicator = '';

  switch (status) {
    case 'Open':
      colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      indicator = '●';
      break;
    case 'In Progress':
      colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
      indicator = '⟳';
      break;
    case 'Waiting':
      colorClass = 'bg-purple-50 text-purple-700 border-purple-200';
      indicator = '⏳';
      break;
    case 'Resolved':
      colorClass = 'bg-teal-50 text-teal-700 border-teal-200';
      indicator = '✔';
      break;
    case 'Closed':
    default:
      colorClass = 'bg-slate-50 text-slate-600 border-slate-200';
      indicator = '✓';
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${colorClass}`}>
      <span className="text-[11px] leading-none">{indicator}</span>
      {status}
    </span>
  );
}
