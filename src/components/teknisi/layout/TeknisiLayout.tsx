'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import TeknisiSidebar from './TeknisiSidebar';
import Topbar from '@/components/admin/layout/AdminTopbar';

export default function TeknisiLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const getPageTitle = () => {
    if (!pathname) return 'Dashboard Teknisi';
    if (pathname.includes('/dashboard/teknisi/open-tickets')) return 'Open Tickets';
    if (pathname.includes('/dashboard/teknisi/my-tasks')) return 'My Tasks';
    if (pathname.includes('/dashboard/teknisi/resolved')) return 'Resolved Tickets';
    if (pathname.includes('/dashboard/teknisi/profile')) return 'Profil Saya';
    if (pathname.includes('/dashboard/teknisi')) return 'Dashboard Teknisi';
    return 'Dashboard Teknisi';
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] flex">
      {/* Sidebar (Kiri) */}
      <TeknisiSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

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
