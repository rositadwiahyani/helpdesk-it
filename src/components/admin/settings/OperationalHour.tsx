import React, { useState } from "react";

export interface DaySchedule {
  type: "dropdown" | "manual" | "off";
  start: string;
  end: string;
  manualText: string;
}

interface OperationalHourProps {
  weekday: DaySchedule;
  weekend: DaySchedule;
  onChangeWeekday: (updated: DaySchedule) => void;
  onChangeWeekend: (updated: DaySchedule) => void;
}

export default function OperationalHour({
  weekday,
  weekend,
  onChangeWeekday,
  onChangeWeekend,
}: OperationalHourProps) {
  // Menghasilkan array jam 24 format "00:00" s/d "23:00"
  const hoursList = Array.from({ length: 24 }, (_, i) => {
    const hour = i < 10 ? `0${i}` : `${i}`;
    return `${hour}:00`;
  });

  const renderScheduleInput = (
    label: string,
    schedule: DaySchedule,
    onChange: (updated: DaySchedule) => void
  ) => {
    return (
      <div className="flex flex-col gap-2 py-3 border-b border-b-[rgba(195,198,209,0.50)] last:border-b-0 w-full">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <p className="text-[#43474F] font-iBMPlexSans text-sm font-medium">{label}</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onChange({ ...schedule, type: schedule.type === "manual" ? "dropdown" : "manual" })
              }
              className="text-xs text-[#0059BB] font-semibold underline cursor-pointer hover:opacity-80"
            >
              {schedule.type === "manual" ? "Mode Dropdown" : "Ketik Manual"}
            </button>
            <button
              type="button"
              onClick={() =>
                onChange({ ...schedule, type: schedule.type === "off" ? "dropdown" : "off" })
              }
              className={`text-xs px-2 py-0.5 rounded font-semibold cursor-pointer border ${
                schedule.type === "off"
                  ? "bg-[#BA1A1A] text-white border-[#BA1A1A]"
                  : "bg-gray-100 text-[#43474F] border-gray-300"
              }`}
            >
              {schedule.type === "off" ? "Status: Libur" : "Set Libur"}
            </button>
          </div>
        </div>

        {schedule.type === "off" && (
          <div className="p-2 bg-red-50 rounded text-red-700 text-xs font-medium">
            Status: Libur (Layanan Nonaktif)
          </div>
        )}

        {schedule.type === "dropdown" && (
          <div className="flex items-center gap-2">
            <select
              value={schedule.start}
              onChange={(e) => onChange({ ...schedule, start: e.target.value })}
              className="p-1.5 border border-[#C3C6D1] rounded text-[#1A1C1E] font-iBMPlexSans text-sm bg-white outline-none cursor-pointer"
            >
              {hoursList.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            <span className="text-[#1A1C1E] text-sm font-bold">-</span>
            <select
              value={schedule.end}
              onChange={(e) => onChange({ ...schedule, end: e.target.value })}
              className="p-1.5 border border-[#C3C6D1] rounded text-[#1A1C1E] font-iBMPlexSans text-sm bg-white outline-none cursor-pointer"
            >
              {hoursList.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        )}

        {schedule.type === "manual" && (
          <input
            type="text"
            value={schedule.manualText}
            onChange={(e) => onChange({ ...schedule, manualText: e.target.value })}
            placeholder="Contoh: 08:00 - 17:00 WIB / 24 Jam"
            className="w-full p-2 border border-[#C3C6D1] rounded text-sm text-[#1A1C1E] outline-none focus:border-[#0059BB]"
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex pt-6 pr-6 pb-[26px] pl-6 flex-col items-start gap-4 rounded-lg border border-[#C3C6D1] bg-[#FFF] w-full">
      <div className="flex items-center gap-3 w-full">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.3 14.7L14.7 13.3L11 9.6V5H9V10.4L13.3 14.7ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2167 18 14.1042 17.2208 15.6625 15.6625C17.2208 14.1042 18 12.2167 18 10C18 7.78333 17.2208 5.89583 15.6625 4.3375C14.1042 2.77917 12.2167 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18Z" fill="#0059BB"/>
        </svg>
        <p className="text-[#1A1C1E] font-iBMPlexSans text-base font-semibold">
          Jam Operasional
        </p>
      </div>

      <div className="flex flex-col w-full">
        {renderScheduleInput("Senin - Jumat", weekday, onChangeWeekday)}
        {renderScheduleInput("Sabtu - Minggu", weekend, onChangeWeekend)}
      </div>
    </div>
  );
}