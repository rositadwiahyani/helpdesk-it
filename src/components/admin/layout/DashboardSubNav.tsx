'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSubNav() {
  const pathname = usePathname();

  const navs = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Agent Directory', path: '/admin/dashboard/agent-directory' },
    { name: 'My Profile', path: '/admin/dashboard/profile' },
  ];

  return (
    <div className="flex items-center gap-1 border-b border-[var(--line)] mb-4 overflow-x-auto scrollbar-hide">
      {navs.map((nav) => {
        const isActive = pathname === nav.path;
        return (
          <Link
            key={nav.name}
            href={nav.path}
            className={`px-5 py-3 text-[14.5px] font-bold whitespace-nowrap border-b-[3px] transition-colors ${
              isActive 
                ? 'border-[var(--gold)] text-[var(--gold)]' 
                : 'border-transparent text-[var(--text-dim)] hover:text-[var(--ink)] hover:bg-[var(--paper-2)]/50'
            }`}
          >
            {nav.name}
          </Link>
        );
      })}
    </div>
  );
}
