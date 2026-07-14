import React from 'react';

type Role = 'Admin' | 'User' | 'Guest' | string;

interface RoleBadgeProps {
  role: Role;
}

export default function RoleBadge({ role }: RoleBadgeProps) {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-700';

  if (role === 'Admin') {
    bgColor = 'bg-[var(--gold-soft)]/20';
    textColor = 'text-[var(--gold-dim)]';
  } else if (role === 'User') {
    bgColor = 'bg-blue-100';
    textColor = 'text-blue-700';
  } else if (role === 'Guest') {
    bgColor = 'bg-purple-100';
    textColor = 'text-purple-700';
  }

  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${bgColor} ${textColor}`}>
      {role}
    </span>
  );
}
