import { useContext } from "react";
import { TreeContext } from "./Workspace";

export default function Toolbar() {
  const ctx = useContext(TreeContext);

  return (
    <div className="flex justify-between items-center w-full mb-4">
      <div className="flex items-center w-fit relative">
        <svg 
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="absolute left-3 top-2.5 text-gray-400 pointer-events-none"
        >
          <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          value={ctx?.searchQuery || ""}
          onChange={(e) => ctx?.setSearchQuery(e.target.value)}
          placeholder="Cari kategori..."
          className="w-72 h-9 pl-9 pr-4 py-2 border border-gray-200 rounded text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-gray-300 transition-colors"
        />
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={ctx?.expandAll} 
          className="h-9 px-4 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Expand All
        </button>
        <button 
          onClick={ctx?.collapseAll} 
          className="h-9 px-4 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Collapse All
        </button>
      </div>
    </div>
  );
}