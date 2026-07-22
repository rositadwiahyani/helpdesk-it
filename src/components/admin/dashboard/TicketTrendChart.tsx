"use client";

import { useState } from "react";

const ticketBars = [
  { date: "Jun 25", height: "h-12", active: false },
  { date: "Jul 02", height: "h-16", active: false },
  { date: "Jul 09", height: "h-20", active: false },
  { date: "Jul 16", height: "h-44", active: true, value: "45" },
  { date: "Jul 23", height: "h-24", active: false },
];

export default function TicketTrendChart() {
  const [chartPeriod, setChartPeriod] = useState<"Weekly" | "Monthly">("Monthly");

  return (
    <article className="col-[1_/_3] flex flex-col gap-6 rounded-lg border border-[#c3c6d1] bg-white px-6 pb-[39.5px] pt-6 shadow-sm">
      <div className="flex w-full items-center justify-between">
        <h2 className="[font-family:'IBM_Plex_Sans-Medium',Helvetica] text-xl font-medium leading-7 text-[#001e40]">
          Tren Tiket Masuk
        </h2>
        <div className="inline-flex items-start rounded bg-[#f3f3f6] p-1">
          {(["Weekly", "Monthly"] as const).map((period) => {
            const isActive = chartPeriod === period;
            return (
              <button
                key={period}
                type="button"
                onClick={() => setChartPeriod(period)}
                className={`px-4 py-1 rounded-sm ${isActive ? "bg-[#001e40] shadow-sm" : "bg-transparent"}`}
              >
                <span className={`text-[11px] font-bold ${isActive ? "text-white" : "text-[#43474f]"}`}>
                  {period}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="relative flex h-64 w-full items-end justify-center gap-3 px-4 pt-10">
        <div className="absolute left-0 top-10 h-px w-full border-t border-[#c3c6d14c]" />
        <div className="absolute left-0 top-[50%] h-0 w-full border-t border-[#c3c6d14c]" />
        {ticketBars.map((bar) => (
          <div key={bar.date} className="relative flex w-[100.4px] flex-col items-center gap-2">
            <div className={`relative w-full ${bar.height} rounded-t-[2px] ${bar.active ? "bg-[#001e40]" : "bg-[#e8e8ea]"}`}>
              {bar.active && (
                <span className="absolute -top-8 left-[36%] flex flex-col items-start rounded-sm bg-[#001e40] px-2 py-1">
                  <span className="text-[10px] font-bold text-white">{bar.value}</span>
                </span>
              )}
            </div>
            <span className={`text-[10px] ${bar.active ? "font-bold text-[#001e40]" : "text-[#43474f]"}`}>
              {bar.date}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}