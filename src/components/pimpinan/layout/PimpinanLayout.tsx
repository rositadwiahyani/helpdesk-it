'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import PimpinanSidebar from './PimpinanSidebar';
import AdminTopbar from '@/components/admin/layout/AdminTopbar';

export default function PimpinanLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarOpen');
    if (savedState !== null) {
      setIsSidebarOpen(savedState === 'true');
    }
  }, []);

  const handleSidebarToggle = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', String(newState));
  };

  const getPageTitle = () => {
    if (!pathname) return 'Executive Summary';
    if (pathname.includes('/dashboard/pimpinan/tickets')) return 'Laporan Tiket';
    if (pathname.includes('/dashboard/pimpinan/performance')) return 'Laporan Performa';
    if (pathname.includes('/dashboard/pimpinan/sla')) return 'Laporan SLA';
    if (pathname.includes('/dashboard/pimpinan/reports')) return 'Rekap Laporan';
    if (pathname.includes('/dashboard/pimpinan/profile')) return 'Profil Pimpinan';
    return 'Executive Summary';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar (Kiri) */}
      <PimpinanSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Wrapper (Kanan) */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-[var(--ease)] ${
          isSidebarOpen ? 'lg:pl-72' : 'lg:pl-[80px]'
        }`}
      >
        {/* Topbar (Atas) */}
        <AdminTopbar
          onMenuClick={handleSidebarToggle}
          breadcrumbParent="Dashboard Pimpinan"
          pageTitle={getPageTitle()}
          showMenuButtonOnDesktop={true}
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
