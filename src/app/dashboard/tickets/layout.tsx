'use client';
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import OperatorLayout from '@/components/operator/layout/OperatorLayout';
import TeknisiLayout from '@/components/teknisi/layout/TeknisiLayout';
import PimpinanLayout from '@/app/dashboard/pimpinan/layout';

export default function DashboardTicketsLayout({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setRole(user.role || 'operator');
      } catch {
        setRole('operator');
      }
    } else {
      setRole('operator');
    }
  }, []);

  if (!role) {
    return <div className="min-h-screen bg-[var(--paper)] flex items-center justify-center">Loading...</div>;
  }

  if (role === 'admin') {
    return <AdminLayout>{children}</AdminLayout>;
  } else if (role === 'teknisi' || role === 'agent') {
    return <TeknisiLayout>{children}</TeknisiLayout>;
  } else if (role === 'pimpinan') {
    return <PimpinanLayout>{children}</PimpinanLayout>;
  } else {
    // For operator or fallback
    return <OperatorLayout>{children}</OperatorLayout>;
  }
}
