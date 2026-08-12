import Tree from "./Tree";

export default function TableSection() {
  return (
    <div className="flex flex-col items-start rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] w-full overflow-hidden relative">
      <div className="flex flex-col items-start w-full overflow-x-auto">
        <div className="min-w-[900px] w-full flex flex-col">
          <div className="flex px-2 py-4 items-center border-b border-b-[#C3C6D1] bg-[#F3F3F6] w-full text-left">
            <div className="flex-1 px-4">
              <p className="text-[#43474F] font-iBMPlexSans text-[11px] font-bold leading-4 tracking-[0.05em]">NAMA KATEGORI</p>
            </div>
            <div className="w-[120px] px-4 text-center">
              <p className="text-[#43474F] font-iBMPlexSans text-[11px] font-bold leading-4 tracking-[0.05em]">STATUS</p>
            </div>
            <div className="w-[100px] px-4 text-center pr-8">
              <p className="text-[#43474F] font-iBMPlexSans text-[11px] font-bold leading-4 tracking-[0.05em]">AKSI</p>
            </div>
          </div>
          <div className="flex flex-col w-full bg-white relative min-h-[300px]">
            <Tree />
          </div>
        </div>
      </div>
    </div>
  );
}