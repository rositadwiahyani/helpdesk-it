import UserDetail from "@/components/admin/manajemen-pengguna/UserDetail";

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <UserDetail userId={resolvedParams.id} />;
}
