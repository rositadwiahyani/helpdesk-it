import BlankLayout from '@/components/admin/layout/BlankLayout';

export default function PimpinanLayout({ children }: { children: React.ReactNode }) {
  return (
    <BlankLayout>
      {children}
    </BlankLayout>
  );
}
