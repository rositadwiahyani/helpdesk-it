'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function PimpinanSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  };

  const MENU_ITEMS = [
    { name: 'Beranda', path: '/dashboard/pimpinan', icon: HomeIcon },
    { name: 'Laporan Tiket', path: '/dashboard/pimpinan/tickets', icon: TicketsIcon },
    { name: 'Laporan Performa', path: '/dashboard/pimpinan/performance', icon: PerformanceIcon },
    { name: 'Laporan SLA', path: '/dashboard/pimpinan/sla', icon: SlaIcon },
    { name: 'Rekap Laporan', path: '/dashboard/pimpinan/reports', icon: ReportIcon },
    { name: 'Profil', path: '/dashboard/pimpinan/profile', icon: SettingsIcon },
  ];

  return (
    <aside className="w-64 bg-[#0F172A] text-slate-300 flex flex-col h-screen sticky top-0 left-0 border-r border-slate-800 shadow-xl overflow-hidden z-20">
      {/* BRANDING */}
      <div className="h-16 flex items-center px-6 bg-[#0B1120] border-b border-slate-800 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#F59E0B] flex items-center justify-center mr-3 shadow-lg shadow-amber-500/20">
          <span className="text-[#0F172A] font-black text-lg leading-none">IT</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold text-sm tracking-wide leading-tight">HELPDESK</span>
          <span className="text-[10px] text-amber-400 font-medium tracking-wider uppercase">Pimpinan</span>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="flex-1 py-6 px-3 overflow-y-auto custom-scrollbar">
        <div className="mb-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Menu Utama</div>
        <nav className="space-y-1">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden ${
                  isActive 
                    ? 'bg-[#1E293B] text-white shadow-sm shadow-slate-900/20' 
                    : 'text-slate-400 hover:bg-[#1E293B]/50 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 rounded-r-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
                )}
                <div className={`transition-transform duration-200 ${isActive ? 'scale-110 text-amber-400' : 'group-hover:scale-110 group-hover:text-amber-400/70'}`}>
                  <item.icon isActive={isActive} />
                </div>
                <span className={`text-sm font-medium ${isActive ? 'font-semibold' : ''}`}>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* FOOTER ACTION */}
      <div className="p-4 border-t border-slate-800 bg-[#0B1120] shrink-0">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group"
        >
          <LogoutIcon isActive={false} />
          <span>Keluar Sistem</span>
        </button>
      </div>
    </aside>
  );
}

// ICONS (Copied & modified from existing sidebar)
function HomeIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.2' : '1.8'} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function TicketsIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.2' : '1.8'} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

function PerformanceIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.2' : '1.8'} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function SlaIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.2' : '1.8'} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ReportIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.2' : '1.8'} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M2 20h20" />
    </svg>
  );
}

function SettingsIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.2' : '1.8'} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LogoutIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.2' : '1.8'} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}
