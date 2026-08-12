import { useContext } from "react";
import { TreeContext } from "./Workspace";

export default function PageHeader() {
  const ctx = useContext(TreeContext);
  return (
    <div className="flex pr-[0] justify-between items-end w-full">
      <div className="flex flex-col items-start gap-1 w-fit">
        <div className="flex items-start gap-2 w-full">
          <div className="flex flex-col items-start w-fit h-full">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              Dashboard
            </p>
          </div>
          <div className="flex flex-col items-start w-fit h-full">
            <p className="text-[#43474F] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              /
            </p>
          </div>
          <div className="flex flex-col items-start w-fit h-full">
            <p className="text-[#1A1C1E] font-iBMPlexSans text-xs font-semibold leading-4 w-fit tracking-[0.05em]">
              Manajemen Kategori
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start w-full">
          <p className="text-[#001E40] font-iBMPlexSans text-[32px] font-semibold leading-10 w-fit tracking-[-0.02em]">
            Manajemen Kategori
          </p>
        </div>
      </div>
      <div className="flex items-center w-fit">
        <button 
          className="flex h-9 px-4 items-center gap-2 rounded bg-gray-700 text-white shadow-sm hover:bg-gray-800 transition-colors"
          onClick={ctx?.onAddCategory}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white"/>
          </svg>
          <span className="text-white font-iBMPlexSans text-sm font-medium">Kategori Root</span>
        </button>
      </div>
    </div>
  );
}