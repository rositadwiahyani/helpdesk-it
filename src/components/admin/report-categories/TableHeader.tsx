export default function TableHeader() {
  return (
    <div className="inline-grid py-3 px-4 border-b border-b-[#C3C6D1] bg-[#F3F3F6] w-full relative">
      <div className="flex flex-col items-start w-full absolute left-4 top-3">
        <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
          KATEGORI
        </p>
      </div>
      <div className="flex flex-col items-center w-full absolute left-[463px] top-3">
        <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
          SUB-ITEM
        </p>
      </div>
      <div className="flex flex-col items-center w-full absolute left-[612px] top-3">
        <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
          STATUS
        </p>
      </div>
      <div className="flex flex-col items-end w-full absolute left-[761px] top-3">
        <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
          AKSI
        </p>
      </div>
    </div>
  );
}