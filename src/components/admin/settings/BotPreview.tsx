import React from "react";

interface BotPreviewProps {
  message?: string;
}

export default function BotPreview({ message }: BotPreviewProps) {
  return (
    <div className="flex flex-col items-start rounded-lg bg-[#001E40] shadow-md w-full overflow-hidden">
      <div className="flex p-4 items-center gap-3 bg-[#001E40] border-b border-white/10 w-full">
        <div className="flex justify-center items-center rounded-xl bg-[rgba(255,255,255,0.20)] w-8 h-8">
          <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.25 9.75C1.625 9.75 1.09375 9.53125 0.65625 9.09375C0.21875 8.65625 0 8.125 0 7.5C0 6.875 0.21875 6.34375 0.65625 5.90625C1.09375 5.46875 1.625 5.25 2.25 5.25V3.75C2.25 3.3375 2.39687 2.98438 2.69062 2.69062C2.98438 2.39687 3.3375 2.25 3.75 2.25H6C6 1.625 6.21875 1.09375 6.65625 0.65625C7.09375 0.21875 7.625 0 8.25 0C8.875 0 9.40625 0.21875 9.84375 0.65625C10.2812 1.09375 10.5 1.625 10.5 2.25H12.75C13.1625 2.25 13.5156 2.39687 13.8094 2.69062C14.1031 2.98438 14.25 3.3375 14.25 3.75V5.25C14.875 5.25 15.4062 5.46875 15.8438 5.90625C16.2812 6.34375 16.5 6.875 16.5 7.5C16.5 8.125 16.2812 8.65625 15.8438 9.09375C15.4062 9.53125 14.875 9.75 14.25 9.75V12.75C14.25 13.1625 14.1031 13.5156 13.8094 13.8094C13.5156 14.1031 13.1625 14.25 12.75 14.25H3.75C3.3375 14.25 2.98438 14.1031 2.69062 13.8094C2.39687 13.5156 2.25 13.1625 2.25 12.75V9.75Z" fill="white"/>
          </svg>
        </div>
        <p className="text-[#FFF] font-iBMPlexSans text-xs font-bold tracking-[0.05em]">
          Pratinjau Bot WhatsApp
        </p>
      </div>

      <div className="flex min-h-[320px] p-4 flex-col justify-start items-start bg-[#E5DDD5] w-full">
        {/* Chat Bubble WhatsApp Dinamis */}
        <div className="flex flex-col rounded-lg bg-[#FFF] p-3 shadow-sm max-w-[90%] w-full relative border border-gray-200">
          <p className="text-[#1E293B] font-iBMPlexSans text-[13px] leading-[20px] whitespace-pre-wrap break-words w-full">
            {message || "Belum ada pesan yang diketik..."}
          </p>
          <span className="text-[#94A3B8] font-iBMPlexSans text-[10px] self-end mt-2">
            12:45
          </span>
        </div>
      </div>
    </div>
  );
}