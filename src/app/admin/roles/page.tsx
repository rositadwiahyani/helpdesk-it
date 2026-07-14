'use client';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import DataTable, { ColumnDef } from '@/components/admin/tables/DataTable';

const DUMMY_ROLES = [
  { id: '1', name: 'Administrator', users: 3, permissions: 'All Access' },
  { id: '2', name: 'Teknisi Jaringan', users: 5, permissions: 'Tickets (Network), KB' },
  { id: '3', name: 'Client Biasa', users: 15420, permissions: 'Submit Tickets, View KB' },
];

const columns: ColumnDef<typeof DUMMY_ROLES[0]>[] = [
  { header: 'Nama Role', accessorKey: 'name' },
  { header: 'Hak Akses / Izin', accessorKey: 'permissions' },
  { header: 'Jumlah User', accessorKey: 'users' },
];

export default function RolesPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Manajemen Role Akses</h2>
            <p className="text-[var(--text-dim)] text-sm">Kelola tingkatan akses pengguna pada sistem.</p>
          </div>
          <button className="bg-[var(--gold)] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--gold-dim)] transition-colors">
            + Tambah Role
          </button>
        </div>
        <DataTable columns={columns} data={DUMMY_ROLES} searchPlaceholder="Cari role..." />
      </div>
    </AdminLayout>
  );
}
