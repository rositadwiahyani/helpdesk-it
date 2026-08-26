import React from "react";

export interface SLAHistoryItem {
  id: string | number;
  action: string;
  timestamp: string;
}

interface SLAHistorySectionProps {
  historyData?: SLAHistoryItem[];
}

const defaultHistoryData: SLAHistoryItem[] = [
  {
    id: 1,
    action: "SLA Kritis diubah oleh Admin A",
    timestamp: "2 Jam yang lalu",
  },
  {
    id: 2,
    action: "SLA Rendah diperpanjang",
    timestamp: "15 Jan 2024",
  },
];

export default function SLAHistorySection({
  historyData = defaultHistoryData,
}: SLAHistorySectionProps) {
  return (
    <div className="flex pt-6 pr-6 pb-[90px] pl-6 items-start gap-4 rounded-lg border border-[#C3C6D1] bg-[#FFF] w-full">
      <svg
        width="42"
        height="50"
        viewBox="0 0 42 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex pt-3 pr-3 pb-5 pl-3 flex-col items-start rounded-xl bg-[rgba(0,51,102,0.20)] w-fit "
      >
        <rect width="42" height="50" rx="12" fill="#003366" fillOpacity="0.2" />
        <path
          d="M21 30C18.7 30 16.6958 29.2375 14.9875 27.7125C13.2792 26.1875 12.3 24.2833 12.05 22H14.1C14.3333 23.7333 15.1042 25.1667 16.4125 26.3C17.7208 27.4333 19.25 28 21 28C22.95 28 24.6042 27.3208 25.9625 25.9625C27.3208 24.6042 28 22.95 28 21C28 19.05 27.3208 17.3958 25.9625 16.0375C24.6042 14.6792 22.95 14 21 14C19.85 14 18.775 14.2667 17.775 14.8C16.775 15.3333 15.9333 16.0667 15.25 17H18V19H12V13H14V15.35C14.85 14.2833 15.8875 13.4583 17.1125 12.875C18.3375 12.2917 19.6333 12 21 12C22.25 12 23.4208 12.2375 24.5125 12.7125C25.6042 13.1875 26.5542 13.8292 27.3625 14.6375C28.1708 15.4458 28.8125 16.3958 29.2875 17.4875C29.7625 18.5792 30 19.75 30 21C30 22.25 29.7625 23.4208 29.2875 24.5125C28.8125 25.6042 28.1708 26.5542 27.3625 27.3625C26.5542 28.1708 25.6042 28.8125 24.5125 29.2875C23.4208 29.7625 22.25 30 21 30ZM23.8 25.2L20 21.4V16H22V20.6L25.2 23.8L23.8 25.2Z"
          fill="#001E40"
        />
      </svg>
      <div className="flex flex-col items-start gap-2 w-fit">
        <div className="flex flex-col items-start w-full">
          <p className="text-[#001E40] font-iBMPlexSans text-xl font-medium leading-7 w-fit">
            Riwayat Perubahan
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 w-full">
          {historyData.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center w-full"
            >
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#43474F] font-nimbusSans text-[13px] leading-[18px] w-fit">
                  {item.action}
                </p>
              </div>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#737780] font-nimbusSans text-[11px] leading-[18px] w-fit">
                  {item.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}