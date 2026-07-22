'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  let MENU_ITEMS = [
    { name: 'Beranda', path: '/admin/dashboard', icon: HomeIcon },
    { name: 'Tickets', path: '/admin/tickets', icon: TicketsIcon },
    { name: 'Manajemen Pengguna', path: '/admin/users', icon: UsersIcon },
    { name: 'Kategori Laporan', path: '/admin/report-categories', icon: CategoryIcon },
    { name: 'Manajemen SLA', path: '/admin/sla', icon: SlaIcon },
    { name: 'Manajemen Staff', path: '/admin/staff', icon: StaffIcon },
    { name: 'Laporan & Ekspor', path: '/admin/reports', icon: ReportIcon },
    { name: 'Log API Webhook', path: '/admin/webhooks', icon: WebhookIcon },
    { name: 'Pengaturan Sistem', path: '/admin/settings', icon: SettingsIcon },
  ];

  if (pathname?.startsWith('/dashboard/operator')) {
    MENU_ITEMS = [
      { name: 'Dashboard', path: '/dashboard/operator', icon: HomeIcon },
      { name: 'Tiket Masuk', path: '/dashboard/operator/tickets', icon: TicketsIcon },
      { name: 'Tiket Ditolak', path: '/dashboard/operator/tickets-rejected', icon: TicketsIcon },
      { name: 'Profil', path: '/dashboard/operator/profile', icon: StaffIcon },
    ];
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0B1B2E] flex flex-col transition-transform duration-300 ease-[var(--ease)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header / Logo Area Sidebar */}
        <div className="h-[92px] flex items-center gap-3 px-6 border-b border-white/10 flex-none">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-none">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M12 3 2 8l10 5 10-5-10-5Z" />
              <path d="M6 10.3V15c0 1.66 2.69 3 6 3s6-1.34 6-3v-4.7" />
              <path d="M22 8v6" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight min-w-0">
            <span className="font-bold text-[17px] text-white truncate">IT Helpdesk</span>
            <span className="text-[10.5px] font-medium text-white/50 uppercase tracking-wider truncate">
              Universitas Diponegoro
            </span>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 overflow-y-auto py-5 px-4 flex flex-col gap-1">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            let isActive = false;
            if (item.path === '/dashboard/operator') {
              isActive = pathname === '/dashboard/operator';
            } else if (item.path === '/dashboard/operator/tickets') {
              isActive = pathname === '/dashboard/operator/tickets' || pathname?.startsWith('/dashboard/operator/tickets/');
            } else {
              isActive = pathname === item.path || pathname?.startsWith(item.path + '/') || false;
            }

            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                    setIsOpen(false);
                  }
                }}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14px] transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 font-bold shadow-md shadow-blue-900/50'
                    : 'font-medium hover:bg-slate-800'
                }`}
                style={{ color: isActive ? '#ffffff' : '#cbd5e1' }}
              >
                <Icon isActive={isActive} />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Area Sidebar - Logout */}
        <div className="p-4 border-t border-white/10 flex-none">
          <button
            onClick={handleLogout}
            className="flex items-center w-full gap-3 px-3.5 py-2.5 rounded-xl text-[14px] font-semibold text-[#F87171] hover:bg-red-500/10 transition-colors"
          >
            <LogoutIcon isActive={false} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

// ==========================================
// KUMPULAN ICON SVG (Stroke modern style)
// ==========================================

function HomeIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.2' : '1.8'} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v10h5v-6h4v6h5V10" />
    </svg>
  );
}

function TicketsIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.2' : '1.8'} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1.5a1.5 1.5 0 0 0 0 3V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.5a1.5 1.5 0 0 0 0-3V9Z" />
      <path d="M9 7v10" strokeDasharray="2 2" />
    </svg>
  );
}

function UsersIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.2' : '1.8'} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CategoryIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.2' : '1.8'} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M20.59 13.41 12 22l-9-9V3h10l7.59 7.59a2 2 0 0 1 0 2.82Z" />
      <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SlaIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.2' : '1.8'} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="m12 20 9-9-3-3-9 9v3h3Z" />
      <path d="m14.5 6.5 3 3" />
      <path d="M2 21h6" />
    </svg>
  );
}

function StaffIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.2' : '1.8'} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="M6 16c.5-2 2-3 3-3s2.5 1 3 3" />
      <path d="M14 9h4M14 13h4" />
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

function WebhookIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.2' : '1.8'} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="4" r="1.8" />
      <circle cx="4" cy="12" r="1.8" />
      <circle cx="20" cy="12" r="1.8" />
      <circle cx="12" cy="20" r="1.8" />
      <path d="M12 5.8v3.4M6 12h3.4M14.6 12H18M12 14.8v3.4" />
    </svg>
  );
}

function SettingsIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.2' : '1.8'} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
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