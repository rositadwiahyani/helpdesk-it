'use client';
import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--paper)] flex">
      {/* Sidebar (Kiri) */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Wrapper (Kanan) */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 lg:pl-64">
        
        {/* Topbar (Atas) */}
        <AdminTopbar onMenuClick={() => setIsSidebarOpen(true)} />

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
