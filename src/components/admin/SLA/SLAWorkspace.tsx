"use client";

import { useState } from "react";
import SLAHeader from "./SLAHeader";
import SLAToolbar from "./SLAToolbar";
import SLATableSection from "./SLATableSection";
import SLAInfoSection from "./SLAInfoSection";
import SLAHistorySection from "./SLAHistorySection";

export interface SLAItem {
  id: string;
  priority: "KRITIS" | "TINGGI" | "SEDANG" | "RENDAH";
  badgeBg: string;
  badgeTextColor: string;
  responseTime: number; // dalam menit
  resolutionTime: number; // dalam menit
}

const INITIAL_SLA_DATA: SLAItem[] = [
  {
    id: "kritis",
    priority: "KRITIS",
    badgeBg: "bg-[#FFDAD6]",
    badgeTextColor: "text-[#93000A]",
    responseTime: 30,
    resolutionTime: 240,
  },
  {
    id: "tinggi",
    priority: "TINGGI",
    badgeBg: "bg-[#FFEDD5]",
    badgeTextColor: "text-[#9A3412]",
    responseTime: 60,
    resolutionTime: 480,
  },
  {
    id: "sedang",
    priority: "SEDANG",
    badgeBg: "bg-[#DBEAFE]",
    badgeTextColor: "text-[#1E40AF]",
    responseTime: 120,
    resolutionTime: 1440,
  },
  {
    id: "rendah",
    priority: "RENDAH",
    badgeBg: "bg-[#DCFCE7]",
    badgeTextColor: "text-[#166534]",
    responseTime: 240,
    resolutionTime: 2880,
  },
];

export default function SLAWorkspace() {
  const [slaData, setSlaData] = useState<SLAItem[]>(INITIAL_SLA_DATA);

  const handleUpdateSLA = (updatedItem: SLAItem) => {
    setSlaData((prevData) =>
      prevData.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  return (
    <div className="flex max-w-[1440px] p-8 flex-col items-start gap-8 w-full">
      <SLAHeader />

      <div className="flex flex-col items-start rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[01px2px0rgba(0,0,0,0.05)] w-full overflow-hidden">
        <SLAToolbar />
        <SLATableSection slaData={slaData} onUpdateSLA={handleUpdateSLA} />
      </div>

      <div className="flex justify-center items-start gap-6 w-full">
        <SLAInfoSection />
        <SLAHistorySection />
      </div>
    </div>
  );
}