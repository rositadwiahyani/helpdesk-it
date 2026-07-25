"use client";

import { useState } from "react";

// Mempertahankan data asli sebagai data bulanan
const ticketBarsMonthly = [
  { date: "Jun 25", height: "h-12", active: false },
  { date: "Jul 02", height: "h-16", active: false },
  { date: "Jul 09", height: "h-20", active: false },
  { date: "Jul 16", height: "h-44", active: true, value: "45" },
  { date: "Jul 23", height: "h-24", active: false },
];

// Menambahkan data baru untuk fungsi tombol Weekly
const ticketBarsWeekly = [
  { date: "Sen", height: "h-16", active: false, value: "12" },
  { date: "Sel", height: "h-24", active: false, value: "18" },
  { date: "Rab", height: "h-20", active: false, value: "15" },
  { date: "Kam", height: "h-32", active: true, value: "24" },
  { date: "Jum", height: "h-12", active: false, value: "8" },
];

export default function TicketTrendChart() {
  const [chartPeriod, setChartPeriod] = useState<"Weekly" | "Monthly">("Monthly");
  const ticketBars = chartPeriod === "Monthly" ? ticketBarsMonthly : ticketBarsWeekly;

  return (
    // Mempertahankan col-[1_/_3] dan menambah col-span-full untuk layar kecil
    <article className="col-span-full lg:col-[1_/_3] flex flex-col gap-6 rounded-lg border border-[#c3c6d1] bg-white px-6 pb-[39.5px] pt-6 shadow-sm">
      <div className="flex w-full flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="[font-family:'IBM_Plex_Sans-Medium',Helvetica] text-xl font-medium leading-7 text-[#001e40]">
          Tren Tiket Masuk
        </h2>
        <div className="inline-flex items-start rounded bg-[#f3f3f6] p-1 w-fit">
          {(["Weekly", "Monthly"] as const).map((period) => {
            const isActive = chartPeriod === period;
            return (
              <button
                key={period}
                type="button"
                onClick={() => setChartPeriod(period)}
                className={`px-4 py-1 rounded-sm transition-colors ${isActive ? "bg-[#001e40] shadow-sm" : "bg-transparent hover:bg-gray-200"}`}
              >
                <span className={`text-[11px] font-bold ${isActive ? "text-white" : "text-[#43474f]"}`}>
                  {period}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Container dibuat overflow-x-auto agar bar tidak tergencet di layar HP */}
      <div className="relative flex h-64 w-full items-end justify-between sm:justify-center gap-3 px-4 pt-10 overflow-x-auto">
        {/* Lebar min-w ditambahkan agar garis putus-putus tetap panjang meski di-scroll */}
        <div className="absolute left-0 top-10 h-px w-full min-w-[500px] border-t border-[#c3c6d14c]" />
        <div className="absolute left-0 top-[50%] h-0 w-full min-w-[500px] border-t border-[#c3c6d14c]" />
        
        {ticketBars.map((bar) => (
          <div key={bar.date} className="relative flex w-[100.4px] shrink-0 flex-col items-center gap-2 group cursor-pointer">
            <div className={`relative w-full ${bar.height} rounded-t-[2px] transition-all duration-300 ${bar.active ? "bg-[#001e40]" : "bg-[#e8e8ea] group-hover:bg-[#c3c6d1]"}`}>
              {/* Tooltip muncul jika active ATAU jika bar di-hover */}
              {(bar.active || bar.value) && (
                <span className={`absolute -top-8 left-[36%] flex flex-col items-start rounded-sm bg-[#001e40] px-2 py-1 transition-opacity ${bar.active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                  <span className="text-[10px] font-bold text-white">{bar.value || "0"}</span>
                </span>
              )}
            </div>
            <span className={`text-[10px] transition-colors ${bar.active ? "font-bold text-[#001e40]" : "text-[#43474f] group-hover:text-[#001e40]"}`}>
              {bar.date}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}