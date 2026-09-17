'use client';

import React from 'react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { useLanguage } from '@/context/LanguageContext';

interface OperatorStatCardsProps {
  todayCount?: number;
  waitingVerificationCount?: number;
  systemResolvedCount?: number;
}

export default function OperatorStatCards({
  todayCount = 0,
  waitingVerificationCount = 0,
  systemResolvedCount = 0,
}: OperatorStatCardsProps) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
      <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          <div className="text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2">
            {t('operator.today_tickets')}
          </div>
          <div className="text-4xl font-bold text-[var(--ink)]">
            <AnimatedCounter value={todayCount} duration={1200} />
          </div>
        </div>
        <div className="text-xs text-[var(--text-dim)] mt-4">
          {t('operator.today_tickets_desc')}
        </div>
      </div>

      <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow bg-amber-50/30">
        <div>
          <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-2">
            {t('operator.waiting_verification')}
          </div>
          <div className="text-4xl font-bold text-amber-600">
            <AnimatedCounter value={waitingVerificationCount} duration={1500} />
          </div>
        </div>
        <div className="text-xs text-amber-700 mt-4">
          {t('operator.waiting_verification_desc')}
        </div>
      </div>

      <div className="bg-white border border-[var(--line-dark)] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          <div className="text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2">
            {t('operator.self_resolved')}
          </div>
          <div className="text-4xl font-bold text-[var(--ink)]">
            <AnimatedCounter value={systemResolvedCount} duration={1800} />
          </div>
        </div>
        <div className="text-xs text-[var(--text-dim)] mt-4">
          {t('operator.self_resolved_desc')}
        </div>
      </div>
    </div>
  );
}
