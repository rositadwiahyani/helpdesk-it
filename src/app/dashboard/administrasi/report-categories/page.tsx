import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import Workspace from "@/components/admin/report-categories/Workspace";

export default function KategoriLaporanPage() {
  return (
    <div className="bg-linear-[0deg,#F9F9FC0%,#F9F9FC100%),#FF] min-w-screen min-h-screen">
      <AdminSidebar />
      <Workspace />
export default function ReportCategoriesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Kategori Laporan</h1>
      <p>Halaman ini sedang dalam tahap pengembangan.</p>
    </div>
  );
}