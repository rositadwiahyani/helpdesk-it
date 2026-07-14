'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import DataTable, { ColumnDef } from '@/components/admin/tables/DataTable';
import StatCard from '@/components/admin/cards/StatCard';

// Mock Data
import { DUMMY_USERS, DUMMY_USER_STATS, User } from '@/lib/mock/users';

// Components
import RoleBadge from '@/components/admin/common/RoleBadge';
import StatusBadge from '@/components/admin/common/StatusBadge';
import ActionDropdown from '@/components/admin/common/ActionDropdown';
import UserFilter from '@/components/admin/users/UserFilter';
import AddUserModal from '@/components/admin/users/AddUserModal';
import EditUserModal from '@/components/admin/users/EditUserModal';

export default function UsersPage() {
  // State for Add Modal
  const [isAddOpen, setIsAddOpen] = useState(false);

  // State for Edit Modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
  };

  // Memoized Filtered Data
  const filteredUsers = useMemo(() => {
    return DUMMY_USERS.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  // Columns Configuration
  const columns: ColumnDef<User>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: (user) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--gold)] flex items-center justify-center text-white text-xs font-bold shrink-0">
            {user.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <Link href={`/admin/users/${user.id}`} className="font-bold text-[var(--ink)] hover:text-[var(--gold-soft)] hover:underline transition-colors block">
              {user.name}
            </Link>
            <div className="text-xs text-[var(--text-dim)]">{user.email}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (user) => <StatusBadge status={user.status} />
    },
    { header: 'Total Ticket', accessorKey: 'totalTickets' },
    { header: 'Joined Date', accessorKey: 'joinedDate' },
    { header: 'Last Updated', accessorKey: 'lastUpdated' }
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Users</h2>
            <p className="text-[var(--text-dim)] text-sm">Kelola seluruh akun pengguna yang memiliki akses ke sistem HelpIT.</p>
          </div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-[var(--ink)] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--text)] transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Tambah User
          </button>
        </div>

        {/* STATISTIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Users" value={DUMMY_USER_STATS.total} description="Keseluruhan akun" icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          } />
          <StatCard title="Admin" value={DUMMY_USER_STATS.admin} description="Hak akses penuh" icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          } />
          <StatCard title="User" value={DUMMY_USER_STATS.user} description="Pengguna aktif" icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          } />
          <StatCard title="New This Month" value={DUMMY_USER_STATS.newThisMonth} description="Pendaftar baru" trend="+15%" trendUp={true} icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
          } />
        </div>

        {/* TOOLBAR FILTER */}
        <UserFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onReset={handleResetFilters}
        />

        {/* DATA TABLE */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <DataTable
            columns={columns}
            data={filteredUsers}
            emptyMessage="Belum ada user yang sesuai kriteria filter."
            hideSearchBar={true} // Sembunyikan search bawaan tabel karena sudah ada di toolbar
          />
        </div>

      </div>

      {/* MODALS */}
      <AddUserModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      <EditUserModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} user={selectedUser} />

    </AdminLayout>
  );
}

