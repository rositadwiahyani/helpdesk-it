import { FiFolder, FiGrid, FiCheckCircle } from "react-icons/fi";

export default function Stats() {
  const cardData = [
    {
      title: "TOTAL KATEGORI",
      value: "24",
      growth: "Kategori Utama",
      icon: <FiFolder className="w-5 h-5" />,
      color: "bg-blue-50 text-blue-600",
      pillBg: "bg-blue-50/50 text-blue-600",
    },
    {
      title: "SUB-KATEGORI",
      value: "18",
      growth: "Subkategori",
      icon: <FiGrid className="w-5 h-5" />,
      color: "bg-indigo-50 text-indigo-600",
      pillBg: "bg-indigo-50/50 text-indigo-600",
    },
    {
      title: "STATUS AKTIF",
      value: "22",
      growth: "Dari 42 Total Item",
      icon: <FiCheckCircle className="w-5 h-5" />,
      color: "bg-emerald-50 text-emerald-600",
      pillBg: "bg-emerald-50/50 text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-start">
      {cardData.map((card, idx) => (
        <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">{card.title}</p>
              <h3 className="text-3xl font-extrabold text-slate-900">{card.value}</h3>
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
              {card.icon}
            </div>
          </div>
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold w-fit relative z-10 ${card.pillBg}`}>
            {card.growth}
          </div>
        </div>
      ))}
    </div>
  );
}