"use client";

import React, { useState } from "react";

interface ReportsToolbarProps {
  fromDate?: string;
  setFromDate?: (date: string) => void;
  toDate?: string;
  setToDate?: (date: string) => void;
  status?: string;
  setStatus?: (status: string) => void;
  onExport?: (config: {
    fromDate: string;
    toDate: string;
    status: string;
  }) => void;
}

export default function ReportsToolbar({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  status,
  setStatus,
  onExport,
}: ReportsToolbarProps) {
  // State lokal fallback jika tidak di-pass dari ReportWorkspace
  const [localFromDate, setLocalFromDate] = useState("");
  const [localToDate, setLocalToDate] = useState("");
  const [localStatus, setLocalStatus] = useState("");

  const [isExporting, setIsExporting] = useState(false);

  // Menentukan state yang aktif (dari prop vs lokal)
  const activeFromDate = fromDate !== undefined ? fromDate : localFromDate;
  const activeSetFromDate = setFromDate || setLocalFromDate;

  const activeToDate = toDate !== undefined ? toDate : localToDate;
  const activeSetToDate = setToDate || setLocalToDate;

  const activeStatus = status !== undefined ? status : localStatus;
  const activeSetStatus = setStatus || setLocalStatus;

  // Handler ekspor data
  const handleExport = () => {
    if (isExporting) return;
    setIsExporting(true);
    
    // Simulasi loading ekspor API
    setTimeout(() => {
      setIsExporting(false);
      if (onExport) {
        onExport({
          fromDate: activeFromDate,
          toDate: activeToDate,
          status: activeStatus,
        });
      } else {
        alert("Dokumen berhasil diekspor! (Simulasi)");
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col items-start rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[01px2px0rgba(0,0,0,0.05)] w-full overflow-hidden">
      <div className="flex p-6 flex-col items-start border-b border-b-[#C3C6D1] bg-[rgba(243,243,246,0.30)] w-full">
        <div className="flex items-center gap-2 w-full">
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-col items-start w-fit "
          >
            <path
              d="M7 12V10H11V12H7ZM3 7V5H15V7H3ZM0 2V0H18V2H0Z"
              fill="#001E40"
            />
          </svg>
          <p className="text-[#001E40] font-iBMPlexSans text-xl font-medium leading-7 w-fit">
            Konfigurasi Ekspor
          </p>
        </div>
      </div>
      <div className="flex p-6 flex-col items-start gap-6 w-full">
        <div className="flex justify-center items-start gap-6 w-full">
          <div className="flex flex-col items-start gap-2 w-full">
            <div className="flex flex-col items-start w-full">
              <p className="text-[#1A1C1E] font-iBMPlexSans text-base leading-6 w-full tracking-[0.05em]">
                DARI TANGGAL MASUK
              </p>
            </div>
            <div className="flex flex-col items-start w-full relative">
              <div className="flex p-3 justify-center items-start rounded border border-[#C3C6D1] bg-[#FFF] w-full overflow-hidden">
                <div className="flex items-center w-full">
                  <div className="flex items-start w-full overflow-hidden">
                    <div className="flex py-0 px-px items-start gap-px w-fit h-full">
                      {activeFromDate ? (
                        <p className="text-[#1A1C1E] font-iBMPlexSans text-base leading-6 w-fit">
                          {activeFromDate}
                        </p>
                      ) : (
                        <>
                          <p className="text-[#1A1C1E] font-iBMPlexSans text-base leading-6 w-fit">
                            mm
                          </p>
                          <p className="text-[#1A1C1E] font-iBMPlexSans text-base leading-6 w-fit">
                            &#x2F;
                          </p>
                          <p className="text-[#1A1C1E] font-iBMPlexSans text-base leading-6 w-fit">
                            dd
                          </p>
                          <p className="text-[#1A1C1E] font-iBMPlexSans text-base leading-6 w-fit">
                            &#x2F;
                          </p>
                          <p className="text-[#1A1C1E] font-iBMPlexSans text-base leading-6 w-fit">
                            yyyy
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex p-0.5 flex-col items-start w-5 h-5 overflow-hidden">
                    <div className="shrink-0 w-4 h-[15px] overflow-hidden"></div>
                  </div>
                </div>
              </div>
              <svg
                width="18"
                height="24"
                viewBox="0 0 18 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-start absolute right-3 top-[13px] w-fit h-6 pointer-events-none"
              >
                <path
                  d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6ZM2 6V4V6Z"
                  fill="#737780"
                />
              </svg>
              <input
                type="date"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                value={activeFromDate}
                onChange={(e) => activeSetFromDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <p className="text-[#43474F] font-iBMPlexSans text-[11px] leading-[16.5px] w-full">
                Kosongkan jika ingin mengambil semua data dari awal
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <div className="flex flex-col items-start w-full">
              <p className="text-[#1A1C1E] font-iBMPlexSans text-base leading-6 w-full tracking-[0.05em]">
                SAMPAI TANGGAL MASUK
              </p>
            </div>
            <div className="flex flex-col items-start w-full relative">
              <div className="flex p-3 justify-center items-start rounded border border-[#C3C6D1] bg-[#FFF] w-full overflow-hidden">
                <div className="flex items-center w-full">
                  <div className="flex items-start w-full overflow-hidden">
                    <div className="flex py-0 px-px items-start gap-px w-fit h-full">
                      {activeToDate ? (
                        <p className="text-[#1A1C1E] font-iBMPlexSans text-base leading-6 w-fit">
                          {activeToDate}
                        </p>
                      ) : (
                        <>
                          <p className="text-[#1A1C1E] font-iBMPlexSans text-base leading-6 w-fit">
                            mm
                          </p>
                          <p className="text-[#1A1C1E] font-iBMPlexSans text-base leading-6 w-fit">
                            &#x2F;
                          </p>
                          <p className="text-[#1A1C1E] font-iBMPlexSans text-base leading-6 w-fit">
                            dd
                          </p>
                          <p className="text-[#1A1C1E] font-iBMPlexSans text-base leading-6 w-fit">
                            &#x2F;
                          </p>
                          <p className="text-[#1A1C1E] font-iBMPlexSans text-base leading-6 w-fit">
                            yyyy
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex p-0.5 flex-col items-start w-5 h-5 overflow-hidden">
                    <div className="shrink-0 w-4 h-[15px] overflow-hidden"></div>
                  </div>
                </div>
              </div>
              <svg
                width="18"
                height="24"
                viewBox="0 0 18 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-start absolute right-3 top-[13px] w-fit h-6 pointer-events-none"
              >
                <path
                  d="M11.5 16C10.8 16 10.2083 15.7583 9.725 15.275C9.24167 14.7917 9 14.2 9 13.5C9 12.8 9.24167 12.2083 9.725 11.725C10.2083 11.2417 10.8 11 11.5 11C12.2 11 12.7917 11.2417 13.275 11.725C13.7583 12.2083 14 12.8 14 13.5C14 14.2 13.7583 14.7917 13.275 15.275C12.7917 15.7583 12.2 16 11.5 16ZM2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6ZM2 6V4V6Z"
                  fill="#737780"
                />
              </svg>
              <input
                type="date"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                value={activeToDate}
                onChange={(e) => activeSetToDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <p className="text-[#43474F] font-iBMPlexSans text-[11px] leading-[16.5px] w-full">
                Kosongkan jika ingin mengambil data hingga hari ini
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 w-full">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#1A1C1E] font-iBMPlexSans text-base leading-6 w-full tracking-[0.05em]">
              STATUS TIKET
            </p>
          </div>
          <div className="flex p-3 justify-center items-center rounded border border-[#C3C6D1] bg-[#FFF] w-full relative">
            <div className="flex pt-[13px] pr-[17px] pb-[13px] flex justify-between items-center flex-col justify-center items-start absolute flex justify-between items-center overflow-hidden">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 w-6 h-6 overflow-hidden relative "
              >
                <path
                  d="M7.19922 9.59998L11.9992 14.4L16.7992 9.59998"
                  stroke="#6B7280"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col items-start w-full">
              <p className="text-[#1A1C1E] font-iBMPlexSans text-base leading-6 w-full">
                {activeStatus || "Semua Status"}
              </p>
            </div>
            <select
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              value={activeStatus}
              onChange={(e) => activeSetStatus(e.target.value)}
            >
              <option value="">Semua Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
        <div className="flex p-4 items-start gap-4 border-l-4 border-l-[#001E40] bg-[rgba(213,227,255,0.30)] w-full">
          <svg
            width="20"
            height="71"
            viewBox="0 0 20 71"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-col items-start w-fit h-full "
          >
            <path
              d="M9 15H11V9H9V15ZM10 7C10.2833 7 10.5208 6.90417 10.7125 6.7125C10.9042 6.52083 11 6.28333 11 6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6C9 6.28333 9.09583 6.52083 9.2875 6.7125C9.47917 6.90417 9.71667 7 10 7ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z"
              fill="#001E40"
            />
          </svg>
          <div className="flex flex-col items-start gap-1 w-fit h-full">
            <div className="flex flex-col items-start w-full">
              <p className="text-[#001E40] font-iBMPlexSans text-base font-bold leading-6 w-fit">
                Informasi Data:
              </p>
            </div>
            <div className="flex flex-col items-start w-full">
              <p className="text-[#1F477B] font-iBMPlexSans text-[13px] leading-[21.13px] w-fit">
                Data yang diunduh mencakup Nomor Tiket, Identitas Pelapor
                &#40;Nama, Unit, Email&#41;, Kategori Masalah, Prioritas,
                Status Terakhir, dan Detail Waktu Penanganan &#40;Response
                Time, Resolution Time&#41;.
              </p>
            </div>
          </div>
        </div>
        <div className="flex pt-4 justify-end items-start w-full">
          <div
            className="flex py-4 px-12 items-center gap-3 rounded bg-[#036] w-fit relative hover:bg-[#002855] transition-colors"
            onClick={handleExport}
            style={{ 
              cursor: isExporting ? "not-allowed" : "pointer",
              opacity: isExporting ? 0.7 : 1 
            }}
          >
            <div className="absolute -right-0 rounded bg-[rgba(255,255,255,0.00)] shadow-[04px6px-1pxrgba(0,0,0,0.10),02px4px-2pxrgba(0,0,0,0.10)] w-[263px] h-14"></div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex flex-col items-center w-fit "
            >
              <path
                d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V11H2V14H14V11H16V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16H2Z"
                fill="white"
              />
            </svg>
            <div className="flex flex-col items-center w-fit">
              <p className="text-[#FFF] font-iBMPlexSans text-base font-bold leading-6 w-fit">
                {isExporting ? "Mengekspor..." : "Unduh CSV (Excel)"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}