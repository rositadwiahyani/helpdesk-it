import React, { useState } from "react";

interface EmailNotificationProps {
  initialEmail?: string;
  onSaveEmail: (email: string) => void;
}

export default function EmailNotification({ initialEmail = "helpdesk@undip.ac.id", onSaveEmail }: EmailNotificationProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(initialEmail);

  const handleToggleEdit = () => {
    if (isEditing && onSaveEmail) {
      onSaveEmail(email);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex p-6 flex-col items-start gap-4 rounded-lg border border-[#C3C6D1] bg-[#FFF] w-full">
      <div className="flex items-center gap-3 w-full">
        <svg
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex flex-col items-start w-fit "
        >
          <path
            d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM10 9L2 4V14H18V4L10 9ZM10 7L18 2H2L10 7ZM2 4V2V4V14V4Z"
            fill="#0059BB"
          />
        </svg>
        <div className="flex flex-col items-start w-fit">
          <p className="text-[#1A1C1E] font-iBMPlexSans text-base font-semibold leading-6 w-fit">
            Email Notifikasi
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full">
        <div className="flex p-2 flex-col items-start rounded border border-[#C3C6D1] bg-[#F3F3F6] w-full overflow-hidden">
          <div className="flex flex-col items-start w-full overflow-hidden">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              className={`text-[#1A1C1E] font-iBMPlexSans text-sm leading-5 w-full bg-transparent outline-none ${
                isEditing ? "border-b border-[#0059BB]" : "border-none"
              }`}
            />
          </div>
        </div>
        <button 
          onClick={handleToggleEdit}
          className="cursor-pointer text-nowrap flex flex-col justify-center items-center w-fit"
        >
          <p className="text-[#0059BB] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
            {isEditing ? "Simpan" : "Ubah"}
          </p>
        </button>
      </div>
      <div className="flex flex-col items-start w-full">
        <p className="text-[#43474F] font-iBMPlexSans text-[11px] leading-[16.5px] w-full">
          Alamat email utama untuk pengiriman notifikasi tiket sistem.
        </p>
      </div>
    </div>
  );
}