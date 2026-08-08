'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { fetchClient } from '@/lib/apiClient';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  const getBreadcrumbParent = () => {
    if (pathname?.startsWith('/dashboard/operator')) return 'Dashboard';
    return 'Menu';
  };

  const getPageTitle = () => {
    if (!pathname) return 'Dashboard Administrator';
    if (pathname.includes('/dashboard/administrasi/quick-replies')) return 'Template Jawaban Cepat';
    if (pathname.includes('/dashboard/administrasi/reports')) return 'Laporan & Ekspor';
    if (pathname.includes('/dashboard/administrasi/webhook')) return 'Log API Webhook';
    if (pathname.includes('/admin/tickets')) return 'Tickets';
    return 'Dashboard Administrator';
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Wrapper */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        isSidebarOpen ? 'lg:pl-72' : 'lg:pl-[80px]'
      }`}>
        
        {/* Topbar */}
        <AdminTopbar 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          pageTitle={getPageTitle()}
          breadcrumbParent={getBreadcrumbParent()}
          userName={userProfile?.name}
          userRole={userProfile?.role}
          showMenuButtonOnDesktop={true}
        />

        {/* Main Content (Area yang berubah-ubah saat pindah menu) */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}