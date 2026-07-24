"use client";

const categoryLegend = [
  { label: "Aplikasi", color: "bg-[#003366]" },
  { label: "Akun", color: "bg-[#2196f3]" },
  { label: "SSO", color: "bg-[#ffc107]" },
  { label: "Lainnya", color: "bg-[#e0e0e0]" },
];

export default function CategoryDistribution() {
  return (
    <article className="col-[3_/_4] flex flex-col gap-6 rounded-lg border border-[#c3c6d1] bg-white p-6 shadow-sm">
      <h2 className="[font-family:'IBM_Plex_Sans-Medium',Helvetica] text-xl font-medium leading-7 text-[#001e40]">
        Distribusi Kategori Keluhan
      </h2>
      <div className="flex w-full flex-col items-center">
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
  );
}