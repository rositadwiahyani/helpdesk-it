'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UsersHeader from './UsersHeader';
import UsersStatistics from './UsersStatistics';
import UsersToolbar from './UsersToolbar';
import UsersTableSection from './UsersTableSection';
import UsersFilterModal, { UsersFilterData } from './UsersFilterModal';
import { fetchClient } from '@/lib/apiClient';

export interface UserItem {
  id: string;
  phone: string;
  name: string;
  nimNip: string;
  fakultasUnit: string;
  status: 'Aktif' | 'Terblokir';
  createdDate: string;
  rawDate: string;
}

export default function UserWorkspace() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<UsersFilterData | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    nimNip: '',
    fakultasUnit: '',
    status: 'Aktif' as 'Aktif' | 'Terblokir'
  });

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await fetchClient('/admin/reporters');
      const mapped = (data || []).map((r: any) => ({
        id: r.id,
        phone: r.phone,
        name: r.name,
        nimNip: r.nim_nip,
        fakultasUnit: r.unit,
        status: r.status,
        createdDate: new Date(r.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        rawDate: r.created_at
      }));
      setUsers(mapped);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const uniqueFakultas = useMemo(() => {
    const set = new Set<string>();
    users.forEach(u => {
      if (u.fakultasUnit) set.add(u.fakultasUnit);
    });
    return Array.from(set).sort();
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.nimNip.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery);
      
      let matchesFakultas = true;
      
      if (filters) {
        if (filters.fakultas !== 'ALL' && user.fakultasUnit !== filters.fakultas) matchesFakultas = false;
      }
      
      return matchesSearch && matchesFakultas;
    });
  }, [users, searchQuery, filters]);

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const handleSelectUser = useCallback((id: string) => {
    setSelectedUserIds((prev) => prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]);
  }, []);

  const handleSelectAll = useCallback(() => {
    const currentPageIds = paginatedUsers.map((u) => u.id);
    const isAllCurrentSelected = currentPageIds.every((id) => selectedUserIds.includes(id));
    if (isAllCurrentSelected) {
      setSelectedUserIds((prev) => prev.filter((id) => !currentPageIds.includes(id)));
    } else {
      setSelectedUserIds((prev) => Array.from(new Set([...prev, ...currentPageIds])));
    }
  }, [paginatedUsers, selectedUserIds]);

  const handleAddClick = useCallback(() => {
    setEditingUser(null);
    setFormData({ phone: '', name: '', nimNip: '', fakultasUnit: '', status: 'Aktif' });
    setIsModalOpen(true);
  }, []);

  const router = useRouter();

  const handleEditClick = useCallback((user: UserItem) => {
    router.push(`/dashboard/administrasi/users/${user.id}?edit=true`);
  }, [router]);

  const handleDeleteClick = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus pelapor ini? Data riwayat tiketnya mungkin akan terdampak.')) {
      try {
        await fetchClient(`/admin/reporters/${id}`, { method: 'DELETE' });
        fetchUsers();
      } catch (error: any) {
        alert("Gagal menghapus data: " + error.message);
      }
    }
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await fetchClient(`/admin/reporters/${editingUser.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            phone: formData.phone,
            name: formData.name,
            nim_nip: formData.nimNip,
            unit: formData.fakultasUnit,
            status: formData.status
          })
        });
      } else {
        await fetchClient('/admin/reporters', {
          method: 'POST',
          body: JSON.stringify({
            phone: formData.phone,
            name: formData.name,
            nim_nip: formData.nimNip,
            unit: formData.fakultasUnit,
            reporter_type: 'Umum',
            status: formData.status
          })
        });
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error: any) {
      alert("Gagal menyimpan data: " + error.message);
    }
  };

  const stats = useMemo(() => {
    let today = 0;
    const todayStr = new Date().toISOString().split('T')[0];
    users.forEach(u => {
      if (u.rawDate.startsWith(todayStr)) today++;
    });
    return {
      total: users.length,
      today
    };
  }, [users]);

  const handleBulkDelete = async () => {
    if (selectedUserIds.length === 0) return;
    if (!confirm(`Hapus ${selectedUserIds.length} pelapor?`)) return;
    setIsLoading(true);
    try {
      for (const id of selectedUserIds) {
        await fetchClient(`/admin/reporters/${id}`, { method: 'DELETE' });
      }
      setSelectedUserIds([]);
      await fetchUsers();
    } catch (e) {
      console.error(e);
      alert('Gagal menghapus pelapor masal');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-6 w-full relative">
      <UsersHeader />
      <UsersStatistics totalUsers={stats.total} todayUsers={stats.today} />
      <UsersToolbar
        searchQuery={searchQuery}
        onSearchChange={(query) => { setSearchQuery(query); setCurrentPage(1); }}
        onFilterClick={() => setIsFilterModalOpen(true)}
        onResetFilterClick={() => {
          setFilters(null);
          setSearchQuery('');
          setCurrentPage(1);
        }}
        onExportClick={() => alert('Exporting...')}
        onAddClick={handleAddClick}
        selectedCount={selectedUserIds.length}
        onBulkDeleteClick={handleBulkDelete}
      />
      <UsersTableSection
        users={paginatedUsers}
        totalUsers={totalItems}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        selectedUserIds={selectedUserIds}
        isLoading={isLoading}
        onSelectUser={handleSelectUser}
        onSelectAll={handleSelectAll}
        onPageChange={setCurrentPage}
        onEditUser={handleEditClick}
        onDeleteUser={handleDeleteClick}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#001E40] font-iBMPlexSans">
                {editingUser ? 'Edit Data Pelapor' : 'Tambah Pelapor Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-black">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <form onSubmit={handleSaveForm} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700 font-iBMPlexSans">Nomor WA / Telepon</label>
                <input required type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#0059BB]" placeholder="6281234..." disabled={!!editingUser} />
                {editingUser && <span className="text-xs text-gray-500">Nomor WA tidak bisa diubah karena terikat riwayat percakapan.</span>}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700 font-iBMPlexSans">Nama Lengkap</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#0059BB]" placeholder="Masukkan nama..." />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700 font-iBMPlexSans">NIM / NIP</label>
                <input required type="text" value={formData.nimNip} onChange={e => setFormData({...formData, nimNip: e.target.value})} className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#0059BB]" placeholder="Masukkan NIM / NIP..." />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700 font-iBMPlexSans">Fakultas / Unit Kerja</label>
                <input required type="text" value={formData.fakultasUnit} onChange={e => setFormData({...formData, fakultasUnit: e.target.value})} className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#0059BB]" placeholder="Cth: Fakultas Teknik / UPT TI" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700 font-iBMPlexSans">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as 'Aktif'|'Terblokir'})} className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#0059BB]">
                  <option value="Aktif">Aktif</option>
                  <option value="Terblokir">Terblokir</option>
                </select>
              </div>
              <div className="mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-iBMPlexSans text-sm">Batal</button>
                <button type="submit" className="px-4 py-2 bg-[#0059BB] text-white rounded hover:bg-[#004795] font-iBMPlexSans text-sm">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isFilterModalOpen && (
        <UsersFilterModal
          uniqueFakultas={uniqueFakultas}
          onClose={() => setIsFilterModalOpen(false)}
          onApply={(newFilters) => setFilters(newFilters)}
        />
      )}
    </div>
  );
}