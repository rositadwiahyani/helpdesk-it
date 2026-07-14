import React from 'react';

type Status = 'Active (Registered)' | 'Guest' | 'Locked (Pending Activation)' | string;

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  // Styling Default
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-700';

  if (status === 'Active (Registered)') {
    // Style as plain text with no background, just bold, based on osTicket image or we can keep minimal badge style
    // wait, looking at osTicket image, they don't have bg colors, just text. But since we are modernizing, let's keep badges but make them clean.
    bgColor = 'bg-emerald-50';
    textColor = 'text-emerald-700';
  } else if (status === 'Guest') {
    bgColor = 'bg-blue-50';
    textColor = 'text-blue-700';
  } else if (status === 'Locked (Pending Activation)') {
    bgColor = 'bg-amber-50';
    textColor = 'text-amber-700';
  }

  return (
    <span className={`text-[13px] font-bold ${textColor}`}>
      {status}
    </span>
  );
}
