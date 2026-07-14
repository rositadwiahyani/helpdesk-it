'use client';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import DataTable, { ColumnDef } from '@/components/admin/tables/DataTable';

const DUMMY_AGENTS = [
  { id: '1', name: 'Admin Magang', email: 'admin.magang@undip.ac.id', dept: 'Infrastruktur Jaringan', tickets: 12 },
  { id: '2', name: 'Andri Kusuma', email: 'andri.k@undip.ac.id', dept: 'Sistem Informasi', tickets: 5 },
  { id: '3', name: 'Dewi Lestari', email: 'dewi.l@undip.ac.id', dept: 'Layanan Akun', tickets: 8 },
];

const columns: ColumnDef<typeof DUMMY_AGENTS[0]>[] = [
  { header: 'Nama Teknisi (Agent)', accessorKey: 'name' },
  { header: 'Email', accessorKey: 'email' },
  { header: 'Departemen', accessorKey: 'dept' },
  { header: 'Tiket Aktif', accessorKey: 'tickets' },
];

export default function AgentsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Daftar Teknisi (Agents)</h2>
            <p className="text-[var(--text-dim)] text-sm">Kelola staf IT yang bertugas menangani tiket.</p>
          </div>
          <button className="bg-[var(--gold)] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--gold-dim)] transition-colors">
            + Tambah Teknisi
          </button>
        </div>
        <DataTable columns={columns} data={DUMMY_AGENTS} searchPlaceholder="Cari nama teknisi..." />
      </div>
    </AdminLayout>
  );
}
