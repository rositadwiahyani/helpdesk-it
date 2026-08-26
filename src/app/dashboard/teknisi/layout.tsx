import TeknisiLayout from '@/components/teknisi/layout/TeknisiLayout';

export default function TeknisiDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TeknisiLayout>
      {children}
    </TeknisiLayout>
  );
}
