import React, { ChangeEvent } from "react";

interface BotMessageProps {
  isActive: boolean;
  onToggleActive: () => void;
  message: string;
  onMessageChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isError: boolean;
}

export default function BotMessageSection({ 
  isActive, 
  onToggleActive, 
  message, 
  onMessageChange, 
  isError 
}: BotMessageProps) {
  return (
    <div className="flex flex-col items-start rounded-lg border border-[#C3C6D1] bg-[#FFF] w-full overflow-hidden">
      <div className="flex p-6 justify-between items-center border-b border-b-[#C3C6D1] bg-[rgba(243,243,246,0.30)] w-full">
        <div className="flex flex-col items-start w-fit">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#1A1C1E] font-iBMPlexSans text-xl font-medium leading-7 w-fit">
              Pesan Utama Bot WhatsApp
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#43474F] font-iBMPlexSans text-[13px] leading-[18px] w-fit">
              Teks ini akan dikirim pertama kali saat pelapor menghubungi bot WhatsApp.
            </p>
          </div>
        </div>
        <div className="flex items-start w-fit">
          <div 
            onClick={onToggleActive}
            role="switch"
            aria-checked={isActive}
            className={`flex pt-1 pr-3 pb-[5px] pl-3 items-center gap-1 rounded-xl w-fit h-full cursor-pointer transition-colors ${
              isActive ? 'bg-[rgba(0,89,187,0.10)]' : 'bg-[#E8E8EA]'
            }`}
          >
            <svg
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex flex-col items-start w-fit"
            >
              <path
                d="M3.82083 9.45L6.83958 5.83333H4.50625L4.92917 2.52292L2.23125 6.41667H4.25833L3.82083 9.45ZM2.33333 11.6667L2.91667 7.58333H0L5.25 0H6.41667L5.83333 4.66667H9.33333L3.5 11.6667H2.33333Z"
                fill={isActive ? "#0059BB" : "#43474F"}
              />
            </svg>
            <p className={`font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em] ${
              isActive ? 'text-[#0059BB]' : 'text-[#43474F]'
            }`}>
              {isActive ? "Aktif" : "Nonaktif"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex p-6 flex-col items-start gap-2 w-full">
        <div className="flex flex-col items-start w-full">
          <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-full tracking-[0.05em]">
            Teks Pesan
          </p>
        </div>
        <div className="flex pb-1.5 flex-col items-start w-full relative">
          <div className={`flex pt-4 pr-4 pb-9 pl-4 justify-center items-start rounded border bg-[#F3F3F6] w-full overflow-hidden ${
            isError ? 'border-red-500' : 'border-[#C3C6D1]'
          }`}>
            <textarea
              value={message}
              onChange={onMessageChange}
              maxLength={4096}
              placeholder="Masukkan pesan bot..."
              className="text-[#1A1C1E] font-jetBrainsMono text-[13px] leading-5 w-full min-h-[150px] bg-transparent border-none outline-none resize-none"
            />
          </div>
          <div className="flex items-start absolute right-4 bottom-4 w-fit">
            <div className="flex pt-2 pr-2 pb-3.5 pl-2 flex-col justify-center items-center rounded border border-[#C3C6D1] bg-[rgba(249,249,252,0.80)] w-fit">
              <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex justify-center items-start w-fit">
                <path d="M4.5 12C4.0875 12 3.73438 11.8531 3.44062 11.5594C3.14687 11.2656 3 10.9125 3 10.5V1.5C3 1.0875 3.14687 0.734375 3.44062 0.440625C3.73438 0.146875 4.0875 0 4.5 0H11.25C11.6625 0 12.0156 0.146875 12.3094 0.440625C12.6031 0.734375 12.75 1.0875 12.75 1.5V10.5C12.75 10.9125 12.6031 11.2656 12.3094 11.5594C12.0156 11.8531 11.6625 12 11.25 12H4.5ZM4.5 10.5H11.25V1.5H4.5V10.5ZM1.5 15C1.0875 15 0.734375 14.8531 0.440625 14.5594C0.146875 14.2656 0 13.9125 0 13.5V3H1.5V13.5H9.75V15H1.5ZM4.5 10.5V1.5V10.5Z" fill="#1A1C1E"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap pt-2 justify-between items-center gap-x-4 gap-y-2 w-full">
          <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
            <p className="text-[#43474F] font-iBMPlexSans text-[13px] font-bold leading-[18px] w-fit">Tips Format WA: Gunakan </p>
            <button className="cursor-pointer text-nowrap inline-flex py-0 px-1 justify-center items-center rounded-sm bg-[#E8E8EA] w-fit h-[15px]">
              <p className="text-[#43474F] font-liberationMono text-[13px] leading-[18px] w-fit">*teks*</p>
            </button>
            <p className="text-[#43474F] font-iBMPlexSans text-[13px] leading-[18px] w-fit"> untuk tebal &#40;bold&#41;, </p>
            <button className="cursor-pointer text-nowrap inline-flex py-0 px-1 justify-center items-center rounded-sm bg-[#E8E8EA] w-fit h-[15px]">
              <p className="text-[#43474F] font-liberationMono text-[13px] leading-[18px] w-fit">_teks_</p>
            </button>
            <p className="text-[#43474F] font-iBMPlexSans text-[13px] leading-[18px] w-fit"> untuk miring &#40;italic&#41;.</p>
          </div>
          <div className="flex pr-[21px] flex-col items-start w-fit">
            <p className={`font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em] ${
              isError ? 'text-red-500' : 'text-[#43474F]'
            }`}>
              Karakter: {message.length} &#x2F; 4096
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}