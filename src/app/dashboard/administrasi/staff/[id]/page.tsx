import StaffDetail from "@/components/admin/staff/StaffDetail";

export default async function StaffDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <StaffDetail staffId={resolvedParams.id} />;
}
