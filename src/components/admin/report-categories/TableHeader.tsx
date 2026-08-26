export default function TableHeader() {
  return (
    <div className="flex py-3 px-4 border-b border-b-[#C3C6D1] bg-[#F3F3F6] w-full items-center">
      <div className="flex-1 flex flex-col items-start min-w-0 pr-4">
        <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 tracking-[0.05em]">
          KATEGORI
        </p>
      </div>
      <div className="w-[140px] flex flex-col items-center shrink-0">
        <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 tracking-[0.05em]">
          SUB-ITEM
        </p>
      </div>
      <div className="w-[140px] flex flex-col items-center shrink-0">
        <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 tracking-[0.05em]">
          STATUS
        </p>
      </div>
      <div className="w-[80px] flex flex-col items-end shrink-0">
        <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 tracking-[0.05em]">
          AKSI
        </p>
      </div>
    </div>
  );
}