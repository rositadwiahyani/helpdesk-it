import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function StaffHeader() {
  const { t } = useLanguage();
  return (
    <div className="flex justify-between items-end w-full mb-2">
      <div className="flex flex-col items-start gap-1 w-fit">
        <div className="flex items-start gap-2 w-full font-iBMPlexSans text-xs font-semibold tracking-[0.05em] text-[#43474F]">
          <span>{t('topbar.dashboard')}</span>
          <span>/</span>
          <span className="text-[#1A1C1E]">{t('staff.title')}</span>
        </div>
        <div className="flex flex-col items-start w-full">
          <p className="text-[#001E40] font-iBMPlexSans text-[32px] font-semibold leading-10 w-fit tracking-[-0.02em]">
            {t('staff.title')}
          </p>
        </div>
      </div>
    </div>
  );
}