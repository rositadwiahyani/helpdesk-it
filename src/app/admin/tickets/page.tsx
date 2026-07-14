'use client';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import DataTable, { ColumnDef } from '@/components/admin/tables/DataTable';
import Link from 'next/link';

// Data dummy untuk Tickets
const DUMMY_TICKETS = [
  { id: 'TKT-2026-904', subject: 'Gangguan eduroam Gedung A', user: 'Budi Santoso', status: 'Baru', date: '14 Jul 2026' },
  { id: 'TKT-2026-903', subject: 'Lupa Password SSO Mahasiswa', user: 'Siti Aminah', status: 'Diproses', date: '13 Jul 2026' },
  { id: 'TKT-2026-902', subject: 'Akses SIAP gagal via VPN', user: 'Andi Wijaya', status: 'Tertunda', date: '12 Jul 2026' },
];

const columns: ColumnDef<typeof DUMMY_TICKETS[0]>[] = [
  { header: 'ID Tiket', accessorKey: 'id', className: 'w-32' },
  { header: 'Subjek', accessorKey: 'subject' },
  { header: 'Pelapor', accessorKey: 'user' },
  { header: 'Tanggal', accessorKey: 'date' },
  { 
    header: 'Status', 
    cell: (item) => {
      let color = 'bg-gray-100 text-gray-700';
      if(item.status === 'Baru') color = 'bg-blue-100 text-blue-700';
      if(item.status === 'Diproses') color = 'bg-amber-100 text-amber-700';
      if(item.status === 'Tertunda') color = 'bg-red-100 text-red-700';
      return <span className={`px-2 py-1 rounded-md text-xs font-bold ${color}`}>{item.status}</span>;
    }
  },
  {
    header: 'Aksi',
    cell: (item) => (
      <Link href={`/admin/tickets/${item.id}`} className="text-[var(--gold)] text-sm font-bold hover:underline">
        Lihat Detail
      </Link>
    )
  }
];

export default function TicketsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Daftar Tiket</h2>
            <p className="text-[var(--text-dim)] text-sm">Kelola dan tanggapi laporan masuk.</p>
          </div>
        </div>
        
        <DataTable 
          columns={columns} 
          data={DUMMY_TICKETS} 
          searchPlaceholder="Cari ID Tiket atau Subjek..." 
        />
      </div>
    </AdminLayout>
  );
}
