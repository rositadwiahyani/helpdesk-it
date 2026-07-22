"use client";

const summaryCards = [
  { label: "TIKET CREATED (HARI INI)", value: "2", trend: "100%" },
  { label: "BELUM DIVERIFIKASI", value: "5" },
  { label: "TIKET OPEN", value: "0" },
  { label: "DIPROSES", value: "5" },
];

export default function SummaryCards() {
  return (
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
  );
}