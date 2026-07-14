'use client';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import DataTable, { ColumnDef } from '@/components/admin/tables/DataTable';

// Data dummy untuk Users
const DUMMY_USERS = [
  { id: '1', name: 'Budi Santoso', email: 'budi@undip.ac.id', role: 'Mahasiswa', status: 'Aktif' },
  { id: '2', name: 'Siti Aminah', email: 'siti@lecturer.undip.ac.id', role: 'Dosen', status: 'Aktif' },
  { id: '3', name: 'Andi Wijaya', email: 'andi.w@staff.undip.ac.id', role: 'Pegawai', status: 'Nonaktif' },
];

const columns: ColumnDef<typeof DUMMY_USERS[0]>[] = [
  { header: 'Nama Lengkap', accessorKey: 'name' },
  { header: 'Email', accessorKey: 'email' },
  { header: 'Peran', accessorKey: 'role' },
  { 
    header: 'Status', 
    cell: (item) => (
      <span className={`px-2 py-1 rounded-md text-xs font-bold ${item.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
        {item.status}
      </span>
    )
  }
];

export default function UsersPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Manajemen Pengguna</h2>
            <p className="text-[var(--text-dim)] text-sm">Kelola akun mahasiswa, dosen, dan pegawai.</p>
          </div>
          <button className="bg-[var(--gold)] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--gold-dim)] transition-colors">
            + Tambah User
          </button>
        </div>
        
        <DataTable 
          columns={columns} 
          data={DUMMY_USERS} 
          searchPlaceholder="Cari berdasarkan nama atau email..." 
        />
      </div>
    </AdminLayout>
  );
}
