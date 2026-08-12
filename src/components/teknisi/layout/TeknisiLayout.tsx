'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import TeknisiSidebar from './TeknisiSidebar';
import AdminTopbar from '@/components/admin/layout/AdminTopbar';

export default function TeknisiLayout({ children }: { children: React.ReactNode }) {
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
    if (!pathname) return 'Dashboard Teknisi';
    if (pathname.includes('/dashboard/teknisi/tickets')) return 'Tiket Masuk';
    if (pathname.includes('/dashboard/teknisi/profile')) return 'Profil';
    if (pathname.includes('/dashboard/teknisi')) return 'Dashboard Teknisi';
    return 'Dashboard Teknisi';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar (Kiri) */}
      <TeknisiSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

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
