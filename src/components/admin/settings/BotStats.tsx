import React from "react";

interface BotStatsProps {
  onViewAnalytics: () => void;
}

export default function BotStats({ onViewAnalytics }: BotStatsProps) {
  return (
    <div className="flex p-6 flex-col items-start gap-4 rounded-lg border border-[#C3C6D1] bg-[#FFF] w-full">
      <div className="flex flex-col items-start w-full">
        <p className="text-[#43474F] font-iBMPlexSans text-xs font-bold leading-4 w-full tracking-[0.05em]">
          STATISTIK BOT &#40;24 JAM&#41;
        </p>
      </div>
      <div className="flex pb-2 flex-col items-start gap-4 w-full">
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex pr-[0] justify-between items-start w-full">
            <div className="flex flex-col items-start w-fit h-full">
              <p className="text-[#1A1C1E] font-iBMPlexSans text-[13px] leading-[18px] w-fit">
                Pesan Terkirim
              </p>
            </div>
            <div className="flex flex-col items-start w-fit h-full">
              <p className="text-[#1A1C1E] font-iBMPlexSans text-[13px] font-bold leading-[18px] w-fit">
                1,284
              </p>
            </div>
          </div>
          <svg
            width="254"
            height="8"
            viewBox="0 0 254 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-2 overflow-hidden relative "
          >
            <g clipPath="url(#clip0_63_12907)">
              <rect width="254" height="8" rx="4" fill="#E8E8EA" />
              <rect width="190.5" height="8" rx="4" fill="#0059BB" />
            </g>
            <defs>
              <clipPath id="clip0_63_12907">
                <rect width="254" height="8" rx="4" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col items-start w-fit h-full">
              <p className="text-[#1A1C1E] font-iBMPlexSans text-[13px] leading-[18px] w-fit">
                Penyelesaian Otomatis
              </p>
            </div>
            <div className="flex flex-col items-start w-fit h-full">
              <p className="text-[#1A1C1E] font-iBMPlexSans text-[13px] font-bold leading-[18px] w-fit">
                64%
              </p>
            </div>
          </div>
          <svg
            width="254"
            height="8"
            viewBox="0 0 254 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-2 overflow-hidden relative "
          >
            <g clipPath="url(#clip0_63_12915)">
              <rect width="254" height="8" rx="4" fill="#E8E8EA" />
              <rect width="162.55" height="8" rx="4" fill="#10B981" />
            </g>
            <defs>
              <clipPath id="clip0_63_12915">
                <rect width="254" height="8" rx="4" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <button 
        onClick={onViewAnalytics}
        className="cursor-pointer text-nowrap flex py-2 px-0 justify-center items-center rounded border border-[#0059BB] w-full hover:bg-[rgba(0,89,187,0.05)] transition-colors"
      >
        <p className="text-[#0059BB] font-iBMPlexSans text-xs font-bold leading-4 w-fit tracking-[0.05em]">
          Lihat Detail Analytics
        </p>
      </button>
    </div>
  );
}