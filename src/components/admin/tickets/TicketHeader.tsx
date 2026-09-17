'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function TicketHeader() {
  const { t } = useLanguage();

  return (
    <div className="flex justify-between items-end w-full">
      <div className="flex flex-col items-start gap-1 w-fit">
        <div className="flex items-start gap-2 w-full">
          <div className="flex flex-col items-start w-fit h-full">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              {t('tickets.breadcrumb_dashboard')}
            </p>
          </div>
          <div className="flex flex-col items-start w-fit h-full">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              /
            </p>
          </div>
          <div className="flex flex-col items-start w-fit h-full">
            <p className="text-[#1A1C1E] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              {t('tickets.breadcrumb_tickets')}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start w-full">
          <p className="text-[#001E40] font-iBMPlexSans text-[32px] font-semibold leading-10 w-fit tracking-[-0.02em]">
            {t('tickets.page_title')}
          </p>
        </div>
      </div>
    </div>
  );
}