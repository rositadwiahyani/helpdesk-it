'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import OperatorSidebar from './OperatorSidebar';
import AdminTopbar from '@/components/admin/layout/AdminTopbar';
import { useLanguage } from '@/context/LanguageContext';

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { t } = useLanguage();

  const getPageTitle = () => {
    if (!pathname) return t('topbar.dashboard_operator');
    if (pathname.includes('/dashboard/operator/tickets-rejected')) return t('tickets.tab_rejected');
    if (pathname.includes('/dashboard/operator/tickets-unhandled')) return t('tickets.tab_waiting');
    if (pathname.includes('/dashboard/operator/tickets-inprogress')) return t('tickets.tab_in_progress');
    if (pathname.includes('/dashboard/operator/tickets-resolved')) return t('tickets.tab_resolved');
    if (pathname.includes('/dashboard/operator/tickets')) return t('menu.all_tickets');
    if (pathname.includes('/dashboard/operator/profile')) return t('profile.title');
    if (pathname.includes('/dashboard/operator')) return t('topbar.dashboard_operator');
    return t('topbar.dashboard_operator');
  };

  const isHideableOnDesktop = pathname?.includes('/tickets') || false;

  return (
    <div className="min-h-screen bg-[var(--paper)] flex">
      {/* Sidebar (Kiri) */}
      <OperatorSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Wrapper (Kanan) */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        isSidebarOpen ? 'lg:pl-72' : 'lg:pl-[80px]'
      }`}>
        {/* Topbar (Atas) */}
        <AdminTopbar
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
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
