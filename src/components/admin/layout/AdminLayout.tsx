'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Sidebar tertutup by default di mobile, tapi di desktop kita buat true by default
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Helper to determine page title from pathname
  const getPageTitle = () => {
    if (!pathname) return 'Dashboard';
    if (pathname.includes('/dashboard/operator/tickets-rejected')) return 'Tiket Ditolak';
    if (pathname.includes('/dashboard/operator/tickets')) return 'Tiket Masuk';
    if (pathname.includes('/dashboard/operator/profile')) return 'Profil';
    if (pathname.includes('/dashboard/operator')) return 'Dashboard';
    
    // Fallbacks for Admin
    if (pathname.includes('/users')) return 'Users';
    if (pathname.includes('/tickets')) return 'Tickets';
    if (pathname.includes('/departments')) return 'Departments';
    if (pathname.includes('/help-topics')) return 'Help Topics';
    if (pathname.includes('/roles')) return 'Roles';
    if (pathname.includes('/knowledgebase')) return 'Knowledgebase';
    if (pathname.includes('/settings')) return 'Settings';
    if (pathname.includes('/emails')) return 'Emails';
    if (pathname.includes('/agents') || pathname.includes('/dashboard/agent-directory')) return 'Agents';
    if (pathname.includes('/manage')) return 'Manage';
    if (pathname.includes('/dashboard/profile')) return 'My Profile';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] flex">
      {/* Sidebar (Kiri) */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Wrapper (Kanan) */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'}`}>
        
        {/* Topbar (Atas) */}
        <AdminTopbar 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          pageTitle={getPageTitle()}
        />

        {/* Placeholder Breadcrumb & Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {/* Breadcrumb Placeholder */}
          <div className="mb-6 hidden md:block">
            <div className="h-4 w-48 bg-[var(--line)] rounded-md animate-pulse"></div>
          </div>

          {/* Children (Halaman Dashboard/dll akan di-render di sini) */}
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
