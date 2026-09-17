'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface DashboardHeaderProps {
  titleKey: string;
  defaultTitle: string;
  descKey: string;
  defaultDesc: string;
}

export default function DashboardHeader({
  titleKey,
  defaultTitle,
  descKey,
  defaultDesc,
}: DashboardHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
      <h1 className="text-2xl font-bold text-[var(--ink)] mb-1">
        {t(titleKey, defaultTitle)}
      </h1>
      <p className="text-[var(--text-dim)] text-sm">
        {t(descKey, defaultDesc)}
      </p>
    </div>
  );
}
