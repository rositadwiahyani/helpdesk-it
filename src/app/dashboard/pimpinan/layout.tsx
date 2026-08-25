import PimpinanLayout from '@/components/pimpinan/layout/PimpinanLayout';

export default function PimpinanDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <PimpinanLayout>
      {children}
    </PimpinanLayout>
  );
}
