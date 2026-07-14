'use client';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import DataTable, { ColumnDef } from '@/components/admin/tables/DataTable';

const DUMMY_DEPTS = [
  { id: '1', name: 'Infrastruktur Jaringan', email: 'network@undip.ac.id', manager: 'Bpk. Ahmad' },
  { id: '2', name: 'Sistem Informasi', email: 'sisfo@undip.ac.id', manager: 'Ibu Dina' },
  { id: '3', name: 'Layanan Akun', email: 'account@undip.ac.id', manager: 'Bpk. Surya' },
];

const columns: ColumnDef<typeof DUMMY_DEPTS[0]>[] = [
  { header: 'Nama Departemen', accessorKey: 'name' },
  { header: 'Email Utama', accessorKey: 'email' },
  { header: 'Manajer / Penanggung Jawab', accessorKey: 'manager' },
];

export default function DepartmentsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Manajemen Departemen</h2>
            <p className="text-[var(--text-dim)] text-sm">Kelola divisi atau subbag yang menangani aduan.</p>
          </div>
          <button className="bg-[var(--gold)] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--gold-dim)] transition-colors">
            + Tambah Departemen
          </button>
        </div>
        
        <DataTable 
          columns={columns} 
          data={DUMMY_DEPTS} 
          searchPlaceholder="Cari departemen..." 
        />
      </div>
    </AdminLayout>
  );
}
