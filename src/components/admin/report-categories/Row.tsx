import { ReactNode, useContext, useState } from "react";
import CountBadge from "./CountBadge";
import StatusBadge from "./StatusBadge";
import ActionMenu from "./ActionMenu";
import { TreeContext } from "./Workspace";

type RowProps = {
  nodeId?: string; // Menambahkan Prop ID untuk mendeteksi baris 
  outerWrapperClassName: string;
  icon: ReactNode;
  iconBgClassName: string;
  title: ReactNode;
  count: ReactNode;
  status: ReactNode;
  childrenWrapperClassName: string;
  children: ReactNode;
};

export default function Row({
  nodeId,
  outerWrapperClassName,
  icon,
  iconBgClassName,
  title,
  count,
  status,
  childrenWrapperClassName,
  children,
}: RowProps) {
  const ctx = useContext(TreeContext);
  const [isActionOpen, setIsActionOpen] = useState(false);

  // Jika ada fitur pencarian, otomatis expand agar user bisa lihat highlight-nya
  const isExpanded = ctx?.searchQuery 
    ? true 
    : (nodeId && ctx?.expandedNodes ? ctx.expandedNodes.includes(nodeId) : true);

  const handleToggle = () => {
    if (nodeId && ctx?.toggleNode) ctx.toggleNode(nodeId);
  };

  return (
    <div className={outerWrapperClassName}>
      <div 
        className="flex py-3 px-4 w-full items-center bg-white border-b border-gray-100 relative z-10 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={handleToggle}
      >
        <div className="flex-1 flex items-center gap-3 min-w-0 pr-4">
          {/* Hamburger Drag Handle */}
          <div className="cursor-grab text-gray-400 hover:text-gray-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="8" x2="20" y2="8"></line><line x1="4" y1="16" x2="20" y2="16"></line></svg>
          </div>
          <svg 
            width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={`shrink-0 text-gray-500 transition-transform duration-200 ${isExpanded ? '' : '-rotate-90'}`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          <p className="text-gray-800 font-medium text-[15px] truncate ml-1">
            {title}
          </p>
        </div>
        <div className="w-[80px] flex justify-end shrink-0 text-gray-500 text-sm font-medium mr-4">
          {count}
        </div>
        <div className="w-[100px] flex justify-end shrink-0 mr-4">
          <span className="text-gray-500 text-xs font-semibold">{status}</span>
        </div>
        {nodeId !== "root-layanan" ? (
          <div className="w-[80px] flex justify-end shrink-0 relative" onClick={(e) => { e.stopPropagation(); setIsActionOpen(!isActionOpen); }}>
            <button className="p-2 rounded hover:bg-gray-200 transition-colors">
            <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14C0 13.45 0.195833 12.9792 0.5875 12.5875C0.979167 12.1958 1.45 12 2 12C2.55 12 3.02083 12.1958 3.4125 12.5875C3.80417 12.9792 4 13.45 4 14C4 14.55 3.80417 15.0208 3.4125 15.4125C3.02083 15.8042 2.55 16 2 16ZM2 10C1.45 10 0.979167 9.80417 0.5875 9.4125C0.195833 9.02083 0 8.55 0 8C0 7.45 0.195833 6.97917 0.5875 6.5875C0.979167 6.19583 1.45 6 2 6C2.55 6 3.02083 6.19583 3.4125 6.5875C3.80417 6.97917 4 7.45 4 8C4 8.55 3.80417 9.02083 3.4125 9.4125C3.02083 9.80417 2.55 10 2 10ZM2 4C1.45 4 0.979167 3.80417 0.5875 3.4125C0.195833 3.02083 0 2.55 0 2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0C2.55 0 3.02083 0.195833 3.4125 0.5875C3.80417 0.979167 4 1.45 4 2C4 2.55 3.80417 3.02083 3.4125 3.4125C3.02083 3.80417 2.55 4 2 4Z" fill="#43474F"/>
            </svg>
          </button>

          {isActionOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); }}></div>
              <div className="absolute right-0 top-10 w-48 bg-white border border-[#C3C6D1] rounded shadow-lg z-20 flex flex-col py-1">
                <button
                  onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); ctx?.onAddSubcategory?.(nodeId!); }}
                  className="px-4 py-2 text-sm text-left hover:bg-gray-50 text-[#1A1C1E]"
                >
                  Tambah Subkategori
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); ctx?.onEditItem?.({ id: nodeId, title }, 'category'); }}
                  className="px-4 py-2 text-sm text-left hover:bg-gray-50 text-[#1A1C1E]"
                >
                  Edit Data
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsActionOpen(false); ctx?.onDeleteItem?.(nodeId!, 'category'); }}
                  className="px-4 py-2 text-sm text-left hover:bg-red-50 text-red-600"
                >
                  Hapus
                </button>
              </div>
            </>
          )}
        </div>
        ) : (
          <div className="w-[80px] flex justify-end shrink-0"></div>
        )}
      </div>
      {/* Logic untuk hide/show children saat di collapse */}
      {isExpanded && (
        <div className={childrenWrapperClassName}>{children}</div>
      )}
    </div>
  );
}