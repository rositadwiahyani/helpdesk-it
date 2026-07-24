import AdminLayout from '@/components/admin/layout/AdminLayout';

export default function AdministrasiLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}