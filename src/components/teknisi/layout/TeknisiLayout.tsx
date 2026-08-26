'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import TeknisiSidebar from './TeknisiSidebar';
import AdminTopbar from '@/components/admin/layout/AdminTopbar';

export default function TeknisiLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const getPageTitle = () => {
    if (!pathname) return 'Dashboard Teknisi';
    if (pathname.includes('/dashboard/teknisi/tickets')) return 'Open Tickets';
    if (pathname.includes('/dashboard/teknisi/tasks')) return 'My Tasks';
    if (pathname.includes('/dashboard/teknisi/resolved')) return 'Resolved Tickets';
    if (pathname.includes('/dashboard/teknisi/profile')) return 'Profil';
    if (pathname.includes('/dashboard/teknisi')) return 'Dashboard Teknisi';
    return 'Dashboard Teknisi';
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] flex">
      {/* Sidebar (Kiri) */}
      <TeknisiSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Wrapper (Kanan) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Topbar (Atas) */}
        <AdminTopbar
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          breadcrumbParent="Dashboard"
          pageTitle={getPageTitle()}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
