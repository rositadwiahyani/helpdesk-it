'use client';
import { usePathname } from 'next/navigation';
import Topbar from '@/components/shared/layout/Topbar';

export default function BlankLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Helper to determine page title from pathname
  const getPageTitle = () => {
    if (!pathname) return 'Dashboard';
    if (pathname.includes('/dashboard/pimpinan')) return 'Dashboard Pimpinan';
    if (pathname.includes('/dashboard/teknisi')) return 'Dashboard Teknisi';
    if (pathname.includes('/dashboard/administrasi')) return 'Dashboard Administrasi';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] flex flex-col">
      {/* Topbar (Atas) */}
      <Topbar 
        onMenuClick={() => {}} 
        pageTitle={getPageTitle()}
      />

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto flex flex-col">
        {/* Children (Halaman Dashboard/dll akan di-render di sini) */}
        <div className="w-full flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
