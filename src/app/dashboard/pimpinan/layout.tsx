'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PimpinanSidebar from '@/components/pimpinan/layout/PimpinanSidebar';

export default function PimpinanLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Validasi login dan role
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userStr = localStorage.getItem('user');
    
    if (!isLoggedIn || !userStr) {
      router.push('/login');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'pimpinan') {
        // Redirect if not pimpinan
        if (user.role === 'admin') router.push('/dashboard/administrasi');
        else if (user.role === 'teknisi' || user.role === 'agent') router.push('/dashboard/teknisi');
        else router.push('/dashboard/operator');
        return;
      }
      setLoading(false);
    } catch (e) {
      router.push('/login');
    }
  }, [router]);

  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Memuat dashboard...</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <PimpinanSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
