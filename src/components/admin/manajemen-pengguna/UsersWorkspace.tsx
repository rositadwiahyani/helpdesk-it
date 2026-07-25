'use client';

import React, { useState, useMemo, useCallback } from 'react';
import UsersHeader from './UsersHeader';
import UsersStatistics from './UsersStatistics';
import UsersToolbar from './UsersToolbar';
import UsersTableSection from './UsersTableSection';

export interface UserItem {
  id: string;
  name: string;
  nimNip: string;
  fakultasUnit: string;
  status: 'Aktif' | 'Terblokir';
  createdDate: string;
}

const INITIAL_USERS: UserItem[] = [
  { id: '1', name: 'Indra', nimNip: '2401992019', fakultasUnit: 'Fakultas Teknik', status: 'Aktif', createdDate: '21 Juli 2026' },
  { id: '2', name: 'Budi', nimNip: '1982039201', fakultasUnit: 'Fakultas Hukum', status: 'Aktif', createdDate: '20 Juli 2026' },
  { id: '3', name: 'Irfan', nimNip: '1970102001', fakultasUnit: 'UPT TI', status: 'Aktif', createdDate: '20 Juli 2026' },
  { id: '4', name: 'Rey', nimNip: '2401993022', fakultasUnit: 'Fakultas Kedokteran', status: 'Terblokir', createdDate: '19 Juli 2026' },
  { id: '5', name: 'Siti Aminah', nimNip: '2401998822', fakultasUnit: 'Fakultas Ilmu Komputer', status: 'Aktif', createdDate: '18 Juli 2026' },
];

export default function UserWorkspace() {
  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    nimNip: '',
    fakultasUnit: '',
    status: 'Aktif' as 'Aktif' | 'Terblokir'
  });

  const itemsPerPage = 4;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.nimNip.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'ALL' || user.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [users, searchQuery, selectedStatus]);

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
    setFormData({ name: '', nimNip: '', fakultasUnit: '', status: 'Aktif' });
    setIsModalOpen(true);
  }, []);

  const handleEditClick = useCallback((user: UserItem) => {
    setEditingUser(user);
    setFormData({ name: user.name, nimNip: user.nimNip, fakultasUnit: user.fakultasUnit, status: user.status });
    setIsModalOpen(true);
  }, []);

  const handleDeleteClick = useCallback((id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus pelapor ini?')) {
      setUsers((prev) => prev.filter(u => u.id !== id));
    }
  }, []);

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map((u) => u.id === editingUser.id ? { ...u, ...formData } : u));
    } else {
      const newUser: UserItem = {
        id: Date.now().toString(),
        name: formData.name,
        nimNip: formData.nimNip,
        fakultasUnit: formData.fakultasUnit,
        status: formData.status,
        createdDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      };
      setUsers([newUser, ...users]);
    }
    setIsModalOpen(false);
  };

  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter((u) => u.status === 'Aktif').length,
      blocked: users.filter((u) => u.status === 'Terblokir').length,
    };
  }, [users]);

  return (
    <div className="flex flex-col items-start gap-6 w-full p-6 bg-[#F9FAFB] min-h-screen relative">
      <UsersHeader />
      <UsersStatistics totalUsers={stats.total} activeUsers={stats.active} blockedUsers={stats.blocked} />
      <UsersToolbar
        searchQuery={searchQuery}
        onSearchChange={(query) => { setSearchQuery(query); setCurrentPage(1); }}
        onFilterClick={() => alert('Filter Popover Action')}
        onExportClick={() => alert('Exporting...')}
        onAddClick={handleAddClick}
      />
      <UsersTableSection
        users={paginatedUsers}
        totalUsers={totalItems}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        selectedUserIds={selectedUserIds}
        isLoading={isLoading}
        onSelectUser={handleSelectUser}
        onSelectAll={handleSelectAll}
        onPageChange={setCurrentPage}
        onEditUser={handleEditClick}
        onDeleteUser={handleDeleteClick}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
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
    </div>
  );
}