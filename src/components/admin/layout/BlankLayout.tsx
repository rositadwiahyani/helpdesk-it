'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminTopbar from './AdminTopbar';
import AdminSidebar from './AdminSidebar';

export default function BlankLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // State drawer sidebar untuk mobile (di desktop sidebar selalu tampil lewat lg:translate-x-0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Helper to determine page title from pathname
  const getPageTitle = () => {
    if (!pathname) return 'Dashboard Administrasi';
    if (pathname.includes('/dashboard/administrasi/sla')) return 'Manajemen SLA';
    if (pathname.includes('/dashboard/administrasi/staff')) return 'Manajemen Staff';
    if (pathname.includes('/dashboard/administrasi/reports')) return 'Laporan & Ekspor';
    if (pathname.includes('/dashboard/administrasi/quick-replies')) return 'Template Jawaban Cepat';
    if (pathname.includes('/dashboard/administrasi/webhook')) return 'Log API Webhook';
    if (pathname.includes('/dashboard/administrasi/settings')) return 'Pengaturan Sistem';
    if (pathname.includes('/dashboard/administrasi/profile')) return 'Profil Administrator';
    if (pathname.includes('/dashboard/administrasi')) return 'Dashboard Administrasi';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] flex">
      {/* Sidebar (Kiri) — sebelumnya di-import tapi tidak pernah dirender */}
      <AdminSidebar />

      {/* Wrapper konten kanan, padding kiri menyesuaikan lebar sidebar (w-72) di desktop */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Topbar (Atas) */}
        <AdminTopbar
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={getPageTitle()}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto flex flex-col">
          <div className="w-full flex-1">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}