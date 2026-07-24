import React from 'react';
import { TicketTimelineEvent } from '@/lib/mock/tickets';

interface TimelineCardProps {
  timeline: TicketTimelineEvent[];
}

export default function TimelineCard({ timeline }: TimelineCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--line)] p-5 lg:p-6 shadow-sm flex flex-col gap-4">
      <h3 className="font-bold text-[14px] text-[var(--ink)] border-b border-[var(--line-dark)] pb-3">
        Activity Timeline
      </h3>

      <div className="relative border-l-2 border-[var(--line)] pl-5 ml-2.5 flex flex-col gap-5 py-2">
        {timeline.map((item) => {
          let dotColor = 'bg-[var(--gold-soft)]';
          
          if (item.event.includes('Closed')) {
            dotColor = 'bg-slate-400';
          } else if (item.event.includes('Resolved')) {
            dotColor = 'bg-emerald-500';
          } else if (item.event.includes('Priority')) {
            dotColor = 'bg-red-500';
          }

          return (
            <div key={item.id} className="relative text-[13px] flex flex-col gap-0.5">
              {/* Dot */}
              <span className={`absolute -left-[27.5px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${dotColor}`}></span>
              
              <div className="flex items-center justify-between gap-4">
                <span className="font-bold text-[var(--ink)]">{item.event}</span>
                <span className="text-[11px] text-[var(--text-dim)] font-mono">{item.timestamp}</span>
              </div>
              <span className="text-xs text-[var(--text-dim)] font-medium">
                by <span className="font-bold text-[var(--ink)]">{item.actor}</span>
              </span>
              {item.details && (
                <p className="mt-1 bg-[var(--paper-2)]/30 border border-[var(--line-dark)] p-2 rounded-lg text-xs text-[var(--text-dim)] italic font-semibold">
                  {item.details}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
