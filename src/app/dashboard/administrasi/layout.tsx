import BlankLayout from '@/components/shared/layout/BlankLayout';

export default function AdministrasiLayout({ children }: { children: React.ReactNode }) {
  return (
    <BlankLayout>
      {children}
    </BlankLayout>
  );
}
