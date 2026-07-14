'use client';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import DataTable, { ColumnDef } from '@/components/admin/tables/DataTable';

const DUMMY_KB = [
  { id: '1', title: 'Cara reset password SSO via email alternatif', category: 'Akun & Kata Sandi', views: 1250, status: 'Dipublikasi' },
  { id: '2', title: 'Konfigurasi Eduroam di Android 12+', category: 'Jaringan & WiFi', views: 890, status: 'Dipublikasi' },
  { id: '3', title: 'Panduan upload tugas di E-Learning (Draf Baru)', category: 'E-Learning', views: 0, status: 'Draf' },
];

const columns: ColumnDef<typeof DUMMY_KB[0]>[] = [
  { header: 'Judul Artikel', accessorKey: 'title' },
  { header: 'Kategori', accessorKey: 'category' },
  { header: 'Dilihat', accessorKey: 'views' },
  { 
    header: 'Status', 
    cell: (item) => (
      <span className={`px-2 py-1 rounded-md text-xs font-bold ${item.status === 'Dipublikasi' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
        {item.status}
      </span>
    )
  }
];

export default function KnowledgebasePage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Knowledgebase / FAQ</h2>
            <p className="text-[var(--text-dim)] text-sm">Tulis dan terbitkan artikel panduan penyelesaian masalah.</p>
          </div>
          <button className="bg-[var(--gold)] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--gold-dim)] transition-colors">
            + Tulis Artikel Baru
          </button>
        </div>
        <DataTable columns={columns} data={DUMMY_KB} searchPlaceholder="Cari judul artikel..." />
      </div>
    </AdminLayout>
  );
}
