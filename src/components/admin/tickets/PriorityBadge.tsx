import React from 'react';
import { TicketPriority } from '@/lib/mock/tickets';
import { useLanguage } from '@/context/LanguageContext';

interface PriorityBadgeProps {
  priority: TicketPriority;
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const { language } = useLanguage();
  let colorClass = '';

  switch (priority) {
    case 'Critical':
      colorClass = 'bg-red-50 text-red-700 border-red-100';
      break;
    case 'High':
      colorClass = 'bg-amber-50 text-amber-700 border-amber-100';
      break;
    case 'Medium':
      colorClass = 'bg-slate-100 text-slate-600 border-slate-200';
      break;
    case 'Low':
    default:
      colorClass = 'bg-slate-50 text-slate-500 border-slate-200';
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold border tracking-wide whitespace-nowrap ${colorClass}`}>
      {language === 'en'
        ? priority.toUpperCase()
        : ({ Urgent: 'MENDESAK', Critical: 'KRITIS', High: 'TINGGI', Medium: 'SEDANG', Low: 'RENDAH' } as Record<string, string>)[priority] || priority.toUpperCase()}
    </span>
  );
}