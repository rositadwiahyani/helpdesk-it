'use client';

import React, { useState } from 'react';

export type TabFilter = 'all' | 'new' | 'in_progress' | 'waiting_verification' | 'resolved' | 'closed';

interface TicketCounts {
  all: number;
  new: number;
  inProgress: number;
  waitingVerification: number;
  resolved: number;
  closed: number;
}

interface TicketToolbarProps {
  activeTab?: TabFilter;
  onTabChange?: (tab: TabFilter) => void;
  counts?: TicketCounts;
}

// Default dummy counts
const DEFAULT_COUNTS: TicketCounts = {
  all: 248,
  new: 12,
  inProgress: 45,
  waitingVerification: 8,
  resolved: 156,
  closed: 27,
};

export default function TicketToolbar({
  activeTab: externalTab,
  onTabChange,
  counts = DEFAULT_COUNTS,
}: TicketToolbarProps) {
  const [localTab, setLocalTab] = useState<TabFilter>('all');
  
  // Menggunakan controlled (dari Parent) atau uncontrolled (dari local state)
  const currentTab = externalTab !== undefined ? externalTab : localTab;

  const handleTabClick = (tab: TabFilter) => {
    setLocalTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  // Helper untuk styling agar rapi
  const getBtnClass = (tab: TabFilter) => 
    `cursor-pointer text-nowrap flex pt-0 pr-1 pb-3 pl-1 flex-col justify-center items-center border-b-2 w-fit transition-colors ${
      currentTab === tab ? 'border-b-[#0059BB]' : 'border-b-[rgba(0,0,0,0.00)] hover:border-b-gray-300'
    }`;
    
  const getTextClass = (tab: TabFilter) => 
    `font-iBMPlexSans text-sm leading-5 w-fit transition-colors ${
      currentTab === tab ? 'text-[#0059BB] font-semibold' : 'text-[#43474F]'
    }`;

  return (
    <div className="flex items-start gap-6 border-b border-b-[#C3C6D1] w-full overflow-hidden">
      <button onClick={() => handleTabClick('all')} className={getBtnClass('all')}>
        <p className={getTextClass('all')}>
          All Tickets ({counts.all})
        </p>
      </button>
      <button onClick={() => handleTabClick('new')} className={getBtnClass('new')}>
        <p className={getTextClass('new')}>
          New ({counts.new})
        </p>
      </button>
      <button onClick={() => handleTabClick('in_progress')} className={getBtnClass('in_progress')}>
        <p className={getTextClass('in_progress')}>
          In Progress ({counts.inProgress})
        </p>
      </button>
      <button onClick={() => handleTabClick('waiting_verification')} className={getBtnClass('waiting_verification')}>
        <p className={getTextClass('waiting_verification')}>
          Waiting Verification ({counts.waitingVerification})
        </p>
      </button>
      <button onClick={() => handleTabClick('resolved')} className={getBtnClass('resolved')}>
        <p className={getTextClass('resolved')}>
          Resolved ({counts.resolved})
        </p>
      </button>
      <button onClick={() => handleTabClick('closed')} className={getBtnClass('closed')}>
        <p className={getTextClass('closed')}>
          Closed ({counts.closed})
        </p>
      </button>
    </div>
  );
}