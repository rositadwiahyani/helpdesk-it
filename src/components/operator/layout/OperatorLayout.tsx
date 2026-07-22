'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import OperatorSidebar from './OperatorSidebar';
import Topbar from '@/components/shared/layout/Topbar';

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const getPageTitle = () => {
    if (!pathname) return 'Dashboard Operator';
    if (pathname.includes('/dashboard/operator/tickets')) return 'Tiket Masuk';
    if (pathname.includes('/dashboard/operator/tickets-rejected')) return 'Tiket Ditolak';
    if (pathname.includes('/dashboard/operator/profile')) return 'Profil Saya';
    if (pathname.includes('/dashboard/operator')) return 'Dashboard Operator';
    return 'Dashboard Operator';
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] flex">
      {/* Sidebar (Kiri) */}
      <OperatorSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Wrapper (Kanan) */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'}`}>
        
        {/* Topbar (Atas) */}
        <Topbar 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          pageTitle={getPageTitle()}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="mb-6 hidden md:block">
            <div className="h-4 w-48 bg-[var(--line)] rounded-md animate-pulse"></div>
          </div>

          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
