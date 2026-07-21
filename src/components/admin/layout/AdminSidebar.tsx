'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const pathname = usePathname();

  let MENU_ITEMS = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: DashboardIcon },
    { name: 'Tickets', path: '/admin/tickets', icon: TicketsIcon },
    { name: 'Users', path: '/admin/users', icon: UsersIcon },
    { name: 'Departments', path: '/admin/departments', icon: UsersIcon },
    { name: 'Help Topics', path: '/admin/help-topics', icon: TicketsIcon },
    { name: 'Roles', path: '/admin/roles', icon: UsersIcon },
    { name: 'Knowledgebase', path: '/admin/knowledgebase', icon: KnowledgebaseIcon },
    { name: 'Settings', path: '/admin/settings', icon: SettingsIcon },
    { name: 'Emails', path: '/admin/emails', icon: TicketsIcon },
    { name: 'Agents', path: '/admin/agents', icon: UsersIcon },
    { name: 'Manage', path: '/admin/manage', icon: DashboardIcon },
  ];

  if (pathname?.startsWith('/dashboard/operator')) {
    MENU_ITEMS = [
      { name: 'Dashboard', path: '/dashboard/operator', icon: DashboardIcon },
      { name: 'Tiket Masuk', path: '/dashboard/operator/tickets', icon: TicketsIcon },
      { name: 'Tiket Ditolak', path: '/dashboard/operator/tickets-rejected', icon: TicketsIcon },
      { name: 'Profil', path: '/dashboard/operator/profile', icon: UsersIcon },
    ];
  }

  return (
    <>
      {/* Overlay untuk mobile saat drawer terbuka */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[var(--line)] flex flex-col transition-transform duration-300 ease-[var(--ease)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header / Logo Area Sidebar */}
        <div className="h-16 flex items-center px-6 border-b border-[var(--line-dark)] lg:hidden">
          <span className="font-['Fraunces'] font-bold text-lg text-[var(--ink)]">Admin Menu</span>
        </div>

        {/* Menu Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1.5">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            // Logika active state yang presisi
            let isActive = false;
            if (item.path === '/dashboard/operator') {
              isActive = pathname === '/dashboard/operator';
            } else if (item.path === '/admin') {
              isActive = pathname === '/admin';
            } else if (item.path === '/dashboard/operator/tickets') {
              isActive = pathname === '/dashboard/operator/tickets' || pathname?.startsWith('/dashboard/operator/tickets/');
            } else {
              isActive = pathname?.startsWith(item.path) || false;
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14.5px] transition-all duration-200 ${
                  isActive 
                    ? 'bg-[var(--gold)]/10 text-[var(--gold)] font-bold shadow-sm' 
                    : 'text-[var(--text-dim)] font-medium hover:bg-[var(--paper-2)] hover:text-[var(--ink)]'
                }`}
              >
                <Icon isActive={isActive} />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Footer Area Sidebar (Opsional) */}
        <div className="p-4 border-t border-[var(--line)] flex flex-col gap-3">
          {pathname?.startsWith('/dashboard/operator') && (
            <Link 
              href="/login"
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-[14.5px] text-red-600 font-medium hover:bg-red-50 transition-colors"
            >
              <SettingsIcon isActive={false} />
              Logout
            </Link>
          )}
          <div className="bg-[var(--paper-2)] p-4 rounded-xl flex flex-col gap-1">
            <span className="text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-wider">HelpIT Admin</span>
            <span className="text-xs text-[var(--text-dim)] font-medium">v1.0.0 &copy; 2026</span>
          </div>
        </div>
      </aside>
    </>
  );
}

// ==========================================
// KUMPULAN ICON SVG (Stroke modern style)
// ==========================================

function DashboardIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? "2.2" : "1.8"} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  );
}

function UsersIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? "2.2" : "1.8"} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function TicketsIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? "2.2" : "1.8"} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M4 4h16v12H8l-4 4V4Z" />
      <path d="M8 9h8" />
      <path d="M8 12h5" />
    </svg>
  );
}

function KnowledgebaseIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? "2.2" : "1.8"} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function SettingsIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? "2.2" : "1.8"} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
