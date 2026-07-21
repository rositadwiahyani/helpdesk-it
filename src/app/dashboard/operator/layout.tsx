import AdminLayout from '@/components/admin/layout/AdminLayout';

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
