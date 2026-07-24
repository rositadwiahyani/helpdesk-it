'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import OperatorSidebar from './OperatorSidebar';
import AdminTopbar from '@/components/admin/layout/AdminTopbar';

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const getPageTitle = () => {
    if (!pathname) return 'Dashboard Operator';
    if (pathname.includes('/dashboard/operator/tickets-rejected')) return 'Tiket Ditolak';
    if (pathname.includes('/dashboard/operator/tickets')) return 'Tiket Masuk';
    if (pathname.includes('/dashboard/operator/profile')) return 'Profil';
    if (pathname.includes('/dashboard/operator')) return 'Dashboard Operator';
    return 'Dashboard Operator';
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] flex">
      {/* Sidebar (Kiri) */}
      <OperatorSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

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
