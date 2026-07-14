'use client';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import DataTable, { ColumnDef } from '@/components/admin/tables/DataTable';

const DUMMY_TOPICS = [
  { id: '1', name: 'Gangguan WiFi Kampus', dept: 'Infrastruktur Jaringan', status: 'Aktif' },
  { id: '2', name: 'Lupa Password SSO', dept: 'Layanan Akun', status: 'Aktif' },
  { id: '3', name: 'Akses SIAP gagal', dept: 'Sistem Informasi', status: 'Aktif' },
];

const columns: ColumnDef<typeof DUMMY_TOPICS[0]>[] = [
  { header: 'Nama Topik', accessorKey: 'name' },
  { header: 'Departemen Terkait', accessorKey: 'dept' },
  { 
    header: 'Status', 
    cell: (item) => (
      <span className={`px-2 py-1 rounded-md text-xs font-bold ${item.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
        {item.status}
      </span>
    )
  }
];

export default function HelpTopicsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Topik Bantuan</h2>
            <p className="text-[var(--text-dim)] text-sm">Kategori pelaporan kendala IT.</p>
          </div>
          <button className="bg-[var(--gold)] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--gold-dim)] transition-colors">
            + Tambah Topik
          </button>
        </div>
        <DataTable columns={columns} data={DUMMY_TOPICS} searchPlaceholder="Cari topik bantuan..." />
      </div>
    </AdminLayout>
  );
}
