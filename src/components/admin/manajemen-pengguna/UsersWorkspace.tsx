'use client';

import React, { useState, useMemo, useCallback } from 'react';
import UsersHeader from './UsersHeader';
import UsersStatistics from './UsersStatistics';
import UsersToolbar from './UsersToolbar';
import UsersTableSection from './UsersTableSection';

export interface UserItem {
  id: string;
  name: string;
  phone: string;
  role: 'MAHASISWA' | 'DOSEN' | 'STAF IT';
  status: 'Aktif' | 'Terblokir';
  createdDate: string;
}

// Dummy Data Pelapor
const INITIAL_USERS: UserItem[] = [
  { id: '1', name: 'Indra', phone: '62812345678853', role: 'MAHASISWA', status: 'Aktif', createdDate: '21 Juli 2026' },
  { id: '2', name: 'Budi', phone: '628992842', role: 'DOSEN', status: 'Aktif', createdDate: '20 Juli 2026' },
  { id: '3', name: 'Irfan', phone: '62859043867340', role: 'STAF IT', status: 'Aktif', createdDate: '20 Juli 2026' },
  { id: '4', name: 'Rey', phone: '628123456785234', role: 'MAHASISWA', status: 'Terblokir', createdDate: '19 Juli 2026' },
  { id: '5', name: 'Siti Aminah', phone: '6281298765432', role: 'MAHASISWA', status: 'Aktif', createdDate: '18 Juli 2026' },
  { id: '6', name: 'Dr. Agus', phone: '6281345678901', role: 'DOSEN', status: 'Aktif', createdDate: '17 Juli 2026' },
  { id: '7', name: 'Rian Pratama', phone: '6285712345678', role: 'STAF IT', status: 'Aktif', createdDate: '16 Juli 2026' },
  { id: '8', name: 'Dewi Lestari', phone: '6281809876543', role: 'MAHASISWA', status: 'Terblokir', createdDate: '15 Juli 2026' },
  { id: '9', name: 'Eko Wijaya', phone: '6281233445566', role: 'MAHASISWA', status: 'Aktif', createdDate: '14 Juli 2026' },
  { id: '10', name: 'Fajar Nugraha', phone: '6285677889900', role: 'STAF IT', status: 'Aktif', createdDate: '13 Juli 2026' },
  { id: '11', name: 'Gita Gutawa', phone: '6281900112233', role: 'MAHASISWA', status: 'Aktif', createdDate: '12 Juli 2026' },
  { id: '12', name: 'Hendra Setiawan', phone: '6281223344556', role: 'DOSEN', status: 'Terblokir', createdDate: '11 Juli 2026' },
];

export default function UserWorkspace() {
  const [users] = useState<UserItem[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 4;

  // Logic Pencarian & Filtering
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery);
      const matchesRole = selectedRole === 'ALL' || user.role === selectedRole;
      const matchesStatus = selectedStatus === 'ALL' || user.status === selectedStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, selectedRole, selectedStatus]);

  // Logic Pagination
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  // Handler Seleksi Checkbox Single Row
  const handleSelectUser = useCallback((id: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  }, []);

  // Handler Seleksi Checkbox Select All
  const handleSelectAll = useCallback(() => {
    const currentPageIds = paginatedUsers.map((u) => u.id);
    const isAllCurrentSelected = currentPageIds.every((id) => selectedUserIds.includes(id));

    if (isAllCurrentSelected) {
      setSelectedUserIds((prev) => prev.filter((id) => !currentPageIds.includes(id)));
    } else {
      setSelectedUserIds((prev) => Array.from(new Set([...prev, ...currentPageIds])));
    }
  }, [paginatedUsers, selectedUserIds]);

  // Action Per User
  const handleUserAction = useCallback((user: UserItem) => {
    alert(`Aksi untuk pengguna: ${user.name} (${user.phone})`);
  }, []);

  // Handler Toolbar
  const handleFilterToggle = useCallback(() => {
    alert('Filter dialog/popover dapat dihubungkan di sini.');
  }, []);

  const handleExport = useCallback(() => {
    alert('Mengekspor data pelapor...');
  }, []);

  const handleAddPelapor = useCallback(() => {
    alert('Buka form Tambah Pelapor');
  }, []);

  // Statistik Ringkasan Data
  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter((u) => u.status === 'Aktif').length,
      blocked: users.filter((u) => u.status === 'Terblokir').length,
    };
  }, [users]);

  return (
    <div className="flex flex-col items-start gap-6 w-full p-6 bg-[#F9FAFB] min-h-screen">
      <UsersHeader />
      <UsersStatistics
        totalUsers={stats.total}
        activeUsers={stats.active}
        blockedUsers={stats.blocked}
      />
      <UsersToolbar
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
        onFilterClick={handleFilterToggle}
        onExportClick={handleExport}
        onAddClick={handleAddPelapor}
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
        onUserAction={handleUserAction}
      />
    </div>
  );
}