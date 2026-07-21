import BlankLayout from '@/components/admin/layout/BlankLayout';

export default function AdministrasiLayout({ children }: { children: React.ReactNode }) {
  return (
    <BlankLayout>
      {children}
    </BlankLayout>
  );
}
