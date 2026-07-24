"use client";

interface SettingsFormActionsProps {
  onCancel: () => void;
  onSave: () => void;
}

export default function SettingsFormActions({ onCancel, onSave }: SettingsFormActionsProps) {
  return (
    <div className="flex flex-wrap py-4 px-8 justify-between items-center gap-4 sticky bottom-0 border-t border-t-[#C3C6D1] bg-[rgba(249,249,252,0.80)] w-full">
      <div className="flex items-center gap-2 w-fit">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex flex-col items-start w-fit "
        >
          <path
            d="M6 10H7.33333V6H6V10ZM6.66667 4.66667C6.85556 4.66667 7.01389 4.60278 7.14167 4.475C7.26944 4.34722 7.33333 4.18889 7.33333 4C7.33333 3.81111 7.26944 3.65278 7.14167 3.525C7.01389 3.39722 6.85556 3.33333 6.66667 3.33333C6.47778 3.33333 6.31944 3.39722 6.19167 3.525C6.06389 3.65278 6 3.81111 6 4C6 4.18889 6.06389 4.34722 6.19167 4.475C6.31944 4.60278 6.47778 4.66667 6.66667 4.66667ZM6.66667 13.3333C5.74444 13.3333 4.87778 13.1583 4.06667 12.8083C3.25556 12.4583 2.55 11.9833 1.95 11.3833C1.35 10.7833 0.875 10.0778 0.525 9.26667C0.175 8.45555 0 7.58889 0 6.66667C0 5.74444 0.175 4.87778 0.525 4.06667C0.875 3.25556 1.35 2.55 1.95 1.95C2.55 1.35 3.25556 0.875 4.06667 0.525C4.87778 0.175 5.74444 0 6.66667 0C7.58889 0 8.45555 0.175 9.26667 0.525C10.0778 0.875 10.7833 1.35 11.3833 1.95C11.9833 2.55 12.4583 3.25556 12.8083 4.06667C13.1583 4.87778 13.3333 5.74444 13.3333 6.66667C13.3333 7.58889 13.1583 8.45555 12.8083 9.26667C12.4583 10.0778 11.9833 10.7833 11.3833 11.3833C10.7833 11.9833 10.0778 12.4583 9.26667 12.8083C8.45555 13.1583 7.58889 13.3333 6.66667 13.3333ZM6.66667 12C8.15556 12 9.41667 11.4833 10.45 10.45C11.4833 9.41667 12 8.15556 12 6.66667C12 5.17778 11.4833 3.91667 10.45 2.88333C9.41667 1.85 8.15556 1.33333 6.66667 1.33333C5.17778 1.33333 3.91667 1.85 2.88333 2.88333C1.85 3.91667 1.33333 5.17778 1.33333 6.66667C1.33333 8.15556 1.85 9.41667 2.88333 10.45C3.91667 11.4833 5.17778 12 6.66667 12Z"
            fill="#43474F"
          />
        </svg>
        <p className="text-[#43474F] font-iBMPlexSans text-[13px] leading-[18px] w-fit">
          Perubahan akan segera diterapkan pada layanan bot aktif.
        </p>
      </div>
      <div className="flex items-center gap-3 w-fit">
        <button 
          onClick={onCancel}
          className="cursor-pointer text-nowrap flex py-2.5 px-6 flex-col justify-center items-center rounded border border-[#C3C6D1] w-fit"
        >
          <p className="text-[#1A1C1E] font-iBMPlexSans text-base font-semibold leading-6 w-fit">
            Batalkan
          </p>
        </button>
        <div 
          onClick={onSave}
          className="flex py-[11px] px-8 items-center gap-2 rounded bg-[#001E40] w-fit relative cursor-pointer"
        >
          <div className="absolute rounded bg-[rgba(255,255,255,0.00)] shadow-[010px15px-3pxrgba(0,0,0,0.10),04px6px-4pxrgba(0,0,0,0.10)] w-[228px] h-[46px]"></div>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-col items-center w-fit "
          >
            <path
              d="M15 3.33333V13.3333C15 13.7917 14.8368 14.184 14.5104 14.5104C14.184 14.8368 13.7917 15 13.3333 15H1.66667C1.20833 15 0.815972 14.8368 0.489583 14.5104C0.163194 14.184 0 13.7917 0 13.3333V1.66667C0 1.20833 0.163194 0.815972 0.489583 0.489583C0.815972 0.163194 1.20833 0 1.66667 0H11.6667L15 3.33333ZM13.3333 4.04167L10.9583 1.66667H1.66667V13.3333H13.3333V4.04167ZM7.5 12.5C8.19444 12.5 8.78472 12.2569 9.27083 11.7708C9.75694 11.2847 10 10.6944 10 10C10 9.30556 9.75694 8.71528 9.27083 8.22917C8.78472 7.74306 8.19444 7.5 7.5 7.5C6.80556 7.5 6.21528 7.74306 5.72917 8.22917C5.24306 8.71528 5 9.30556 5 10C5 10.6944 5.24306 11.2847 5.72917 11.7708C6.21528 12.2569 6.80556 12.5 7.5 12.5ZM2.5 5.83333H10V2.5H2.5V5.83333ZM1.66667 4.04167V13.3333V1.66667V4.04167Z"
              fill="white"
            />
          </svg>
          <p className="text-[#FFF] font-iBMPlexSans text-base font-semibold leading-6 w-fit">
            Simpan Perubahan
          </p>
        </div>
      </div>
    </div>
  );
}