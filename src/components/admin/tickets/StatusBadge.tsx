import React from 'react';
import { TicketStatus } from '@/lib/mock/tickets';

interface StatusBadgeProps {
  status: TicketStatus;
  /** Tampilkan tag "OVERDUE" merah di bawah badge, sesuai desain Tickets Monitoring */
  overdue?: boolean;
}

export default function StatusBadge({ status, overdue = false }: StatusBadgeProps) {
  let colorClass = '';
  let label: string = status;

  // NOTE: 'New' menggantikan status lama 'Open'. Update union type TicketStatus
  // di lib/mock/tickets.ts dari 'Open' menjadi 'New' agar tidak error di TypeScript.
  switch (status) {
    case 'New' as TicketStatus:
      colorClass = 'bg-blue-50 text-blue-700 border-blue-100';
      label = 'NEW';
      break;
    case 'In Progress':
      colorClass = 'bg-amber-50 text-amber-700 border-amber-100';
      label = 'IN PROGRESS';
      break;
    case 'Waiting':
      colorClass = 'bg-slate-100 text-slate-600 border-slate-200';
      label = 'WAITING VERIFICATION';
      break;
    case 'Resolved':
      colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-100';
      label = 'RESOLVED';
      break;
    case 'Closed':
    default:
      colorClass = 'bg-slate-50 text-slate-500 border-slate-200';
      label = 'CLOSED';
      break;
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold border tracking-wide whitespace-nowrap ${colorClass}`}>
        {label}
      </span>
      {overdue && (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.007M4.322 19.5h15.356c1.42 0 2.309-1.523 1.6-2.755L13.6 4.245c-.71-1.233-2.49-1.233-3.2 0L2.72 16.745c-.71 1.232.18 2.755 1.601 2.755z" />
          </svg>
          OVERDUE
        </span>
      )}
    </div>
  );
}