import { FiFolder, FiGrid, FiCheckCircle } from "react-icons/fi";

export default function Stats() {
  const cardData = [
    {
      title: "TOTAL KATEGORI",
      value: "24",
      growth: "Kategori Utama",
      icon: <FiFolder className="w-5 h-5" />,
      color: "text-[#0059BB]",
      pillBg: "bg-[#D5E3FF]",
    },
    {
      title: "SUB-KATEGORI",
      value: "18",
      growth: "Subkategori",
      icon: <FiGrid className="w-5 h-5 text-[#2563EB]" />,
      color: "text-[#2563EB]",
      pillBg: "bg-[#FFF8E7]",
    },
    {
      title: "STATUS AKTIF",
      value: "22",
      growth: "Dari 42 Total Item",
      icon: <FiCheckCircle className="w-5 h-5 text-[#93000A]" />,
      color: "text-[#93000A]",
      pillBg: "bg-[#FFDAD6]",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-stretch gap-6 w-full">
      {cardData.map((card, idx) => (
        <div key={idx} className="flex p-4 justify-between items-center rounded-lg border border-[#C3C6D1] bg-[#FFF] w-full">
          <div className="flex flex-col items-start gap-1 w-fit">
            <div className="flex flex-col items-start w-full">
              <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">{card.title}</p>
            </div>
            <div className="flex flex-col items-start w-full">
              <p className="text-[#001E40] font-iBMPlexSans text-2xl font-semibold leading-8 w-fit tracking-[-0.01em]">{card.value}</p>
            </div>
          </div>
          <div className={`flex justify-center items-center shrink-0 rounded-xl ${card.pillBg} w-12 h-12`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}