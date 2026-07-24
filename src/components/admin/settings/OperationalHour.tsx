import React, { ChangeEvent } from "react";

interface OperationalHourProps {
  weekdayStart: string;
  weekdayEnd: string;
  isWeekendOff: boolean;
  onWeekdayStartChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onWeekdayEndChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onWeekendOffToggle: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function OperationalHour({
  weekdayStart,
  weekdayEnd,
  isWeekendOff,
  onWeekdayStartChange,
  onWeekdayEndChange,
  onWeekendOffToggle
}: OperationalHourProps) {
  return (
    <div className="flex pt-6 pr-6 pb-[26px] pl-6 flex-col items-start gap-4 rounded-lg border border-[#C3C6D1] bg-[#FFF] w-full">
      <div className="flex items-center gap-3 w-full">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-col items-start w-fit ">
          <path d="M13.3 14.7L14.7 13.3L11 9.6V5H9V10.4L13.3 14.7ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2167 18 14.1042 17.2208 15.6625 15.6625C17.2208 14.1042 18 12.2167 18 10C18 7.78333 17.2208 5.89583 15.6625 4.3375C14.1042 2.77917 12.2167 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18Z" fill="#0059BB"/>
        </svg>
        <div className="flex flex-col items-start w-fit">
          <p className="text-[#1A1C1E] font-iBMPlexSans text-base font-semibold leading-6 w-fit">
            Jam Operasional
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start gap-3 w-full">
        <div className="flex py-2 px-0 justify-between items-center border-b border-b-[rgba(195,198,209,0.50)] w-full">
          <div className="flex flex-col items-start w-fit">
            <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
              Senin - Jumat
            </p>
          </div>
          <div className="flex items-center gap-1 w-fit">
            <select
              value={weekdayStart}
              onChange={onWeekdayStartChange}
              className="text-[#1A1C1E] font-iBMPlexSans text-sm font-semibold leading-5 bg-transparent outline-none cursor-pointer"
            >
              <option value="07:00">07:00</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
            </select>
            <span className="text-[#1A1C1E] font-iBMPlexSans text-sm font-semibold leading-5">-</span>
            <select
              value={weekdayEnd}
              onChange={onWeekdayEndChange}
              className="text-[#1A1C1E] font-iBMPlexSans text-sm font-semibold leading-5 bg-transparent outline-none cursor-pointer"
            >
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
            </select>
          </div>
        </div>
        <div className="flex py-2 px-0 justify-between items-center w-full">
          <div className="flex flex-col items-start w-fit">
            <p className="text-[#43474F] font-iBMPlexSans text-sm leading-5 w-fit">
              Sabtu - Minggu
            </p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer w-fit">
            <input 
              type="checkbox" 
              checked={isWeekendOff} 
              onChange={onWeekendOffToggle}
              className="cursor-pointer"
            />
            <p className={`${isWeekendOff ? 'text-[#BA1A1A]' : 'text-[#1A1C1E]'} font-iBMPlexSans text-sm font-semibold leading-5 w-fit`}>
              {isWeekendOff ? "Libur" : "Buka"}
            </p>
          </label>
        </div>
      </div>
    </div>
  );
}