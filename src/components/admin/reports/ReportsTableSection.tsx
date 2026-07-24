"use client";

import React, { useCallback } from "react";

interface ReportsTableSectionProps {
  onViewAll?: () => void;
  onDownloadItem?: (fileName: string) => void;
}

export default function ReportsTableSection({
  onViewAll,
  onDownloadItem,
}: ReportsTableSectionProps) {
  // Handler simulasi untuk interaksi klik
  const handleViewAll = useCallback(() => {
    if (onViewAll) onViewAll();
    else alert("Menampilkan semua riwayat unduhan (Simulasi)");
  }, [onViewAll]);

  const handleItemClick = useCallback(
    (fileName: string) => {
      if (onDownloadItem) onDownloadItem(fileName);
      else alert(`Mengunduh ulang file: ${fileName} (Simulasi)`);
    },
    [onDownloadItem]
  );

  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <div className="flex pr-[0] justify-between items-center w-full">
        <div className="flex flex-col items-start w-fit">
          <p className="text-[#1A1C1E] font-iBMPlexSans text-xl font-medium leading-7 w-fit">
            Riwayat Unduhan Terakhir
          </p>
        </div>
        <div
          className="flex items-center gap-1 w-fit"
          onClick={handleViewAll}
          style={{ cursor: "pointer" }}
        >
          <p className="text-[#0059BB] font-iBMPlexSans text-xs font-bold leading-4 w-fit tracking-[0.05em]">
            Lihat Semua
          </p>
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-col items-center w-fit "
          >
            <path
              d="M8.11667 6H0V4.66667H8.11667L4.38333 0.933333L5.33333 0L10.6667 5.33333L5.33333 10.6667L4.38333 9.73333L8.11667 6Z"
              fill="#0059BB"
            />
          </svg>
        </div>
      </div>
      <div className="flex justify-center items-start gap-4 w-full">
        <div
          className="flex p-4 items-center gap-4 rounded border border-[#C3C6D1] bg-[#F9F9FC] w-full hover:bg-gray-100 transition-colors"
          onClick={() => handleItemClick("Ticket_Export_Oct.csv")}
          style={{ cursor: "pointer" }}
        >
          <div className="flex justify-center items-center rounded-sm bg-[#DCFCE7] w-10 h-10">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex flex-col items-start w-fit "
            >
              <path
                d="M6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V6C4 5.45 4.19583 4.97917 4.5875 4.5875C4.97917 4.19583 5.45 4 6 4H18C18.55 4 19.0208 4.19583 19.4125 4.5875C19.8042 4.97917 20 5.45 20 6V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6ZM6 18H11V15H6V18ZM13 18H18V15H13V18ZM0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16V2H2V16H0ZM6 13H11V10H6V13ZM13 13H18V10H13V13ZM6 8H18V6H6V8Z"
                fill="#15803D"
              />
            </svg>
          </div>
          <div className="flex flex-col items-start w-fit">
            <div className="flex flex-col items-start w-full">
              <p className="text-[#1A1C1E] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                Ticket_Export_Oct.csv
              </p>
            </div>
            <div className="flex flex-col items-start w-full">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                Hari ini, 10:24
              </p>
            </div>
          </div>
        </div>
        <div
          className="flex p-4 items-center gap-4 rounded border border-[#C3C6D1] bg-[#F9F9FC] w-full hover:bg-gray-100 transition-colors"
          onClick={() => handleItemClick("Monthly_Report_Q3.xlsx")}
          style={{ cursor: "pointer" }}
        >
          <div className="flex justify-center items-center rounded-sm bg-[#DBEAFE] w-10 h-10">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex flex-col items-start w-fit "
            >
              <path
                d="M16 18H2C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18ZM2 5H16V2H2V5ZM4.5 7H2V16H4.5V7ZM13.5 7V16H16V7H13.5ZM11.5 7H6.5V16H11.5V7Z"
                fill="#1D4ED8"
              />
            </svg>
          </div>
          <div className="flex flex-col items-start w-fit">
            <div className="flex flex-col items-start w-full">
              <p className="text-[#1A1C1E] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                Monthly_Report_Q3.xlsx
              </p>
            </div>
            <div className="flex flex-col items-start w-full">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                Kemarin, 14:15
              </p>
            </div>
          </div>
        </div>
        <div
          className="flex p-4 items-center gap-4 rounded border border-[#C3C6D1] bg-[#F9F9FC] w-full hover:bg-gray-100 transition-colors"
          onClick={() => handleItemClick("SLA_Metrics_v2.csv")}
          style={{ cursor: "pointer" }}
        >
          <div className="flex justify-center items-center rounded-sm bg-[#FFEDD5] w-10 h-10">
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex flex-col items-start w-fit "
            >
              <path
                d="M4 16H12V14H4V16ZM4 12H12V10H4V12ZM2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H10L16 6V18C16 18.55 15.8042 19.0208 15.4125 19.4125C15.0208 19.8042 14.55 20 14 20H2ZM9 7V2H2V18H14V7H9ZM2 2V7V2V7V18V2Z"
                fill="#C2410C"
              />
            </svg>
          </div>
          <div className="flex flex-col items-start w-fit">
            <div className="flex flex-col items-start w-full">
              <p className="text-[#1A1C1E] font-iBMPlexSans text-sm font-bold leading-5 w-fit">
                SLA_Metrics_v2.csv
              </p>
            </div>
            <div className="flex flex-col items-start w-full">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
                20 Okt 2023
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}