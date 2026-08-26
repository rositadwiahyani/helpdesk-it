import OperatorLayout from '@/components/operator/layout/OperatorLayout';

export default function OperatorDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <OperatorLayout>
      {children}
    </OperatorLayout>
  );
}
