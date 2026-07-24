'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/AuthService';

interface OperatorSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function OperatorSidebar({ isOpen, setIsOpen }: OperatorSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logoutUser();
    router.push('/login');
  };

  const MENU_ITEMS = [
    { name: 'Dashboard', path: '/dashboard/operator', icon: HomeIcon },
    { name: 'Tiket Masuk', path: '/dashboard/operator/tickets', icon: TicketsIcon },
    { name: 'Tiket Ditolak', path: '/dashboard/operator/tickets-rejected', icon: TicketsIcon },
    { name: 'Profil', path: '/dashboard/operator/profile', icon: StaffIcon },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0B1B2E] flex flex-col transition-transform duration-300 ease-[var(--ease)] lg:translate-x-0 ${
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
                    ? 'bg-white/10 !text-white font-semibold'
                    : '!text-white font-medium hover:bg-white/5'
                }`}
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
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14px] font-semibold text-[#F87171] hover:bg-red-500/10 transition-colors"
          >
            <LogoutIcon isActive={false} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

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

function LogoutIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.2' : '1.8'} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}
