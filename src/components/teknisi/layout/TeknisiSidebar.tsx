'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface TeknisiSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function TeknisiSidebar({ isOpen, setIsOpen }: TeknisiSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    document.cookie = 'auth_token=; Max-Age=0; path=/';
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
    router.refresh();
  };

  const MENU_ITEMS = [
    { name: 'Dashboard', path: '/dashboard/teknisi', icon: DashboardIcon },
    { name: 'Open Tickets', path: '/dashboard/teknisi/open-tickets', icon: TicketsIcon },
    { name: 'My Tasks', path: '/dashboard/teknisi/my-tasks', icon: TaskIcon },
    { name: 'Resolved Tickets', path: '/dashboard/teknisi/resolved', icon: CheckCircleIcon },
    { name: 'Profil', path: '/dashboard/teknisi/profile', icon: UsersIcon },
  ];

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
          <span className="font-['Fraunces'] font-bold text-lg text-[var(--ink)]">Teknisi Menu</span>
        </div>

        {/* Menu Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1.5">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            // Logika active state
            let isActive = false;
            if (item.path === '/dashboard/teknisi') {
              isActive = pathname === '/dashboard/teknisi';
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

        {/* Footer Area Sidebar */}
        <div className="p-4 border-t border-[var(--line)] flex flex-col gap-3">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-[14.5px] text-red-600 font-medium hover:bg-red-50 transition-colors w-full text-left"
          >
            <LogoutIcon isActive={false} />
            Logout
          </button>
          <div className="bg-[var(--paper-2)] p-4 rounded-xl flex flex-col gap-1">
            <span className="text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-wider">HelpIT Teknisi</span>
            <span className="text-xs text-[var(--text-dim)] font-medium">v1.0.0 &copy; 2026</span>
          </div>
        </div>
      </aside>
    </>
  );
}

// ==========================================
// KUMPULAN ICON SVG
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

function TaskIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? "2.2" : "1.8"} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function CheckCircleIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? "2.2" : "1.8"} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function BookIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? "2.2" : "1.8"} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function LogoutIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? "2.2" : "1.8"} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
