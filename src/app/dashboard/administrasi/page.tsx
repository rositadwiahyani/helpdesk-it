"use client";
import { useState } from "react";

// Data dummy dari hasil convert Figma
const summaryCards = [
  { label: "TIKET CREATED (HARI INI)", value: "2", trend: "100%" },
  { label: "BELUM DIVERIFIKASI", value: "5" },
  { label: "TIKET OPEN", value: "0" },
  { label: "DIPROSES", value: "5" },
];

const ticketBars = [
  { date: "Jun 25", height: "h-12", active: false },
  { date: "Jul 02", height: "h-16", active: false },
  { date: "Jul 09", height: "h-20", active: false },
  { date: "Jul 16", height: "h-44", active: true, value: "45" },
  { date: "Jul 23", height: "h-24", active: false },
];

const categoryLegend = [
  { label: "Aplikasi", color: "bg-[#003366]" },
  { label: "Akun", color: "bg-[#2196f3]" },
  { label: "SSO", color: "bg-[#ffc107]" },
  { label: "Lainnya", color: "bg-[#e0e0e0]" },
];

// Data tabel per tab. "Department" tetap seperti semula.
// "Topics" dan "Agent" baru ditambahkan sesuai desain.
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

const topicRanks = [
  { name: "Pembuatan Akun", count: "42" },
  { name: "SSO Login", count: "28" },
  { name: "Koneksi WiFi", count: "21" },
  { name: "Update Data", count: "15" },
  { name: "Lain-lain", count: "12" },
];

const activities = [
  {
    iconBox: "bg-emerald-50 border-emerald-100",
    content: (
      <>
        <span className="font-bold text-emerald-700">WhatsApp Gateway</span>
        <span className="[font-family:'IBM_Plex_Sans-Regular',Helvetica] text-slate-600"> baru saja membuat tiket </span>
        <span className="font-bold text-[#0059bb]">#TIC-4421</span>
      </>
    ),
    time: "2 MENIT YANG LALU",
  },
  {
    iconBox: "bg-blue-50 border-blue-100",
    content: (
      <>
        <span className="font-bold text-slate-800">Budi Santoso (Agent)</span>
        <span className="[font-family:'IBM_Plex_Sans-Regular',Helvetica] text-slate-600"> memperbarui status tiket </span>
        <span className="font-bold text-[#0059bb]">#TIC-4418</span>
        <span className="[font-family:'IBM_Plex_Sans-Regular',Helvetica] text-slate-600"> ke </span>
        <span className="font-bold text-[#001e40]">Diproses</span>
      </>
    ),
    time: "15 MENIT YANG LALU",
  },
];

const tableTabs = ["Department", "Topics", "Agent"] as const;
type TableTab = (typeof tableTabs)[number];

// Mapping tab aktif -> label kolom pertama + data rows yang harus ditampilkan
const tableDataByTab: Record<TableTab, { columnLabel: string; rows: typeof departments }> = {
  Department: { columnLabel: "DEPARTMENT NAME", rows: departments },
  Topics: { columnLabel: "TOPICS", rows: topicsTableData },
  Agent: { columnLabel: "AGENT", rows: agentsTableData },
};

export default function DashboardAdministrasiPage() {
  const [chartPeriod, setChartPeriod] = useState<"Weekly" | "Monthly">("Monthly");
  const [activeTableTab, setActiveTableTab] = useState<TableTab>("Department");

  // Data yang sedang ditampilkan di tabel, otomatis ikut tab yang aktif
  const activeTableData = tableDataByTab[activeTableTab];

  return (
    <div className="relative z-0 flex w-full flex-col items-start gap-6 p-8 max-w-[1024px] mx-auto">
      
      {/* Title & Filter */}
      <section className="flex w-full items-end justify-around">
        <div className="flex w-full flex-1 items-start justify-between">
          <div className="inline-flex flex-col items-start gap-1">
            <h1 className="[font-family:'Nimbus_Sans-Bold',Helvetica] text-2xl font-bold leading-8 text-gray-900">
              Dashboard Administrator
            </h1>
            <p className="[font-family:'Nimbus_Sans-Regular',Helvetica] text-sm font-normal leading-5 text-gray-500">
              Ringkasan aktivitas dan metric sistem helpdesk.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex min-w-[280px] items-center justify-between rounded-lg border border-[#c3c6d1] bg-white px-4 py-2 shadow-sm"
          >
            <span className="inline-flex items-center">
              <span className="[font-family:'Nimbus_Sans-Regular',Helvetica] text-sm leading-5 text-gray-400">
                Report timeframe:
              </span>
              <span className="[font-family:'Nimbus_Sans-Bold',Helvetica] pl-2 text-sm font-bold leading-5 text-gray-700">
                06/21/2026 - 07/21/2026
              </span>
            </span>
          </button>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="flex w-full items-start justify-center gap-6">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className="flex flex-1 flex-col items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <p className="[font-family:'Nimbus_Sans-Bold',Helvetica] text-[10px] font-bold tracking-[1px] leading-[15px] text-gray-400">
              {card.label}
            </p>
            <div className="relative h-10 w-full">
              <span className="[font-family:'Nimbus_Sans-Bold',Helvetica] text-4xl font-bold leading-10 text-gray-900">
                {card.value}
              </span>
              {card.trend && (
                <span className="absolute left-8 top-[13px] inline-flex items-center gap-0.5 pl-2">
                  <span className="[font-family:'Nimbus_Sans-Bold',Helvetica] text-xs font-bold leading-4 text-green-500">
                    ↑ {card.trend}
                  </span>
                </span>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* Charts Section */}
      <section className="grid h-fit w-full grid-cols-3 grid-rows-[378px] gap-6">
        {/* Tren Tiket */}
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

        {/* Distribusi Kategori */}
        <article className="col-[3_/_4] flex flex-col gap-6 rounded-lg border border-[#c3c6d1] bg-white p-6 shadow-sm">
          <h2 className="[font-family:'IBM_Plex_Sans-Medium',Helvetica] text-xl font-medium leading-7 text-[#001e40]">
            Distribusi Kategori Keluhan
          </h2>
          <div className="flex w-full flex-col items-center">
            {/* Donut Chart Placeholder */}
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[22px] border-dashed border-[#003366] mb-6">
              <div className="flex flex-col items-center justify-center">
                <span className="text-[32px] font-bold text-[#001e40]">152</span>
                <span className="text-[10px] font-bold tracking-[1px] text-[#43474f]">TOTAL</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6">
              {categoryLegend.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-xl ${item.color}`} />
                  <span className="text-[13px] text-[#43474f]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      {/* Table Section */}
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

      {/* Bottom Section: Audit Log & Top Categories */}
      <section className="grid h-fit w-full grid-cols-3 gap-6">
        <article className="col-[1_/_3] flex flex-col gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">Aktivitas Terkini (Audit Log)</h2>
          <div className="flex flex-col gap-6">
            {activities.map((activity, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded border ${activity.iconBox}`}></span>
                <div className="flex flex-col gap-1">
                  <p className="text-sm">{activity.content}</p>
                  <span className="text-[10px] font-bold text-slate-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="col-[3_/_4] flex flex-col gap-6 rounded-lg border border-[#c3c6d1] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-medium text-[#001e40]">Top Kategori Keluhan</h2>
          <ol className="flex flex-col gap-2">
            {topicRanks.map((topic, index) => {
              const isFirst = index === 0;
              return (
                <li key={topic.name} className="flex items-center justify-between p-2">
                  <span className="flex items-center gap-3">
                    <span className={`flex h-7 w-7 items-center justify-center rounded ${isFirst ? "bg-[#001e40]" : "bg-[#e8e8ea]"}`}>
                      <span className={`text-[11px] font-bold ${isFirst ? "text-white" : "text-[#43474f]"}`}>{index + 1}</span>
                    </span>
                    <span className={`text-sm font-bold ${isFirst ? "text-[#1a1c1e]" : "text-[#43474f]"}`}>{topic.name}</span>
                  </span>
                  <span className={`text-[13px] font-bold ${isFirst ? "text-[#001e40]" : "text-[#43474f]"}`}>{topic.count}</span>
                </li>
              );
            })}
          </ol>
        </article>
      </section>
    </div>
  );
}