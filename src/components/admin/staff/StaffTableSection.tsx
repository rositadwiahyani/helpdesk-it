import React, { useState } from 'react';

// Catatan: Komponen ini tetap mempertahankan setiap elemen JSX tanpa mempersingkat
// kode hardcoded. Logic checkbox all, checkbox per row, sorting header, row clicks, 
// dan dummy loading state diaplikasikan sejalan dengan instruksi tanpa menghapus JSX yang ada.
export default function StaffTableSection() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(false); // Bisa diganti true untuk melihat loading sederhana
  const [currentPage, setCurrentPage] = useState<number>(1);

  // List ID untuk mempermudah "Pilih Semua"
  const rowIds = ['admin', 'agent.keamanan', 'agent.jaringan', 'agent.hardware', 'agent.software'];

  const handleSelectAll = () => {
    if (selectedRows.length === rowIds.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rowIds);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="flex flex-col items-start rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[01px2px0rgba(0,0,0,0.05)] w-full overflow-hidden relative">
      {/* Loading Overlay Sederhana */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex justify-center items-center bg-white bg-opacity-70">
          <p className="text-[#001E40] font-iBMPlexSans text-sm font-bold">Memuat data staff...</p>
        </div>
      )}

      <div className="flex flex-col items-start -space-y-px w-full">
        <div className="flex flex-col items-start border-b border-b-[#C3C6D1] bg-[#F3F3F6] w-full">
          <div className="flex justify-center items-center w-full">
            <svg
              width="48"
              height="53"
              viewBox="0 0 48 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex pt-[19px] pr-4 pb-[17px] pl-4 flex-col items-center w-12 cursor-pointer"
              onClick={handleSelectAll}
            >
              <rect
                x="16.5"
                y="19.83"
                width="15"
                height="15"
                rx="1.5"
                fill={selectedRows.length === rowIds.length ? "#001E40" : "white"}
                stroke="#C3C6D1"
              />
            </svg>
            <div 
              className="flex pl-4 items-center gap-1 w-[217px] cursor-pointer" 
              onClick={() => handleSort('NAME')}
            >
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                NAME {sortColumn === 'NAME' && (sortDirection === 'asc' ? '↑' : '↓')}
              </p>
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-start w-fit "
              >
                <path
                  d="M2.33333 6.41667V2.23125L0.83125 3.73333L0 2.91667L2.91667 0L5.83333 2.91667L5.00208 3.73333L3.5 2.23125V6.41667H2.33333ZM6.41667 11.6667L3.5 8.75L4.33125 7.93333L5.83333 9.43542V5.25H7V9.43542L8.50208 7.93333L9.33333 8.75L6.41667 11.6667Z"
                  fill="#43474F"
                />
              </svg>
            </div>
            <div 
              className="flex pl-8 items-center gap-1 w-[130px] cursor-pointer"
              onClick={() => handleSort('USERNAME')}
            >
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                USERNAME {sortColumn === 'USERNAME' && (sortDirection === 'asc' ? '↑' : '↓')}
              </p>
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-start w-fit "
              >
                <path
                  d="M2.33333 6.41667V2.23125L0.83125 3.73333L0 2.91667L2.91667 0L5.83333 2.91667L5.00208 3.73333L3.5 2.23125V6.41667H2.33333ZM6.41667 11.6667L3.5 8.75L4.33125 7.93333L5.83333 9.43542V5.25H7V9.43542L8.50208 7.93333L9.33333 8.75L6.41667 11.6667Z"
                  fill="#43474F"
                />
              </svg>
            </div>
            <div className="flex pt-[18px] pr-4 pb-[19px] pl-8 flex-col items-center w-[102px]">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                STATUS
              </p>
            </div>
            <div 
              className="flex pl-4 items-center gap-1 w-[209px] cursor-pointer"
              onClick={() => handleSort('DEPARTMENT')}
            >
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                DEPARTMENT {sortColumn === 'DEPARTMENT' && (sortDirection === 'asc' ? '↑' : '↓')}
              </p>
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-start w-fit "
              >
                <path
                  d="M2.33333 6.41667V2.23125L0.83125 3.73333L0 2.91667L2.91667 0L5.83333 2.91667L5.00208 3.73333L3.5 2.23125V6.41667H2.33333ZM6.41667 11.6667L3.5 8.75L4.33125 7.93333L5.83333 9.43542V5.25H7V9.43542L8.50208 7.93333L9.33333 8.75L6.41667 11.6667Z"
                  fill="#43474F"
                />
              </svg>
            </div>
            <div className="flex pt-[18px] pr-4 pb-[19px] pl-8 flex-col items-start w-[124px]">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                CREATED
              </p>
            </div>
            <div className="flex pt-[18px] pr-4 pb-[19px] pl-4 flex-col items-start w-[113px]">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                LAST LOGIN
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start -space-y-px w-full">
          {/* Row 1 */}
          <div 
            className={`flex justify-center items-center w-full cursor-pointer transition-colors ${selectedRows.includes('admin') ? 'bg-[rgba(0,30,64,0.05)]' : 'hover:bg-[rgba(0,30,64,0.02)]'}`}
            onClick={() => handleSelectRow('admin')}
          >
            <svg
              width="48"
              height="65"
              viewBox="0 0 48 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex pt-[26px] pr-4 pb-[23px] pl-4 flex-col items-center w-12 cursor-pointer"
              onClick={(e) => { e.stopPropagation(); handleSelectRow('admin'); }}
            >
              <rect
                x="16.5"
                y="26.39"
                width="15"
                height="15"
                rx="1.5"
                fill={selectedRows.includes('admin') ? "#001E40" : "white"}
                stroke="#C3C6D1"
              />
            </svg>
            <div className="flex pl-4 items-center gap-3 w-[217px]">
              <button className="cursor-pointer text-nowrap flex pt-2 pr-0 pb-[9px] pl-0 justify-center items-center shrink-0 rounded-xl bg-[rgba(31,71,123,0.10)] w-8 h-8">
                <p className="text-[#1F477B] font-iBMPlexSans text-xs font-bold leading-4 w-fit">
                  SA
                </p>
              </button>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#001E40] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                  System Administrator
                </p>
              </div>
            </div>
            <div className="flex pt-[22px] pr-4 pb-[23px] pl-8 flex-col items-start w-[146px]">
              <p className="text-[#43474F] font-liberationSerif text-sm leading-5 w-fit">
                admin
              </p>
            </div>
            <div className="flex py-[21px] px-4 flex-col items-center w-[86px]">
              <button className="cursor-pointer text-nowrap flex py-0.5 px-2 justify-center items-center rounded-sm bg-[#E8F5E9] w-fit">
                <p className="text-[#2E7D32] font-iBMPlexSans text-[11px] font-bold leading-5 w-fit">
                  Active
                </p>
              </button>
            </div>
            <div className="flex py-[23px] px-4 flex-col items-start w-[225px]">
              <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                Unassigned
              </p>
            </div>
            <div className="flex py-[23px] px-4 flex-col items-start w-[108px]">
              <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                20&#x2F;7&#x2F;2026
              </p>
            </div>
            <div className="flex py-[23px] px-4 flex-col items-start w-[113px]">
              <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                Never
              </p>
            </div>
          </div>
          
          {/* Row 2 */}
          <div 
            className={`flex justify-center items-center border-t border-t-[rgba(195,198,209,0.30)] w-full cursor-pointer transition-colors ${selectedRows.includes('agent.keamanan') ? 'bg-[rgba(0,30,64,0.05)]' : 'bg-[rgba(243,243,246,0.50)] hover:bg-[rgba(0,30,64,0.02)]'}`}
            onClick={() => handleSelectRow('agent.keamanan')}
          >
            <svg
              width="48"
              height="65"
              viewBox="0 0 48 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex pt-[26px] pr-4 pb-[23px] pl-4 flex-col items-center w-12 cursor-pointer"
              onClick={(e) => { e.stopPropagation(); handleSelectRow('agent.keamanan'); }}
            >
              <rect
                x="16.5"
                y="26.39"
                width="15"
                height="15"
                rx="1.5"
                fill={selectedRows.includes('agent.keamanan') ? "#001E40" : "white"}
                stroke="#C3C6D1"
              />
            </svg>
            <div className="flex pl-4 items-center gap-3 w-[217px]">
              <button className="cursor-pointer text-nowrap flex pt-2 pr-0 pb-[9px] pl-0 justify-center items-center shrink-0 rounded-xl bg-[#D8E2FF] w-8 h-8">
                <p className="text-[#004493] font-iBMPlexSans text-xs font-bold leading-4 w-fit">
                  DK
                </p>
              </button>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#001E40] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                  Deni Keamanan
                </p>
              </div>
            </div>
            <div className="flex pt-[22px] pr-4 pb-[23px] pl-8 flex-col items-start w-[146px]">
              <p className="text-[#43474F] font-liberationSerif text-sm leading-5 w-fit">
                agent.keamanan
              </p>
            </div>
            <div className="flex py-[21px] px-4 flex-col items-center w-[86px]">
              <button className="cursor-pointer text-nowrap flex py-0.5 px-2 justify-center items-center rounded-sm bg-[#E8F5E9] w-fit">
                <p className="text-[#2E7D32] font-iBMPlexSans text-[11px] font-bold leading-5 w-fit">
                  Active
                </p>
              </button>
            </div>
            <div className="flex py-[23px] px-4 flex-col items-start w-[225px]">
              <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                Unit Keamanan Siber
              </p>
            </div>
            <div className="flex py-[23px] px-4 flex-col items-start w-[108px]">
              <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                19&#x2F;7&#x2F;2026
              </p>
            </div>
            <div className="flex py-[23px] px-4 flex-col items-start w-[113px]">
              <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                Never
              </p>
            </div>
          </div>
          
          {/* Row 3 */}
          <div 
            className={`flex justify-center items-center border-t border-t-[rgba(195,198,209,0.30)] w-full cursor-pointer transition-colors ${selectedRows.includes('agent.jaringan') ? 'bg-[rgba(0,30,64,0.05)]' : 'hover:bg-[rgba(0,30,64,0.02)]'}`}
            onClick={() => handleSelectRow('agent.jaringan')}
          >
            <svg
              width="48"
              height="65"
              viewBox="0 0 48 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex pt-[26px] pr-4 pb-[23px] pl-4 flex-col items-center w-12 cursor-pointer"
              onClick={(e) => { e.stopPropagation(); handleSelectRow('agent.jaringan'); }}
            >
              <rect
                x="16.5"
                y="26.39"
                width="15"
                height="15"
                rx="1.5"
                fill={selectedRows.includes('agent.jaringan') ? "#001E40" : "white"}
                stroke="#C3C6D1"
              />
            </svg>
            <div className="flex pl-4 items-center gap-3 w-[217px]">
              <button className="cursor-pointer text-nowrap flex pt-2 pr-0 pb-[9px] pl-0 justify-center items-center shrink-0 rounded-xl bg-[#E0E3E6] w-8 h-8">
                <p className="text-[#43474A] font-iBMPlexSans text-xs font-bold leading-4 w-fit">
                  CJ
                </p>
              </button>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#001E40] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                  Citra Jaringan
                </p>
              </div>
            </div>
            <div className="flex pt-[22px] pr-4 pb-[23px] pl-8 flex-col items-start w-[146px]">
              <p className="text-[#43474F] font-liberationSerif text-sm leading-5 w-fit">
                agent.jaringan
              </p>
            </div>
            <div className="flex py-[21px] px-4 flex-col items-center w-[86px]">
              <button className="cursor-pointer text-nowrap flex py-0.5 px-2 justify-center items-center rounded-sm bg-[#E8F5E9] w-fit">
                <p className="text-[#2E7D32] font-iBMPlexSans text-[11px] font-bold leading-5 w-fit">
                  Active
                </p>
              </button>
            </div>
            <div className="flex py-[23px] px-4 flex-col items-start w-[225px]">
              <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                Unit Jaringan &amp; Infrastruktur
              </p>
            </div>
            <div className="flex py-[23px] px-4 flex-col items-start w-[108px]">
              <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                19&#x2F;7&#x2F;2026
              </p>
            </div>
            <div className="flex py-[23px] px-4 flex-col items-start w-[113px]">
              <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                Never
              </p>
            </div>
          </div>
          
          {/* Row 4 */}
          <div 
            className={`flex justify-center items-center border-t border-t-[rgba(195,198,209,0.30)] w-full cursor-pointer transition-colors ${selectedRows.includes('agent.hardware') ? 'bg-[rgba(0,30,64,0.05)]' : 'bg-[rgba(243,243,246,0.50)] hover:bg-[rgba(0,30,64,0.02)]'}`}
            onClick={() => handleSelectRow('agent.hardware')}
          >
            <svg
              width="48"
              height="65"
              viewBox="0 0 48 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex pt-[26px] pr-4 pb-[23px] pl-4 flex-col items-center w-12 cursor-pointer"
              onClick={(e) => { e.stopPropagation(); handleSelectRow('agent.hardware'); }}
            >
              <rect
                x="16.5"
                y="26.39"
                width="15"
                height="15"
                rx="1.5"
                fill={selectedRows.includes('agent.hardware') ? "#001E40" : "white"}
                stroke="#C3C6D1"
              />
            </svg>
            <div className="flex pl-4 items-center gap-3 w-[217px]">
              <button className="cursor-pointer text-nowrap flex pt-2 pr-0 pb-[9px] pl-0 justify-center items-center shrink-0 rounded-xl bg-[#FFDAD6] w-8 h-8">
                <p className="text-[#93000A] font-iBMPlexSans text-xs font-bold leading-4 w-fit">
                  BH
                </p>
              </button>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#001E40] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                  Budi Hardware
                </p>
              </div>
            </div>
            <div className="flex pt-[22px] pr-4 pb-[23px] pl-8 flex-col items-start w-[146px]">
              <p className="text-[#43474F] font-liberationSerif text-sm leading-5 w-fit">
                agent.hardware
              </p>
            </div>
            <div className="flex py-[21px] px-4 flex-col items-center w-[86px]">
              <button className="cursor-pointer text-nowrap flex py-0.5 px-2 justify-center items-center rounded-sm bg-[#E8F5E9] w-fit">
                <p className="text-[#2E7D32] font-iBMPlexSans text-[11px] font-bold leading-5 w-fit">
                  Active
                </p>
              </button>
            </div>
            <div className="flex py-[23px] px-4 flex-col items-start w-[225px]">
              <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                Unit Hardware &amp; Perangkat
              </p>
            </div>
            <div className="flex py-[23px] px-4 flex-col items-start w-[108px]">
              <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                19&#x2F;7&#x2F;2026
              </p>
            </div>
            <div className="flex py-[23px] px-4 flex-col items-start w-[113px]">
              <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                Never
              </p>
            </div>
          </div>
          
          {/* Row 5 */}
          <div 
            className={`flex justify-center items-center border-t border-t-[rgba(195,198,209,0.30)] w-full cursor-pointer transition-colors ${selectedRows.includes('agent.software') ? 'bg-[rgba(0,30,64,0.05)]' : 'hover:bg-[rgba(0,30,64,0.02)]'}`}
            onClick={() => handleSelectRow('agent.software')}
          >
            <svg
              width="48"
              height="65"
              viewBox="0 0 48 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex pt-[26px] pr-4 pb-[23px] pl-4 flex-col items-center w-12 cursor-pointer"
              onClick={(e) => { e.stopPropagation(); handleSelectRow('agent.software'); }}
            >
              <rect
                x="16.5"
                y="26.39"
                width="15"
                height="15"
                rx="1.5"
                fill={selectedRows.includes('agent.software') ? "#001E40" : "white"}
                stroke="#C3C6D1"
              />
            </svg>
            <div className="flex pl-4 items-center gap-3 w-[217px]">
              <button className="cursor-pointer text-nowrap flex pt-2 pr-0 pb-[9px] pl-0 justify-center items-center shrink-0 rounded-xl bg-[#D5E3FF] w-8 h-8">
                <p className="text-[#1F477B] font-iBMPlexSans text-xs font-bold leading-4 w-fit">
                  AS
                </p>
              </button>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#001E40] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                  Andi Software
                </p>
              </div>
            </div>
            <div className="flex pt-[22px] pr-4 pb-[23px] pl-8 flex-col items-start w-[146px]">
              <p className="text-[#43474F] font-liberationSerif text-sm leading-5 w-fit">
                agent.software
              </p>
            </div>
            <div className="flex pt-[21px] pr-4 pb-5 pl-4 flex-col items-center w-[86px]">
              <button className="cursor-pointer text-nowrap flex py-0.5 px-2 justify-center items-center rounded-sm bg-[#E8F5E9] w-fit">
                <p className="text-[#2E7D32] font-iBMPlexSans text-[11px] font-bold leading-5 w-fit">
                  Active
                </p>
              </button>
            </div>
            <div className="flex pt-[23px] pr-4 pb-[22px] pl-4 flex-col items-start w-[225px]">
              <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                Unit Software &amp; Aplikasi
              </p>
            </div>
            <div className="flex pt-[23px] pr-4 pb-[22px] pl-4 flex-col items-start w-[108px]">
              <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                19&#x2F;7&#x2F;2026
              </p>
            </div>
            <div className="flex pt-[23px] pr-4 pb-[22px] pl-4 flex-col items-start w-[113px]">
              <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
                Never
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex p-4 justify-between items-center border-t border-t-[#C3C6D1] bg-[#F3F3F6] w-full">
        <div className="flex flex-col items-start w-fit">
          <p className="text-[#001E40] font-iBMPlexSans text-sm leading-5 w-fit">
            Showing 1 - 5 of 48 Agents
          </p>
        </div>
        <div className="flex items-center gap-2 w-fit">
          <button 
            className="flex p-1 flex-col justify-center items-center opacity-50 w-fit cursor-pointer disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
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
          
          <button 
            onClick={() => setCurrentPage(1)}
            className={`cursor-pointer text-nowrap flex flex-col justify-center items-center rounded-sm w-8 h-8 ${currentPage === 1 ? 'bg-[#001E40]' : ''}`}
          >
            <p className={`font-iBMPlexSans text-sm leading-5 w-fit ${currentPage === 1 ? 'text-[#FFF] font-bold' : 'text-[#1A1C1E]'}`}>
              1
            </p>
          </button>
          <button 
            onClick={() => setCurrentPage(2)}
            className={`cursor-pointer text-nowrap flex flex-col justify-center items-center rounded-sm w-8 h-8 ${currentPage === 2 ? 'bg-[#001E40]' : ''}`}
          >
            <p className={`font-iBMPlexSans text-sm leading-5 w-fit ${currentPage === 2 ? 'text-[#FFF] font-bold' : 'text-[#1A1C1E]'}`}>
              2
            </p>
          </button>
          <button 
            onClick={() => setCurrentPage(3)}
            className={`cursor-pointer text-nowrap flex flex-col justify-center items-center rounded-sm w-8 h-8 ${currentPage === 3 ? 'bg-[#001E40]' : ''}`}
          >
            <p className={`font-iBMPlexSans text-sm leading-5 w-fit ${currentPage === 3 ? 'text-[#FFF] font-bold' : 'text-[#1A1C1E]'}`}>
              3
            </p>
          </button>
          
          <div className="flex py-0 px-1 flex-col items-start w-fit">
            <p className="text-[#1A1C1E] font-iBMPlexSans text-sm leading-5 w-fit">
              ...
            </p>
          </div>
          
          <button 
            onClick={() => setCurrentPage(10)}
            className={`cursor-pointer text-nowrap flex flex-col justify-center items-center rounded-sm w-8 h-8 ${currentPage === 10 ? 'bg-[#001E40]' : ''}`}
          >
            <p className={`font-iBMPlexSans text-sm leading-5 w-fit ${currentPage === 10 ? 'text-[#FFF] font-bold' : 'text-[#1A1C1E]'}`}>
              10
            </p>
          </button>
          
          <button 
            className="flex p-1 flex-col justify-center items-center w-fit cursor-pointer"
            onClick={() => setCurrentPage(Math.min(10, currentPage + 1))}
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