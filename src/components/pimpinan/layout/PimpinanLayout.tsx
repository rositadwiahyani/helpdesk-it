'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import PimpinanSidebar from './PimpinanSidebar';
import AdminTopbar from '@/components/admin/layout/AdminTopbar';
import { useLanguage } from '@/context/LanguageContext';

export default function PimpinanLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { t } = useLanguage();

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
    if (!pathname) return t('menu.executive_summary');
    if (pathname.includes('/dashboard/pimpinan/tickets')) return t('menu.ticket_reports');
    if (pathname.includes('/dashboard/pimpinan/performance')) return t('menu.performance_reports');
    if (pathname.includes('/dashboard/pimpinan/sla')) return t('menu.sla_reports');
    if (pathname.includes('/dashboard/pimpinan/reports')) return t('menu.summary_reports');
    if (pathname.includes('/dashboard/pimpinan/profile')) return t('profile.pimpinan_title');
    return t('menu.executive_summary');
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
          breadcrumbParent="Dashboard"
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
