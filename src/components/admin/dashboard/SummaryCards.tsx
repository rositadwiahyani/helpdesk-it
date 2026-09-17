'use client';

import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { useLanguage } from '@/context/LanguageContext';

interface SummaryCardsProps {
  data?: {
    today: number;
    growth: string;
    open: number;
    overdue: number;
    failedMessages: number;
  };
}

export default function SummaryCards({ data }: SummaryCardsProps) {
  const { t } = useLanguage();
  const defaultData = data || { today: 0, growth: "0", open: 0, overdue: 0, failedMessages: 0 };
  
  const cardData = [
    {
      title: t('dashboard.today_tickets'),
      value: defaultData.today,
      growth: `${defaultData.growth}% ${t('dashboard.vs_yesterday')}`,
      containerClass: "bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow",
      titleClass: "text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2",
      valueClass: "text-4xl font-bold text-[var(--ink)]",
      descClass: "text-xs text-[var(--text-dim)] mt-4",
    },
    {
      title: t('dashboard.open_tickets'),
      value: defaultData.open,
      growth: t('dashboard.needs_attention'),
      containerClass: "bg-white border border-amber-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow bg-amber-50/30",
      titleClass: "text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-2",
      valueClass: "text-4xl font-bold text-amber-600",
      descClass: "text-xs text-amber-700 mt-4",
    },
    {
      title: t('dashboard.overdue_sla'),
      value: defaultData.overdue,
      growth: t('dashboard.action_required'),
      containerClass: "bg-white border border-red-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow bg-red-50/30",
      titleClass: "text-[11px] font-bold text-red-700 uppercase tracking-wider mb-2",
      valueClass: "text-4xl font-bold text-red-600",
      descClass: "text-xs text-red-700 mt-4",
    },
    {
      title: t('dashboard.solved_by_system'),
      value: defaultData.failedMessages,
      growth: t('dashboard.auto_resolved'),
      containerClass: "bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow",
      titleClass: "text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2",
      valueClass: "text-4xl font-bold text-[var(--ink)]",
      descClass: "text-xs text-[var(--text-dim)] mt-4",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
      {cardData.map((card, idx) => (
        <div key={idx} className={card.containerClass}>
            <div>
                <div className={card.titleClass}>{card.title}</div>
                <div className={card.valueClass}>
                    <AnimatedCounter value={card.value} duration={1200 + (idx * 300)} />
                </div>
            </div>
            <div className={card.descClass}>{card.growth}</div>
        </div>
      ))}
    </div>
  );
}