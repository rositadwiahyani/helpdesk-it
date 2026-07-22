import BlankLayout from '@/components/admin/layout/BlankLayout';

export default function TeknisiLayout({ children }: { children: React.ReactNode }) {
  return (
    <BlankLayout>
      {children}
    </BlankLayout>
  );
}
