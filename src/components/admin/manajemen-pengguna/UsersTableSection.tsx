import React from 'react';
import { UserItem } from './UsersWorkspace';

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
  onUserAction?: (user: UserItem) => void;
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
  onUserAction,
}: UsersTableSectionProps) {
  const isAllSelected =
    users.length > 0 && users.every((u) => selectedUserIds.includes(u.id));

  const startDisplay = totalUsers === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endDisplay = Math.min(currentPage * itemsPerPage, totalUsers);

  // Helper generasi tombol halaman pagination
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 3;

    for (let i = 1; i <= Math.min(maxVisiblePages, totalPages); i++) {
      const isActive = i === currentPage;
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange?.(i)}
          className={`cursor-pointer text-nowrap flex pt-2 pr-0 pb-[9px] pl-0 justify-center items-center rounded-sm w-8 h-8 ${
            isActive ? 'bg-[#0059BB]' : ''
          }`}
        >
          <p
            className={`${
              isActive ? 'text-[#FFF]' : 'text-[#1A1C1E]'
            } font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]`}
          >
            {i}
          </p>
        </button>
      );
    }

    if (totalPages > maxVisiblePages + 1) {
      buttons.push(
        <div key="dots" className="flex py-0 px-1 flex-col items-start w-fit">
          <p className="text-[#1A1C1E] font-iBMPlexSans text-base leading-6 w-fit">
            ...
          </p>
        </div>
      );
    }

    if (totalPages > maxVisiblePages) {
      const isLastActive = currentPage === totalPages;
      buttons.push(
        <button
          key={totalPages}
          onClick={() => onPageChange?.(totalPages)}
          className={`cursor-pointer text-nowrap flex pt-2 pr-0 pb-[9px] pl-0 justify-center items-center rounded-sm w-8 h-8 ${
            isLastActive ? 'bg-[#0059BB]' : ''
          }`}
        >
          <p
            className={`${
              isLastActive ? 'text-[#FFF]' : 'text-[#1A1C1E]'
            } font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]`}
          >
            {totalPages}
          </p>
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex flex-col items-start rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[01px2px0rgba(0,0,0,0.05)] w-full overflow-hidden">
      <div className="flex flex-col items-start -space-y-px w-full">
        {/* HEADER TABEL */}
        <div className="flex flex-col items-start border-b border-b-[#C3C6D1] bg-[#EEEEF0] w-full">
          <div className="flex justify-center items-start w-full">
            <svg
              width="64"
              height="50"
              viewBox="0 0 64 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex pt-[17px] pr-6 pb-[17px] pl-6 flex-col items-center w-16 cursor-pointer"
              onClick={onSelectAll}
            >
              <rect
                x="24.5"
                y="17.34"
                width="15"
                height="15"
                rx="1.5"
                fill={isAllSelected ? '#0059BB' : 'white'}
                stroke={isAllSelected ? '#0059BB' : '#C3C6D1'}
              />
              {isAllSelected && (
                <path
                  d="M28 24.5L30.5 27L36 21.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
            <div className="flex pt-4 pr-6 pb-[17px] pl-6 flex-col items-start w-[217px]">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-bold leading-4 w-fit tracking-[0.05em]">
                NAME
              </p>
            </div>
            <div className="flex pt-4 pr-6 pb-[17px] pl-6 flex-col items-start w-[184px]">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-bold leading-4 w-fit tracking-[0.05em]">
                ROLE
              </p>
            </div>
            <div className="flex pt-4 pr-6 pb-[17px] pl-6 flex-col items-start w-[167px]">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-bold leading-4 w-fit tracking-[0.05em]">
                STATUS
              </p>
            </div>
            <div className="flex pt-4 pr-6 pb-[17px] pl-6 flex-col items-start w-[177px]">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-bold leading-4 w-fit tracking-[0.05em]">
                CREATED
              </p>
            </div>
            <div className="flex pt-4 pr-6 pb-[17px] pl-6 flex-col items-end w-[117px]">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-bold leading-4 w-fit tracking-[0.05em]">
                AKSI
              </p>
            </div>
          </div>
        </div>

        {/* ISI BARIS TABEL */}
        <div className="flex flex-col items-start -space-y-px w-full">
          {isLoading ? (
            <div className="flex justify-center items-center p-8 w-full">
              <p className="text-[#43474F] font-iBMPlexSans text-sm">
                Memuat data pelapor...
              </p>
            </div>
          ) : users.length === 0 ? (
            <div className="flex justify-center items-center p-8 w-full">
              <p className="text-[#43474F] font-iBMPlexSans text-sm">
                Tidak ada data pelapor yang ditemukan.
              </p>
            </div>
          ) : (
            users.map((user) => {
              const isSelected = selectedUserIds.includes(user.id);
              const isBlocked = user.status === 'Terblokir';

              return (
                <div
                  key={user.id}
                  className="flex justify-center items-center border-b border-b-[#C3C6D1] w-full hover:bg-gray-50/50 transition-colors"
                >
                  <svg
                    width="64"
                    height="82"
                    viewBox="0 0 64 82"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex pt-[34px] pr-6 pb-8 pl-6 flex-col items-center w-16 cursor-pointer"
                    onClick={() => onSelectUser?.(user.id)}
                  >
                    <rect
                      x="24.5"
                      y="34.89"
                      width="15"
                      height="15"
                      rx="1.5"
                      fill={isSelected ? '#0059BB' : 'white'}
                      stroke={isSelected ? '#0059BB' : '#C3C6D1'}
                    />
                    {isSelected && (
                      <path
                        d="M28 42L30.5 44.5L36 39"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </svg>
                  <div className="flex pl-6 flex-col items-start w-[193px]">
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#1A1C1E] font-iBMPlexSans text-sm font-bold leading-5 w-full">
                        {user.name}
                      </p>
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#43474F] font-iBMPlexSans text-xs leading-5 w-full">
                        {user.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex pt-8 pr-6 pb-[31px] pl-14 flex-col items-start w-52">
                    <p className="text-[#43474F] font-iBMPlexSans text-[11px] font-bold leading-5 w-fit">
                      {user.role}
                    </p>
                  </div>
                  <div className="flex pl-6 items-center gap-2 w-[143px]">
                    <div
                      className={`shrink-0 rounded-xl ${
                        isBlocked ? 'bg-[#BA1A1A]' : 'bg-[#10B981]'
                      } w-2 h-2`}
                    ></div>
                    <div className="flex flex-col items-start w-fit">
                      <p className="text-[#1A1C1E] font-iBMPlexSans text-sm leading-5 w-fit">
                        {user.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex pt-[31px] pr-6 pb-[31px] pl-12 flex-col items-start w-[201px]">
                    <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                      {user.createdDate}
                    </p>
                  </div>
                  <div className="flex py-[21px] px-6 flex-col items-end w-[117px]">
                    <button
                      onClick={() => onUserAction?.(user)}
                      className="flex pt-2 pr-2 pb-[13px] pl-2 justify-center items-center rounded w-fit cursor-pointer hover:bg-gray-200/60 transition-colors"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex justify-center items-start w-fit "
                      >
                        <path
                          d="M1.66667 13.3333H2.85417L11 5.1875L9.8125 4L1.66667 12.1458V13.3333ZM0 15V11.4583L11 0.479167C11.1667 0.326389 11.3507 0.208333 11.5521 0.125C11.7535 0.0416667 11.9653 0 12.1875 0C12.4097 0 12.625 0.0416667 12.8333 0.125C13.0417 0.208333 13.2222 0.333333 13.375 0.5L14.5208 1.66667C14.6875 1.81944 14.809 2 14.8854 2.20833C14.9618 2.41667 15 2.625 15 2.83333C15 3.05556 14.9618 3.26736 14.8854 3.46875C14.809 3.67014 14.6875 3.85417 14.5208 4.02083L3.54167 15H0ZM13.3333 2.83333L12.1667 1.66667L13.3333 2.83333ZM10.3958 4.60417L9.8125 4L11 5.1875L10.3958 4.60417Z"
                          fill="#1A1C1E"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* FOOTER PAGINATION */}
      <div className="flex py-4 px-6 justify-between items-center border-t border-t-[#C3C6D1] bg-[#F3F3F6] w-full">
        <div className="flex flex-col items-start w-fit">
          <p className="text-[#43474F] font-iBMPlexSans text-[13px] leading-[18px] w-fit">
            Menampilkan {startDisplay}-{endDisplay} dari{' '}
            {totalUsers.toLocaleString('en-US')} pelapor
          </p>
        </div>
        <div className="flex items-center gap-1 w-fit">
          {/* Tombol Previous */}
          <button
            disabled={currentPage <= 1}
            onClick={() => onPageChange?.(currentPage - 1)}
            className={`flex pt-1 pr-1 pb-2.5 pl-1 flex-col justify-center items-center rounded-sm w-fit ${
              currentPage <= 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-200'
            }`}
          >
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex justify-center items-start w-fit "
            >
              <path
                d="M6 12L0 6L6 0L7.4 1.4L2.8 6L7.4 10.6L6 12Z"
                fill="#43474F"
              />
            </svg>
          </button>

          {/* Deretan Tombol Halaman */}
          {renderPaginationButtons()}

          {/* Tombol Next */}
          <button
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange?.(currentPage + 1)}
            className={`flex pt-1 pr-1 pb-2.5 pl-1 flex-col justify-center items-center rounded-sm w-fit ${
              currentPage >= totalPages
                ? 'opacity-30 cursor-not-allowed'
                : 'cursor-pointer hover:bg-gray-200'
            }`}
          >
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex justify-center items-start w-fit "
            >
              <path
                d="M4.6 6L0 1.4L1.4 0L7.4 6L1.4 12L0 10.6L4.6 6Z"
                fill="#43474F"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}