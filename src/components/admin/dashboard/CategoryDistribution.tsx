"use client";

import { useState } from "react";

const categoryLegend = [
  { label: "Aplikasi", color: "bg-[#003366]", value: "80" },
  { label: "Akun", color: "bg-[#2196f3]", value: "40" },
  { label: "SSO", color: "bg-[#ffc107]", value: "20" },
  { label: "Lainnya", color: "bg-[#e0e0e0]", value: "12" },
];

export default function CategoryDistribution() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Menentukan angka di tengah donut chart
  const displayValue = activeCategory 
    ? categoryLegend.find(c => c.label === activeCategory)?.value 
    : "152";

  return (
    // Mempertahankan col-[3_/_4] dan font-family
    <article className="col-span-full lg:col-[3_/_4] flex flex-col gap-6 rounded-lg border border-[#c3c6d1] bg-white p-6 shadow-sm">
      <h2 className="[font-family:'IBM_Plex_Sans-Medium',Helvetica] text-xl font-medium leading-7 text-[#001e40]">
        Distribusi Kategori Keluhan
      </h2>
      <div className="flex w-full flex-col items-center">
        {/* Lingkaran chart */}
        <div 
          onClick={() => setActiveCategory(null)}
          className="relative flex h-44 w-44 items-center justify-center rounded-full border-[22px] border-dashed border-[#003366] mb-6 transition-transform hover:scale-105 cursor-pointer"
          title="Klik untuk reset"
        >
          <div className="flex flex-col items-center justify-center transition-opacity">
            <span className="text-[32px] font-bold text-[#001e40]">{displayValue}</span>
            <span className="text-[10px] font-bold tracking-[1px] text-[#43474f] uppercase">
              {activeCategory || "TOTAL"}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-6">
          {categoryLegend.map((item) => {
            const isActive = activeCategory === item.label;
            return (
              <div 
                key={item.label} 
                onClick={() => setActiveCategory(isActive ? null : item.label)}
                className={`flex items-center gap-2 p-1 -m-1 rounded cursor-pointer transition-colors ${isActive ? "bg-gray-100" : "hover:bg-gray-50"}`}
              >
                <span className={`h-2.5 w-2.5 rounded-xl ${item.color} transition-transform ${isActive ? "scale-125" : ""}`} />
                <span className={`text-[13px] transition-colors ${isActive ? "font-bold text-[#001e40]" : "text-[#43474f]"}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}