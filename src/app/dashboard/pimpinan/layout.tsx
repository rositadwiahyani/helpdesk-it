import BlankLayout from '@/components/shared/layout/BlankLayout';

export default function PimpinanLayout({ children }: { children: React.ReactNode }) {
  return (
    <BlankLayout>
      {children}
    </BlankLayout>
  );
}
