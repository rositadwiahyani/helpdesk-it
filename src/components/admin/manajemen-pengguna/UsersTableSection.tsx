import React, { useState } from 'react';
import Link from 'next/link';

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

interface UsersTableSectionProps {
  users?: UserItem[];
  totalUsers?: number;
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  setItemsPerPage?: (val: number) => void;
  selectedUserIds?: string[];
  isLoading?: boolean;
  onSelectUser?: (id: string) => void;
  onSelectAll?: () => void;
  onPageChange?: (page: number) => void;
  onEditUser?: (user: UserItem) => void;
  onDeleteUser?: (id: string) => void;
}

export default function UsersTableSection({
  users = [],
  totalUsers = 0,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 10,
  setItemsPerPage,
  selectedUserIds = [],
  isLoading = false,
  onSelectUser,
  onSelectAll,
  onPageChange,
  onEditUser,
  onDeleteUser,
}: UsersTableSectionProps) {
  const isAllSelected = users.length > 0 && users.every((u) => selectedUserIds.includes(u.id));
  const startDisplay = totalUsers === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endDisplay = Math.min(currentPage * itemsPerPage, totalUsers);

  const [openActionId, setOpenActionId] = useState<string | null>(null);

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 3;

    for (let i = 1; i <= Math.min(maxVisiblePages, totalPages); i++) {
      const isActive = i === currentPage;
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange?.(i)}
          className={`cursor-pointer flex justify-center items-center rounded-sm w-8 h-8 ${isActive ? 'bg-[#0059BB]' : 'hover:bg-gray-200'}`}
        >
          <p className={`${isActive ? 'text-[#FFF]' : 'text-[#1A1C1E]'} font-iBMPlexSans text-xs font-semibold leading-4 tracking-[0.05em]`}>{i}</p>
        </button>
      );
    }

    if (totalPages > maxVisiblePages + 1) {
      buttons.push(
        <div key="dots" className="flex px-1 flex-col items-center justify-center h-8">
          <p className="text-[#1A1C1E] font-iBMPlexSans text-base leading-6">...</p>
        </div>
      );
    }
    if (totalPages > maxVisiblePages) {
      const isLastActive = currentPage === totalPages;
      buttons.push(
        <button
          key={totalPages}
          onClick={() => onPageChange?.(totalPages)}
          className={`cursor-pointer flex justify-center items-center rounded-sm w-8 h-8 ${isLastActive ? 'bg-[#0059BB]' : 'hover:bg-gray-200'}`}
        >
          <p className={`${isLastActive ? 'text-[#FFF]' : 'text-[#1A1C1E]'} font-iBMPlexSans text-xs font-semibold leading-4 tracking-[0.05em]`}>{totalPages}</p>
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="flex flex-col rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-sm w-full overflow-hidden">
      <div className="w-full overflow-x-auto min-h-[400px]">
        <table className="w-full text-left table-auto">
          <thead className="bg-[#F3F3F6] border-b border-[#C3C6D1]">
            <tr>
              <th className="px-4 py-4 w-12 text-center">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 w-4 h-4 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                  checked={isAllSelected}
                  onChange={onSelectAll}
                />
              </th>
              <th className="px-4 py-4 select-none">
                <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">NAMA</span>
              </th>
              <th className="px-4 py-4 select-none">
                <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">NIM / NIP</span>
              </th>
              <th className="px-4 py-4 select-none">
                <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">FAKULTAS / UNIT KERJA</span>
              </th>
              <th className="px-4 py-4 select-none">
                <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">CREATED</span>
              </th>
              <th className="px-4 py-4 select-none text-center w-24">
                <span className="text-[#43474F] font-iBMPlexSans text-xs font-semibold tracking-wider">AKSI</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#43474F] font-iBMPlexSans text-sm">Memuat data pelapor...</p>
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center">
                  <p className="text-[#43474F] font-iBMPlexSans text-sm">Tidak ada data pelapor yang ditemukan.</p>
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const isSelected = selectedUserIds.includes(user.id);
                return (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4 text-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 w-4 h-4 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                        checked={isSelected}
                        onChange={() => onSelectUser?.(user.id)}
                      />
                    </td>
                    <td className="px-4 py-4 max-w-xs">
                      <Link href={`/dashboard/administrasi/users/${user.id}`} className="block">
                        <p className="text-[#1A1C1E] font-iBMPlexSans text-sm font-medium truncate mb-0.5 hover:text-[#1E3A8A]">
                          {user.name}
                        </p>
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-[#43474F] font-iBMPlexSans text-sm truncate max-w-[120px]">
                        {user.nimNip}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-[#43474F] font-iBMPlexSans text-[12px] font-medium truncate bg-gray-100 px-2 py-0.5 rounded block w-fit">
                        {user.fakultasUnit}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-[#43474F] font-iBMPlexSans text-sm">
                        {user.createdDate}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button 
                        onClick={() => onEditUser?.(user)}
                        className="p-1.5 text-[#1E3A8A] hover:bg-slate-100 rounded transition-colors inline-flex" 
                        title="Edit Data"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row py-4 px-6 justify-between items-center border-t border-t-[#C3C6D1] bg-[#FFF] w-full mt-auto gap-4">
        <div className="flex items-center gap-2">
            {setItemsPerPage && (
              <select 
                  value={itemsPerPage} 
                  onChange={(e) => { setItemsPerPage(Number(e.target.value)); onPageChange?.(1); }}
                  className="text-[13px] border border-[#C3C6D1] rounded px-2 py-1 outline-none focus:border-[#1E3A8A] text-[#1A1C1E]"
              >
                  <option value={8}>8 / page</option>
                  <option value={10}>10 / page</option>
                  <option value={15}>15 / page</option>
                  <option value={25}>25 / page</option>
                  <option value={50}>50 / page</option>
              </select>
            )}
            <p className="text-[#1A1C1E] font-iBMPlexSans text-[13px]">
                Showing {startDisplay} - {endDisplay} of {totalUsers.toLocaleString('en-US')} pelapor
            </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onPageChange?.(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className={`flex justify-center items-center rounded border border-[#C3C6D1] w-8 h-8 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}>
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10L0 5L5 0L6.16667 1.16667L2.33333 5L6.16667 8.83333L5 10Z" fill="black" /></svg>
          </button>
          
          <button onClick={() => onPageChange?.(1)} className={`cursor-pointer rounded w-8 h-8 flex items-center justify-center font-semibold text-xs ${currentPage === 1 ? 'bg-[#1E3A8A] text-white' : 'hover:bg-gray-100 text-black'}`}>1</button>
          
          {totalPages > 1 && (
              <button onClick={() => onPageChange?.(2)} className={`cursor-pointer rounded w-8 h-8 flex items-center justify-center font-semibold text-xs ${currentPage === 2 ? 'bg-[#1E3A8A] text-white' : 'hover:bg-gray-100 text-black'}`}>2</button>
          )}

          {totalPages > 2 && (
              <button onClick={() => onPageChange?.(3)} className={`cursor-pointer rounded w-8 h-8 flex items-center justify-center font-semibold text-xs ${currentPage === 3 ? 'bg-[#1E3A8A] text-white' : 'hover:bg-gray-100 text-black'}`}>3</button>
          )}
          
          {totalPages > 4 && <span className="px-1 text-base">...</span>}
          
          {totalPages > 3 && (
            <button onClick={() => onPageChange?.(totalPages)} className={`cursor-pointer rounded w-8 h-8 flex items-center justify-center font-semibold text-xs ${currentPage === totalPages ? 'bg-[#1E3A8A] text-white' : 'hover:bg-gray-100 text-black'}`}>{totalPages}</button>
          )}
          
          <button onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages || totalPages === 0} className={`flex justify-center items-center rounded border border-[#C3C6D1] w-8 h-8 ${currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}>
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.83333 5L0 1.16667L1.16667 0L6.16667 5L1.16667 10L0 8.83333L3.83333 5Z" fill="black" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}