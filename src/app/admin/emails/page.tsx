'use client';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import DataTable, { ColumnDef } from '@/components/admin/tables/DataTable';

const DUMMY_EMAILS = [
  { id: '1', date: '14 Jul 2026, 10:15', type: 'Keluar', to: 'budi@undip.ac.id', subject: 'Pemberitahuan Tiket Baru TKT-2026-904', status: 'Terkirim' },
  { id: '2', date: '14 Jul 2026, 09:30', type: 'Masuk', to: 'helpdesk@undip.ac.id', subject: 'Re: Akses SIAP gagal via VPN', status: 'Diproses' },
  { id: '3', date: '13 Jul 2026, 15:45', type: 'Keluar', to: 'siti@lecturer.undip.ac.id', subject: 'Tiket Selesai: TKT-2026-903', status: 'Gagal' },
];

const columns: ColumnDef<typeof DUMMY_EMAILS[0]>[] = [
  { header: 'Tanggal', accessorKey: 'date' },
  { 
    header: 'Tipe', 
    cell: (item) => (
      <span className={`px-2 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${item.type === 'Masuk' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
        {item.type}
      </span>
    ) 
  },
  { header: 'Tujuan / Dari', accessorKey: 'to' },
  { header: 'Subjek', accessorKey: 'subject' },
  { 
    header: 'Status', 
    cell: (item) => {
      let color = 'bg-gray-100 text-gray-700';
      if(item.status === 'Terkirim') color = 'bg-emerald-100 text-emerald-700';
      if(item.status === 'Gagal') color = 'bg-red-100 text-red-700';
      if(item.status === 'Diproses') color = 'bg-amber-100 text-amber-700';
      return <span className={`px-2 py-1 rounded-md text-xs font-bold ${color}`}>{item.status}</span>;
    }
  }
];

export default function EmailsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Log Email</h2>
            <p className="text-[var(--text-dim)] text-sm">Pantau riwayat email masuk dan keluar dari sistem.</p>
          </div>
        </div>
        <DataTable columns={columns} data={DUMMY_EMAILS} searchPlaceholder="Cari subjek atau alamat email..." />
      </div>
    </AdminLayout>
  );
}
