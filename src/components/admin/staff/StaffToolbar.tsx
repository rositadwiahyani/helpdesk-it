import React, { useState } from 'react';

// Catatan: State searchQuery dan selectedDepartment di masa depan sebaiknya 
// dipindahkan ke parent component (misal StaffWorkspace) melalui props agar 
// string pencarian dan filter bisa diaplikasikan ke komponen StaffTableSection.
export default function StaffToolbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('Semua Departemen');

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex min-w-[300px] items-center gap-3 w-full">
        <div className="flex max-w-[320px] flex-col items-start w-80 relative">
          <div className="flex pt-[9px] pr-4 pb-[9px] pl-9 justify-center items-start rounded border border-[#C3C6D1] bg-[#FFF] w-full overflow-hidden">
            <div className="flex flex-col items-start w-full overflow-hidden">
              <input
                type="text"
                placeholder="Cari agen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-[#6B7280] font-iBMPlexSans text-sm w-full outline-none bg-transparent"
              />
            </div>
          </div>
          <svg
            width="11"
            height="20"
            viewBox="0 0 11 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-col items-start absolute left-3 top-[9px] w-fit h-5 "
          >
            <path
              d="M9.68333 10.5L6.00833 6.825C5.71667 7.05833 5.38125 7.24306 5.00208 7.37917C4.62292 7.51528 4.21944 7.58333 3.79167 7.58333C2.73194 7.58333 1.83507 7.21632 1.10104 6.48229C0.367014 5.74826 0 4.85139 0 3.79167C0 2.73194 0.367014 1.83507 1.10104 1.10104C1.83507 0.367014 2.73194 0 3.79167 0C4.85139 0 5.74826 0.367014 6.48229 1.10104C7.21632 1.83507 7.58333 2.73194 7.58333 3.79167C7.58333 4.21944 7.51528 4.62292 7.37917 5.00208C7.24306 5.38125 7.05833 5.71667 6.825 6.00833L10.5 9.68333L9.68333 10.5ZM3.79167 6.41667C4.52083 6.41667 5.14062 6.16146 5.65104 5.65104C6.16146 5.14062 6.41667 4.52083 6.41667 3.79167C6.41667 3.0625 6.16146 2.44271 5.65104 1.93229C5.14062 1.42188 4.52083 1.16667 3.79167 1.16667C3.0625 1.16667 2.44271 1.42188 1.93229 1.93229C1.42188 2.44271 1.16667 3.0625 1.16667 3.79167C1.16667 4.52083 1.42188 5.14062 1.93229 5.65104C2.44271 6.16146 3.0625 6.41667 3.79167 6.41667Z"
              fill="#43474F"
            />
          </svg>
        </div>
        <div 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex py-2 px-4 flex-col justify-center items-start rounded border border-[#C3C6D1] bg-[#FFF] w-fit relative cursor-pointer"
        >
          <div className="flex pt-[9px] pr-[9px] pb-[9px] pl-[155px] flex-col justify-center items-start absolute w-[185px] h-[38px] overflow-hidden">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 w-[21px] h-[21px] overflow-hidden relative "
            >
              <path
                d="M6.30078 8.40002L10.5008 12.6L14.7008 8.40002"
                stroke="#6B7280"
                strokeWidth="1.575"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex pr-[26px] flex-col items-start w-fit">
            <p className="text-[#1A1C1E] font-iBMPlexSans text-sm leading-5 w-fit">
              {selectedDepartment}
            </p>
          </div>
          
          {/* Dummy Dropdown Menu ditambahkan di atas layout yang sudah ada */}
          {isFilterOpen && (
            <div className="absolute top-[45px] left-0 w-full bg-[#FFF] border border-[#C3C6D1] rounded shadow-md z-50 flex flex-col overflow-hidden">
              {['Semua Departemen', 'Unit Keamanan Siber', 'Unit Jaringan & Infrastruktur', 'Unit Hardware & Perangkat', 'Unit Software & Aplikasi'].map((dept) => (
                <button
                  key={dept}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDepartment(dept);
                    setIsFilterOpen(false);
                  }}
                  className="px-4 py-2 text-left text-sm font-iBMPlexSans text-[#1A1C1E] hover:bg-[#F3F3F6]"
                >
                  {dept}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 w-fit">
        <button className="cursor-pointer flex py-2.5 px-5 items-center gap-2 rounded bg-[#001E40] shadow-[01px2px0rgba(0,0,0,0.05)] w-fit hover:opacity-90">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-col items-center w-fit "
          >
            <path d="M6 8H0V6H6V0H8V6H14V8H8V14H6V8Z" fill="white" />
          </svg>
          <p className="text-[#FFF] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
            Add New Agent
          </p>
        </button>
        <button className="cursor-pointer flex py-2.5 px-4 items-center gap-2 rounded border border-[#C3C6D1] bg-[#FFF] w-fit hover:bg-gray-50">
          <svg
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-col items-center w-fit "
          >
            <path
              d="M16.675 7L15.575 4.6L13.175 3.5L15.575 2.4L16.675 0L17.775 2.4L20.175 3.5L17.775 4.6L16.675 7ZM18.675 14L17.875 12.3L16.175 11.5L17.875 10.7L18.675 9L19.475 10.7L21.175 11.5L19.475 12.3L18.675 14ZM5.675 20L5.375 17.65C5.25833 17.6 5.13333 17.5333 5 17.45C4.86667 17.3667 4.75833 17.2833 4.675 17.2L2.475 18.15L0 13.8L1.875 12.4C1.875 12.2667 1.875 12.1333 1.875 12C1.875 11.8667 1.875 11.7333 1.875 11.6L0 10.2L2.475 5.85L4.675 6.8C4.75833 6.71667 4.86667 6.63333 5 6.55C5.13333 6.46667 5.25833 6.4 5.375 6.35L5.675 4H10.675L10.975 6.35C11.0917 6.4 11.2167 6.46667 11.35 6.55C11.4833 6.63333 11.5917 6.71667 11.675 6.8L13.875 5.85L16.35 10.2L14.475 11.6C14.475 11.7333 14.475 11.8667 14.475 12C14.475 12.1333 14.475 12.2667 14.475 12.4L16.35 13.8L13.875 18.15L11.675 17.2C11.5917 17.2833 11.4833 17.3667 11.35 17.45C11.2167 17.5333 11.0917 17.6 10.975 17.65L10.675 20H5.675ZM8.175 15C9.00833 15 9.71667 14.7083 10.3 14.125C10.8833 13.5417 11.175 12.8333 11.175 12C11.175 11.1667 10.8833 10.4583 10.3 9.875C9.71667 9.29167 9.00833 9 8.175 9C7.34167 9 6.63333 9.29167 6.05 9.875C5.46667 10.4583 5.175 11.1667 5.175 12C5.175 12.8333 5.46667 13.5417 6.05 14.125C6.63333 14.7083 7.34167 15 8.175 15ZM7.425 18H8.925L9.125 16.2C9.60833 16.0667 10.0208 15.8958 10.3625 15.6875C10.7042 15.4792 11.0417 15.2 11.375 14.85L13.025 15.6L13.725 14.35L12.275 13.25C12.4083 12.8667 12.475 12.45 12.475 12C12.475 11.55 12.4083 11.1333 12.275 10.75L13.725 9.65L13.025 8.4L11.375 9.15C11.0417 8.8 10.7042 8.52083 10.3625 8.3125C10.0208 8.10417 9.60833 7.93333 9.125 7.8L8.925 6H7.425L7.225 7.8C6.74167 7.93333 6.32917 8.10417 5.9875 8.3125C5.64583 8.52083 5.30833 8.8 4.975 9.15L3.325 8.4L2.625 9.65L4.075 10.75C3.94167 11.1333 3.87083 11.55 3.8625 12C3.85417 12.45 3.925 12.8667 4.075 13.25L2.625 14.35L3.325 15.6L4.975 14.85C5.30833 15.2 5.64583 15.4792 5.9875 15.6875C6.32917 15.8958 6.74167 16.0667 7.225 16.2L7.425 18Z"
              fill="#1A1C1E"
            />
          </svg>
          <p className="text-[#1A1C1E] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
            More
          </p>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-col items-center w-fit "
          >
            <path
              d="M6 7.4L0 1.4L1.4 0L6 4.6L10.6 0L12 1.4L6 7.4Z"
              fill="#1A1C1E"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}