'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { fetchClient } from '@/lib/apiClient';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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

  const getBreadcrumbParent = () => {
    if (pathname?.startsWith('/dashboard/operator')) return 'Dashboard';
    return 'Menu';
  };

  const getPageTitle = () => {
    if (!pathname) return 'Dashboard Administrator';
    if (pathname.includes('/admin/tickets')) return 'Tickets';
    return 'Dashboard Administrator';
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] flex">
      {/* Sidebar (Permanen) */}
      <AdminSidebar />

      {/* Wrapper Kanan (Mengikuti Sidebar secara permanen dengan padding kiri 288px) */}
      <div className="flex-1 flex flex-col min-w-0 pl-[288px]">
        
        {/* Topbar (Permanen) */}
        <AdminTopbar 
          pageTitle={getPageTitle()}
          breadcrumbParent={getBreadcrumbParent()}
          userName={userProfile?.name}
          userRole={userProfile?.role}
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