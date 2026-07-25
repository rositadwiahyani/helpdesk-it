import React, { useState } from 'react';

export interface UserItem {
  id: string;
  name: string;
  nimNip: string;
  fakultasUnit: string;
  status: 'Aktif' | 'Terblokir';
  createdDate: string;
}

interface UsersTableSectionProps {
  users?: UserItem[];
  totalUsers?: number;
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
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
  itemsPerPage = 4,
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
    <div className="flex flex-col items-start rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] w-full overflow-hidden relative">
      <div className="flex flex-col items-start w-full overflow-x-auto">
        <div className="min-w-[900px] w-full flex flex-col">
          {/* HEADER TABEL */}
          <div className="flex items-center border-b border-b-[#C3C6D1] bg-[#EEEEF0] w-full text-left">
            <div className="w-16 py-4 flex justify-center cursor-pointer" onClick={onSelectAll}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4.5" y="4.5" width="15" height="15" rx="1.5" fill={isAllSelected ? '#0059BB' : 'white'} stroke={isAllSelected ? '#0059BB' : '#C3C6D1'}/>
                {isAllSelected && <path d="M8 12L10.5 14.5L16 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>}
              </svg>
            </div>
            <div className="w-[200px] px-4 py-4">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-bold leading-4 tracking-[0.05em]">NAMA</p>
            </div>
            <div className="w-[180px] px-4 py-4">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-bold leading-4 tracking-[0.05em]">NIM / NIP</p>
            </div>
            <div className="w-[200px] px-4 py-4">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-bold leading-4 tracking-[0.05em]">FAKULTAS / UNIT KERJA</p>
            </div>
            <div className="w-[120px] px-4 py-4">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-bold leading-4 tracking-[0.05em]">STATUS</p>
            </div>
            <div className="w-[150px] px-4 py-4">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-bold leading-4 tracking-[0.05em]">CREATED</p>
            </div>
            <div className="flex-1 min-w-[80px] px-4 py-4 text-right pr-8">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-bold leading-4 tracking-[0.05em]">AKSI</p>
            </div>
          </div>

          {/* ISI BARIS TABEL */}
          <div className="flex flex-col items-start w-full bg-white relative">
            {isLoading ? (
              <div className="flex justify-center items-center p-8 w-full">
                <p className="text-[#43474F] font-iBMPlexSans text-sm">Memuat data pelapor...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="flex justify-center items-center p-8 w-full">
                <p className="text-[#43474F] font-iBMPlexSans text-sm">Tidak ada data pelapor yang ditemukan.</p>
              </div>
            ) : (
              users.map((user) => {
                const isSelected = selectedUserIds.includes(user.id);
                const isBlocked = user.status === 'Terblokir';

                return (
                  <div key={user.id} className="flex justify-start items-center border-b border-b-[#C3C6D1] w-full hover:bg-gray-50/50 transition-colors text-left relative">
                    <div className="w-16 py-4 flex justify-center cursor-pointer" onClick={() => onSelectUser?.(user.id)}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4.5" y="4.5" width="15" height="15" rx="1.5" fill={isSelected ? '#0059BB' : 'white'} stroke={isSelected ? '#0059BB' : '#C3C6D1'}/>
                        {isSelected && <path d="M8 12L10.5 14.5L16 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>}
                      </svg>
                    </div>
                    
                    <div className="w-[200px] px-4 py-4 overflow-hidden text-ellipsis">
                      <p className="text-[#1A1C1E] font-iBMPlexSans text-sm font-bold leading-5 w-full truncate">{user.name}</p>
                    </div>
                    
                    <div className="w-[180px] px-4 py-4 overflow-hidden text-ellipsis">
                       <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-full truncate">{user.nimNip}</p>
                    </div>

                    <div className="w-[200px] px-4 py-4 overflow-hidden text-ellipsis">
                      <p className="text-[#43474F] font-iBMPlexSans text-[12px] font-medium leading-5 w-fit truncate bg-gray-100 px-2 py-0.5 rounded">{user.fakultasUnit}</p>
                    </div>

                    <div className="w-[120px] px-4 py-4 flex items-center gap-2">
                      <div className={`shrink-0 rounded-full ${isBlocked ? 'bg-[#BA1A1A]' : 'bg-[#10B981]'} w-2 h-2`}></div>
                      <p className="text-[#1A1C1E] font-iBMPlexSans text-sm leading-5">{user.status}</p>
                    </div>

                    <div className="w-[150px] px-4 py-4">
                      <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5">{user.createdDate}</p>
                    </div>
                    
                    <div className="flex-1 min-w-[80px] px-4 py-4 flex justify-end pr-8 relative">
                      <button
                        onClick={() => setOpenActionId(openActionId === user.id ? null : user.id)}
                        className="flex p-2 justify-center items-center rounded cursor-pointer hover:bg-gray-200/60 transition-colors"
                      >
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.66667 13.3333H2.85417L11 5.1875L9.8125 4L1.66667 12.1458V13.3333ZM0 15V11.4583L11 0.479167C11.1667 0.326389 11.3507 0.208333 11.5521 0.125C11.7535 0.0416667 11.9653 0 12.1875 0C12.4097 0 12.625 0.0416667 12.8333 0.125C13.0417 0.208333 13.2222 0.333333 13.375 0.5L14.5208 1.66667C14.6875 1.81944 14.809 2 14.8854 2.20833C14.9618 2.41667 15 2.625 15 2.83333C15 3.05556 14.9618 3.26736 14.8854 3.46875C14.809 3.67014 14.6875 3.85417 14.5208 4.02083L3.54167 15H0ZM13.3333 2.83333L12.1667 1.66667L13.3333 2.83333ZM10.3958 4.60417L9.8125 4L11 5.1875L10.3958 4.60417Z" fill="#1A1C1E"/>
                        </svg>
                      </button>

                      {openActionId === user.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setOpenActionId(null)}></div>
                          <div className="absolute right-8 top-10 w-32 bg-white border border-[#C3C6D1] rounded shadow-lg z-20 flex flex-col py-1">
                            <button
                              onClick={() => { onEditUser?.(user); setOpenActionId(null); }}
                              className="text-left px-4 py-2 hover:bg-gray-100 text-sm font-iBMPlexSans text-[#1A1C1E]"
                            >
                              Edit Data
                            </button>
                            <button
                              onClick={() => { onDeleteUser?.(user.id); setOpenActionId(null); }}
                              className="text-left px-4 py-2 hover:bg-gray-100 text-sm font-iBMPlexSans text-red-600"
                            >
                              Hapus
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* FOOTER PAGINATION */}
      <div className="flex py-4 px-6 justify-between items-center border-t border-t-[#C3C6D1] bg-[#F3F3F6] w-full">
        <div className="flex flex-col items-start w-fit">
          <p className="text-[#43474F] font-iBMPlexSans text-[13px] leading-[18px] w-fit">
            Menampilkan {startDisplay}-{endDisplay} dari {totalUsers.toLocaleString('en-US')} pelapor
          </p>
        </div>
        <div className="flex items-center gap-1 w-fit">
          <button
            disabled={currentPage <= 1}
            onClick={() => onPageChange?.(currentPage - 1)}
            className={`flex justify-center items-center rounded-sm w-8 h-8 ${currentPage <= 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-200'}`}
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12L0 6L6 0L7.4 1.4L2.8 6L7.4 10.6L6 12Z" fill="#43474F"/></svg>
          </button>
          {renderPaginationButtons()}
          <button
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange?.(currentPage + 1)}
            className={`flex justify-center items-center rounded-sm w-8 h-8 ${currentPage >= totalPages ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-200'}`}
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.6 6L0 1.4L1.4 0L7.4 6L1.4 12L0 10.6L4.6 6Z" fill="#43474F"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}