"use client";

import { useState } from "react";

const departments = [
  { name: "UPT TIK - Infrastruktur", opened: "12", assigned: "8", closed: "45", overdue: "2" },
  { name: "UPT TIK - Sistem Informasi", opened: "24", assigned: "15", closed: "102", overdue: "0" },
  { name: "Biro Akademik", opened: "5", assigned: "2", closed: "18", overdue: "0" },
];

const topicsTableData = [
  { name: "Pembuatan Akun", opened: "3", assigned: "0", closed: "1", overdue: "0" },
  { name: "Keamanan Sistem", opened: "1", assigned: "0", closed: "0", overdue: "1" },
  { name: "E-Office", opened: "1", assigned: "0", closed: "0", overdue: "0" },
  { name: "SSD", opened: "0", assigned: "1", closed: "1", overdue: "1" },
  { name: "Website", opened: "0", assigned: "0", closed: "1", overdue: "0" },
  { name: "Wifi", opened: "0", assigned: "1", closed: "0", overdue: "1" },
  { name: "Aplikasi", opened: "0", assigned: "2", closed: "0", overdue: "2" },
  { name: "Mandala", opened: "0", assigned: "1", closed: "0", overdue: "1" },
];

const agentsTableData = [
  { name: "Belum Ditunjuk", opened: "5", assigned: "3", closed: "3", overdue: "4" },
  { name: "Andi Software", opened: "0", assigned: "2", closed: "0", overdue: "2" },
];

const tableTabs = ["Department", "Topics", "Agent"] as const;
type TableTab = (typeof tableTabs)[number];

const tableDataByTab: Record<TableTab, { columnLabel: string; rows: typeof departments }> = {
  Department: { columnLabel: "DEPARTMENT NAME", rows: departments },
  Topics: { columnLabel: "TOPICS", rows: topicsTableData },
  Agent: { columnLabel: "AGENT", rows: agentsTableData },
};

export default function OverviewTable() {
  const [activeTableTab, setActiveTableTab] = useState<TableTab>("Department");
  const activeTableData = tableDataByTab[activeTableTab];

  return (
    <section className="flex w-full flex-col overflow-hidden rounded-lg border border-[#c3c6d1] bg-white shadow-sm">
      <div className="flex w-full items-start border-b border-[#c3c6d1] bg-white px-4">
        {tableTabs.map((tab) => {
          const isActive = activeTableTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTableTab(tab)}
              className={`px-6 ${isActive ? "border-b-2 border-[#001e40] bg-[#001e400d] py-4" : "border-b-2 border-transparent py-[17px]"}`}
            >
              <span className={`text-sm ${isActive ? "font-bold text-[#001e40]" : "text-[#43474f]"}`}>{tab}</span>
            </button>
          );
        })}
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[958px] border-collapse">
          <thead className="bg-[#f3f3f6]">
            <tr>
              <th className="w-[363px] text-left p-4 text-[11px] font-bold text-[#43474f]">
                {activeTableData.columnLabel}
              </th>
              <th className="text-center p-4 text-[11px] font-bold text-[#43474f]">OPENED</th>
              <th className="text-center p-4 text-[11px] font-bold text-[#43474f]">ASSIGNED</th>
              <th className="text-center p-4 text-[11px] font-bold text-[#43474f]">CLOSED</th>
              <th className="text-center p-4 text-[11px] font-bold text-[#43474f]">OVERDUE</th>
            </tr>
          </thead>
          <tbody>
            {activeTableData.rows.map((row) => (
              <tr key={row.name} className="border-t border-[#c3c6d1]">
                <th className="p-4 text-left text-sm font-bold text-[#001e40]">{row.name}</th>
                <td className="p-4 text-center text-sm text-[#43474f]">{row.opened}</td>
                <td className="p-4 text-center text-sm text-[#43474f]">{row.assigned}</td>
                <td className="p-4 text-center text-sm text-[#43474f]">{row.closed}</td>
                <td className={`p-4 text-center text-sm ${Number(row.overdue) > 0 ? "font-bold text-[#ba1a1a]" : "text-[#43474f]"}`}>
                  {row.overdue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}