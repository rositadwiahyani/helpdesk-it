import React from 'react';
import { TicketPriority } from '@/lib/mock/tickets';

interface PriorityBadgeProps {
  priority: TicketPriority;
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  let colorClass = '';
  let indicator = '';

  switch (priority) {
    case 'Critical':
      colorClass = 'bg-red-50 text-red-700 border-red-200';
      indicator = '🔴';
      break;
    case 'High':
      colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
      indicator = '🟠';
      break;
    case 'Medium':
      colorClass = 'bg-blue-50 text-blue-700 border-blue-200';
      indicator = '🔵';
      break;
    case 'Low':
    default:
      colorClass = 'bg-gray-50 text-gray-600 border-gray-200';
      indicator = '⚪';
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${colorClass}`}>
      <span className="text-[10px]">{indicator}</span>
      {priority}
    </span>
  );
}
