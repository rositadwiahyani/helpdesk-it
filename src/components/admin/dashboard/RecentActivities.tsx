"use client";

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

const topicRanks = [
  { name: "Pembuatan Akun", count: "42" },
  { name: "SSO Login", count: "28" },
  { name: "Koneksi WiFi", count: "21" },
  { name: "Update Data", count: "15" },
  { name: "Lain-lain", count: "12" },
];

export default function RecentActivities() {
  return (
    <section className="grid h-fit w-full grid-cols-3 gap-6">
      {/* Aktivitas Terkini */}
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

      {/* Top Kategori Keluhan */}
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
  );
}