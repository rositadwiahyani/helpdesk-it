'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Ticket, 
  Users, 
  Layers, 
  ShieldCheck, 
  UserCog, 
  MessageSquare, 
  BookOpen, 
  Webhook, 
  Settings, 
  User, 
  LogOut 
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export default function AdminSidebar({ isOpen = true, setIsOpen = () => {} }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  };

  const MENU_ITEMS = [
    { name: 'Beranda', path: '/dashboard/administrasi', icon: LayoutDashboard },
    { name: 'Tickets', path: '/dashboard/administrasi/tickets', icon: Ticket },
    { name: 'Manajemen Pengguna', path: '/dashboard/administrasi/users', icon: Users },
    { name: 'Kategori Laporan', path: '/dashboard/administrasi/report-categories', icon: Layers },
    { name: 'Manajemen SLA', path: '/dashboard/administrasi/sla', icon: ShieldCheck },
    { name: 'Manajemen Staff', path: '/dashboard/administrasi/staff', icon: UserCog },
    { name: 'Jawaban Cepat', path: '/dashboard/administrasi/quick-replies', icon: MessageSquare },
    { name: 'Basis Pengetahuan', path: '/dashboard/administrasi/knowledge-base', icon: BookOpen },
    { name: 'Log API Webhook', path: '/dashboard/administrasi/webhook', icon: Webhook },
    { name: 'Profil', path: '/dashboard/administrasi/profile', icon: User },
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
        className={`fixed inset-y-0 left-0 z-50 bg-[#0B1B2E] flex flex-col transition-all duration-300 ease-[var(--ease)] ${
          isOpen ? 'w-72 translate-x-0' : 'w-[80px] max-lg:-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header / Logo Area Sidebar */}
        <div className="h-[92px] flex items-center px-4 border-b border-white/10 flex-none overflow-hidden transition-all duration-300">
          <div className="w-12 h-12 flex items-center justify-center flex-none">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-none">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 3 2 8l10 5 10-5-10-5Z" />
                <path d="M6 10.3V15c0 1.66 2.69 3 6 3s6-1.34 6-3v-4.7" />
                <path d="M22 8v6" />
              </svg>
            </div>
          </div>
          <div className={`flex flex-col leading-tight min-w-0 transition-opacity duration-200 ml-2 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <span className="font-bold text-[17px] text-white truncate">IT Helpdesk</span>
            <span className="text-[10.5px] font-medium text-white/50 uppercase tracking-wider truncate">
              Universitas Diponegoro
            </span>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 overflow-y-auto py-5 px-4 flex flex-col gap-1 overflow-x-hidden">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            let isActive = false;
            
            if (item.path === '/dashboard/administrasi') {
              isActive = pathname === item.path;
            } else {
              isActive = pathname === item.path || pathname?.startsWith(item.path + '/') || false;
            }

            return (
              <div key={item.name} className="relative group w-full">
                <Link
                  href={item.path}
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                      setIsOpen(false);
                    }
                  }}
                  className={`flex items-center rounded-xl text-[14px] transition-all duration-200 w-full h-12 px-3 gap-3 overflow-hidden ${
                    isActive 
                    ? 'bg-white/10 !text-white font-semibold'
                    : '!text-white font-medium hover:bg-white/5'
                  }`}
                  style={{ color: isActive ? '#ffffff' : '#cbd5e1' }}
                >
                  <div className="flex-none flex items-center justify-center w-6 h-6">
                    <Icon strokeWidth={isActive ? 2.5 : 2} size={20} />
                  </div>
                  <span className={`truncate transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>{item.name}</span>
                </Link>
                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                    {item.name}
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-gray-900"></div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer Area Sidebar - Logout */}
        <div className="p-4 border-t border-white/10 flex-none flex">
          <div className="relative group w-full">
            <button
              onClick={handleLogout}
              className="flex items-center rounded-xl text-[14px] font-semibold text-[#F87171] hover:bg-red-500/10 transition-colors w-full h-12 px-3 gap-3 overflow-hidden"
            >
              <div className="flex-none flex items-center justify-center w-6 h-6">
                <LogOut strokeWidth={2} size={20} />
              </div>
              <span className={`transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>Logout</span>
            </button>
            {!isOpen && (
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                Logout
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-gray-900"></div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}