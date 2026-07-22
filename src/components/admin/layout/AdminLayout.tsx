'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { fetchClient } from '@/lib/apiClient';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    fetchClient('/auth/me').then(res => {
      if (res.success && res.data) {
        const userData = res.data.user || {};
        const userMeta = userData.user_metadata || {};
        const profileData = res.data.profile || {};
        
        setUserProfile({
          name: profileData.name || userMeta.name || userMeta.full_name || userData.email?.split('@')[0] || 'User',
          role: profileData.role || userMeta.role || 'operator',
          email: profileData.email || userData.email || '',
          ...profileData
        });
      }
    }).catch(err => console.error("Error fetching user profile:", err));
  }, []);

  // Helper untuk breadcrumb induk ("Menu" untuk admin, kosong/lain untuk operator)
  const getBreadcrumbParent = () => {
    if (pathname?.startsWith('/dashboard/operator')) return 'Dashboard';
    return 'Menu';
  };

  // Helper untuk menentukan judul halaman aktif dari pathname
  const getPageTitle = () => {
    if (!pathname) return 'Dashboard Administrator';

    // Operator
    if (pathname.includes('/dashboard/operator/tickets-rejected')) return 'Tiket Ditolak';
    if (pathname.includes('/dashboard/operator/tickets')) return 'Tiket Masuk';
    if (pathname.includes('/dashboard/operator/profile')) return 'Profil';
    if (pathname.includes('/dashboard/operator')) return 'Dashboard Operator';

    // Admin — sesuai menu sidebar yang baru
    if (pathname.includes('/admin/tickets')) return 'Tickets';
    if (pathname.includes('/admin/users')) return 'Manajemen Pengguna';
    if (pathname.includes('/admin/report-categories')) return 'Kategori Laporan';
    if (pathname.includes('/admin/sla')) return 'Manajemen SLA';
    if (pathname.includes('/admin/staff')) return 'Manajemen Staff';
    if (pathname.includes('/admin/reports')) return 'Laporan & Ekspor';
    if (pathname.includes('/admin/webhooks')) return 'Log API Webhook';
    if (pathname.includes('/admin/settings')) return 'Pengaturan Sistem';
    if (pathname.includes('/admin/dashboard')) return 'Dashboard Administrator';

    return 'Dashboard Administrator';
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] flex">
      {/* Sidebar (Kiri) — fixed, selalu tampil di desktop, drawer di mobile */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Wrapper (Kanan) */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarOpen ? 'lg:pl-72' : ''}`}>

        {/* Topbar (Atas) — breadcrumb "Menu > Judul Halaman" sudah termasuk di dalamnya */}
        <AdminTopbar
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          breadcrumbParent={getBreadcrumbParent()}
          pageTitle={getPageTitle()}
          userName={userProfile?.name || 'Loading...'}
          userRole={userProfile?.role || '...'}
          avatarSrc="/avatar-admin.jpg"
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