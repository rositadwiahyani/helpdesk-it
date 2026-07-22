import OperatorLayoutComponent from '@/components/operator/layout/OperatorLayout';

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <OperatorLayoutComponent>
      {children}
    </OperatorLayoutComponent>
  );
}
