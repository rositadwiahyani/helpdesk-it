import { useContext } from "react";
import { TreeContext } from "./Workspace";

export default function Toolbar() {
  const ctx = useContext(TreeContext);

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full mb-4">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={ctx?.searchQuery || ""}
            onChange={(e) => ctx?.setSearchQuery(e.target.value)}
            placeholder="Cari kategori..."
            className="pl-9 pr-4 py-2 text-sm border border-[#C3C6D1] rounded focus:outline-none focus:border-[#0059BB] w-full md:w-[350px]"
          />
          <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
        <button 
          onClick={ctx?.expandAll} 
          className="flex items-center gap-2 px-3 py-2 border border-[#C3C6D1] rounded bg-white hover:bg-gray-50 text-sm text-[#43474F] font-iBMPlexSans"
        >
          Expand All
        </button>
        <button 
          onClick={ctx?.collapseAll} 
          className="flex items-center gap-2 px-3 py-2 border border-[#C3C6D1] rounded bg-white hover:bg-gray-50 text-sm text-[#43474F] font-iBMPlexSans"
        >
          Collapse All
        </button>
      </div>
    </div>
  );
}