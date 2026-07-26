'use client';

import {
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

interface SummaryCardsProps {
  data?: {
    today: number;
    growth: string;
    open: number;
    overdue: number;
    failedMessages: number;
  };
}

export default function SummaryCards({ data }: SummaryCardsProps) {
  const defaultData = data || { today: 0, growth: "0", open: 0, overdue: 0, failedMessages: 0 };
  
  const cardData = [
    {
      title: "Tiket Hari Ini",
      value: defaultData.today.toString(),
      growth: `${defaultData.growth}% vs yesterday`,
      icon: <FiFileText className="w-5 h-5" />,
      color: "bg-blue-50 text-blue-600",
      pillBg: "bg-blue-50/50 text-blue-600",
    },
    {
      title: "Open Ticket",
      value: defaultData.open.toString(),
      growth: "Needs attention",
      icon: <FiClock className="w-5 h-5" />,
      color: "bg-slate-50 text-slate-700",
      pillBg: "bg-slate-50/50 text-slate-600",
    },
    {
      title: "Overdue SLA",
      value: defaultData.overdue.toString(),
      growth: "Action required",
      icon: <FiCheckCircle className="w-5 h-5" />,
      color: "bg-red-50 text-red-500",
      pillBg: "bg-red-50/50 text-red-600",
    },
    {
      title: "Failed Messages",
      value: defaultData.failedMessages.toString(),
      growth: "System status",
      icon: <FiXCircle className="w-5 h-5" />,
      color: "bg-slate-50 text-slate-400",
      pillBg: "bg-slate-50/50 text-slate-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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